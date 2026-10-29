// Home-page overview links to recordings; it is not an online interactive assistant.
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { pickText, softwareLoops } from '@/content/customer-experience';

export function HomeAssistantExperience({ locale }: { locale: string }) {
  const isZh = locale === 'zh-CN';
  return <section className="border-y border-white/5 bg-white/[0.015] py-section-lg"><div className="container-page">
    <span className="eyebrow">{isZh ? '现有软件 · 实际操作' : 'Current software · In use'}</span>
    <div className="mt-4 grid gap-6 lg:grid-cols-[5fr_7fr] lg:items-end"><h2 className="text-display-lg text-white">{isZh ? '查看记录、任务与提醒的实际操作' : 'See the software in use'}</h2><p className="max-w-2xl text-body text-ink-300">{isZh ? '保存交代的记录，核对准备清单，继续处理到期建议。通过实际操作录像了解现有软件，再讨论适合自己的配置。' : 'See an explicitly saved note, a preparation checklist and a due suggestion in an actual software recording, then discuss the right configuration for your needs.'}</p></div>
    <div className="mt-10 grid gap-5 md:grid-cols-3">{softwareLoops.map((item,i)=><article key={item.id} className="rounded-2xl border border-white/10 bg-surface-void/40 p-6"><span className="font-mono text-caption text-brand-halo">0{i+1}</span><h3 className="mt-4 text-display-sm text-white">{pickText(item.title,locale)}</h3><p className="mt-3 text-body text-ink-300">{pickText(item.body,locale)}</p></article>)}</div>
    <div className="mt-8 flex flex-wrap gap-3"><Link href="/experience#software" className="btn-primary">{isZh ? '观看操作录像' : 'Watch the software recording'} <ArrowRight size={15}/></Link><Link href="/experience#stories" className="btn-ghost">{isZh ? '观看生活情境影片' : 'Watch the concept stories'}</Link><Link href="/experience#handbook" className="btn-ghost">{isZh ? '下载产品手册' : 'Download the handbook'}</Link></div>
  </div></section>;
}
