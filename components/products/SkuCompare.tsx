'use client';

import { useTranslations, useLocale } from 'next-intl';
import { skus } from '@/content/products';
import { Reveal } from '@/components/motion/Reveal';

export function SkuCompare() {
  const t = useTranslations('products');
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

  const rows: Array<{ label: { zh: string; en: string }; render: (s: (typeof skus)[number]) => string }> = [
    {
      label: { zh: '适合谁', en: 'Best for' },
      render: (s) =>
        s.i18nKey === 'homeBox'
          ? isZh
            ? '个人、家庭'
            : 'Individuals & households'
          : s.i18nKey === 'communityKit'
          ? isZh
            ? '长者公寓 / 社区 / 康养中心'
            : 'Senior apartments, communities, wellness centers'
          : isZh
          ? '医院 / 专科机构 / 大型养老'
          : 'Hospitals, specialty institutions, large care',
    },
    {
      label: { zh: '安装与验证安排', en: 'Installation and validation' },
      render: () => (isZh ? '按实际配置与现场确认' : 'Confirmed for the configuration and site'),
    },
    {
      label: { zh: '覆盖规模', en: 'Scale' },
      render: (s) => s.i18nKey === 'homeBox' ? (isZh ? '单户住宅' : 'One household') : (isZh ? '按场地与工作流程设计' : 'Designed for the site and workflow'),
    },
    {
      label: { zh: '参考价格', en: 'Reference price' },
      render: (s) => t(`${s.i18nKey}.price`),
    },
    {
      label: { zh: '数据去向', en: 'Where data lives' },
      render: () => (isZh ? '现场优先，按策略同步' : 'On-site first, policy-based sync'),
    },
    {
      label: { zh: '设备与系统接入', en: 'Device and system integration' },
      render: () => (isZh ? '按项目配置' : 'Project-configured'),
    },
  ];

  return (
    <section id="compare" className="py-section-lg">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">Side by Side</span>
          <h2 className="mt-4 text-display-lg text-white">
            {isZh ? '按用途选择配置方案' : 'Choose a configuration for the use'}
          </h2>
          <p className="mt-3 max-w-2xl text-body text-ink-300">
            {isZh
              ? '三种名称用于组织方案，计算主机与配套设备按任务、现场和验证结果确定。'
              : 'These names organize solution packages. Compute and equipment follow the task, site and validation results.'}
          </p>
        </Reveal>

        <div className="mt-14 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.03] text-caption uppercase text-ink-300">
              <tr>
                <th className="px-6 py-4 font-medium"></th>
                {skus.map((s) => (
                  <th key={s.slug} className="px-6 py-4 font-medium text-white">
                    {t(`${s.i18nKey}.name`)}
                    <div className="mt-1 text-caption normal-case tracking-normal text-ink-400">{t(`${s.i18nKey}.tag`)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-white/5">
                  <td className="px-6 py-4 align-top text-caption text-ink-400">
                    {isZh ? row.label.zh : row.label.en}
                  </td>
                  {skus.map((s) => (
                    <td key={s.slug} className="px-6 py-4 align-top text-ink-100">
                      {row.render(s)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
