import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/motion/Reveal';
import team from '@/content/team.json';
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

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('company.partners');
  const isZh = locale === 'zh-CN';
  const partners = team.partners as Array<{ name: { zh: string; en: string }; desc: { zh: string; en: string } }>;

  return (
    <section className="pt-32 pb-section-lg">
      <div className="container-page">
        <span className="eyebrow">Partners</span>
        <h1 className="mt-4 text-display-xl text-white">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>

        {/* Real partners section - only renders when there are signed partners */}
        {partners.length > 0 ? (
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => (
              <Reveal key={p.name.en} delay={i * 50}>
                <div className="card-vision flex items-center justify-between">
                  <div>
                    <div className="text-body-lg text-white">{isZh ? p.name.zh : p.name.en}</div>
                    <p className="mt-1 text-caption text-ink-300">{isZh ? p.desc.zh : p.desc.en}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.04]" />
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mt-16 rounded-3xl border border-white/10 bg-surface-nebula/40 p-10 md:p-16">
              <div className="max-w-2xl">
                <p className="text-display-sm text-white">
                  {isZh
                    ? '我们暂时不在网站上公开合作方。'
                    : 'We are not publishing any partners on this site yet.'}
                </p>
                <p className="mt-5 text-body text-ink-300">
                  {isZh
                    ? '与硬件厂商、设备生态、机构客户、学术单位之间正在进行的合作, 在双方签字前不会以「合作伙伴」的形式出现在这里。等合作真正成形, 这一栏会逐条贴出, 含双方核对过的合作范围。'
                    : 'Conversations with hardware vendors, device ecosystems, care operators and academic groups are ongoing -- but none will appear here as a "partner" before both sides sign. When a partnership is real, it will be listed here, with the scope agreed by both sides.'}
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Compatibility (not partners) - public protocols / open ecosystems we run on */}
        <div className="mt-section">
          <Reveal>
            <span className="eyebrow">Compatibility</span>
            <h2 className="mt-4 text-display-md text-white">
              {isZh ? '我们能跑在哪些公开生态上' : 'Public ecosystems we run on'}
            </h2>
            <p className="mt-3 max-w-2xl text-caption text-ink-400">
              {isZh
                ? '以下为公开协议与开源生态, 列在这里只是说明 AIOS 的兼容性, 不构成合作或背书关系。'
                : 'These are public protocols and open-source ecosystems. Listed here only to indicate AIOS compatibility -- not a partnership or endorsement.'}
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
