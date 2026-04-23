'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { MediaPlaceholder } from '@/components/media/MediaPlaceholder';

export function HomeEra() {
  const t = useTranslations('home.era');

  const cols = [
    { from: t('col1From'), to: t('col1To'), body: t('col1Body') },
    { from: t('col2From'), to: t('col2To'), body: t('col2Body') },
    { from: t('col3From'), to: t('col3To'), body: t('col3Body') },
  ];

  return (
    <section id="era" className="relative py-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} align="left" />

        <div className="mt-16 grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-center">
          <Reveal>
            <MediaPlaceholder
              alt="Cloud to edge illustration"
              ratio="4/3"
              label="HOME/ERA · 4:3 · 1600x1200"
            />
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] md:grid-cols-3">
            {cols.map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex h-full flex-col gap-6 bg-surface-void/60 p-6 md:p-8">
                  <div className="flex items-center gap-2 font-mono text-caption text-ink-500">
                    <span className="line-through decoration-white/20 decoration-1">{c.from}</span>
                    <ArrowRight size={12} className="text-brand-halo" />
                    <span className="text-brand-halo">{c.to}</span>
                  </div>
                  <p className="text-body-lg text-ink-100">{c.body}</p>
                  <div aria-hidden className="mt-auto h-px w-10 bg-gradient-to-r from-brand-halo/60 to-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
