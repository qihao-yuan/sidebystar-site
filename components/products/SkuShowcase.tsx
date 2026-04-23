'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { skus } from '@/content/products';
import { getFamilyMember } from '@/content/family';
import { getSolution } from '@/content/solutions';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowRight, Check, Box, Network, Server, Layers } from 'lucide-react';
import { cn } from '@/lib/cn';

const icons = { homeBox: Box, communityKit: Network, enterpriseStack: Server };

export function SkuShowcase() {
  const t = useTranslations('products');
  const ti = useTranslations('solutions.items');
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

  return (
    <section className="py-section">
      <div className="container-page space-y-8">
        {skus.map((sku, idx) => {
          const Icon = icons[sku.i18nKey];
          const familyMembers = sku.family
            .map((r) => getFamilyMember(r))
            .filter((f): f is NonNullable<ReturnType<typeof getFamilyMember>> => Boolean(f));
          const recommended = sku.recommendedFor
            .map((s) => getSolution(s))
            .filter((s): s is NonNullable<ReturnType<typeof getSolution>> => Boolean(s));
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
                        <li key={k} className="flex items-start gap-3 text-body text-ink-200">
                          <Check size={16} className="mt-1 shrink-0 text-brand-halo" />
                          {t(`${sku.i18nKey}.${k}`)}
                        </li>
                      ))}
                    </ul>

                    {/* Family cross-link */}
                    {familyMembers.length > 0 ? (
                      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                        <div className="flex items-center gap-2 text-caption uppercase tracking-wide text-ink-500">
                          <Layers size={14} />
                          {isZh ? '它包含了这几个角色' : 'The roles that ship inside'}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {familyMembers.map((f) => (
                            <Link
                              key={f.role}
                              href={`/system#${f.role}`}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-caption text-ink-200 transition-colors hover:border-brand-halo/40 hover:text-white"
                            >
                              <f.icon size={14} className="text-brand-halo" />
                              {isZh ? f.nameZh : f.nameEn}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Scenario cross-link */}
                    {recommended.length > 0 ? (
                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                        <div className="text-caption uppercase tracking-wide text-ink-500">
                          {isZh ? '最常被用于' : 'Most often used in'}
                        </div>
                        <ul className="mt-3 space-y-2">
                          {recommended.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/solutions/${s.slug}`}
                                className="inline-flex items-center gap-2 text-body text-ink-100 transition-colors hover:text-brand-halo"
                              >
                                <s.icon size={14} className="text-brand-halo" />
                                {ti(`${s.titleKey}.title`)}
                                <ArrowRight size={12} />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="mt-10 flex flex-wrap gap-3">
                      <Link href="/contact" className="btn-primary">
                        {isZh ? '预约演示' : 'Book Demo'} <ArrowRight size={15} />
                      </Link>
                      <a href="#compare" className="btn-ghost">
                        {isZh ? '对比三款' : 'Compare'}
                      </a>
                      <Link href="/developers/hardware" className="btn-link">
                        {isZh ? '查看完整规格' : 'See full spec sheet'} <ArrowRight size={12} />
                      </Link>
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
