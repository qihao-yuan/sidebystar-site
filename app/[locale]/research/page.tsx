import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Eye, Network, Cpu, Lock, Share2, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'research.manifesto' });
  return buildMetadata({ locale, path: '/research', title: t('title'), description: t('p1') });
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const m = await getTranslations('research.manifesto');
  const f = await getTranslations('research.frontiers');
  const r = await getTranslations('research.roadmap');

  const frontiers = [
    { icon: Eye, titleKey: 'jepa', link: 'docs/PRODUCT_OVERVIEW.md' },
    { icon: Network, titleKey: 'causal', link: 'docs/CAUSAL_MEMORY.md' },
    { icon: Cpu, titleKey: 'endSideLlm', link: 'docs/ARCHITECTURE.md' },
    { icon: Lock, titleKey: 'zkAudit', link: 'docs/BUSINESS_PLAN.md' },
    { icon: Share2, titleKey: 'fedBundle', link: 'docs/FEDERATION.md' },
  ] as const;

  const roadmap = ['y2026', 'y2027', 'y2028', 'y2029', 'y2030'] as const;

  return (
    <>
      {/* Manifesto Hero */}
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="hero" />
        <div className="container-page relative">
          <Reveal><span className="eyebrow">{m('eyebrow')}</span></Reveal>
          <h1 className="mt-6 max-w-5xl text-display-2xl text-balance text-white">
            <TextReveal stagger={70}>{m('title')}</TextReveal>
          </h1>
        </div>
      </section>

      {/* Manifesto Body */}
      <section className="py-section">
        <div className="container-page max-w-3xl space-y-10 text-body-lg text-ink-200">
          <Reveal><p>{m('p1')}</p></Reveal>
          <Reveal delay={80}><p>{m('p2')}</p></Reveal>
          <Reveal delay={160}><p className="text-white">{m('p3')}</p></Reveal>
        </div>
      </section>

      {/* Three Predictions */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">{m('predictions')}</span>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {(['pred1', 'pred2', 'pred3'] as const).map((k, i) => (
              <Reveal key={k} delay={i * 80}>
                <div className="card-vision h-full">
                  <span className="font-mono text-caption text-brand-halo">0{i + 1}</span>
                  <p className="mt-4 text-body-lg text-white">{m(k)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Frontiers */}
      <section className="py-section-lg">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Frontiers</span>
            <h2 className="mt-4 text-display-xl text-white">{f('title')}</h2>
            <p className="mt-3 max-w-2xl text-body-lg text-ink-300">{f('subtitle')}</p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {frontiers.map((fr, i) => (
              <Reveal key={fr.titleKey} delay={i * 60}>
                <div className="card-vision h-full">
                  <fr.icon size={28} className="text-brand-halo" />
                  <h3 className="mt-5 text-display-sm text-white">{f(`${fr.titleKey}.title`)}</h3>
                  <p className="mt-3 text-body text-ink-300">{f(`${fr.titleKey}.body`)}</p>
                  <p className="mt-6 font-mono text-caption text-ink-500">↘ {fr.link}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-section-lg">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Roadmap</span>
            <h2 className="mt-4 text-display-xl text-white">{r('title')}</h2>
            <p className="mt-3 max-w-2xl text-body-lg text-ink-300">{r('subtitle')}</p>
          </Reveal>

          <div className="mt-14 relative">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-brand-halo via-brand-stardust to-transparent md:left-1/2" />
            {roadmap.map((y, i) => (
              <Reveal key={y} delay={i * 80}>
                <div className={`relative mb-12 flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`relative w-full pl-16 md:w-5/12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span
                      className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-halo shadow-glow-edge md:left-1/2 md:top-1"
                      style={i % 2 === 0 ? { left: '100%' } : { left: 0 }}
                    />
                    <div className="card-vision">
                      <div className="font-display text-display-md text-white">{y.slice(1)}</div>
                      <p className="mt-3 text-body text-ink-300">{r(y)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section">
        <div className="container-page text-center">
          <MagneticButton href="/contact" variant="primary">
            Download Ambient Intelligence Report 2026 <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
