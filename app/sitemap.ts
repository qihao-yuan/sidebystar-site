import type { MetadataRoute } from 'next';
import { solutions } from '@/content/solutions';
import { cases } from '@/content/cases';

const siteUrl = process.env.SITE_URL ?? 'https://sidebystar.com';
const locales = ['zh-CN', 'en'] as const;

const staticPaths = [
  '',
  '/solutions',
  '/intelligence',
  '/products',
  '/platform',
  '/trust',
  '/research',
  '/developers',
  '/developers/docs',
  '/developers/api',
  '/developers/plugins',
  '/cases',
  '/pilot',
  '/contact',
  '/company/about',
  '/company/team',
  '/company/partners',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
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
  }

  return entries;
}
