import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { cases } from '@/content/cases';
import { Reveal } from '@/components/motion/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { ArrowUpRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cases' });
  return buildMetadata({ locale, path: '/cases', title: t('title'), description: t('subtitle') });
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('cases');
  const isZh = locale === 'zh-CN';

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative max-w-4xl">
          <Reveal><span className="eyebrow">Cases</span></Reveal>
          <h1 className="mt-6 text-display-2xl text-balance text-white">
            <TextReveal stagger={70}>{isZh ? '真实部署, 真实数据。' : 'Real deployments, real data.'}</TextReveal>
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-section-lg">
        <div className="container-page space-y-6">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                href={`/cases/${c.slug}` as any}
                className="card-vision group flex flex-col gap-6 md:flex-row md:items-center"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-caption">
                    <span className="chip">{c.scenario}</span>
                    <span className="chip">{c.sku}</span>
                    <span className="font-mono text-ink-500">{c.timeline}</span>
                  </div>
                  <h3 className="mt-5 text-display-md text-white">{isZh ? c.title.zh : c.title.en}</h3>
                  <p className="mt-2 text-body text-ink-300">{isZh ? c.scale.zh : c.scale.en}</p>
                </div>
                <div className="flex gap-4">
                  {c.metrics.slice(0, 3).map((m, j) => (
                    <div key={j} className="text-right">
                      <div className="font-display text-display-sm text-white">{m.value}</div>
                      <div className="text-caption text-ink-400">{isZh ? m.label.zh : m.label.en}</div>
                    </div>
                  ))}
                </div>
                <ArrowUpRight size={24} className="text-ink-400 transition-colors group-hover:text-white" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
