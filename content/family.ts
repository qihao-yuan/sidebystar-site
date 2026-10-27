import {
  Cpu,
  Radar,
  SlidersHorizontal,
  Workflow,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';

export type FamilyRole = 'gateway' | 'sense' | 'control' | 'connect' | 'act';

export type FamilyMember = {
  role: FamilyRole;
  order: number;
  icon: LucideIcon;
  nameZh: string;
  nameEn: string;
  tagZh: string;
  tagEn: string;
  storyZh: string;
  storyEn: string;
  exampleLabel: { zh: string; en: string };
  examples: Array<{ zh: string; en: string; descZh: string; descEn: string }>;
  bundledIn?: Array<'home-box' | 'community-kit' | 'enterprise-stack'>;
  roadmap?: boolean;
  roadmapNote?: { zh: string; en: string };
};

export const family: FamilyMember[] = [
  {
    role: 'gateway',
    order: 1,
    icon: Cpu,
    nameZh: '网关 · Gateway',
    nameEn: 'Gateway',
    tagZh: '现场计算与状态管理',
    tagEn: 'On-site compute and state management',
    storyZh:
      '网关统一管理现场设备、空间状态和自动化规则。家庭、社区与机构采用不同部署规格，关键控制链路均在现场运行。',
    storyEn:
      'The gateway manages site devices, spatial state and automation rules. Homes, communities and institutions use different deployment profiles while essential control paths remain on site.',
    exampleLabel: { zh: '家族成员', en: 'Members' },
    examples: [
      { zh: 'Home Box', en: 'Home Box', descZh: '面向单户住宅与独立房间的本地中枢。', descEn: 'A local hub for individual homes and rooms.' },
      { zh: 'Community Gateway', en: 'Community Gateway', descZh: '面向楼层、社区和长者公寓的分级网关。', descEn: 'A tiered gateway for floors, communities and senior apartments.' },
      { zh: 'Enterprise Node', en: 'Enterprise Node', descZh: '面向医院与大型机构的私有化节点。', descEn: 'An on-premises node for hospitals and large facilities.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
  {
    role: 'sense',
    order: 2,
    icon: Radar,
    nameZh: '感知 · Sense',
    nameEn: 'Sense',
    tagZh: '多源状态输入',
    tagEn: 'Multi-source state input',
    storyZh:
      '感知层汇集存在、活动、环境和设备状态，并转换为可供规则使用的结构化事件。采集范围与留存方式由现场策略统一管理。',
    storyEn:
      'The sensing layer combines presence, activity, environmental and device state into structured events for rules. Site policy governs collection scope and retention.',
    exampleLabel: { zh: '感知器件', en: 'Devices' },
    examples: [
      { zh: '存在感知', en: 'Presence', descZh: '识别空间占用、区域活动与离床状态。', descEn: 'Detects occupancy, zoned activity and bed-exit state.' },
      { zh: '环境感知', en: 'Environment', descZh: '采集温度、湿度、照度与环境变化。', descEn: 'Captures temperature, humidity, light and environmental changes.' },
      {
        zh: '视觉理解',
        en: 'Vision',
        descZh: '在策略允许时启用视觉推理; 是否录像、留存多久与脱敏策略由现场配置与审计要求约束。',
        descEn: 'Vision runs when policy permits; recording, retention, and de-identification follow on-site configuration and audit requirements.',
      },
      { zh: '声学事件', en: 'Acoustics', descZh: '按现场策略识别特定声学事件。', descEn: 'Detects defined acoustic events under site policy.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
  {
    role: 'control',
    order: 3,
    icon: SlidersHorizontal,
    nameZh: '控制 · Control',
    nameEn: 'Control',
    tagZh: '现场交互与人工确认',
    tagEn: 'On-site interaction and confirmation',
    storyZh:
      '控制层提供旋钮、按键、面板、语音和移动端入口。常用操作保持直接，高风险动作保留确认与人工接管。',
    storyEn:
      'The control layer provides dials, keys, panels, voice and mobile interfaces. Everyday actions stay direct while consequential actions retain confirmation and manual override.',
    exampleLabel: { zh: '交互入口', en: 'Interfaces' },
    examples: [
      { zh: '床畔旋钮', en: 'Bedside Dial', descZh: '支持无需注视的触觉操作。', descEn: 'Tactile operation without requiring a screen.' },
      { zh: '墙面面板', en: 'Wall Panel', descZh: '集中显示房间状态与常用场景。', descEn: 'Shows room state and common scenes in one place.' },
      { zh: '语音入口', en: 'Voice', descZh: '处理明确指令，并对关键动作请求确认。', descEn: 'Handles explicit commands and confirms consequential actions.' },
      { zh: '移动端', en: 'App', descZh: '按角色查看状态、告警与操作记录。', descEn: 'Shows state, alerts and records according to role.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
  {
    role: 'connect',
    order: 4,
    icon: Workflow,
    nameZh: '连接 · Connect',
    nameEn: 'Connect',
    tagZh: '协议适配与系统集成',
    tagEn: 'Protocol adaptation and integration',
    storyZh:
      '连接层将项目确认范围内的设备与既有系统映射为统一状态和动作。兼容范围以设备型号、固件版本和现场验证结果为准。',
    storyEn:
      'The connection layer maps approved devices and existing systems into consistent states and actions. Compatibility is verified by model, firmware and site testing.',
    exampleLabel: { zh: '能接入的生态', en: 'Ecosystems' },
    examples: [
      { zh: '设备协议', en: 'Device protocols', descZh: '按项目接入经过验证的设备与协议。', descEn: 'Connects project-approved devices and protocols.' },
      { zh: '开源平台', en: 'Open platforms', descZh: '与既有自动化平台并行接入或分阶段迁移。', descEn: 'Supports coexistence or staged migration from existing platforms.' },
      { zh: '机构系统', en: 'Institutional systems', descZh: '通过项目接口连接机构内部系统。', descEn: 'Connects institutional systems through project-defined interfaces.' },
      { zh: '插件扩展', en: 'Plugin extensions', descZh: '通过权限清晰的插件扩展设备与业务能力。', descEn: 'Extends device and workflow capabilities through scoped plugins.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
  {
    role: 'act',
    order: 5,
    icon: Lightbulb,
    nameZh: '执行 · Act',
    nameEn: 'Act',
    tagZh: '授权动作与结果反馈',
    tagEn: 'Authorized action and feedback',
    storyZh:
      '执行层将经过确认的规则送到照明、窗帘、暖通和低压回路，并记录设备反馈、失败原因与人工接管状态。',
    storyEn:
      'The action layer routes approved rules to lighting, curtains, HVAC and low-voltage circuits while recording device feedback, failures and manual override.',
    exampleLabel: { zh: '执行范围', en: 'Action scope' },
    examples: [
      { zh: '灯光与场景', en: 'Light & Scene', descZh: '执行回路、调光与色温控制并反馈结果。', descEn: 'Controls circuits, dimming and color temperature with feedback.' },
      { zh: '空调 / 地暖 / 新风', en: 'HVAC & Ventilation', descZh: '在设备安全范围内执行环境控制。', descEn: 'Runs environmental controls within device safety limits.' },
      { zh: '门锁 / 床旁呼叫', en: 'Locks & Call', descZh: '关键动作按权限与确认流程执行。', descEn: 'Runs consequential actions under access and confirmation policy.' },
      { zh: '能耗管理', en: 'Energy', descZh: '记录分项能耗、策略调整与执行结果。', descEn: 'Records sub-metering, policy changes and execution results.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
];

export function getFamilyMember(role: FamilyRole) {
  return family.find((f) => f.role === role);
}
