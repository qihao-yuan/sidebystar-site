import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeAssistantExperience } from '@/components/home/HomeAssistantExperience';
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
        ? '循星科技 AIOS · 个人生活助手与家庭设备协同系统'
        : 'SidebyStar AIOS · Personal Life Assistant and Connected Living',
    description:
      locale === 'zh-CN'
        ? '了解AIOS助手软件、本地计算主机、房间终端和原厂设备选配，查看实际软件操作、生活情境影片与产品手册。'
        : 'Explore AIOS assistant software, local compute, room devices and original-manufacturer options through software recordings, concept stories and the product handbook.',
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
