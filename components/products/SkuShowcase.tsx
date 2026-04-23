'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { skus } from '@/content/products';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowRight, Check, Box, Network, Server } from 'lucide-react';
import { cn } from '@/lib/cn';

const icons = { homeBox: Box, communityKit: Network, enterpriseStack: Server };
const colors = {
  homeBox: 'from-brand-halo/20 to-transparent',
  communityKit: 'from-brand-aurora/25 to-transparent',
  enterpriseStack: 'from-brand-stardust/25 to-transparent',
};

export function SkuShowcase() {
  const t = useTranslations('products');

  return (
    <section className="py-section">
      <div className="container-page space-y-8">
        {skus.map((sku, idx) => {
          const Icon = icons[sku.i18nKey];
          const grad = colors[sku.i18nKey];
          return (
            <Reveal key={sku.slug} delay={idx * 80}>
              <div className={cn('relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-10 md:p-16')}>
                <div
                  className={cn('pointer-events-none absolute inset-0 opacity-70 bg-gradient-to-br')}
                  style={{
                    background:
                      idx === 0
                        ? 'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(125,211,252,0.22), transparent 70%)'
                        : idx === 1
                        ? 'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(75,107,251,0.22), transparent 70%)'
                        : 'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(177,156,244,0.22), transparent 70%)',
                  }}
                />
                <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div>
                    <span className="eyebrow">{t(`${sku.i18nKey}.tag`)}</span>
                    <h3 className="mt-4 text-display-xl text-white">{t(`${sku.i18nKey}.name`)}</h3>
                    <p className="mt-3 text-caption text-brand-halo">{t(`${sku.i18nKey}.price`)}</p>
                    <p className="mt-5 max-w-lg text-body-lg text-ink-200">{t(`${sku.i18nKey}.desc`)}</p>

                    <ul className="mt-8 space-y-3">
                      {(['bullet1', 'bullet2', 'bullet3'] as const).map((k) => (
                        <li key={k} className="flex items-center gap-3 text-body text-ink-200">
                          <Check size={16} className="text-brand-halo" />
                          {t(`${sku.i18nKey}.${k}`)}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 flex gap-3">
                      <Link href="/contact" className="btn-primary">
                        Book Demo <ArrowRight size={15} />
                      </Link>
                      <a href="#compare" className="btn-ghost">Compare</a>
                    </div>
                  </div>

                  <div className="relative flex aspect-square items-center justify-center">
                    <div className="absolute inset-10 rounded-full border border-white/5" />
                    <div className="absolute inset-20 rounded-full border border-white/5" />
                    <div className="absolute inset-32 rounded-full border border-white/10" />
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-3xl border border-white/15 bg-surface-elevated shadow-glow-aurora">
                      <Icon size={88} className="text-white/90" strokeWidth={1} />
                    </div>
                    <div className="absolute left-4 top-4 font-mono text-caption text-ink-500">
                      {String(idx + 1).padStart(2, '0')} / 03
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
