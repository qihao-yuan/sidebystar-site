import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { UnifiedVisualImage } from '@/components/media/UnifiedVisualImage';
import { pluginVisuals, visuals } from '@/content/product-visuals';
import { getPackageName } from '@/content/product-names';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { buildMetadata } from '@/lib/seo';
import { plugins, getPlugin, pluginProfiles } from '@/content/plugins';

export function generateStaticParams() {
  return plugins.filter((p) => p.stage !== 'roadmap').flatMap((p) => [
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
  if (!p || p.stage === 'roadmap') return {};
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
  if (!p || p.stage === 'roadmap') notFound();
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';
  const t = await getTranslations('plugins');
  const profile = pluginProfiles[p.slug];
  const heroVisual = pluginVisuals[p.slug as keyof typeof pluginVisuals] ?? visuals.host;
  const visualCaption = p.slug === 'clinical-adapter'
    ? (isZh ? '原厂床旁设备选配示意' : 'OEM bedside device illustration')
    : p.slug === 'concierge-script'
      ? (isZh ? '实际软件界面 · 示例数据' : 'Current software interface · Example data')
      : p.slug === 'dawn-light'
        ? (isZh ? '灯光与窗帘应用场景示意' : 'Lighting and curtain scenario illustration')
        : (isZh ? '产品设计效果 · 按项目确认适配' : 'Product design visualization · Integration assessed per project');

  const related = plugins
    .filter((x) => x.slug !== p.slug && x.topic === p.topic && x.stage !== 'roadmap')
    .slice(0, 3);

  return (
    <article>
      <section className="relative flex min-h-[72vh] items-center overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 lg:left-auto lg:w-[58%]">
          <UnifiedVisualImage
            visual={heroVisual}
            locale={locale}
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="opacity-55 lg:opacity-70"
          />
          <div className="absolute inset-0 bg-surface-void/55 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-void via-surface-void/55 to-surface-void/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-void/80 via-transparent to-surface-void/25" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(75,107,251,0.08),transparent_45%)]" />

        <div className="container-page relative z-10 py-32">
          <Link href="/plugins" className="btn-link mb-8">
            <ArrowLeft size={14} /> {isZh ? '返回插件' : 'Back to plugins'}
          </Link>
          <div className="flex max-w-3xl flex-col gap-6">
            <span className="eyebrow">{isZh ? '插件详情' : 'Plugin details'}</span>
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
                </div>
              </div>
            </div>
            <p className="max-w-3xl text-display-sm text-white">{isZh ? p.taglineZh : p.taglineEn}</p>
            <p className="text-caption text-ink-400">{visualCaption}</p>
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[6fr_6fr] lg:items-start">
            <div>
              <Reveal>
                <span className="eyebrow">01 · {isZh ? '功能范围' : 'Function scope'}</span>
              </Reveal>
              <p className="mt-6 text-body-lg text-ink-200">{isZh ? p.storyZh : p.storyEn}</p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-caption uppercase tracking-wide text-ink-500">
                  {isZh ? '输出结果' : 'Output'}
                </div>
                <p className="mt-3 text-body-lg text-white">{isZh ? p.outcomeZh : p.outcomeEn}</p>
              </div>
            </div>
            <div>
              <Reveal delay={120}>
                <span className="eyebrow">02 · {isZh ? '主要能力' : 'Key capabilities'}</span>
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

      {profile ? (
        <section className="border-y border-white/5 bg-white/[0.015] py-section">
          <div className="container-page">
            <Reveal>
              <span className="eyebrow">03 · {isZh ? '部署与边界' : 'Deployment and boundaries'}</span>
              <h2 className="mt-4 text-display-lg text-white">
                {isZh ? '上线前需要确认的条件' : 'Conditions to confirm before deployment'}
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-8 lg:grid-cols-[7fr_5fr]">
              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {[
                  [isZh ? '运行位置' : 'Runtime', isZh ? profile.deployment.zh : profile.deployment.en],
                  [isZh ? '接入前提' : 'Prerequisites', isZh ? profile.prerequisites.zh : profile.prerequisites.en],
                  [isZh ? '能力边界' : 'Boundary', isZh ? profile.boundary.zh : profile.boundary.en],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-2 bg-surface-void p-6 md:grid-cols-[8rem_1fr]">
                    <div className="text-caption uppercase tracking-wide text-ink-500">{label}</div>
                    <p className="text-body text-ink-200">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-caption uppercase tracking-wide text-ink-500">
                  {isZh ? '实施步骤' : 'Implementation'}
                </div>
                <ol className="mt-5 space-y-5">
                  {profile.operations.map((item, i) => (
                    <li key={i} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="font-mono text-caption text-brand-halo">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-body text-ink-200">{isZh ? item.zh : item.en}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="text-caption uppercase tracking-wide text-ink-500">
                    {isZh ? '适用产品' : 'Supported products'}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.products.map((product) => (
                      <span key={product} className="rounded-full border border-white/10 px-3 py-1 text-caption text-ink-200">
                        {getPackageName(product,locale)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {p.manifest ? (
        <section className="py-section">
          <div className="container-page">
            <Reveal>
              <span className="eyebrow">04 · {isZh ? '权限与接口' : 'Permissions and interfaces'}</span>
              <h2 className="mt-4 text-display-lg text-white">
                {isZh ? '安装时明确申请的权限' : 'Permissions declared at installation'}
              </h2>
              <p className="mt-4 max-w-3xl text-body text-ink-300">
                {isZh
                  ? '插件只能访问清单中声明的资源。权限变化需要重新审核，动作调用写入现场记录。'
                  : 'The plugin can access only declared resources. Permission changes require review, and actions are recorded on site.'}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 lg:grid-cols-[5fr_7fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-caption uppercase tracking-wide text-ink-500">
                  {isZh ? '权限范围' : 'Permission scope'}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.manifest.permissions.map((permission) => (
                    <code key={permission} className="rounded border border-white/10 bg-black/20 px-2.5 py-1.5 text-caption text-ink-200">
                      {permission}
                    </code>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-[7rem_1fr] border-b border-white/10 bg-white/[0.03] px-5 py-3 text-caption uppercase tracking-wide text-ink-500">
                  <span>{isZh ? '类型' : 'Type'}</span>
                  <span>{isZh ? '接口说明' : 'Interface'}</span>
                </div>
                {p.manifest.capabilities.map((capability) => (
                  <div key={`cap-${capability.kind}`} className="grid grid-cols-[7rem_1fr] border-b border-white/10 px-5 py-4 last:border-b-0">
                    <code className="text-caption text-brand-halo">{capability.kind}</code>
                    <span className="text-body text-ink-200">{isZh ? capability.descZh : capability.descEn}</span>
                  </div>
                ))}
                {p.manifest.actions.map((action) => (
                  <div key={action.id} className="grid grid-cols-[7rem_1fr] border-b border-white/10 px-5 py-4 last:border-b-0">
                    <code className="text-caption text-brand-halo">{action.id}</code>
                    <span className="text-body text-ink-200">{isZh ? action.descZh : action.descEn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

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
                {isZh ? '开发资料' : 'Developer resources'}
              </div>
              <h3 className="mt-3 text-display-sm text-white">
                {isZh ? 'Manifest 与安装说明' : 'Manifest and installation'}
              </h3>
              <p className="mt-3 text-body text-ink-300">
                {isZh
                  ? '查看权限范围、能力声明、动作接口和安装命令。'
                  : 'Review permission scope, capability declarations, actions and installation commands.'}
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
