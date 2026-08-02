import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { InsightCover } from '@/components/insights/InsightCover';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { getAllArticlesForSitemap, getArticle } from '@/lib/aios-content';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const locales: Locale[] = ['zh-CN', 'en'];
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const articles = await getAllArticlesForSitemap(locale);
      return articles.map((article) => ({ locale, slug: article.slug }));
    }),
  );
  return entries.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await getArticle(locale, slug);
  if (result.status !== 'ok') return {};

  return buildMetadata({
    locale,
    path: `/insights/${slug}`,
    title: result.data.title,
    description: result.data.summary,
    type: 'article',
    publishedTime: result.data.published_at,
    modifiedTime: result.data.updated_at,
    images: [result.data.cover_url],
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

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('insights');
  const result = await getArticle(locale, slug);

  if (result.status === 'not_found') notFound();

  if (result.status === 'unavailable') {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-5 pb-20 pt-32">
        <div className="max-w-xl text-center">
          <RefreshCw className="mx-auto text-ink-500" size={24} />
          <h1 className="mt-5 text-display-md text-white">{t('unavailableTitle')}</h1>
          <p className="mt-3 text-body-lg text-ink-300">{t('unavailableBody')}</p>
          <Link href="/insights" className="btn-ghost mt-8">
            <ArrowLeft size={15} /> {t('backToInsights')}
          </Link>
        </div>
      </section>
    );
  }

  const article = result.data;
  const siteUrl = process.env.SITE_URL || 'https://sidebystar.com';
  const coverUrl = article.cover_url.startsWith('/') ? `${siteUrl}${article.cover_url}` : article.cover_url;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: [coverUrl],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    inLanguage: locale,
    mainEntityOfPage: `${siteUrl}/${locale}/insights/${article.slug}`,
    publisher: {
      '@type': 'Organization',
      name: locale === 'zh-CN' ? '循星科技' : 'SidebyStar',
      url: siteUrl,
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <section className="relative overflow-hidden pb-16 pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative max-w-5xl">
          <Link href="/insights" className="btn-link mb-9">
            <ArrowLeft size={14} /> {t('backToInsights')}
          </Link>
          <div className="max-w-4xl">
            <span className="eyebrow">{t('articleEyebrow')}</span>
            <h1 className="mt-6 text-display-xl text-balance text-white">{article.title}</h1>
            <p className="mt-6 max-w-3xl text-body-lg text-ink-300">{article.summary}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-caption text-ink-500">
              <time dateTime={article.published_at}>
                {t('published')} {formatDate(article.published_at, locale)}
              </time>
              {article.updated_at !== article.published_at ? (
                <time dateTime={article.updated_at}>
                  {t('updated')} {formatDate(article.updated_at, locale)}
                </time>
              ) : null}
            </div>
          </div>
          <figure className="group relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula">
            <InsightCover src={article.cover_url} alt={article.title} priority />
          </figure>
        </div>
      </section>

      <section className="pb-section-lg pt-8">
        <div className="container-page max-w-3xl">
          <div
            className="insight-prose"
            dangerouslySetInnerHTML={{ __html: article.body_html }}
          />
          <div className="divider-soft mt-16" />
          <Link href="/insights" className="btn-link mt-10">
            <ArrowLeft size={14} /> {t('backToInsights')}
          </Link>
        </div>
      </section>
    </article>
  );
}
