import {
  Sunrise,
  HeartPulse,
  Cable,
  Workflow,
  Zap,
  Hotel,
  Stethoscope,
  Mic2,
  type LucideIcon,
} from 'lucide-react';

export type PluginKind = 'official' | 'partner';
export type PluginStage = 'ga' | 'beta' | 'roadmap';
export type PluginTopic = 'health' | 'home' | 'commercial' | 'infra';

export type PluginManifest = {
  permissions: string[];
  capabilities: Array<{ kind: string; descZh: string; descEn: string }>;
  actions: Array<{ id: string; descZh: string; descEn: string }>;
  installCommand: string;
  repoUrl?: string;
};

export type Plugin = {
  slug: string;
  icon: LucideIcon;
  nameZh: string;
  nameEn: string;
  vendorZh: string;
  vendorEn: string;
  kind: PluginKind;
  stage: PluginStage;
  topic: PluginTopic;
  taglineZh: string;
  taglineEn: string;
  storyZh: string;
  storyEn: string;
  highlights: Array<{ zh: string; en: string }>;
  /** 这个插件让空间里"发生什么" (叙事化结果) */
  outcomeZh: string;
  outcomeEn: string;
  manifest?: PluginManifest;
};

export const plugins: Plugin[] = [
  {
    slug: 'dawn-light',
    icon: Sunrise,
    nameZh: '晨光',
    nameEn: 'Dawn Light',
    vendorZh: '循星官方',
    vendorEn: 'By SidebyStar',
    kind: 'official',
    stage: 'ga',
    topic: 'home',
    taglineZh: '让夜里的灯, 懂怎么陪你起床。',
    taglineEn: 'A light that knows how to walk you through the night.',
    storyZh:
      '夜里起身时, 它让走廊先亮到 10% 柔光。清晨, 它顺着日光的节奏慢慢把房间唤起 —— 不需要你设闹钟, 也不需要你设场景。用得久了, 它知道谁晚上会渴、谁习惯在哪一侧下床。',
    storyEn:
      'Step out at night and the hallway eases to 10% warm light. Come morning, it wakes the room to the rhythm of daylight -- no alarm, no preset scene. Over time it learns who gets up for water, who steps out on which side of the bed.',
    highlights: [
      { zh: '夜间路径照明, 不用摸黑走', en: 'Gentle pathway light at night, no fumbling' },
      { zh: '日光渐亮唤醒, 比闹钟温柔', en: 'Daylight-ramped wake, kinder than an alarm' },
      { zh: '越用越懂, 不用手动设置', en: 'Learns with use -- no scene to configure' },
    ],
    outcomeZh: '夜里不用再摸着墙找开关; 清晨醒来, 屋子已经知道这是你要的早晨。',
    outcomeEn: 'No more fumbling along the wall at night; by morning the room already knows which kind of day is yours.',
    manifest: {
      permissions: ['sense:presence:read', 'sense:light:read', 'actuate:light:write', 'memory:habit:read'],
      capabilities: [
        { kind: 'scene', descZh: '夜间路径场景, 识别到起夜后沿路径渐亮', descEn: 'Nighttime pathway scene, gradual wake along the walk' },
        { kind: 'wake', descZh: '日光渐亮, 按本地经纬度与天气推导色温', descEn: 'Daylight ramp, color temperature derived from local coords and weather' },
      ],
      actions: [
        { id: 'pathway.engage', descZh: '启动夜间路径照明', descEn: 'Engage nighttime pathway lighting' },
        { id: 'wake.schedule', descZh: '调度日光唤醒', descEn: 'Schedule the daylight wake' },
      ],
      installCommand: 'aios plugin install dawn-light',
      repoUrl: 'https://github.com/sidebystar/plugin-dawn-light',
    },
  },
  {
    slug: 'fall-watch',
    icon: HeartPulse,
    nameZh: '夜守',
    nameEn: 'Fall Watch',
    vendorZh: '循星官方',
    vendorEn: 'By SidebyStar',
    kind: 'official',
    stage: 'ga',
    topic: 'health',
    taglineZh: '跌倒可以被提前识别, 关心可以走在呼唤之前。',
    taglineEn: 'A fall seen before it finishes. Care that arrives before the call.',
    storyZh:
      '它用毫米波读取呼吸、姿态与轨迹, 再用声学感知判断动静。不靠摄像头对着老人, 却能分清"夜里起身、离床、超时坐起、跌倒"这四种情况。告警分级送达家属与值班护士, 断网也不影响。',
    storyEn:
      'It reads breath, posture, and motion with mmWave, and listens for the shape of movement. No camera trained on a person, yet it can tell apart a night walk, a bed leave, a lingering sit, and a fall. Alerts land at different levels for family and duty nurse -- even offline.',
    highlights: [
      { zh: '不靠摄像头对着脸, 隐私优先', en: 'No camera on the face, privacy first' },
      { zh: '四种情况分级告警, 少扰少漏', en: 'Four kinds of alerts, finely tiered' },
      { zh: '断网也能告警, 本地完成', en: 'Alerts hold offline, finished locally' },
    ],
    outcomeZh: '夜里那张床, 真的可以被依靠。',
    outcomeEn: 'The bed at night truly becomes something to count on.',
    manifest: {
      permissions: ['sense:mmwave:read', 'sense:acoustic:read', 'alert:emit', 'profile:resident:read'],
      capabilities: [
        { kind: 'detect', descZh: '跌倒、久卧、离床、超时坐起四类识别', descEn: 'Detects fall, prolonged lying, bed leaving, excessive sitting' },
        { kind: 'tier-alert', descZh: '按严重度分级告警, 家属与值班护士各自触达', descEn: 'Alert tiered by severity, routed separately to family and duty nurse' },
      ],
      actions: [
        { id: 'alert.dispatch', descZh: '向家属或值班岗位派发告警', descEn: 'Dispatch alert to family or duty post' },
        { id: 'incident.record', descZh: '记录事件到本地审计账本', descEn: 'Record the incident to the local audit ledger' },
      ],
      installCommand: 'aios plugin install fall-watch',
      repoUrl: 'https://github.com/sidebystar/plugin-fall-watch',
    },
  },
  {
    slug: 'energy-keeper',
    icon: Zap,
    nameZh: '能量守',
    nameEn: 'Energy Keeper',
    vendorZh: '循星官方',
    vendorEn: 'By SidebyStar',
    kind: 'official',
    stage: 'beta',
    topic: 'home',
    taglineZh: '每一度电去了哪, 都能被看见, 也能自动省。',
    taglineEn: 'Every kilowatt-hour, accounted for -- and quietly saved.',
    storyZh:
      '它从空调、地暖、热水器、照明的节拍里找节能空间, 在你感觉不到的时候调一调 —— 让舒适保持原样, 账单低一些。每一次调整, 都留下可查的记录, 让你知道是哪一次让电费少了几十块。',
    storyEn:
      'It finds the small slacks in your HVAC, underfloor heating, water heater, and lighting, and nudges them while you do not notice -- keeping the comfort, trimming the bill. Every change is logged, so you can see which nudge saved which dollars.',
    highlights: [
      { zh: '舒适不变, 账单下降', en: 'Comfort unchanged, bill down' },
      { zh: '所有节能调整都可回放', en: 'Every saving nudge is replayable' },
      { zh: '开着它不扰人, 关着它也不失控', en: 'On: quiet. Off: safe.' },
    ],
    outcomeZh: '一个月后, 你会在账单上第一次看见它。',
    outcomeEn: 'In a month, you see it for the first time -- on the bill.',
    manifest: {
      permissions: ['sense:energy:read', 'sense:temperature:read', 'actuate:hvac:write', 'actuate:light:write', 'ledger:write'],
      capabilities: [
        { kind: 'optimize', descZh: '空调、地暖、照明、热水器联合节拍优化', descEn: 'Joint cadence optimization across HVAC, heating, lighting, and water heater' },
        { kind: 'explain', descZh: '为每一次节能动作生成可读解释', descEn: 'Generates a readable explanation per saving action' },
      ],
      actions: [
        { id: 'hvac.ease', descZh: '微调空调节奏', descEn: 'Ease HVAC cadence' },
        { id: 'report.export', descZh: '导出月度能耗报告', descEn: 'Export monthly energy report' },
      ],
      installCommand: 'aios plugin install energy-keeper --channel beta',
      repoUrl: 'https://github.com/sidebystar/plugin-energy-keeper',
    },
  },
  {
    slug: 'matter-bridge',
    icon: Cable,
    nameZh: 'Matter 桥',
    nameEn: 'Matter Bridge',
    vendorZh: '合作伙伴',
    vendorEn: 'Partner',
    kind: 'partner',
    stage: 'ga',
    topic: 'infra',
    taglineZh: '让你家现在的设备, 都能在 AIOS 里一起说话。',
    taglineEn: 'Lets the devices you already own speak the same language in AIOS.',
    storyZh:
      '它把你家里原有的设备 —— 不管是新买的、旧的、从邻居那继承来的 —— 接进 AIOS 的同一张协议网。你不用换牌子, 不用重新布线, 也不用担心哪一天某个云下线了。',
    storyEn:
      'It brings the devices you already own -- new, old, or inherited from a neighbor -- into the same fabric inside AIOS. No brand swap, no rewiring, no worry about a cloud going dark one day.',
    highlights: [
      { zh: '主流协议都能说', en: 'Speaks the mainstream protocols' },
      { zh: '不用换你家原有的灯与门锁', en: 'No need to replace existing lights and locks' },
      { zh: '云下线, 设备依然能用', en: 'Devices keep working when a cloud goes dark' },
    ],
    outcomeZh: '家里看似杂乱的一堆品牌, 终于能在一张表上被看清楚。',
    outcomeEn: 'That mess of brands in your home finally reads as one list.',
    manifest: {
      permissions: ['connect:matter:read', 'connect:matter:write', 'facts:devices:write'],
      capabilities: [
        { kind: 'bridge', descZh: 'Matter / Thread / Wi-Fi / Zigbee 设备统一接入', descEn: 'Bridges Matter, Thread, Wi-Fi, Zigbee devices' },
        { kind: 'sync', descZh: '与 FactBase 保持设备状态同步', descEn: 'Keeps device state in sync with FactBase' },
      ],
      actions: [
        { id: 'device.enroll', descZh: '登记新发现的设备', descEn: 'Enroll a newly discovered device' },
        { id: 'device.command', descZh: '下发跨协议设备指令', descEn: 'Send a cross-protocol device command' },
      ],
      installCommand: 'aios plugin install matter-bridge',
    },
  },
  {
    slug: 'homeassistant-sync',
    icon: Workflow,
    nameZh: 'Home Assistant 同行',
    nameEn: 'Home Assistant Sync',
    vendorZh: 'Home Assistant 社区',
    vendorEn: 'Home Assistant Community',
    kind: 'partner',
    stage: 'ga',
    topic: 'infra',
    taglineZh: '你在 HA 里写过的每一条自动化, 都不会白费。',
    taglineEn: 'Every automation you wrote in HA comes along.',
    storyZh:
      '如果你之前用 Home Assistant 管着全屋, 这个插件会把你的自动化、实体、仪表板都映射进 AIOS 的事实库, 让两边并行运行, 甚至互相学习。换系统, 不等于从零开始。',
    storyEn:
      'If Home Assistant has been managing your home, this plugin maps your automations, entities, and dashboards into the AIOS fact base -- so both sides can run side by side, even learn from each other. Switching systems does not have to mean starting over.',
    highlights: [
      { zh: 'HA 的自动化可以继续用', en: 'Keep running your HA automations' },
      { zh: '实体、仪表板、区域自动同步', en: 'Entities, dashboards, areas auto-synced' },
      { zh: '两边并行, 不用一刀切', en: 'Run both sides in parallel, no hard cut' },
    ],
    outcomeZh: '你花在 Home Assistant 上的每个周末, 都没有白费。',
    outcomeEn: 'Every weekend you spent on Home Assistant, still pays.',
    manifest: {
      permissions: ['ha:entities:read', 'ha:automations:read', 'facts:entities:write'],
      capabilities: [
        { kind: 'sync', descZh: '实体与自动化的双向映射', descEn: 'Two-way mapping of entities and automations' },
      ],
      actions: [
        { id: 'ha.mirror', descZh: '从 Home Assistant 拉取最新状态', descEn: 'Mirror the latest state from Home Assistant' },
      ],
      installCommand: 'aios plugin install homeassistant-sync',
    },
  },
  {
    slug: 'concierge-script',
    icon: Hotel,
    nameZh: '客房管家',
    nameEn: 'Concierge Script',
    vendorZh: '合作伙伴',
    vendorEn: 'Partner',
    kind: 'partner',
    stage: 'beta',
    topic: 'commercial',
    taglineZh: '客人未到, 房间已经为他准备好。',
    taglineEn: 'The room is ready for the guest before check-in.',
    storyZh:
      '把客人的温度偏好、光线偏好、喜好的欢迎场景, 做成一份可随身画像。预订信息一到, 房间就开始轻轻调温、调光。退房后, 个人设定随画像离开, 下一位客人进来, 房间又回到安静的默认。',
    storyEn:
      'Put a guest\'s preferred temperature, lighting, and welcome scene into a small travelling profile. When the booking arrives, the room quietly warms and dims in preparation. After check-out, the personal settings leave with the profile; the room returns to quiet default.',
    highlights: [
      { zh: '入住前房间已经温热', en: 'Room warms before arrival' },
      { zh: '画像随客人走, 换房不重设', en: 'Profile travels with the guest, re-room without reset' },
      { zh: '退房后房间回到默认, 不留私人痕迹', en: 'After check-out, the room returns to default -- no private trace' },
    ],
    outcomeZh: '客人第一次推开门, 就像回家。',
    outcomeEn: 'The guest pushes open the door, and it already feels like coming home.',
    manifest: {
      permissions: ['profile:guest:read', 'profile:guest:write', 'actuate:light:write', 'actuate:hvac:write'],
      capabilities: [
        { kind: 'profile', descZh: '客人级画像的读写与迁移', descEn: 'Guest-level profile read, write, and transfer' },
      ],
      actions: [
        { id: 'room.prepare', descZh: '按预订信息预热房间', descEn: 'Prepare the room per booking' },
        { id: 'room.reset', descZh: '退房后重置房间默认', descEn: 'Reset the room to default after check-out' },
      ],
      installCommand: 'aios plugin install concierge-script --channel beta',
    },
  },
  {
    slug: 'clinical-adapter',
    icon: Stethoscope,
    nameZh: '临床对接',
    nameEn: 'Clinical Adapter',
    vendorZh: '合作伙伴',
    vendorEn: 'Partner',
    kind: 'partner',
    stage: 'ga',
    topic: 'health',
    taglineZh: '把医院既有的信息系统, 接进 AIOS 的可审计闭环。',
    taglineEn: 'Brings the hospital\'s existing systems into the auditable loop of AIOS.',
    storyZh:
      '在医院不出院的前提下, 把科室级的 SOP、病区的巡查工单、既有的信息系统对接进 AIOS。护士站和科主任看到的是自己熟悉的工作面, 而 AIOS 只在后台安静地做它那份事。',
    storyEn:
      'Without letting data leave the hospital, this adapter wires in department SOPs, ward rounds tickets, and the information systems you already run. Nurses and department heads keep the workspace they know; AIOS does its part quietly in the background.',
    highlights: [
      { zh: '数据不出院, 闭环可审计', en: 'Data stays on-site, the loop stays auditable' },
      { zh: '对接既有流程, 不推倒重来', en: 'Integrates existing flows, no rip-and-replace' },
      { zh: '护士站面不变, 工作节奏不变', en: 'Nursing view unchanged, working rhythm unchanged' },
    ],
    outcomeZh: '新系统上线, 科室感觉不到被换了一套。',
    outcomeEn: 'Going live feels, to the department, like nothing was replaced.',
    manifest: {
      permissions: ['clinical:sop:read', 'clinical:tickets:write', 'facts:resident:write', 'ledger:write'],
      capabilities: [
        { kind: 'integrate', descZh: '与 HIS / 电子病历 / 护理工单系统对接', descEn: 'Integrates with HIS, EMR, nursing ticketing' },
      ],
      actions: [
        { id: 'ticket.open', descZh: '开立一条护理工单', descEn: 'Open a nursing ticket' },
        { id: 'audit.export', descZh: '导出合规周期审计包', descEn: 'Export compliance-cycle audit package' },
      ],
      installCommand: 'aios plugin install clinical-adapter',
    },
  },
  {
    slug: 'auditable-voice',
    icon: Mic2,
    nameZh: '可查的声音',
    nameEn: 'Auditable Voice',
    vendorZh: '循星官方',
    vendorEn: 'By SidebyStar',
    kind: 'official',
    stage: 'roadmap',
    topic: 'home',
    taglineZh: '每一次对话, 都能被本人回放、被家属查看、被监管导出。',
    taglineEn: 'Every conversation -- replayable by you, viewable by family, exportable for regulators.',
    storyZh:
      '语音进入一个房间以后, 不该就此消失。这枚插件让每一句交互都写入本地账本, 本人可以回放, 家属可以查阅, 监管方可以导出合规报表。全程不离家, 也不被悄悄抹掉。',
    storyEn:
      'Voice entering a room should not just vanish. This plugin writes every interaction into the local ledger -- you can replay, your family can review, the regulator can export a compliance report. None of it ever leaves home, and none of it can be quietly erased.',
    highlights: [
      { zh: '不离家, 不上云', en: 'Never leaves home, never goes to the cloud' },
      { zh: '本人可回放, 家属可查阅', en: 'Replay for you, review for family' },
      { zh: '监管视角可导出合规报表', en: 'Compliance exports for regulators' },
    ],
    outcomeZh: '屋里说过的每一句话, 都能被本人重新听见。',
    outcomeEn: 'Every word spoken in the house, you can hear yourself again.',
  },
];

export function getPlugin(slug: string) {
  return plugins.find((p) => p.slug === slug);
}

export const pluginTopics: Array<{ id: PluginTopic | 'all'; zh: string; en: string }> = [
  { id: 'all', zh: '全部', en: 'All' },
  { id: 'home', zh: '家居', en: 'Home' },
  { id: 'health', zh: '健康照护', en: 'Health & Care' },
  { id: 'commercial', zh: '商用空间', en: 'Commercial' },
  { id: 'infra', zh: '兼容与基建', en: 'Infra & Compatibility' },
];

export const pluginStageLabel: Record<PluginStage, { zh: string; en: string }> = {
  ga: { zh: '已上架', en: 'Available' },
  beta: { zh: '公测中', en: 'In beta' },
  roadmap: { zh: '规划中', en: 'Roadmap' },
};
