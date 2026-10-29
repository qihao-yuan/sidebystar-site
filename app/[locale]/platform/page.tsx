import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { Reveal } from '@/components/motion/Reveal';
import { ArchTraversal } from '@/components/platform/ArchTraversal';
import { HomeCTA } from '@/components/home/HomeCTA';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Database, Cpu, Boxes, ShieldCheck, Radar, Sparkles, Moon, Scale } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.platform' });
  return buildMetadata({ locale, path: '/platform', title: t('title'), description: t('subtitle') });
}

const layers = [
  {
    icon: Boxes,
    zh: 'L0 · 静态事实',
    en: 'L0 · Static facts',
    desc: {
      zh: '房间与设备拓扑、归属与命名等变化慢的信息, 是每次查询与控制的起点。',
      en: 'Rooms, device topology, ownership, and labels -- slow to change, yet the anchor for every query and control path.',
    },
  },
  {
    icon: Radar,
    zh: 'L1 · 动态状态',
    en: 'L1 · Live state',
    desc: {
      zh: '房间占用、设备状态、温湿度与照度等实时信息，随现场事件更新。',
      en: 'Occupancy, device state, temperature, humidity and light, updated from site events.',
    },
  },
  {
    icon: Database,
    zh: 'L2 · 习惯模式',
    en: 'L2 · Habits',
    desc: {
      zh: '从重复事件中形成的时间规律与场景偏好，用于规则建议与异常判断。',
      en: 'Time patterns and scene preferences derived from recurring events for rule suggestions and anomaly detection.',
    },
  },
  {
    icon: Cpu,
    zh: 'L3 · 语义与意图',
    en: 'L3 · Semantics & intent',
    desc: {
      zh: '将自然语言目标、上下文与长期偏好转为可检索、可引用的结构化信息。',
      en: 'Converts natural-language goals, context and long-term preferences into retrievable, referenceable information.',
    },
  },
];

const engines = [
  {
    icon: Sparkles,
    nameZh: '星璇',
    nameEn: 'StarWeave',
    titleZh: '感知融合',
    titleEn: 'Perception Fusion',
    descZh: '接入语音、传感器与空间事件，完成信号对齐、状态识别和事件输出。',
    descEn: 'Ingests voice, sensor and spatial events for signal alignment, state recognition and event output.',
  },
  {
    icon: Moon,
    nameZh: '望舒',
    nameEn: 'MoonGuide',
    titleZh: '四层记忆',
    titleEn: 'Four-Layer Memory',
    descZh: '按静态事实、动态状态、习惯模式和语义信息分层管理现场上下文。',
    descEn: 'Organizes site context across static facts, live state, habit patterns and semantic information.',
  },
  {
    icon: Scale,
    nameZh: '曜衡',
    nameEn: 'YaoHeng',
    titleZh: '置信度决策',
    titleEn: 'Confidence-based Decision',
    descZh: '融合多源证据并给出置信度,作为后续行为决策的依据,而非由单一模型直接执行。',
    descEn: 'Fuses multi-source evidence with a confidence score, used as the basis for downstream action — never a single model executing on its own.',
  },
];

const deploymentLayers = [
  {
    id: '01',
    zh: '设备与传感器',
    en: 'Devices & sensors',
    bodyZh: '照明、环境、门锁、呼叫与现场传感器通过项目适配器接入。',
    bodyEn: 'Lighting, climate, locks, calls and site sensors connect through project adapters.',
  },
  {
    id: '02',
    zh: 'AIOS 边缘节点',
    en: 'AIOS edge node',
    bodyZh: '保存现场状态，执行规则、设备控制和审计写入。',
    bodyEn: 'Maintains site state and runs rules, device control and audit writes.',
  },
  {
    id: '03',
    zh: '管理与用户端',
    en: 'Management & user apps',
    bodyZh: '按站点、角色和空间范围提供配置、事件与状态视图。',
    bodyEn: 'Provides configuration, event and status views by site, role and space.',
  },
  {
    id: '04',
    zh: '可选外部服务',
    en: 'Optional external services',
    bodyZh: '远程通知、模型服务与第三方接口按项目授权启用。',
    bodyEn: 'Remote notifications, model services and third-party APIs are enabled per project.',
  },
];

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh-CN';

  return (
    <>
      {/* Hero */}
      <section className="pb-20 pt-32">
        <div className="container-page">
          <Reveal><span className="eyebrow">AIOS Platform</span></Reveal>
          <Reveal delay={60}>
            <h1 className="mt-6 max-w-4xl text-display-xl text-balance text-white">
              {isZh ? '本地智能系统平台' : 'A local intelligence system platform'}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl text-body-lg text-ink-300">
              {isZh
                ? '为助手软件、状态记录和经验证的设备接入提供部署结构。以下为平台能力设计，具体接口与现场联动按项目验证。'
                : 'A deployment structure for assistant software, state records and verified device integration. The following describes platform design; interfaces and site actions require project validation.'}
            </p>
          </Reveal>
        </div>

        {/* principles */}
        <div className="container-page mt-16 grid grid-cols-1 gap-6 border-y border-white/5 py-8 md:grid-cols-3">
          {[
            { zh: '本地部署方向', en: 'Local deployment', subZh: '模型与外部服务按配置确认', subEn: 'Models and external services scoped per configuration' },
            { zh: '设备逐项适配', en: 'Verified integration', subZh: '按型号与现场条件验证', subEn: 'Validate each model and site condition' },
            { zh: '记录可核对', en: 'Reviewable records', subZh: '当前事项与选择可查看', subEn: 'Review current tasks and choices' },
          ].map((it) => (
            <div key={it.en} className="text-center">
              <div className="font-display text-display-sm text-white">{isZh ? it.zh : it.en}</div>
              <div className="mt-2 text-caption text-ink-400">{isZh ? it.subZh : it.subEn}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Deployment Architecture</span>
            <h2 className="mt-4 text-display-lg text-white">
              {isZh ? '四层部署结构' : 'Four-layer deployment'}
            </h2>
            <p className="mt-4 max-w-2xl text-body text-ink-300">
              {isZh
                ? '现场节点是运行中心，外部服务保持可选。设备范围和接口在项目确认阶段固定。'
                : 'The on-site node is the runtime center; external services remain optional. Device and interface scope is fixed during project confirmation.'}
            </p>
          </Reveal>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {deploymentLayers.map((layer, i) => (
              <Reveal key={layer.id} delay={i * 50}>
                <div className="grid gap-3 py-6 md:grid-cols-[4rem_1fr_2fr] md:items-baseline">
                  <span className="font-mono text-caption text-ink-500">{layer.id}</span>
                  <h3 className="text-body-lg text-white">{isZh ? layer.zh : layer.en}</h3>
                  <p className="text-body text-ink-300">{isZh ? layer.bodyZh : layer.bodyEn}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              [isZh ? '运行位置' : 'Runtime', isZh ? '站点边缘节点' : 'On-site edge node'],
              [isZh ? '断网策略' : 'Offline policy', isZh ? '已配置规则继续执行' : 'Configured rules continue'],
              [isZh ? '记录输出' : 'Record output', 'JSONL / CSV / PDF'],
            ].map(([label, value]) => (
              <div key={label} className="bg-surface-void p-6">
                <div className="text-caption uppercase tracking-wide text-ink-500">{label}</div>
                <div className="mt-2 text-body text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-lg">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Core Modules</span>
            <h2 className="mt-4 text-display-lg text-white">
              {isZh ? '输入、上下文与决策' : 'Input, context and decision'}
            </h2>
            <p className="mt-4 max-w-2xl text-body text-ink-300">
              {isZh
                ? '三个独立模块分别处理多源事件、现场上下文和执行条件，通过明确接口组成完整控制链路。'
                : 'Three independent modules handle multi-source events, site context and execution conditions through defined interfaces.'}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {engines.map((e, i) => (
              <Reveal key={e.nameEn} delay={i * 80}>
                <div className="card-vision h-full">
                  <e.icon size={28} className="text-brand-halo" />
                  <h3 className="mt-5 text-display-sm text-white">
                    {isZh ? `${e.nameZh} ${e.nameEn}` : e.nameEn}
                  </h3>
                  <div className="mt-1 text-caption uppercase tracking-wide text-ink-500">
                    {isZh ? e.titleZh : e.titleEn}
                  </div>
                  <p className="mt-4 text-body text-ink-300">{isZh ? e.descZh : e.descEn}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture traversal */}
      <ArchTraversal />

      {/* Memory Stack · 望舒 MoonGuide */}
      <section className="py-section-lg">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">MoonGuide · Four-Layer Memory</span>
            <h2 className="mt-4 text-display-lg text-white">
              {isZh ? '望舒 MoonGuide · 四层上下文' : 'MoonGuide · Four-layer context'}
            </h2>
            <p className="mt-4 max-w-2xl text-body text-ink-300">
              {isZh
                ? '按更新频率和数据性质分层保存现场信息，规则与决策只读取所需范围。'
                : 'Site information is separated by update frequency and data type; rules and decisions read only the required scope.'}
            </p>
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
                <div className="mt-5 text-caption uppercase tracking-wide text-ink-500">AuditLedger</div>
                <h2 className="mt-2 text-display-lg text-white">
                  {isZh ? '结构化审计记录' : 'Structured audit records'}
                </h2>
                <p className="mt-4 text-body-lg text-ink-200">
                  {isZh
                    ? '规则变更、判断依据与执行结果写入审计记录，并按角色权限查询或导出。'
                    : 'Rule changes, decision evidence and execution results are written to audit records for role-based review and export.'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-surface-void/60 p-6 font-mono text-caption text-ink-200">
                <div className="flex justify-between border-b border-white/5 pb-2 text-ink-500">
                  <span>{isZh ? '记录 · 示例 SAMPLE' : 'entry · SAMPLE'}</span>
                  <span>{isZh ? '可查的痕迹' : 'trace'}</span>
                </div>
                {[
                  { zh: '昨夜 03:12', en: 'last night 03:12' },
                  { zh: '昨夜 03:14', en: 'last night 03:14' },
                  { zh: '昨夜 03:15', en: 'last night 03:15' },
                  { zh: '今早 06:30', en: 'this morning 06:30' },
                  { zh: '今早 06:31', en: 'this morning 06:31' },
                ].map((b, i) => {
                  const actions = isZh
                    ? ['老人起身走向卫生间', '走廊灯亮起, 10% 柔光', '门口门磁触发', '日光模式, 逐段亮起', '厨房就绪, 水壶提示']
                    : ['Resident rose, walking to bathroom', 'Hallway light raised to 10% warm', 'Doorway contact triggered', 'Daylight scene, ramped in', 'Kitchen ready, kettle nudge'];
                  return (
                    <div key={i} className="flex justify-between gap-4 border-b border-white/5 py-1.5">
                      <span className="text-brand-halo whitespace-nowrap">{isZh ? b.zh : b.en}</span>
                      <span className="text-right">{actions[i]}</span>
                    </div>
                  );
                })}
                <div className="pt-2 text-brand-halo">{isZh ? '// 结构化审计可追踪、可导出, 对接运维与合规' : '// structured audit trail, traceable and exportable'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
