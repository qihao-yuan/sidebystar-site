# SidebyStar 循星科技 企业站

Ambient Intelligence OS 官网 · Apple Vision Pro 风格视觉 + 壮志叙事 · Next.js 14 App Router.

## 四维信息架构

站点文案分两层, 主站讲产品与理念, `/developers/*` 讲技术。

```
                主站 (产品叙事 / 理念)              开发者中心 (技术详情)
                -------------------------          ----------------------
硬件半球  HW    /products   商业 SKU 三形态       /developers/hardware
                /system     按角色的系统家族         (完整规格 / 芯片 / 协议 / 认证)
                /solutions  场景套餐叙事

软件半球  SW    /platform   智能内核的理念         /developers  (Docs / API / CLI)
                /plugins    插件故事商店           /developers/plugins  (manifest / 权限 / 安装)
                /intelligence 智能观与路线图

横向        /company /trust /cases /research /pilot /contact /privacy
```

四个层级的对应关系:

- 商业 SKU 层  `Home Box · Community Kit · Enterprise Stack`
- 系统家族层  `Gateway · Sense · Control · Connect · (Act 路线)`
- 场景套餐层  `居家照护 · 社区照护 · 临床辅助 · 智能家居 · 智能房间`
- 插件生态层  `官方 · 伙伴 · 路线图` x `家庭 / 健康 / 商用 / 兼容`

通用语气规则: 主站页不出现芯片型号、内存、协议名、模块数、API 数等技术细节;
这些内容一律沉到 `/developers/*` 与 `/developers/hardware`, 通过 "查看完整规格"
与 "查看 manifest" 跨链接引用。

## 技术栈

- Next.js 14 (App Router) + TypeScript + React 18
- Tailwind CSS v3 自研 tokens (深空 / mesh gradient / 发光描边)
- next-intl 3.26 (zh-CN / en, URL `/[locale]/...`)
- Lenis 平滑滚动 + GSAP ScrollTrigger 内核 + Framer Motion 微交互
- React Three Fiber + drei 3D (预留)
- Next metadata API + sitemap.xml + robots.txt + `@vercel/og` 动态 OG
- next-sitemap (备用静态方案)

## 快速开始

```bash
npm install
npm run dev                # 开发 http://localhost:3000
npm run build              # 生产构建
npm run start              # 生产预览
npm run typecheck          # 类型检查
npm run lint               # ESLint
```

## 目录结构

```
app/
  [locale]/
    page.tsx                  # 首页 8 段电影式滚动
    products/                 # 商业 SKU 叙事, 跨链到 system 与 solutions
    system/                   # 按角色的系统家族 (Gateway / Sense / Control / Connect / Act)
    solutions/[slug]/         # 5 个场景套餐: bundle + KPI + 落地
    platform/                 # 智能内核的五感 / 记忆 / 推理 / 协同
    plugins/                  # 插件故事商店
    plugins/[slug]/           # 插件故事详情
    intelligence/             # 智能观
    developers/               # 入口
    developers/hardware/      # 硬件完整规格沉淀区
    developers/plugins/       # 插件开发者中心
    developers/plugins/[slug] # 插件 manifest 与安装细节
    trust/ cases/ research/   # 下沉到 footer 的信任与洞察
    pilot/ contact/ privacy/
    company/{about,team,partners}/
    labs/
  sitemap.ts / robots.ts / opengraph-image.tsx / icon.tsx
components/
  nav/ footer/ brand/         # 导航 / 页脚 / logo
  motion/                     # Reveal / TextReveal / MagneticButton / ScrollPinSection / Marquee ...
  home/                       # 首页各段组件
  products/ platform/         # 详情页组件
  forms/                      # ContactForm
content/
  products.ts                 # SKU + family + recommendedFor 交叉引用
  family.ts                   # 按角色的系统家族数据
  solutions.ts                # 场景套餐 + bundle 字段
  plugins.ts                  # 插件数据 + 可选 manifest
  cases.ts team.json
messages/
  zh-CN.json en.json
i18n/ hooks/ lib/
public/
  brand/logo.svg
  product/{home-box,community-kit,enterprise-stack}/    # 产品素材 (见内部 README)
legacy/                       # 原静态站点归档 (旧 HTML / CSS / JS / pics)
```

### 路由与国际化

- `next-intl` 路由: `localePrefix: 'always'`, 所有新路径 (`/system`, `/plugins`,
  `/plugins/[slug]`, `/developers/hardware`, `/developers/plugins/[slug]`)
  自动双语 (`/zh-CN/...` 与 `/en/...`), 无需额外 pathname mapping.
- 站点地图 `app/sitemap.ts` 基于路由表自动生成两套 hreflang.

## 设计 tokens (V2 Apple Vision Pro)

```
surface.void      #05060A   宇宙黑
surface.nebula    #0B0F1E   深蓝紫
brand.aurora      #4B6BFB   主品牌
brand.stardust    #B19CF4   淡紫光
brand.halo        #7DD3FC   高光青
glow.edge         0 0 40px rgba(125,211,252,0.25)
```

标题字重 500 + 字距 -0.02em, 正文 Noto Sans SC Variable.

## SEO / 性能

- 每路由独立 `generateMetadata` + canonical + hreflang
- Lighthouse 目标 Perf >= 80 (动效页) / 85 (内容页), A11y >= 95
- `prefers-reduced-motion` 自动降级, Lenis 自动禁用
- 图片 AVIF / WebP 优先, 产品素材按 1x/2x/3x 提供

## 部署

### 方案 A · Windows + IIS 反代 (当前生产方案)
完整步骤见 [`docs/deploy-windows-iis.md`](./docs/deploy-windows-iis.md).
核心: IIS(80/443) + URL Rewrite + ARR 反代到 pm2 守护的 `next start` (127.0.0.1:3000).
更新: 云端 `cd C:\www\sidebystar-site && .\deploy.ps1` 一键拉取 + 构建 + 重启.

反代模板: [`iis/web.config`](./iis/web.config).

### 方案 B · 静态导出 (兼容现有静态托管)
把 `next.config.mjs` 顶层加 `output: 'export'` 后执行 `next build`, 产物在 `out/`.
注意 `app/opengraph-image.tsx` 与 `app/icon.tsx` 使用 edge runtime, 静态导出需改为静态 PNG 或移除.

## 旧站 301

旧站 32 个 HTML 路径已在 `next.config.mjs` `redirects()` 映射到新路由. `mbti-*` / `ferris-wheel` / `product_test` / `info-yuanqh` 重定向到 `/labs`.

## 质量门禁

`.github/workflows/quality.yml` 在每次 PR 跑:
1. typecheck + lint + build
2. lychee 断链扫描
3. Lighthouse CI (A11y >= 95, SEO >= 95, Perf 门禁 warn 80)

## 许可

内部使用. 开源内核见 `https://github.com/sidebystar`.
