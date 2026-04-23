import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { FileJson, Puzzle, Github, BookOpen, Cpu } from 'lucide-react';

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

    </>
  );
}
