import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { CustomerExperience } from '@/components/experience/CustomerExperience';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'zh-CN' | 'en' }> }): Promise<Metadata> {
  const { locale }=await params;
  return buildMetadata({locale,path:'/experience',title:locale==='zh-CN'?'AIOS 应用体验与产品手册':'AIOS software recordings and product handbook',description:locale==='zh-CN'?'查看AIOS实际软件操作、四条生活情境影片，以及内含产品图和视频的独立手册。':'View current AIOS software recordings, four concept stories and a self-contained product handbook with images and videos.'});
}
export default async function ExperiencePage({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;setRequestLocale(locale);const isZh=locale==='zh-CN';
  return <><section className="border-b border-white/5 pb-16 pt-32"><div className="container-page"><span className="eyebrow">{isZh?'产品与应用':'Products and applications'}</span><h1 className="mt-5 max-w-4xl text-display-xl text-white">{isZh?'软件实录、生活影片与产品手册':'Software in use, everyday stories and the product handbook'}</h1><p className="mt-6 max-w-3xl text-body-lg text-ink-300">{isZh?'先看具体任务如何处理，再了解设备配置与生活场景。软件实录、产品设计效果和情境演绎分别标明。':'See how specific tasks are handled, then explore device configurations and everyday scenarios. Software recordings, product design visuals and concept stories are identified separately.'}</p></div></section><CustomerExperience locale={locale}/></>;
}
