import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/motion/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ArrowRight, Check, X } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cases' });
  return buildMetadata({ locale, path: '/cases', title: t('title'), description: t('subtitle') });
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('cases');

  const fitItems = ['fit1', 'fit2', 'fit3', 'fit4'] as const;
  const provideItems = ['provide1', 'provide2', 'provide3', 'provide4'] as const;
  const notProvideItems = ['notProvide1', 'notProvide2', 'notProvide3'] as const;

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative max-w-4xl">
          <Reveal>
            <span className="eyebrow">Pilot Program</span>
          </Reveal>
          <h1 className="mt-6 text-display-2xl text-balance text-white">
            <TextReveal stagger={70}>{t('heroTitle')}</TextReveal>
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('heroBody')}</p>
          </Reveal>
        </div>
      </section>

      {/* fit profile */}
      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <span className="eyebrow">{t('fitEyebrow')}</span>
              <h2 className="mt-4 text-display-md text-white">{t('fitTitle')}</h2>
              <p className="mt-3 max-w-md text-body text-ink-300">{t('fitSubtitle')}</p>
            </div>
            <div className="md:col-span-2">
              <ul className="space-y-4">
                {fitItems.map((k) => (
                  <li key={k} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <Check size={18} className="mt-1 shrink-0 text-brand-halo" />
                    <span className="text-body text-ink-100">{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* what we provide */}
      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-surface-nebula/40 p-8 md:p-10">
              <span className="eyebrow">{t('provideEyebrow')}</span>
              <h3 className="mt-4 text-display-sm text-white">{t('provideTitle')}</h3>
              <ul className="mt-6 space-y-3">
                {provideItems.map((k) => (
                  <li key={k} className="flex items-start gap-3 text-body text-ink-200">
                    <Check size={16} className="mt-1 shrink-0 text-brand-halo" />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <span className="eyebrow">{t('notProvideEyebrow')}</span>
              <h3 className="mt-4 text-display-sm text-white">{t('notProvideTitle')}</h3>
              <ul className="mt-6 space-y-3">
                {notProvideItems.map((k) => (
                  <li key={k} className="flex items-start gap-3 text-body text-ink-200">
                    <X size={16} className="mt-1 shrink-0 text-ink-400" />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* honest promise */}
      <section className="py-section">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="text-body-lg text-ink-300">{t('promise')}</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-lg">
        <div className="container-page text-center">
          <MagneticButton href="/pilot" variant="primary">
            {t('ctaPrimary')} <ArrowRight size={16} />
          </MagneticButton>
          <div className="mt-4">
            <Link href="/contact" className="btn-link">
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
