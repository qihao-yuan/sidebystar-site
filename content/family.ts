import { getSeriesName, getProductName, getPackageName, systemName } from './product-names';
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
      getSeriesName('hub','zh-CN') + '承载' + systemName('zh-CN') + '与设备接入服务。基础方向采用树莓派 5，较高计算负载另行配置；社区与机构按项目评估部署规格。',
    storyEn:
      getSeriesName('hub','en') + ' hosts ' + systemName('en') + ' and device services. Raspberry Pi 5 is the base direction; heavier workloads and multi-site deployments require their own configuration assessment.',
    exampleLabel: { zh: '适用配置', en: 'Configuration options' },
    examples: [
      { zh: getPackageName('home-box','zh-CN'), en: getPackageName('home-box','en'), descZh: systemName('zh-CN') + '与所需产品系列及原厂配套。', descEn: systemName('en') + ' with selected product series and manufacturer options.' },
      { zh: getPackageName('community-kit','zh-CN'), en: getPackageName('community-kit','en'), descZh: '按房间数量、网络和管理要求确认部署方案。', descEn: 'Deployment is scoped to room count, network and management requirements.' },
      { zh: getPackageName('enterprise-stack','zh-CN'), en: getPackageName('enterprise-stack','en'), descZh: '服务器规格与系统接口随项目评估，不等同已定型整机。', descEn: 'Server specifications and interfaces are project-defined, rather than a finished machine model.' },
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
      '先从厨房积水和卫生间状态等明确问题切入。' + getSeriesName('discreet','zh-CN') + '的水浸、声学产品与' + getSeriesName('ceiling','zh-CN') + '的毫米波产品分别设计，安装、续航和识别效果经过样机与现场验证后确定。',
    storyEn:
      'Start with specific needs such as collected water and bathroom state. Water-contact and acoustic products in ' + getSeriesName('discreet','en') + ' and mmWave products in ' + getSeriesName('ceiling','en') + ' have different designs; placement, battery life and detection performance require prototype and site validation.',
    exampleLabel: { zh: '感知器件', en: 'Devices' },
    examples: [
      { zh: getProductName('SBS-S04','zh-CN'), en: getProductName('SBS-S04','en'), descZh: '低位放置、底部触点、可换电池的无线外观方向。', descEn: 'A low-position wireless design with underside contacts and replaceable batteries.' },
      { zh: getProductName('SBS-S09','zh-CN'), en: getProductName('SBS-S09','en'), descZh: '平面吸顶设计，研究存在、静止与疑似跌倒状态。', descEn: 'A flat ceiling design for presence, stillness and suspected-fall evaluation.' },
      {
        zh: '视觉理解',
        en: 'Vision',
        descZh: '门口等明确场景按原厂设备和授权范围适配；不在卫生间配置摄像头。',
        descEn: 'Original-manufacturer cameras are considered for defined locations such as the entrance, with permission-based access; bathrooms use no camera.',
      },
      { zh: getProductName('SBS-S05','zh-CN'), en: getProductName('SBS-S05','en'), descZh: '独立拾音区与隐藏低压供电，声音线索识别仍需验证。', descEn: 'A separate acoustic opening and concealed low-voltage power; recognition of sound cues remains under validation.' },
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
      systemName('zh-CN') + '现有界面可操作记忆、任务和建议。' + getSeriesName('display','zh-CN') + '与' + getSeriesName('control','zh-CN') + '围绕显示和实体操作进行场景适配；移动端与语音按实际使用条件逐项验证，重要操作保留人工确认。',
    storyEn:
      systemName('en') + ' currently supports memories, tasks and suggestions. ' + getSeriesName('display','en') + ' and ' + getSeriesName('control','en') + ' cover display and physical-interaction integration; mobile and voice access are evaluated separately for the intended setting, with confirmation for consequential actions.',
    exampleLabel: { zh: '交互入口', en: 'Interfaces' },
    examples: [
      { zh: systemName('zh-CN') + '界面', en: systemName('en') + ' interface', descZh: '保存与找回记录、核对任务、调整建议已有实际操作录像。', descEn: 'The recording shows saved notes, task review and suggestion adjustments in use.' },
      { zh: getSeriesName('display','zh-CN') + ' · 电视入口', en: getSeriesName('display','en') + ' · TV workspace', descZh: '评估' + getSeriesName('hub','zh-CN') + '经 HDMI 显示，确认遥控与电视关闭后的入口。', descEn: 'Evaluate HDMI display, remote operation and access while the TV is off.' },
      { zh: '床旁操作', en: 'Bedside controls', descZh: '按手部活动、视力与使用习惯选择实体入口。', descEn: 'Select physical controls around dexterity, vision and daily use.' },
      { zh: '语音与移动端', en: 'Voice and mobile', descZh: '接入方式与可用功能分别验证，不以场景影片代替验收。', descEn: 'Access and available functions require their own validation; concept films are not acceptance evidence.' },
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
      '连接层围绕' + getSeriesName('bridge','zh-CN') + '进行协议适配，将项目确认范围内的设备与既有系统映射为统一状态和动作。兼容范围以设备型号、固件版本和现场验证结果为准。',
    storyEn:
      'The connection layer uses ' + getSeriesName('bridge','en') + ' for protocol integration, mapping approved devices and existing systems into consistent states and actions. Compatibility is verified by model, firmware and site testing.',
    exampleLabel: { zh: '适配工作', en: 'Integration scope' },
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
      '窗帘电机、轨道、门锁与测量设备优先采用适合场景的原厂产品。具体设备完成适配和现场测试后，才能纳入可执行范围。',
    storyEn:
      'Curtain motors, tracks, locks and measurement devices use suitable original-manufacturer products. Each device enters the executable scope only after integration and site testing.',
    exampleLabel: { zh: '执行范围', en: 'Action scope' },
    examples: [
      { zh: getSeriesName('control','zh-CN') + ' · 灯光与窗帘配套', en: getSeriesName('control','en') + ' · Lighting and curtain options', descZh: '核对回路、电机、轨道、负载和手动入口后适配。', descEn: 'Confirm circuits, motors, tracks, loads and manual controls before integration.' },
      { zh: '厨房关水选配', en: 'Optional water shutoff', descZh: '先勘察阀型、水路和维护空间；不承诺任意住宅均可安装。', descEn: 'Survey the valve, circuit and service space; suitability varies by home.' },
      { zh: '门口设备', en: 'Entrance devices', descZh: '来访查看与开锁权限分别确认，采用原厂设备。', descEn: 'Verify visitor viewing and unlocking permissions separately on OEM devices.' },
      { zh: getSeriesName('care','zh-CN') + ' · 床旁测量配套', en: getSeriesName('care','en') + ' · Bedside measurement options', descZh: '血压与血氧设备由合作或采购提供，按具体型号确认数据接入。', descEn: 'Blood-pressure and oxygen devices are partner-supplied or purchased, with data access verified by model.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
];

export function getFamilyMember(role: FamilyRole) {
  return family.find((f) => f.role === role);
}
