export type CaseItem = {
  slug: string;
  title: { zh: string; en: string };
  scenario: string;
  scale: { zh: string; en: string };
  timeline: string;
  sku: string;
  metrics: Array<{ label: { zh: string; en: string }; value: string }>;
  story: { zh: string; en: string };
};

export const cases: CaseItem[] = [
  {
    slug: 'hangzhou-senior-apartment',
    title: { zh: '杭州长者公寓 · 80 床跌倒检测试点', en: 'Hangzhou Senior Apartment · 80-bed fall detection pilot' },
    scenario: 'Elderly Care',
    scale: { zh: '80 床 · 4 周试点', en: '80 beds · 4-week pilot' },
    timeline: 'Q1 2026',
    sku: 'Community Kit',
    metrics: [
      { label: { zh: '跌倒检出率', en: 'Fall Detection Rate' }, value: '97.2%' },
      { label: { zh: '误报率', en: 'False Alarm Rate' }, value: '2.1%' },
      { label: { zh: '平均响应', en: 'Avg Response' }, value: '42s' },
      { label: { zh: '家属满意度', en: 'Family NPS' }, value: '+68' },
    ],
    story: {
      zh: '通过三模态融合, 夜间无光环境依然保持检出率。家属通过分级可视界面,只能看到必要的事件提示,视频不离院。',
      en: 'Triple fusion keeps detection high in dark night. Families see only tiered event alerts. Video never leaves the facility.',
    },
  },
  {
    slug: 'shanghai-rehab-center',
    title: { zh: '上海某康复医学中心 · 术后依从性提升', en: 'Shanghai Rehab Center · Post-op adherence lift' },
    scenario: 'Clinical Assist',
    scale: { zh: '50 床 · 8 周试点', en: '50 beds · 8-week pilot' },
    timeline: 'Q4 2025',
    sku: 'Enterprise Stack',
    metrics: [
      { label: { zh: '依从率提升', en: 'Adherence Lift' }, value: '+34%' },
      { label: { zh: '异常上报', en: 'Anomaly Report' }, value: '1.2min' },
      { label: { zh: '护士工时节省', en: 'Nurse Hours Saved' }, value: '22%' },
      { label: { zh: 'HIS 对接', en: 'HIS Integrated' }, value: 'Yes' },
    ],
    story: {
      zh: '对接医院 HIS / CIS 系统, 每日早晚提醒自动按排班节奏触发, 异常上报可直接进入护士站工单。',
      en: 'Integrated with HIS / CIS. Morning and evening reminders fire on shift-aware schedules. Anomalies go directly into nurse-station tickets.',
    },
  },
  {
    slug: 'ningbo-residential-community',
    title: { zh: '宁波某小区社区养老试点', en: 'Ningbo Community Care Pilot' },
    scenario: 'Community Care',
    scale: { zh: '120 户 · 6 周', en: '120 households · 6 weeks' },
    timeline: 'Q2 2026',
    sku: 'Community Kit',
    metrics: [
      { label: { zh: '覆盖户数', en: 'Units Covered' }, value: '120' },
      { label: { zh: '审计导出', en: 'Audit Export' }, value: 'MLPS 2.0' },
      { label: { zh: '家属 APP 活跃', en: 'Family App MAU' }, value: '84%' },
      { label: { zh: '运营成本节省', en: 'Ops Cost Saved' }, value: '31%' },
    ],
    story: {
      zh: '社区网关 + 单户节点两级架构, 运营方在一个后台管理全部 120 户的分级授权与家属可视边界。',
      en: 'Two-tier architecture with community gateway and per-unit nodes. Operators manage tiered authorization and family view boundaries from one backend.',
    },
  },
];
