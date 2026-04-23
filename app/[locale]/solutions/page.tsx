import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { solutionsByGroup, type SolutionGroup } from '@/content/solutions';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { MediaPlaceholder } from '@/components/media/MediaPlaceholder';
import { ArrowUpRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions' });
  return buildMetadata({ locale, path: '/solutions', title: t('title'), description: t('subtitle') });
}

const GROUPS: SolutionGroup[] = ['health', 'home', 'commercial', 'public'];

const GROUP_IMAGE: Record<SolutionGroup, string> = {
  health: 'SOLUTIONS/GROUP-HEALTH · 16:9 · 2560x1440',
  home: 'SOLUTIONS/GROUP-HOME · 16:9 · 2560x1440',
  commercial: 'SOLUTIONS/GROUP-COMMERCIAL · 16:9 · 2560x1440',
  public: 'SOLUTIONS/GROUP-PUBLIC · 16:9 · 2560x1440',
};

export default async function SolutionsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('solutions');
  const items = await getTranslations('solutions.items');
  const groups = await getTranslations('solutions.groups');

  return (
    <div className="pt-32 pb-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow="Solutions" title={t('title')} subtitle={t('subtitle')} align="left" />

        <div className="mt-20 flex flex-col gap-section">
          {GROUPS.map((g, gi) => {
            const list = solutionsByGroup[g];
            if (!list.length) return null;

            return (
              <div key={g}>
                <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-center">
                  <Reveal>
                    <MediaPlaceholder
                      alt={groups(`${g}.title`)}
                      ratio="16/9"
                      rounded="xl"
                      label={GROUP_IMAGE[g]}
                    />
                  </Reveal>
                  <div className="flex flex-col gap-4">
                    <Reveal>
                      <span className="eyebrow">{String(gi + 1).padStart(2, '0')} · Group</span>
                    </Reveal>
                    <Reveal delay={60}>
                      <h2 className="text-display-lg text-white">{groups(`${g}.title`)}</h2>
                    </Reveal>
                    <Reveal delay={120}>
                      <p className="max-w-xl text-body-lg text-ink-300">{groups(`${g}.body`)}</p>
                    </Reveal>
                  </div>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((s, i) => {
                    const planned = s.planned === true;
                    const body = (
                      <div
                        className={
                          'card-vision group flex h-full flex-col justify-between ' +
                          (planned ? 'opacity-60' : '')
                        }
                      >
                        <div className="flex items-start justify-between">
                          <s.icon size={28} className="text-brand-halo" />
                          <span className="font-mono text-caption text-ink-500">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="mt-8">
                          <h3 className="text-display-sm text-white">{items(`${s.titleKey}.title`)}</h3>
                          <p className="mt-2 text-body text-ink-300">{items(`${s.titleKey}.brief`)}</p>
                          {planned ? (
                            <span className="mt-6 inline-flex items-center rounded-full border border-white/10 px-3 py-1 font-mono text-caption text-ink-400">
                              {t('comingSoon')}
                            </span>
                          ) : (
                            <span className="mt-6 inline-flex items-center gap-1.5 text-caption text-brand-halo transition-colors group-hover:text-white">
                              {locale === 'zh-CN' ? '查看方案' : 'View Solution'} <ArrowUpRight size={14} />
                            </span>
                          )}
                        </div>
                      </div>
                    );

                    return (
                      <Reveal key={s.slug} delay={i * 60}>
                        {planned ? (
                          <div className="h-full cursor-default">{body}</div>
                        ) : (
                          <Link href={`/solutions/${s.slug}` as any} className="block h-full">
                            {body}
                          </Link>
                        )}
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
