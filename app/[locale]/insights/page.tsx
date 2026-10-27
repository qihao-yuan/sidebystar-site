import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { Reveal } from '@/components/motion/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { InsightCover } from '@/components/insights/InsightCover';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { getArticles } from '@/lib/aios-content';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'insights' });
  return buildMetadata({
    locale,
    path: '/insights',
    title: t('title'),
    description: t('subtitle'),
  });
}

function formatDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export default async function InsightsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ cursor?: string }>;
}) {
  const { locale } = await params;
  const { cursor } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('insights');
  const result = await getArticles({ locale, limit: 20, cursor });

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32">
        <GradientMesh variant="hero" />
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" />
        <div className="container-page relative max-w-4xl">
          <Reveal>
            <span className="eyebrow">{t('eyebrow')}</span>
          </Reveal>
          <h1 className="mt-6 text-display-2xl text-balance text-white">
            <TextReveal stagger={60}>{t('title')}</TextReveal>
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-section-lg">
        <div className="container-page">
          {result.status === 'closed' ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
              <h2 className="text-display-sm text-white">{t('closedTitle')}</h2>
              <p className="mx-auto mt-3 max-w-xl text-body text-ink-300">{t('closedBody')}</p>
            </div>
          ) : result.status === 'unavailable' ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
              <RefreshCw className="mx-auto text-ink-500" size={24} />
              <h2 className="mt-5 text-display-sm text-white">{t('unavailableTitle')}</h2>
              <p className="mx-auto mt-3 max-w-xl text-body text-ink-300">{t('unavailableBody')}</p>
            </div>
          ) : result.data.items.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
              <h2 className="text-display-sm text-white">{t('emptyTitle')}</h2>
              <p className="mx-auto mt-3 max-w-xl text-body text-ink-300">{t('emptyBody')}</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {result.data.items.map((article, index) => (
                  <Reveal key={article.id} delay={index * 50}>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-all hover:border-brand-halo/40 hover:bg-white/[0.04]"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-surface-nebula">
                        <InsightCover src={article.cover_url} alt="" priority={index < 2} />
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <time className="font-mono text-caption text-ink-500" dateTime={article.published_at}>
                          {formatDate(article.published_at, locale)}
                        </time>
                        <h2 className="mt-4 text-display-md text-balance text-white">{article.title}</h2>
                        <p className="mt-4 text-body text-ink-300">{article.summary}</p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-halo">
                          {t('readArticle')} <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>

              {(cursor || result.data.has_more) && (
                <nav className="mt-12 flex items-center justify-center gap-3" aria-label={t('paginationLabel')}>
                  {cursor ? (
                    <Link href="/insights" className="btn-ghost">
                      {t('firstPage')}
                    </Link>
                  ) : null}
                  {result.data.has_more && result.data.next_cursor ? (
                    <Link
                      href={`/insights?cursor=${encodeURIComponent(result.data.next_cursor)}` as any}
                      className="btn-primary"
                    >
                      {t('nextPage')} <ArrowRight size={14} />
                    </Link>
                  ) : null}
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
