// Meta description для страницы товара (то, что Google показывает в поиске).
// 1) если у товара есть поле seo для нужного языка — берём его;
// 2) иначе — первый абзац описания, обрезанный до ~160 символов по границе слова.
type Locale = 'pl' | 'ru' | 'en';

interface ProductLike {
  data: {
    description: Record<Locale, { label?: string; text: string }[]>;
    seo?: Partial<Record<Locale, string>>;
  };
}

const MAX = 160;

export function productMetaDescription(product: ProductLike, locale: string): string {
  const loc = (['pl', 'ru', 'en'].includes(locale) ? locale : 'pl') as Locale;
  const seo = product.data.seo?.[loc]?.trim();
  if (seo) return seo;

  const first = product.data.description[loc]?.[0]?.text?.trim() ?? '';
  if (first.length <= MAX) return first;
  const cut = first.slice(0, MAX - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:—–-]+$/, '')}…`;
}
