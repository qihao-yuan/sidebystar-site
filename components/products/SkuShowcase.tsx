'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { skus } from '@/content/products';
import { getFamilyMember } from '@/content/family';
import { getSolution } from '@/content/solutions';
import { ArrowRight } from 'lucide-react';
import { getPackageName } from '@/content/product-names';

// These are solution groupings, not photographs or specifications of three completed hosts.
export function SkuShowcase() {
  const t=useTranslations('products');const ti=useTranslations('solutions.items');const locale=useLocale();const isZh=locale==='zh-CN';
  return <section className="py-section"><div className="container-page">
    <div className="mb-8"><span className="eyebrow">{isZh?'配置组合':'Configuration packages'}</span><h2 className="mt-4 text-display-lg text-white">{isZh?'按使用任务配置产品与服务':'Configure products and services around the task'}</h2></div>
    <div className="grid gap-5 lg:grid-cols-3">{skus.map(sku=>{
      const members=sku.family.map(getFamilyMember).filter((f):f is NonNullable<ReturnType<typeof getFamilyMember>>=>Boolean(f));
      const recommended=sku.recommendedFor.map(getSolution).filter((s):s is NonNullable<ReturnType<typeof getSolution>>=>Boolean(s));
      return <article key={sku.slug} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7"><span className="text-caption text-brand-halo">{t(`${sku.i18nKey}.tag`)}</span><h3 className="mt-3 text-display-sm text-white">{getPackageName(sku.slug,locale)}</h3><p className="mt-4 text-body text-ink-300">{t(`${sku.i18nKey}.desc`)}</p><ul className="mt-5 space-y-3 text-caption text-ink-200">{(['bullet1','bullet2','bullet3'] as const).map(k=><li key={k}>· {t(`${sku.i18nKey}.${k}`)}</li>)}</ul><div className="mt-6 flex flex-wrap gap-2">{members.map(f=><Link key={f.role} href={`/system#${f.role}`} className="rounded border border-white/10 px-2 py-1 text-caption text-ink-400 hover:text-white">{isZh?f.nameZh:f.nameEn}</Link>)}</div><div className="mt-4 flex flex-wrap gap-3">{recommended.map(s=><Link key={s.slug} href={`/solutions/${s.slug}`} className="text-caption text-brand-halo">{ti(`${s.titleKey}.title`)}</Link>)}</div><p className="mt-6 border-t border-white/10 pt-4 text-caption text-ink-400">{t(`${sku.i18nKey}.price`)}</p><Link href="/contact" className="mt-auto inline-flex items-center gap-2 pt-6 text-body text-white">{isZh?'咨询配置与安装':'Discuss configuration and installation'} <ArrowRight size={14}/></Link></article>;
    })}</div>
  </div></section>;
}
