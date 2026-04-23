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
    kpis: [
      { label: { zh: '跌倒检出率', en: 'Fall Detection Rate' }, value: '>= 95%' },
      { label: { zh: '告警响应时间', en: 'Alert Response' }, value: '<= 60s' },
      { label: { zh: '误报率', en: 'False Alarm Rate' }, value: '<= 3%' },
      { label: { zh: '数据本地化', en: 'Data Localization' }, value: '100%' },
    ],
    architecture: [
      { zh: '不靠摄像头对着脸 —— 用毫米波、红外、声学判断', en: 'No camera on the face -- senses through mmWave, IR and sound' },
      { zh: '所有告警在本地完成, 断网也不会掉链子', en: 'All alerts run locally and hold even when the network drops' },
      { zh: '与护理工单系统打通, 告警直达值班护士', en: 'Wired into nursing ticket systems, alerts land on the on-duty nurse' },
    ],
    pilot: { weeks: '2-4', scale: { zh: '单楼层 10-30 床', en: 'Single floor, 10-30 beds' } },
    sku: { zh: 'Community Kit', en: 'Community Kit' },
    bundle: {
      headline: {
        zh: '让一张床, 夜里可以被依靠。',
        en: 'Make one bed, dependable through the night.',
      },
      items: [
        { zh: '床畔中枢 —— 不在云端, 就在床头', en: 'A bedside hub -- not in the cloud, right by the bed' },
        { zh: '夜间感知套件 —— 不用摄像头照着脸', en: 'Nighttime sensing -- no camera pointed at the face' },
        { zh: '一键急救呼叫 —— 按钮在手边, 响应在本地', en: 'One-touch help call -- button by hand, response on-site' },
        { zh: '家属端 APP —— 只看该看的那一份', en: 'Family app -- sees only what it should' },
        { zh: '两周驻场 —— 我们陪你上线', en: 'Two weeks on-site -- we walk you live' },
      ],
      rhythm: {
        zh: '起夜一次, 走廊灯先亮到 10%。跌倒、久卧、离床、超时坐起, 四种情况分头告警。白天回到普通房间, 设备几乎看不见。',
        en: 'A trip up at night nudges the hallway light to 10%. Falls, prolonged bed rest, leaving bed, too-long sitting -- four kinds of alerts, each with its own path. By day the room looks ordinary.',
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
    kpis: [
      { label: { zh: '覆盖户数', en: 'Units Covered' }, value: '20-200' },
      { label: { zh: '多站点 RBAC', en: 'Multi-site RBAC' }, value: 'Level 3' },
      { label: { zh: '审计导出', en: 'Audit Export' }, value: 'MLPS 2.0' },
      { label: { zh: '家属响应', en: 'Family Response' }, value: '<= 5min' },
    ],
    architecture: [
      { zh: '一台社区网关 + 每户一小套, 两级协同', en: 'One community gateway and small per-unit kits, two tiers in concert' },
      { zh: '一位家属看自家、一位管理员管全楼, 各看各的', en: 'Family sees their own door, managers see the whole building -- each their own view' },
      { zh: '视频不出现场, 家属看到的只是状态而非画面', en: 'Video never leaves the site; families see status, not footage' },
    ],
    pilot: { weeks: '4-6', scale: { zh: '50-100 户', en: '50-100 units' } },
    sku: { zh: 'Community Kit', en: 'Community Kit' },
    bundle: {
      headline: {
        zh: '一楼到十楼, 用一套系统照看。',
        en: 'From ground floor to the top, watched over by one system.',
      },
      items: [
        { zh: '社区网关 —— 一台管几十到几百户, 本地运行', en: 'Community gateway -- one unit for dozens to hundreds of homes, run locally' },
        { zh: '户内感知小套件 —— 无摄像头优先, 克制地关心', en: 'Small in-unit sensing kit -- no-camera first, a gentle kind of care' },
        { zh: '管理员控制台 —— 工单、巡查、事件, 一屏到底', en: 'Manager console -- tickets, rounds and incidents, on one screen' },
        { zh: '家属 APP —— 家人看自家, 机构管全楼', en: 'Family app -- families see home, staff see the building' },
        { zh: '四到六周交付 —— 含培训与调优', en: 'Four to six weeks to live -- training and tuning included' },
      ],
      rhythm: {
        zh: '白天是社区活动的一部分, 提醒老人按时吃药、喝水、晒太阳。夜里是安静的看护, 出事第一时间到人。',
        en: 'By day it is part of community life -- reminding pills, water, a walk in the sun. By night it is quiet care; when something happens, the right person is reached first.',
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
    kpis: [
      { label: { zh: '依从率提升', en: 'Adherence Lift' }, value: '>= 30%' },
      { label: { zh: '异常上报时延', en: 'Anomaly Report Lag' }, value: '<= 2min' },
      { label: { zh: 'HIPAA-like 审计', en: 'HIPAA-like Audit' }, value: 'JSONL' },
      { label: { zh: 'SLA', en: 'SLA' }, value: '7x24' },
    ],
    architecture: [
      { zh: '全栈私有化部署, 患者数据不出院', en: 'Fully on-prem -- patient data never leaves the hospital' },
      { zh: '与医院既有信息系统打通, 不推倒重来', en: 'Works with the hospital information systems you already have' },
      { zh: '临床科室 SOP 定制化, 与现有流程对齐', en: 'Clinical SOPs customized with you -- aligned to current workflow' },
    ],
    pilot: { weeks: '6-8', scale: { zh: '单病区 20-50 床', en: 'Single ward, 20-50 beds' } },
    sku: { zh: 'Enterprise Stack', en: 'Enterprise Stack' },
    bundle: {
      headline: {
        zh: '把术后康复的节拍, 延续到病房之外。',
        en: 'Carry the rhythm of recovery past the ward.',
      },
      items: [
        { zh: '病区边缘节点 —— 私有化部署, 数据不出院', en: 'Ward edge node -- on-prem, data stays inside' },
        { zh: '夜间生理关注 —— 睡眠、离床、呼吸异常, 持续在看', en: 'Overnight vitals watch -- sleep, bed-leaving, abnormal breath, under gentle watch' },
        { zh: 'SOP 自动化 —— 按科室既有流程走, 不改规则', en: 'SOP automation -- follows existing clinical flow, no rule rewrite' },
        { zh: '临床系统对接 —— 与 HIS / 电子病历打通', en: 'Clinical integration -- plugs into HIS / EMR' },
        { zh: '六到八周定制 —— 科室与我们共同调试', en: 'Six to eight weeks of customization -- tuned with your team' },
      ],
      rhythm: {
        zh: '入院时读入基线, 每一次异常都留下一条可回溯的记录。家属端只在必要时被打扰, 临床团队第一时间拿到事实。',
        en: 'Baselines read in at admission; every anomaly leaves a traceable line. Families are only disturbed when it matters; clinicians get the facts first.',
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
    kpis: [
      { label: { zh: '接入设备', en: 'Devices Onboarded' }, value: '200+' },
      { label: { zh: '自适应建模', en: 'Adaptive Modeling' }, value: '30d' },
      { label: { zh: '离线可用', en: 'Offline Capable' }, value: '100%' },
      { label: { zh: '语音延迟', en: 'Voice Latency' }, value: '<= 500ms' },
    ],
    architecture: [
      { zh: '主流生态和协议都能说, 家里现有的设备不用换', en: 'Speaks the mainstream ecosystems and protocols -- no rip-and-replace' },
      { zh: '一层一层学习你的习惯, 从当下感受到长期节奏', en: 'Layer by layer, learns your habits -- from the present to your long rhythm' },
      { zh: '语音交互在本地完成, 说话不离家', en: 'Voice stays on-device -- your words never leave home' },
    ],
    pilot: { weeks: '1-2', scale: { zh: '单户全屋', en: 'Single household whole-home' } },
    sku: { zh: 'Home Box', en: 'Home Box' },
    bundle: {
      headline: {
        zh: '你家的灯, 最后一次被教。',
        en: 'The last time your lights ever need teaching.',
      },
      items: [
        { zh: 'Home Box —— 一只盒子, 接管所有自动化', en: 'Home Box -- one box, takes over all automations' },
        { zh: '夜间路径照明 —— 走过哪里, 哪里自己亮起', en: 'Nighttime pathway lighting -- where you walk is where it wakes' },
        { zh: '情景面板 / 旋钮 —— 不开口时, 也有入口', en: 'Scene panel and dial -- a way in, even when you do not speak' },
        { zh: '跨品牌兼容 —— 你家原来的, 不必换', en: 'Cross-brand -- what you already have stays' },
        { zh: '一到两周自适应 —— 越用越懂你', en: 'One to two weeks of self-adaptation -- knows you more each day' },
      ],
      rhythm: {
        zh: '第一周学习你的作息, 第二周开始前置安排。一个月后, 它已经知道你下班回家想要什么。',
        en: 'Week one, it learns your rhythm. Week two, it begins preparing ahead. A month in, it already knows what you want when you walk home.',
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
    kpis: [
      { label: { zh: '单房部署', en: 'Per-room Deploy' }, value: '4h' },
      { label: { zh: '能耗节省', en: 'Energy Saved' }, value: '15-25%' },
      { label: { zh: '客人满意度', en: 'Guest Satisfaction' }, value: '+12%' },
      { label: { zh: '运维成本', en: 'Ops Cost' }, value: '-30%' },
    ],
    architecture: [
      { zh: '一房一中枢, 不破坏现有装修', en: 'One hub per room, no damage to existing interior' },
      { zh: '客人的偏好能随他一起换房, 不用重新设置', en: 'A guest\'s preferences follow them between rooms -- no reconfiguration' },
      { zh: '一句话能把房间调到想要的状态', en: 'One sentence sets the room the way you like' },
    ],
    pilot: { weeks: '2-3', scale: { zh: '10-30 间房', en: '10-30 rooms' } },
    sku: { zh: 'Community Kit', en: 'Community Kit' },
    bundle: {
      headline: {
        zh: '从按按钮的房间, 升级为懂客人的房间。',
        en: 'From rooms that take buttons, to rooms that know the guest.',
      },
      items: [
        { zh: '一房一中枢 —— 标准化安装, 不破坏装修', en: 'One hub per room -- standardized install, no interior damage' },
        { zh: '场景预设与语音 —— 客人一句话, 房间听得懂', en: 'Preset scenes and voice -- one sentence, understood' },
        { zh: '画像随客人走 —— 换房不用重新设置', en: 'Guest profile travels -- re-room without reset' },
        { zh: '客房管理台 —— 前台、工程、客房一屏', en: 'Housekeeping console -- front desk, engineering, guest rooms in one view' },
        { zh: '两到三周试点 —— 先做 10-30 间', en: 'Two to three weeks of pilot -- start with 10-30 rooms' },
      ],
      rhythm: {
        zh: '入住前, 房间已为这位客人准备好光线与温度。退房后, 个人设定随画像离开, 房间回到安静的默认。',
        en: 'Before check-in, light and temperature are already set for this guest. After check-out, personal settings leave with the profile; the room returns to a quiet default.',
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
