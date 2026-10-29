'use client';

import { Eye, Brain, Sparkles, Scale, Share2 } from 'lucide-react';
import { UnifiedVisualImage } from '@/components/media/UnifiedVisualImage';
import { platformVisuals } from '@/content/product-visuals';
import { getSeriesName } from '@/content/product-names';
import { ScrollPinSection } from '@/components/motion/ScrollPinSection';
import { cn } from '@/lib/cn';
import { useLocale } from 'next-intl';

export function ArchTraversal() {
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

  const panels = [
    {
      icon: Eye,
      visual: platformVisuals[0],
      caption: getSeriesName('ceiling',locale) + (isZh ? ' · 设计效果' : ' · Design visualization'),
      eyebrow: 'Stage 01',
      title: isZh ? '输入 Input' : 'Input',
      body: isZh
        ? '接入语音、环境传感器、设备状态与空间事件。采集范围、留存方式和出网策略由现场配置约束。'
        : 'Ingests voice, environmental sensors, device state and spatial events. Collection, retention and network policies are configured on site.',
      bullets: isZh
        ? ['通过适配器接入设备与协议', '关键事件默认本地处理', '状态查询引用现场数据源']
        : ['Adapter-based device and protocol integration', 'Critical events processed locally by default', 'State queries reference on-site data sources'],
    },
    {
      icon: Brain,
      visual: platformVisuals[1],
      caption: isZh ? '实际软件界面 · 示例数据' : 'Current software interface · Example data',
      eyebrow: 'Stage 02',
      title: isZh ? '上下文 Context' : 'Context',
      body: isZh
        ? '按静态事实、实时状态、重复模式与语义信息分层组织现场上下文。'
        : 'Organizes site context across static facts, live state, recurring patterns and semantic information.',
      bullets: isZh
        ? ['不同数据采用独立更新周期', '按规则读取必要范围', '身份与站点数据隔离']
        : ['Independent update cycles by data type', 'Rules read only the required scope', 'Identity and site data are isolated'],
    },
    {
      icon: Sparkles,
      visual: platformVisuals[2],
      caption: isZh ? '实际软件界面 · 示例数据' : 'Current software interface · Example data',
      eyebrow: 'Stage 03',
      title: isZh ? '评估 Evaluation' : 'Evaluation',
      body: isZh
        ? '本地节点根据事件、上下文与规则生成候选动作。高风险动作进入确认流程。'
        : 'The local node generates candidate actions from events, context and rules. High-risk actions enter an approval flow.',
      bullets: isZh
        ? ['规则变更需要授权', '支持模拟执行与结果检查', '输入与候选结果写入记录']
        : ['Rule changes require authorization', 'Supports simulated execution and result checks', 'Inputs and candidate results are recorded'],
    },
    {
      icon: Scale,
      visual: platformVisuals[3],
      caption: isZh ? '原厂窗帘安装示意' : 'OEM curtain installation illustration',
      eyebrow: 'Stage 04',
      title: isZh ? '执行 Execution' : 'Execution',
      body: isZh
        ? '曜衡根据证据强度、风险等级与现场规则选择动作，并将执行结果返回状态系统。'
        : 'YaoHeng selects an action using evidence strength, risk level and site rules, then returns the result to the state system.',
      bullets: isZh
        ? ['动作包含置信度与风险等级', '低置信度时暂停并请求确认', '选择依据与执行结果可查询']
        : ['Actions carry confidence and risk levels', 'Low-confidence actions pause for approval', 'Selection basis and results remain queryable'],
    },
    {
      icon: Share2,
      visual: platformVisuals[4],
      caption: getSeriesName('hub',locale) + (isZh ? ' · 设计效果' : ' · Design visualization'),
      eyebrow: 'Stage 05',
      title: isZh ? '分发 Distribution' : 'Distribution',
      body: isZh
        ? '规则与站点配置可封装为带签名和校验信息的离线包，经管理员预览后导入。'
        : 'Rules and site configurations can be packaged as signed, verifiable offline bundles and imported after administrator review.',
      bullets: isZh
        ? ['适用于隔离网络和受控传输', '多站点复用规则，不包含住户明细', '导入与导出范围按角色授权']
        : ['Suitable for isolated networks and controlled transfer', 'Reuses rules across sites without resident detail', 'Import and export scopes follow role permissions'],
    },
  ];

  return (
    <section className="relative">
      <div className="container-page pb-8 pt-20">
        <span className="eyebrow">Architecture Traversal</span>
        <h2 className="mt-4 text-display-xl text-balance text-white">
          Input &middot; Context &middot; Evaluation &middot; Execution &middot; Distribution.
        </h2>
      </div>

      <ScrollPinSection panels={panels.length}>
        {(progress, index) => (
          <div className="container-page grid w-full gap-10 lg:grid-cols-5 lg:items-center">
            {/* visual column */}
            <div className="relative lg:col-span-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula">
                {panels.map((p, i) => {
                  const active = i === index;
                  return (
                    <div
                      key={i}
                      className={cn(
                        'absolute inset-0 transition-all duration-700 ease-apple-out',
                        active ? 'z-10 opacity-100' : 'z-0 opacity-0'
                      )}
                    >
                      <UnifiedVisualImage
                        visual={p.visual}
                        locale={locale}
                        sizes="(min-width: 1024px) 60vw, 100vw"
                      />
                      {p.visual.kind !== 'software-demo' && <div className="absolute inset-0 bg-gradient-to-t from-surface-void/75 via-transparent to-transparent" />}
                    </div>
                  );
                })}
                {/* stage indicators */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center gap-3 rounded-lg bg-surface-void/85 p-3">
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
              <p className="mt-3 text-caption text-ink-400">{panels[index].caption}</p>
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
