'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Eye, Zap, Brain, Network, Lock, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';

export function HomePlatform() {
  const t = useTranslations('home.platform');
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

  const items = [
    { icon: Eye, title: t('sensingTitle'), body: t('sensingBody') },
    { icon: Zap, title: t('edgeTitle'), body: t('edgeBody') },
    { icon: Brain, title: t('memoryTitle'), body: t('memoryBody') },
    { icon: Network, title: t('protocolsTitle'), body: t('protocolsBody') },
    { icon: Lock, title: t('privacyTitle'), body: t('privacyBody') },
  ];

  const principles = [
    { kZh: '本地推理', kEn: 'On-device inference', vZh: '默认配置下不外发', vEn: 'No outbound by default' },
    { kZh: '断网可用', kEn: 'Offline-capable', vZh: '关键能力不依赖云', vEn: 'Critical paths free of cloud' },
    { kZh: '可审计', kEn: 'Auditable', vZh: '每一次判断都留痕', vEn: 'Every decision, traced' },
  ];

  return (
    <section className="relative py-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-16 grid grid-cols-1 gap-6 border-y border-white/5 py-10 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.kEn} className="text-center">
              <div className="font-display text-display-sm text-white">{isZh ? p.kZh : p.kEn}</div>
              <div className="mt-2 text-caption text-ink-400">{isZh ? p.vZh : p.vEn}</div>
            </div>
          ))}
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
