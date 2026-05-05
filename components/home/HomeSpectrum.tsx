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
    { key: 'bedside', n: '01', src: '/home/bedside.webp' },
    { key: 'desk', n: '02', src: '/home/desk.webp' },
    { key: 'home', n: '03', src: '/home/home.webp' },
    { key: 'community', n: '04', src: '/home/community.webp' },
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
                  src={c.src}
                  alt={t(`${c.key}Title`)}
                  ratio="4/3"
                  rounded="xl"
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
