import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { Reveal } from '@/components/motion/Reveal';
import { ContactForm } from '@/components/forms/ContactForm';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({ locale, path: '/contact', title: t('title'), description: t('subtitle') });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <section className="relative overflow-hidden pb-section-lg pt-32">
      <GradientMesh variant="soft" />
      <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <Reveal><span className="eyebrow">Contact</span></Reveal>
          <h1 className="mt-6 text-display-xl text-white">{t('title')}</h1>
          <p className="mt-5 max-w-lg text-body-lg text-ink-300">{t('subtitle')}</p>
          <div className="mt-10 space-y-3 text-body text-ink-200">
            <p>+86 155 6820 0088</p>
            <p>contact@sidebystar.com</p>
            <p className="text-caption text-ink-400">
              {locale === 'zh-CN'
                ? '中国浙江省杭州市萧山区杭州湾信息港 E 座'
                : 'Block E, Hangzhou Bay Information Port, Xiaoshan, Hangzhou, China'}
            </p>
          </div>
        </div>
        <Reveal delay={120}>
          <div className="rounded-3xl border border-white/10 bg-surface-nebula/60 p-8 backdrop-blur">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
