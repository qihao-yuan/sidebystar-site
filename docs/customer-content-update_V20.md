# V20–V21 客户内容采用说明

2026-10-29。这份记录用于官网源码与客户媒体的 GitHub 发布采用，以及后续由用户自行部署。手册及公司数字资产整理完成后同步到网站；生产服务器部署由用户自行完成，本次不连接服务器或代为部署。

## 已落地内容

- 首页直接展示新产品图，手机也可见；标题为“个人生活助手 / A personal life assistant”，说明交付由助手软件、家庭主机与按需房间终端组成。
- 产品页展示主机、水浸卵石、声学窄条和毫米波平盘四种形态。声学图只用 CSS 展示原族图局部。水浸为电池无线设计，声学与毫米波为无线数据加隐藏低压供电。
- Home Box、Community Kit、Enterprise Stack 按配置范围展示，不对应虚构已定型的三台主机。去掉未经确认的报价、部署周数与规模承诺。
- 新增双语 /experience，集中展示现有软件的记录、任务、建议操作和四条生活情境影片。手册优先进入 `/customer/V21/index.html` 在线阅读，另保留电脑离线 HTML 与图文 PDF 下载。公开页面是录像入口，可预约实际软件演示。
- 系统页和住宅、单房间、照护等应用页按用途更新。水阀须现场确认，医疗测量、门铃门锁与窗帘为原厂选配；设备适配不以概念影片代替。
- 中英文同步标题、说明、导航、元数据及体验页站点地图。四条情境影片保留画面、烧录字幕与时长，移除整条音轨；软件操作录像原本没有音轨。五段视频提供英文 WebVTT 字幕。
- 修复动态 /icon 与 /opengraph-image 被语言路由中间件错误前缀化的问题，两个资源入口实际返回 200。

## 媒体与手册

V20 采用清单为 `docs/customer-media-adoption_V20.json`，逐项绑定来源、目标、字节数及双方 SHA-256，记录 5 张设计/安装图、3 张真实软件截图、5 段视频、5 张海报、5 份英文字幕和 2 份下载手册。V21 在线手册的文件与来源记录见 `docs/customer-handbook-source_V21.json`。当前采用的大小与摘要以这两份清单为准。网页用产品设计效果图，不称样机实拍；原厂安装示意不作为已适配证明。旧拍枕头雨片与内部工程文件未采用。

### 当前无音轨手册

- 电脑离线 HTML：15,918,487 bytes（15.9 MB），SHA-256 f419f3d3fcffac9a04f7b3a811eab5402eb157afb245edaec7ba3ac50a300d44。
- 图文 PDF：14,281,564 bytes（14.3 MB），SHA-256 214fc20302310eb5b9e797c9f47bf922e374eb7f8474abdbda3de9f481dc69e5。
- V21 在线入口文件：39,691 bytes，SHA-256 bbe24d044bff9eb61bde40dad5ffb2231ea607ef7ab9d71dfe8a0f65c64d5bab；23 个外置媒体包含 18 张图片与 5 段视频，视频均无音轨。

此次只准备官网源码与媒体并上传 GitHub；生产服务器部署由用户自行完成。当前无音轨采用与源文件核对记录为 AIOS V21/review/site-voice-free-final-handoff.json。

以下为去音轨更新前的历史手册快照，不作为本次无音轨版本的当前摘要：

- 单文件多媒体手册：16,891,499 bytes，SHA-256 5e1ca4e31684474d13593c225d8d79d98158cb5fe2fa74a4d59e7002db1fcd10。
- PDF：15,011,282 bytes，SHA-256 75e14d632160cc0154e6ee265a2390eace75970eaf86dc3a499fcfd4e7704f98。
- 手册正文目前为中文，英文页已明确说明；PDF 视频作为附件，需要兼容阅读器。网站英文字幕不等同英文配音。

## 历史验证记录

V20 当时的 npm run typecheck、npm run lint、npm run build 通过，构建生成 87 个静态页面。浏览器以 Edge 检查中英桌面与模拟手机尺寸页面、五视频实际短播放与英文字幕、两份 HTTP 下载的大小和 SHA。详细记录在 AIOS V20/review/site-browser-check.json 与 site-validation.json；独立复核在 site-peer-browser-observations.json 及其最终首页复核记录。这些记录保留原执行事实，不代表本次去音轨更新或真实 iPhone、微信内浏览器已完成验收。

当时本地构建预览使用 http://localhost:3102/zh-CN 与 http://localhost:3102/en，仅绑定 ::1 loopback；它不是客户手机可访问的公网地址。客户在线手册入口为 `https://sidebystar.com/customer/V21/index.html`，上线由用户自行部署后确认。现有实际软件的本地端口未写入公开内容。

当时构建有现有 Browserslist 数据库、edge 静态生成提示；生产图片优化提示可选 sharp，未为内容改版增装依赖。本次承接既有产品目录、产品家族资料、proposals，以及系统页、产品生态和套装组件的工作。


## PDF 视频入口提示修订的历史记录

PDF 视频页的图片为静态预览，视频以附件保留。此前仅修订入口提示时，HTTP 下载曾返回 15,011,282 bytes，SHA-256 75e14d632160cc0154e6ee265a2390eace75970eaf86dc3a499fcfd4e7704f98；对应记录为 site-pdf-playback-label-update.json。该值是去音轨更新前的历史快照，当前文件以采用清单为准。手机观看视频请使用部署后的在线手册，电脑离线 HTML 与 PDF 的用途分别标明。
