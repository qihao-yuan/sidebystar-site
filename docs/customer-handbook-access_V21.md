# V21 官网手册入口

手机与电脑的主要入口使用普通链接 `/customer/V21/index.html`，不带 `download`，不通过语言路由 Link 添加前缀。对应正式地址为 `https://sidebystar.com/customer/V21/index.html`，上线可达性由发布后的公网检查确认。

官网中英手册区采用相同层级：

1. 手机／在线阅读手册：直接打开网页，视频按需加载。
2. 电脑离线版（HTML）：保留单文件下载，明确用于电脑保存。
3. 图文阅读版（PDF）：保留下载，图片为静态预览，视频附件依赖兼容阅读器。

本次入口源代码仅修改 `content/customer-experience.ts` 与 `components/experience/CustomerExperience.tsx`。静态包复制、canonical 导出、整体构建及 GitHub 提交由本次交付统一处理。生产服务器部署由用户自行完成，本次不连接服务器或代为部署。没有新增漂亮路由或改变 IIS、locale 规则，首页按钮继续进入 `/experience#handbook`。

桌面窄屏检查不等于真实手机验收，公开 HTTPS 成功也不等于微信内置浏览器已经验证；上线后以实际手机浏览器反馈为准。

## 当前媒体版本

四条情境片已移除整条音轨，保留画面、烧录字幕和时长；软件操作录像原本无音轨。网站 /experience 与在线手册共 10 个 MP4 副本均采用无音轨文件。

电脑离线 HTML 为 15,918,487 bytes（15.9 MB），图文 PDF 为 14,281,564 bytes（14.3 MB）。源文件与摘要以 customer-media-adoption_V20.json、customer-handbook-source_V21.json 为准。

交付范围为 GitHub 源码和媒体包；生产服务器由用户自行部署，不把本地构建或旧 Sites 链接当作公司域名已上线。
