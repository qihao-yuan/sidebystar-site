import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL ?? 'https://sidebystar.com';

export function buildMetadata({
  title,
  description,
  locale,
  path = '/',
}: {
  title: string;
  description: string;
  locale: 'zh-CN' | 'en';
  path?: string;
}): Metadata {
  const fullTitle = title.includes('SidebyStar') || title.includes('循星') ? title : `${title} | ${locale === 'zh-CN' ? '循星科技' : 'SidebyStar'}`;
  const url = `${siteUrl}/${locale}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': `${siteUrl}/zh-CN${path}`,
        en: `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: locale === 'zh-CN' ? '循星科技' : 'SidebyStar',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
