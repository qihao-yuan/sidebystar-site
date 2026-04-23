import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return buildMetadata({ locale, path: '/privacy', title: t('title'), description: t('subtitle') });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');
  const isZh = locale === 'zh-CN';

  const sections = [
    {
      title: isZh ? '我们收集什么' : 'What we collect',
      body: isZh
        ? '只收集让空间智能系统正常工作所必需的最小数据。除非用户明确授权, 视频与生理流数据不会离开设备。'
        : 'Only the minimum necessary for spatial intelligence to work. Unless the user explicitly authorizes, video and biometric streams never leave the device.',
    },
    {
      title: isZh ? '数据在哪里' : 'Where data lives',
      body: isZh
        ? '默认所有数据在本地盒子和本地存储中。仅在用户明确选择"家属远程可视"或"机构接入"时, 受限的元事件通过端到端加密链路上行。'
        : 'By default, all data lives on the local box and local storage. Only when a user explicitly opts into family remote view or facility access, restricted meta events are sent over end-to-end encrypted links.',
    },
    {
      title: isZh ? '我们不做什么' : 'What we never do',
      body: isZh
        ? '我们不会把您的画像或音视频数据卖给第三方, 不会用来训练通用大模型, 也不会用来精准广告投放。'
        : 'We will never sell your profile, audio, or video data to third parties. We will not use it to train general-purpose foundation models or to target ads.',
    },
    {
      title: isZh ? '审计与可追溯' : 'Audit & Traceability',
      body: isZh
        ? '所有涉及数据访问的决策都通过 AuditLedger hash-chain 记录, 用户与机构可随时请求导出并核验。'
        : 'Every decision involving data access is logged in the AuditLedger hash-chain. Users and institutions can request and verify an export at any time.',
    },
  ];

  return (
    <section className="pt-32 pb-section-lg">
      <div className="container-page max-w-3xl">
        <span className="eyebrow">Privacy</span>
        <h1 className="mt-4 text-display-xl text-white">{t('title')}</h1>
        <p className="mt-4 text-body-lg text-ink-300">{t('subtitle')}</p>

        <div className="mt-14 space-y-10">
          {sections.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div>
                <h2 className="text-display-sm text-white">{s.title}</h2>
                <p className="mt-3 text-body-lg text-ink-300">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
