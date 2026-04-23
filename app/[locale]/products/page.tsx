import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ProductHero } from '@/components/products/ProductHero';
import { SkuShowcase } from '@/components/products/SkuShowcase';
import { SkuCompare } from '@/components/products/SkuCompare';
import { HomeCTA } from '@/components/home/HomeCTA';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  return buildMetadata({ locale, path: '/products', title: t('title'), description: t('subtitle') });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProductHero />
      <SkuShowcase />
      <SkuCompare />
      <HomeCTA />
    </>
  );
}
