import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { solutions, getSolution, SolutionSlug } from '@/content/solutions';
import { Reveal } from '@/components/motion/Reveal';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const slugs: SolutionSlug[] = ['elderly-care', 'community-care', 'clinical-assist', 'smart-home', 'smart-room'];
  return slugs.flatMap((slug) => [{ locale: 'zh-CN', slug }, { locale: 'en', slug }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en'; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const sol = getSolution(slug as SolutionSlug);
  if (!sol) return {};
  const t = await getTranslations({ locale, namespace: 'solutions.items' });
  return buildMetadata({
    locale,
    path: `/solutions/${slug}`,
    title: t(`${sol.titleKey}.title`),
    description: t(`${sol.titleKey}.brief`),
  });
}

export default async function SolutionDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const sol = getSolution(slug as SolutionSlug);
  if (!sol || sol.planned || !sol.buyer || !sol.problems || !sol.kpis || !sol.architecture || !sol.pilot || !sol.sku) {
    notFound();
  }
  setRequestLocale(locale);
  const items = await getTranslations('solutions.items');
  const isZh = locale === 'zh-CN';
  const pick = (obj: { zh: string; en: string }) => (isZh ? obj.zh : obj.en);

  const buyer = sol.buyer!;
  const problems = sol.problems!;
  const kpis = sol.kpis!;
  const architecture = sol.architecture!;
  const pilot = sol.pilot!;
  const sku = sol.sku!;
  const Icon = sol.icon;

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative">
          <Link href="/solutions" className="btn-link mb-8"><ArrowRight size={14} className="rotate-180" /> Back</Link>
          <div className="flex flex-col gap-6">
            <span className="eyebrow">Scenario · SKU: {pick(sku)}</span>
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                <Icon size={32} className="text-brand-halo" />
              </div>
              <h1 className="text-display-xl text-white">{items(`${sol.titleKey}.title`)}</h1>
            </div>
            <p className="max-w-3xl text-body-lg text-ink-300">{items(`${sol.titleKey}.brief`)}</p>
          </div>
        </div>
      </section>

      {/* Buyer */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">01 · {isZh ? '客户画像' : 'Buyer Profile'}</span>
            <p className="mt-4 max-w-3xl text-display-sm text-white">{pick(buyer)}</p>
          </Reveal>
        </div>
      </section>

      {/* Problems */}
      <section className="py-section">
        <div className="container-page">
          <span className="eyebrow">02 · {isZh ? '我们解决的问题' : 'Problems We Solve'}</span>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card-vision h-full">
                  <span className="font-mono text-caption text-ink-500">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-4 text-body-lg text-white">{pick(p)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-section">
        <div className="container-page">
          <span className="eyebrow">03 · {isZh ? '部署架构' : 'Architecture'}</span>
          <ul className="mt-6 space-y-4">
            {architecture.map((a, i) => (
              <Reveal key={i} delay={i * 60}>
                <li className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-halo" />
                  <span className="text-body-lg text-white">{pick(a)}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* KPI */}
      <section className="py-section">
        <div className="container-page">
          <span className="eyebrow">04 · {isZh ? 'KPI 承诺' : 'KPI Commitment'}</span>
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
            {kpis.map((k, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card-vision">
                  <div className="font-display text-display-md text-white">{k.value}</div>
                  <div className="mt-2 text-caption text-ink-300">{pick(k.label)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot */}
      <section className="py-section-lg">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-10 md:p-16">
            <GradientMesh variant="cta" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">05 · {isZh ? '试点起步' : 'Pilot Kickoff'}</span>
                <h3 className="mt-3 text-display-lg text-white">
                  {pilot.weeks} <span className="text-ink-300">{isZh ? '周' : 'weeks'}</span>
                </h3>
                <p className="mt-2 text-body-lg text-ink-200">{pick(pilot.scale)}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href="/pilot" variant="primary">
                  {isZh ? '申请试点' : 'Apply for Pilot'} <ArrowRight size={16} />
                </MagneticButton>
                <MagneticButton href="/contact" variant="ghost">
                  {isZh ? '联系销售' : 'Contact Sales'}
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
