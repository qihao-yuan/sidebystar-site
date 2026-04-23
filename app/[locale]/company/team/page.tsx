import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/motion/Reveal';
import team from '@/content/team.json';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'company.team' });
  return buildMetadata({ locale, path: '/company/team', title: t('title'), description: t('subtitle') });
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('company.team');
  const isZh = locale === 'zh-CN';

  return (
    <section className="pt-32 pb-section-lg">
      <div className="container-page">
        <span className="eyebrow">Team</span>
        <h1 className="mt-4 text-display-xl text-white">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {team.members.map((m, i) => (
            <Reveal key={m.slug} delay={i * 60}>
              <div className="card-vision h-full">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-aurora/40 to-brand-stardust/20 text-white">
                  <span className="font-display text-lg">{(isZh ? m.name.zh : m.name.en).slice(0, 1)}</span>
                </div>
                <h3 className="mt-5 text-display-sm text-white">{isZh ? m.name.zh : m.name.en}</h3>
                <p className="mt-1 text-caption text-brand-halo">{isZh ? m.role.zh : m.role.en}</p>
                <p className="mt-4 text-body text-ink-300">{isZh ? m.bio.zh : m.bio.en}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
