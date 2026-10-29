import naming from './product-naming.json';

export type SeriesId = 'hub' | 'discreet' | 'ceiling' | 'control' | 'display' | 'bridge' | 'care';
type LocalizedName = { zh: string; en: string };
export const productSeries = naming.series;
export const productNamingRevision = naming.revision;
export const localizedName = (value: LocalizedName, locale: string) => locale === 'zh-CN' ? value.zh : value.en;
export const systemName = (locale: string) => localizedName(naming.system.name, locale);

export function seriesLabel(id: string): LocalizedName {
  const item = naming.series.find(series => series.id === id);
  if (!item) throw new Error(`Unknown product series: ${id}`);
  return item.name;
}

export function productLabel(id: string): LocalizedName {
  const item = naming.products.find(product => product.id === id);
  if (!item) throw new Error(`Unknown product model: ${id}`);
  return item.display_name;
}

export const getSeriesName = (id: string, locale: string) => localizedName(seriesLabel(id), locale);
export const getProductName = (id: string, locale: string) => localizedName(productLabel(id), locale);

export function getPackageName(slug: string, locale: string): string {
  const item = naming.packages[slug as keyof typeof naming.packages];
  if (!item) throw new Error(`Unknown configuration package: ${slug}`);
  return localizedName(item, locale);
}
