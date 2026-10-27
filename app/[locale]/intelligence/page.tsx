import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
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

type GroupKey = 'routines' | 'awareness' | 'orchestration' | 'local';

const GROUPS: Array<{
  key: GroupKey;
  image: string;
  capabilities: [CapabilityKey, CapabilityKey];
}> = [
  {
    key: 'routines',
    image: '/intelligence/routines.jpg',
    capabilities: ['memory', 'personalization'],
  },
  {
    key: 'awareness',
    image: '/intelligence/awareness.jpg',
    capabilities: ['learning', 'anticipatory'],
  },
  {
    key: 'orchestration',
    image: '/intelligence/orchestration.jpg',
    capabilities: ['orchestra', 'offline'],
  },
  {
    key: 'local',
    image: '/intelligence/local-v2.jpg',
    capabilities: ['privacy', 'household'],
  },
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
  const section = await getTranslations('intelligence.section');
  const groups = await getTranslations('intelligence.groups');
  const cap = await getTranslations('intelligence.capabilities');
  const cta = await getTranslations('intelligence.cta');

  return (
    <>
      <section className="border-b border-white/[0.07] pb-20 pt-32">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-end">
            <div className="pb-2">
              <span className="eyebrow">{hero('eyebrow')}</span>
              <h1 className="mt-6 whitespace-pre-line text-display-xl text-balance text-white">
                {hero('title')}
              </h1>
              <p className="mt-6 max-w-lg text-body-lg text-ink-300">{hero('subtitle')}</p>
            </div>
            <Reveal>
              <MediaPlaceholder
                src="/intelligence/hero-v2.jpg"
                alt={hero('title')}
                ratio="4/3"
                priority
                className="border-white/10"
                imageClassName="object-right brightness-150 contrast-90"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page max-w-4xl">
          <span className="eyebrow">{section('eyebrow')}</span>
          <div className="mt-5 grid gap-5 md:grid-cols-[5fr_7fr] md:items-start">
            <h2 className="text-display-lg text-white">{section('title')}</h2>
            <p className="text-body-lg text-ink-300">{section('body')}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07]">
        <div className="container-page">
          {GROUPS.map((group, index) => (
            <section
              key={group.key}
              className="grid gap-10 border-b border-white/[0.07] py-16 lg:grid-cols-2 lg:items-center lg:py-24"
            >
              <Reveal className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <MediaPlaceholder
                  src={group.image}
                  alt={groups(`${group.key}.title`)}
                  ratio="1/1"
                  rounded="xl"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </Reveal>
              <div className={index % 2 === 1 ? 'lg:order-1' : undefined}>
                <span className="font-mono text-caption text-ink-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 max-w-xl text-display-lg text-white">
                  {groups(`${group.key}.title`)}
                </h2>
                <div className="mt-9 grid gap-8 sm:grid-cols-2">
                  {group.capabilities.map((key) => (
                    <div key={key} className="border-t border-white/10 pt-5">
                      <h3 className="text-lg font-medium text-white">{cap(`${key}.title`)}</h3>
                      <p className="mt-3 text-body text-ink-300">{cap(`${key}.body`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="py-section-lg">
        <div className="container-page">
          <div className="grid gap-8 border-y border-white/10 py-12 md:grid-cols-[7fr_5fr] md:items-center">
            <div>
              <span className="eyebrow">{cta('eyebrow')}</span>
              <h2 className="mt-4 max-w-3xl text-display-lg text-white">{cta('title')}</h2>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <MagneticButton href="/contact" variant="primary">
                {cta('primary')} <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton href="/pilot" variant="ghost">
                {cta('secondary')}
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
