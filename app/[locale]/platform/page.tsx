import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { TextReveal } from '@/components/motion/TextReveal';
import { Reveal } from '@/components/motion/Reveal';
import { ArchTraversal } from '@/components/platform/ArchTraversal';
import { HomeCTA } from '@/components/home/HomeCTA';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Database, Cpu, Network, Boxes, ShieldCheck, Radar, Sparkles, Moon, Scale } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.platform' });
  return buildMetadata({ locale, path: '/platform', title: t('title'), description: t('subtitle') });
}

const layers = [
  { icon: Radar, zh: 'L1 · 当下的样子', en: 'L1 · The moment', desc: { zh: '谁在哪个房间, 现在亮着哪些灯, 此刻的温度与光线', en: 'Who is in which room, what is on, how the air and light feel right now' } },
  { icon: Cpu, zh: 'L1 · 这一刻的节奏', en: 'L1 · The flow', desc: { zh: '空间在如何变化, 谁的作息在偏离日常', en: 'How the space is shifting, whose rhythm is drifting from usual' } },
  { icon: Database, zh: 'L2 · 长期的习惯', en: 'L2 · The habits', desc: { zh: '晚上几点会关这盏灯, 周末更喜欢哪种光', en: 'When that lamp usually goes off, which lighting feels like weekend' } },
  { icon: Boxes, zh: 'L3 · 你的意图', en: 'L3 · The intent', desc: { zh: '你想要什么, 为什么想要, 下一步大概会怎么做', en: 'What you want, why you want it, what likely comes next' } },
];

const engines = [
  {
    icon: Sparkles,
    nameZh: '星璇',
    nameEn: 'StarWeave',
    titleZh: '感知融合',
    titleEn: 'Perception Fusion',
    descZh: '处理视觉、语音、传感器和空间事件,把多模态信号融合成一份完整的空间感知。',
    descEn: 'Processes vision, voice, sensors and spatial events, fusing multimodal signals into one coherent perception of the space.',
  },
  {
    icon: Moon,
    nameZh: '望舒',
    nameEn: 'MoonGuide',
    titleZh: '四层记忆',
    titleEn: 'Four-Layer Memory',
    descZh: '包含 L0 静态、L1 动态、L2 习惯、L3 语义四层,让系统从被动响应走向理解习惯、主动建议。',
    descEn: 'A four-layer stack across L0 static, L1 live, L2 habit, L3 semantic, moving the system from reactive replies to understanding habits and proactive suggestions.',
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
              {isZh ? '平台\n就是操作系统' : 'The platform is an operating system.'}
            </TextReveal>
          </h1>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-300">
              {isZh
                ? '一个本地运行的智能内核。它能感知, 能记忆, 能思考, 每一步都留下可查的痕迹, 也能被第三方继续扩展。'
                : 'A local intelligence kernel. It senses, remembers, reasons -- leaves an auditable trace at every step, and stays open for third parties to extend.'}
            </p>
          </Reveal>
        </div>

        {/* principles */}
        <div className="container-page mt-16 grid grid-cols-1 gap-6 border-y border-white/5 py-8 md:grid-cols-3">
          {[
            { zh: '本地推理', en: 'On-device inference', subZh: '默认配置不外发', subEn: 'No outbound by default' },
            { zh: '断网可用', en: 'Offline-capable', subZh: '关键能力不依赖云', subEn: 'Critical paths free of cloud' },
            { zh: '可审计', en: 'Auditable', subZh: '每一次判断都留痕', subEn: 'Every decision, traced' },
          ].map((it) => (
            <div key={it.en} className="text-center">
              <div className="font-display text-display-sm text-white">{isZh ? it.zh : it.en}</div>
              <div className="mt-2 text-caption text-ink-400">{isZh ? it.subZh : it.subEn}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Three Engines · 星璇 / 望舒 / 曜衡 */}
      <section className="py-section-lg">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">Three Engines</span>
            <h2 className="mt-4 text-display-lg text-white">
              {isZh ? '星璇感知 · 望舒记忆 · 曜衡决策' : 'StarWeave senses · MoonGuide remembers · YaoHeng decides'}
            </h2>
            <p className="mt-4 max-w-2xl text-body text-ink-300">
              {isZh
                ? 'AIOS 的核心不是单个模型,而是三台协作引擎 —— 星璇负责感知融合,望舒负责记忆体系,曜衡负责置信度决策,共同支撑空间的感知、记忆与判断。'
                : 'The core of AIOS is not a single model. It is three cooperating engines — StarWeave for perception fusion, MoonGuide for the memory stack, YaoHeng for confidence-based decisions — together supporting how the space perceives, remembers, and judges.'}
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
              {isZh ? '望舒 MoonGuide · 真正记得你的记忆' : 'MoonGuide · Memory that remembers you'}
            </h2>
            <p className="mt-4 max-w-2xl text-body text-ink-300">
              {isZh
                ? '从眼前这一刻, 到经年累月的习惯, 一层一层积累。它不是把所有事情存下来, 而是把"你是谁、你想要什么"一点点理解清楚。'
                : 'From the immediate moment to years of habit, one layer at a time. It is not storage. It is understanding, slowly, who you are and what you mean.'}
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
                  {isZh ? '留下可查的痕迹' : 'Every step, traceable'}
                </h2>
                <p className="mt-4 text-body-lg text-ink-200">
                  {isZh
                    ? 'AI 的每一次思考、每一次执行、每一条规则变动, 都像账本一样留下一行。家属可以看到老人昨夜的情况, 管理员可以回放一周前的判断, 监管方可以导出所需的那部分 —— 不多, 不少。'
                    : 'Every thought, every action, every rule change leaves a line, like a ledger. Family members see last night. Managers replay last week. Regulators export exactly what they are owed -- no more, no less.'}
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
                <div className="pt-2 text-brand-halo">{isZh ? '// 每一行都无法被悄悄改写' : '// every line is append-only'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeCTA />
    </>
  );
}
