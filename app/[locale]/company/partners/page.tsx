import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'company.partners' });
  return buildMetadata({ locale, path: '/company/partners', title: t('title'), description: t('subtitle') });
}

// AIOS 默认能跑在哪些公开协议/生态上 - 这是「兼容」而非「合作」, 放在这里只是技术声明
const compatibility = [
  {
    name: { zh: 'Matter', en: 'Matter' },
    desc: { zh: '跨品牌设备互操作的公开协议', en: 'Public cross-brand device interoperability protocol' },
  },
  {
    name: { zh: 'Home Assistant', en: 'Home Assistant' },
    desc: { zh: '开源智能家居生态', en: 'Open-source smart-home ecosystem' },
  },
  {
    name: { zh: 'MQTT', en: 'MQTT' },
    desc: { zh: '物联网消息层标准', en: 'IoT messaging standard' },
  },
];

const partnerTypes = [
  {
    name: { zh: '硬件与设备', en: 'Hardware & devices' },
    desc: { zh: '计算模组、传感器、控制器与设备协议适配。', en: 'Compute modules, sensors, controllers and protocol adapters.' },
  },
  {
    name: { zh: '方案与交付', en: 'Solutions & delivery' },
    desc: { zh: '住宅、照护机构与医院项目集成。', en: 'Integration for residential, care and hospital projects.' },
  },
  {
    name: { zh: '研究与开发', en: 'Research & development' },
    desc: { zh: '端侧模型、数据治理与插件开发。', en: 'Edge models, data governance and plugin development.' },
  },
];

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('company.partners');
  const isZh = locale === 'zh-CN';
  return (
    <section className="pt-32 pb-section-lg">
      <div className="container-page">
        <span className="eyebrow">Partners</span>
        <h1 className="mt-4 text-display-xl text-white">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>

        <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {partnerTypes.map((item, i) => (
            <Reveal key={item.name.en} delay={i * 50}>
              <div className="grid gap-3 py-7 md:grid-cols-[4rem_1fr_2fr] md:items-baseline">
                <span className="font-mono text-caption text-ink-500">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="text-body-lg text-white">{isZh ? item.name.zh : item.name.en}</h2>
                <p className="text-body text-ink-300">{isZh ? item.desc.zh : item.desc.en}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-section">
          <Reveal>
            <span className="eyebrow">Compatibility</span>
            <h2 className="mt-4 text-display-md text-white">
              {isZh ? '兼容生态' : 'Compatible ecosystems'}
            </h2>
            <p className="mt-3 max-w-2xl text-caption text-ink-400">
              {isZh
                ? '兼容性声明不代表合作或背书。'
                : 'Compatibility does not imply partnership or endorsement.'}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {compatibility.map((c, i) => (
              <Reveal key={c.name.en} delay={i * 50}>
                <div className="card-vision">
                  <div className="text-body-lg text-white">{isZh ? c.name.zh : c.name.en}</div>
                  <p className="mt-1 text-caption text-ink-300">{isZh ? c.desc.zh : c.desc.en}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
