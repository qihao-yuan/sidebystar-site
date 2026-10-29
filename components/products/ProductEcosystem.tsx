import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { pickText, productDirections } from '@/content/customer-experience';
import { visuals, type VisualAsset } from '@/content/product-visuals';
import { UnifiedVisualImage } from '@/components/media/UnifiedVisualImage';

const directionVisuals: Record<string, VisualAsset> = {
 host: visuals.host, water: visuals.water, acoustic: visuals.acoustic, radar: visuals.presence,
};

// Different power and installation needs produce different enclosures; OEM options remain OEM.
export function ProductEcosystem({locale}:{locale:string}){
 const isZh=locale==='zh-CN';
 return <section className="border-y border-white/5 bg-white/[0.015] py-section-lg"><div className="container-page">
  <span className="eyebrow">{isZh?'设备与使用方式':'Devices and their uses'}</span><h2 className="mt-4 text-display-lg text-white">{isZh?'不同用途，采用不同产品形态':'Different uses call for different product forms'}</h2><p className="mt-5 max-w-3xl text-body text-ink-300">{isZh?'水浸节点采用电池无线外观；声学与毫米波节点采用无线数据和隐藏低压供电。主机保留所需连接与散热，设备选择按实际用途确认。':'The water-contact design uses replaceable batteries; acoustic and mmWave designs combine wireless data with concealed low-voltage power. The host retains its necessary connections and ventilation.'}</p>
  <div className="mt-10 grid gap-6 md:grid-cols-2">{productDirections.map(p=><article key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-surface-void"><div className="relative aspect-[3/2] overflow-hidden bg-[#edf1f3]"><UnifiedVisualImage visual={directionVisuals[p.id]} locale={locale} sizes="(min-width:768px) 50vw,100vw"/></div><div className="p-7"><span className="text-caption text-brand-halo">{pickText(p.tag,locale)}</span><h3 className="mt-3 text-display-sm text-white">{pickText(p.title,locale)}</h3><p className="mt-4 text-body text-ink-300">{pickText(p.body,locale)}</p></div></article>)}</div>
  <p className="mt-5 text-caption text-ink-400">{isZh?'产品图为依据外观模型生成的设计效果。具体电子配置、检测性能与供货范围按项目确认。':'Product imagery is generated from appearance models. Electronics, sensing performance and supply scope are confirmed for the project.'}</p>
  <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center"><div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/10"><UnifiedVisualImage visual={visuals.options} locale={locale} sizes="(min-width:1024px) 50vw,100vw"/></div><div><span className="eyebrow">{isZh?'原厂设备与安装配套':'Manufacturer devices and installation options'}</span><h3 className="mt-4 text-display-md text-white">{isZh?'床旁、门口与窗帘系统':'Bedside, entrance and curtain systems'}</h3><p className="mt-5 text-body text-ink-300">{isZh?'血压与血氧设备、专业报警器、门铃门锁、窗帘电机与轨道按具体型号选配。保留原厂身份，核对接口、安装条件与日常维护。':'Select measurement and professional alarm devices, doorbells, locks, curtain motors and tracks by their exact model. Retain the manufacturer’s identity and review interfaces, installation and maintenance.'}</p><p className="mt-4 text-caption text-ink-400">{isZh?'图为原厂选配安装示意，非制造商照片或已适配证明。':'An installation illustration for manufacturer options, not a manufacturer photograph or proof of integration.'}</p><Link href="/solutions/smart-home" className="btn-ghost mt-7">{isZh?'查看空间配置':'Explore room configurations'} <ArrowRight size={15}/></Link></div></div>
 </div></section>;
}
