'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Eye, Zap, Brain, Network, Lock, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { NumberTicker } from '@/components/motion/NumberTicker';

export function HomePlatform() {
  const t = useTranslations('home.platform');

  const items = [
    { icon: Eye, title: t('sensingTitle'), body: t('sensingBody') },
    { icon: Zap, title: t('edgeTitle'), body: t('edgeBody') },
    { icon: Brain, title: t('memoryTitle'), body: t('memoryBody') },
    { icon: Network, title: t('protocolsTitle'), body: t('protocolsBody') },
    { icon: Lock, title: t('privacyTitle'), body: t('privacyBody') },
  ];

  return (
    <section className="relative py-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-16 grid grid-cols-3 gap-8 border-y border-white/5 py-10 md:grid-cols-5">
          <div className="col-span-1 text-center">
            <div className="font-display text-display-md text-white">
              <NumberTicker value={225} />
            </div>
            <div className="mt-1 text-caption text-ink-400">Modules</div>
          </div>
          <div className="col-span-1 text-center">
            <div className="font-display text-display-md text-white">
              <NumberTicker value={112} />
            </div>
            <div className="mt-1 text-caption text-ink-400">REST</div>
          </div>
          <div className="col-span-1 text-center">
            <div className="font-display text-display-md text-white">
              <NumberTicker value={67} />
            </div>
            <div className="mt-1 text-caption text-ink-400">v1 APIs</div>
          </div>
          <div className="col-span-1 text-center">
            <div className="font-display text-display-md text-white">
              <NumberTicker value={50} suffix="ms" />
            </div>
            <div className="mt-1 text-caption text-ink-400">Event trigger</div>
          </div>
          <div className="col-span-3 text-center md:col-span-1">
            <div className="font-display text-display-md text-white">
              <NumberTicker value={100} suffix="%" />
            </div>
            <div className="mt-1 text-caption text-ink-400">Local-First</div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card-vision h-full">
                <it.icon size={24} className="text-brand-halo" />
                <h4 className="mt-5 text-display-sm text-white">{it.title}</h4>
                <p className="mt-2 text-caption text-ink-300">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/platform" className="btn-ghost">
            {t('exploreCta')} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
