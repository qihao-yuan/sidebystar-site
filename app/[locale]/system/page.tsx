import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { HomeCTA } from '@/components/home/HomeCTA';
import { UnifiedVisualImage } from '@/components/media/UnifiedVisualImage';
import { getPackageName } from '@/content/product-names';
import { buildMetadata } from '@/lib/seo';
import { family, type FamilyRole } from '@/content/family';
import { visuals, type VisualAsset } from '@/content/product-visuals';

const FAMILY_VISUALS: Record<FamilyRole, VisualAsset> = {
  gateway: visuals.host,
  sense: visuals.water,
  control: visuals.task,
  connect: visuals.family,
  act: visuals.options,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'system.hero' });
  return buildMetadata({
    locale,
    path: '/system',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';
  const t = await getTranslations('system');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-32">
        <GradientMesh variant="hero" />
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">{t('hero.eyebrow')}</span>
            </Reveal>
            <h1 className="mt-6 text-display-xl text-balance text-white">
              <TextReveal stagger={60}>{t('hero.title')}</TextReveal>
            </h1>
            <Reveal delay={200}>
              <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('hero.subtitle')}</p>
              <MagneticButton href="/products#series" variant="ghost" className="mt-6">
                {isZh ? '查看七大产品系列' : 'Explore the seven product series'} <ArrowRight size={16} />
              </MagneticButton>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#171b20] p-6 md:p-8">
              <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" />
              <div className="relative text-caption uppercase tracking-[0.16em] text-ink-500">
                {isZh ? '五种协作角色' : 'Five functional roles'}
              </div>
              <div className="relative mt-6 grid gap-3 sm:grid-cols-5 lg:grid-cols-1 xl:grid-cols-5">
                {family.map((item) => (
                  <div
                    key={item.role}
                    className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] p-4 text-center"
                  >
                    <item.icon size={24} strokeWidth={1.25} className="text-brand-halo" />
                    <div className="mt-3 text-body text-white">{isZh ? item.nameZh : item.nameEn}</div>
                    <div className="mt-1 text-caption text-ink-500">{isZh ? item.tagZh : item.tagEn}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Role strip */}
        <div className="container-page mt-16 grid grid-cols-2 gap-4 border-y border-white/5 py-8 md:grid-cols-5">
          {family.map((f) => (
            <div key={f.role} className="flex flex-col items-center text-center">
              <f.icon size={22} className="text-brand-halo" />
              <div className="mt-3 text-display-sm text-white">{isZh ? f.nameZh : f.nameEn}</div>
              <div className="mt-1 text-caption text-ink-400">{isZh ? f.tagZh : f.tagEn}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Family members */}
      {family.map((f, idx) => (
        <section
          key={f.role}
          id={f.role}
          className={`py-section ${idx % 2 === 0 ? '' : 'bg-surface-nebula/30'}`}
        >
          <div className="container-page">
            <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start">
              {/* Left: headline */}
              <div>
                <Reveal>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                      <f.icon size={22} className="text-brand-halo" />
                    </div>
                    <span className="eyebrow">{`${isZh ? '功能' : 'Function'} 0${f.order}`}</span>
                  </div>
                </Reveal>
                <h2 className="mt-6 text-display-xl text-white">{isZh ? f.nameZh : f.nameEn}</h2>
                <p className="mt-3 text-display-sm text-ink-200">{isZh ? f.tagZh : f.tagEn}</p>
                {f.bundledIn && f.bundledIn.length > 0 ? (
                  <p className="mt-6 text-caption text-ink-400">
                    {isZh ? '可评估配置 · ' : 'Configuration options · '}
                    {f.bundledIn
                      .map((sku) =>
                        getPackageName(sku, locale),
                      )
                      .join(' / ')}
                  </p>
                ) : null}
              </div>

              {/* Right: story + examples */}
              <div>
                <Reveal delay={80}>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/[0.08]">
                    <UnifiedVisualImage visual={FAMILY_VISUALS[f.role]} locale={locale} sizes="(min-width: 1024px) 58vw, 100vw" />
                  </div>
                  <p className="mt-3 text-caption text-ink-400">{isZh ? (f.role === 'control' ? '助手界面实录 · 示例数据' : f.role === 'act' ? '原厂配套安装示意 · 非制造商实拍' : '产品设计效果图 · 待样机与现场验证') : (f.role === 'control' ? 'Actual assistant interface · example data' : f.role === 'act' ? 'OEM installation illustration · not a manufacturer photograph' : 'Product design visualization · prototype and site validation pending')}</p>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-8 text-body-lg text-ink-200">{isZh ? f.storyZh : f.storyEn}</p>
                </Reveal>
                <div className="mt-10">
                  <div className="text-caption uppercase tracking-wide text-ink-500">
                    {isZh ? f.exampleLabel.zh : f.exampleLabel.en}
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {f.examples.map((ex, i) => (
                      <Reveal key={i} delay={i * 60}>
                        <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                          <div className="text-display-sm text-white">{isZh ? ex.zh : ex.en}</div>
                          <p className="mt-2 text-body text-ink-300">{isZh ? ex.descZh : ex.descEn}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Why five, not one */}
      <section className="py-section-lg">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-10 md:p-16">
            <GradientMesh variant="soft" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">{t('closing.eyebrow')}</span>
                <h2 className="mt-4 text-display-lg text-white">{t('closing.title')}</h2>
                <p className="mt-4 text-body-lg text-ink-200">{t('closing.body')}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <MagneticButton href="/products" variant="primary">
                    {t('closing.ctaProducts')} <ArrowRight size={16} />
                  </MagneticButton>
                  <MagneticButton href="/solutions" variant="ghost">
                    {t('closing.ctaSolutions')}
                  </MagneticButton>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-surface-void/50 p-6 text-body text-ink-300">
                <div className="space-y-3">
                  <div>
                    <span className="text-brand-halo">·</span> {t('closing.bullet1')}
                  </div>
                  <div>
                    <span className="text-brand-halo">·</span> {t('closing.bullet2')}
                  </div>
                  <div>
                    <span className="text-brand-halo">·</span> {t('closing.bullet3')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
