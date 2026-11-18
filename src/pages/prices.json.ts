// Прайс-лист для сервера оплаты (functions/api/[[path]].js).
// Собирается автоматически при сборке сайта из каталога (src/content/products)
// и допов (src/data/addons.ts) — вручную ничего обновлять не нужно.
// Сюда попадают ТОЛЬКО букеты, которые можно купить: скрытые, «нет в наличии»
// и «цена по запросу» сервер оплатить не даст.
// Ключи — те же id, что кладёт в корзину сайт:
//   товар с одним вариантом:   "hydrangea-06"
//   товар с размерами:         "hydrangea-01--M"
//   доп:                       "addon-card"
import { ADDONS } from '../data/addons';
import { getProducts, variantCartId } from '../data/products';

export async function GET() {
  const products = await getProducts();
  const items: Record<string, { price: number; title: string }> = {};

  for (const product of products) {
    if (!product.purchasable) continue;
    const title = product.title.pl;
    for (const v of product.variants) {
      items[variantCartId(product, v)] = { price: v.price, title: v.size ? `${title} (${v.size})` : title };
    }
  }

  for (const addon of ADDONS) {
    items[addon.id] = { price: addon.price, title: addon.title.pl };
  }

  return new Response(JSON.stringify({ items }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
