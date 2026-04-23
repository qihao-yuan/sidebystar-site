import { setRequestLocale } from 'next-intl/server';
import { Reveal } from '@/components/motion/Reveal';
import { BookOpen, Layers, ShieldCheck, GitBranch } from 'lucide-react';

export default async function DocsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';

  const sections = [
    {
      icon: Layers,
      title: isZh ? '架构总览' : 'Architecture',
      items: ['ARCHITECTURE.md', 'PRODUCT_OVERVIEW.md', 'DELIVERY_CAPABILITY.md'],
    },
    {
      icon: BookOpen,
      title: isZh ? '能力与协议' : 'Capabilities & Protocols',
      items: ['openapi-v1.json', 'PLUGIN_MANIFEST.md', 'CAUSAL_MEMORY.md', 'FEDERATION.md'],
    },
    {
      icon: ShieldCheck,
      title: isZh ? '安全与合规' : 'Security & Compliance',
      items: ['NETWORK_GUARD.md', 'AUDIT_LEDGER.md', 'RBAC.md', 'COMPLIANCE_MAP.md'],
    },
    {
      icon: GitBranch,
      title: isZh ? '发布与贡献' : 'Releases & Contrib',
      items: ['CHANGELOG.md', 'RELEASE_NOTES_v3.2.md', 'CONTRIBUTING.md', 'LICENSE'],
    },
  ];

  return (
    <section className="pt-32 pb-section-lg">
      <div className="container-page">
        <span className="eyebrow">Docs</span>
        <h1 className="mt-4 text-display-xl text-white">{isZh ? '技术文档' : 'Technical Documentation'}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-300">
          {isZh
            ? '所有文档以 markdown 为源, 支持 PR 提交。开源仓库同步镜像。'
            : 'All documents are markdown-sourced, accept PRs, and are mirrored in the open-source repo.'}
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="card-vision h-full">
                <s.icon size={28} className="text-brand-halo" />
                <h3 className="mt-5 text-display-sm text-white">{s.title}</h3>
                <ul className="mt-4 space-y-2 font-mono text-caption text-ink-300">
                  {s.items.map((it) => (
                    <li key={it}>· {it}</li>
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
