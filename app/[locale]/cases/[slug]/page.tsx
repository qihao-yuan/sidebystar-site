import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { cases } from '@/content/cases';
import { Reveal } from '@/components/motion/Reveal';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return cases.flatMap((c) => [
    { locale: 'zh-CN', slug: c.slug },
    { locale: 'en', slug: c.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en'; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) return {};
  const title = locale === 'zh-CN' ? c.title.zh : c.title.en;
  const description = locale === 'zh-CN' ? c.story.zh : c.story.en;
  return buildMetadata({ locale, path: `/cases/${slug}`, title, description });
}

export default async function CaseDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) notFound();
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';

  return (
    <article>
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative">
          <Link href="/cases" className="btn-link mb-8"><ArrowLeft size={14} /> Cases</Link>
          <div className="flex flex-wrap items-center gap-3 text-caption">
            <span className="chip">{c.scenario}</span>
            <span className="chip">{c.sku}</span>
            <span className="font-mono text-ink-500">{c.timeline}</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-display-xl text-balance text-white">
            {isZh ? c.title.zh : c.title.en}
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-ink-300">{isZh ? c.scale.zh : c.scale.en}</p>
        </div>
      </section>

      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-4">
            {c.metrics.map((m, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card-vision">
                  <div className="font-display text-display-md text-white">{m.value}</div>
                  <div className="mt-2 text-caption text-ink-300">{isZh ? m.label.zh : m.label.en}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="container-page max-w-3xl">
          <span className="eyebrow">Story</span>
          <p className="mt-5 text-display-sm text-white">{isZh ? c.story.zh : c.story.en}</p>
        </div>
      </section>

      <section className="py-section-lg">
        <div className="container-page text-center">
          <MagneticButton href="/pilot" variant="primary">
            {isZh ? '申请同款试点' : 'Apply for a similar pilot'} <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </section>
    </article>
  );
}
