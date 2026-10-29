import { Cpu, Radio, Radar, SlidersHorizontal, Monitor, Network, House, type LucideIcon } from 'lucide-react';
import { localizedName, productSeries } from '@/content/product-names';

const seriesIcons: Record<string, LucideIcon> = {
  hub: Cpu, discreet: Radio, ceiling: Radar, control: SlidersHorizontal,
  display: Monitor, bridge: Network, care: House,
};

// Product families and functional architecture are separate views of the system.
// A series can exist before an individual device SKU is defined.
export function ProductSeriesDirectory({ locale }: { locale: string }) {
  const isZh = locale === 'zh-CN';
  return <section id="series" className="scroll-mt-24 border-y border-white/5 py-section">
    <div className="container-page">
      <span className="eyebrow">{isZh ? '产品系列' : 'Product families'}</span>
      <h2 className="mt-4 text-display-lg text-white">{isZh ? '循星产品家族' : 'The SidebyStar product family'}</h2>
      <p className="mt-4 max-w-3xl text-body text-ink-300">{isZh
        ? 'AIOS 贯穿中枢、感知、控制与显示设备，居护按空间与使用需求组织配置。'
        : 'AIOS connects the hub, sensing, control and display families. Home & Care organizes equipment around each space and its needs.'}</p>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productSeries.map(series => {
          const Icon = seriesIcons[series.id];
          return <article key={series.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6" data-product-series={series.id}>
            <Icon size={23} strokeWidth={1.4} className="text-brand-halo" aria-hidden="true" />
            <h3 className="mt-4 text-display-sm text-white">{localizedName(series.name, locale)}</h3>
            <p className="mt-3 text-body text-ink-300">{localizedName(series.role, locale)}</p>
            {series.status === 'series_defined_no_sku' && <p className="mt-3 text-caption text-ink-400">{isZh ? '电视与屏幕交互适配方向' : 'TV and screen integration design'}</p>}
          </article>;
        })}
      </div>
    </div>
  </section>;
}
