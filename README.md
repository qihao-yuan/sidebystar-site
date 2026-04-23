# SidebyStar 循星科技 企业站

Ambient Intelligence OS 官网 · Apple Vision Pro 风格视觉 + 壮志叙事 · Next.js 14 App Router.

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
    solutions/[slug]/         # 5 个场景方案
    products/                 # 三 SKU Vision Pro 风格
    platform/                 # 感知 -> 记忆 -> 推理 -> 联邦 pin scroll
    trust/                    # 四层网络锁 + 合规映射
    research/                 # Manifesto + Frontiers + 2026-2030 Roadmap
    developers/               # 入口 + Docs + API + Plugins
    cases/[slug]/             # 案例数据化
    pilot/                    # 试点申请
    contact/                  # 联系销售
    company/{about,team,partners}/
    privacy/ | labs/
  sitemap.ts / robots.ts / opengraph-image.tsx / icon.tsx
components/
  nav/ footer/ brand/         # 导航 / 页脚 / logo
  motion/                     # Reveal / TextReveal / MagneticButton / ScrollPinSection / Marquee ...
  home/                       # 首页 8 段组件
  products/ platform/         # 详情页组件
  forms/                      # ContactForm
content/
  solutions.ts cases.ts products.ts team.json
messages/
  zh-CN.json en.json
i18n/ hooks/ lib/
public/
  brand/logo.svg
  product/{home-box,community-kit,enterprise-stack}/    # 产品素材 (见内部 README)
legacy/                       # 原静态站点归档 (旧 HTML / CSS / JS / pics)
```

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

### 方案 A · Vercel (推荐)
push 到 main 自动走 `.github/workflows/deploy.yml`.

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
