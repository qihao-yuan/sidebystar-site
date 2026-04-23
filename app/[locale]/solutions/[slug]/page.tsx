import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { solutions, getSolution, SolutionSlug } from '@/content/solutions';
import { Reveal } from '@/components/motion/Reveal';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ArrowRight, Package } from 'lucide-react';
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
  if (!sol || sol.planned || !sol.buyer || !sol.problems || !sol.kpis || !sol.pilot || !sol.sku || !sol.bundle) {
    notFound();
  }
  setRequestLocale(locale);
  const items = await getTranslations('solutions.items');
  const isZh = locale === 'zh-CN';
  const pick = (obj: { zh: string; en: string }) => (isZh ? obj.zh : obj.en);

  const buyer = sol.buyer!;
  const problems = sol.problems!;
  const kpis = sol.kpis!;
  const pilot = sol.pilot!;
  const sku = sol.sku!;
  const bundle = sol.bundle!;
  const Icon = sol.icon;

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative">
          <Link href="/solutions" className="btn-link mb-8">
            <ArrowRight size={14} className="rotate-180" /> {isZh ? '返回场景' : 'Back'}
          </Link>
          <div className="flex flex-col gap-6">
            <span className="eyebrow">{isZh ? '场景套装' : 'Scenario Bundle'}</span>
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

      {/* Section 01 · Bundle Narrative */}
      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start">
            <div>
              <Reveal>
                <span className="eyebrow">01 · {isZh ? '这一套怎么落地' : 'How this bundle lands'}</span>
              </Reveal>
              <h2 className="mt-5 text-display-lg text-white">{pick(bundle.headline)}</h2>
              {bundle.rhythm ? (
                <p className="mt-6 text-body-lg text-ink-200">{pick(bundle.rhythm)}</p>
              ) : null}
              {problems && problems.length > 0 ? (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="text-caption uppercase tracking-wide text-ink-500">
                    {isZh ? '它在替你处理这些问题' : 'Problems it quietly handles'}
                  </div>
                  <ul className="mt-4 space-y-2 text-body text-ink-200">
                    {problems.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brand-halo">·</span>
                        <span>{pick(p)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div>
              <Reveal delay={120}>
                <div className="flex items-center gap-2 text-caption uppercase tracking-wide text-ink-500">
                  <Package size={14} />
                  {isZh ? '这一套里有什么' : 'What is inside this bundle'}
                </div>
              </Reveal>
              <div className="mt-4 grid gap-3">
                {bundle.items.map((it, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-caption text-ink-300">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-body-lg text-white">{pick(it)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 · Meta (buyer + outcomes + pilot) */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">02 · {isZh ? '落地的前提与预期' : 'Who, what, how long'}</span>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="card-vision">
              <div className="text-caption uppercase tracking-wide text-ink-500">
                {isZh ? '适合的买家' : 'For'}
              </div>
              <p className="mt-4 text-body-lg text-white">{pick(buyer)}</p>
            </div>

            <div className="card-vision">
              <div className="text-caption uppercase tracking-wide text-ink-500">
                {isZh ? '可以期待的结果' : 'What you can expect'}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {kpis.slice(0, 4).map((k, i) => (
                  <div key={i}>
                    <div className="font-display text-display-sm text-white">{k.value}</div>
                    <div className="mt-1 text-caption text-ink-400">{pick(k.label)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-vision">
              <div className="text-caption uppercase tracking-wide text-ink-500">
                {isZh ? '试点周期与规模' : 'Pilot timing & scale'}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <div className="font-display text-display-md text-white">{pilot.weeks}</div>
                <div className="text-body text-ink-300">{isZh ? '周' : 'weeks'}</div>
              </div>
              <p className="mt-3 text-body text-ink-300">{pick(pilot.scale)}</p>
              <p className="mt-4 text-caption text-ink-500">
                {isZh ? '整机来自 ' : 'Ships on '}
                <span className="text-ink-200">{pick(sku)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03 · CTA */}
      <section className="py-section-lg">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-10 md:p-16">
            <GradientMesh variant="cta" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">03 · {isZh ? '让我们陪你落地' : 'Let us walk you in'}</span>
                <h3 className="mt-3 text-display-lg text-white">
                  {isZh ? '先从一个楼层, 一间病房, 或一个家开始。' : 'Start from one floor, one ward, or one home.'}
                </h3>
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
