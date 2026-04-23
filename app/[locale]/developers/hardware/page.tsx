import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { Reveal } from '@/components/motion/Reveal';
import { skus } from '@/content/products';
import { buildMetadata } from '@/lib/seo';
import { Cpu, ArrowLeft } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-CN';
  return buildMetadata({
    locale,
    path: '/developers/hardware',
    title: isZh ? '硬件规格表' : 'Hardware Spec Sheet',
    description: isZh
      ? 'Home Box / Community Kit / Enterprise Stack 的完整硬件规格, 面向集成工程师与硬件方采购。'
      : 'Full hardware specifications of Home Box, Community Kit, and Enterprise Stack -- for integrators and hardware procurement.',
  });
}

export default async function HardwareSpecPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');
  const isZh = locale === 'zh-CN';

  const rows: Array<{ label: { zh: string; en: string }; render: (s: (typeof skus)[number]) => string }> = [
    { label: { zh: '主控', en: 'Chip' }, render: (s) => s.specs.chip },
    { label: { zh: '内存', en: 'Memory' }, render: (s) => s.specs.memory },
    { label: { zh: '存储', en: 'Storage' }, render: (s) => s.specs.storage },
    { label: { zh: 'AI 加速', en: 'AI Accel' }, render: (s) => s.specs.ai },
    { label: { zh: '协议接入', en: 'Protocols' }, render: (s) => s.specs.protocols.join(', ') },
    { label: { zh: '接口', en: 'I/O' }, render: (s) => s.specs.ports },
    { label: { zh: '功耗', en: 'Power' }, render: (s) => s.specs.power },
    { label: { zh: '尺寸', en: 'Dimensions' }, render: (s) => s.specs.dimensions },
    { label: { zh: '部署周期', en: 'Deployment' }, render: (s) => (isZh ? `${s.deploymentWeeks} 周` : `${s.deploymentWeeks} weeks`) },
    { label: { zh: '覆盖规模', en: 'Scale' }, render: (s) => s.users },
    { label: { zh: '参考价格', en: 'Reference price' }, render: (s) => t(`${s.i18nKey}.price`) },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative max-w-4xl">
          <Link href="/developers" className="btn-link mb-8">
            <ArrowLeft size={14} /> {isZh ? '返回开发者' : 'Back to developers'}
          </Link>
          <span className="eyebrow">Developer Zone · Hardware</span>
          <h1 className="mt-4 text-display-2xl text-white">
            {isZh ? '硬件规格表' : 'Hardware Spec Sheet'}
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-300">
            {isZh
              ? '三款整机的完整硬件参数 —— 芯片、内存、存储、接口、功耗、尺寸。面向系统集成、硬件招标、定制方案。普通读者无需关心, 请回到产品或场景页。'
              : 'Full hardware parameters across the three products -- chip, memory, storage, ports, power, dimensions. For integrators, hardware RFPs, and custom deployments. If you are not here for that, the product or scenario pages are a better place.'}
          </p>
        </div>
      </section>

      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <div className="mb-6 flex items-center gap-2 text-caption uppercase tracking-wide text-ink-500">
              <Cpu size={14} /> {isZh ? '三款整机规格对比' : 'Three SKUs compared'}
            </div>
          </Reveal>
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03] text-caption uppercase text-ink-300">
                <tr>
                  <th className="px-6 py-4 font-medium">{isZh ? '参数' : 'Spec'}</th>
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
                      <td key={s.slug} className="px-6 py-4 align-top font-mono text-caption text-ink-100">
                        {row.render(s)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-body text-ink-300">
            <div className="text-caption uppercase tracking-wide text-ink-500">
              {isZh ? '补充说明' : 'Notes'}
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-brand-halo">·</span>{' '}
                {isZh
                  ? 'Enterprise Stack 支持完全定制底板、机箱与 I/O 扩展, 以上参数为参考基线。'
                  : 'Enterprise Stack supports fully custom baseboard, chassis, and I/O. The figures above are the baseline reference.'}
              </li>
              <li>
                <span className="text-brand-halo">·</span>{' '}
                {isZh
                  ? '协议清单随固件版本滚动更新, 最新兼容矩阵请联系销售获取。'
                  : 'The protocol list rolls with firmware releases. For the latest compatibility matrix, contact sales.'}
              </li>
              <li>
                <span className="text-brand-halo">·</span>{' '}
                {isZh
                  ? '所有整机出厂前经过 55 分钟完整体检, 出货报告可随发货提供。'
                  : 'Every unit ships after a 55-minute full bring-up test. Factory reports ship on request.'}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
