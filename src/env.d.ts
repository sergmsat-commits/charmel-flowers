// Виртуальный модуль из integrations/charmel.mjs: исправные фото букетов.
declare module 'virtual:charmel-photos' {
  const photos: Record<string, import('astro').ImageMetadata>;
  export default photos;
}
