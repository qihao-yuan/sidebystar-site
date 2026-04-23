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
      body: '视觉 + 毫米波 + 红外 + 声音 + 环境五源融合。50ms 事件触发, FactBase 白名单路由决定让哪个能力处理哪一类事件。',
      bullets: ['Matter 1.3 / HA / MQTT 接入', '本地流式处理 ROI', '感知级隐私蒙板'],
    },
    {
      icon: Brain,
      eyebrow: 'Stage 02',
      title: isZh ? '记忆 Memory' : 'Memory',
      body: 'L0 静态设备 / L1 动态状态 / L2 习惯行为 / L3 语义意图,四层并行工作。因果图谱让推理可以 why 到根因。',
      bullets: ['FactBase 统一事实源', '四层分层记忆', 'Causal Memory Graph'],
    },
    {
      icon: Sparkles,
      eyebrow: 'Stage 03',
      title: isZh ? '推理 Reasoning' : 'Reasoning',
      body: '端侧 LLM + 组合技能审批链。每一次调用走 draft -> approve -> shadow -> live,所有中间态写入 hash-chain。',
      bullets: ['组合技能审批链', '影子执行 + 灰度', 'AuditLedger 不可篡改'],
    },
    {
      icon: Share2,
      eyebrow: 'Stage 04',
      title: isZh ? '联邦 Federation' : 'Federation',
      body: '画像以 bundle 为单位签名交换。机构间可订阅跌倒模型, 也可导出本地模型供合作方使用。',
      bullets: ['画像 bundle 签名交换', '多站点 RBAC', '零知识审计规划'],
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
