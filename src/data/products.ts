// ЕДИНАЯ ТОЧКА ДОСТУПА К БУКЕТАМ для всего сайта (каталог, главная, страница
// букета, прайс для оплаты). Здесь «сырые» данные из админки превращаются в
// аккуратные: пустые языки заполняются польским текстом, битые фото и неверные
// значения выбрасываются, а букет, который показать нельзя, пропускается
// с предупреждением в логе сборки (сборка при этом НЕ падает).
import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import photoFiles from 'virtual:charmel-photos';
import { SECTION_SLUGS } from './sections';
import { FLOWER_SPECIES, FLOWER_SPECIES_SLUGS } from './flowerSpecies';
import { COMPANY } from './company';

export type Locale = 'pl' | 'ru' | 'en';
export const LOCALES: Locale[] = ['pl', 'ru', 'en'];
export const SITE_URL = 'https://charmelflowers.pl';
const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL'] as const;
export type Size = (typeof SIZE_ORDER)[number];
export type Availability = 'in-stock' | 'made-to-order' | 'out-of-stock';

export interface Variant {
  size?: Size;
  price: number;
  oldPrice?: number;
}

export interface Paragraph {
  label?: string;
  text: string;
}

export interface Product {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  photos: ImageMetadata[]; // первое — обложка
  variants: Variant[]; // пусто → «цена по запросу»
  priceOnRequest: boolean;
  minPrice?: number;
  maxPrice?: number;
  hasOldPrice: boolean;
  availability: Availability;
  purchasable: boolean; // можно положить в корзину и оплатить
  featured: boolean;
  wedding: boolean;
  promo: boolean;
  handmade: boolean;
  composition: string[];
  sections: string[];
  order?: number;
  seo: Partial<Record<Locale, string>>;
  showNote: boolean; // показывать общий текст «Важно: букет может немного отличаться от фото»
}

// Тексты, общие для всех букетов
export const PRODUCT_TEXT = {
  pl: {
    inStock: 'Dostępny',
    madeToOrder: 'Na zamówienie',
    madeToOrderNote: 'Na zamówienie — termin realizacji potwierdzimy po złożeniu zamówienia.',
    outOfStock: 'Chwilowo niedostępny',
    priceOnRequest: 'Cena na zapytanie',
    promo: 'Akcja',
    askWhatsApp: 'Zapytaj na WhatsApp',
    noteLabel: 'Ważne',
    note: 'Każdy bukiet układamy ręcznie ze świeżych kwiatów, dlatego kompozycja może nieznacznie różnić się od zdjęcia kształtem i ułożeniem pojedynczych łodyg. Zawsze zachowujemy jednak główną kolorystykę, objętość i charakter bukietu. Kwiaty to żywy materiał – i właśnie w tym tkwi ich piękno.',
  },
  ru: {
    inStock: 'В наличии',
    madeToOrder: 'Под заказ',
    madeToOrderNote: 'Под заказ — срок уточним после заказа.',
    outOfStock: 'Нет в наличии',
    priceOnRequest: 'Цена по запросу',
    promo: 'Акция',
    askWhatsApp: 'Спросить в WhatsApp',
    noteLabel: 'Важная информация',
    note: 'Каждый букет собирается вручную из свежих цветов, поэтому композиция может незначительно отличаться от фотографии по форме и расположению отдельных стеблей. При этом мы обязательно сохраняем основную цветовую гамму, объём и характер букета. Цветы — живой материал, и именно в этом их красота.',
  },
  en: {
    inStock: 'In stock',
    madeToOrder: 'Made to order',
    madeToOrderNote: "Made to order — we'll confirm the lead time after you place the order.",
    outOfStock: 'Out of stock',
    priceOnRequest: 'Price on request',
    promo: 'Promo',
    askWhatsApp: 'Ask on WhatsApp',
    noteLabel: 'Please note',
    note: 'Every bouquet is handmade from fresh flowers, so the arrangement may differ slightly from the photo in shape and the placement of individual stems. We always keep the main colour palette, volume and character of the bouquet. Flowers are a living material – and that is exactly where their beauty lies.',
  },
} as const;

// ── вспомогательное ────────────────────────────────────────────────────────

type LocalizedRaw = Partial<Record<Locale, string | undefined>> | undefined;

function localize(v: LocalizedRaw): Record<Locale, string> {
  const fallback = v?.pl || v?.ru || v?.en || '';
  return { pl: v?.pl || fallback, ru: v?.ru || fallback, en: v?.en || fallback };
}

function photoKey(raw: string): string {
  let s = raw.trim();
  try {
    s = decodeURIComponent(s);
  } catch {}
  s = s.split(/[?#]/)[0].replace(/\\/g, '/').replace(/^\.?\/+/, '');
  s = s.replace(/^(src\/assets\/products|public\/images\/products|images\/products)\//i, '');
  return s.normalize('NFC').toLowerCase();
}

function warn(id: string, msg: string) {
  console.warn(`[букеты] ${id}: ${msg}`);
}

const speciesBySlug = Object.fromEntries(FLOWER_SPECIES.map((s) => [s.slug, s]));

export function speciesName(slug: string, locale: Locale): string {
  const s = speciesBySlug[slug];
  return s ? (s[locale] ?? s.ru) : slug;
}

// ── загрузка ───────────────────────────────────────────────────────────────

let cache: Promise<Product[]> | undefined;

async function load(): Promise<Product[]> {
  const entries = await getCollection('products');
  const list: Product[] = [];

  for (const entry of entries) {
    const d = entry.data;
    const id = entry.id;
    if (d.hidden) continue; // «Скрыть с сайта»

    const title = localize(d.title);
    if (!title.pl) {
      warn(id, 'нет названия — букет пропущен');
      continue;
    }

    const photos: ImageMetadata[] = [];
    for (const p of d.photos) {
      const meta = photoFiles[photoKey(p)];
      if (meta) photos.push(meta);
      else warn(id, `фото не найдено или битое — пропущено: ${p}`);
    }
    if (photos.length === 0) {
      warn(id, 'нет ни одного исправного фото — букет пропущен');
      continue;
    }

    // Размеры и цены
    const priced = d.variants.filter((v): v is NonNullable<typeof v> & { price: number } => !!v && typeof v.price === 'number');
    if (priced.length < d.variants.length) warn(id, 'строки без цены в «Размеры и цены» пропущены');
    const sized: typeof priced = [];
    for (const v of priced) if (v.size && !sized.some((x) => x.size === v.size)) sized.push(v);
    let chosen: typeof priced;
    if (sized.length >= 2) {
      chosen = sized.sort((a, b) => SIZE_ORDER.indexOf(a.size!) - SIZE_ORDER.indexOf(b.size!));
      if (chosen.length < priced.length) warn(id, 'при нескольких строках у каждой должен быть свой размер — лишние строки пропущены');
    } else if (priced.length > 0) {
      chosen = [sized.length === 1 ? sized[0] : priced[0]];
      if (priced.length > 1) warn(id, 'несколько цен без размеров — оставлена одна');
    } else {
      chosen = [];
    }
    const variants: Variant[] = chosen.map((v) => ({
      size: v.size,
      price: v.price,
      oldPrice: typeof v.oldPrice === 'number' && v.oldPrice > v.price ? v.oldPrice : undefined,
    }));
    const prices = variants.map((v) => v.price);
    const priceOnRequest = variants.length === 0;
    const hasOldPrice = variants.some((v) => v.oldPrice);

    const sections = d.sections.filter((s) => (SECTION_SLUGS as readonly string[]).includes(s));
    if (sections.length < d.sections.length) warn(id, 'неизвестный раздел каталога — пропущен');
    const composition = d.composition.filter((s) => (FLOWER_SPECIES_SLUGS as readonly string[]).includes(s));
    if (composition.length < d.composition.length) warn(id, 'неизвестный вид цветка в составе — пропущен');

    const availability: Availability = d.availability ?? 'in-stock';

    list.push({
      id,
      title,
      description: localize(d.description),
      photos,
      variants,
      priceOnRequest,
      minPrice: priceOnRequest ? undefined : Math.min(...prices),
      maxPrice: priceOnRequest ? undefined : Math.max(...prices),
      hasOldPrice,
      availability,
      purchasable: !priceOnRequest && availability !== 'out-of-stock',
      featured: !!d.featured,
      wedding: !!d.wedding,
      promo: !!d.promo || hasOldPrice,
      handmade: !!d.handmade,
      composition,
      sections,
      order: d.order,
      seo: {
        pl: d.seo?.pl || undefined,
        ru: d.seo?.ru || undefined,
        en: d.seo?.en || undefined,
      },
      showNote: !sections.includes('wreaths'),
    });
  }

  // «Нет в наличии» — в конце; дальше по полю «Порядок» (пусто = после заполненных); дальше по адресу
  list.sort((a, b) => {
    const oa = a.availability === 'out-of-stock' ? 1 : 0;
    const ob = b.availability === 'out-of-stock' ? 1 : 0;
    if (oa !== ob) return oa - ob;
    const pa = a.order ?? Number.POSITIVE_INFINITY;
    const pb = b.order ?? Number.POSITIVE_INFINITY;
    if (pa !== pb) return pa - pb;
    return a.id.localeCompare(b.id);
  });
  return list;
}

/** Все букеты, которые видны на сайте (без скрытых и без «сломанных»), в порядке показа. */
export function getProducts(): Promise<Product[]> {
  cache ??= load();
  return cache;
}

// ── для страниц ─────────────────────────────────────────────────────────────

/** id позиции в корзине и в прайсе оплаты: «букет» или «букет--M» (если размеров несколько). */
export function variantCartId(product: Product, variant: Variant): string {
  return product.variants.length > 1 && variant.size ? `${product.id}--${variant.size}` : product.id;
}

/** Абзацы описания. «Состав: …» в начале абзаца выводится жирной подписью. */
export function paragraphs(text: string): Paragraph[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const m = p.match(/^([\p{L}][^:.!?\n]{0,39}):\s+([\s\S]+)$/u);
      return m ? { label: m[1].trim(), text: m[2].trim() } : { text: p };
    });
}

/** Подпись к фото (alt): «Название — букет (роза, эустома), фото 2 из 5». */
export function photoAlt(product: Product, locale: Locale, index: number): string {
  const isWreath = product.sections.includes('wreaths');
  const kind = { pl: isWreath ? 'wieniec' : 'bukiet', ru: isWreath ? 'венок' : 'букет', en: isWreath ? 'wreath' : 'bouquet' }[locale];
  const names = product.composition
    .map((s) => speciesName(s, locale).replace(/\s*\([^)]*\)/g, '').trim().toLowerCase())
    .filter(Boolean)
    .join(', ');
  const n = product.photos.length;
  const photoPart = n > 1 ? { pl: `zdjęcie ${index + 1} z ${n}`, ru: `фото ${index + 1} из ${n}`, en: `photo ${index + 1} of ${n}` }[locale] : '';
  return `${product.title[locale]} — ${kind}${names ? ` (${names})` : ''}${photoPart ? `, ${photoPart}` : ''}`;
}

/** URL фото в WebP нужной ширины (для корзины, лайтбокса, соцсетей). */
export async function photoUrl(photo: ImageMetadata, width: number): Promise<string> {
  const img = await getImage({ src: photo, format: 'webp', width: Math.min(width, photo.width) });
  return img.src;
}

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

/** Ссылка «Спросить в WhatsApp» с готовым текстом. */
export function whatsappUrl(product: Product, locale: Locale, pageUrl: string): string {
  const title = product.title[locale];
  const price = product.priceOnRequest
    ? ''
    : product.variants.length > 1
      ? { pl: `, cena od ${product.minPrice} zł`, ru: `, цена от ${product.minPrice} zł`, en: `, price from ${product.minPrice} zł` }[locale]
      : { pl: `, cena ${product.minPrice} zł`, ru: `, цена ${product.minPrice} zł`, en: `, price ${product.minPrice} zł` }[locale];
  const text = {
    pl: `Dzień dobry! Chcę bukiet „${title}”${price}. ${pageUrl}`,
    ru: `Здравствуйте! Хочу букет «${title}»${price}. ${pageUrl}`,
    en: `Hello! I'd like the bouquet “${title}”${price}. ${pageUrl}`,
  }[locale];
  const phone = COMPANY.phone.replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
