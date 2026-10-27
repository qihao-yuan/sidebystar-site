'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { skus } from '@/content/products';
import { getFamilyMember } from '@/content/family';
import { getSolution } from '@/content/solutions';
import { Reveal } from '@/components/motion/Reveal';
import Image from 'next/image';
import { ArrowRight, Check, Layers } from 'lucide-react';

const heroImage = {
  homeBox: '/product/home-box/hero-v4.jpg',
  communityKit: '/product/community-kit/hero-v4.jpg',
  enterpriseStack: '/product/enterprise-stack/hero-v5.jpg',
} as const;

export function SkuShowcase() {
  const t = useTranslations('products');
  const ti = useTranslations('solutions.items');
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

  return (
    <section className="py-section">
      <div className="container-page space-y-8">
        {skus.map((sku, idx) => {
          const familyMembers = sku.family
            .map((r) => getFamilyMember(r))
            .filter((f): f is NonNullable<ReturnType<typeof getFamilyMember>> => Boolean(f));
          const recommended = sku.recommendedFor
            .map((s) => getSolution(s))
            .filter((s): s is NonNullable<ReturnType<typeof getSolution>> => Boolean(s));
          return (
            <Reveal key={sku.slug} delay={idx * 80}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111418] p-8 md:p-12 lg:p-14">
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
                          {isZh ? '系统模块' : 'System modules'}
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
                          {isZh ? '适用场景' : 'Applications'}
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
                    </div>
                  </div>

                  <div className="relative">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#d8d1c5]">
                      <Image
                        src={heroImage[sku.i18nKey]}
                        alt={t(`${sku.i18nKey}.name`)}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                        priority={idx === 0}
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                    </div>
                    <div className="absolute left-4 top-4 border border-black/10 bg-[#f3efe8]/90 px-3 py-1 font-mono text-caption text-[#34312d] backdrop-blur">
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
