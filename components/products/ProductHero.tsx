'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';

export function ProductHero() {
  const t = useTranslations('products');
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

  return (
    <section className="pb-20 pt-32">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">Products</span>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-6 max-w-4xl text-display-xl text-balance text-white">{t('title')}</h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-8 max-w-3xl border-l border-white/20 pl-4 text-caption text-ink-400">
            {isZh
              ? '页面展示当前产品定义。具体硬件配置、接口范围与交付周期以项目确认文件为准。'
              : 'This page describes the current product definition. Hardware configuration, interfaces and delivery schedule are confirmed per project.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
