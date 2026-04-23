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

## 联系表单邮件配置(/api/contact)

站点的"联系销售 / 试点申请"表单会 POST 到 `/api/contact`,后端调 SMTP 把用户填写的信息发邮件给 `contact@sidebystar.com`。未配置时提交不会报错,但会被丢弃(日志里看得到)。

### 1. 申请企业邮箱

以腾讯企业邮箱(免费版,50 账户)为例:

1. 到 <https://work.weixin.qq.com/mail/> 注册 → 用 `sidebystar.com` 做企业邮箱域名
2. 按提示加 MX / TXT 记录到 DNS(阿里云 / 腾讯云 / Cloudflare DNS 控制台)
3. 建两个邮箱: `no-reply@sidebystar.com`(发信用)、`contact@sidebystar.com`(收信用)
4. 登录 `no-reply@sidebystar.com` → 邮箱设置 → 客户端专用密码 → 生成一个 16 位密码记下来

### 2. 在云端写入环境变量

```powershell
cd C:\www\sidebystar-site
Copy-Item .\.env.example .\.env.production.local
notepad .\.env.production.local
```

把里面的 `SMTP_PASS` 换成上一步生成的客户端专用密码,其它项默认值对腾讯企业邮箱直接可用。保存。

### 3. 重启 Node 让变量生效

```powershell
pm2 restart sidebystar --update-env
pm2 save
```

### 4. 验证

本地自测一次:

```powershell
$body = @{
    name = "TestUser"
    org  = "TestOrg"
    email = "test@example.com"
    scenario = "elderly-care"
    message = "本地 smoke test"
} | ConvertTo-Json

Invoke-RestMethod -Method POST -Uri http://127.0.0.1/api/contact `
    -ContentType "application/json" `
    -Body $body
```

返回 `{ ok: $true }`,并且 `contact@sidebystar.com` 收到一封标题形如 `[sidebystar.com] elderly-care - TestUser (TestOrg)` 的邮件,就成了。

`pm2 logs sidebystar` 里如果看到:

- `[contact] SMTP not configured, logging only` → `.env.production.local` 没被 Node 读到,检查文件名是否对、`pm2 restart --update-env` 是否跑过
- `[contact] send failed: ...` → SMTP 登录 / 证书问题,常见是密码错了、没用客户端专用密码,或端口 465/587 被云厂商安全组拦(出站)

### 5. 安全提示

- `.env.production.local` 已经在 `.gitignore` 里,永远不会被 push 到 git,放心用
- `MAIL_TO` 可以随时改成其它邮箱,例如改成群组地址 `sales@sidebystar.com` 让多人同时收
- 想加 CC / 抄送其他同事,改 `app/api/contact/route.ts` 的 `transport.sendMail` 调用加一个 `cc` 字段即可
- 站点已内置:蜂蜜罐反爬、单 IP 1 分钟最多 5 次提交、必填字段校验、长度上限。不需要额外接 reCAPTCHA

---

## 排障清单

| 现象 | 原因 | 处理 |
| ---- | ---- | ---- |
| 访问返回 502 / 504 | pm2 没跑 | `pm2 status`,若没 `sidebystar` 就重跑 `pm2 start ecosystem.config.cjs` |
| 访问返回 IIS 默认 404 / HTTPAPI 404 | 站点没建 / 绑定没命中 | `Get-IISSite`,确保 `sidebystar` 站点 Started 且有 `*:80:` 绑定 |
| URL Rewrite Module Error 500 | web.config 里的变量或锁定节点不合法 | 用仓库里最新的 `iis/web.config`,只做纯反代不写 `<serverVariables>` |
| 访问返回旧 HTML | 老站目录没清理,IIS 静态优先 | 清空 `C:\inetpub\wwwroot` 或确认站点物理路径是 `C:\www\iis-sidebystar` |
| 图片 404 | ARR 没启用 | `Get-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST' -filter "system.webServer/proxy" -name "enabled"` 必须 True |
| 构建 OOM | 机器内存不够 | `$env:NODE_OPTIONS = "--max-old-space-size=4096"` 再 `npm run build` |
| pm2 跑的是 dev 模式 / 参数丢了 | Windows 下 `pm2 start npm -- run ...` 参数被吞 | 一律用 `pm2 start ecosystem.config.cjs` |
| pm2 重启后进程不见了 | 没有 save + startup | 执行 `pm2 save` + `pm2-startup install`,或用 NSSM 挂成服务 |
| 证书到期没自动续期 | Scheduled Task 被禁 | `Get-ScheduledTask win-acme*` 看状态,重跑 `wacs.exe` 菜单里的 `Renewals` |
| /api/contact 返回 200 但没邮件 | SMTP 未配置或密码错 | `pm2 logs sidebystar` 看 `[contact]` 前缀日志,核对 `.env.production.local` |

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
- `ecosystem.config.cjs` — pm2 进程定义(Windows 必须用这种方式启动)
- `.env.example` — 环境变量模板,复制为 `.env.production.local` 后填实值
- `app/api/contact/route.ts` — 联系表单后端,调 SMTP 发邮件
- `next.config.mjs` — 已内置 `/html/*.html` → 新路由 的 301 跳转,搜索引擎收录不会断
