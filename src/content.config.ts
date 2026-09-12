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
    price: z.number(),
    priceRange: z.enum(['100-200', '200-400', '400-600', '600-800', '1000+']),
    wedding: z.boolean().optional().default(false),
    promo: z.boolean().optional().default(false),
    handmade: z.boolean().optional().default(false),
    cover: z.string(),
    gallery: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    size: z.enum(['S', 'M', 'L', 'XL']).optional(),
    composition: z.array(z.enum(FLOWER_SPECIES_SLUGS)).optional().default([]),
  }),
});

export const collections = { products };