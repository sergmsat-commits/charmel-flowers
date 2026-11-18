import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─────────────────────────────────────────────────────────────────────────────
// БУКЕТЫ. Каждый букет — отдельный файл src/content/products/<адрес>.md.
// Файлы редактирует владелица магазина через админку Pages CMS (.pages.yml),
// поэтому схема «мягкая»: любая ошибка в поле НЕ ломает сборку сайта —
// неправильное значение просто превращается в «пусто», а решение, показывать
// ли букет, принимает src/data/products.ts (там же предупреждения в логе сборки).
// ─────────────────────────────────────────────────────────────────────────────

const isEmpty = (v: unknown) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

// Текст: обрезаем пробелы, пустое → undefined
const text = z.preprocess(
  (v) => (isEmpty(v) ? undefined : typeof v === 'number' ? String(v) : v),
  z.string().trim().optional()
).catch(undefined);

// Текст на трёх языках. Если пришла просто строка — считаем её польской.
// Старый формат описания (список абзацев с подписями) тоже понимаем.
const localized = z.preprocess(
  (v) => {
    if (typeof v === 'string') return { pl: v };
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const out: Record<string, unknown> = {};
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        out[k] = Array.isArray(val)
          ? val
              .map((p: any) => (p && typeof p === 'object' ? (p.label ? `${p.label}: ${p.text ?? ''}` : p.text) : p))
              .filter(Boolean)
              .join('\n\n')
          : val;
      }
      return out;
    }
    return undefined;
  },
  z.object({ pl: text, ru: text, en: text }).optional()
).catch(undefined);

// Число: «205», «205,50», «1 200» → число; пустое/мусор → undefined
const toNumber = (v: unknown) => {
  if (isEmpty(v)) return undefined;
  if (typeof v === 'string') return Number(v.replace(/\s/g, '').replace(',', '.'));
  return v;
};
const price = z.preprocess(toNumber, z.number().positive().optional()).catch(undefined);
const order = z.preprocess(toNumber, z.number().finite().optional()).catch(undefined);

// Список строк: одиночная строка → [строка]; всё нестроковое выбрасываем
const stringList = z.preprocess(
  (v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim() !== '') : []),
  z.array(z.string())
).catch([]);

const flag = z.preprocess((v) => (v === 'true' ? true : v === 'false' ? false : v), z.boolean().optional()).catch(undefined);

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: localized,
    // Фото: первое — обложка. Пути вида /src/assets/products/имя.jpg
    photos: stringList,
    description: localized,
    // Размеры и цены. Размер S–XXL или пусто («без размера»). oldPrice — старая цена (зачёркнутая).
    variants: z.preprocess(
      (v) => (Array.isArray(v) ? v : v && typeof v === 'object' ? [v] : []),
      z.array(
        z
          .object({
            size: z.preprocess((s) => (typeof s === 'string' ? s.trim().toUpperCase() : s), z.enum(['S', 'M', 'L', 'XL', 'XXL']).optional()).catch(undefined),
            price,
            oldPrice: price,
          })
          .nullable()
          .catch(null)
      )
    ).catch([]),
    // в наличии / под заказ / нет в наличии
    availability: z.enum(['in-stock', 'made-to-order', 'out-of-stock']).optional().catch(undefined),
    hidden: flag, // «Скрыть с сайта»
    featured: flag, // «Показывать на главной» (лента «Рекомендуем» + значок)
    order, // «Порядок»: меньше = выше
    composition: stringList, // виды цветов (src/data/flowerSpecies.ts)
    sections: stringList, // разделы каталога (src/data/sections.ts)
    wedding: flag,
    promo: flag,
    handmade: flag,
    // SEO-описание для Google (meta description), 120–160 символов. Пусто → берётся начало описания.
    seo: localized,
  }),
});

// Блог: одна статья = папка с тремя файлами pl.md / ru.md / en.md.
// Имя папки = адрес статьи, одинаковый на всех языках:
// /blog/<папка>/, /ru/blog/<папка>/, /en/blog/<папка>/ (так работает переключатель языка).
// Поле slug во frontmatter НЕ использовать — Astro превращает его в id, и языки затирают друг друга.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    lang: z.enum(['pl', 'ru', 'en']),
    title: z.string(),
    description: z.string(), // анонс в списке статей + meta description для Google
    date: z.coerce.date(),
    updated: z.coerce.date().optional(), // дата обновления статьи (для Google), необязательно
    cover: z.string().optional(), // путь от корня сайта, напр. /images/blog/....jpg
    coverAlt: z.string().optional(),
  }),
});

export const collections = { products, blog };
