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

# 视觉设计纲领 (Creative Direction)

> 这一节是给美术 / 设计师的。所有图(主页 / intelligence / solutions)都在下面的纲领下执行。单图 brief 在更下面。

## 1. 核心概念

一句话概念:

> "周围的空间正在悄悄地变聪明。它保持克制 —— 不张扬,不打扰,不窥视。"

所有画面都要能被归因到这句。不要做任何感官刺激 / 酷炫打星 / 赛博朋克过饱和。

## 2. 视觉锚点 (Moodboard References)

请在开工前抓 20-30 张参考拼成 moodboard,来源限定在下面列表,不要混入奇幻 / 蒸汽朋克 / Y2K / 粘土渲染。

**电影(优先)**
- 《Arrival》(2016) — 外星飞船室内柔光、体积雾
- 《Blade Runner 2049》(2017) — Joi 全息场景的冷紫 + 暖点缀、Wallace 大堂
- 《Dune》(2021) — Arrakis 日出、Bene Gesserit 室内、深空场景
- 《Her》(2013) — 室内暖光调、低饱和生活感
- 《Ex Machina》(2014) — 玻璃房、极简室内

**品牌 / 产品**
- Apple Vision Pro 官网(2024 版,头显产品页,不要 Mac mini 那种亮白)
- Apple WWDC Keynote `Presenter Mode` 背景板
- Teenage Engineering EP-133 / OP-1 产品图
- Nothing Phone (2a) 官方渲染
- Rhei Studio 全域动效样片
- Universal Everything 装置艺术
- Playdate 官网 hero 视频

**摄影师**
- Todd Hido — 夜色民居,暖窗光 vs 冷外景
- Rinko Kawauchi — 微光、气息感
- Gregory Crewdson — 叙事性室内光
- Wolfgang Tillmans — 城市安静时刻

**2D 艺术家 / 设计师**
- Ash Thorp — UI / 概念设计
- Benjamin Bardou — 极简构图
- Manuel Sainsily(minimal futurism)

**禁止参考**: Cyberpunk 2077, Tron Legacy, Studio Ghibli, Miyazaki, Pixar, Disney, LowPoly 类 Behance, 任何高饱和霓虹。

## 3. 色彩系统

统一深空 → 星云 → 极光的光谱,冷色主导,暖色点缀。色卡严格对应站内 Tailwind 配置,不要自创色。

| Role | Name | Hex | 作用 | 单图占比 |
| --- | --- | --- | --- | --- |
| Primary | Deep Space | `#0A0F1F` | 主背景、画面下 1/3 | 40–60% |
| Primary | Nebula | `#1A1030` | 中层雾、紫调阴影 | 20–30% |
| Primary | Void | `#05070E` | 最深暗部、晕影边缘 | 10–20% |
| Accent | Aurora Cyan | `#7DD3FC` | 主高光、勾边、核心光源 | 5–10% |
| Accent | Halo Violet | `#A78BFA` | 次高光、体积光尾 | 3–6% |
| Accent | Warm Aurora | `#F7A6C9` | 暖点缀,仅家居 / 健康场景 | < 3% |
| Neutral | Ink Snow | `#E8ECF5` | 极少量高光斑、粒子近白 | < 2% |

**调色硬规则**
- 冷色(蓝 / 紫)面积占比 **>= 75%**,暖色(粉 / 黄)**<= 15%**
- 单图只允许出现 **最多 2 种 Accent 色**,不要三色全上
- HSV 里 Saturation **<= 60**,H 不得出现红 / 橙 / 黄区间大块
- 最终作品必须能通过 sRGB gamut check(Photoshop → View → Gamut Warning 全清)

## 4. 光学设置 (Lighting Setup)

**灯位(固定 3 灯 + 环境)**

| 灯 | 方向 | 色温 | 相对强度 | 形态 |
| --- | --- | --- | --- | --- |
| Key | 左上 45°–60°(固定) | 4500 K | 1.00 | 柔光箱 / area light |
| Fill | 右下 | 6500 K | 0.15–0.25 | 环境反射,不直接照 |
| Rim | 主体侧后 | 9000 K 冷白 | 0.35–0.50 | 极细,只勾主体边缘 |
| Ambient | 全局 | 8000 K | 0.05 | IES:深夜室内 / 阴雨 |

**氛围**
- 体积光 (god rays): **必须有**,密度 低 (0.10–0.20)
- 体积雾 (volumetric fog): **必须有**,密度 0.03–0.05 per unit,远处偏紫
- 大气散射: Rayleigh 模拟,distance falloff `exp(-d * 0.015)`
- 光比 key:fill = **4:1 ~ 6:1**(典型低调人像光比,比电影戏剧化但不过分)

**禁止**
- 全局泛光 / HDRI 亮白环境 / 无方向漫反射
- 多点高光互打架(高光点必须 **只有 1 个**)
- 硬阴影轮廓(boolean-like)

## 5. 相机 & 镜头

- 传感器等效: 35 mm 全画幅
- 焦段:
  - 35 mm — 宽场景 (hero / spectrum / solutions group)
  - 50 mm — 人像级近景 (era / intelligence preview / intelligence hero)
  - 85 mm — 特写 / 图标级 (capability icons)
- 光圈: **f/2.0 – f/2.8**(景深可感但不极端)
- 快门感: 静态 1/125;长曝粒子 0.5–1.0 s
- ISO look: 400(干净主力) – 800(允许 hero / cta 轻微颗粒)
- 色彩曲线: **S 型**,Highlight roll-off 软,Shadow crush to value `10–15`(0–255)
- 变形: **禁用鱼眼 / 超广**,允许极轻微桶形(Midjourney --style raw 已默认接近)

## 6. 材质库 (Material Library)

一张图最多 **3 种材质共存**。名称对齐 Blender / C4D Redshift 命名:

1. **Liquid Metal** — 表面流动感;Roughness 0.05–0.15;IOR 2.3;HDR 天空反射
2. **Frosted Glass** — 半透;Roughness 0.30–0.50;内嵌几何隐现;微绿紫光学色散
3. **Volumetric Haze** — 体积雾(不要平面贴图);Density 0.03–0.05 with noise;Scattering anisotropy 0.2
4. **Matte Carbon Fiber** — 暗部主体;Roughness 0.70–0.90;极细斜纹织
5. **Soft Fabric (Microfiber)** — 床褥 / 窗帘;Fuzzy roughness 0.85;近景可见绒毛
6. **Brushed Anodized Aluminum** — 抽象器械 / 设备剪影;Anisotropic 0.4,沿长轴

**禁止材质**: 塑料强反光、cel-shade 硬描边、油画笔触、水彩晕染、Toon shader、LowPoly 三角面。

## 7. 噪点 / 颗粒

统一交付前叠一层 film grain,模拟 Portra 400 推一档:
- Grain size: **0.4** (在 2400 px 长边上)
- Amount: **8–12%**
- Monochromatic: **否**(要彩色噪点,但饱和度很低)

## 8. 构图规则

- **三分法网格**: 主体落在 4 个交点之一。**严禁居中**(icons 除外)
- **不对称**: 所有 4:3 / 16:9 作品明显偏左 1/3 或右 1/3
- **前 / 中 / 后三层**(Foreground / Midground / Background): 必须分明,层间用体积雾拉开,Depth 差异不小于 3 m(场景尺度)
- **视线引导**: 画面最亮点 **只有 1 个**,次亮点 ≤ 2 个
- **负空间**: ≥ 30%,用于暗背景或雾
- **文字叠放区预留**(hero / cta 用):
  - hero: 画面 **左 40%** 必须可读(加 20% 灰叠底后,文字对比度 >= 7:1)
  - cta: 画面中央无强对比元素,允许覆盖白字

## 9. 运动规则(仅 hero 视频)

- 时长 **6–10 s**,首尾帧 bit-identical 可无缝 loop
- 相机: **完全静止**(tripod lock)。不要推 / 拉 / 摇 / 移 / dolly / 轨道
- 动的内容: 粒子、雾密度、极慢悬浮几何体自转(角速度 `<= 2° / s`)
- 运动曲线: **easeInOutSine**,绝不用 linear 或 spring
- 源帧率: 30 fps 拍 / 渲,交付 60 fps(motion blur 由渲染器叠,shutter angle 180°)
- 编码: H.264 Main @ 8 Mbps (源), VP9 和 H.265 备份。`ffmpeg` 命令见末尾
- 色彩: Rec.709,限制电平(Limited 16–235,不走 Full)

## 10. 禁止清单 (Reject Conditions)

只要命中任何一条就 reject,不讨价还价:

- [ ] 画面内清晰人脸(即便远景也不行)
- [ ] 任何品牌 logo、商标、可辨识设备型号
- [ ] 画面中嵌入文字 / 数字 / 标签
- [ ] 真实医院 / 病床 / 监护仪设备细节(太沉重,与品牌基调冲突)
- [ ] 卡通 / Q 版 / Chibi / 水彩 / 油画
- [ ] 纯白或高亮背景(站内是深色主题)
- [ ] HDR 过曝(高光烧死到 `255,255,255`)
- [ ] 全黑纯暗(任何 16×16 区域亮度 < 5)
- [ ] 超广角 / 鱼眼 / 桶形畸变
- [ ] 超饱和霓虹 / Cyberpunk 美学
- [ ] 复古做旧 / CRT 扫描线
- [ ] 机器人脸 / 人形 AI / 骨架机械臂
- [ ] 任何暴力 / 医疗急救现场 / 老人不适场景的具象化

## 11. 交付规格

**每张图需交付**
- `*.psd` 或 `*.blend` / `*.c4d` 源文件(可回修),图层命名如下:
  - `L00 · Deep Space BG`
  - `L10 · Midground Volume`
  - `L20 · Hero Object`
  - `L30 · Rim Light`
  - `L40 · Particles`
  - `L50 · Grain`
  - `L99 · Final Adjustments`
- 位图成片: `*.webp` @ quality **85**,sRGB 嵌入色彩 profile,长边 **>= 2400 px**,16-bit 不必要但推荐
- 可选 `*.exr`(hero 用,留给后期合成)
- 文件名含版本: `home-era_v01.webp` / `home-era_v02.webp`

**hero 视频额外**
- `*.mp4`(H.264) + `*.webm`(VP9),各 `<= 4 Mbps`
- `*.mov`(ProRes 422) 源
- 首帧 `*.webp` 作为 poster(路径 `home/hero-poster.webp`)

---

# 单图 Brief

每张图按下面 7 个字段提交简报 → 美术接到后不再追问。字段固定:
**Intent / Reference / Composition / Lighting / Palette / Materials / Reject**。

---

## 主页 `home/`

### H01 · Hero background `home/hero.webp` 或 `home/hero.mp4` — 21:9 · 3840×1644

- **Intent**: 一片缓慢呼吸的空间能量场。不具体到房间,只是"智能正在苏醒"前的 10 分钟。
- **Reference**: 《Arrival》飞船悬停起雾段落 + Apple Vision Pro 官网首屏 + Rhei 静帧
- **Composition**: 35mm, 平视略仰 5°。下 1/3 暗涌深海蓝,中段散点粒子阵,上 1/3 雾层。**左 40% 保证文字可读**(hero title 会叠上来)。主体锚点落在右 2/3 上 1/3 交点:一个半透明悬浮几何体(球或长方柱)直径约画面高度 15%。
- **Lighting**: Key 左上 55°,Rim 冷白勾几何体右缘,Fill 极弱。整体光比 5:1。god rays 从右上斜打穿过雾层。
- **Palette**: Deep Space `#0A0F1F`(55%)+ Nebula `#1A1030`(28%)+ Aurora Cyan 高光 `#7DD3FC`(≤8%)+ Halo Violet 体积尾 `#A78BFA`(≤5%)
- **Materials**: Liquid Metal(几何体)+ Volumetric Haze(环境)+ 粒子(点光,直径 0.5–1.5 px)
- **Reject**: 摄像机移动、几何体数量 > 2、任何建筑 / 家具出现、文字可读区亮度 > 60

**视频版额外**
- 只动粒子(漂浮速度 `<= 3 px/s`)+ 雾密度呼吸(周期 4 s,±10%)+ 几何体自转 1.5°/s
- 首尾帧必须一致,使用 ping-pong 或 wrap seamless
- 时长 8 s,30 fps 渲 → 60 fps 交付

### H02 · Era illustration `home/era.webp` — 4:3 · 1600×1200

- **Intent**: 可视化"计算回到你身边"。一朵稀释的云(远) → 一颗近处的 edge 内核(近)。
- **Reference**: 《Arrival》heptapod 墨团 + Benjamin Bardou 极简星体
- **Composition**: 50mm,视平线。画面左 1/3 一团正在稀释的云(直径占画面宽 30%,虚焦 f/2.0),右 2/3 下 1/3 交点上悬浮一颗 edge 内核(实焦,直径占画面宽 12%)。中间一条粒子轨迹从云心连到内核,呈 s-curve,不是直线。
- **Lighting**: Key 左上,内核自发光强度 0.8,勾 Rim 冷白。云体积光散射,边缘羽化 > 80 px。
- **Palette**: 云侧 Halo Violet `#A78BFA` 主导(虚),内核侧 Aurora Cyan `#7DD3FC` 主导(实)+ Deep Space 背景
- **Materials**: Volumetric Haze(云)+ Liquid Metal(内核)+ 粒子轨迹(发光点 + 轻微 trail blur)
- **Reject**: 云带文字 "Cloud"、内核带文字 "Edge"、真实服务器机柜或手机出现、轨迹走直线

### H03 · Spectrum · Bedside `home/spectrum-bedside.webp` — 4:3 · 1600×1200

- **Intent**: 床畔。一盏抽象灯,一个不打扰的夜晚 2 点。
- **Reference**: Todd Hido《A Road Divided》+ 《Her》室内调
- **Composition**: 50mm,水平略俯 10°。右下 1/3 交点一盏抽象床头灯(只给一团圆形柔光 + 隐约金属底座轮廓),灯罩直径占画面高 25%。左侧大面积夜色,灯光向画面左上羽化。下边缘 1/5 隐约一条被褥起伏。
- **Lighting**: **唯一光源为灯本身**(practical light),2700 K 暖白;无 Key / Rim,只用自发光 + 极弱环境。暖光半径仅覆盖画面右下 40%,过渡平滑。
- **Palette**: Void `#05070E`(50%)+ Deep Space(30%)+ Warm Aurora `#F7A6C9` 暖光尾(≤8%)+ 极少量 Aurora Cyan 床褥冷反射
- **Materials**: Soft Fabric(被褥)+ Brushed Aluminum(灯底座)+ Volumetric Haze(低密度)
- **Reject**: 整张床可见、闹钟 / 手机 / 书出现、画面超过 50% 亮度、出现人形

### H04 · Spectrum · Desk `home/spectrum-desk.webp` — 4:3 · 1600×1200

- **Intent**: 书桌。在思绪到达之前,环境先准备好。清晨 6:30。
- **Reference**: Rinko Kawauchi 微光静物 + Playdate 官网 hero
- **Composition**: 50mm,俯视 30° 角。桌面占画面下 2/3,右下 1/3 交点一只冷金属咖啡杯剪影(不完整,半出画)。左上 1/3 交点一束窗光斜射,光带宽度 15–20% 画面宽。桌面纹理哑光木或石。
- **Lighting**: Key 左上窗光 5500 K,Fill 几乎无,Rim 冷白勾杯口。光比 6:1。god rays 穿过窗光区。
- **Palette**: Deep Space(50%)+ 窗光区 Aurora Cyan `#7DD3FC`(≤10%)+ 桌面哑光深紫棕(Nebula 衍生)
- **Materials**: Matte Carbon Fiber 或 Dark Wood(桌面)+ Brushed Aluminum(杯)+ 低密度 Haze
- **Reject**: 笔记本电脑 / 屏幕 / 键盘 / 手机 / 任何品牌、整桌俯视到所有东西都可见、杯身完整出现

### H05 · Spectrum · Home `home/spectrum-home.webp` — 4:3 · 1600×1200

- **Intent**: 家。下午 5 点,有人刚到家,房子已经准备好。
- **Reference**: 《Her》Theodore 家、Todd Hido 窗光民居
- **Composition**: 35mm,水平平视。画面中轴一扇抽象门洞或窗框(剪影,宽占画面 45%),透出混合暖冷光(暖 60%,冷 40%)。深处隐约有起居空间的几何剪影:沙发一角 / 一盆植物轮廓 / 一个书架剪影。地板(画面下 1/5)可见柔光反射。
- **Lighting**: Practical 主光来自门 / 窗内,3200 K;Key 从左前方补 4500 K 天光;Rim 无;god rays 从门内射出到地板。
- **Palette**: Warm Aurora `#F7A6C9` + 暖黄 `#FFD89D` 轻量混入(冷暖临界)+ Deep Space 外部 + Nebula 阴影
- **Materials**: Soft Fabric(沙发)+ Frosted Glass(门 / 窗)+ Haze(门内外过渡)
- **Reject**: 可辨识家电(电视 / 冰箱 / 品牌音箱)、人或宠物出现、室外景可辨识(城市 / 自然景观)

### H06 · Spectrum · Community `home/spectrum-community.webp` — 4:3 · 1600×1200

- **Intent**: 社区。一栋楼、一条街,彼此照应,而不彼此窥视。
- **Reference**: Todd Hido 夜景俯瞰 + Blade Runner 2049 洛杉矶外景
- **Composition**: 35mm,高空俯视 45°。画面 8–12 栋抽象楼群剪影,无具体城市特征(不要摩天大楼,中层为主)。每栋随机亮 2–3 扇窗(暖黄 `#FFD89D` 2700 K),楼与楼之间有极细淡青色连接线(线宽 1–2 px,opacity 0.15)。
- **Lighting**: 主光=各窗 practical,均匀分布;环境=月光等效 8000 K 极弱;天空顶部 Halo Violet 晕染。
- **Palette**: Void(60%)+ 暖窗 `#FFD89D`(≤10%)+ Aurora Cyan 连线(≤5%)+ Halo Violet 天光(≤8%)
- **Materials**: Matte Carbon Fiber(楼体)+ 窗玻璃 Frosted Glass(微透)+ Haze(低层雾霭)
- **Reject**: 街道标识 / 汽车 / 路灯 / 广告牌 / 可辨识城市地标、摩天大楼、鸟瞰到地面人群

### H07 · Intelligence preview `home/intelligence.webp` — 4:3 · 1600×1200

- **Intent**: "智能"本身的肖像。一个正在思考的内核。
- **Reference**: 《Ex Machina》Ava 内脏镜头的光 + Universal Everything "Familiar" 系列
- **Composition**: 50mm,平视。主体在右 1/3 交点,一颗缓慢旋转的有机多面体 / 神经网球体,直径占画面高 45%。外围 4 条极细光线(粗 2 px)伸向画外四方,各线尾一粒小光点(对应 Sense / Remember / Reason / Orchestrate,但不标字)。左 2/3 留空。
- **Lighting**: 内核 50% 自发光,Rim 白光勾全轮廓,Key 左上补表面高光。
- **Palette**: 内核内部 Halo Violet → Aurora Cyan 渐变,外部 Deep Space + Nebula 体积雾
- **Materials**: Liquid Metal 外壳 + Frosted Glass 夹层 + 内部光纤(emissive strand)+ Haze
- **Reject**: 脑的解剖形状、人形机器人、任何象征 AI 的俗套符号(齿轮、芯片 logo、二进制)

### H08 · Platform architecture `home/platform-arch.webp` — 16:9 · 2560×1440(预留)

- **Intent**: 四层记忆栈 + 五模态感知的抽象架构图。这张可以是位图,也可以直接 SVG。
- **Reference**: Ash Thorp UI 线稿 + Chaos Theory title sequence
- **Composition**: 35mm,正视。横向分 4 层(从下到上:L0 Static / L1 Dynamic / L2 Habit / L3 Semantic),每层为一条粒子密度不同的水平带。右侧 5 条垂直细线(视 / 红外 / 毫米波 / 声 / 环境)汇入左侧一颗 FactBase 球体(位于左 1/3 纵向中心)。底部一条极细金色 hash-chain 贯穿。
- **Lighting**: FactBase 球自发光,4 层粒子带自发光强度从下到上递增(L0=0.2,L3=0.9)。无传统 Key/Fill,整体发光式。
- **Palette**: Deep Space 背景(60%)+ 4 层渐变 Nebula → Aurora Cyan(各占 8%)+ hash-chain 暖金 `#FFC878`(≤3%)
- **Materials**: 都是 emissive,粒子 + 发光体,不使用 PBR
- **Reject**: 真实架构框图风格(方块 + 箭头 + 标签)、任何文字

### H09 · CTA background `home/cta-bg.webp` — 21:9 · 3840×1644(预留)

- **Intent**: 远景星云地平线,"下一个十年"的暗示。画面上会叠 CTA 白色大字。
- **Reference**: 《Interstellar》星云、Apple Vision Pro 第二屏
- **Composition**: 35mm,视平线微仰 3°。下 1/3 深海蓝平静地面雾,中 1/3 紫色星云带横贯,上 1/3 接近 Void。**中央 60% 区域必须低对比**(最大最小亮度差 < 30),为 CTA 白字预留。右上 1/5 一颗小亮星作唯一锚点。
- **Lighting**: 单一发光层(星云)+ 天顶漫反射,无方向硬光
- **Palette**: Void(40%)+ Nebula(35%)+ Deep Space(20%)+ Aurora Cyan 小亮星(≤2%)
- **Materials**: 纯 Volumetric Haze 分层 + 粒子
- **Reject**: 行星 / 具体可辨识天体、中央出现高对比元素、地平线实心(必须被雾化)

---

## 智能内核页 `intelligence/`

### I01 · Intelligence hero `intelligence/hero.webp` — 16:9 · 2560×1440

- **Intent**: "只属于你"的内核肖像。比 H07 更强调私密与专属。
- **Reference**: 《Arrival》墨团 + 《Blade Runner 2049》Joi 投影肌理
- **Composition**: 50mm,平视。主体在右 1/3 交点,一颗有机多面体,直径占画面高 60%(比 H07 更大更近)。左 2/3 暗色渐变 + 远处淡紫雾带。表面能感受到液态感但没有具象纹理。
- **Lighting**: 自发光 60%,Rim 冷白极细(线宽 <= 2 px),Key 左上 55° 高光点打在多面体右上。
- **Palette**: 多面体 Halo Violet → Aurora Cyan 渐变 + Deep Space + Nebula 雾
- **Materials**: Liquid Metal + 内部光纤 + Volumetric Haze
- **Reject**: 脑形 / 机械形 / 晶体形、对称几何(要有机)、多面体个数 > 1

### I02–I09 · 八张能力卡 · 1:1 · 1200×1200

**共用要求**
- **建议用 SVG 矢量**(无损、可响应式、体积小);位图方案退路是 PNG 透明背景 @ 1200×1200
- 深色背景 Deep Space 填充,不要透明(站内容器已是深色)
- 每张 **只用 1 种 Accent 色** + Deep Space + Nebula 三色搞定
- 符号线宽统一 2 px @ 1200 px,圆点直径 8–12 px
- 风格:极简线稿 + 1-2 个渐变光点 + 微量 Halo Violet 体积光。**不要插画风 / 不要 3D 渲染**
- 每张符号占画面中心 **50%–60%**,四周等量留白
- **禁止**文字、标签、英文标题嵌在图里

| 文件 | 主题 | 具体符号设计 | Accent 色 |
| --- | --- | --- | --- |
| `memory.svg` | 专属记忆 | 一个半透明球体(直径 60%),内部 3 条流动光纤按贝塞尔曲线穿过,球外壁一圈发光勾边 | Aurora Cyan |
| `personalization.svg` | 个性化设定 | 4 个同心但圆心错开的圆环(不完美重叠),每个环上一粒独立光点(代表家人),互不干涉 | Halo Violet |
| `learning.svg` | 习惯学习 | 一条从左下到右上的 s 曲线,沿线等距分布 30 粒渐变光点(左侧弱→右侧强,代表 30 天) | Aurora Cyan |
| `orchestra.svg` | 跨设备协同 | 中心一颗指挥点(直径 40 px),向外辐射 5 条光线,尾端各连一个小几何体(球 / 方 / 六角) | Halo Violet |
| `anticipatory.svg` | 主动前瞻 | 一支右向箭头(线条),箭头前方 30 px 处一个半透明圆环先行亮起,暗示"预警在事故之前" | Warm Aurora(仅此张破例) |
| `privacy.svg` | 隐私守护 | 盾形外壳(4 层同心叠加,对应四层网络锁),内部一颗发光核心 | Aurora Cyan |
| `offline.svg` | 离线可用 | 外侧两道断开的 Wi-Fi 弧线(有缺口),中心一颗稳定发光的核,核边缘完整 | Halo Violet |
| `household.svg` | 家庭画像 | 一个抽象屋顶三角剪影,屋内 4 粒独立光点(代表家庭成员),光点间有极细连接线 | Warm Aurora |

交付时提供 **SVG + PNG 双版本**,SVG 作主力,PNG 作兜底。

---

## 解决方案页 `solutions/`

### 四张分组 header · 16:9 · 2560×1440

统一构图: 35mm 平视,主体在右 2/3 上 1/3 交点区域,左 1/3 保持负空间。风格沿用 Creative Direction。

#### S-G1 · `solutions/group-health.webp` — 健康医养

- **Intent**: 最重的守护,最轻的存在。
- **Composition**: 远景,右侧一组极简医疗意象的抽象轮廓(点滴架剪影 + 监护仪柔光面板 + 窗帘轮廓),不出现病床。浸在深蓝雾中。左 1/3 留白。
- **Lighting**: 一束极淡绿光(生命体征意象,色 `#A8E8C8`,饱和度压到 20)从画面底部缓缓上升,经过监护仪面板时微扬
- **Palette**: Deep Space(55%)+ Nebula(25%)+ 生命绿 `#A8E8C8`(≤8%)+ Aurora Cyan 勾边(≤5%)
- **Reject**: 病人、医护人员、真实医疗设备品牌、血 / 药物 / 针具特写

#### S-G2 · `solutions/group-home.webp` — 家居生活

- **Intent**: 让房子懂家人。
- **Composition**: 一扇抽象窗透出暖黄光(窗占画面右 40%,垂直居中),落地板上(画面下 1/4)有柔和光斑,空气里浮尘。温度最暖的一组。
- **Lighting**: Practical 窗光 2700 K 暖,god rays 从窗斜打到地板,空气漂尘被照亮
- **Palette**: Warm Aurora + 暖黄 `#FFD89D`(≤15%)+ Deep Space(50%)
- **Materials**: Soft Fabric(窗帘隐约)+ Frosted Glass(窗玻璃)+ Haze(浮尘)
- **Reject**: 具体家电、人、宠物

#### S-G3 · `solutions/group-commercial.webp` — 商业空间

- **Intent**: 酒店 / 办公 / 零售 —— 空间学会接待。最冷调的一组。
- **Composition**: 空旷大堂的冷调视角,35mm 平视略仰 5°,画面下 1/3 地面反光强。深处远墙一条水平光带贯穿(宽 10% 画面高),为唯一锚点。
- **Lighting**: Practical 水平光带 5500 K + 地面反射 fill + 无 Rim
- **Palette**: Void(50%)+ Deep Space(30%)+ Aurora Cyan 光带(≤8%)
- **Materials**: Polished Concrete(地面,反射率 0.3)+ Matte Carbon Fiber(墙)+ Haze
- **Reject**: 人、家具细节、品牌装饰、窗外城市

#### S-G4 · `solutions/group-public.webp` — 教育与公共

- **Intent**: 校园 / 文化场馆 —— 大尺度下的体贴。介于前两者之间。
- **Composition**: 一排抽象拱廊 / 柱列剪影(5–7 根),35mm 平视,拱廊占画面上 2/3,光从柱间洒下形成 god rays,地面阴影成栅格状。
- **Lighting**: Key 高位斜射(模拟天窗),god rays 必须明显,Fill 弱
- **Palette**: Deep Space(45%)+ Nebula(25%)+ Halo Violet 光带(≤10%)+ 地面暖光反射 Warm Aurora(≤5%)
- **Materials**: Matte Stone(柱)+ Polished floor + Haze
- **Reject**: 真实建筑样式可辨识(哥特 / 罗马 / 现代主义)、具体学校或美术馆 logo

### 十张场景卡 · 4:3 · 1600×1200

沿用对应分组 header 的调性,更近景更具体一级。每张用 header 的 Palette ± 微调。

| 文件 | 具体景别 | Key detail | Reject |
| --- | --- | --- | --- |
| `elderly-care.webp` | 居家养老,夜景床畔 | 墙角一圈极淡冷青色监测光环(非实体传感器),床畔灯 practical 暖,"不打扰的守护" | 老人 / 病床 / 护理人员、仪器细节 |
| `community-care.webp` | 社区照护,多户格栅 | 3×4 网格窗口剪影,每扇窗亮度独立,间隔连接线 | 具体建筑、人、门牌号 |
| `clinical-assist.webp` | 专科医疗辅助,走廊尽头 | 长走廊 1 点透视,尽头一束冷白光,墙面极细心电纹曲线(线宽 1 px,opacity 0.2) | 医生、担架、急救灯 |
| `smart-home.webp` | 智能家居,客厅角落 | 沙发抽象剪影 + 茶几上一团柔光 + 空气极细连接线(设备之间) | 电视 / 音箱 / 具体家电 |
| `smart-room.webp` | 智能房间,3/4 卧室 | 床头灯亮,衣架轮廓,墙上一扇窗透冷光,整体暖度比 H03 高 | 人、手机、电视 |
| `hospitality.webp` | 酒店智能(规划中),门口视角 | 走廊尽头一扇房门微开,门缝透暖光,地面反光 | 酒店 logo / 房号 / 员工 |
| `workspace.webp` | 办公智能(规划中),会议室 | 椭圆桌剪影,中央悬浮光点,4–6 椅子轮廓隐约 | 笔记本电脑、投影幕、人 |
| `retail.webp` | 零售空间(规划中),橱窗 | 橱窗玻璃反光,内侧展架剪影,前侧漂浮的慢粒子(客流意象) | 商品 / 价签 / 品牌 logo |
| `campus.webp` | 智慧校园(规划中),夜色入口 | 教学楼拱形入口(剪影),台阶上一束光,远景一扇窗亮 | 学生、校徽、真实校园 |
| `cultural.webp` | 文化场馆(规划中),展厅 | 聚光灯打在虚空的展台上(展品不可见),空气中漂尘可见 | 展品细节、观众、展签 |

---

# 流程清单 (Production Checklist)

**立项前**
- [ ] 美术收到 Creative Direction 并拼完 moodboard(20–30 张参考)
- [ ] 色卡导入 Photoshop / Blender,建 Shared Swatch
- [ ] 灯位 rig 建好保存成 preset(供所有图复用)

**单图交付**
- [ ] 源文件图层命名合规(L00–L99)
- [ ] webp q85,长边 >= 2400 px,sRGB 嵌入 profile
- [ ] gamut check 通过
- [ ] 过 reject checklist 每一条
- [ ] hero video 通过 loop seamless 检验(首尾帧 bit-diff)
- [ ] 文件名含 version `v01 / v02`

**Review 流程**
- v01: 构图 + 光源灰模(黑白)
- v02: 颜色 + 材质
- v03: 加粒子 + grain + 最终合成

---

# 附: ffmpeg 转码命令(hero video 交付用)

源 ProRes 422 → 交付 H.264 + VP9 + poster,一把命令走完:

```bash
# H.264 mp4, 8 Mbps, 60 fps, yuv420p, Rec.709
ffmpeg -i hero_src.mov -vf "scale=3840:1644,fps=60" \
  -c:v libx264 -preset slow -b:v 8M -pix_fmt yuv420p \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -movflags +faststart -an home/hero.mp4

# VP9 webm, 6 Mbps
ffmpeg -i hero_src.mov -vf "scale=3840:1644,fps=60" \
  -c:v libvpx-vp9 -b:v 6M -row-mt 1 -an home/hero.webm

# poster 首帧 webp
ffmpeg -i hero_src.mov -frames:v 1 -q:v 85 home/hero-poster.webp
```

站内接入见上方 "Hero 接入图/视频" 段落。
