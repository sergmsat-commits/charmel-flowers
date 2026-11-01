// Серверная часть сайта Charmel Flowers (Cloudflare Pages Functions).
// Обрабатывает адреса /api/...:
//   POST /api/order          — приём заказа из корзины (+ создание платежа Przelewy24)
//   POST /api/p24/notify     — уведомление от Przelewy24 о платеже (urlStatus)
//   GET  /api/p24/status?s=… — статус оплаты для страницы «Спасибо»
//   GET  /api/p24/ping       — проверка, что ключи P24 введены правильно
//
// Секреты берутся ТОЛЬКО из переменных Cloudflare (Settings → Variables and Secrets):
//   P24_MERCHANT_ID, P24_POS_ID, P24_API_KEY (secret), P24_CRC (secret),
//   TELEGRAM_BOT_TOKEN (secret), TELEGRAM_CHAT_ID
//   (если их нет — берутся старые PUBLIC_TELEGRAM_BOT_TOKEN / PUBLIC_TELEGRAM_CHAT_ID)
// Необязательные:
//   P24_SANDBOX=1               — тестовый сервер P24 (sandbox)
//   P24_TEST_AMOUNT_GROSZE=100  — ТОЛЬКО для Preview: любая оплата = 1 zł (для проверки)

const P24_LIVE = 'https://secure.przelewy24.pl/';
const P24_SANDBOX = 'https://sandbox.przelewy24.pl/';
const SESSION_RE = /^cf-(\d+)-([a-f0-9]{8})$/;

// ───────────────────────────── helpers ─────────────────────────────

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

async function sha384(text) {
  const buf = await crypto.subtle.digest('SHA-384', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Подпись P24: sha384 от JSON (без экранирования слешей/юникода — так и делает JSON.stringify)
const p24Sign = (obj) => sha384(JSON.stringify(obj));

function p24Config(env) {
  const merchantId = Number(env.P24_MERCHANT_ID);
  const posId = Number(env.P24_POS_ID || env.P24_MERCHANT_ID);
  const apiKey = (env.P24_API_KEY || '').trim();
  const crc = (env.P24_CRC || '').trim();
  if (!merchantId || !posId || !apiKey || !crc) return null;
  return {
    merchantId,
    posId,
    apiKey,
    crc,
    base: env.P24_SANDBOX === '1' ? P24_SANDBOX : P24_LIVE,
    auth: 'Basic ' + btoa(`${posId}:${apiKey}`),
  };
}

async function p24Request(cfg, method, path, body) {
  const res = await fetch(cfg.base + path, {
    method,
    headers: { Authorization: cfg.auth, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

const tgToken = (env) => (env.TELEGRAM_BOT_TOKEN || env.PUBLIC_TELEGRAM_BOT_TOKEN || '').trim();
const tgChat = (env) => String(env.TELEGRAM_CHAT_ID || env.PUBLIC_TELEGRAM_CHAT_ID || '').trim();

async function telegram(env, text, replyTo) {
  const token = tgToken(env);
  const chatId = tgChat(env);
  if (!token || !chatId) throw new Error('telegram-not-configured');
  const body = { chat_id: chatId, text, disable_web_page_preview: true };
  if (replyTo) body.reply_parameters = { message_id: replyTo, allow_sending_without_reply: true };
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) throw new Error('telegram-failed');
  return data.result.message_id;
}

async function loadPrices(request, env) {
  const url = new URL('/prices.json', request.url);
  const res = env.ASSETS ? await env.ASSETS.fetch(new Request(url)) : await fetch(url);
  if (!res.ok) throw new Error('prices-unavailable');
  return (await res.json()).items;
}

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const zl = (grosze) => (grosze / 100).toFixed(2).replace(/\.00$/, '') + ' zł';

// ───────────────────────────── POST /api/order ─────────────────────────────

async function handleOrder(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'bad-request' }, 400);
  }

  const locale = ['pl', 'ru', 'en'].includes(body.locale) ? body.locale : 'pl';
  const fulfillment = body.fulfillment === 'pickup' ? 'pickup' : 'delivery';
  const payment = body.payment === 'cash' ? 'cash' : 'online';
  if (payment === 'cash' && fulfillment !== 'pickup') return json({ ok: false, error: 'cash-only-pickup' }, 400);
  if (body.acceptRegulamin !== true) return json({ ok: false, error: 'regulamin' }, 400);

  const buyerName = str(body.buyerName, 100);
  const buyerPhone = str(body.buyerPhone, 40);
  const buyerEmail = str(body.buyerEmail, 120);
  const recipientName = str(body.recipientName, 100) || buyerName;
  const recipientPhone = str(body.recipientPhone, 40) || buyerPhone;
  const address = str(body.address, 300);
  const date = str(body.date, 20);
  const time = str(body.time, 10);
  const comment = str(body.comment, 1000);

  if (!buyerName || !buyerPhone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail) || !date || !time) {
    return json({ ok: false, error: 'missing-fields' }, 400);
  }
  if (fulfillment === 'delivery' && !address) return json({ ok: false, error: 'missing-address' }, 400);

  // Пересчитываем сумму по ценам с сервера — цене из браузера не доверяем
  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
  if (rawItems.length === 0) return json({ ok: false, error: 'empty-cart' }, 400);

  let prices;
  try {
    prices = await loadPrices(request, env);
  } catch {
    return json({ ok: false, error: 'prices' }, 500);
  }

  const lines = [];
  let totalZl = 0;
  for (const it of rawItems) {
    const id = typeof it?.id === 'string' ? it.id : '';
    const qty = Math.floor(Number(it?.qty));
    const p = prices[id];
    if (!p || !(qty >= 1 && qty <= 20)) return json({ ok: false, error: 'unknown-item', id }, 400);
    totalZl += p.price * qty;
    lines.push(`- ${p.title} ×${qty} — ${p.price * qty} zł`);
  }

  const testAmount = Number(env.P24_TEST_AMOUNT_GROSZE || 0);
  const amount = payment === 'online' && testAmount > 0 ? Math.floor(testAmount) : totalZl * 100;

  const paymentLine =
    payment === 'cash'
      ? 'Оплата: в студии при самовывозе (наличные/карта)'
      : `Оплата: онлайн Przelewy24 — ⏳ ОЖИДАЕТ ОПЛАТЫ${testAmount > 0 ? ` (ТЕСТ: к оплате ${zl(amount)})` : ''}`;

  const text = [
    '🌸 Новый заказ (Charmel Flowers)',
    '',
    ...lines,
    '',
    `Итого за товары: ${totalZl} zł`,
    fulfillment === 'delivery' ? 'Доставка (Uber/Wolt): оплачивается отдельно — согласовать с клиентом' : '',
    '',
    '— Заказчик —',
    `Имя: ${buyerName}`,
    `Телефон: ${buyerPhone}`,
    `E-mail: ${buyerEmail}`,
    '',
    '— Получатель —',
    `Имя: ${recipientName}`,
    `Телефон: ${recipientPhone}`,
    '',
    `Способ получения: ${fulfillment === 'pickup' ? 'Самовывоз (Кабаты)' : 'Доставка'}`,
    fulfillment === 'delivery' ? `Адрес доставки: ${address}` : 'Самовывоз: Stryjeńskich 6/lok.UH1B, Kabaty',
    '',
    `Дата: ${date}`,
    `Время: ${time}`,
    paymentLine,
    `Комментарий: ${comment || '—'}`,
    `Язык сайта: ${locale.toUpperCase()}`,
    'Regulamin принят: да',
  ]
    .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''))
    .join('\n');

  let messageId;
  try {
    messageId = await telegram(env, text);
  } catch {
    return json({ ok: false, error: 'telegram' }, 502);
  }

  if (payment === 'cash') return json({ ok: true, mode: 'cash' });

  // ── Онлайн-оплата: регистрируем транзакцию в Przelewy24 ──
  const cfg = p24Config(env);
  if (!cfg) {
    await telegram(env, '⚠️ Онлайн-оплата не настроена (нет ключей P24). Свяжитесь с клиентом.', messageId).catch(() => {});
    return json({ ok: false, error: 'p24-not-configured' }, 500);
  }

  const rand = [...crypto.getRandomValues(new Uint8Array(4))].map((b) => b.toString(16).padStart(2, '0')).join('');
  const sessionId = `cf-${messageId}-${rand}`;
  const origin = new URL(request.url).origin;
  const localePrefix = locale === 'pl' ? '' : `/${locale}`;

  const sign = await p24Sign({ sessionId, merchantId: cfg.merchantId, amount, currency: 'PLN', crc: cfg.crc });
  const reg = await p24Request(cfg, 'POST', 'api/v1/transaction/register', {
    merchantId: cfg.merchantId,
    posId: cfg.posId,
    sessionId,
    amount,
    currency: 'PLN',
    description: `Zamówienie Charmel Flowers nr ${messageId}`,
    email: buyerEmail,
    client: buyerName,
    phone: buyerPhone.replace(/[^\d+]/g, '').slice(0, 20) || undefined,
    country: 'PL',
    language: locale === 'en' ? 'en' : 'pl',
    urlReturn: `${origin}${localePrefix}/order-status/?s=${sessionId}`,
    urlStatus: `${origin}/api/p24/notify`,
    timeLimit: 15,
    waitForResult: true,
    encoding: 'UTF-8',
    sign,
  });

  const token = reg.data?.data?.token;
  if (!reg.ok || !token) {
    const reason = reg.data?.error ? String(reg.data.error).slice(0, 200) : `HTTP ${reg.status}`;
    await telegram(env, `⚠️ Не удалось создать платёж P24 (${reason}). Свяжитесь с клиентом.`, messageId).catch(() => {});
    return json({ ok: false, error: 'p24-register' }, 502);
  }

  return json({ ok: true, mode: 'online', redirectUrl: `${cfg.base}trnRequest/${token}` });
}

// ───────────────────────────── POST /api/p24/notify ─────────────────────────────

async function handleNotify(request, env) {
  const cfg = p24Config(env);
  if (!cfg) return new Response('not configured', { status: 500 });

  let n;
  try {
    n = await request.json();
  } catch {
    return new Response('bad request', { status: 400 });
  }

  const expected = await p24Sign({
    merchantId: cfg.merchantId,
    posId: cfg.posId,
    sessionId: n.sessionId,
    amount: n.amount,
    originAmount: n.originAmount,
    currency: n.currency,
    orderId: n.orderId,
    methodId: n.methodId,
    statement: n.statement,
    crc: cfg.crc,
  });
  if (!n.sign || expected !== n.sign) return new Response('bad sign', { status: 400 });

  // Подтверждаем транзакцию — без этого деньги не зачислятся
  const vSign = await p24Sign({
    sessionId: n.sessionId,
    orderId: n.orderId,
    amount: n.amount,
    currency: n.currency,
    crc: cfg.crc,
  });
  const ver = await p24Request(cfg, 'PUT', 'api/v1/transaction/verify', {
    merchantId: cfg.merchantId,
    posId: cfg.posId,
    sessionId: n.sessionId,
    amount: n.amount,
    currency: n.currency,
    orderId: n.orderId,
    sign: vSign,
  });

  const m = SESSION_RE.exec(String(n.sessionId));
  const replyTo = m ? Number(m[1]) : undefined;

  if (!ver.ok || ver.data?.data?.status !== 'success') {
    await telegram(env, `⚠️ Платёж P24 пришёл, но не подтвердился (verify). Проверьте в панели P24, заказ P24 №${n.orderId}.`, replyTo).catch(() => {});
    return new Response('verify failed', { status: 500 }); // P24 повторит уведомление позже
  }

  await telegram(env, `✅ ОПЛАЧЕН — ${zl(n.amount)} (Przelewy24, № транзакции ${n.orderId})`, replyTo).catch(() => {});
  return new Response('OK', { status: 200 });
}

// ───────────────────────────── GET /api/p24/status ─────────────────────────────

async function handleStatus(request, env) {
  const s = new URL(request.url).searchParams.get('s') || '';
  if (!SESSION_RE.test(s)) return json({ status: 'unknown' }, 400);
  const cfg = p24Config(env);
  if (!cfg) return json({ status: 'unknown' }, 500);

  const r = await p24Request(cfg, 'GET', `api/v1/transaction/by/sessionId/${encodeURIComponent(s)}`);
  const st = r.data?.data?.status;
  // 0 — нет оплаты, 1 — оплата получена (ждёт подтверждения), 2 — подтверждена, 3 — возврат
  const status = st === 1 || st === 2 ? 'paid' : st === 3 ? 'returned' : r.ok ? 'pending' : 'unknown';
  return json({ status });
}

// ───────────────────────────── GET /api/p24/ping ─────────────────────────────

async function handlePing(env) {
  const cfg = p24Config(env);
  const telegramOk = Boolean(tgToken(env) && tgChat(env));
  if (!cfg) return json({ p24: 'not-configured', telegram: telegramOk ? 'configured' : 'not-configured' });
  const r = await p24Request(cfg, 'GET', 'api/v1/testAccess');
  return json({
    p24: r.ok && r.data?.data === true ? 'ok' : `error (HTTP ${r.status})`,
    server: cfg.base.includes('sandbox') ? 'sandbox' : 'live',
    merchantId: cfg.merchantId,
    posId: cfg.posId,
    testAmount: Number(env.P24_TEST_AMOUNT_GROSZE || 0) > 0,
    telegram: telegramOk ? 'configured' : 'not-configured',
  });
}

// ───────────────────────────── router ─────────────────────────────

export async function onRequest(context) {
  const { request, env } = context;
  const path = new URL(request.url).pathname.replace(/\/+$/, '');
  try {
    if (path === '/api/order' && request.method === 'POST') return await handleOrder(request, env);
    if (path === '/api/p24/notify' && request.method === 'POST') return await handleNotify(request, env);
    if (path === '/api/p24/status' && request.method === 'GET') return await handleStatus(request, env);
    if (path === '/api/p24/ping' && request.method === 'GET') return await handlePing(env);
    return json({ ok: false, error: 'not-found' }, 404);
  } catch (err) {
    return json({ ok: false, error: 'server' }, 500);
  }
}
