import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { FLOWER_SPECIES_SLUGS } from './data/flowerSpecies';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.object({
      pl: z.string(),
      ru: z.string(),
      en: z.string(),
    }),
    description: z.object({
      pl: z.string(),
      ru: z.string(),
      en: z.string(),
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
    featured: z.boolean().optional().default(false),
    composition: z.array(z.enum(FLOWER_SPECIES_SLUGS)).optional().default([]),
  }),
});

export const collections = { products };