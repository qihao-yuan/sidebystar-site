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
import type { SkuSlug } from './products';

export type PluginKind = 'official' | 'partner';
// stage 含义: 'ga' = 已发布可用, 任何普通用户可装可跑;
//             'beta' = 内部已完成, 真实用户安装尚未规模化验证;
//             'roadmap' = 规划中.
// 全部插件目前默认 'beta'. 真实跑通过 + 有真实使用方后, 再单独改回 'ga'.
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

export type PluginProfile = {
  products: SkuSlug[];
  deployment: { zh: string; en: string };
  prerequisites: { zh: string; en: string };
  boundary: { zh: string; en: string };
  operations: Array<{ zh: string; en: string }>;
};

export const plugins: Plugin[] = [
  {
    slug: 'dawn-light',
    icon: Sunrise,
    nameZh: '夜间照明',
    nameEn: 'Dawn Light',
    vendorZh: '循星官方',
    vendorEn: 'By SidebyStar',
    kind: 'official',
    stage: 'beta',
    topic: 'home',
    taglineZh: '夜间路径照明与日光渐亮规则。',
    taglineEn: 'Night pathway lighting and daylight ramp rules.',
    storyZh:
      '根据在场状态、环境照度与时间执行路径照明。日光渐亮按照本地位置、天气和已确认的起床时间运行。',
    storyEn:
      'Runs pathway lighting from presence, ambient light and time. Daylight ramps use local location, weather and an approved wake schedule.',
    highlights: [
      { zh: '按路径分段控制照明', en: 'Segmented lighting by path' },
      { zh: '按日光与时间调整亮度和色温', en: 'Brightness and color temperature by daylight and time' },
      { zh: '规则阈值可查看和修改', en: 'Inspectable and editable rule thresholds' },
    ],
    outcomeZh: '输出路径照明动作、日光渐亮计划与执行记录。',
    outcomeEn: 'Outputs pathway lighting actions, daylight ramp schedules and execution records.',
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
    nameZh: '夜间照护',
    nameEn: 'Fall Watch',
    vendorZh: '循星官方',
    vendorEn: 'By SidebyStar',
    kind: 'official',
    stage: 'beta',
    topic: 'health',
    taglineZh: '离床、久卧与跌倒风险分级告警。',
    taglineEn: 'Tiered alerts for bed-exit, inactivity and fall risk.',
    storyZh:
      '整合毫米波与环境传感器事件，识别离床、久卧、超时坐起和跌倒风险。告警按严重度派发至值班岗位，并在本地记录处置状态。',
    storyEn:
      'Combines mmWave and environmental sensor events to detect bed-exit, inactivity, prolonged sitting and fall risk. Alerts route to on-duty roles by severity, with local response records.',
    highlights: [
      { zh: '非摄像头感知输入', en: 'Non-camera sensing input' },
      { zh: '四类事件分级与派发', en: 'Four event classes with tiered dispatch' },
      { zh: '本地告警与处置记录', en: 'Local alerting and response records' },
    ],
    outcomeZh: '输出事件等级、通知对象、响应状态与审计记录。',
    outcomeEn: 'Outputs event severity, recipients, response status and audit records.',
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
    nameZh: '能耗控制',
    nameEn: 'Energy Keeper',
    vendorZh: '循星官方',
    vendorEn: 'By SidebyStar',
    kind: 'official',
    stage: 'beta',
    topic: 'home',
    taglineZh: '暖通、照明与热水设备联合能耗策略。',
    taglineEn: 'Coordinated energy policy for HVAC, lighting and hot water.',
    storyZh:
      '汇总空调、地暖、热水器与照明的能耗和状态，在舒适区间及授权范围内调整运行计划。每次调整均记录条件和结果。',
    storyEn:
      'Combines energy and state data from HVAC, floor heating, water heaters and lighting, adjusting schedules within approved comfort ranges. Every change records its conditions and result.',
    highlights: [
      { zh: '多设备能耗统一汇总', en: 'Unified multi-device energy data' },
      { zh: '舒适区间与策略阈值可配置', en: 'Configurable comfort ranges and policy thresholds' },
      { zh: '调整记录与月度报告', en: 'Adjustment records and monthly reports' },
    ],
    outcomeZh: '输出设备调整动作、能耗对比与月度报告。',
    outcomeEn: 'Outputs device adjustments, energy comparisons and monthly reports.',
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
    nameZh: '设备桥接',
    nameEn: 'Matter Bridge',
    vendorZh: '项目适配',
    vendorEn: 'Project integration',
    kind: 'partner',
    stage: 'beta',
    topic: 'infra',
    taglineZh: 'Matter、Thread、Wi-Fi 与 Zigbee 设备适配。',
    taglineEn: 'Device adapters for Matter, Thread, Wi-Fi and Zigbee.',
    storyZh:
      '将项目确认范围内的设备映射为 AIOS 统一实体，并同步在线状态、能力和控制指令。具体兼容范围以设备清单验证结果为准。',
    storyEn:
      'Maps approved project devices into unified AIOS entities and synchronizes availability, capabilities and commands. Compatibility follows the verified device list.',
    highlights: [
      { zh: '多协议设备发现与登记', en: 'Multi-protocol discovery and enrollment' },
      { zh: '统一实体与能力映射', en: 'Unified entity and capability mapping' },
      { zh: '本地状态同步与指令下发', en: 'Local state sync and command dispatch' },
    ],
    outcomeZh: '输出统一设备清单、状态与可用动作。',
    outcomeEn: 'Outputs a unified device inventory, state and available actions.',
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
    nameZh: 'Home Assistant 连接器',
    nameEn: 'Home Assistant Sync',
    vendorZh: '兼容连接器',
    vendorEn: 'Compatibility connector',
    kind: 'partner',
    stage: 'beta',
    topic: 'infra',
    taglineZh: 'Home Assistant 实体与自动化同步。',
    taglineEn: 'Home Assistant entity and automation synchronization.',
    storyZh:
      '读取 Home Assistant 的实体、区域和自动化配置，映射至 AIOS 事实库。迁移期间可保持两套系统并行，写入范围由管理员确认。',
    storyEn:
      'Reads Home Assistant entities, areas and automations into the AIOS fact base. Both systems can run in parallel during migration, with write scope approved by an administrator.',
    highlights: [
      { zh: '实体与区域映射', en: 'Entity and area mapping' },
      { zh: '自动化配置读取与转换', en: 'Automation read and conversion' },
      { zh: '迁移期间并行运行', en: 'Parallel operation during migration' },
    ],
    outcomeZh: '输出映射后的实体、区域和自动化清单。',
    outcomeEn: 'Outputs mapped entity, area and automation inventories.',
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
    nameZh: '客房运营',
    nameEn: 'Concierge Script',
    vendorZh: '项目适配',
    vendorEn: 'Project integration',
    kind: 'partner',
    stage: 'beta',
    topic: 'commercial',
    taglineZh: '入住、在住与退房房间规则。',
    taglineEn: 'Room rules for check-in, occupied and checkout states.',
    storyZh:
      '根据预订状态加载房间默认配置和已授权偏好，控制温度、照明与窗帘。退房后按策略清除个人设置并恢复房间基线。',
    storyEn:
      'Loads room defaults and authorized preferences from reservation state to control climate, lighting and curtains. Checkout policy clears personal settings and restores the room baseline.',
    highlights: [
      { zh: '预订状态触发房间准备', en: 'Room preparation from reservation state' },
      { zh: '偏好与房间基线分开保存', en: 'Separate preference and room baselines' },
      { zh: '退房后按策略清除个人设置', en: 'Policy-based personal setting removal at checkout' },
    ],
    outcomeZh: '输出房间准备、在住调整与退房重置记录。',
    outcomeEn: 'Outputs room preparation, occupied adjustments and checkout reset records.',
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
    nameZh: '临床连接器',
    nameEn: 'Clinical Adapter',
    vendorZh: '项目适配',
    vendorEn: 'Project integration',
    kind: 'partner',
    stage: 'beta',
    topic: 'health',
    taglineZh: '医院信息系统与护理工单接口。',
    taglineEn: 'Interfaces for hospital information systems and care tickets.',
    storyZh:
      '在院内网络对接科室 SOP、病区巡查工单与既有信息系统。字段映射、写入权限和失败处理按项目接口文档确认。',
    storyEn:
      'Connects department SOPs, ward-round tickets and existing information systems inside the hospital network. Field mapping, write permissions and failure handling follow the project interface document.',
    highlights: [
      { zh: '院内网络部署', en: 'Hospital-network deployment' },
      { zh: 'HIS、电子病历与工单字段映射', en: 'HIS, EMR and ticket field mapping' },
      { zh: '接口调用与失败记录', en: 'API call and failure records' },
    ],
    outcomeZh: '输出结构化工单、接口状态与审计记录。',
    outcomeEn: 'Outputs structured tickets, interface status and audit records.',
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
    nameZh: '语音审计',
    nameEn: 'Auditable Voice',
    vendorZh: '循星官方',
    vendorEn: 'By SidebyStar',
    kind: 'official',
    stage: 'roadmap',
    topic: 'home',
    taglineZh: '语音指令审计与授权查询。',
    taglineEn: 'Voice-command auditing and authorized review.',
    storyZh:
      '规划为语音指令生成结构化审计条目，记录触发者、目标设备、执行结果和权限上下文。原始音频是否保留由现场策略决定。',
    storyEn:
      'Planned to create structured audit entries for voice commands, including actor, target device, execution result and permission context. Raw audio retention follows site policy.',
    highlights: [
      { zh: '语音指令结构化记录', en: 'Structured voice-command records' },
      { zh: '按角色查询与导出', en: 'Role-based query and export' },
      { zh: '原始音频留存策略可配置', en: 'Configurable raw-audio retention policy' },
    ],
    outcomeZh: '规划输出指令、权限、设备结果与审计条目。',
    outcomeEn: 'Planned output includes command, permission, device result and audit entry.',
  },
];

export function getPlugin(slug: string) {
  return plugins.find((p) => p.slug === slug);
}

export const pluginProfiles: Record<string, PluginProfile> = {
  'dawn-light': {
    products: ['home-box', 'community-kit'],
    deployment: {
      zh: '安装在现场节点，规则按房间保存；照明控制不依赖公网。',
      en: 'Installed on the on-site node with room-scoped rules; lighting control does not require the public internet.',
    },
    prerequisites: {
      zh: '已接入的照明回路、存在或离床传感器、可读取的环境照度。',
      en: 'Integrated lighting circuits, presence or bed-exit sensing, and readable ambient light.',
    },
    boundary: {
      zh: '只在管理员确认的亮度、色温和时段范围内执行，不修改消防与应急照明回路。',
      en: 'Runs only within approved brightness, color-temperature and time ranges; fire and emergency lighting are excluded.',
    },
    operations: [
      { zh: '按房间配置路径与灯组', en: 'Configure paths and light groups by room' },
      { zh: '现场验证触发、渐亮与手动接管', en: 'Validate triggers, ramps and manual override on site' },
      { zh: '从执行记录复核误触发并调整阈值', en: 'Review execution records and tune false triggers' },
    ],
  },
  'fall-watch': {
    products: ['community-kit', 'enterprise-stack'],
    deployment: {
      zh: '部署在机构内网的房间节点与楼层网关，事件在现场完成识别和分级。',
      en: 'Runs on room nodes and floor gateways inside the facility network; events are classified on site.',
    },
    prerequisites: {
      zh: '毫米波或床旁传感器、值班岗位、已确认的事件等级与通知流程。',
      en: 'mmWave or bedside sensors, an on-duty role, and an approved severity and notification workflow.',
    },
    boundary: {
      zh: '提供风险事件与处置流程，不作跌倒医学诊断，也不替代护理人员到场确认。',
      en: 'Provides risk events and response workflow; it does not make a medical diagnosis or replace on-site confirmation.',
    },
    operations: [
      { zh: '按房间校准离床、静止与回床阈值', en: 'Calibrate exit, stillness and return thresholds by room' },
      { zh: '配置值班人员、升级时限和现场告警', en: 'Configure duty roles, escalation timers and local alerts' },
      { zh: '按班次复核误报、响应和关闭记录', en: 'Review false alerts, response and closure records by shift' },
    ],
  },
  'energy-keeper': {
    products: ['home-box', 'community-kit', 'enterprise-stack'],
    deployment: {
      zh: '在现场节点汇总设备状态与分项能耗，按已批准策略调整运行计划。',
      en: 'Aggregates device state and sub-metering on site, then adjusts schedules under approved policies.',
    },
    prerequisites: {
      zh: '可读取的分项计量、暖通与照明设备，以及明确的舒适区间。',
      en: 'Readable sub-metering, integrated HVAC and lighting, and defined comfort ranges.',
    },
    boundary: {
      zh: '不越过设备安全上下限，不控制未纳入项目清单的负载。',
      en: 'Never exceeds device safety limits or controls loads outside the approved inventory.',
    },
    operations: [
      { zh: '建立设备与计量点映射', en: 'Map devices to metering points' },
      { zh: '确认舒适区间与可调时段', en: 'Approve comfort ranges and adjustable periods' },
      { zh: '按月复核基线、调整记录与节能结果', en: 'Review baselines, changes and results monthly' },
    ],
  },
  'matter-bridge': {
    products: ['home-box', 'community-kit'],
    deployment: {
      zh: '作为现场协议适配器运行，将已验证设备映射到 AIOS 统一实体。',
      en: 'Runs as an on-site protocol adapter and maps verified devices into AIOS entities.',
    },
    prerequisites: {
      zh: '受支持的协调器、设备配网权限与项目设备清单。',
      en: 'A supported coordinator, commissioning access and an approved device inventory.',
    },
    boundary: {
      zh: '兼容性以设备型号和固件实测为准；未验证设备默认只读或不接入。',
      en: 'Compatibility is verified by model and firmware; unverified devices remain read-only or disconnected.',
    },
    operations: [
      { zh: '发现设备并核对型号与固件', en: 'Discover devices and verify model and firmware' },
      { zh: '映射实体、能力和控制范围', en: 'Map entities, capabilities and control scope' },
      { zh: '监测离线、重连与指令失败', en: 'Monitor offline, reconnect and command failures' },
    ],
  },
  'homeassistant-sync': {
    products: ['home-box', 'community-kit'],
    deployment: {
      zh: '通过局域网连接既有 Home Assistant，分阶段同步实体、区域和自动化。',
      en: 'Connects to an existing Home Assistant instance over the LAN and migrates entities, areas and automations in stages.',
    },
    prerequisites: {
      zh: 'Home Assistant 长期访问令牌、实体清单与管理员确认的写入范围。',
      en: 'A Home Assistant long-lived token, entity inventory and administrator-approved write scope.',
    },
    boundary: {
      zh: '默认先只读映射；启用双向写入前必须完成冲突规则和回滚验证。',
      en: 'Starts read-only; bidirectional writes require conflict and rollback validation.',
    },
    operations: [
      { zh: '导入实体与区域并生成差异清单', en: 'Import entities and areas and produce a diff' },
      { zh: '选择需要转换的自动化', en: 'Select automations for conversion' },
      { zh: '并行运行后按批次切换写入权', en: 'Run in parallel before transferring write authority in batches' },
    ],
  },
  'concierge-script': {
    products: ['community-kit', 'enterprise-stack'],
    deployment: {
      zh: '按房间运行入住、在住和退房规则，可与 PMS 或现场工单系统对接。',
      en: 'Runs per-room check-in, occupied and checkout rules with optional PMS or ticket integration.',
    },
    prerequisites: {
      zh: '房态来源、客房设备清单、默认房间基线和个人数据清除策略。',
      en: 'Room-status source, room device inventory, default baseline and personal-data deletion policy.',
    },
    boundary: {
      zh: '只读取项目确认的住客偏好字段，退房后按策略清除，不建立跨住客画像。',
      en: 'Reads only approved preference fields, clears them at checkout and does not build cross-guest profiles.',
    },
    operations: [
      { zh: '核对 PMS 房态与房间编号', en: 'Map PMS status to room identifiers' },
      { zh: '验证入住准备、手动调整和退房重置', en: 'Validate preparation, manual adjustment and checkout reset' },
      { zh: '记录每次配置加载与清除结果', en: 'Record each configuration load and deletion result' },
    ],
  },
  'clinical-adapter': {
    products: ['enterprise-stack'],
    deployment: {
      zh: '部署在院内网络，通过项目接口连接 HIS、电子病历或护理工单系统。',
      en: 'Deployed inside the hospital network with project-defined interfaces to HIS, EMR or nursing tickets.',
    },
    prerequisites: {
      zh: '接口文档、测试环境、字段字典、服务账号和院方审批的写入范围。',
      en: 'Interface documentation, test environment, field dictionary, service account and approved write scope.',
    },
    boundary: {
      zh: '不绕过院方权限与审批流程，不把临床数据发送到公网服务。',
      en: 'Does not bypass hospital access controls or send clinical data to public internet services.',
    },
    operations: [
      { zh: '在测试环境完成字段与状态码映射', en: 'Map fields and status codes in the test environment' },
      { zh: '验证重试、幂等与失败告警', en: 'Validate retries, idempotency and failure alerts' },
      { zh: '上线后保留接口调用与变更审计', en: 'Retain API-call and change audits after go-live' },
    ],
  },
  'auditable-voice': {
    products: ['home-box', 'community-kit', 'enterprise-stack'],
    deployment: {
      zh: '规划在现场节点生成语音指令结构化记录。',
      en: 'Planned to create structured voice-command records on the on-site node.',
    },
    prerequisites: {
      zh: '尚未开放安装；需先完成音频留存、身份确认和查询权限设计。',
      en: 'Not installable yet; audio retention, identity confirmation and review access must be finalized first.',
    },
    boundary: {
      zh: '默认不长期保存原始音频；具体策略将在发布前明确。',
      en: 'Raw audio is not retained by default; the final policy will be published before release.',
    },
    operations: [
      { zh: '定义指令、身份与设备结果字段', en: 'Define command, identity and device-result fields' },
      { zh: '验证敏感指令的二次确认', en: 'Validate secondary confirmation for sensitive commands' },
      { zh: '完成按角色查询与导出测试', en: 'Test role-based query and export' },
    ],
  },
};

export const pluginTopics: Array<{ id: PluginTopic | 'all'; zh: string; en: string }> = [
  { id: 'all', zh: '全部', en: 'All' },
  { id: 'home', zh: '家居', en: 'Home' },
  { id: 'health', zh: '健康照护', en: 'Health & Care' },
  { id: 'commercial', zh: '商用空间', en: 'Commercial' },
  { id: 'infra', zh: '兼容与基建', en: 'Infra & Compatibility' },
];

export const pluginStageLabel: Record<PluginStage, { zh: string; en: string }> = {
  ga: { zh: '已上架', en: 'Available' },
  beta: { zh: '测试版', en: 'Beta' },
  roadmap: { zh: '规划中', en: 'Roadmap' },
};
