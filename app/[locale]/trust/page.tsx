import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Users, FileCheck, Layers } from 'lucide-react';
import { HomeCTA } from '@/components/home/HomeCTA';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'trust' });
  return buildMetadata({ locale, path: '/trust', title: t('title'), description: t('subtitle') });
}

export default async function TrustPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('trust');
  const isZh = locale === 'zh-CN';

  const pillars = [
    { icon: Layers, key: 'localFirst' },
    { icon: ShieldCheck, key: 'auditChain' },
    { icon: Users, key: 'rbac' },
    { icon: FileCheck, key: 'compliance' },
  ] as const;

  const networkLayers = [
    { title: isZh ? 'Layer 1 · Application' : 'Layer 1 · Application', body: isZh ? '业务白名单 + 端点签名,外发零例外' : 'Business allowlist + endpoint signature, zero exception' },
    { title: isZh ? 'Layer 2 · Audit' : 'Layer 2 · Audit', body: isZh ? '发包前写入 hash-chain,任何出站都有记录' : 'Write to hash-chain before send, every packet logged' },
    { title: isZh ? 'Layer 3 · Container' : 'Layer 3 · Container', body: isZh ? '命名空间内 egress 只允许白名单 host' : 'Egress from namespace limited to allowlist host' },
    { title: isZh ? 'Layer 4 · Host iptables' : 'Layer 4 · Host iptables', body: isZh ? '主机级防火墙兜底,硬性拒绝' : 'Host-level firewall enforcement, hard deny' },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="hero" />
        <div className="container-page relative max-w-4xl">
          <Reveal><span className="eyebrow">Trust & Compliance</span></Reveal>
          <h1 className="mt-6 text-display-2xl text-balance text-white">
            <TextReveal stagger={60}>
              {isZh ? '每一条决策, 可追溯。' : 'Every decision, traceable.'}
            </TextReveal>
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">{t('subtitle')}</p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.key} delay={i * 60}>
                <div className="card-vision h-full">
                  <p.icon size={28} className="text-brand-halo" />
                  <h3 className="mt-5 text-display-sm text-white">{t(`${p.key}.title`)}</h3>
                  <p className="mt-3 text-body text-ink-300">{t(`${p.key}.body`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Network Lock */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Network Guard</span>
            <h2 className="mt-4 text-display-lg text-white">{isZh ? '四层网络锁' : 'Four-Layer Network Lock'}</h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {networkLayers.map((n, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card-vision h-full">
                  <Lock size={20} className="text-brand-halo" />
                  <h4 className="mt-4 text-display-sm text-white">{n.title}</h4>
                  <p className="mt-3 text-caption text-ink-300">{n.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance mapping */}
      <section className="py-section-lg">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Compliance Mapping</span>
            <h2 className="mt-4 text-display-lg text-white">{isZh ? '合规映射表' : 'Control Point Map'}</h2>
          </Reveal>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03] text-caption uppercase text-ink-300">
                <tr>
                  <th className="px-6 py-4">{isZh ? '控制点' : 'Control Point'}</th>
                  <th className="px-6 py-4">MLPS 2.0 L3</th>
                  <th className="px-6 py-4">HIPAA-like</th>
                  <th className="px-6 py-4">GDPR-like</th>
                </tr>
              </thead>
              <tbody className="text-ink-100">
                {[
                  [isZh ? '审计不可篡改' : 'Tamper-evident audit', '8.1.4.1', '164.312(b)', 'Art.30'],
                  [isZh ? '身份与访问' : 'Identity & Access', '8.1.4.3', '164.308(a)(3)', 'Art.32'],
                  [isZh ? '数据本地化' : 'Data Localization', '8.1.3.5', '164.316', 'Art.44-49'],
                  [isZh ? '最小必要' : 'Minimum Necessary', '8.1.2', '164.502(b)', 'Art.5(1)(c)'],
                  [isZh ? '事件响应' : 'Incident Response', '8.1.10', '164.308(a)(6)', 'Art.33'],
                  [isZh ? '加密传输' : 'Encrypted Transport', '8.1.4.5', '164.312(e)', 'Art.32'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-6 py-4 ${j === 0 ? 'text-white' : 'font-mono text-caption text-ink-300'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
