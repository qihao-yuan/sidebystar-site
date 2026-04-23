import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { buildMetadata } from '@/lib/seo';
import { plugins, getPlugin, pluginStageLabel } from '@/content/plugins';

export function generateStaticParams() {
  return plugins.flatMap((p) => [
    { locale: 'zh-CN', slug: p.slug },
    { locale: 'en', slug: p.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en'; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getPlugin(slug);
  if (!p) return {};
  return buildMetadata({
    locale,
    path: `/plugins/${slug}`,
    title: locale === 'zh-CN' ? p.nameZh : p.nameEn,
    description: locale === 'zh-CN' ? p.taglineZh : p.taglineEn,
  });
}

export default async function PluginStory({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const p = getPlugin(slug);
  if (!p) notFound();
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';
  const t = await getTranslations('plugins');
  const stageLabel = pluginStageLabel[p.stage];
  const stageColor =
    p.stage === 'ga'
      ? 'border-brand-halo/30 bg-brand-halo/10 text-brand-halo'
      : p.stage === 'beta'
      ? 'border-state-warn/30 bg-state-warn/10 text-state-warn'
      : 'border-white/10 bg-white/5 text-ink-400';

  const related = plugins.filter((x) => x.slug !== p.slug && x.topic === p.topic).slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative">
          <Link href="/plugins" className="btn-link mb-8">
            <ArrowLeft size={14} /> {isZh ? '返回插件' : 'Back to plugins'}
          </Link>
          <div className="flex flex-col gap-6">
            <span className="eyebrow">{isZh ? '插件故事' : 'Plugin story'}</span>
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                <p.icon size={32} className="text-brand-halo" />
              </div>
              <div>
                <h1 className="text-display-xl text-white">{isZh ? p.nameZh : p.nameEn}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-caption text-ink-400">
                  <span className="inline-flex items-center gap-1">
                    <Users size={12} />
                    {p.kind === 'official' ? t('byOfficial') : t('byPartner')} · {isZh ? p.vendorZh : p.vendorEn}
                  </span>
                  <span className={`whitespace-nowrap rounded-full border px-2 py-0.5 uppercase tracking-wide ${stageColor}`}>
                    {isZh ? stageLabel.zh : stageLabel.en}
                  </span>
                </div>
              </div>
            </div>
            <p className="max-w-3xl text-display-sm text-white">{isZh ? p.taglineZh : p.taglineEn}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[6fr_6fr] lg:items-start">
            <div>
              <Reveal>
                <span className="eyebrow">01 · {isZh ? '它为空间做了什么' : 'What it does for the space'}</span>
              </Reveal>
              <p className="mt-6 text-body-lg text-ink-200">{isZh ? p.storyZh : p.storyEn}</p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-caption uppercase tracking-wide text-ink-500">
                  {isZh ? '它真正带来的改变' : 'The real change'}
                </div>
                <p className="mt-3 text-body-lg text-white">{isZh ? p.outcomeZh : p.outcomeEn}</p>
              </div>
            </div>
            <div>
              <Reveal delay={120}>
                <span className="eyebrow">02 · {isZh ? '三件小事' : 'Three small things'}</span>
              </Reveal>
              <div className="mt-6 grid gap-3">
                {p.highlights.map((h, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-caption text-ink-300">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-body-lg text-white">{isZh ? h.zh : h.en}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related + dev link */}
      <section className="py-section-lg">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[7fr_5fr]">
            {related.length > 0 ? (
              <div>
                <span className="eyebrow">{isZh ? '同一场景的其他插件' : 'More in the same scenario'}</span>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/plugins/${r.slug}`}
                      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-brand-halo/40"
                    >
                      <r.icon size={20} className="text-brand-halo" />
                      <div className="mt-3 text-display-sm text-white">{isZh ? r.nameZh : r.nameEn}</div>
                      <p className="mt-2 text-caption text-ink-400">{isZh ? r.taglineZh : r.taglineEn}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : <div />}

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-8">
              <div className="text-caption uppercase tracking-wide text-ink-500">
                {isZh ? '面向开发者' : 'For developers'}
              </div>
              <h3 className="mt-3 text-display-sm text-white">
                {isZh ? '想看 manifest 与安装命令?' : 'Looking for the manifest and install?'}
              </h3>
              <p className="mt-3 text-body text-ink-300">
                {isZh
                  ? '权限、能力、动作、安装命令都在开发者中心。'
                  : 'Permissions, capabilities, actions, install commands -- all in the developer center.'}
              </p>
              <div className="mt-6">
                {p.manifest ? (
                  <MagneticButton href={`/developers/plugins/${p.slug}`} variant="primary">
                    {isZh ? '查看技术详情' : 'See technical detail'} <ArrowRight size={16} />
                  </MagneticButton>
                ) : (
                  <MagneticButton href="/developers/plugins" variant="ghost">
                    {isZh ? '前往开发者中心' : 'Open developer center'} <ArrowRight size={16} />
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
