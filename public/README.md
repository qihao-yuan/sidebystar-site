# Site Asset Guide

全站静态资源按页面/段落组织。`components/media/MediaPlaceholder.tsx` 在未提供 `src` 时显示占位块,素材落位后把占位 prop 改成 `src="/..."` 即可切换到 `next/image`。

所有占位在视觉上都带了 `LABEL · RATIO · WxH` 小字,直接按标签去命名新文件,然后按同路径丢进 `public/` 就行。

## 目录结构

```
public/
  home/            # 主页各段落配图 / 视频
  intelligence/    # 能力展示页 (/intelligence)
  solutions/       # 解决方案分组 + 每个场景封面
  product/         # SKU 机身图 / 视频 (详见 product/README.md)
  brand/           # 品牌资产
```

## 交付规格 (全站通用)

- **色彩**: sRGB, gamma 2.2, 嵌入色彩 profile
- **静态图源文件**: 优先 `webp`,其次 `avif`;图标级插画用 `svg` 矢量。**不再交付 jpg/png**。
  - 说明: `next/image` 会在构建期再生成 AVIF / WebP 多尺寸,你只需把源文件放进 `public/`,浏览器端自动降级。
- **命名**: 小写短横线,中英对应同名,`*@2x.*` 为 2x 高分屏版本(`next/image` 自动做响应式时可省略)
- **平均体积**: `<= 180 KB @ 1x`,`<= 380 KB @ 2x`
- **视频**: H.264 baseline + VP9 备份,`<= 10s` 无缝循环,muted + playsinline,码率 `<= 4 Mbps`;用 `<video>` 不走 `MediaPlaceholder`

## 状态说明

| 标记 | 含义 |
| --- | --- |
| 已占位 | 页面上现在就渲染了 `MediaPlaceholder`,加对应 `src` 即生效 |
| 预留 | 位置存在但当前由其它视觉(`GradientMesh` / 动画)占用,接入前需要改组件 JSX |

---

## 主页 `home/`

| 段落 | 源文件路径 | 比例 | 尺寸 (@2x) | 状态 |
| --- | --- | --- | --- | --- |
| Hero 背景 | `home/hero.webp` 或 `home/hero.mp4` | 21/9 | 3840 x 1644 | **预留** — 当前由 `HomeHero.tsx` 的 `<GradientMesh variant="hero" />` + 动画节点占用。替换方式见下文"Hero 接入图/视频" |
| Era 配图 | `home/era.webp` | 4/3 | 1600 x 1200 | 已占位 — `components/home/HomeEra.tsx` 左侧 |
| Spectrum · Bedside | `home/spectrum-bedside.webp` | 4/3 | 1600 x 1200 | 已占位 |
| Spectrum · Desk | `home/spectrum-desk.webp` | 4/3 | 1600 x 1200 | 已占位 |
| Spectrum · Home | `home/spectrum-home.webp` | 4/3 | 1600 x 1200 | 已占位 |
| Spectrum · Community | `home/spectrum-community.webp` | 4/3 | 1600 x 1200 | 已占位 |
| Intelligence preview | `home/intelligence.webp` | 4/3 | 1600 x 1200 | 已占位 — `HomeIntelligence.tsx` 右侧 |
| Platform arch | `home/platform-arch.webp` 或 `.svg` | 16/9 | 2560 x 1440 | **预留** — 当前平台段未嵌大图;架构示意在 `/platform` 页的 `ArchTraversal` 组件 |
| CTA bg | `home/cta-bg.webp` | 21/9 | 3840 x 1644 | **预留** — 当前由 `GradientMesh variant="cta"` 占用 |

### Hero 接入图/视频

编辑 `components/home/HomeHero.tsx`,在 `<GradientMesh variant="hero" />` 同层位置加:

- 图片版:`<MediaPlaceholder src="/home/hero.webp" alt="" ratio="21/9" rounded="none" className="absolute inset-0" />`
- 视频版:直接用 `<video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline src="/home/hero.mp4" />`

想同时保留现有 `GradientMesh` 做叠底,把新图/视频放在 mesh **下面**(先渲染)并给一个 `opacity-60` 之类即可。

---

## 智能内核页 `intelligence/`

| 源文件路径 | 比例 | 尺寸 (@2x) | 状态 |
| --- | --- | --- | --- |
| `intelligence/hero.webp` | 16/9 | 2560 x 1440 | 已占位 — `app/[locale]/intelligence/page.tsx` Hero 右侧 |
| `intelligence/memory.svg` | 1/1 | 1200 x 1200 | 已占位 — 能力卡(专属记忆) |
| `intelligence/personalization.svg` | 1/1 | 1200 x 1200 | 已占位(个性化设定) |
| `intelligence/learning.svg` | 1/1 | 1200 x 1200 | 已占位(习惯学习) |
| `intelligence/orchestra.svg` | 1/1 | 1200 x 1200 | 已占位(跨设备协同) |
| `intelligence/anticipatory.svg` | 1/1 | 1200 x 1200 | 已占位(主动前瞻) |
| `intelligence/privacy.svg` | 1/1 | 1200 x 1200 | 已占位(隐私守护) |
| `intelligence/offline.svg` | 1/1 | 1200 x 1200 | 已占位(离线可用) |
| `intelligence/household.svg` | 1/1 | 1200 x 1200 | 已占位(家庭画像) |

能力卡为 1:1 插画风,建议 SVG 矢量(最优)或 1200 x 1200 webp,风格统一为线条 + 渐变光点。

---

## 解决方案页 `solutions/`

| 源文件路径 | 比例 | 尺寸 (@2x) | 状态 |
| --- | --- | --- | --- |
| `solutions/group-health.webp` | 16/9 | 2560 x 1440 | 已占位 — 健康医养 分组 header |
| `solutions/group-home.webp` | 16/9 | 2560 x 1440 | 已占位 — 家居生活 分组 header |
| `solutions/group-commercial.webp` | 16/9 | 2560 x 1440 | 已占位 — 商业空间 分组 header |
| `solutions/group-public.webp` | 16/9 | 2560 x 1440 | 已占位 — 教育与公共 分组 header |
| `solutions/elderly-care.webp` | 4/3 | 1600 x 1200 | 预留 — 详情页暂未引入图位;接入请在 `app/[locale]/solutions/[slug]/page.tsx` Hero 下加 `MediaPlaceholder` |
| `solutions/community-care.webp` | 4/3 | 1600 x 1200 | 同上 |
| `solutions/clinical-assist.webp` | 4/3 | 1600 x 1200 | 同上 |
| `solutions/smart-home.webp` | 4/3 | 1600 x 1200 | 同上 |
| `solutions/smart-room.webp` | 4/3 | 1600 x 1200 | 同上 |
| `solutions/hospitality.webp` | 4/3 | 1600 x 1200 | 规划中场景,不在详情路由 |
| `solutions/workspace.webp` | 4/3 | 1600 x 1200 | 规划中场景 |
| `solutions/retail.webp` | 4/3 | 1600 x 1200 | 规划中场景 |
| `solutions/campus.webp` | 4/3 | 1600 x 1200 | 规划中场景 |
| `solutions/cultural.webp` | 4/3 | 1600 x 1200 | 规划中场景 |

---

## 替换流程(以 Era 段为例)

1. 把交付的 `era.webp`(长边 >= 2400 px)丢到 `public/home/era.webp`
2. 打开 `components/home/HomeEra.tsx`,把 `<MediaPlaceholder alt="..." ratio="4/3" label="HOME/ERA · 4:3 · 1600x1200" />` 改成 `<MediaPlaceholder src="/home/era.webp" alt="Cloud to edge" ratio="4/3" />`
3. 重新 `npm run dev` 或 `npm run build`,`next/image` 自动出 AVIF / WebP 多尺寸,无需手动压图

---

## 产品 SKU (`product/`)

详见 `public/product/README.md`。

---
