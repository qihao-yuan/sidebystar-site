'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function HomeHero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative flex min-h-[88vh] w-full items-center overflow-hidden border-b border-white/[0.07]">
      <GradientMesh variant="hero" />
      <div className="pointer-events-none absolute inset-0 grid-faint opacity-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <Image
          src="/intelligence/hero-v2.jpg"
          alt=""
          fill
          priority
          sizes="58vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-void via-surface-void/40 to-surface-void/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-void/70 via-transparent to-surface-void/20" />
      </div>

      <div className="container-page relative z-10 py-32 md:py-40">
        <div className="max-w-4xl">
          <span className="eyebrow">{t('eyebrow')}</span>

          <h1 className="mt-8 whitespace-pre-line text-display-xl text-balance text-white">
            {t('title')}
          </h1>

          {t('subtitle') ? (
            <p className="mt-7 max-w-2xl text-body-lg text-ink-200">{t('subtitle')}</p>
          ) : null}
          <p className="mt-6 max-w-2xl text-caption text-ink-400">{t('footnote')}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton href="/contact" variant="primary">
              {t('ctaPrimary')} <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#lines" variant="ghost">
              {t('ctaSecondary')}
            </MagneticButton>
          </div>

          <a
            href="#lines"
            className="mt-14 inline-flex items-center gap-2 text-caption text-ink-400 transition-colors hover:text-white"
          >
            {t('scrollHint')}
            <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
