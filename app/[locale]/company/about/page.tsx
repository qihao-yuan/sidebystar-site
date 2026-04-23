import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { MapPin, Users, Sparkles, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'company.about' });
  return buildMetadata({ locale, path: '/company/about', title: t('title'), description: t('subtitle') });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('company.about');
  const isZh = locale === 'zh-CN';

  const principles = [
    { icon: MapPin, zh: '空间优先', en: 'Space First', body: { zh: '人不住在手机里,人住在空间里', en: 'People don\'t live in phones. They live in spaces.' } },
    { icon: Users, zh: '本地优先', en: 'Local First', body: { zh: '数据是用户的,不是我们的', en: 'Data belongs to the user, not to us.' } },
    { icon: Sparkles, zh: '前瞻即诚实', en: 'Vision Needs Evidence', body: { zh: '每一条愿景都链到技术证据', en: 'Every vision links to concrete technical evidence.' } },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="hero" />
        <div className="container-page relative max-w-4xl">
          <Reveal><span className="eyebrow">About</span></Reveal>
          <h1 className="mt-6 text-display-2xl text-balance text-white">
            <TextReveal stagger={60}>{t('title')}</TextReveal>
          </h1>
          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-section">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card-vision h-full">
                <p.icon size={28} className="text-brand-halo" />
                <h3 className="mt-5 text-display-sm text-white">{isZh ? p.zh : p.en}</h3>
                <p className="mt-3 text-body text-ink-300">{isZh ? p.body.zh : p.body.en}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-section-lg">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Next</span>
            <h2 className="mt-4 text-display-lg text-white">{isZh ? '团队 & 合作伙伴' : 'Team & Partners'}</h2>
            <p className="mt-4 text-body-lg text-ink-300">
              {isZh
                ? '工程 · 研究 · 交付 · 运营, 在杭州与外部合作网络共同构建本地优先的空间智能基建。'
                : 'Engineering, research, delivery and operations in Hangzhou, working with external partners to build local-first spatial intelligence infrastructure.'}
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <Link href="/company/team" className="btn-primary">
              Team <ArrowRight size={14} />
            </Link>
            <Link href="/company/partners" className="btn-ghost">
              Partners
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
