# IIS + ARR 部署修复

本目录用于把网站跑在 **Windows IIS** 上时, 把 Next.js 14 与 IIS 默认安全策略之间的不兼容补齐.

## 触发的问题 (本次)

```
GET /_next/static/chunks/app/%5Blocale%5D/page-XXXX.js
HTTP/1.1 400 Bad Request
```

原因: Next.js 路由 `app/[locale]/page.tsx` 的 client chunk 路径里带 `[` `]`, URL 编码为 `%5B` `%5D`. IIS 的 **Request Filtering** 默认把含 `%5B` / `%5D` 的请求当作 "双重转义" 拒绝, 直接 400. 浏览器随后报 `ChunkLoadError` 与 React 423.

## 修复

把本目录的 [`web.config`](./web.config) **复制到 IIS 站点的物理根目录** (在 IIS Manager 里那个站点的 *Physical Path*).

IIS 会自动热加载, 不需要重启站点 / 应用池.

完成后用下面命令自检:

```powershell
curl.exe -I "https://www.sidebystar.com/_next/static/chunks/app/%5Blocale%5D/page-XXXXXXXX.js"
# 期望: HTTP/1.1 200 OK
```

`web.config` 同时做了四件事:

1. `allowDoubleEscaping="true"` -- 放行 `[locale]` chunk.
2. **HTTP -> HTTPS 301** -- `{HTTPS}=OFF` 时跳到 `https://{HTTP_HOST}/...`. 不要在全站用 `<access sslFlags="Ssl" />`, 否则 80 端口会直接 **403** 而不是跳转.
3. URL Rewrite -> `http://127.0.0.1:3000` -- 反代到本地 `next start` 进程.
4. 设置 `X-Forwarded-Host` / `X-Forwarded-Proto` / `X-Forwarded-For` -- 让 next-intl 在生成 hreflang / canonical 时拿到真实域名, 不再泄出 `127.0.0.1:3000`.

自检 HTTP 跳转:

```powershell
curl.exe -sI http://www.sidebystar.com/zh-CN
# 期望: HTTP/1.1 301 Moved Permanently
#       Location: https://www.sidebystar.com/zh-CN
```

若 IIS 站点物理路径不是仓库根 (例如 `C:\www\iis-sidebystar`), 部署前设置环境变量再跑 `deploy.ps1`:

```powershell
$env:SIDE_BY_STAR_IIS_ROOT = 'C:\www\iis-sidebystar'
.\deploy.ps1
```

## 服务器需要预装

- IIS 角色.
- **URL Rewrite** 模块: https://www.iis.net/downloads/microsoft/url-rewrite
- **ARR (Application Request Routing)** 模块, 并在 IIS Manager -> Server -> *Application Request Routing Cache* -> *Server Proxy Settings* 里勾上 *Enable proxy*.

## 启停 Node 端 (推荐用 PM2 ecosystem)

把 [`ecosystem.config.cjs`](./ecosystem.config.cjs) 复制到服务器站点根 (例 `C:\www\sidebystar-site`), 然后:

```powershell
cd C:\www\sidebystar-site
git pull
npm ci
npm run build

# 第一次启动 (或换配置时):
pm2 stop sidebystar -s
pm2 delete sidebystar -s
pm2 start ecosystem.config.cjs
pm2 save

# 后续日常更新:
pm2 reload sidebystar     # 滚动重启, 不丢请求
```

ecosystem 关键参数:

- `exec_mode: 'cluster'` + `instances: 'max'`: **多核分担**. 单 fork 是 "每页跳转都卡" 的最常见根因.
- `windowsHide: true`: PM2 不再弹 cmd 窗口.
- `min_uptime` + `max_restarts`: 防止再出现 11 万次循环重启.
- `kill_timeout: 8000`: 给 Next 8 秒优雅退出, 端口能释放, 下次重启不会撞 EADDRINUSE.

如果想免开机登录就拉起来, 用 `pm2-installer` 把 PM2 daemon 装成 Windows 服务:

```powershell
npm i -g pm2-installer
pm2-installer install
```

## 关于字体 (国内构建相关)

构建机若在国内、且无法访问 `fonts.gstatic.com`, 千万不要用 `next/font/google` -- 它会在 `next build` 阶段去 Google 拉 woff2, 国内会 `ETIMEDOUT`.

本仓库已切到 **`@fontsource-variable/inter`** 与 **`@fontsource-variable/jetbrains-mono`** (从 npm 拉, 国内镜像可达), 中文部分回落到系统 PingFang / Microsoft YaHei, 不再有任何外网字体依赖.

如果以后想换回 Noto SC, 用 `@fontsource-variable/noto-sans-sc`, **不要**走 `next/font/google`.

## 卡顿 / 慢的排查清单

按 ROI 排序:

1. **IIS 没装动态压缩组件** -- 90% 概率: `Install-WindowsFeature Web-Dyn-Compression`, 然后本仓库的 `web.config` 里的 `<httpCompression>` 才能生效. 验证: `curl.exe -I -H "Accept-Encoding: gzip, br" https://www.sidebystar.com/zh-CN | findstr Content-Encoding` 应当看到 `gzip`.
2. **PM2 单 fork 模式** -- 改成 `exec_mode: 'cluster'`, 见上面 `ecosystem.config.cjs`.
3. **IIS 在第一次握手时强制客户端证书重协商** -- `web.config` 里 `<access sslFlags="Ssl" />` 已关; 若 IIS Manager -> 站点 -> *SSL Settings* 的 *Client certificates* 还是 *Accept* / *Require*, 改回 *Ignore*.
4. **首屏冷缓存** -- 刚 `pm2 reload` 之后头几次必然慢, 因为 `.next` 内部页缓存是冷的; 跑两次后 `x-nextjs-cache: HIT` 即恢复.

## 关于字体 (国内构建相关)

构建机若在国内、且无法访问 `fonts.gstatic.com`, 千万不要用 `next/font/google` -- 它会在 `next build` 阶段去 Google 拉 woff2, 国内会 `ETIMEDOUT`.

本仓库已切到 **`@fontsource-variable/inter`** 与 **`@fontsource-variable/jetbrains-mono`** (从 npm 拉, 国内镜像可达), 中文部分回落到系统 PingFang / Microsoft YaHei, 不再有任何外网字体依赖.

如果以后想换回 Noto SC, 用 `@fontsource-variable/noto-sans-sc`, **不要**走 `next/font/google`.
