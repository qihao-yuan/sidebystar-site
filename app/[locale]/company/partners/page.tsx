import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/motion/Reveal';
import team from '@/content/team.json';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'company.partners' });
  return buildMetadata({ locale, path: '/company/partners', title: t('title'), description: t('subtitle') });
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('company.partners');
  const isZh = locale === 'zh-CN';

  return (
    <section className="pt-32 pb-section-lg">
      <div className="container-page">
        <span className="eyebrow">Partners</span>
        <h1 className="mt-4 text-display-xl text-white">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {team.partners.map((p, i) => (
            <Reveal key={p.name} delay={i * 50}>
              <div className="card-vision flex items-center justify-between">
                <div>
                  <div className="text-body-lg text-white">{p.name}</div>
                  <p className="mt-1 text-caption text-ink-300">{isZh ? p.desc.zh : p.desc.en}</p>
                </div>
                <div className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.04]" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
