// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    locales: ['pl', 'ru', 'en'],
    defaultLocale: 'pl',
    routing: {
      prefixDefaultLocale: false
    }
  }
});