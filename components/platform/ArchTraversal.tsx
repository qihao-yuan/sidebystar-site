'use client';

import { Eye, Brain, Sparkles, Share2 } from 'lucide-react';
import { ScrollPinSection } from '@/components/motion/ScrollPinSection';
import { cn } from '@/lib/cn';
import { useLocale } from 'next-intl';

export function ArchTraversal() {
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

  const panels = [
    {
      icon: Eye,
      eyebrow: 'Stage 01',
      title: isZh ? '感知 Sensing' : 'Sensing',
      body: isZh
        ? '五种感官同时在线 —— 眼睛、耳朵、温度、光线、距离。像人一样整体感知空间, 而不是靠一只摄像头。隐私敏感的部位, 在进入系统之前就被遮住。'
        : 'Five senses, in parallel -- eyes, ears, temperature, light, distance. It takes in the whole room, not a single camera feed. Private parts get masked before anything else sees them.',
      bullets: isZh
        ? ['兼容主流生态, 不强迫换品牌', '所有感知都在本地完成', '关键部位自动打马赛克']
        : ['Works with mainstream ecosystems, no forced rip-and-replace', 'All sensing stays on-device', 'Sensitive areas auto-masked'],
    },
    {
      icon: Brain,
      eyebrow: 'Stage 02',
      title: isZh ? '记忆 Memory' : 'Memory',
      body: isZh
        ? '从当下的感受到长期的习惯, 系统一层一层真正记住你 —— 谁在哪个房间、这周谁作息变了、最近一个月你更爱哪种光。'
        : 'From the moment to the long-term, it builds up real memory -- who is in which room, whose rhythm shifted this week, which lighting you have favored lately.',
      bullets: isZh
        ? ['从当下到长期, 分层记住', '不只记"发生了什么", 还记"为什么"', '所有记忆只属于你家']
        : ['Layered memory, from now to habits', 'Not only what happened, but why', 'Memory never leaves your home'],
    },
    {
      icon: Sparkles,
      eyebrow: 'Stage 03',
      title: isZh ? '推理 Reasoning' : 'Reasoning',
      body: isZh
        ? '一个本地运行的大脑, 在你家里思考。每一次它想做点什么, 都先预演再执行, 留下可查的痕迹, 家属与管理员随时能回放。'
        : 'A local brain, thinking inside your home. Every action gets rehearsed before it runs, and leaves behind a trace anyone with permission can replay.',
      bullets: isZh
        ? ['风险动作先审批再执行', '先"演一遍"再真做', '留下的痕迹无法被悄悄改写']
        : ['High-risk actions need approval', 'Shadow runs before live', 'Traces cannot be quietly rewritten'],
    },
    {
      icon: Share2,
      eyebrow: 'Stage 04',
      title: isZh ? '联邦 Federation' : 'Federation',
      body: isZh
        ? '一家机构积累下来的经验, 可以分享给另一家, 却不泄露具体的个人信息。每一个家、每一座社区, 共同生长。'
        : 'Experience learned at one site can be shared with another -- without sharing the people behind it. Every home and every community grow together.',
      bullets: isZh
        ? ['经验可共享, 隐私不共享', '多个站点可以统一管理', '家属也能看到自己该看的']
        : ['Share experience, not identities', 'Unified management across sites', 'Families see what they are meant to see'],
    },
  ];

  return (
    <section className="relative">
      <div className="container-page pb-8 pt-20">
        <span className="eyebrow">Architecture Traversal</span>
        <h2 className="mt-4 text-display-xl text-balance text-white">
          Sense &middot; Remember &middot; Reason &middot; Federate.
        </h2>
      </div>

      <ScrollPinSection panels={panels.length}>
        {(progress, index) => (
          <div className="container-page grid w-full gap-10 lg:grid-cols-5 lg:items-center">
            {/* visual column */}
            <div className="relative lg:col-span-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula">
                <div className="absolute inset-0 bg-mesh-hero opacity-50" />
                <div className="absolute inset-0 grid-faint opacity-25" />
                {panels.map((p, i) => {
                  const Active = p.icon;
                  const active = i === index;
                  return (
                    <div
                      key={i}
                      className={cn(
                        'absolute inset-0 flex items-center justify-center transition-all duration-700 ease-apple-out',
                        active ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      )}
                    >
                      <Active size={220} className="text-white/90" strokeWidth={0.8} />
                    </div>
                  );
                })}
                {/* stage indicators */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                  {panels.map((p, i) => (
                    <div key={i} className="flex-1">
                      <div className={cn('h-0.5 w-full rounded-full transition-colors', i <= index ? 'bg-brand-halo' : 'bg-white/10')} />
                      <div className={cn('mt-2 text-caption transition-colors', i === index ? 'text-white' : 'text-ink-500')}>
                        {p.eyebrow}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* text column */}
            <div className="relative min-h-[320px] lg:col-span-2">
              {panels.map((p, i) => (
                <div
                  key={i}
                  className={cn(
                    'absolute inset-0 transition-all duration-700 ease-apple-out',
                    i === index ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-6'
                  )}
                >
                  <span className="eyebrow">{p.eyebrow}</span>
                  <h3 className="mt-3 text-display-lg text-white">{p.title}</h3>
                  <p className="mt-5 text-body-lg text-ink-300">{p.body}</p>
                  <ul className="mt-6 space-y-2">
                    {p.bullets.map((b) => (
                      <li key={b} className="text-caption text-ink-200">
                        <span className="text-brand-halo">·</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollPinSection>
    </section>
  );
}
