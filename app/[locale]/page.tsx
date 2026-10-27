import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeProductLines } from '@/components/home/HomeProductLines';
import { HomeNightCare } from '@/components/home/HomeNightCare';
import { HomePlatform } from '@/components/home/HomePlatform';
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
        ? '循星科技 AIOS 面向照护机构与住宅，提供本地设备接入、规则执行、现场控制与审计记录。'
        : 'SidebyStar AIOS provides local device integration, rule execution, on-site control and audit records for care facilities and residences.',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <HomeProductLines />
      <HomeNightCare />
      <HomePlatform />
      <HomeCTA />
    </>
  );
}
