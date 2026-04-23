'use client';

import { useTranslations } from 'next-intl';
import { TextReveal } from '@/components/motion/TextReveal';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { Reveal } from '@/components/motion/Reveal';

export function ProductHero() {
  const t = useTranslations('products');

  return (
    <section className="relative overflow-hidden pb-20 pt-32">
      <GradientMesh variant="hero" />
      <div className="container-page relative text-center">
        <Reveal>
          <span className="eyebrow">Products</span>
        </Reveal>
        <h1 className="mt-6 text-display-2xl text-balance text-white">
          <TextReveal stagger={60}>{t('title')}</TextReveal>
        </h1>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>
        </Reveal>
      </div>
    </section>
  );
}
