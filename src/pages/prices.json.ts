// Прайс-лист для сервера оплаты (functions/api/[[path]].js).
// Собирается автоматически при сборке сайта из каталога (src/content/products)
// и допов (src/data/addons.ts) — вручную ничего обновлять не нужно.
// Ключи — те же id, что кладёт в корзину сайт:
//   товар с одним вариантом:   "hydrangea-06"
//   товар с размерами:         "hydrangea-01--M"
//   доп:                       "addon-card"
import { getCollection } from 'astro:content';
import { ADDONS } from '../data/addons';

export async function GET() {
  const products = await getCollection('products');
  const items: Record<string, { price: number; title: string }> = {};

  for (const product of products) {
    const title = product.data.title.pl;
    const variants = product.data.variants;
    if (variants.length > 1) {
      for (const v of variants) {
        if (v.size) items[`${product.id}--${v.size}`] = { price: v.price, title: `${title} (${v.size})` };
      }
    } else {
      const v = variants[0];
      items[product.id] = { price: v.price, title: v.size ? `${title} (${v.size})` : title };
    }
  }

  for (const addon of ADDONS) {
    items[addon.id] = { price: addon.price, title: addon.title.pl };
  }

  return new Response(JSON.stringify({ items }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
