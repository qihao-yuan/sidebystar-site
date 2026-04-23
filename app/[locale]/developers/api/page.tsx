import { setRequestLocale } from 'next-intl/server';
import { Reveal } from '@/components/motion/Reveal';

const endpointGroups = [
  { tag: 'Facts', color: 'text-brand-halo', endpoints: ['GET /api/v1/facts/devices', 'GET /api/v1/facts/rooms', 'GET /api/v1/facts/capabilities', 'POST /api/v1/facts/refresh'] },
  { tag: 'Memory', color: 'text-brand-aurora', endpoints: ['GET /api/v1/memory/habits', 'GET /api/v1/memory/semantic', 'POST /api/v1/memory/causal/query'] },
  { tag: 'Skills', color: 'text-brand-stardust', endpoints: ['POST /api/v1/skills/draft', 'POST /api/v1/skills/approve', 'POST /api/v1/skills/shadow', 'POST /api/v1/skills/live'] },
  { tag: 'Audit', color: 'text-state-success', endpoints: ['GET /api/v1/audit/ledger', 'GET /api/v1/audit/report', 'POST /api/v1/audit/export'] },
  { tag: 'Federation', color: 'text-state-warn', endpoints: ['POST /api/v1/federation/bundle/sign', 'GET /api/v1/federation/bundle/subscribe', 'POST /api/v1/federation/bundle/import'] },
];

export default async function ApiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';

  return (
    <section className="pt-32 pb-section-lg">
      <div className="container-page">
        <span className="eyebrow">OpenAPI v1</span>
        <h1 className="mt-4 text-display-xl text-white">67 {isZh ? '个稳定端点' : 'stable endpoints'}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-300">
          {isZh
            ? '每一个 v1 端点都有契约测试保护, 内部模块重构不会破坏它。'
            : 'Every v1 endpoint is contract-tested. Internal refactors will not break it.'}
        </p>

        <div className="mt-14 space-y-5">
          {endpointGroups.map((g, i) => (
            <Reveal key={g.tag} delay={i * 60}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-display-sm text-white">{g.tag}</h3>
                  <span className={`font-mono text-caption ${g.color}`}>{g.endpoints.length} endpoints</span>
                </div>
                <ul className="grid gap-2 font-mono text-caption text-ink-200 md:grid-cols-2">
                  {g.endpoints.map((e) => (
                    <li key={e} className="rounded-lg border border-white/5 bg-surface-void/40 px-4 py-3">{e}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
