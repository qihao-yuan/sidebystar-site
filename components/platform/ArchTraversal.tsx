'use client';

import { Eye, Brain, Sparkles, Scale, Share2 } from 'lucide-react';
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
        ? '多条感知通道并行 —— 视觉、听觉、温湿度、光线与传感器事件。像人一样读整间屋子, 而不是押注单路视频。是否启用视觉、是否留存, 由本地策略与审计配置约束; 状态回答尽量走设备与传感器 grounding。'
        : 'Multiple channels in parallel -- vision, sound, temperature, light, and sensor events. It reads the whole room, not a single video stream. Whether vision runs, and what is stored, follow on-site policy and audit settings; answers about state are grounded in devices and sensors.',
      bullets: isZh
        ? ['兼容主流生态, 不强迫换品牌', '关键链路默认本地处理、可配置是否出网', '查询类回答对齐真实数据源, 关键数值不凭空生成']
        : ['Works with mainstream ecosystems, no forced rip-and-replace', 'Critical paths stay local, with optional cloud toggles', 'Query answers are grounded in real sources, not invented figures'],
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
        ? ['风险动作先审批再执行', '先"演一遍"再真做', '结构化留痕, 可按权限回放与导出']
        : ['High-risk actions need approval', 'Shadow runs before live', 'Structured traces for replay and export under policy'],
    },
    {
      icon: Scale,
      eyebrow: 'Stage 04',
      title: isZh ? '决策 Decision' : 'Decision',
      body: isZh
        ? '推理列出所有可能, 决策才落到一个动作 —— 本地的"耀衡"按证据强度、风险大小、你家的规矩给每个候选打分, 然后把"为什么是它"一起留下来。'
        : 'Reasoning lists what could happen; a decision lands on what does. The local YaoHeng engine scores each candidate by evidence, risk, and the rules of your house -- and keeps the why next to the choice.',
      bullets: isZh
        ? ['每个动作都带置信度与风险等级', '拿不准的事情停一拍, 等你点头', '"选了什么、为什么选" 都能回看']
        : ['Every action ships with confidence and risk', 'When unsure, it pauses and asks', 'Both the choice and the reason are replayable'],
    },
    {
      icon: Share2,
      eyebrow: 'Stage 05',
      title: isZh ? '联邦 Federation' : 'Federation',
      body: isZh
        ? '行业与站点画像可打成经签名校验的离线包, 在站点间导入导出; 不自动落库, 管理员预览后再显式写入事实库与审计。个人身份与敏感明细不随包外流。'
        : 'Industry and site profiles move as offline, verifiable bundles between sites; imports preview first, then an admin explicitly applies them to the fact base and audit log. Identities and sensitive detail stay behind.',
      bullets: isZh
        ? ['离线 bundle + 校验, 适合气隙与合规拷贝', '多站点可对齐规则与画像, 不共享住户级明细', '权限与导出范围可按角色裁剪 (如家属视图)']
        : ['Offline bundles and checksums for air-gapped or controlled copy', 'Align rules and profiles across sites without resident-level payloads', 'RBAC-style views -- families see what policy allows'],
    },
  ];

  return (
    <section className="relative">
      <div className="container-page pb-8 pt-20">
        <span className="eyebrow">Architecture Traversal</span>
        <h2 className="mt-4 text-display-xl text-balance text-white">
          Sense &middot; Remember &middot; Reason &middot; Decide &middot; Federate.
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
