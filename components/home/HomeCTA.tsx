'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from '@/components/motion/TextReveal';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Reveal } from '@/components/motion/Reveal';

export function HomeCTA() {
  const t = useTranslations('home.cta');

  return (
    <section className="relative py-section-lg">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-10 md:p-20">
          <GradientMesh variant="cta" />
          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <Reveal>
              <span className="eyebrow">{t('eyebrow')}</span>
            </Reveal>
            <h2 className="text-display-xl text-balance text-white">
              <TextReveal stagger={60}>{t('title')}</TextReveal>
            </h2>
            <Reveal delay={200}>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <MagneticButton href="/contact" variant="primary">
                  {t('primary')} <ArrowRight size={16} />
                </MagneticButton>
                <MagneticButton href="/pilot" variant="ghost">
                  {t('secondary')}
                </MagneticButton>
                <a href="#" className="btn-link">
                  {t('tertiary')} <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
