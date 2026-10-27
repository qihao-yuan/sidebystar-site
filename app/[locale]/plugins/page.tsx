import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Users } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { buildMetadata } from '@/lib/seo';
import { plugins, pluginProfiles, pluginTopics, type PluginTopic } from '@/content/plugins';

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
  const publicPlugins = plugins.filter((plugin) => plugin.stage !== 'roadmap');

  const byTopic: Array<{ id: PluginTopic | 'all'; label: string; items: typeof plugins }> = pluginTopics.map((topic) => ({
    id: topic.id,
    label: isZh ? topic.zh : topic.en,
    items: topic.id === 'all' ? publicPlugins : publicPlugins.filter((p) => p.topic === topic.id),
  }));

  const featured = publicPlugins.slice(0, 3);
  return (
    <>
      <section className="pb-20 pt-32">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-6 max-w-4xl text-display-xl text-balance text-white">{t('hero.title')}</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('hero.subtitle')}</p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              [isZh ? '权限控制' : 'Permission control', isZh ? '安装前声明，变更需复核' : 'Declared before install; changes require review'],
              [isZh ? '运行位置' : 'Runtime', isZh ? '默认运行在现场节点' : 'On-site node by default'],
              [isZh ? '操作记录' : 'Operation records', isZh ? '动作与结果可查询' : 'Actions and results are queryable'],
            ].map(([label, value]) => (
              <div key={label} className="bg-surface-void px-6 py-5">
                <div className="text-caption uppercase tracking-wide text-ink-500">{label}</div>
                <div className="mt-2 text-body-lg text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="container-page mt-16">
          <div className="mb-4 text-caption uppercase tracking-wide text-ink-500">
            {isZh ? '核心能力' : 'Core capabilities'}
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
                  </div>
                  <h3 className="mt-6 text-display-lg text-white">{isZh ? p.nameZh : p.nameEn}</h3>
                  <p className="mt-3 text-body text-ink-300">{isZh ? p.taglineZh : p.taglineEn}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {pluginProfiles[p.slug]?.products.map((product) => (
                      <span key={product} className="rounded-full border border-white/10 px-2.5 py-1 text-caption text-ink-400">
                        {product}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between text-caption">
                    <span className="inline-flex items-center gap-1 text-ink-400">
                      <Users size={12} /> {isZh ? p.vendorZh : p.vendorEn}
                    </span>
                    <span className="inline-flex items-center gap-1 text-brand-halo transition-transform group-hover:translate-x-0.5">
                      {isZh ? '查看详情' : 'View details'} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.015] py-section">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">{isZh ? '运行机制' : 'Operating model'}</span>
            <h2 className="mt-4 text-display-lg text-white">
              {isZh ? '插件如何进入生产环境' : 'How a plugin enters production'}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
            {[
              [isZh ? '01 · 声明' : '01 · Declare', isZh ? '列明所需数据、设备和写入权限。' : 'List required data, devices and write permissions.'],
              [isZh ? '02 · 验证' : '02 · Validate', isZh ? '在测试空间验证触发、失败和回滚。' : 'Validate triggers, failures and rollback in a test space.'],
              [isZh ? '03 · 授权' : '03 · Approve', isZh ? '管理员确认站点、角色与有效范围。' : 'An administrator approves sites, roles and scope.'],
              [isZh ? '04 · 运行' : '04 · Operate', isZh ? '现场执行并记录版本、动作和结果。' : 'Run on site and record version, action and result.'],
            ].map(([title, body]) => (
              <div key={title} className="bg-surface-void p-6">
                <h3 className="text-body-lg text-white">{title}</h3>
                <p className="mt-3 text-caption text-ink-300">{body}</p>
              </div>
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
                        </div>
                        <div className="mt-5 text-display-sm text-white">{isZh ? p.nameZh : p.nameEn}</div>
                        <div className="mt-1 text-caption text-ink-500">
                          {isZh ? p.vendorZh : p.vendorEn}
                        </div>
                        <p className="mt-4 text-body text-ink-300">{isZh ? p.taglineZh : p.taglineEn}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {pluginProfiles[p.slug]?.products.map((product) => (
                            <span key={product} className="rounded border border-white/10 px-2 py-1 text-[10px] text-ink-500">
                              {product}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto pt-5 text-caption text-brand-halo transition-transform group-hover:translate-x-0.5">
                          {isZh ? '查看详情 →' : 'View details →'}
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
