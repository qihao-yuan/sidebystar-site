'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/sections/SectionHeader';

export function HomeTrust() {
  const t = useTranslations('home.trust');

  return (
    <section className="relative py-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('body')} />
      </div>
    </section>
  );
}
