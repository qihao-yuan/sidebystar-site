# Product Asset Pipeline

所有产品素材按 SKU 分目录,遵守以下结构与命名规范。提供素材时请按此放置,站内组件会自动读取。

## 目录结构

```
public/product/
  home-box/
    hero.webp                  # 1920 x 1080, 背景透明或纯黑 #000
    hero@2x.webp               # 3840 x 2160
    hero@3x.webp               # 5760 x 3240 (可选, iOS Pro 显示屏需要)
    hero.avif                  # 同等分辨率 AVIF (可选, 浏览器优先)
    poster.webp                # 视频 poster 帧, 1920 x 1080
    video-loop.mp4             # H.264 10s 内无缝循环, muted, playsinline
    video-loop.webm            # VP9 备份
    explode/                   # 爆炸图序列帧
      frame-0001.webp
      frame-0002.webp
      ...
      frame-0030.webp
    gallery/                   # 45 / 俯视 / 细节等多视角
      front-45.webp
      top.webp
      detail-ports.webp

  community-kit/...            # 同样结构
  enterprise-stack/...
```

## 规格 (对齐 Apple 级交付)

- **分辨率**: 长边 >= 3840 px
- **背景**: 纯黑 #000 或透明 PNG (便于站内叠底)
- **色彩**: sRGB, gamma 2.2, 嵌入色彩 profile
- **视频**:
  - 时长 <= 10s 无缝循环
  - H.264 baseline + VP9 / AV1 备份
  - muted, playsinline, autoplay 友好
  - bitrate <= 4 Mbps (移动端流畅)
- **爆炸图**:
  - 30 帧 / 1 秒播放, webp 平均 < 60 KB / 帧
  - 起点为完整产品, 终点为所有元件分层展开
  - 光照统一, 摄像机固定

## 组件对接

素材就绪后, 在 `components/products/SkuShowcase.tsx` 里将占位 icon 替换为 `<Image src="/product/home-box/hero@2x.webp" ... />` 或 `<video>` 标签即可. 接入示例见 `docs/COMPONENT_MAPPING.md` (TBD).
