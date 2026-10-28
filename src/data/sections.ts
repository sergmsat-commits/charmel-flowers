// Разделы каталога: используются и в блоке из 4 карточек на главной,
// и в фильтре «Раздел» на странице каталога.
// image: файл в public/images/sections/ (null — пока нет фото, будет заглушка).
export const SECTIONS = [
  { slug: 'mono',   image: 'mono.jpg',   pl: 'Mono/Duo bukiet', ru: 'Моно/дуо букет', en: 'Mono/Duo bouquet' },
  // Интерьерные венки (осенние, новогодние, весенние…). Подразделы добавим позже.
  { slug: 'wreaths', image: 'wreaths.jpg', pl: 'Wieńce do wnętrz', ru: 'Интерьерные венки', en: 'Interior wreaths' },
  { slug: 'author', image: 'author.jpg', pl: 'Bukiet autorski', ru: 'Авторский букет', en: 'Signature bouquet' },
  { slug: 'roses',  image: 'roses.jpg',  pl: 'Róże',            ru: 'Розы',           en: 'Roses' },
] as const;

export const SECTION_SLUGS = SECTIONS.map((s) => s.slug) as [
  'mono' | 'wreaths' | 'author' | 'roses',
  ...('mono' | 'wreaths' | 'author' | 'roses')[],
];
