import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ExternalLink, Terminal, ShieldCheck, Wrench, Boxes } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { Reveal } from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';
import { plugins, getPlugin, pluginStageLabel } from '@/content/plugins';

export function generateStaticParams() {
  return plugins
    .filter((p) => p.manifest)
    .flatMap((p) => [
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
  if (!p || !p.manifest) return {};
  return buildMetadata({
    locale,
    path: `/developers/plugins/${slug}`,
    title: `${locale === 'zh-CN' ? p.nameZh : p.nameEn} · Manifest`,
    description: locale === 'zh-CN'
      ? `${p.nameZh} 的权限、能力、动作与安装命令。`
      : `Permissions, capabilities, actions and install for ${p.nameEn}.`,
  });
}

export default async function PluginTechnicalDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const p = getPlugin(slug);
  if (!p || !p.manifest) notFound();
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';
  const manifest = p.manifest!;
  const stageLabel = pluginStageLabel[p.stage];

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative max-w-4xl">
          <Link href="/developers/plugins" className="btn-link mb-8">
            <ArrowLeft size={14} /> {isZh ? '返回插件中心' : 'Back to plugin center'}
          </Link>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <p.icon size={26} className="text-brand-halo" />
            </div>
            <div>
              <span className="eyebrow">Plugin · Manifest</span>
              <h1 className="mt-2 text-display-xl text-white">
                <span className="font-mono">{p.slug}</span>
              </h1>
              <div className="mt-2 text-caption text-ink-400">
                {isZh ? p.nameZh : p.nameEn} · {isZh ? p.vendorZh : p.vendorEn} · {isZh ? stageLabel.zh : stageLabel.en}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href={`/plugins/${p.slug}`} className="btn-link">
              {isZh ? '这个插件的故事版 →' : 'Plugin story →'}
            </Link>
            {manifest.repoUrl ? (
              <a
                href={manifest.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-link"
              >
                {isZh ? '仓库' : 'Repository'} <ExternalLink size={12} />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* Install */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <div className="flex items-center gap-2 text-caption uppercase tracking-wide text-ink-500">
              <Terminal size={14} /> {isZh ? '安装命令' : 'Install command'}
            </div>
          </Reveal>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-surface-void/60">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-state-danger/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-state-warn/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-state-success/60" />
              <span className="ml-auto font-mono text-caption text-ink-500">aios</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-caption text-ink-100">
              <code>{manifest.installCommand}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Manifest detail */}
      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Permissions */}
            <div className="card-vision h-full">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand-halo" />
                <div className="text-display-sm text-white">{isZh ? '权限' : 'Permissions'}</div>
              </div>
              <p className="mt-3 text-caption text-ink-400">
                {isZh
                  ? '插件只能做 manifest 里声明的事情, 系统会拒绝未声明的访问。'
                  : 'The plugin can only do what is declared in the manifest; anything else is refused by the system.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {manifest.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-ink-100"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="card-vision h-full">
              <div className="flex items-center gap-2">
                <Boxes size={18} className="text-brand-halo" />
                <div className="text-display-sm text-white">{isZh ? '能力' : 'Capabilities'}</div>
              </div>
              <p className="mt-3 text-caption text-ink-400">
                {isZh ? '插件对外提供的能力接口, 供系统编排调用。' : 'Capabilities the plugin exposes for the runtime to orchestrate.'}
              </p>
              <ul className="mt-4 space-y-3">
                {manifest.capabilities.map((c, i) => (
                  <li key={i}>
                    <div className="font-mono text-caption text-brand-halo">{c.kind}</div>
                    <p className="mt-1 text-body text-ink-200">{isZh ? c.descZh : c.descEn}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="card-vision h-full">
              <div className="flex items-center gap-2">
                <Wrench size={18} className="text-brand-halo" />
                <div className="text-display-sm text-white">{isZh ? '可调用动作' : 'Actions'}</div>
              </div>
              <p className="mt-3 text-caption text-ink-400">
                {isZh ? '可在规则或脚本中显式触发的动作。' : 'Actions you can trigger from rules or scripts.'}
              </p>
              <ul className="mt-4 space-y-3">
                {manifest.actions.map((a, i) => (
                  <li key={i}>
                    <div className="font-mono text-caption text-brand-halo">{a.id}</div>
                    <p className="mt-1 text-body text-ink-200">{isZh ? a.descZh : a.descEn}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Manifest YAML preview */}
      <section className="py-section-lg">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">{isZh ? 'Manifest 预览' : 'Manifest Preview'}</span>
            <h2 className="mt-4 text-display-lg text-white">
              {isZh ? '完整的清单, 一份就够了。' : 'The complete manifest, in one file.'}
            </h2>
          </Reveal>
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-state-danger/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-state-warn/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-state-success/60" />
              <span className="ml-auto font-mono text-caption text-ink-500">PLUGIN_MANIFEST.yaml</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-caption leading-relaxed text-ink-100">
              <code>{`plugin:
  id: ${p.slug}
  name: ${p.nameEn}
  vendor: ${p.vendorEn}
  stage: ${p.stage}
  topic: ${p.topic}

permissions:
${manifest.permissions.map((perm) => `  - ${perm}`).join('\n')}

capabilities:
${manifest.capabilities.map((c) => `  - kind: ${c.kind}\n    desc: ${c.descEn}`).join('\n')}

actions:
${manifest.actions.map((a) => `  - id: ${a.id}\n    desc: ${a.descEn}`).join('\n')}

install: ${manifest.installCommand}`}</code>
            </pre>
          </div>
        </div>
      </section>
    </article>
  );
}
