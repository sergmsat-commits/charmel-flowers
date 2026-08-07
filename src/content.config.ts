import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    price: z.number(),
    priceRange: z.enum(['100-200', '200-400', '400-600', '600-800', '1000+', '2000+']),
    wedding: z.boolean().optional().default(false),
    cover: z.string(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { products };