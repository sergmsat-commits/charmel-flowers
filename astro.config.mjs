// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import charmel from './integrations/charmel.mjs';

export default defineConfig({
  site: 'https://charmelflowers.pl',
  integrations: [
    // sitemap с языковыми версиями страниц (hreflang)
    sitemap({
      i18n: {
        defaultLocale: 'pl',
        locales: { pl: 'pl-PL', ru: 'ru-RU', en: 'en-GB' },
      },
    }),
    // фото букетов (проверка + WebP) и фото в sitemap — должна идти ПОСЛЕ sitemap()
    charmel(),
  ],
  i18n: {
    locales: ['pl', 'ru', 'en'],
    defaultLocale: 'pl',
    routing: {
      prefixDefaultLocale: false
    }
  }
});