import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  BrainCircuit,
  Users,
  Sparkles,
  Radio,
  Eye,
  Shield,
  WifiOff,
  Home,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { MediaPlaceholder } from '@/components/media/MediaPlaceholder';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

type CapabilityKey =
  | 'memory'
  | 'personalization'
  | 'learning'
  | 'orchestra'
  | 'anticipatory'
  | 'privacy'
  | 'offline'
  | 'household';

const CAPABILITIES: Array<{ key: CapabilityKey; icon: LucideIcon; label: string }> = [
  { key: 'memory', icon: BrainCircuit, label: 'INTELLIGENCE/MEMORY · 1:1 · 1200x1200' },
  { key: 'personalization', icon: Users, label: 'INTELLIGENCE/PERSONALIZATION · 1:1 · 1200x1200' },
  { key: 'learning', icon: Sparkles, label: 'INTELLIGENCE/LEARNING · 1:1 · 1200x1200' },
  { key: 'orchestra', icon: Radio, label: 'INTELLIGENCE/ORCHESTRA · 1:1 · 1200x1200' },
  { key: 'anticipatory', icon: Eye, label: 'INTELLIGENCE/ANTICIPATORY · 1:1 · 1200x1200' },
  { key: 'privacy', icon: Shield, label: 'INTELLIGENCE/PRIVACY · 1:1 · 1200x1200' },
  { key: 'offline', icon: WifiOff, label: 'INTELLIGENCE/OFFLINE · 1:1 · 1200x1200' },
  { key: 'household', icon: Home, label: 'INTELLIGENCE/HOUSEHOLD · 1:1 · 1200x1200' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'intelligence.hero' });
  return buildMetadata({
    locale,
    path: '/intelligence',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function IntelligencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const hero = await getTranslations('intelligence.hero');
  const cap = await getTranslations('intelligence.capabilities');
  const cta = await getTranslations('intelligence.cta');

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32">
        <GradientMesh variant="hero" />
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" />
        <div className="container-page relative">
          <div className="grid gap-12 lg:grid-cols-[6fr_6fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <Reveal>
                <span className="eyebrow">{hero('eyebrow')}</span>
              </Reveal>
              <h1 className="text-display-2xl text-balance text-white">
                <TextReveal stagger={70}>{hero('title')}</TextReveal>
              </h1>
              <Reveal delay={160}>
                <p className="max-w-xl text-body-lg text-ink-200">{hero('subtitle')}</p>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <MediaPlaceholder
                alt={hero('title')}
                ratio="4/3"
                label={hero('imageLabel')}
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-section-lg">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.key} delay={(i % 4) * 60}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 ease-apple-out hover:border-brand-halo/30 hover:bg-white/[0.04]">
                  <div className="relative">
                    <MediaPlaceholder
                      alt={cap(`${c.key}.title`)}
                      ratio="1/1"
                      rounded="none"
                      label={c.label}
                      className="border-0 border-b border-white/[0.06]"
                    />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface-void/70 backdrop-blur">
                      <c.icon size={18} className="text-brand-halo" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <h3 className="text-display-sm text-white">{cap(`${c.key}.title`)}</h3>
                    <p className="text-body text-ink-300">{cap(`${c.key}.body`)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-lg">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-10 md:p-16">
            <GradientMesh variant="cta" />
            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              <Reveal>
                <span className="eyebrow">{cta('eyebrow')}</span>
              </Reveal>
              <h2 className="text-display-xl text-balance text-white">
                <TextReveal stagger={60}>{cta('title')}</TextReveal>
              </h2>
              <Reveal delay={160}>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <MagneticButton href="/contact" variant="primary">
                    {cta('primary')} <ArrowRight size={16} />
                  </MagneticButton>
                  <MagneticButton href="/pilot" variant="ghost">
                    {cta('secondary')}
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
