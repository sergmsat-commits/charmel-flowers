import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { FLOWER_SPECIES_SLUGS } from './data/flowerSpecies';
import { SECTION_SLUGS } from './data/sections';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.object({
      pl: z.string(),
      ru: z.string(),
      en: z.string(),
    }),
    // Описание разбито на абзацы: первый абзац — обычно вступление (без
    // подписи), последующие могут иметь label ("Состав" / "Детали" /
    // "Особенность" и т.п.), который в вёрстке выводится жирным перед текстом.
    description: z.object({
      pl: z.array(z.object({ label: z.string().optional(), text: z.string() })).min(1),
      ru: z.array(z.object({ label: z.string().optional(), text: z.string() })).min(1),
      en: z.array(z.object({ label: z.string().optional(), text: z.string() })).min(1),
    }),
    // Каждый товар — список вариантов (размер + цена). У большинства сейчас
    // всего один вариант (без size) — это ок, size опционален.
    // Для товаров с несколькими размерами (как Bloom/Lacy Bird) перечисляем
    // все варианты по возрастанию размера.
    variants: z
      .array(
        z.object({
          size: z.enum(['S', 'M', 'L', 'XL', 'XXL']).optional(),
          price: z.number(),
        })
      )
      .min(1),
    wedding: z.boolean().optional().default(false),
    promo: z.boolean().optional().default(false),
    handmade: z.boolean().optional().default(false),
    cover: z.string(),
    gallery: z.array(z.string()).optional().default([]),
    // Разделы каталога (Моно/дуо, Сухоцветы, Авторский, Розы). Букет может быть в нескольких.
    sections: z.array(z.enum(SECTION_SLUGS)).optional().default([]),
    featured: z.boolean().optional().default(false),
    // SEO-описание для Google (meta description). Необязательное: если его нет,
    // берётся начало первого абзаца описания. Оптимально 120–160 символов.
    seo: z
      .object({
        pl: z.string().optional(),
        ru: z.string().optional(),
        en: z.string().optional(),
      })
      .optional(),
    composition: z.array(z.enum(FLOWER_SPECIES_SLUGS)).optional().default([]),
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
    cover: z.string().optional(), // путь от корня сайта, напр. /images/blog/....jpg
    coverAlt: z.string().optional(),
  }),
});

export const collections = { products, blog };
