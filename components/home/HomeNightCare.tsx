import { UnifiedVisualImage } from '@/components/media/UnifiedVisualImage';
import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { visuals } from '@/content/product-visuals';

// A proposed care configuration replaces the former simulated dispatch timeline.
export async function HomeNightCare() {
  const locale = await getLocale();
  const isZh = locale === 'zh-CN';
  return <section id="night-care" className="py-section-lg"><div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
    <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/10 bg-[#edf2f4]"><UnifiedVisualImage visual={visuals.presence} locale={locale} sizes="(min-width:1024px) 50vw,100vw"/></div>
    <div><span className="eyebrow">{isZh?'AIOS Care · 适配与现场验证':'AIOS Care · Integration and site validation'}</span><h2 className="mt-4 text-display-lg text-white">{isZh?'照护空间，从状态提醒与人工处置开始':'Care environments: state reminders and human response'}</h2><p className="mt-5 text-body text-ink-300">{isZh?'围绕夜间活动、持续静止和辅助呼叫，评估传感设备、原厂呼叫系统与人员受理流程。检测效果和联动范围通过具体设备与现场试点确认。':'Evaluate sensing devices, original-manufacturer call systems and staff response around nighttime activity, sustained stillness and assistance calls. Detection and action scope are established with specific equipment and a site pilot.'}</p><p className="mt-4 text-caption text-ink-400">{isZh?'当前为照护适配方案；软件事件处置记录与真实设备、外部通知分别验证。':'A care integration proposal. Software event handling, physical devices and external notifications are validated separately.'}</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/solutions/elderly-care" className="btn-primary">{isZh?'查看照护配置':'Explore care configurations'} <ArrowRight size={15}/></Link><Link href="/contact" className="btn-ghost">{isZh?'讨论现场需求':'Discuss site requirements'}</Link></div></div>
  </div></section>;
}
