import {
  STEAM_WALLET_FALLBACK_URL,
  isSafeHttpUrl,
} from './steamGameData.js';

export const TWITCH_TOPUP_BUTTON_VARIANT = 'steam_topup';
export const TWITCH_GAME_BUTTON_VARIANT = 'twitch_game_key';
export const TWITCH_GAME_LOOKUP_FALLBACK_MS = 10000;

const TWITCH_TOPUP_CAMPAIGN = 'twitch_steam_topup';
const TWITCH_SOURCE_BUTTON = 'twitch';
const TOPUP_LABEL = 'Пополнить Steam';
const BUY_KEY_LABEL = 'Купить ключ';

const DENYLISTED_TWITCH_CATEGORIES = new Set([
  'Just Chatting',
  'IRL',
  'Music',
  'Art',
  'Sports',
  'Talk Shows & Podcasts',
  'Special Events',
  'Food & Drink',
  'Travel & Outdoors',
  'Pools, Hot Tubs, and Beaches',
  'Makers & Crafting',
  'Software and Game Development',
  'ASMR',
]);

function normalizeWhitespace(value) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function normalizePathname(pathname) {
  const value = typeof pathname === 'string' && pathname ? pathname : '/';
  return value.startsWith('/') ? value : `/${value}`;
}

function trackFailure(trackFailed, payload) {
  if (typeof trackFailed !== 'function') return;
  try {
    trackFailed(payload);
  } catch (_) {
    // Analytics must not affect button rendering.
  }
}

function buildTopupPayload(href, reason, gameTitle) {
  const payload = {
    state: 'topup',
    label: TOPUP_LABEL,
    variant: TWITCH_TOPUP_BUTTON_VARIANT,
    href,
    reason,
  };
  if (gameTitle) payload.gameTitle = gameTitle;
  return payload;
}

function buildFailurePayload({
  variant,
  reason,
  pageLocation,
  pagePath,
  error,
}) {
  const errorReason = error?.message ? String(error.message).slice(0, 200) : undefined;
  const payload = {
    button_variant: variant,
    source_button: TWITCH_SOURCE_BUTTON,
    page_location: pageLocation,
    page_path: pagePath,
    button_failure_reason: reason,
  };
  if (errorReason) payload.error_reason = errorReason;
  return payload;
}

export function normalizeTwitchGameTitle(value) {
  const normalized = normalizeWhitespace(value);
  return normalized ? normalized.slice(0, 120) : '';
}

export function isDenylistedTwitchCategory(value) {
  return DENYLISTED_TWITCH_CATEGORIES.has(normalizeTwitchGameTitle(value));
}

export function getEligibleTwitchGameTitle(value) {
  const title = normalizeTwitchGameTitle(value);
  return title && !isDenylistedTwitchCategory(title) ? title : '';
}

export function makeTwitchButtonKey({ pageLocation, gameTitle, enabled } = {}) {
  const state = enabled === false ? 'disabled' : 'enabled';
  return `${state}::${normalizeTwitchGameTitle(pageLocation)}::${normalizeTwitchGameTitle(gameTitle)}`;
}

export function shouldSkipTwitchButtonReconcile({ lastKey, nextKey, hasButtonInContainer } = {}) {
  return Boolean(hasButtonInContainer && lastKey && nextKey && lastKey === nextKey);
}

export function sanitizeTwitchPageLocation(locationLike) {
  try {
    const parsed = new URL(locationLike?.href);
    return `${parsed.origin}${parsed.pathname}`;
  } catch (_) {
    const origin = normalizeWhitespace(locationLike?.origin);
    return `${origin}${normalizePathname(locationLike?.pathname)}`;
  }
}

export function buildTwitchGameButtonUrl(rawUrl, { buildGgselUrl, utmSource } = {}) {
  if (!isSafeHttpUrl(rawUrl) || typeof buildGgselUrl !== 'function') {
    return null;
  }

  try {
    const cleanUrl = new URL(rawUrl);
    cleanUrl.searchParams.delete('game_title');
    const builtUrl = buildGgselUrl(cleanUrl.toString(), {
      utmSource,
      buttonType: TWITCH_GAME_BUTTON_VARIANT,
      campaignName: TWITCH_GAME_BUTTON_VARIANT,
      sourceButton: TWITCH_SOURCE_BUTTON,
    });
    return isSafeHttpUrl(builtUrl) ? builtUrl : null;
  } catch (_) {
    return null;
  }
}

export function buildTwitchTopupButtonUrl(rawUrl, { buildGgselUrl, utmSource } = {}) {
  if (typeof buildGgselUrl !== 'function') {
    return null;
  }

  const sourceUrl = isSafeHttpUrl(rawUrl) ? rawUrl : STEAM_WALLET_FALLBACK_URL;
  try {
    const builtUrl = buildGgselUrl(sourceUrl, {
      utmSource,
      buttonType: TWITCH_TOPUP_BUTTON_VARIANT,
      campaignName: TWITCH_TOPUP_CAMPAIGN,
      sourceButton: TWITCH_SOURCE_BUTTON,
    });
    return isSafeHttpUrl(builtUrl) ? builtUrl : null;
  } catch (_) {
    return null;
  }
}

export function formatTwitchGamePriceText(price) {
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    return null;
  }

  const formatted = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(Math.round(price)).replace(/\u00a0/g, ' ');
  return `${formatted} ₽ на GGSEL`;
}

export function createTwitchGameButtonFlow(options = {}) {
  const {
    pageLocation,
    pagePath,
    rawGameTitle,
    enabled = true,
    getTopupUrl,
    getGameLink,
    buildTopupUrl,
    buildGameUrl,
    render,
    trackFailed,
    setTimer = globalThis.setTimeout,
    clearTimer = globalThis.clearTimeout,
    fallbackMs = TWITCH_GAME_LOOKUP_FALLBACK_MS,
  } = options;

  const eligibleGameTitle = getEligibleTwitchGameTitle(rawGameTitle);
  const key = makeTwitchButtonKey({ pageLocation, gameTitle: eligibleGameTitle || rawGameTitle, enabled });
  let stopped = false;
  let fallbackTimer = null;
  let fallbackReason = 'game_lookup_timeout';
  let fallbackRendered = false;
  let latestTopupUrl = null;

  const stop = () => {
    stopped = true;
    if (fallbackTimer !== null && typeof clearTimer === 'function') {
      clearTimer(fallbackTimer);
      fallbackTimer = null;
    }
  };

  const renderPayload = (payload) => {
    if (stopped || typeof render !== 'function') return;
    render(payload);
  };

  const buildTopupHref = () => {
    if (typeof buildTopupUrl !== 'function') return null;
    try {
      return buildTopupUrl(latestTopupUrl);
    } catch (_) {
      return null;
    }
  };

  const renderTopup = (reason) => {
    const href = buildTopupHref();
    if (!href) return;
    fallbackRendered = true;
    renderPayload(buildTopupPayload(href, reason, eligibleGameTitle));
  };

  const deferTopup = (reason) => {
    fallbackReason = reason;
    if (fallbackTimer === null && !fallbackRendered) {
      renderTopup(reason);
    }
  };

  const clearFallbackTimer = () => {
    if (fallbackTimer !== null && typeof clearTimer === 'function') {
      clearTimer(fallbackTimer);
      fallbackTimer = null;
    }
  };

  const trackGameFailure = (reason, error) => {
    trackFailure(trackFailed, buildFailurePayload({
      variant: TWITCH_GAME_BUTTON_VARIANT,
      reason,
      pageLocation,
      pagePath,
      error,
    }));
  };

  const buildGameHref = (rawUrl) => {
    if (!isSafeHttpUrl(rawUrl) || typeof buildGameUrl !== 'function') return null;
    try {
      const href = buildGameUrl(rawUrl);
      return isSafeHttpUrl(href) ? href : null;
    } catch (_) {
      return null;
    }
  };

  if (enabled === false) {
    return { key, eligibleGameTitle, stop };
  }

  const topupPromise = Promise.resolve()
    .then(() => (typeof getTopupUrl === 'function' ? getTopupUrl() : null))
    .then((url) => {
      if (stopped) return null;
      latestTopupUrl = url || null;
      return latestTopupUrl;
    })
    .catch((error) => {
      if (stopped) return null;
      trackFailure(trackFailed, buildFailurePayload({
        variant: TWITCH_TOPUP_BUTTON_VARIANT,
        reason: 'fetch_error',
        pageLocation,
        pagePath,
        error,
      }));
      latestTopupUrl = null;
      return null;
    });

  if (!eligibleGameTitle) {
    topupPromise.then(() => {
      renderTopup('no_eligible_game');
    });
    return { key, eligibleGameTitle, stop };
  }

  renderPayload({ state: 'loading', gameTitle: eligibleGameTitle });

  if (typeof setTimer === 'function') {
    fallbackTimer = setTimer(() => {
      fallbackTimer = null;
      renderTopup(fallbackReason);
    }, fallbackMs);
  }

  Promise.resolve()
    .then(() => (typeof getGameLink === 'function' ? getGameLink(eligibleGameTitle) : null))
    .then((result) => {
      if (stopped) return;
      const rawUrl = result?.url;
      const label = formatTwitchGamePriceText(result?.price);

      if (!result || !rawUrl) {
        trackGameFailure('game_price_not_found');
        deferTopup('game_price_not_found');
        return;
      }

      const href = buildGameHref(rawUrl);
      if (!href) {
        trackGameFailure('game_price_not_found');
        deferTopup('game_price_not_found');
        return;
      }

      if (!label) {
        clearFallbackTimer();
        renderPayload({
          state: 'game_key',
          label: BUY_KEY_LABEL,
          variant: TWITCH_GAME_BUTTON_VARIANT,
          href,
          gameTitle: eligibleGameTitle,
        });
        return;
      }

      clearFallbackTimer();
      renderPayload({
        state: 'game_price',
        label,
        variant: TWITCH_GAME_BUTTON_VARIANT,
        href,
        gameTitle: eligibleGameTitle,
      });
    })
    .catch((error) => {
      if (stopped) return;
      trackGameFailure('game_lookup_error', error);
      deferTopup('game_lookup_error');
    });

  return { key, eligibleGameTitle, stop };
}
