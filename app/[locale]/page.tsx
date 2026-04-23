import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeEra } from '@/components/home/HomeEra';
import { HomeSpectrum } from '@/components/home/HomeSpectrum';
import { HomeIntelligence } from '@/components/home/HomeIntelligence';
import { HomeVision } from '@/components/home/HomeVision';
import { HomePlatform } from '@/components/home/HomePlatform';
import { HomeTrust } from '@/components/home/HomeTrust';
import { HomeCTA } from '@/components/home/HomeCTA';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/',
    title: locale === 'zh-CN' ? '循星科技 · 环境智能时代的本地操作系统' : 'SidebyStar · Ambient Intelligence OS',
    description:
      locale === 'zh-CN'
        ? '循星科技正在构建环境智能时代的本地操作系统 —— 让每一个你所在的空间,都拥有属于自己的智能内核。'
        : 'SidebyStar is building the local OS for the ambient intelligence era -- giving every space you are in, an intelligence kernel of its own.',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <HomeEra />
      <HomeSpectrum />
      <HomeIntelligence />
      <HomeVision />
      <HomePlatform />
      <HomeTrust />
      <HomeCTA />
    </>
  );
}
