'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Shield, HomeIcon, Check } from 'lucide-react';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { UnifiedVisualImage } from '@/components/media/UnifiedVisualImage';
import { visuals } from '@/content/product-visuals';

export function HomeProductLines() {
  const locale = useLocale();
  const t = useTranslations('home.lines');

  return (
    <section id="lines" className="relative py-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula/40 transition-colors hover:border-brand-halo/40">
              <div className="relative aspect-video overflow-hidden border-b border-white/10">
                <UnifiedVisualImage visual={visuals.presence} locale={locale} sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-10">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-brand-halo" />
                <span className="eyebrow">{t('careEyebrow')}</span>
              </div>
              <h3 className="mt-5 text-display-sm text-white">{t('careTitle')}</h3>
              <p className="mt-4 text-body text-ink-300">{t('careBody')}</p>

              <ul className="mt-6 space-y-3">
                {[t('carePoint1'), t('carePoint2'), t('carePoint3')].map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-body text-ink-200">
                    <Check size={16} className="mt-1 shrink-0 text-brand-halo" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link href="/#night-care" className="btn-primary">
                  {t('careCta')} <ArrowRight size={16} />
                </Link>
              </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula/40 transition-colors hover:border-brand-halo/40">
              <div className="relative aspect-video overflow-hidden border-b border-white/10">
                <UnifiedVisualImage visual={visuals.water} locale={locale} sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-10">
              <div className="flex items-center gap-3">
                <HomeIcon size={20} className="text-brand-halo" />
                <span className="eyebrow">{t('homeEyebrow')}</span>
              </div>
              <h3 className="mt-5 text-display-sm text-white">{t('homeTitle')}</h3>
              <p className="mt-4 text-body text-ink-300">{t('homeBody')}</p>

              <ul className="mt-6 space-y-3">
                {[t('homePoint1'), t('homePoint2'), t('homePoint3')].map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-body text-ink-200">
                    <Check size={16} className="mt-1 shrink-0 text-brand-halo" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link href="/solutions/smart-home" className="btn-ghost">
                  {t('homeCta')} <ArrowRight size={16} />
                </Link>
              </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
