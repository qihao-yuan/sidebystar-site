import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL ?? 'https://sidebystar.com';

export function buildMetadata({
  title,
  description,
  locale,
  path = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  images,
}: {
  title: string;
  description: string;
  locale: 'zh-CN' | 'en';
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  images?: string[];
}): Metadata {
  const fullTitle = title.includes('SidebyStar') || title.includes('循星') ? title : `${title} | ${locale === 'zh-CN' ? '循星科技' : 'SidebyStar'}`;
  const url = `${siteUrl}/${locale}${path}`;
  const absoluteImages = images?.map((image) => image.startsWith('/') ? `${siteUrl}${image}` : image);
  const openGraph: Metadata['openGraph'] = type === 'article'
    ? {
        title: fullTitle,
        description,
        url,
        siteName: locale === 'zh-CN' ? '循星科技' : 'SidebyStar',
        locale,
        type: 'article',
        publishedTime,
        modifiedTime,
        images: absoluteImages,
      }
    : {
        title: fullTitle,
        description,
        url,
        siteName: locale === 'zh-CN' ? '循星科技' : 'SidebyStar',
        locale,
        type: 'website',
        images: absoluteImages,
      };

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
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: absoluteImages,
    },
  };
}
