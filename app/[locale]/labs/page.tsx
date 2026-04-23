import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Beaker } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'labs' });
  return buildMetadata({ locale, path: '/labs', title: t('title'), description: t('subtitle') });
}

export default async function LabsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('labs');
  const isZh = locale === 'zh-CN';

  const items = ['MBTI Playground', 'Ferris Wheel', 'Product Test', 'Info Yuanqh'];

  return (
    <section className="pt-32 pb-section-lg">
      <div className="container-page max-w-3xl">
        <div className="flex items-center gap-3"><Beaker size={22} className="text-brand-halo" /><span className="eyebrow">Labs</span></div>
        <h1 className="mt-4 text-display-xl text-white">{t('title')}</h1>
        <p className="mt-4 text-body-lg text-ink-300">{t('subtitle')}</p>

        <div className="mt-14 space-y-3">
          {items.map((it) => (
            <div key={it} className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-4 text-body text-ink-200">
              {it}
              <span className="ml-3 text-caption text-ink-500">— {isZh ? '已归档 / 不再维护' : 'archived / no longer maintained'}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
