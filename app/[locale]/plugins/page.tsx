import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Sparkles, Users } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { buildMetadata } from '@/lib/seo';
import { plugins, pluginTopics, pluginStageLabel, type PluginTopic } from '@/content/plugins';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'plugins.hero' });
  return buildMetadata({
    locale,
    path: '/plugins',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function PluginsStorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';
  const t = await getTranslations('plugins');

  const byTopic: Array<{ id: PluginTopic | 'all'; label: string; items: typeof plugins }> = pluginTopics.map((topic) => ({
    id: topic.id,
    label: isZh ? topic.zh : topic.en,
    items: topic.id === 'all' ? plugins : plugins.filter((p) => p.topic === topic.id),
  }));

  // featured row: first GA official + first GA partner
  const featured = plugins
    .filter((p) => p.stage === 'ga')
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-32">
        <GradientMesh variant="hero" />
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" />
        <div className="container-page relative max-w-4xl">
          <Reveal>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
          </Reveal>
          <h1 className="mt-6 text-display-2xl text-balance text-white">
            <TextReveal stagger={60}>{t('hero.title')}</TextReveal>
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('hero.subtitle')}</p>
          </Reveal>
        </div>

        {/* Featured row */}
        <div className="container-page mt-16">
          <div className="mb-4 flex items-center gap-2 text-caption uppercase tracking-wide text-ink-500">
            <Sparkles size={14} /> {isZh ? '精选上架' : 'Featured'}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  href={`/plugins/${p.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-8 transition-all hover:border-brand-halo/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                      <p.icon size={22} className="text-brand-halo" />
                    </div>
                    <span className="text-caption uppercase tracking-wide text-ink-500">
                      {p.kind === 'official' ? t('byOfficial') : t('byPartner')}
                    </span>
                  </div>
                  <h3 className="mt-6 text-display-lg text-white">{isZh ? p.nameZh : p.nameEn}</h3>
                  <p className="mt-3 text-body text-ink-300">{isZh ? p.taglineZh : p.taglineEn}</p>
                  <div className="mt-6 flex items-center justify-between text-caption">
                    <span className="inline-flex items-center gap-1 text-ink-400">
                      <Users size={12} /> {isZh ? p.vendorZh : p.vendorEn}
                    </span>
                    <span className="inline-flex items-center gap-1 text-brand-halo transition-transform group-hover:translate-x-0.5">
                      {isZh ? '看故事' : 'Read the story'} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* By topic */}
      {byTopic
        .filter((b) => b.id !== 'all' && b.items.length > 0)
        .map((group, gi) => (
          <section key={group.id} className={`py-section ${gi % 2 === 0 ? '' : 'bg-surface-nebula/30'}`}>
            <div className="container-page">
              <Reveal>
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-caption uppercase tracking-wide text-ink-500">{t('topicLabel')}</div>
                    <h2 className="mt-2 text-display-lg text-white">{group.label}</h2>
                  </div>
                  <div className="text-caption text-ink-500">
                    {group.items.length}
                    {isZh ? ' 枚' : ''}
                  </div>
                </div>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((p, i) => {
                  const stageLabel = pluginStageLabel[p.stage];
                  const stageColor =
                    p.stage === 'ga'
                      ? 'border-brand-halo/30 bg-brand-halo/10 text-brand-halo'
                      : p.stage === 'beta'
                      ? 'border-state-warn/30 bg-state-warn/10 text-state-warn'
                      : 'border-white/10 bg-white/5 text-ink-400';
                  return (
                    <Reveal key={p.slug} delay={i * 40}>
                      <Link
                        href={`/plugins/${p.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-brand-halo/40 hover:bg-white/[0.04]"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                            <p.icon size={20} className="text-brand-halo" />
                          </div>
                          <span className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${stageColor}`}>
                            {isZh ? stageLabel.zh : stageLabel.en}
                          </span>
                        </div>
                        <div className="mt-5 text-display-sm text-white">{isZh ? p.nameZh : p.nameEn}</div>
                        <div className="mt-1 text-caption text-ink-500">
                          {p.kind === 'official' ? t('byOfficial') : t('byPartner')} · {isZh ? p.vendorZh : p.vendorEn}
                        </div>
                        <p className="mt-4 text-body text-ink-300">{isZh ? p.taglineZh : p.taglineEn}</p>
                        <div className="mt-auto pt-5 text-caption text-brand-halo transition-transform group-hover:translate-x-0.5">
                          {isZh ? '看故事 →' : 'Read the story →'}
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

      {/* CTA to developers */}
      <section className="py-section-lg">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-10 md:p-16">
            <GradientMesh variant="cta" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">{t('cta.eyebrow')}</span>
                <h2 className="mt-4 text-display-xl text-white">{t('cta.title')}</h2>
                <p className="mt-4 text-body-lg text-ink-200">{t('cta.body')}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton href="/developers/plugins" variant="primary">
                    {t('cta.primary')} <ArrowRight size={16} />
                  </MagneticButton>
                  <MagneticButton href="/developers/docs" variant="ghost">
                    {t('cta.secondary')}
                  </MagneticButton>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-surface-void/50 p-6 font-mono text-caption text-ink-200">
                <div className="flex items-center gap-2 text-ink-500">
                  <span className="h-2 w-2 rounded-full bg-state-success/60" /> plugin.manifest.yaml
                </div>
                <pre className="mt-3 leading-relaxed">{`plugin:
  id: dawn-light
  name: Dawn Light
  stage: ga
permissions:
  - sense:presence:read
  - actuate:light:write
capabilities:
  - scene: night-pathway
  - wake:  daylight-ramp`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
