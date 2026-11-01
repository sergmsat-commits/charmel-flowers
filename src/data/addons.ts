// Дополнения к букету (допы). Используются на странице товара и на сервере
// при оплате (functions/api) — сервер берёт цену отсюда, а не из браузера.
// Картинки лежат в public/images/addons/.
export interface Addon {
  id: string;
  cover: string;
  price: number;
  title: { pl: string; ru: string; en: string };
}

export const ADDONS: Addon[] = [
  { id: 'addon-aquabox', cover: 'aquabox.jpg', price: 15, title: { pl: 'Aquabox', ru: 'Аквабокс', en: 'Aqua box' } },
  { id: 'addon-card', cover: 'card.jpg', price: 10, title: { pl: 'Kartka okolicznościowa', ru: 'Открытка', en: 'Greeting card' } },
  { id: 'addon-secateurs', cover: 'secateurs.jpg', price: 45, title: { pl: 'Sekator florystyczny', ru: 'Секатор флористический', en: 'Florist pruning shears' } },
  { id: 'addon-vase-xl', cover: 'vase-xl.jpg', price: 120, title: { pl: 'Wazon XL', ru: 'Ваза XL', en: 'XL Vase' } },
  { id: 'addon-kenzan-ring', cover: 'kenzan-ring.jpg', price: 150, title: { pl: 'Uchwyt Kenzan Ring 70mm', ru: 'Держатель Kenzan Ring 70mm', en: 'Kenzan Ring Holder 70mm' } },
  { id: 'addon-chocolates-merci', cover: 'chocolates-merci.jpg', price: 32, title: { pl: 'Czekoladki Merci', ru: 'Шоколадки Merci', en: 'Merci Chocolates' } },
  { id: 'addon-flower-bag', cover: 'flower-bag.jpg', price: 25, title: { pl: 'Torba na kwiaty', ru: 'Пакет для цветов', en: 'Flower gift bag' } },
  { id: 'addon-macarons', cover: 'macarons.jpg', price: 105, title: { pl: 'Makaroniki 12 szt.', ru: 'Макаруны 12 шт.', en: 'Macarons, 12 pcs' } },
  { id: 'addon-raffaello', cover: 'raffaello.jpg', price: 25, title: { pl: 'Cukierki Raffaello', ru: 'Конфеты Raffaello', en: 'Raffaello Sweets' } },
  { id: 'addon-teddy-bear', cover: 'teddy-bear.jpg', price: 59, title: { pl: 'Pluszowy miś', ru: 'Плюшевый мишка', en: 'Teddy Bear' } },
];
