import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeEra } from '@/components/home/HomeEra';
import { HomeProductLines } from '@/components/home/HomeProductLines';
import { HomeSpectrum } from '@/components/home/HomeSpectrum';
import { HomeNightCare } from '@/components/home/HomeNightCare';
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
    title:
      locale === 'zh-CN'
        ? '循星科技 AIOS · 真实空间的本地智能内核 | AIOS Care · AIOS Home'
        : 'SidebyStar AIOS · A Local Intelligence Kernel for Real Spaces | AIOS Care & AIOS Home',
    description:
      locale === 'zh-CN'
        ? '循星科技 AIOS · 一个本地智能内核, 两条产品方向。AIOS Care 面向养老与机构, 解决安全、效率与可追溯; AIOS Home 面向家庭与高端住宅, 提供懂我、懂家与长期记忆。'
        : 'SidebyStar AIOS — one local intelligence kernel, two product lines. AIOS Care for facilities and care: safety, efficiency and a chain of evidence. AIOS Home for households and high-end residences: understanding, the home, and long-term memory.',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <HomeEra />
      <HomeProductLines />
      <HomeNightCare />
      <HomeIntelligence />
      <HomeSpectrum />
      <HomeVision />
      <HomePlatform />
      <HomeTrust />
      <HomeCTA />
    </>
  );
}
