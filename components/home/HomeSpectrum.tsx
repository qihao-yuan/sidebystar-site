'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { MediaPlaceholder } from '@/components/media/MediaPlaceholder';

export function HomeSpectrum() {
  const t = useTranslations('home.spectrum');

  const cards = [
    { key: 'bedside', n: '01', label: 'HOME/SPECTRUM/BEDSIDE · 4:3 · 1600x1200' },
    { key: 'desk', n: '02', label: 'HOME/SPECTRUM/DESK · 4:3 · 1600x1200' },
    { key: 'home', n: '03', label: 'HOME/SPECTRUM/HOME · 4:3 · 1600x1200' },
    { key: 'community', n: '04', label: 'HOME/SPECTRUM/COMMUNITY · 4:3 · 1600x1200' },
  ] as const;

  return (
    <section id="spectrum" className="relative py-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 70}>
              <div className="group flex h-full flex-col gap-5">
                <MediaPlaceholder
                  alt={t(`${c.key}Title`)}
                  ratio="4/3"
                  rounded="xl"
                  label={c.label}
                  className="transition-transform duration-700 ease-apple-out group-hover:-translate-y-1"
                />
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-caption text-ink-500">{c.n}</span>
                  <h3 className="text-display-sm text-white">{t(`${c.key}Title`)}</h3>
                </div>
                <p className="text-body text-ink-300">{t(`${c.key}Body`)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/solutions" className="btn-ghost">
            {t('cta')} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
