'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, Lock, Globe, GitBranch, Award, FileCheck } from 'lucide-react';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';

export function HomeTrust() {
  const t = useTranslations('home.trust');

  const badges = [
    { icon: ShieldCheck, label: t('badge1') },
    { icon: Lock, label: t('badge2') },
    { icon: Globe, label: t('badge3') },
    { icon: Award, label: t('badge4') },
    { icon: GitBranch, label: t('badge5') },
    { icon: FileCheck, label: t('badge6') },
  ];

  return (
    <section className="relative py-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('body')} />

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {badges.map((b, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-ink-300">
                <b.icon size={14} className="text-brand-halo/80" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-200">
                  {b.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
