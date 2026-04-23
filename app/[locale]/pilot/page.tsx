import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { Reveal } from '@/components/motion/Reveal';
import { ContactForm } from '@/components/forms/ContactForm';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Calendar, Zap, CheckCircle2 } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pilot' });
  return buildMetadata({ locale, path: '/pilot', title: t('title'), description: t('subtitle') });
}

export default async function PilotPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pilot');
  const isZh = locale === 'zh-CN';

  const phases = [
    { w: '1 week', zh: '需求对齐 + 硬件预装', en: 'Scope alignment + hardware preload' },
    { w: '1-2 weeks', zh: '单房间 / 单楼层现场部署', en: 'Single room / floor on-site deploy' },
    { w: '2-4 weeks', zh: 'KPI 验证 + 数据看板', en: 'KPI validation + metrics dashboard' },
    { w: '+', zh: '结论评审 + 扩展路线', en: 'Review + expansion roadmap' },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative max-w-4xl">
          <Reveal><span className="eyebrow">Pilot</span></Reveal>
          <h1 className="mt-6 text-display-xl text-white">{t('title')}</h1>
          <p className="mt-5 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-section">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal><span className="eyebrow">Timeline</span></Reveal>
            <h2 className="mt-4 text-display-lg text-white">{isZh ? '2 到 4 周跑完一轮' : 'Finish a round in 2 to 4 weeks'}</h2>
            <ul className="mt-10 space-y-5">
              {phases.map((p, i) => (
                <Reveal key={i} delay={i * 60}>
                  <li className="flex gap-5 border-l border-brand-halo/30 pl-5">
                    <div className="font-mono text-caption text-brand-halo pt-1">{p.w}</div>
                    <div className="text-body-lg text-ink-100">{isZh ? p.zh : p.en}</div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="mt-12 grid grid-cols-2 gap-5">
              <div className="card-vision">
                <Calendar size={20} className="text-brand-halo" />
                <h4 className="mt-3 text-body-lg text-white">2-4 weeks</h4>
                <p className="text-caption text-ink-300">{isZh ? '周期' : 'Duration'}</p>
              </div>
              <div className="card-vision">
                <Zap size={20} className="text-brand-halo" />
                <h4 className="mt-3 text-body-lg text-white">{isZh ? '单楼层' : 'Single floor'}</h4>
                <p className="text-caption text-ink-300">{isZh ? '起步规模' : 'Starting scale'}</p>
              </div>
            </div>
          </div>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-white/10 bg-surface-nebula/60 p-8 backdrop-blur">
              <p className="mb-4 flex items-center gap-2 text-caption text-brand-halo">
                <CheckCircle2 size={14} /> {isZh ? '提交后 1 个工作日内联系' : 'Response within 1 business day'}
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
