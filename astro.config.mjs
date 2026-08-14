// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://charmelflowers.pl',
  integrations: [sitemap()],
  i18n: {
    locales: ['pl', 'ru', 'en'],
    defaultLocale: 'pl',
    routing: {
      prefixDefaultLocale: false
    }
  }
});