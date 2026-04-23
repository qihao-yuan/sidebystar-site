'use client';

import { useTranslations } from 'next-intl';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { GradientMesh } from '@/components/motion/GradientMesh';

export function HomeVision() {
  const t = useTranslations('home.vision');

  return (
    <section className="relative overflow-hidden py-section-lg">
      <GradientMesh variant="soft" />
      <div className="container-page relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <Reveal>
            <span className="eyebrow">{t('eyebrow')}</span>
          </Reveal>
          <h2 className="text-display-xl text-balance text-white">
            <TextReveal stagger={50}>{t('title')}</TextReveal>
          </h2>
          <Reveal delay={200}>
            <p className="max-w-2xl text-body-lg text-ink-200">{t('body')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
