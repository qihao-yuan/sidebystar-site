import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeAssistantExperience } from '@/components/home/HomeAssistantExperience';
import { HomeProductLines } from '@/components/home/HomeProductLines';
import { HomeNightCare } from '@/components/home/HomeNightCare';
import { HomePlatform } from '@/components/home/HomePlatform';
import { HomeCTA } from '@/components/home/HomeCTA';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { systemName } from '@/content/product-names';

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
        ? `${systemName(locale)} · 个人生活助手与产品家族`
        : `${systemName(locale)} · Personal life assistant and product family`,
    description:
      locale === 'zh-CN'
        ? `了解${systemName(locale)}与七大产品系列，查看实际操作、原厂选配、生活情境影片与产品手册。`
        : `Explore ${systemName(locale)} and its seven product series through actual operation recordings, manufacturer options, concept stories and the product handbook.`,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <HomeAssistantExperience locale={locale} />
      <HomeProductLines />
      <HomeNightCare />
      <HomePlatform />
      <HomeCTA />
    </>
  );
}
