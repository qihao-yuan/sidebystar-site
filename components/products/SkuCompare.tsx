'use client';

import { useTranslations } from 'next-intl';
import { skus } from '@/content/products';
import { Reveal } from '@/components/motion/Reveal';

export function SkuCompare() {
  const t = useTranslations('products');

  const rows: Array<{ label: string; key: keyof typeof skus[number]['specs'] | 'deploymentWeeks' | 'users' | 'price' }> = [
    { label: 'Chip', key: 'chip' as any },
    { label: 'Memory', key: 'memory' as any },
    { label: 'Storage', key: 'storage' as any },
    { label: 'AI Accel', key: 'ai' as any },
    { label: 'Protocols', key: 'protocols' as any },
    { label: 'I/O', key: 'ports' as any },
    { label: 'Power', key: 'power' as any },
    { label: 'Dimensions', key: 'dimensions' as any },
    { label: 'Deployment', key: 'deploymentWeeks' },
    { label: 'Scale', key: 'users' },
    { label: 'Pricing', key: 'price' },
  ];

  return (
    <section id="compare" className="py-section-lg">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">Side by Side</span>
          <h2 className="mt-4 text-display-lg text-white">Specifications compared.</h2>
        </Reveal>

        <div className="mt-14 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.03] text-caption uppercase text-ink-300">
              <tr>
                <th className="px-6 py-4 font-medium">Spec</th>
                {skus.map((s) => (
                  <th key={s.slug} className="px-6 py-4 font-medium text-white">
                    {t(`${s.i18nKey}.name`)}
                    <div className="mt-1 text-caption normal-case tracking-normal text-ink-400">{t(`${s.i18nKey}.tag`)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-white/5">
                  <td className="px-6 py-4 align-top text-caption text-ink-400">{row.label}</td>
                  {skus.map((s) => {
                    let val: string;
                    if (row.key === 'protocols') {
                      val = s.specs.protocols.join(', ');
                    } else if (row.key === 'deploymentWeeks') {
                      val = `${s.deploymentWeeks} weeks`;
                    } else if (row.key === 'users') {
                      val = s.users;
                    } else if (row.key === 'price') {
                      val = t(`${s.i18nKey}.price`);
                    } else {
                      val = (s.specs as any)[row.key];
                    }
                    return (
                      <td key={s.slug} className="px-6 py-4 align-top text-ink-100">
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
