'use client';

import { useTranslations, useLocale } from 'next-intl';
import { TextReveal } from '@/components/motion/TextReveal';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { Reveal } from '@/components/motion/Reveal';

export function ProductHero() {
  const t = useTranslations('products');
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

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
        <Reveal delay={320}>
          <p className="mx-auto mt-6 max-w-2xl rounded-pill border border-white/10 bg-white/[0.03] px-5 py-2 text-caption text-ink-400">
            {isZh
              ? '以下为目标规格 (Target Spec), 部分硬件仍在选型与样机阶段, 实际出货以最终 BOM 为准。'
              : 'The following is target spec. Some hardware is still in selection or prototype stage; final BOM is what ships.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
