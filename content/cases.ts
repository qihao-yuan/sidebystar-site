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

// 当前对外不放任何客户案例: 只有真实试点跑完、双方签过字的数据
// 才会进入这个数组. 在此之前, /cases 页面渲染为试点征集页面.
export const cases: CaseItem[] = [];
