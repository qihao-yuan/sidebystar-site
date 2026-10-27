import {
  HeartPulse,
  Building2,
  Stethoscope,
  Home,
  BedDouble,
  Hotel,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Landmark,
  LucideIcon,
} from 'lucide-react';

export type SolutionSlug =
  | 'elderly-care'
  | 'community-care'
  | 'clinical-assist'
  | 'smart-home'
  | 'smart-room'
  | 'hospitality'
  | 'workspace'
  | 'retail'
  | 'campus'
  | 'cultural';

export type SolutionGroup = 'health' | 'home' | 'commercial' | 'public';

export type Solution = {
  slug: SolutionSlug;
  icon: LucideIcon;
  titleKey: string;
  group: SolutionGroup;
  planned?: boolean;
  buyer?: { zh: string; en: string };
  problems?: Array<{ zh: string; en: string }>;
  kpis?: Array<{ label: { zh: string; en: string }; value: string; note?: { zh: string; en: string } }>;
  architecture?: Array<{ zh: string; en: string }>;
  pilot?: { weeks: string; scale: { zh: string; en: string } };
  sku?: { zh: string; en: string };
  workflow?: Array<{
    stage: { zh: string; en: string };
    condition: { zh: string; en: string };
    action: { zh: string; en: string };
    record: { zh: string; en: string };
  }>;
  safeguards?: Array<{ title: { zh: string; en: string }; body: { zh: string; en: string } }>;
  acceptance?: Array<{ zh: string; en: string }>;
  bundle?: {
    headline: { zh: string; en: string };
    items: Array<{ zh: string; en: string }>;
    rhythm?: { zh: string; en: string };
  };
};

export const solutions: Solution[] = [
  {
    slug: 'elderly-care',
    icon: HeartPulse,
    titleKey: 'elderlyCare',
    group: 'health',
    buyer: { zh: '养老机构、护理院、康养中心运营方与信息化负责人', en: 'Elderly care facilities, nursing homes, wellness center operators and IT leads' },
    problems: [
      { zh: '夜间巡检漏检风险高,人力覆盖有限', en: 'High risk of missed nighttime patrol, limited staffing' },
      { zh: '云端方案断网失能,告警不可达', en: 'Cloud solutions fail offline, alerts never arrive' },
      { zh: '家属对视频隐私敏感,接受度低', en: 'Families sensitive to video privacy, low adoption' },
    ],
    kpis: [],
    architecture: [
      { zh: '毫米波、红外与环境传感器完成非摄像头感知', en: 'Non-camera sensing through mmWave, infrared and environmental sensors' },
      { zh: '现场网关执行事件判断与告警规则', en: 'On-site gateway evaluates events and alert rules' },
      { zh: '支持对接护理工单与值班通知流程', en: 'Integrates with care tickets and on-duty notification workflows' },
    ],
    pilot: { weeks: '2-4', scale: { zh: '单楼层 10-30 床', en: 'Single floor, 10-30 beds' } },
    sku: { zh: 'Community Kit', en: 'Community Kit' },
    workflow: [
      {
        stage: { zh: '离床识别', en: 'Bed-exit detection' },
        condition: { zh: '床旁传感器与毫米波状态共同确认离床，排除短时翻身。', en: 'Bedside and mmWave states jointly confirm bed exit while filtering brief turning.' },
        action: { zh: '本地节点启动观察计时，不向外部发送原始感知数据。', en: 'The local node starts an observation timer without sending raw sensing data off site.' },
        record: { zh: '离床时间、房间、规则版本', en: 'Exit time, room and rule version' },
      },
      {
        stage: { zh: '路径照明', en: 'Pathway lighting' },
        condition: { zh: '夜间时段离床，且房间照度低于现场设定值。', en: 'A bed exit occurs during nighttime while room light is below the configured level.' },
        action: { zh: '按预设亮度依次开启床侧与卫生间路径灯，保留实体开关。', en: 'Bedside and bathroom path lights rise to configured levels while physical controls remain available.' },
        record: { zh: '联动设备、执行结果、响应耗时', en: 'Linked devices, execution result and latency' },
      },
      {
        stage: { zh: '风险升级', en: 'Risk escalation' },
        condition: { zh: '超过回床时限、检测到低位静止，或床旁呼叫被触发。', en: 'Return-to-bed timeout, low-position stillness or a bedside call is detected.' },
        action: { zh: '按风险级别通知值班人员；高等级事件同步触发现场声光提示。', en: 'On-duty staff are notified by severity; high-level events also trigger on-site audible and visual alerts.' },
        record: { zh: '判断依据、告警等级、通知对象', en: 'Decision evidence, severity and recipients' },
      },
      {
        stage: { zh: '到场处置', en: 'On-site response' },
        condition: { zh: '护理员接单、到场并确认住户状态。', en: 'A caregiver accepts the ticket, arrives and confirms resident status.' },
        action: { zh: '处置结果由护理员确认；系统不自动给出医疗结论。', en: 'The caregiver confirms the outcome; the system does not make a medical determination.' },
        record: { zh: '接单、到场、处置与关闭时间', en: 'Acceptance, arrival, response and closure times' },
      },
      {
        stage: { zh: '交班复核', en: 'Shift review' },
        condition: { zh: '事件关闭或进入次日交班。', en: 'The event is closed or enters the next shift handoff.' },
        action: { zh: '机构端查看完整记录；家属端仅按授权接收摘要。', en: 'Facility staff review the full record; family receives only an authorized summary.' },
        record: { zh: '事件摘要、查看记录、导出记录', en: 'Event summary, access log and export log' },
      },
    ],
    safeguards: [
      {
        title: { zh: '默认无摄像头', en: 'Camera-free by default' },
        body: { zh: '使用床旁、毫米波、红外与环境状态完成判断；如项目启用视觉能力，需单独确认采集与留存策略。', en: 'Uses bedside, mmWave, infrared and environmental states. Any visual capability requires a separate collection and retention policy.' },
      },
      {
        title: { zh: '断网继续运行', en: 'Operates offline' },
        body: { zh: '照明联动、现场告警和事件记录在本地执行；远程通知在网络恢复后补发或同步。', en: 'Lighting, local alerts and event records run on site; remote delivery resumes when connectivity returns.' },
      },
      {
        title: { zh: '人工确认闭环', en: 'Human-confirmed closure' },
        body: { zh: '系统负责识别、分级与派发，护理人员负责到场确认和关闭事件。', en: 'The system detects, classifies and dispatches; care staff confirm on site and close the event.' },
      },
    ],
    acceptance: [
      { zh: '离床、回床、超时与床旁呼叫事件可在现场复现并形成记录', en: 'Bed exit, return, timeout and bedside-call events can be reproduced and recorded on site' },
      { zh: '路径照明、现场告警及工单派发按已确认规则执行', en: 'Path lighting, local alerts and ticket dispatch follow approved rules' },
      { zh: '断网期间关键联动持续运行，恢复联网后记录完整同步', en: 'Critical actions continue offline and records synchronize after reconnection' },
      { zh: '机构、护理员与家属账号只能访问各自授权范围', en: 'Facility, caregiver and family accounts access only their authorized scope' },
      { zh: '试点期间对误报、漏报与响应时延逐项复盘并调整阈值', en: 'False alerts, missed events and response latency are reviewed during the pilot to tune thresholds' },
    ],
    bundle: {
      headline: {
        zh: '单床位夜间安全监测方案',
        en: 'Nighttime safety monitoring for individual beds',
      },
      items: [
        { zh: '床畔本地中枢', en: 'Local bedside hub' },
        { zh: '非摄像头夜间感知套件', en: 'Non-camera nighttime sensing kit' },
        { zh: '床旁呼叫与现场告警', en: 'Bedside call and on-site alerting' },
        { zh: '分角色状态查看', en: 'Role-based status access' },
        { zh: '安装、规则配置与验收支持', en: 'Installation, rule configuration and acceptance support' },
      ],
      rhythm: {
        zh: '覆盖离床、久卧、跌倒风险与紧急呼叫等事件。告警级别、通知对象和照明联动按机构流程配置。',
        en: 'Covers bed-exit, prolonged inactivity, fall risk and emergency calls. Alert level, recipients and lighting actions follow facility procedures.',
      },
    },
  },
  {
    slug: 'community-care',
    icon: Building2,
    titleKey: 'communityCare',
    group: 'health',
    buyer: { zh: '社区养老服务中心、长者公寓、地方民政系统合作方', en: 'Community care centers, senior apartments, local civil affairs partners' },
    problems: [
      { zh: '20-200 户集中管理,多后台切换成本高', en: '20-200 units managed, high cost switching backends' },
      { zh: '家属远程查看需求强,但隐私边界模糊', en: 'Strong family remote-view demand, fuzzy privacy boundary' },
      { zh: '等保 2.0 合规要求,难以独立承担', en: 'MLPS 2.0 compliance burden hard to bear alone' },
    ],
    kpis: [],
    architecture: [
      { zh: '社区网关与户内节点分级部署', en: 'Tiered deployment across community gateways and in-unit nodes' },
      { zh: '按家属、护理与管理角色划分访问范围', en: 'Access scopes separated across family, care and management roles' },
      { zh: '原始感知数据保留在现场，远端仅提供授权状态', en: 'Raw sensing data stays on site; remote access exposes authorized status only' },
    ],
    pilot: { weeks: '4-6', scale: { zh: '50-100 户', en: '50-100 units' } },
    sku: { zh: 'Community Kit', en: 'Community Kit' },
    bundle: {
      headline: {
        zh: '面向多户照护机构的集中管理方案',
        en: 'Centralized management for multi-unit care facilities',
      },
      items: [
        { zh: '社区级本地网关', en: 'Community-level local gateway' },
        { zh: '户内非摄像头感知节点', en: 'In-unit non-camera sensing nodes' },
        { zh: '事件、巡查与工单管理台', en: 'Event, patrol and ticket console' },
        { zh: '家属与机构分级访问端', en: 'Tiered access for families and facility staff' },
        { zh: '部署、培训与规则调优', en: 'Deployment, training and rule tuning' },
      ],
      rhythm: {
        zh: '统一管理住户状态、告警与巡查记录。户内数据与管理权限按组织和住户边界隔离。',
        en: 'Manages resident status, alerts and patrol records in one system, with data and permissions isolated by organization and household.',
      },
    },
  },
  {
    slug: 'clinical-assist',
    icon: Stethoscope,
    titleKey: 'clinicalAssist',
    group: 'health',
    buyer: { zh: '三甲医院信息科、专科医院 IT、康复医学科', en: 'Top hospital informatics, specialty hospital IT, rehab departments' },
    problems: [
      { zh: '患者依从性低,术后康复指导难以延续', en: 'Low patient adherence, rehab guidance hard to sustain' },
      { zh: '生理体征异常无法及时上报', en: 'Vital sign anomalies cannot report in time' },
      { zh: 'HIS/CIS 数据不出院,云方案无法落地', en: 'HIS/CIS data stays in hospital, cloud cannot work' },
    ],
    kpis: [],
    architecture: [
      { zh: '院内私有化部署，患者数据留在院内网络', en: 'On-premises deployment with patient data retained inside the hospital network' },
      { zh: '通过项目接口接入既有医院信息系统', en: 'Project-defined interfaces to existing hospital information systems' },
      { zh: '规则与通知流程按科室 SOP 配置', en: 'Rules and notifications configured to department SOPs' },
    ],
    pilot: { weeks: '6-8', scale: { zh: '单病区 20-50 床', en: 'Single ward, 20-50 beds' } },
    sku: { zh: 'Enterprise Stack', en: 'Enterprise Stack' },
    bundle: {
      headline: {
        zh: '病区康复与异常上报辅助方案',
        en: 'Ward rehabilitation and anomaly reporting support',
      },
      items: [
        { zh: '病区边缘计算节点', en: 'Ward edge computing node' },
        { zh: '离床与环境异常监测', en: 'Bed-exit and environmental anomaly monitoring' },
        { zh: '科室 SOP 规则配置', en: 'Department SOP rule configuration' },
        { zh: 'HIS / 电子病历项目接口', en: 'Project interfaces for HIS / EMR' },
        { zh: '现场联调与验收支持', en: 'On-site integration and acceptance support' },
      ],
      rhythm: {
        zh: '根据科室流程采集必要状态，记录异常判断、通知与处置结果。系统仅提供辅助信息，不替代临床判断。',
        en: 'Captures required status and records anomaly decisions, notifications and outcomes according to department workflow. It supports, but does not replace, clinical judgment.',
      },
    },
  },
  {
    slug: 'smart-home',
    icon: Home,
    titleKey: 'smartHome',
    group: 'home',
    buyer: { zh: '家庭用户、地产精装、智能家居经销商', en: 'Households, real estate developers, smart home dealers' },
    problems: [
      { zh: '多品牌生态孤岛,APP 装一堆', en: 'Multi-brand silos, apps everywhere' },
      { zh: '云服务随时下线,投资失效', en: 'Cloud services may shut down, investment void' },
      { zh: '预设规则不够个性化', en: 'Preset rules lack personalization' },
    ],
    kpis: [],
    architecture: [
      { zh: '通过适配器接入项目确认范围内的设备与协议', en: 'Connects approved devices and protocols through adapters' },
      { zh: '基于房间状态、时间与权限执行自动化规则', en: 'Executes automations from room state, time and permissions' },
      { zh: '支持本地语音与离线基础控制', en: 'Supports local voice and offline core controls' },
    ],
    pilot: { weeks: '1-2', scale: { zh: '单户全屋', en: 'Single household whole-home' } },
    sku: { zh: 'Home Box', en: 'Home Box' },
    bundle: {
      headline: {
        zh: '单户住宅设备编排与本地控制',
        en: 'Device orchestration and local control for individual homes',
      },
      items: [
        { zh: 'Home Box 本地中枢', en: 'Home Box local hub' },
        { zh: '照明、环境与窗帘联动', en: 'Lighting, climate and curtain coordination' },
        { zh: '情景面板与本地语音入口', en: 'Scene panels and local voice access' },
        { zh: '项目范围内的跨品牌设备接入', en: 'Cross-brand device integration within project scope' },
        { zh: '安装、规则配置与用户交付', en: 'Installation, rule configuration and handover' },
      ],
      rhythm: {
        zh: '按房间、成员、时间与设备状态配置规则。高风险动作需要明确确认，常用场景保留实体控制入口。',
        en: 'Rules are configured by room, member, time and device state. High-risk actions require confirmation, with physical controls retained for common scenes.',
      },
    },
  },
  {
    slug: 'smart-room',
    icon: BedDouble,
    titleKey: 'smartRoom',
    group: 'home',
    buyer: { zh: '酒店集团、长者公寓、康养度假、SPA 空间运营', en: 'Hotel groups, senior apartments, wellness resorts, SPA operators' },
    problems: [
      { zh: '按房间改造成本高,标准化难', en: 'Per-room retrofit cost high, standardization hard' },
      { zh: '客人画像无法跨房间沉淀', en: 'Guest profile cannot persist cross-room' },
      { zh: '设备方案杂,运维负担重', en: 'Device stacks fragmented, heavy ops burden' },
    ],
    kpis: [],
    architecture: [
      { zh: '按房间部署本地节点，适配既有装修与设备条件', en: 'Per-room local nodes adapted to existing interiors and devices' },
      { zh: '房间配置与用户偏好分离管理', en: 'Room configuration and user preferences are managed separately' },
      { zh: '支持面板、语音与管理端多入口控制', en: 'Supports panel, voice and management-console controls' },
    ],
    pilot: { weeks: '2-3', scale: { zh: '10-30 间房', en: '10-30 rooms' } },
    sku: { zh: 'Community Kit', en: 'Community Kit' },
    bundle: {
      headline: {
        zh: '标准房间智能化改造方案',
        en: 'Standardized intelligent room retrofit',
      },
      items: [
        { zh: '单房间本地控制节点', en: 'Per-room local control node' },
        { zh: '照明、环境与窗帘场景', en: 'Lighting, climate and curtain scenes' },
        { zh: '房间配置与偏好管理', en: 'Room configuration and preference management' },
        { zh: '前台、工程与客房管理端', en: 'Console for front desk, engineering and room operations' },
        { zh: '批量配置、培训与验收', en: 'Bulk configuration, training and acceptance' },
      ],
      rhythm: {
        zh: '入住、在住与退房状态对应不同规则集。个人偏好与房间默认配置分开保存，并按权限清除。',
        en: 'Check-in, occupied and checkout states use separate rule sets. Personal preferences and room defaults are stored separately and cleared by policy.',
      },
    },
  },
  {
    slug: 'hospitality',
    icon: Hotel,
    titleKey: 'hospitality',
    group: 'commercial',
    planned: true,
  },
  {
    slug: 'workspace',
    icon: Briefcase,
    titleKey: 'workspace',
    group: 'commercial',
    planned: true,
  },
  {
    slug: 'retail',
    icon: ShoppingBag,
    titleKey: 'retail',
    group: 'commercial',
    planned: true,
  },
  {
    slug: 'campus',
    icon: GraduationCap,
    titleKey: 'campus',
    group: 'public',
    planned: true,
  },
  {
    slug: 'cultural',
    icon: Landmark,
    titleKey: 'cultural',
    group: 'public',
    planned: true,
  },
];

export function getSolution(slug: SolutionSlug) {
  return solutions.find((s) => s.slug === slug);
}

export const solutionsByGroup: Record<SolutionGroup, Solution[]> = {
  health: solutions.filter((s) => s.group === 'health'),
  home: solutions.filter((s) => s.group === 'home'),
  commercial: solutions.filter((s) => s.group === 'commercial'),
  public: solutions.filter((s) => s.group === 'public'),
};
