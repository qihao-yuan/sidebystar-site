import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { solutionsByGroup } from '@/content/solutions';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { UnifiedVisualImage } from '@/components/media/UnifiedVisualImage';
import { visuals } from '@/content/product-visuals';
import { getSeriesName } from '@/content/product-names';
import { ArrowUpRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions' });
  return buildMetadata({ locale, path: '/solutions', title: t('title'), description: t('subtitle') });
}

const DELIVERY_GROUPS = ['health', 'home'] as const;

const GROUP_VISUALS = {
  health: visuals.presence,
  home: visuals.water,
} as const;

export default async function SolutionsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('solutions');
  const items = await getTranslations('solutions.items');
  const groups = await getTranslations('solutions.groups');

  return (
    <div className="pt-32 pb-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow="Solutions" title={t('title')} subtitle={t('subtitle')} align="left" />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {[
            [locale === 'zh-CN' ? '空间配置' : 'Space configurations', `${getSeriesName('care', locale)} · ${locale === 'zh-CN' ? '家庭与照护' : 'Home and care'}`],
            [locale === 'zh-CN' ? '部署方式' : 'Deployment', locale === 'zh-CN' ? '现场部署 · 本地运行' : 'On-site · Local runtime'],
            [locale === 'zh-CN' ? '交付起点' : 'Starting scope', locale === 'zh-CN' ? '单户 · 单楼层 · 单病区' : 'Home · Floor · Ward'],
          ].map(([label, value]) => (
            <div key={label} className="bg-surface-void px-6 py-5">
              <div className="text-caption uppercase tracking-wide text-ink-500">{label}</div>
              <div className="mt-2 text-body text-white">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-section flex flex-col gap-section">
          {DELIVERY_GROUPS.map((g, gi) => {
            const list = solutionsByGroup[g];

            return (
              <div key={g}>
                <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:items-end">
                  <Reveal>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/[0.08]">
                      <UnifiedVisualImage visual={GROUP_VISUALS[g]} locale={locale} sizes="(min-width: 1024px) 58vw, 100vw" />
                    </div>
                  </Reveal>
                  <div className="flex flex-col gap-4 lg:pb-2">
                    <Reveal>
                      <span className="eyebrow">{String(gi + 1).padStart(2, '0')} · Product Line</span>
                    </Reveal>
                    <Reveal delay={60}>
                      <h2 className="text-display-lg text-white">{groups(`${g}.title`)}</h2>
                    </Reveal>
                    <Reveal delay={120}>
                      <p className="max-w-xl text-body-lg text-ink-300">{groups(`${g}.body`)}</p>
                    </Reveal>
                  </div>
                </div>

                <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
                  {list.map((s, i) => {
                    const buyer = s.buyer ? (locale === 'zh-CN' ? s.buyer.zh : s.buyer.en) : '';
                    const scale = s.pilot ? (locale === 'zh-CN' ? s.pilot.scale.zh : s.pilot.scale.en) : '';
                    const sku = s.sku ? (locale === 'zh-CN' ? s.sku.zh : s.sku.en) : '';

                    return (
                      <Reveal key={s.slug} delay={i * 50}>
                        <Link
                          href={`/solutions/${s.slug}` as any}
                          className="group grid gap-5 py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-[1.4fr_2fr_1fr_auto] md:items-center md:px-5"
                        >
                          <div>
                            <div className="font-mono text-caption text-ink-500">
                              {String(i + 1).padStart(2, '0')} / {sku}
                            </div>
                            <h3 className="mt-2 text-display-sm text-white">{items(`${s.titleKey}.title`)}</h3>
                          </div>
                          <div>
                            <div className="text-caption text-ink-500">{locale === 'zh-CN' ? '适用对象' : 'For'}</div>
                            <p className="mt-1 text-body text-ink-300">{buyer}</p>
                          </div>
                          <div>
                            <div className="text-caption text-ink-500">{locale === 'zh-CN' ? '试点范围' : 'Pilot scope'}</div>
                            <p className="mt-1 text-body text-ink-300">{scale}</p>
                            <p className="mt-1 text-caption text-ink-500">{s.pilot?.weeks} {locale === 'zh-CN' ? '周' : 'weeks'}</p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-caption text-ink-300 transition-colors group-hover:text-white">
                            {locale === 'zh-CN' ? '方案详情' : 'Details'} <ArrowUpRight size={14} />
                          </span>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
