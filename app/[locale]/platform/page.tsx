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
  { icon: Radar, zh: '当下的样子', en: 'The moment', desc: { zh: '谁在哪个房间, 现在亮着哪些灯, 此刻的温度与光线', en: 'Who is in which room, what is on, how the air and light feel right now' } },
  { icon: Cpu, zh: '这一刻的节奏', en: 'The flow', desc: { zh: '空间在如何变化, 谁的作息在偏离日常', en: 'How the space is shifting, whose rhythm is drifting from usual' } },
  { icon: Database, zh: '长期的习惯', en: 'The habits', desc: { zh: '晚上几点会关这盏灯, 周末更喜欢哪种光', en: 'When that lamp usually goes off, which lighting feels like weekend' } },
  { icon: Boxes, zh: '你的意图', en: 'The intent', desc: { zh: '你想要什么, 为什么想要, 下一步大概会怎么做', en: 'What you want, why you want it, what likely comes next' } },
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
                ? '一个本地运行的智能内核。它能感知, 能记忆, 能思考, 每一步都留下可查的痕迹, 也能被第三方继续扩展。'
                : 'A local intelligence kernel. It senses, remembers, reasons -- leaves an auditable trace at every step, and stays open for third parties to extend.'}
            </p>
          </Reveal>
        </div>

        {/* stats */}
        <div className="container-page mt-16 grid grid-cols-2 gap-6 border-y border-white/5 py-8 md:grid-cols-4">
          {[
            { v: 5, s: '', l: isZh ? '种感知' : 'Senses' },
            { v: 4, s: '', l: isZh ? '层记忆' : 'Memory Layers' },
            { v: 50, s: 'ms', l: isZh ? '级响应' : 'Response' },
            { v: 100, s: '%', l: isZh ? '本地' : 'On-device' },
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
            <h2 className="mt-4 text-display-lg text-white">{isZh ? '真正记得你的记忆' : 'Memory that remembers you'}</h2>
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
                <h2 className="mt-5 text-display-lg text-white">
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
                  <span>{isZh ? '记录' : 'entry'}</span><span>{isZh ? '可查的痕迹' : 'trace'}</span>
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
