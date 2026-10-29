// Customer-facing V20 copy and adopted media. Stage labels follow the source records;
// this module does not turn design images or concept films into hardware acceptance.
import { customerBase, customerImages } from '@/content/product-visuals';
import { productLabel } from '@/content/product-names';
export { customerBase, customerImages } from '@/content/product-visuals';
export type LocalizedText = { zh: string; en: string };
export const pickText = (text: LocalizedText, locale: string) => locale === 'zh-CN' ? text.zh : text.en;

export const softwareLoops = [
  { id: 'memory', image: `${customerBase}/software/memory.png`,
    title: { zh: '记住与找回', en: 'Remember and retrieve' },
    example: { zh: '“眼镜放在钢琴旁的抽屉里。”', en: '“My glasses are in the drawer by the piano.”' },
    body: { zh: '保存明确交代的物品位置和预约事项，之后检索、纠正或删除当前记录。', en: 'Save a location or appointment you explicitly share, then find, correct or delete the current record.' } },
  { id: 'task', image: `${customerBase}/software/task.png`,
    title: { zh: '准备与跟进', en: 'Prepare and follow through' },
    example: { zh: '“帮我准备周末出行。”', en: '“Help me prepare for a weekend trip.”' },
    body: { zh: '核对准备方案后创建任务，逐项记录进度，继续处理未完成事项。', en: 'Review a preparation plan, create a task and record progress as you continue the remaining items.' } },
  { id: 'choice', image: `${customerBase}/software/choice.png`,
    title: { zh: '建议与调整', en: 'Adjust suggestions' },
    example: { zh: '“这项稍后再处理。”', en: '“I will deal with this later.”' },
    body: { zh: '对到期建议选择接受、稍后、拒绝或暂停，并核对处理后的任务记录。', en: 'Accept, defer, decline or pause a due suggestion, then review the resulting task record.' } },
] satisfies Array<{ id: string; image: string; title: LocalizedText; example: LocalizedText; body: LocalizedText }>;

export const storyFilms = [
  { id: 'rain', title: { zh: '周末听雨', en: 'A little longer with the rain' }, body: { zh: '保留观看雨景的兴致，让既定场景根据已确认的安排调整。', en: 'Make room for a little more time with the rain, within the household arrangement already agreed.' } },
  { id: 'romance', title: { zh: '再看一会儿', en: 'A few more minutes' }, body: { zh: '晚霞还在，窗帘可以为两个人的停留多等一会儿。', en: 'The sunset is still there. A curtain scene can leave a little more time for two people to stay.' } },
  { id: 'anniversary', title: { zh: '等我们说惊喜', en: 'Wait for our surprise' }, body: { zh: '孩子准备了一份纪念日心意，灯光配合他们揭晓的时机。', en: 'The children have prepared an anniversary gift. The lighting joins the moment they choose to reveal it.' } },
  { id: 'glasses', title: { zh: '出门前，找回眼镜', en: 'Find the glasses before heading out' }, body: { zh: '从明确交代的位置记录，找回今天出门要用的东西。', en: 'Retrieve what is needed today from a location explicitly recorded earlier.' } },
] satisfies Array<{ id: string; title: LocalizedText; body: LocalizedText }>;

export const productDirections = [
  { id: 'host', image: customerImages.host, tag: { zh: '中枢配置方向', en: 'Hub configuration' }, title: productLabel('SBS-C01'), body: { zh: '运行 AIOS 与设备接入服务。基础配置和较高负载分别评估，也可研究经 HDMI 使用现有电视。', en: 'Runs AIOS and device integration services. Base and higher-load configurations are evaluated separately, including an HDMI workspace on an existing TV.' } },
  { id: 'water', image: customerImages.kitchen, tag: { zh: '电池无线外观方向', en: 'Battery-powered wireless design' }, title: productLabel('SBS-S04'), body: { zh: '放在易积水位置，关注接头或设备附近的积水事件。底部触点、可更换电池，无外露USB。', en: 'Designed for locations where water can collect near a joint or appliance, with underside contacts, replaceable batteries and no exposed USB port.' } },
  { id: 'acoustic', image: customerImages.acoustic, tag: { zh: '声学用途验证中', en: 'Acoustic use under validation' }, title: productLabel('SBS-S05'), body: { zh: '窄条外观与独立拾音区，用于研究用水声音线索；采用无线数据传输和隐藏低压供电。', en: 'A slim bar with a dedicated acoustic opening for studying water-use sound cues, using wireless data and concealed low-voltage power.' } },
  { id: 'radar', image: customerImages.bathroom, tag: { zh: '毫米波适配方向', en: 'mmWave integration design' }, title: productLabel('SBS-S09'), body: { zh: '薄平面吸顶外观，面向存在、静止与疑似跌倒状态的研究；背部隐藏低压供电，安装与算法按场景验证。', en: 'A flat ceiling design for presence, stillness and suspected-fall research, with concealed low-voltage power and scene-specific installation and algorithm validation.' } },
] satisfies Array<{ id: string; image: string; tag: LocalizedText; title: LocalizedText; body: LocalizedText }>;

export const roomApplications = [
  { id: 'kitchen', title: { zh: '厨房与用水区域', en: 'Kitchen and water-use areas' }, body: { zh: '关注积水位置与处理记录。关水执行器仅在阀型、独立水路和维护空间确认后选配。', en: 'Focus on where water collects and how the event is handled. Any shutoff option first requires confirmation of the valve, water circuit and maintenance space.' } },
  { id: 'bathroom', title: { zh: '卫生间与相邻干区', en: 'Bathroom and adjacent dry areas' }, body: { zh: '评估存在、持续静止和疑似跌倒状态，依据实物与现场验证确定安装位置及提示方式。', en: 'Evaluate presence, sustained stillness and suspected falls, with placement and notifications established through physical and on-site validation.' } },
  { id: 'bedside', title: { zh: '床旁与日常操作', en: 'Bedside and everyday interaction' }, body: { zh: '保留便于使用的操作入口。血压、血氧等测量采用相应原厂产品，按具体型号确认数据接入。', en: 'Retain accessible controls. Blood-pressure and oxygen measurements use appropriate original-manufacturer products, with data integration verified by model.' } },
  { id: 'entrance', title: { zh: '门口与来访', en: 'Entrance and visitors' }, body: { zh: '按需要适配门铃、摄像头和门磁。查看来访信息与开锁权限分别配置。', en: 'Configure doorbells, cameras and contacts as needed. Visitor information and unlocking permissions are managed separately.' } },
  { id: 'curtains', title: { zh: '窗帘与房间场景', en: 'Curtains and room scenes' }, body: { zh: '电机、轨道、支架与负载成套选择，依据成员意愿、规则和现场条件确认可用场景。', en: 'Select motors, tracks, mounts and loads as one system, then confirm scenes against household preferences, rules and site conditions.' } },
  { id: 'tv', title: { zh: '电视上的家庭事务入口', en: 'A household workspace on the TV' }, body: { zh: '优先评估现有主机经HDMI显示事项与操作界面，核对遥控、待机及电视关闭后的其他入口。', en: 'Evaluate tasks and controls over HDMI from the existing host, including the remote, standby behavior and access when the TV is off.' } },
] satisfies Array<{ id: string; title: LocalizedText; body: LocalizedText }>;

export const manualDownloads = {
  web: '/customer/V23/index.html',
  html: '/customer/V23/循星AIOS产品手册.html', htmlMB: '16.1',
  pdf: '/customer/V23/AIOS_customer_manual_V23.pdf', pdfMB: '14.6',
};
