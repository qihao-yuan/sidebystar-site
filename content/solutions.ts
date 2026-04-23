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
    kpis: [
      { label: { zh: '跌倒检出率', en: 'Fall Detection Rate' }, value: '>= 95%' },
      { label: { zh: '告警响应时间', en: 'Alert Response' }, value: '<= 60s' },
      { label: { zh: '误报率', en: 'False Alarm Rate' }, value: '<= 3%' },
      { label: { zh: '数据本地化', en: 'Data Localization' }, value: '100%' },
    ],
    architecture: [
      { zh: '红外 + 毫米波 + 视觉三模态融合,夜间零漏检', en: 'IR + mmWave + vision triple fusion, zero nighttime miss' },
      { zh: '边缘盒子本地推理 + 影子执行审批', en: 'Edge box inference + shadow-execution approval' },
      { zh: '对接护理工单系统,告警闭环', en: 'Integrates with nursing ticket systems, closed-loop alerts' },
    ],
    pilot: { weeks: '2-4', scale: { zh: '单楼层 10-30 床', en: 'Single floor, 10-30 beds' } },
    sku: { zh: 'Community Kit', en: 'Community Kit' },
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
    kpis: [
      { label: { zh: '覆盖户数', en: 'Units Covered' }, value: '20-200' },
      { label: { zh: '多站点 RBAC', en: 'Multi-site RBAC' }, value: 'Level 3' },
      { label: { zh: '审计导出', en: 'Audit Export' }, value: 'MLPS 2.0' },
      { label: { zh: '家属响应', en: 'Family Response' }, value: '<= 5min' },
    ],
    architecture: [
      { zh: '社区网关 + 单户边缘节点两级架构', en: 'Community gateway + per-unit edge node, two-tier' },
      { zh: '多站点 principal + extra_sites 授权模型', en: 'Multi-site principal + extra_sites authorization' },
      { zh: '家属 APP 分级可视 + 视频不出场', en: 'Family app tiered view + video stays on site' },
    ],
    pilot: { weeks: '4-6', scale: { zh: '50-100 户', en: '50-100 units' } },
    sku: { zh: 'Community Kit', en: 'Community Kit' },
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
    kpis: [
      { label: { zh: '依从率提升', en: 'Adherence Lift' }, value: '>= 30%' },
      { label: { zh: '异常上报时延', en: 'Anomaly Report Lag' }, value: '<= 2min' },
      { label: { zh: 'HIPAA-like 审计', en: 'HIPAA-like Audit' }, value: 'JSONL' },
      { label: { zh: 'SLA', en: 'SLA' }, value: '7x24' },
    ],
    architecture: [
      { zh: '私有化部署 + Jetson Orin 端侧推理', en: 'On-prem + Jetson Orin edge inference' },
      { zh: '对接 HIS / CIS / PACS 系统', en: 'Integrates HIS / CIS / PACS' },
      { zh: '临床 SOP 自动化规则定制', en: 'Clinical SOP automation rule customization' },
    ],
    pilot: { weeks: '6-8', scale: { zh: '单病区 20-50 床', en: 'Single ward, 20-50 beds' } },
    sku: { zh: 'Enterprise Stack', en: 'Enterprise Stack' },
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
    kpis: [
      { label: { zh: '接入设备', en: 'Devices Onboarded' }, value: '200+' },
      { label: { zh: '自适应建模', en: 'Adaptive Modeling' }, value: '30d' },
      { label: { zh: '离线可用', en: 'Offline Capable' }, value: '100%' },
      { label: { zh: '语音延迟', en: 'Voice Latency' }, value: '<= 500ms' },
    ],
    architecture: [
      { zh: 'Matter 1.3 + HA + Zigbee + BLE 统一接入', en: 'Matter 1.3 + HA + Zigbee + BLE unified' },
      { zh: '四层记忆 L0-L3 学习习惯', en: 'Four-layer memory L0-L3 habit learning' },
      { zh: '本地 LLM 语音交互', en: 'Local LLM voice interaction' },
    ],
    pilot: { weeks: '1-2', scale: { zh: '单户全屋', en: 'Single household whole-home' } },
    sku: { zh: 'Home Box', en: 'Home Box' },
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
    kpis: [
      { label: { zh: '单房部署', en: 'Per-room Deploy' }, value: '4h' },
      { label: { zh: '能耗节省', en: 'Energy Saved' }, value: '15-25%' },
      { label: { zh: '客人满意度', en: 'Guest Satisfaction' }, value: '+12%' },
      { label: { zh: '运维成本', en: 'Ops Cost' }, value: '-30%' },
    ],
    architecture: [
      { zh: '一房一中枢,标准化 PoE 安装', en: 'One hub per room, standardized PoE install' },
      { zh: '画像 bundle 可随客人跨房间转移', en: 'Profile bundle follows guest across rooms' },
      { zh: '场景预设 + 语音自适应', en: 'Scene presets + adaptive voice' },
    ],
    pilot: { weeks: '2-3', scale: { zh: '10-30 间房', en: '10-30 rooms' } },
    sku: { zh: 'Community Kit', en: 'Community Kit' },
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
