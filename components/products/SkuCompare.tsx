'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { skus } from '@/content/products';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowRight } from 'lucide-react';

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
      label: { zh: '上线周期', en: 'Time to live' },
      render: (s) => (isZh ? `${s.deploymentWeeks} 周` : `${s.deploymentWeeks} weeks`),
    },
    {
      label: { zh: '覆盖规模', en: 'Scale' },
      render: (s) => s.users,
    },
    {
      label: { zh: '参考价格', en: 'Reference price' },
      render: (s) => t(`${s.i18nKey}.price`),
    },
    {
      label: { zh: '数据去向', en: 'Where data lives' },
      render: () => (isZh ? '不出现场' : 'Stays on site'),
    },
    {
      label: { zh: '第三方插件', en: 'Third-party plugins' },
      render: () => (isZh ? '支持' : 'Supported'),
    },
  ];

  return (
    <section id="compare" className="py-section-lg">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">Side by Side</span>
          <h2 className="mt-4 text-display-lg text-white">
            {isZh ? '三款放在一起看一眼。' : 'All three, at a glance.'}
          </h2>
          <p className="mt-3 max-w-2xl text-body text-ink-300">
            {isZh
              ? '这里只看"谁用、多久、多大、多少钱"。如果你想要完整的硬件规格, 请到开发者专区。'
              : 'This view stays on who, when, how big, how much. For full hardware specs, head over to the developer zone.'}
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5">
          <div>
            <div className="text-caption uppercase tracking-wide text-ink-500">
              {isZh ? '需要完整的硬件规格?' : 'Need the full hardware spec?'}
            </div>
            <p className="mt-1 text-body text-ink-200">
              {isZh ? '芯片、内存、存储、接口、功耗、尺寸, 都在开发者专区里。' : 'Chip, memory, storage, ports, power, dimensions -- all in the developer zone.'}
            </p>
          </div>
          <Link href="/developers/hardware" className="btn-ghost">
            {isZh ? '前往硬件规格表' : 'Open spec sheet'} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
