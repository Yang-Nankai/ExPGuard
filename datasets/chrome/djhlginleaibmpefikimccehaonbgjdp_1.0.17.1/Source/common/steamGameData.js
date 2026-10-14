export const STEAM_STORE_HOSTNAME = 'store.steampowered.com';
export const STEAM_GAME_BUTTON_VARIANT = 'steam_game_key';
export const STEAM_BALANCE_BUTTON_VARIANT = 'steam_balance_topup';
export const STEAM_GAME_FALLBACK_URL = 'https://ggsel.net/catalog';
export const STEAM_WALLET_FALLBACK_URL = 'https://ggsel.net/catalog/steam-wallet';

const CACHE_TTL_MS = 5 * 60 * 1000;
const EXCLUDED_STEAM_PATH_PREFIXES = [
  '/checkout',
  '/cart',
  '/account',
  '/login',
  '/join',
  '/twofactor',
  '/parentalsettings',
  '/wishlist',
];

const steamGameCache = new Map();
const pendingSteamGameFetches = new Map();
const GGSEL_HOSTNAME = 'ggsel.net';

function normalizeWhitespace(value) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function normalizePathname(pathname) {
  const value = typeof pathname === 'string' && pathname ? pathname : '/';
  return value.startsWith('/') ? value : `/${value}`;
}

function normalizeGameTitle(value) {
  const title = normalizeWhitespace(value);
  return title ? title.slice(0, 120) : '';
}

function titleFromDocumentTitle(title) {
  const clean = normalizeWhitespace(title);
  if (!clean) return '';

  const discountMatch = clean.match(/^Save\s+.+?\s+on\s+(.+?)\s+on\s+Steam$/i);
  if (discountMatch?.[1]) {
    return normalizeGameTitle(discountMatch[1]);
  }

  const steamTitleMatch = clean.match(/^(.+?)\s+on\s+Steam$/i);
  if (steamTitleMatch?.[1]) {
    return normalizeGameTitle(steamTitleMatch[1]);
  }

  return '';
}

function getAppId(pathname) {
  const match = normalizePathname(pathname).match(/^\/app\/(\d{1,10})(?:\/|$)/);
  return match?.[1] || '';
}

function normalizeAppId(value) {
  const appId = normalizeWhitespace(value);
  return /^\d{1,10}$/.test(appId) ? appId : '';
}

function makeGameCacheKey(endpoint, appId, gameTitle) {
  return appId ? `${endpoint}|appId:${appId}` : `${endpoint}|title:${gameTitle}`;
}

function parseGameResponse(response) {
  const url = normalizeWhitespace(response?.url);
  if (!isSafeHttpUrl(url)) return null;

  const price = typeof response?.price === 'number' ? response.price : Number.NaN;
  return {
    url,
    price: Number.isFinite(price) ? price : null,
  };
}

export function isExcludedSteamPath(pathname) {
  const path = normalizePathname(pathname);
  return EXCLUDED_STEAM_PATH_PREFIXES.some((prefix) => (
    path === prefix || path.startsWith(`${prefix}/`)
  ));
}

export function shouldRunOnSteamPage(locationLike) {
  return locationLike?.hostname === STEAM_STORE_HOSTNAME
    && !isExcludedSteamPath(locationLike?.pathname);
}

export function sanitizePageLocation(locationLike) {
  try {
    const parsed = new URL(locationLike?.href);
    return `${parsed.origin}${parsed.pathname}`;
  } catch (_) {
    const origin = normalizeWhitespace(locationLike?.origin) || `https://${STEAM_STORE_HOSTNAME}`;
    return `${origin}${normalizePathname(locationLike?.pathname)}`;
  }
}

export function extractSteamContext(doc, locationLike) {
  const context = {};
  const appId = getAppId(locationLike?.pathname);
  const appName = normalizeGameTitle(queryFirstAvailable(doc, ['div.apphub_AppName'])?.textContent);
  const fallbackTitle = titleFromDocumentTitle(doc?.title);
  const gameTitle = appName || fallbackTitle;

  if (appId) context.appId = appId;
  if (gameTitle) context.gameTitle = gameTitle;

  return context;
}

export function queryFirstAvailable(doc, selectors) {
  if (!doc || typeof doc.querySelector !== 'function' || !Array.isArray(selectors)) {
    return null;
  }

  for (const selector of selectors) {
    try {
      const node = doc.querySelector(selector);
      if (node) return node;
    } catch (_) {
      // Invalid selectors are treated as misses so later fallbacks can run.
    }
  }

  return null;
}

export function isSafeHttpUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    const isHttp = parsed.protocol === 'http:' || parsed.protocol === 'https:';
    const hostname = parsed.hostname.toLowerCase();
    return isHttp && (hostname === GGSEL_HOSTNAME || hostname.endsWith(`.${GGSEL_HOSTNAME}`));
  } catch (_) {
    return false;
  }
}

export function buildSteamButtonUrl(rawUrl, { variant, buildGgselUrl, utmSource } = {}) {
  if (!isSafeHttpUrl(rawUrl) || typeof buildGgselUrl !== 'function') {
    return null;
  }

  const buttonType = variant === STEAM_BALANCE_BUTTON_VARIANT
    ? STEAM_BALANCE_BUTTON_VARIANT
    : STEAM_GAME_BUTTON_VARIANT;

  try {
    const builtUrl = buildGgselUrl(rawUrl, {
      utmSource,
      buttonType,
      campaignName: buttonType,
      sourceButton: 'steam',
    });
    return isSafeHttpUrl(builtUrl) ? builtUrl : null;
  } catch (_) {
    return null;
  }
}

export function formatSteamPriceText(price) {
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    return null;
  }

  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price).replace(/\u00a0/g, ' ');

  return `${formatted} ₽ на GGSEL`;
}

export async function fetchSteamGameLink(apiBase, backgroundFetchJson, context = {}) {
  const base = normalizeWhitespace(apiBase);
  const appId = normalizeAppId(context?.appId);
  const gameTitle = normalizeGameTitle(context?.gameTitle);

  if (!base || typeof backgroundFetchJson !== 'function' || (!appId && !gameTitle)) {
    return null;
  }

  let endpoint;
  try {
    endpoint = new URL('/api/v1/game', base);
  } catch (_) {
    return null;
  }

  const cacheKey = makeGameCacheKey(endpoint.toString(), appId, gameTitle);
  const now = Date.now();
  const cached = steamGameCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }
  steamGameCache.delete(cacheKey);

  const pending = pendingSteamGameFetches.get(cacheKey);
  if (pending) {
    return pending;
  }

  const request = Promise.resolve()
    .then(async () => {
      const url = new URL(endpoint);
      if (appId) url.searchParams.set('appId', appId);
      if (gameTitle) url.searchParams.set('title', gameTitle);

      const result = parseGameResponse(await backgroundFetchJson(url.toString()));
      if (result) {
        steamGameCache.set(cacheKey, {
          value: result,
          expiresAt: Date.now() + CACHE_TTL_MS,
        });
      }
      return result;
    })
    .catch(() => {
      return null;
    })
    .finally(() => {
      pendingSteamGameFetches.delete(cacheKey);
    });

  pendingSteamGameFetches.set(cacheKey, request);
  return request;
}

export function __resetSteamGameCacheForTest() {
  steamGameCache.clear();
  pendingSteamGameFetches.clear();
}
