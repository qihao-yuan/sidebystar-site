'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { customerImages } from '@/content/customer-experience';

// Product imagery stays visible on phones; the CTA leads to a recording, not a live assistant.
export function HomeHero() {
  const t = useTranslations('home.hero');
  const isZh = useLocale() === 'zh-CN';
  return (
    <section className="relative overflow-hidden border-b border-white/[0.07] pb-16 pt-28 md:pb-24 lg:pt-36">
      <div className="container-page grid gap-8 lg:grid-cols-[6fr_7fr] lg:items-center lg:gap-12">
        <div className="order-2 lg:order-1">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h1 className="mt-5 whitespace-pre-line text-display-xl text-white">{t('title')}</h1>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-200">{t('subtitle')}</p>
          <p className="mt-5 text-caption text-ink-400">{t('footnote')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="/experience#software" variant="primary">{t('ctaPrimary')} <ArrowRight size={16} /></MagneticButton>
            <MagneticButton href="/products" variant="ghost">{t('ctaSecondary')}</MagneticButton>
          </div>
          <a href="#lines" className="mt-8 inline-flex items-center gap-2 text-caption text-ink-400 transition-colors hover:text-white">{t('scrollHint')} <ArrowDown size={14}/></a>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/10 bg-[#eaf0f4]">
            <Image src={customerImages.family} alt={isZh?'家庭计算主机和三种不同用途的无线节点设计效果':'Design visualization of a household host and three distinct wireless sensing devices'} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-contain"/>
          </div>
          <p className="mt-3 text-caption text-ink-400">{isZh?'产品设计效果；无线数据与供电方式按设备分别设计。':'Product design visualizations. Wireless data and power are specified separately for each device.'}</p>
        </div>
      </div>
    </section>
  );
}
