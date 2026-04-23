'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Eye, Brain, GitBranch, Radio, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { MediaPlaceholder } from '@/components/media/MediaPlaceholder';

export function HomeIntelligence() {
  const t = useTranslations('home.intelligence');

  const cards = [
    { icon: Eye, title: t('card1Title'), body: t('card1Body') },
    { icon: Brain, title: t('card2Title'), body: t('card2Body') },
    { icon: GitBranch, title: t('card3Title'), body: t('card3Body') },
    { icon: Radio, title: t('card4Title'), body: t('card4Body') },
  ];

  return (
    <section id="intelligence" className="relative py-section-lg">
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-[6fr_6fr] lg:items-center">
          <div>
            <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} align="left" />

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {cards.map((c, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="group relative flex h-full flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-500 ease-apple-out hover:border-brand-halo/30 hover:bg-white/[0.04]">
                    <c.icon size={20} className="text-brand-halo transition-transform duration-500 group-hover:-translate-y-0.5" />
                    <h3 className="text-display-sm text-white">{c.title}</h3>
                    <p className="text-body text-ink-300">{c.body}</p>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-halo/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12">
              <Link href={'/intelligence' as any} className="btn-ghost">
                {t('cta')} <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <Reveal delay={120}>
            <MediaPlaceholder
              alt="Intelligence preview"
              ratio="4/3"
              label="HOME/INTELLIGENCE · 4:3 · 1600x1200"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
