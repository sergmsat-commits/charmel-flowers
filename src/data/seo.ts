// Meta description для страницы букета (то, что Google показывает в поиске).
// 1) если у букета заполнено «SEO-описание» для нужного языка — берём его;
// 2) иначе — первый абзац описания, обрезанный до ~160 символов по границе слова.
import { paragraphs, type Locale, type Product } from './products';

const MAX = 160;

export function productMetaDescription(product: Product, locale: string): string {
  const loc = (['pl', 'ru', 'en'].includes(locale) ? locale : 'pl') as Locale;
  const seo = product.seo[loc]?.trim();
  if (seo) return seo;

  const first = paragraphs(product.description[loc])[0]?.text ?? product.title[loc];
  if (first.length <= MAX) return first;
  const cut = first.slice(0, MAX - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:—–-]+$/, '')}…`;
}
