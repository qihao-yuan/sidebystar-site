import { setRequestLocale } from 'next-intl/server';
import { Reveal } from '@/components/motion/Reveal';

const plugins = [
  { name: 'matter-bridge', zh: 'Matter 1.3 桥接', en: 'Matter 1.3 bridge', status: 'stable' },
  { name: 'homeassistant-sync', zh: 'Home Assistant 同步', en: 'Home Assistant sync', status: 'stable' },
  { name: 'mqtt-hub', zh: 'MQTT 总线接入', en: 'MQTT hub', status: 'stable' },
  { name: 'mcp-bridge', zh: 'MCP 工具桥接', en: 'MCP tool bridge', status: 'beta' },
  { name: 'clinical-his-adapter', zh: 'HIS 接入适配器', en: 'HIS adapter', status: 'enterprise' },
  { name: 'fed-bundle-signer', zh: '画像 bundle 签名器', en: 'Federated bundle signer', status: 'beta' },
];

const statusColor: Record<string, string> = {
  stable: 'bg-state-success/15 text-state-success border-state-success/30',
  beta: 'bg-state-warn/15 text-state-warn border-state-warn/30',
  enterprise: 'bg-brand-stardust/15 text-brand-stardust border-brand-stardust/30',
};

export default async function PluginsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';

  return (
    <section className="pt-32 pb-section-lg">
      <div className="container-page">
        <span className="eyebrow">Plugins</span>
        <h1 className="mt-4 text-display-xl text-white">{isZh ? '插件生态' : 'Plugin Ecosystem'}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-300">
          {isZh
            ? '基于 PluginManifest 规范, 三档授权: stable / beta / enterprise。'
            : 'Built on the PluginManifest spec. Three tiers: stable, beta, enterprise.'}
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {plugins.map((p, i) => (
            <Reveal key={p.name} delay={i * 40}>
              <div className="card-vision flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-body text-white">{p.name}</div>
                  <p className="mt-1 text-caption text-ink-300">{isZh ? p.zh : p.en}</p>
                </div>
                <span className={`rounded-pill border px-3 py-1 text-caption uppercase ${statusColor[p.status]}`}>
                  {p.status}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
