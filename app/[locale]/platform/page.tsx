import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { NumberTicker } from '@/components/motion/NumberTicker';
import { ArchTraversal } from '@/components/platform/ArchTraversal';
import { HomeCTA } from '@/components/home/HomeCTA';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Database, Cpu, Network, Boxes, ShieldCheck, Radar } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.platform' });
  return buildMetadata({ locale, path: '/platform', title: t('title'), description: t('subtitle') });
}

const layers = [
  { icon: Radar, zh: 'L0 静态事实', en: 'L0 Static Facts', desc: { zh: '设备、能力、房间、规则', en: 'Devices, capabilities, rooms, rules' } },
  { icon: Cpu, zh: 'L1 动态状态', en: 'L1 Dynamic State', desc: { zh: '传感器实时流、行为事件', en: 'Sensor streams, behavior events' } },
  { icon: Database, zh: 'L2 习惯记忆', en: 'L2 Habit Memory', desc: { zh: '30 天建模、时段偏好', en: '30d modeling, temporal preference' } },
  { icon: Boxes, zh: 'L3 语义意图', en: 'L3 Semantic Intent', desc: { zh: '目标、动机、因果图', en: 'Goals, motivation, causal graph' } },
];

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-32">
        <GradientMesh variant="hero" />
        <div className="container-page relative text-center">
          <Reveal><span className="eyebrow">AIOS Platform</span></Reveal>
          <h1 className="mt-6 text-display-2xl text-balance text-white">
            <TextReveal stagger={60}>
              {isZh ? '平台即操作系统。' : 'The platform is an operating system.'}
            </TextReveal>
          </h1>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-300">
              {isZh
                ? '225 个后端模块、112 个 REST 端点、67 个稳定 v1 API、55 分钟完整体检。所有能力从 FactBase 渲染, 所有决策写入 AuditLedger hash-chain。'
                : '225 backend modules, 112 REST endpoints, 67 stable v1 APIs, 55-minute full health check. All capabilities render from FactBase. Every decision is written to an AuditLedger hash-chain.'}
            </p>
          </Reveal>
        </div>

        {/* stats */}
        <div className="container-page mt-16 grid grid-cols-2 gap-6 border-y border-white/5 py-8 md:grid-cols-4">
          {[
            { v: 225, s: '', l: 'Modules' },
            { v: 112, s: '', l: 'REST' },
            { v: 67, s: '', l: 'v1 APIs' },
            { v: 55, s: 'min', l: 'Health Check' },
          ].map((it) => (
            <div key={it.l} className="text-center">
              <div className="font-display text-display-md text-white"><NumberTicker value={it.v} suffix={it.s} /></div>
              <div className="mt-1 text-caption text-ink-400">{it.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture traversal */}
      <ArchTraversal />

      {/* Memory Stack */}
      <section className="py-section-lg">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Four-Layer Memory</span>
            <h2 className="mt-4 text-display-lg text-white">{isZh ? '四层记忆栈' : 'Memory Stack'}</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {layers.map((l, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="card-vision h-full">
                  <l.icon size={28} className="text-brand-halo" />
                  <h3 className="mt-5 text-display-sm text-white">{isZh ? l.zh : l.en}</h3>
                  <p className="mt-2 text-caption text-ink-300">{isZh ? l.desc.zh : l.desc.en}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AuditLedger */}
      <section className="py-section">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-10 md:p-16">
            <GradientMesh variant="soft" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <ShieldCheck size={32} className="text-brand-halo" />
                <h2 className="mt-5 text-display-lg text-white">
                  {isZh ? 'AuditLedger hash-chain' : 'AuditLedger hash-chain'}
                </h2>
                <p className="mt-4 text-body-lg text-ink-200">
                  {isZh
                    ? '每次 LLM 调用、每次执行、每次规则变更都串入不可篡改的 hash-chain。可直接导出等保 2.0、HIPAA-like 的映射报表。'
                    : 'Every LLM call, every execution, every rule change is linked into an append-only hash-chain with direct export of MLPS 2.0 and HIPAA-like mappings.'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-surface-void/60 p-6 font-mono text-caption text-ink-200">
                <div className="flex justify-between border-b border-white/5 pb-2 text-ink-500">
                  <span>block</span><span>sha256 hash (truncated)</span>
                </div>
                {['#001', '#002', '#003', '#004', '#005'].map((b, i) => (
                  <div key={b} className="flex justify-between border-b border-white/5 py-1.5">
                    <span className="text-brand-halo">{b}</span>
                    <span>0x{(7 - i).toString(16).padStart(2, '0')}a4{(i * 17).toString(16)}e2...fd{i}</span>
                  </div>
                ))}
                <div className="pt-2 text-brand-halo">{'// append-only. verified.'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
