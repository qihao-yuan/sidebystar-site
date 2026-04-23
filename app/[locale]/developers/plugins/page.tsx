import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight, Puzzle, Terminal, FileText } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';
import { plugins } from '@/content/plugins';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-CN';
  return buildMetadata({
    locale,
    path: '/developers/plugins',
    title: isZh ? '插件开发者中心' : 'Plugin Developer Center',
    description: isZh
      ? 'Plugin Manifest 规范、权限模型、上架流程, 以及每一枚在架插件的技术详情。'
      : 'Plugin Manifest spec, permissions, publishing flow, and technical detail for every shipped plugin.',
  });
}

export default async function DevelopersPluginsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';

  const stageColor = {
    ga: 'border-brand-halo/30 bg-brand-halo/10 text-brand-halo',
    beta: 'border-state-warn/30 bg-state-warn/10 text-state-warn',
    roadmap: 'border-white/10 bg-white/5 text-ink-400',
  } as const;

  const stageLabel = (s: 'ga' | 'beta' | 'roadmap') =>
    isZh
      ? s === 'ga'
        ? '已上架'
        : s === 'beta'
        ? '公测中'
        : '规划中'
      : s === 'ga'
      ? 'Available'
      : s === 'beta'
      ? 'In beta'
      : 'Roadmap';

  return (
    <>
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="hero" />
        <div className="container-page relative max-w-4xl">
          <Link href="/developers" className="btn-link mb-8">
            <ArrowLeft size={14} /> {isZh ? '返回开发者' : 'Back to developers'}
          </Link>
          <span className="eyebrow">Developer Zone · Plugins</span>
          <h1 className="mt-4 text-display-2xl text-white">
            <TextReveal stagger={60}>
              {isZh ? '插件开发者中心' : 'Plugin Developer Center'}
            </TextReveal>
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">
              {isZh
                ? '这里是面向插件开发者的一站式入口 —— Plugin Manifest 规范、权限模型、上架流程, 以及每一枚插件的技术详情。'
                : 'A single entry for plugin builders -- manifest spec, permission model, publishing flow, and the technical detail of every shipped plugin.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-section">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {[
            {
              icon: FileText,
              title: isZh ? 'Plugin Manifest 规范' : 'Plugin Manifest Spec',
              desc: isZh
                ? '六段式清单 (devices / capabilities / actions / alerts / profiles / permissions) 的完整字段与约束。'
                : 'The six-segment manifest (devices, capabilities, actions, alerts, profiles, permissions) with full fields and constraints.',
              href: '/developers/docs#plugin-manifest',
            },
            {
              icon: Terminal,
              title: isZh ? 'CLI & 示例工程' : 'CLI & Sample Project',
              desc: isZh
                ? 'aios plugin scaffold 一键生成模板, 内置本地调试、mock event、审计回放。'
                : 'One command to scaffold a template with local debug, mock event, and audit replay built in.',
              href: '/developers/docs#cli',
            },
            {
              icon: Puzzle,
              title: isZh ? '上架流程与评审' : 'Publishing & Review',
              desc: isZh
                ? '从提交 manifest 到官方商店上架的流程、人工评审范围、签名与发布节奏。'
                : 'From manifest submission to store listing -- human review, signing, and release cadence.',
              href: '/developers/docs#publish',
            },
          ].map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <Link href={it.href as `/developers/docs#${string}`} className="card-vision group flex h-full items-start gap-5">
                <it.icon size={28} className="text-brand-halo" />
                <div>
                  <h3 className="text-display-sm text-white">{it.title}</h3>
                  <p className="mt-2 text-caption text-ink-300">{it.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Plugin technical list */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">
              {isZh ? '在架插件 · 技术详情' : 'Shipped Plugins · Technical Detail'}
            </span>
            <h2 className="mt-4 text-display-lg text-white">
              {isZh ? '每一枚插件的权限、能力、安装命令' : 'Permissions, capabilities, install command'}
            </h2>
            <p className="mt-3 max-w-2xl text-body text-ink-300">
              {isZh
                ? '普通访客请走插件故事, 这里是面向集成与运维的技术视图。'
                : 'Visitors should head to the plugin stories. What follows is for integrators and operators.'}
            </p>
          </Reveal>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03] text-caption uppercase text-ink-300">
                <tr>
                  <th className="px-6 py-4 font-medium">{isZh ? '插件' : 'Plugin'}</th>
                  <th className="px-6 py-4 font-medium">{isZh ? '作者' : 'Vendor'}</th>
                  <th className="px-6 py-4 font-medium">{isZh ? '权限' : 'Permissions'}</th>
                  <th className="px-6 py-4 font-medium">{isZh ? '状态' : 'Stage'}</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {plugins.map((p) => (
                  <tr key={p.slug} className="border-b border-white/5">
                    <td className="px-6 py-4 align-top">
                      <div className="font-mono text-body text-white">{p.slug}</div>
                      <div className="mt-1 text-caption text-ink-400">{isZh ? p.nameZh : p.nameEn}</div>
                    </td>
                    <td className="px-6 py-4 align-top text-caption text-ink-200">
                      {isZh ? p.vendorZh : p.vendorEn}
                    </td>
                    <td className="px-6 py-4 align-top">
                      {p.manifest ? (
                        <div className="flex flex-wrap gap-1">
                          {p.manifest.permissions.map((perm) => (
                            <span
                              key={perm}
                              className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[11px] text-ink-200"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-caption text-ink-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top whitespace-nowrap">
                      <span className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${stageColor[p.stage]}`}>
                        {stageLabel(p.stage)}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                      {p.manifest ? (
                        <Link
                          href={`/developers/plugins/${p.slug}`}
                          className="inline-flex items-center gap-1 text-caption text-brand-halo hover:translate-x-0.5"
                        >
                          {isZh ? '详情' : 'Detail'} <ArrowRight size={12} />
                        </Link>
                      ) : (
                        <span className="text-caption text-ink-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
