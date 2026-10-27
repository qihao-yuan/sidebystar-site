import type { MetadataRoute } from 'next';
import { solutions } from '@/content/solutions';
import { cases } from '@/content/cases';
import { plugins } from '@/content/plugins';
import { getAllArticlesForSitemap } from '@/lib/aios-content';

const siteUrl = process.env.SITE_URL ?? 'https://sidebystar.com';
const locales = ['zh-CN', 'en'] as const;

const staticPaths = [
  '',
  '/products',
  '/system',
  '/solutions',
  '/platform',
  '/plugins',
  '/intelligence',
  '/trust',
  '/research',
  '/insights',
  '/developers',
  '/developers/docs',
  '/developers/api',
  '/developers/plugins',
  '/cases',
  '/pilot',
  '/contact',
  '/company/about',
  '/company/partners',
  '/privacy',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${p}`,
        changeFrequency: p === '' ? 'weekly' : 'monthly',
        priority: p === '' ? 1 : 0.7,
      });
    }
    for (const s of solutions) {
      if (s.planned) continue;
      entries.push({
        url: `${siteUrl}/${locale}/solutions/${s.slug}`,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
    for (const c of cases) {
      entries.push({
        url: `${siteUrl}/${locale}/cases/${c.slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
    for (const p of plugins) {
      if (p.stage === 'roadmap') continue;
      entries.push({
        url: `${siteUrl}/${locale}/plugins/${p.slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
      if (p.manifest) {
        entries.push({
          url: `${siteUrl}/${locale}/developers/plugins/${p.slug}`,
          changeFrequency: 'monthly',
          priority: 0.5,
        });
      }
    }

    const articles = await getAllArticlesForSitemap(locale);
    for (const article of articles) {
      entries.push({
        url: `${siteUrl}/${locale}/insights/${article.slug}`,
        lastModified: new Date(article.updated_at),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
