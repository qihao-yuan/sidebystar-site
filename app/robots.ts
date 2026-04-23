import type { MetadataRoute } from 'next';

const siteUrl = process.env.SITE_URL ?? 'https://sidebystar.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api', '/zh-CN/labs', '/en/labs'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
