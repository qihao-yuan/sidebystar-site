import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/motion/Reveal';
import { MediaPlaceholder } from '@/components/media/MediaPlaceholder';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

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

  const facts = [
    { labelZh: '所在地', labelEn: 'Based in', valueZh: '杭州 · 萧山', valueEn: 'Xiaoshan, Hangzhou' },
    { labelZh: '产品线', labelEn: 'Product lines', valueZh: 'AIOS Care / AIOS Home', valueEn: 'AIOS Care / AIOS Home' },
    { labelZh: '部署方式', labelEn: 'Deployment', valueZh: '本地设备与私有化部署', valueEn: 'Local devices and on-premises' },
    { labelZh: '服务对象', labelEn: 'For', valueZh: '家庭、照护机构与集成伙伴', valueEn: 'Homes, care sites and integrators' },
  ];

  const principles = [
    {
      zh: '以现场约束定义产品',
      en: 'Designed around site constraints',
      body: {
        zh: '设备协议、网络条件、安装方式与运维流程在方案阶段一并确认。',
        en: 'Device protocols, network conditions, installation and operations are confirmed during solution design.',
      },
    },
    {
      zh: '关键能力本地运行',
      en: 'Critical functions run locally',
      body: {
        zh: '基础感知、规则判断与设备控制不以公网连接为前提。',
        en: 'Core sensing, rule evaluation and device control do not depend on a public internet connection.',
      },
    },
    {
      zh: '交付过程可检查',
      en: 'Delivery remains inspectable',
      body: {
        zh: '范围、权限、规则与验收项形成记录，便于复核与后续维护。',
        en: 'Scope, permissions, rules and acceptance criteria are recorded for review and maintenance.',
      },
    },
  ];

  return (
    <>
      <section className="pb-section pt-32">
        <div className="container-page grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-end">
          <div>
            <Reveal><span className="eyebrow">About SidebyStar</span></Reveal>
            <Reveal delay={60}>
              <h1 className="mt-6 text-display-xl text-balance text-white">{t('title')}</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-body-lg text-ink-300">{t('subtitle')}</p>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <MediaPlaceholder
              src="/company/about-workbench.jpg"
              alt={isZh ? '循星产品研发工作台' : 'SidebyStar product engineering workbench'}
              ratio="4/3"
              rounded="xl"
            />
          </Reveal>
        </div>
      </section>

      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
            <Reveal>
              <div>
                <span className="eyebrow">Company</span>
                <h2 className="mt-4 text-display-lg text-white">
                  {isZh ? '围绕现场交付的产品团队' : 'A product team built around field delivery'}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className="max-w-2xl text-body-lg text-ink-300">
                {isZh
                  ? '杭州循星科技有限公司研发 AIOS 本地智能系统及配套硬件，面向住宅与照护场景提供方案设计、设备接入、现场部署和运行维护。'
                  : 'SidebyStar develops the AIOS local intelligence system and supporting hardware, covering solution design, device integration, on-site deployment and operations for residential and care environments.'}
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.labelEn} className="bg-surface-void p-6">
                <div className="text-caption uppercase tracking-wide text-ink-500">{isZh ? fact.labelZh : fact.labelEn}</div>
                <div className="mt-3 text-body text-white">{isZh ? fact.valueZh : fact.valueEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="container-page grid gap-10 lg:grid-cols-[5fr_7fr]">
          <Reveal>
            <div>
              <span className="eyebrow">Engineering Principles</span>
              <h2 className="mt-4 text-display-lg text-white">{isZh ? '工程原则' : 'How we work'}</h2>
            </div>
          </Reveal>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {principles.map((p, i) => (
              <Reveal key={p.en} delay={i * 50}>
                <div className="grid gap-3 py-7 sm:grid-cols-[2rem_1fr_1.5fr]">
                  <span className="font-mono text-caption text-ink-500">0{i + 1}</span>
                  <h3 className="text-body-lg text-white">{isZh ? p.zh : p.en}</h3>
                  <p className="text-body text-ink-300">{isZh ? p.body.zh : p.body.en}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-lg">
        <div className="container-page flex flex-col gap-8 border-t border-white/10 pt-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Company</span>
            <h2 className="mt-4 text-display-md text-white">{isZh ? '合作伙伴' : 'Partnerships'}</h2>
            <p className="mt-3 max-w-2xl text-body text-ink-300">
              {isZh ? '查看合作方式与联系入口。' : 'View partnership models and contact channels.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/company/partners" className="btn-primary">
              {isZh ? '查看合作伙伴' : 'View partners'} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
