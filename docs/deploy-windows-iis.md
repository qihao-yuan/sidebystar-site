# Windows + IIS 部署指南

把 SidebyStar 站点部署到一台 Windows 云服务器上,由 IIS 承担 80/443,反向代理到本机 Node 进程。
老静态站已经废弃,整台机器完全切到这套方案。

---

## 架构

```
Internet
   |
   v
IIS (80 / 443)   <-- 证书 / 域名绑定 / 反代
   |
   | (URL Rewrite + ARR)
   v
Node.js (pm2 守护, 127.0.0.1:3000)
   |
   v
Next.js 14  (next start)
```

---

## 一次性初始化(新机器)

> 全部在 **管理员 PowerShell** 中执行。

### 1. 卸掉老静态站

IIS 管理器 → 右键 `Default Web Site` → Stop → Remove。  
老 HTML 目录(如 `C:\inetpub\wwwroot\html`)可以整个删,或先打包备份:

```powershell
Compress-Archive -Path C:\inetpub\wwwroot\* -DestinationPath C:\backup\old-site.zip -Force
Remove-Item C:\inetpub\wwwroot\* -Recurse -Force
```

### 2. 安装 Node.js + pm2

```powershell
winget install OpenJS.NodeJS.LTS
# 关掉当前 PowerShell 重新开一次
node -v        # 应该是 v20.x
npm i -g pm2 pm2-windows-startup
pm2-startup install
```

### 3. 克隆代码

用已装好的 **GitHub Desktop**,把仓库 Clone 到:

```
C:\www\sidebystar-site
```

路径不要带中文 / 空格。

### 4. 首次构建 + 启动

```powershell
cd C:\www\sidebystar-site
npm ci
npm run build
pm2 start npm --name sidebystar -- run start -- -p 3000
pm2 save
```

本地验证:浏览器打开 `http://localhost:3000`,看到新站即可。

### 5. IIS 装反代模块

- URL Rewrite: <https://www.iis.net/downloads/microsoft/url-rewrite>
- Application Request Routing (ARR): <https://www.iis.net/downloads/microsoft/application-request-routing>

装完打开 **IIS 管理器**:

1. 点击最顶层的"计算机名"节点
2. 双击 **Application Request Routing Cache**
3. 右侧 **Server Proxy Settings**
4. 勾选 **Enable proxy** → 右上 **Apply**

### 6. 建 IIS 站点

```powershell
New-Item -ItemType Directory C:\www\iis-sidebystar -Force
Copy-Item C:\www\sidebystar-site\iis\web.config C:\www\iis-sidebystar\web.config -Force
```

IIS 管理器 → Sites → Add Website:

- Site name: `sidebystar`
- Physical path: `C:\www\iis-sidebystar`
- Binding: `http`, port `80`, Host name 填域名(例如 `sidebystar.com`),再加一条 `www.sidebystar.com`

点 OK。`iisreset`。浏览器访问公网 IP 或域名,应该直接看到新站。

### 7. HTTPS(Let's Encrypt,免费 + 自动续期)

```powershell
$wacs = "https://github.com/win-acme/win-acme/releases/latest/download/win-acme.v2.2.9.1701.x64.pluggable.zip"
Invoke-WebRequest $wacs -OutFile C:\wacs.zip
Expand-Archive C:\wacs.zip -DestinationPath C:\wacs -Force
cd C:\wacs
.\wacs.exe
```

交互菜单:
- `N` 新证书
- 选 IIS 站点 `sidebystar`
- 其它全部回车使用默认(包含自动续期 Scheduled Task)

完成后 IIS 会自动多一个 443 绑定。

### 8. 云厂商安全组

入站规则放行:

| 端口 | 协议 | 来源 | 说明 |
| ---- | ---- | ---- | ---- |
| 80   | TCP  | 0.0.0.0/0 | HTTP |
| 443  | TCP  | 0.0.0.0/0 | HTTPS |
| 3389 | TCP  | 你自己的 IP | RDP,只开白名单 |

**不要**把 3000 对外开放,它只监听 127.0.0.1。

---

## 日常更新

开发机 push 到仓库后,云端服务器上:

**方式 A:GitHub Desktop + 一键脚本(推荐)**

1. 打开 GitHub Desktop → Fetch origin → Pull
2. 管理员 PowerShell:

```powershell
cd C:\www\sidebystar-site
.\deploy.ps1
```

`deploy.ps1` 会自动执行 `git pull` + `npm ci` + `npm run build` + `pm2 restart`。

**方式 B:纯命令行**

```powershell
cd C:\www\sidebystar-site
git pull
npm ci
npm run build
pm2 restart sidebystar
```

更新过程中 IIS 不停,pm2 restart 有 < 1s 的切换窗口,不足以触发用户可见报错。

---

## 排障清单

| 现象 | 原因 | 处理 |
| ---- | ---- | ---- |
| 访问返回 502 / 504 | pm2 没跑 | `pm2 status`,若没 `sidebystar` 就重跑 `pm2 start ...` |
| 访问返回 IIS 默认 404 | 反代规则没生效 / web.config 路径不对 | 确认站点物理路径就是放了 `web.config` 的目录 |
| 访问返回旧 HTML | 老站目录没清理,IIS 静态优先 | 把 `C:\inetpub\wwwroot` 清空或把 IIS 站点指向 `C:\www\iis-sidebystar` |
| 图片 404 | 安全组 / 防火墙把 `_next/image` 拦了 | IIS 反代会原样透传,检查 ARR 的 Enable proxy 是否勾上 |
| 构建 OOM | 机器内存不够 | `set NODE_OPTIONS=--max-old-space-size=4096` 再 `npm run build` |
| pm2 重启后进程不见了 | 没有 save + startup | 执行一次 `pm2 save` 和 `pm2-startup install` |
| 证书到期没自动续期 | Scheduled Task 被禁 | `Get-ScheduledTask win-acme*` 看状态,重跑 `wacs.exe` 菜单里的 `Renewals` |

---

## 可选:把 Node 挂成 Windows 服务(替代 pm2-startup)

pm2-startup 本质是一个普通登录 Task,如果服务器会长期无登录会话,更稳的是用 **NSSM**:

```powershell
winget install NSSM.NSSM
nssm install sidebystar "C:\Program Files\nodejs\npm.cmd" "run" "start" "--" "-p" "3000"
nssm set sidebystar AppDirectory "C:\www\sidebystar-site"
nssm start sidebystar
```

这样就不再需要 pm2。二选一即可。

---

## 相关文件

- `iis/web.config` — 反代模板,拷到 IIS 站点根目录
- `deploy.ps1` — 一键更新脚本
- `next.config.mjs` — 已内置 `/html/*.html` → 新路由 的 301 跳转,搜索引擎收录不会断
