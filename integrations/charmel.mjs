// Локальная интеграция Astro для Charmel Flowers.
//
// 1) Фото букетов (папка src/assets/products, туда загружает админка).
//    Перед сборкой каждое фото проверяется: битые, HEIC и прочие неподдерживаемые
//    файлы НЕ попадают на сайт — вместо падения сборки в логе будет предупреждение.
//    Исправные фото отдаются сайту через виртуальный модуль `virtual:charmel-photos`
//    (ключ — путь внутри src/assets/products в нижнем регистре).
//    Новые фото подхватываются при следующей сборке (локально — перезапуск npm run dev).
//
// 2) После сборки добавляет в sitemap фото товаров и статей (<image:image>),
//    беря их из JSON-LD каждой страницы.
//
// 3) После сборки удаляет из dist/_astro исходные JPG/PNG фото, на которые
//    не ссылается ни одна страница (сайт показывает только WebP) — чтобы
//    не выкладывать лишние мегабайты.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PHOTO_DIR = 'src/assets/products';
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const VIRTUAL_ID = 'virtual:charmel-photos';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

function listFiles(dir, rel = '') {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const r = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...listFiles(path.join(dir, entry.name), r));
    else out.push(r);
  }
  return out;
}

async function loadSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    return null;
  }
}

function photosPlugin(root, logger) {
  return {
    name: 'charmel-photos',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    async load(id) {
      if (id !== RESOLVED_ID) return;
      const dir = path.join(root, PHOTO_DIR);
      const sharp = await loadSharp();
      const imports = [];
      const entries = [];
      let i = 0;
      for (const rel of listFiles(dir)) {
        const ext = path.extname(rel).toLowerCase();
        if (!SUPPORTED.has(ext)) {
          const hint = ext === '.heic' || ext === '.heif' ? ' (HEIC с iPhone не поддерживается — нужен JPG)' : '';
          logger.warn(`Фото пропущено, формат не поддерживается${hint}: ${PHOTO_DIR}/${rel}`);
          continue;
        }
        if (sharp) {
          try {
            // полная расшифровка в маленьком размере — ловит и битые, и обрезанные файлы
            await sharp(path.join(dir, rel)).resize(16, 16, { fit: 'inside' }).toBuffer();
          } catch (e) {
            logger.warn(`Фото пропущено, файл не открывается (битый?): ${PHOTO_DIR}/${rel}`);
            continue;
          }
        }
        const name = `p${i++}`;
        imports.push(`import ${name} from ${JSON.stringify(`/${PHOTO_DIR}/${rel}`)};`);
        entries.push(`  ${JSON.stringify(rel.normalize('NFC').toLowerCase())}: ${name},`);
      }
      return `${imports.join('\n')}\nexport default {\n${entries.join('\n')}\n};\n`;
    },
  };
}

function imagesFromJsonLd(html) {
  const urls = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      if (data && (data['@type'] === 'Product' || data['@type'] === 'BlogPosting')) {
        const img = data.image;
        for (const u of Array.isArray(img) ? img : img ? [img] : []) if (typeof u === 'string') urls.push(u);
      }
    } catch {}
  }
  return [...new Set(urls)];
}

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function addImagesToSitemap(distDir, logger) {
  const files = fs.readdirSync(distDir).filter((f) => /^sitemap-\d+\.xml$/.test(f));
  let added = 0;
  for (const file of files) {
    const full = path.join(distDir, file);
    let xml = fs.readFileSync(full, 'utf-8');
    xml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (block, inner) => {
      const loc = inner.match(/<loc>([^<]+)<\/loc>/)?.[1];
      if (!loc) return block;
      let pathname;
      try {
        pathname = decodeURI(new URL(loc).pathname);
      } catch {
        return block;
      }
      const htmlFile = path.join(distDir, pathname, pathname.endsWith('.html') ? '' : 'index.html');
      if (!fs.existsSync(htmlFile)) return block;
      const images = imagesFromJsonLd(fs.readFileSync(htmlFile, 'utf-8'));
      if (images.length === 0) return block;
      added += images.length;
      const tags = images.map((u) => `<image:image><image:loc>${escapeXml(u)}</image:loc></image:image>`).join('');
      return `<url>${inner}${tags}</url>`;
    });
    if (!xml.includes('xmlns:image=')) {
      xml = xml.replace('<urlset ', '<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ');
    }
    fs.writeFileSync(full, xml);
  }
  logger.info(`В sitemap добавлено фото: ${added}`);
}

function removeUnusedOriginals(distDir, logger) {
  const astroDir = path.join(distDir, '_astro');
  if (!fs.existsSync(astroDir)) return;
  const originals = fs.readdirSync(astroDir).filter((f) => /\.(jpe?g|png)$/i.test(f));
  if (originals.length === 0) return;
  const textFiles = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(html|css|js|mjs|json|xml|txt|webmanifest)$/i.test(e.name)) textFiles.push(p);
    }
  };
  walk(distDir);
  const used = new Set();
  for (const f of textFiles) {
    const content = fs.readFileSync(f, 'utf-8');
    for (const o of originals) if (!used.has(o) && content.includes(o)) used.add(o);
  }
  let removed = 0;
  for (const o of originals) {
    if (used.has(o)) continue;
    fs.unlinkSync(path.join(astroDir, o));
    removed++;
  }
  if (removed) logger.info(`Удалено неиспользуемых исходных фото из _astro: ${removed}`);
}

export default function charmel() {
  return {
    name: 'charmel',
    hooks: {
      'astro:config:setup': ({ config, updateConfig, logger }) => {
        const root = fileURLToPath(config.root);
        updateConfig({ vite: { plugins: [photosPlugin(root, logger)] } });
      },
      'astro:build:done': ({ dir, logger }) => {
        addImagesToSitemap(fileURLToPath(dir), logger);
        removeUnusedOriginals(fileURLToPath(dir), logger);
      },
    },
  };
}
