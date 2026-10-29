import { setRequestLocale } from 'next-intl/server';
import { PremiumHome } from '@/components/home/PremiumHome';
import { buildMetadata } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = { themeColor: '#f4f5f7' };

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
        ? '循星 AIOS · 个人生活与家庭智能系统'
        : 'SidebyStar AIOS · Personal Life and Home Intelligence',
    description:
      locale === 'zh-CN'
        ? '保存交代、安排日常、连接家中设备。探索循星 AIOS 的日常交互、产品体系与生活场景。'
        : 'Keep your notes, organize everyday tasks and connect home devices. Explore SidebyStar AIOS products, interactive examples and life at home.',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PremiumHome />
  );
}
