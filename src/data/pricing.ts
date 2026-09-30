// Общая логика для фильтра по цене в каталоге.
//
// Бакеты соответствуют кнопкам фильтра в CatalogGrid.astro:
// '100-200' | '200-400' | '400-600' | '600-800' | '1000+'
// (границы полуоткрытые: [100,200), [200,400), [400,600), [600,1000), [1000,+))
// Диапазон 800–999 сознательно относим к бакету '600-800', чтобы не заводить
// отдельную кнопку ради узкого промежутка — при появлении реальных товаров
// в этой вилке легко скорректировать.

export const PRICE_RANGES = ['100-200', '200-400', '400-600', '600-800', '1000+'] as const;
export type PriceRange = (typeof PRICE_RANGES)[number];

export function priceToRangeBucket(price: number): PriceRange {
  if (price < 200) return '100-200';
  if (price < 400) return '200-400';
  if (price < 600) return '400-600';
  if (price < 1000) return '600-800';
  return '1000+';
}

// Для товара с несколькими вариантами (размерами) — все бакеты, которые он
// перекрывает по цене. У товара с одним вариантом — один бакет.
export function productPriceBuckets(prices: number[]): PriceRange[] {
  const set = new Set(prices.map(priceToRangeBucket));
  return Array.from(set);
}

export function minPrice(prices: number[]): number {
  return Math.min(...prices);
}