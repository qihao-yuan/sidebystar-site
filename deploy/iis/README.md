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

`web.config` 同时做了三件事:

1. `allowDoubleEscaping="true"` -- 放行 `[locale]` chunk.
2. URL Rewrite -> `http://127.0.0.1:3000` -- 反代到本地 `next start` 进程.
3. 设置 `X-Forwarded-Host` / `X-Forwarded-Proto` / `X-Forwarded-For` -- 让 next-intl 在生成 hreflang / canonical 时拿到真实域名, 不再泄出 `127.0.0.1:3000`.

## 服务器需要预装

- IIS 角色.
- **URL Rewrite** 模块: https://www.iis.net/downloads/microsoft/url-rewrite
- **ARR (Application Request Routing)** 模块, 并在 IIS Manager -> Server -> *Application Request Routing Cache* -> *Server Proxy Settings* 里勾上 *Enable proxy*.

## 启停 Node 端

```powershell
cd <site-physical-path>
npm ci
npm run build
npm start          # 监听 127.0.0.1:3000
```

建议用 **NSSM** 或 **Windows Service Wrapper (WinSW)** 把 `npm start` 包成 Windows 服务, 重启后自启.
