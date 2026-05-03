'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Shield, HomeIcon, Check } from 'lucide-react';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';

export function HomeProductLines() {
  const t = useTranslations('home.lines');

  return (
    <section id="lines" className="relative py-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-surface-nebula/40 p-8 transition-colors hover:border-brand-halo/40 md:p-10">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-brand-halo" />
                <span className="eyebrow">{t('careEyebrow')}</span>
              </div>
              <h3 className="mt-5 text-display-sm text-white">{t('careTitle')}</h3>
              <p className="mt-2 text-body text-ink-200">{t('careTagline')}</p>
              <p className="mt-5 text-body text-ink-300">{t('careBody')}</p>

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
          </Reveal>

          <Reveal delay={120}>
            <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-surface-nebula/40 p-8 transition-colors hover:border-brand-halo/40 md:p-10">
              <div className="flex items-center gap-3">
                <HomeIcon size={20} className="text-brand-halo" />
                <span className="eyebrow">{t('homeEyebrow')}</span>
              </div>
              <h3 className="mt-5 text-display-sm text-white">{t('homeTitle')}</h3>
              <p className="mt-2 text-body text-ink-200">{t('homeTagline')}</p>
              <p className="mt-5 text-body text-ink-300">{t('homeBody')}</p>

              <ul className="mt-6 space-y-3">
                {[t('homePoint1'), t('homePoint2'), t('homePoint3')].map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-body text-ink-200">
                    <Check size={16} className="mt-1 shrink-0 text-brand-halo" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link href="/intelligence" className="btn-ghost">
                  {t('homeCta')} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <p className="mt-12 whitespace-pre-line text-center text-caption text-ink-400">
            {t('footnote')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
