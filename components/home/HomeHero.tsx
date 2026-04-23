'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function HomeHero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <GradientMesh variant="hero" />
      <div className="pointer-events-none absolute inset-0 grid-faint opacity-30" />

      {/* animated topology nodes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { t: '18%', l: '12%', d: '0s' },
          { t: '28%', l: '78%', d: '1.2s' },
          { t: '62%', l: '20%', d: '2.4s' },
          { t: '72%', l: '68%', d: '3.6s' },
          { t: '40%', l: '92%', d: '4.8s' },
          { t: '82%', l: '42%', d: '1.8s' },
        ].map((n, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-brand-halo shadow-glow-edge animate-breathe"
            style={{ top: n.t, left: n.l, animationDelay: n.d }}
          />
        ))}
      </div>

      <div className="container-page relative z-10 flex flex-col items-center gap-8 py-32 text-center md:py-40">
        <span className="eyebrow flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-brand-halo shadow-glow-edge" />
          {t('eyebrow')}
        </span>

        <h1 className="text-display-2xl text-balance text-white">
          <TextReveal stagger={80}>{t('title')}</TextReveal>
        </h1>

        <p className="max-w-2xl text-body-lg text-ink-200">{t('subtitle')}</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton href="/contact" variant="primary">
            {t('ctaPrimary')} <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton href="/research" variant="ghost">
            {t('ctaSecondary')}
          </MagneticButton>
        </div>

        <a
          href="#era"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-caption text-ink-400 transition-colors hover:text-white"
        >
          <span className="flex flex-col items-center gap-2">
            {t('scrollHint')}
            <ArrowDown size={14} className="animate-bounce" />
          </span>
        </a>
      </div>
    </section>
  );
}
