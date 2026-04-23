import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { FileJson, Puzzle, Github, BookOpen, Terminal, Cpu } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'developers' });
  return buildMetadata({ locale, path: '/developers', title: t('title'), description: t('subtitle') });
}

export default async function DevelopersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('developers');
  const isZh = locale === 'zh-CN';

  const items: Array<{ icon: typeof BookOpen; title: string; desc: string; href: string; external?: boolean }> = [
    { icon: BookOpen, title: t('docs'), desc: isZh ? '完整的技术文档 + 架构说明' : 'Complete tech docs + architecture', href: '/developers/docs' },
    { icon: FileJson, title: t('api'), desc: isZh ? '67 个稳定 v1 REST 端点' : '67 stable v1 REST endpoints', href: '/developers/api' },
    { icon: Puzzle, title: t('plugins'), desc: isZh ? '插件清单 + PluginManifest 规范' : 'Plugin list + PluginManifest spec', href: '/developers/plugins' },
    { icon: Cpu, title: isZh ? '硬件规格' : 'Hardware Specs', desc: isZh ? '三款整机完整硬件参数与对比' : 'Full hardware parameters and comparison across three SKUs', href: '/developers/hardware' },
    { icon: Github, title: t('github'), desc: isZh ? 'Apache 2.0 开源内核' : 'Apache 2.0 open-source kernel', href: 'https://github.com/sidebystar', external: true },
  ];

  const codeSample = `import { aios } from '@sidebystar/sdk';
const devices = await aios.facts.devices({ site: 'floor-3' });
console.log(devices.length, 'devices on floor 3');`;

  return (
    <>
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="hero" />
        <div className="container-page relative max-w-4xl">
          <Reveal><span className="eyebrow">Developers</span></Reveal>
          <h1 className="mt-6 text-display-2xl text-balance text-white">
            <TextReveal stagger={70}>
              {isZh ? '为开发者准备的本地 AI 基建。' : 'Local AI infrastructure for builders.'}
            </TextReveal>
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>
          </Reveal>
        </div>
      </section>

      {/* 4 entries */}
      <section className="py-section">
        <div className="container-page grid gap-5 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 60}>
              {it.external ? (
                <a href={it.href} target="_blank" rel="noreferrer" className="card-vision group flex h-full items-start gap-5">
                  <it.icon size={32} className="text-brand-halo" />
                  <div>
                    <h3 className="text-display-sm text-white">{it.title}</h3>
                    <p className="mt-2 text-caption text-ink-300">{it.desc}</p>
                  </div>
                </a>
              ) : (
                <Link href={it.href as any} className="card-vision group flex h-full items-start gap-5">
                  <it.icon size={32} className="text-brand-halo" />
                  <div>
                    <h3 className="text-display-sm text-white">{it.title}</h3>
                    <p className="mt-2 text-caption text-ink-300">{it.desc}</p>
                  </div>
                </Link>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Code sample */}
      <section className="py-section-lg">
        <div className="container-page grid gap-12 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-2">
            <Terminal size={28} className="text-brand-halo" />
            <h2 className="mt-5 text-display-lg text-white">
              {isZh ? '第一次调用只需 3 行。' : 'Three lines to your first call.'}
            </h2>
            <p className="mt-4 text-body-lg text-ink-300">
              {isZh
                ? '所有稳定 API 都已锁定 v1 合约, 内部模块重构不会改变外部接口。'
                : 'All stable APIs are locked to the v1 contract. Internal refactors do not change the external surface.'}
            </p>
          </div>
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-state-danger/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-state-warn/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-state-success/60" />
                <span className="ml-auto font-mono text-caption text-ink-500">curl.ts</span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-caption leading-relaxed text-ink-100">
                <code>{codeSample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
