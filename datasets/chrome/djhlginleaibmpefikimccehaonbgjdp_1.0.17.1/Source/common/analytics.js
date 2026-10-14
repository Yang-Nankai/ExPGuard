import {
  DEFAULT_API_BASE,
  GA_MEASUREMENT_ID,
  GA_API_SECRET,
  YM_COUNTER_ID,
  OWN_ANALYTICS_ENABLED,
  OWN_ANALYTICS_TIMEOUT_MS,
  buildEventsEndpoint,
} from './config.js';

export const ANALYTICS_MESSAGE_TYPE = 'ggsel_analytics';
const ANALYTICS_STORAGE_KEY = 'analyticsState';
const ANALYTICS_USER_ID_STORAGE_KEY = 'user_id';
const ANALYTICS_GGSEL_CLIENT_ID_STORAGE_KEY = 'client_id_ggsel';
const ANALYTICS_GGSEL_CLIENT_ID_OWNER_STORAGE_KEY = 'client_id_ggsel_user_id';
const ANALYTICS_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const YM_ENDPOINT = 'https://mc.yandex.ru/watch';
const GA_ORIGIN_PATTERN = 'https://www.google-analytics.com/*';
const YM_ORIGIN_PATTERN = 'https://mc.yandex.ru/*';
const MAX_PARAM_LENGTH = 100;
const YM_CHARSET = 'utf-8';
const METRICA_HIT_EVENTS = new Set([
  'popup_open',
  'steam_visit',
  'twitch_visit',
  'external_url_visit',
  'ggsel_visit',
  'extension_install',
  'extension_update',
]);
const GGSEL_COOKIE_ALLOWLIST = new Set([
  '_ym_uid',
]);
const METRICA_FALLBACK_ORIGIN = (() => {
  try {
    return new URL(DEFAULT_API_BASE).origin;
  } catch (_) {
    return 'https://ggsel-extension/internal';
  }
})();

function generateId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return (
    Math.random().toString(16).slice(2) +
    Math.random().toString(16).slice(2) +
    Date.now().toString(16)
  ).slice(0, 36);
}

function parseReferrer(referrerUrl) {
  if (typeof referrerUrl !== 'string' || !referrerUrl) {
    return null;
  }
  try {
    const url = new URL(referrerUrl);
    const info = { url: url.toString() };
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    for (const key of keys) {
      const value = url.searchParams.get(key);
      if (value) {
        info[key] = value;
      }
    }
    return info;
  } catch (_) {
    return { url: referrerUrl };
  }
}

function normalizeStoredString(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim();
}

async function readState() {
  const stored = await chrome.storage.local.get(ANALYTICS_STORAGE_KEY);
  const state = stored && typeof stored === 'object' ? stored[ANALYTICS_STORAGE_KEY] : null;
  if (!state || typeof state !== 'object') {
    return {};
  }
  return state;
}

async function writeState(nextState) {
  const payload = { [ANALYTICS_STORAGE_KEY]: nextState };
  const removeKeys = [];

  const userId = normalizeStoredString(nextState?.userId || nextState?.clientId);
  if (userId) {
    payload[ANALYTICS_USER_ID_STORAGE_KEY] = userId;
  } else {
    removeKeys.push(ANALYTICS_USER_ID_STORAGE_KEY);
  }

  const ggselClientId = normalizeStoredString(nextState?.ggselClientId);
  if (ggselClientId) {
    payload[ANALYTICS_GGSEL_CLIENT_ID_STORAGE_KEY] = ggselClientId;
  } else {
    removeKeys.push(ANALYTICS_GGSEL_CLIENT_ID_STORAGE_KEY);
  }

  const ggselClientOwnerId = normalizeStoredString(nextState?.ggselClientIdUserId);
  if (ggselClientOwnerId) {
    payload[ANALYTICS_GGSEL_CLIENT_ID_OWNER_STORAGE_KEY] = ggselClientOwnerId;
  } else {
    removeKeys.push(ANALYTICS_GGSEL_CLIENT_ID_OWNER_STORAGE_KEY);
  }

  await chrome.storage.local.set(payload);
  if (removeKeys.length > 0 && chrome?.storage?.local?.remove) {
    await chrome.storage.local.remove(removeKeys);
  }
  return nextState;
}

async function mergeState(patch) {
  const current = await readState();
  const next = Object.assign({}, current, patch);
  return await writeState(next);
}

async function ensureState() {
  let state = await readState();
  const persisted = await chrome.storage.local.get([
    ANALYTICS_USER_ID_STORAGE_KEY,
    ANALYTICS_GGSEL_CLIENT_ID_STORAGE_KEY,
    ANALYTICS_GGSEL_CLIENT_ID_OWNER_STORAGE_KEY,
  ]);

  const persistedUserId = normalizeStoredString(persisted?.[ANALYTICS_USER_ID_STORAGE_KEY]);
  const persistedGgselClientId = normalizeStoredString(persisted?.[ANALYTICS_GGSEL_CLIENT_ID_STORAGE_KEY]);
  const persistedGgselClientOwnerId = normalizeStoredString(persisted?.[ANALYTICS_GGSEL_CLIENT_ID_OWNER_STORAGE_KEY]);

  let mutated = false;
  let needsIdentitySync = false;

  if (!state.userId && persistedUserId) {
    state.userId = persistedUserId;
    mutated = true;
  }
  if (!state.clientId) {
    state.clientId = state.userId || generateId();
    mutated = true;
  }
  if (!state.userId) {
    state.userId = state.clientId;
    mutated = true;
  }
  if (!state.ggselClientId && persistedGgselClientId) {
    state.ggselClientId = persistedGgselClientId;
    mutated = true;
  }
  if (!state.ggselClientIdUserId && persistedGgselClientOwnerId) {
    state.ggselClientIdUserId = persistedGgselClientOwnerId;
    mutated = true;
  }

  if (!persistedUserId || persistedUserId !== state.userId) {
    needsIdentitySync = true;
  }
  if (state.ggselClientId && (!persistedGgselClientId || persistedGgselClientId !== state.ggselClientId)) {
    needsIdentitySync = true;
  }
  if (state.ggselClientIdUserId && (!persistedGgselClientOwnerId || persistedGgselClientOwnerId !== state.ggselClientIdUserId)) {
    needsIdentitySync = true;
  }

  if (mutated) {
    state = await writeState(state);
  } else if (needsIdentitySync) {
    await writeState(state);
  }
  return state;
}

async function hasOriginPermission(originPattern) {
  if (!originPattern) {
    return false;
  }
  try {
    if (!chrome.permissions || typeof chrome.permissions.contains !== 'function') {
      return true;
    }
    return await chrome.permissions.contains({ origins: [originPattern] });
  } catch (error) {
    console.warn('Failed to check origin permission', originPattern, error);
    return false;
  }
}

function sanitizeValue(value) {
  if (value == null) {
    return undefined;
  }
  if (typeof value === 'string') {
    if (value.length > MAX_PARAM_LENGTH) {
      return value.slice(0, MAX_PARAM_LENGTH);
    }
    return value;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  try {
    const str = String(value);
    return str.length > MAX_PARAM_LENGTH ? str.slice(0, MAX_PARAM_LENGTH) : str;
  } catch (_) {
    return undefined;
  }
}

function pruneParams(params) {
  const result = {};
  for (const [key, rawValue] of Object.entries(params || {})) {
    if (!key) {
      continue;
    }
    const safeValue = sanitizeValue(rawValue);
    if (typeof safeValue === 'undefined') {
      continue;
    }
    result[key] = safeValue;
  }
  return result;
}

function getManifestVersion() {
  try {
    const manifest = chrome.runtime.getManifest();
    return manifest && manifest.version ? manifest.version : undefined;
  } catch (_) {
    return undefined;
  }
}

function getMonthKey(date = new Date()) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  return `${year}-${month.toString().padStart(2, '0')}`;
}

function getDayKey(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getIsoWeekKey(date = new Date()) {
  // ISO 8601 week number: Monday is first day of week, week 1 contains Jan 4.
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7; // Sun=0 -> 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

// Mirror of backend GLOBAL_PROPERTY_ALLOWLIST in services/analyticsService.js.
// Default-deny: only fields here pass the client filter.
// Aligned with technical spec sections 3.2 + 3.3 (event properties catalog).
const OWN_BACKEND_PROPERTY_ALLOWLIST = new Set([
  // Lifecycle
  'extension_version',
  'platform',
  'previous_version',
  'install_timestamp',
  'install_reason',
  // Source / referral
  'referrer_url',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'event_source',
  'source_button',
  // Activity markers
  'active_date',
  'active_week',
  'active_month',
  'active_source',
  'active_tabs_count',
  // Popup
  'popup_location',
  'quality_enabled',
  'target_state',
  'previous_state',
  'link_url',
  // Twitch
  'visit_reason',
  'channel_name',
  'channel_id',
  'stream_id',
  'page_path',
  'page_location',
  'steam_app_id',
  'game_title',
  // Stream session
  'stream_session_id',
  'duration_sec',
  'duration_ms',
  'end_reason',
  // GGSEL button
  'button_variant',
  'button_text',
  'button_failure_reason',
  'error_reason',
  // Usage tracker
  'usage_source',
  'usage_state',
  'usage_end_reason',
  'usage_transition',
  'usage_context_changed',
  // Misc
  'version',
  'days_since_install',
]);

const OWN_BACKEND_KNOWN_EVENTS = new Set([
  'extension_install',
  'extension_update',
  'extension_uninstall',
  'user_session_start',
  'user_active_daily',
  'user_active_weekly',
  'user_active_monthly',
  'popup_open',
  'popup_toggle_click',
  'popup_telegram_click',
  'notifications_toggle',
  'twitch_visit',
  'stream_session_start',
  'stream_session_end',
  'extension_usage_interval',
  'ggsel_visit',
  'ggsel_button_ready',
  'ggsel_button_failed',
  'ggsel_button_click',
  'ggsel_stats_open',
]);

export function pickAllowedProperties(rawProps) {
  if (!rawProps || typeof rawProps !== 'object') return {};
  const out = {};
  for (const [k, v] of Object.entries(rawProps)) {
    if (!OWN_BACKEND_PROPERTY_ALLOWLIST.has(k)) continue;
    if (v === null || typeof v === 'undefined') continue;
    if (typeof v === 'string') {
      out[k] = v.length > 200 ? v.slice(0, 200) : v;
    } else if (typeof v === 'number' && Number.isFinite(v)) {
      out[k] = v;
    } else if (typeof v === 'boolean') {
      out[k] = v;
    }
  }
  return out;
}

// Session ID per browser session (spec section 3.1). Persisted in
// chrome.storage.session — wiped when all browser windows close, so a
// fresh browser launch starts a new session_id automatically.
const SESSION_ID_STORAGE_KEY = 'analytics_session_id';
let cachedSessionId = null;
async function getSessionId() {
  if (cachedSessionId) return cachedSessionId;
  try {
    if (chrome?.storage?.session) {
      const stored = await chrome.storage.session.get(SESSION_ID_STORAGE_KEY);
      const existing = stored?.[SESSION_ID_STORAGE_KEY];
      if (typeof existing === 'string' && existing.length >= 8) {
        cachedSessionId = existing;
        return cachedSessionId;
      }
      cachedSessionId = generateId();
      await chrome.storage.session.set({ [SESSION_ID_STORAGE_KEY]: cachedSessionId });
      return cachedSessionId;
    }
  } catch (error) {
    console.warn('Failed to read session id from storage.session', error);
  }
  // fallback for content-script contexts without storage.session access
  cachedSessionId = cachedSessionId || generateId();
  return cachedSessionId;
}

export async function buildOwnEvent(eventName, params, state) {
  const userId = (state && (state.userId || state.clientId)) || '';
  const sessionId = await getSessionId();
  return {
    event_id: generateId(),
    name: eventName,
    ts: Date.now(),
    user_id: userId,
    session_id: sessionId,
    client_id: (state && state.ggselClientId) || null,
    properties: pickAllowedProperties(params),
    extension_version: getManifestVersion() || null,
  };
}

// When a batch buffer is configured (by background.js), events are queued
// instead of sent immediately. Direct send remains the fallback path for
// non-service-worker contexts.
let ownBackendBuffer = null;

export function setOwnBackendBuffer(buffer) {
  ownBackendBuffer = buffer && typeof buffer.push === 'function' ? buffer : null;
}

// Spec section 6.3: flush queue immediately when popup opens (user is
// actively engaging — minimize buffering latency for these touchpoints).
const FLUSH_AFTER_EVENTS = new Set([
  'popup_open',
  'extension_install',
  'extension_update',
  'ggsel_button_click',
]);

async function sendToOwnBackend(eventName, params, state) {
  if (!OWN_ANALYTICS_ENABLED) return false;
  if (!OWN_BACKEND_KNOWN_EVENTS.has(eventName)) return false;
  if (!state || (!state.userId && !state.clientId)) return false;

  const event = await buildOwnEvent(eventName, params, state);
  if (!event.user_id) return false;

  if (ownBackendBuffer) {
    try {
      await ownBackendBuffer.push(event);
      if (FLUSH_AFTER_EVENTS.has(eventName)) {
        // fire-and-forget — flush errors stay inside the buffer
        ownBackendBuffer.flush().catch(() => {});
      }
      return true;
    } catch (error) {
      console.warn('Own analytics buffer push failed; falling back to direct send', error);
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OWN_ANALYTICS_TIMEOUT_MS);
  try {
    const response = await fetch(buildEventsEndpoint(), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ events: [event] }),
      credentials: 'omit',
      signal: controller.signal,
    });
    return response.ok;
  } catch (error) {
    console.warn('Own analytics send failed', error);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

// Batch buffer for own-backend events. Service worker hibernates after ~30s
// idle in MV3, so we persist the queue to chrome.storage.session on every push
// and restore it on wake. Events are flushed on size threshold, periodic timer,
// and chrome.runtime.onSuspend (wired in background.js).
export function createBatchBuffer({ flushSize = 20, hardCap = 100, persistKey, sender, storage, backoffBaseMs = 1000, backoffMaxMs = 60000 }) {
  if (!persistKey) throw new Error('createBatchBuffer requires persistKey');
  if (!storage || typeof storage.get !== 'function' || typeof storage.set !== 'function') {
    throw new Error('createBatchBuffer requires storage with get/set');
  }
  let queue = [];
  let inFlight = false;
  let activeSender = typeof sender === 'function' ? sender : async () => {};
  // Exponential backoff state per spec section 6.3 (1s, 2s, 4s … capped).
  let consecutiveFailures = 0;
  let nextRetryAt = 0;

  async function persist() {
    try {
      await storage.set({ [persistKey]: queue });
    } catch (err) {
      console.warn('analytics buffer persist failed', err);
    }
  }

  async function restore() {
    try {
      const raw = await storage.get(persistKey);
      const stored = raw && raw[persistKey];
      if (Array.isArray(stored)) {
        queue = stored.slice(0, hardCap);
      }
    } catch (err) {
      console.warn('analytics buffer restore failed', err);
    }
  }

  async function push(event) {
    queue.push(event);
    if (queue.length > hardCap) {
      const drop = queue.length - hardCap;
      queue.splice(0, drop);
      console.warn('analytics buffer overflow, dropped oldest', drop);
    }
    await persist();
    if (queue.length >= flushSize && !inFlight) {
      // fire-and-forget; flush errors are swallowed inside flush()
      flush();
    }
  }

  async function flush() {
    if (inFlight) return false;
    if (queue.length === 0) return true;
    if (Date.now() < nextRetryAt) return false; // backoff in effect
    inFlight = true;
    // Send only up to flushSize events per request — server-side BATCH_LIMIT
    // (20) AND payload-size limit must not be exceeded, even when the queue
    // grew during a backoff window. If more events remain after success,
    // schedule another flush immediately.
    const batch = queue.slice(0, flushSize);
    const remaining = queue.slice(flushSize);
    queue = remaining;
    await persist();
    try {
      await activeSender(batch);
      consecutiveFailures = 0;
      nextRetryAt = 0;
      // If queue still has events after this chunk, drain in next microtask.
      if (queue.length > 0) {
        Promise.resolve().then(() => { flush().catch(() => {}); });
      }
      return true;
    } catch (err) {
      console.warn('analytics buffer flush failed; returning events to queue', err);
      // restore THIS chunk to the front of the queue, respecting hardCap
      queue = batch.concat(queue).slice(0, hardCap);
      await persist();
      consecutiveFailures += 1;
      const backoffMs = Math.min(backoffBaseMs * Math.pow(2, consecutiveFailures - 1), backoffMaxMs);
      nextRetryAt = Date.now() + backoffMs;
      return false;
    } finally {
      inFlight = false;
    }
  }

  function setSender(fn) {
    activeSender = typeof fn === 'function' ? fn : activeSender;
  }

  function size() {
    return queue.length;
  }

  return { push, flush, restore, setSender, size };
}

async function sendToGoogleAnalytics(payload) {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return false;
  }
  if (!GA_API_SECRET || GA_API_SECRET === 'YOUR_API_SECRET') {
    return false;
  }
  if (!(await hasOriginPermission(GA_ORIGIN_PATTERN))) {
    return false;
  }
  try {
    const endpoint = `${ANALYTICS_ENDPOINT}?measurement_id=${encodeURIComponent(GA_MEASUREMENT_ID)}&api_secret=${encodeURIComponent(GA_API_SECRET)}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch (error) {
    console.warn('Analytics send failed', error);
    return false;
  }
}

async function buildBaseParams(state) {
  const manifestVersion = getManifestVersion();
  const base = {
    engagement_time_msec: '1',
    platform: 'chrome_extension',
    extension_version: manifestVersion,
  };
  if (state.userId) {
    base.user_id = state.userId;
  }
  if (state.ggselClientId) {
    base.client_id = state.ggselClientId;
  }
  if (state.installReferrer && typeof state.installReferrer === 'object') {
    if (state.installReferrer.url) base.install_referrer = state.installReferrer.url;
    if (state.installReferrer.utm_source) base.install_utm_source = state.installReferrer.utm_source;
    if (state.installReferrer.utm_medium) base.install_utm_medium = state.installReferrer.utm_medium;
    if (state.installReferrer.utm_campaign) base.install_utm_campaign = state.installReferrer.utm_campaign;
    if (state.installReferrer.utm_term) base.install_utm_term = state.installReferrer.utm_term;
    if (state.installReferrer.utm_content) base.install_utm_content = state.installReferrer.utm_content;
  }
  if (state.installAt) {
    const daysSince = Math.floor((Date.now() - state.installAt) / 86400000);
    base.days_since_install = daysSince >= 0 ? daysSince : undefined;
  }
  if (state.installReason) {
    base.install_reason = state.installReason;
  }
  if (state.installVersion) {
    base.install_version = state.installVersion;
  }
  return pruneParams(base);
}

function sanitizeMetricaGoalName(value) {
  const name = typeof value === 'string' ? value.trim() : '';
  if (!name) {
    return 'event';
  }
  const sanitized = name
    .replace(/[/&=?#]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_.:-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 100);
  return sanitized || 'event';
}

function isHttpUrl(value) {
  if (typeof value !== 'string' || !value) {
    return false;
  }
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

function buildMetricaFallbackUrl(eventName) {
  const safeName = sanitizeMetricaGoalName(eventName || 'event');
  const url = new URL('/extension', METRICA_FALLBACK_ORIGIN);
  url.pathname = `/extension/${safeName}`;
  return url.toString();
}

function normalizeMetricaUrl(rawUrl, eventName) {
  if (isHttpUrl(rawUrl)) {
    return rawUrl;
  }
  return buildMetricaFallbackUrl(eventName);
}

function buildMetricaGoalUrl(hostname, goalName) {
  const safeGoal = sanitizeMetricaGoalName(goalName);
  const host = typeof hostname === 'string' && hostname ? hostname : 'ggsel-extension';
  return `goal://${host}/${safeGoal}`;
}

function buildMetricaBrowserInfo(state, flags = {}) {
  const parts = [];
  const unixSeconds = Math.floor(Date.now() / 1000);
  const merged = Object.assign({ st: unixSeconds }, flags || {});
  for (const [key, value] of Object.entries(merged)) {
    if (!key) {
      continue;
    }
    if (value == null) {
      continue;
    }
    parts.push(`${key}:${value}`);
  }
  const uid = state?.userId || state?.clientId;
  if (uid) {
    parts.push(`uid:${uid}`);
  }
  return parts.join(':');
}

function buildMetricaUrl(counterId, suffix, searchParams) {
  const base = `${YM_ENDPOINT}/${encodeURIComponent(counterId)}${suffix || ''}`;
  const query = searchParams.toString();
  return query ? `${base}?${query}` : base;
}

async function sendMetricaRequest(url, fetchOptions, useNoCors) {
  const options = Object.assign({}, fetchOptions);
  if (useNoCors) {
    options.mode = 'no-cors';
  }
  const response = await fetch(url, options);
  if (!useNoCors && !response.ok) {
    console.warn('Yandex metrica request failed with status', response.status, response.statusText);
  }
  return useNoCors ? true : response.ok;
}

async function sendMetricaHit(pageUrl, referrer, state, options = {}) {
  const searchParams = new URLSearchParams();
  searchParams.set('rn', Math.random().toString(16).slice(2));
  searchParams.set('charset', YM_CHARSET);
  searchParams.set('page-url', pageUrl);
  if (referrer) {
    searchParams.set('page-ref', referrer);
  }
  searchParams.set('browser-info', buildMetricaBrowserInfo(state, { pv: 1, wh: 1 }));

  const url = buildMetricaUrl(YM_COUNTER_ID, '', searchParams);
  const useNoCors = options?.noCors !== false;
  return await sendMetricaRequest(url, { method: 'GET' }, useNoCors);
}

async function sendMetricaGoal(goalName, pageUrl, goalParams, state, options = {}) {
  const goalUrl = (() => {
    try {
      const parsed = new URL(pageUrl);
      return buildMetricaGoalUrl(parsed.hostname, goalName);
    } catch (_) {
      return buildMetricaGoalUrl('ggsel-extension', goalName);
    }
  })();

  const searchParams = new URLSearchParams();
  searchParams.set('rn', Math.random().toString(16).slice(2));
  searchParams.set('charset', YM_CHARSET);
  searchParams.set('page-url', goalUrl);
  searchParams.set('page-ref', pageUrl);
  searchParams.set('browser-info', buildMetricaBrowserInfo(state, { ar: 1 }));

  const suffix = (goalParams && Object.keys(goalParams).length > 0) ? '/1' : '';
  const url = buildMetricaUrl(YM_COUNTER_ID, suffix, searchParams);
  const useNoCors = options?.noCors !== false;

  if (!goalParams || Object.keys(goalParams).length === 0) {
    return await sendMetricaRequest(url, { method: 'GET' }, useNoCors);
  }

  const body = `site-info=${encodeURIComponent(JSON.stringify(goalParams))}`;
  return await sendMetricaRequest(
    url,
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    },
    useNoCors
  );
}

async function sendToYandexMetrica(eventName, params, state, options = {}) {
  if (!YM_COUNTER_ID || YM_COUNTER_ID === '00000000') {
    return false;
  }
  if (!(await hasOriginPermission(YM_ORIGIN_PATTERN))) {
    return false;
  }
  try {
    const pageUrlRaw = params.page_location || options.pageLocation || '';
    const pageUrl = normalizeMetricaUrl(pageUrlRaw, eventName);
    const referrerRaw = params.page_referrer || '';
    const referrer = isHttpUrl(referrerRaw) ? referrerRaw : '';

    const payloadParams = { ...params };
    delete payloadParams.page_location;
    delete payloadParams.page_referrer;

    const shouldSendHit = METRICA_HIT_EVENTS.has(eventName);
    const hitOk = shouldSendHit
      ? await sendMetricaHit(pageUrl, referrer, state, options).catch((error) => {
          console.warn('Yandex metrica hit failed', error);
          return false;
        })
      : false;
    const goalOk = await sendMetricaGoal(eventName, pageUrl, payloadParams, state, options).catch((error) => {
      console.warn('Yandex metrica goal failed', error);
      return false;
    });
    return Boolean(hitOk || goalOk);
  } catch (error) {
    console.warn('Yandex metrica send failed', error);
    return false;
  }
}

async function logEventInternal(eventName, params = {}, options = {}) {
  if (typeof eventName !== 'string' || eventName.length === 0) {
    return false;
  }
  const state = await ensureState();
  const baseStatePatch = {};
  if (!state.installVersion) {
    baseStatePatch.installVersion = getManifestVersion();
  }
  if (Object.keys(baseStatePatch).length > 0) {
    await mergeState(baseStatePatch);
  }
  const baseParams = await buildBaseParams(await readState());
  const sender = options && options.sender ? options.sender : null;
  const finalParams = pruneParams({
    ...baseParams,
    ...params,
    page_location: options.pageLocation || params.page_location || sender?.url,
    page_referrer: sender?.documentUrl || undefined,
  });

  const payload = {
    client_id: state.clientId,
    user_id: state.userId || state.clientId,
    events: [
      {
        name: eventName,
        params: finalParams,
      },
    ],
  };

  if (options.timestampMicros && Number.isFinite(options.timestampMicros)) {
    payload.timestamp_micros = Math.trunc(options.timestampMicros);
  }

  const settled = await Promise.allSettled([
    sendToGoogleAnalytics(payload),
    sendToYandexMetrica(eventName, finalParams, state, options),
    sendToOwnBackend(eventName, finalParams, state),
  ]);
  return settled.some((s) => s.status === 'fulfilled' && s.value === true);
}

export async function sendAnalyticsEvent(eventName, params = {}, options = {}) {
  if (!chrome?.runtime?.id) {
    return false;
  }
  return await new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(
        {
          type: ANALYTICS_MESSAGE_TYPE,
          payload: {
            action: 'event',
            eventName,
            params,
            options,
          },
        },
        (response) => {
          if (chrome.runtime.lastError) {
            resolve(false);
            return;
          }
          resolve(response && response.ok === true);
        }
      );
    } catch (_) {
      resolve(false);
    }
  });
}

export async function touchMonthlyActive(source = 'unknown', extraParams = {}) {
  if (!chrome?.runtime?.id) {
    return false;
  }
  return await new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(
        {
          type: ANALYTICS_MESSAGE_TYPE,
          payload: {
            action: 'touchMonthlyActive',
            source,
            extraParams,
          },
        },
        (response) => {
          if (chrome.runtime.lastError) {
            resolve(false);
            return;
          }
          resolve(response && response.ok === true);
        }
      );
    } catch (_) {
      resolve(false);
    }
  });
}

export async function handleInstall(details = {}) {
  const state = await ensureState();
  const reason = details && details.reason ? details.reason : 'install';
  const patch = {};
  if (reason === (chrome.runtime.OnInstalledReason && chrome.runtime.OnInstalledReason.INSTALL ? chrome.runtime.OnInstalledReason.INSTALL : 'install')) {
    patch.installAt = Date.now();
    patch.installReason = 'install';
    patch.installVersion = getManifestVersion();
    const refInfo = parseReferrer(details.referrerUrl);
    if (refInfo) {
      patch.installReferrer = refInfo;
    }
    await mergeState(patch);
    await logEventInternal('user_id', {
      user_id: state.userId || state.clientId,
      timestamp: Math.floor(Date.now() / 1000),
    });
    await logEventInternal('extension_install', {
      referrer_url: refInfo && refInfo.url ? refInfo.url : undefined,
      utm_source: refInfo && refInfo.utm_source ? refInfo.utm_source : undefined,
      utm_medium: refInfo && refInfo.utm_medium ? refInfo.utm_medium : undefined,
      utm_campaign: refInfo && refInfo.utm_campaign ? refInfo.utm_campaign : undefined,
    });
  } else if (reason === (chrome.runtime.OnInstalledReason && chrome.runtime.OnInstalledReason.UPDATE ? chrome.runtime.OnInstalledReason.UPDATE : 'update')) {
    patch.lastUpdateAt = Date.now();
    patch.previousVersion = details.previousVersion || undefined;
    await mergeState(patch);
    await logEventInternal('extension_update', {
      previous_version: details.previousVersion || undefined,
    });
  } else {
    patch.lastLifecycleReason = reason;
    await mergeState(patch);
  }
  return state.userId || state.clientId;
}

export async function getUserId() {
  const state = await ensureState();
  return state.userId || state.clientId || undefined;
}

export async function setUserId(rawUserId, options = {}) {
  const userId = normalizeStoredString(rawUserId);
  if (!userId) {
    return false;
  }

  const state = await ensureState();
  if (state.userId === userId) {
    return false;
  }

  const patch = {
    userId,
    userIdUpdatedAt: Date.now(),
  };
  const source = normalizeStoredString(options?.source);
  if (source) {
    patch.userIdSource = source;
  }
  if (state.ggselClientId) {
    patch.ggselClientIdUserId = userId;
  }

  await mergeState(patch);
  return true;
}

export async function setGgselClientId(rawClientId) {
  const clientId = typeof rawClientId === 'string' ? rawClientId.trim() : '';
  if (!clientId) {
    return false;
  }
  const state = await ensureState();
  const ownerUserId = state.userId || state.clientId || '';
  if (state.ggselClientId === clientId && state.ggselClientIdUserId === ownerUserId) {
    return false;
  }
  await mergeState({
    ggselClientId: clientId,
    ggselClientIdUpdatedAt: Date.now(),
    ggselClientIdUserId: ownerUserId || undefined,
  });
  return true;
}

export async function handleAnalyticsMessage(message = {}, sender) {
  if (!message || typeof message !== 'object') {
    return { ok: false };
  }
  if (message.action === 'event') {
    const params = message.params || {};
    const options = Object.assign({}, message.options, { sender });
    const ok = await logEventInternal(message.eventName, params, options);
    return { ok };
  }
  if (message.action === 'touchMonthlyActive') {
    const ok = await recordMonthlyActiveInternal(message.source, message.extraParams, sender);
    return { ok };
  }
  if (message.action === 'readCookie') {
    const urlRaw = typeof message.url === 'string' ? message.url : '';
    const name = typeof message.name === 'string' ? message.name : '';
    if (!urlRaw || !name || !GGSEL_COOKIE_ALLOWLIST.has(name)) {
      return { ok: false, value: '' };
    }
    try {
      const parsed = new URL(urlRaw);
      const host = parsed.hostname.toLowerCase();
      const allowed = host === 'ggsel.net' || host.endsWith('.ggsel.net');
      if (!allowed) {
        return { ok: false, value: '' };
      }
    } catch (_) {
      return { ok: false, value: '' };
    }

    try {
      if (!chrome.cookies || typeof chrome.cookies.get !== 'function') {
        return { ok: false, value: '' };
      }
      const cookie = await chrome.cookies.get({ url: urlRaw, name });
      const value = cookie && typeof cookie.value === 'string' ? cookie.value : '';
      return { ok: true, value };
    } catch (error) {
      console.warn('Failed to read cookie from background', { url: urlRaw, name, error });
      return { ok: false, value: '' };
    }
  }
  return { ok: false };
}

export async function readCookieValue({ url, name } = {}) {
  if (!chrome?.runtime?.id) {
    return '';
  }
  const urlRaw = typeof url === 'string' ? url : '';
  const cookieName = typeof name === 'string' ? name : '';
  if (!urlRaw || !cookieName) {
    return '';
  }
  return await new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(
        {
          type: ANALYTICS_MESSAGE_TYPE,
          payload: {
            action: 'readCookie',
            url: urlRaw,
            name: cookieName,
          },
        },
        (response) => {
          if (chrome.runtime.lastError) {
            resolve('');
            return;
          }
          resolve(response && typeof response.value === 'string' ? response.value : '');
        }
      );
    } catch (_) {
      resolve('');
    }
  });
}

async function recordMonthlyActiveInternal(source = 'unknown', extraParams = {}, sender) {
  // Spec section 3.2 + 6.1: fire daily/weekly/monthly markers, dedup per period via storage.
  const now = Date.now();
  const state = await ensureState();
  const dayKey = getDayKey(new Date(now));
  const weekKey = getIsoWeekKey(new Date(now));
  const monthKey = getMonthKey(new Date(now));
  const patch = { lastActiveAt: now };

  let emitDaily = false;
  let emitWeekly = false;
  let emitMonthly = false;

  if (state.lastDailyActive !== dayKey) {
    patch.lastDailyActive = dayKey;
    emitDaily = true;
  }
  if (state.lastWeeklyActive !== weekKey) {
    patch.lastWeeklyActive = weekKey;
    emitWeekly = true;
  }
  if (state.lastMonthlyActive !== monthKey) {
    patch.lastMonthlyActive = monthKey;
    emitMonthly = true;
  }
  await mergeState(patch);

  let anyEmitted = false;
  if (emitDaily) {
    const ok = await logEventInternal('user_active_daily', {
      ...extraParams,
      active_date: dayKey,
      active_source: source,
    }, { sender });
    anyEmitted = anyEmitted || ok;
  }
  if (emitWeekly) {
    const ok = await logEventInternal('user_active_weekly', {
      ...extraParams,
      active_week: weekKey,
      active_source: source,
    }, { sender });
    anyEmitted = anyEmitted || ok;
  }
  if (emitMonthly) {
    const ok = await logEventInternal('user_active_monthly', {
      ...extraParams,
      active_month: monthKey,
      active_source: source,
    }, { sender });
    anyEmitted = anyEmitted || ok;
  }
  return anyEmitted;
}

export async function recordMonthlyActive(source = 'unknown', extraParams = {}) {
  return await recordMonthlyActiveInternal(source, extraParams, null);
}

export async function logAnalyticsEvent(eventName, params = {}, options = {}) {
  return await logEventInternal(eventName, params, options);
}

function dispatchUsageEvent(payload, source, stateLabel) {
  try {
    const tasks = [
      sendAnalyticsEvent('extension_usage_interval', payload),
      touchMonthlyActive('usage_interval', {
        usage_source: source,
        usage_state: stateLabel,
      }),
    ];
    Promise.all(tasks).catch((error) => {
      console.warn('Failed to submit usage interval analytics', error);
    });
  } catch (error) {
    console.warn('Failed to queue usage interval analytics', error);
  }
}

// Local generator (mirrors the one in twitch.content.js). Used for session_id.
function genUsageSessionId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return 'usg-' + Math.random().toString(16).slice(2) + Date.now().toString(16);
}

const USAGE_SESSION_STORAGE_KEY = 'usage_session_v1';
const USAGE_SESSION_HEARTBEAT_MS = 60_000;
const USAGE_SESSION_IDLE_TIMEOUT_MS = 5 * 60_000;
const USAGE_SESSION_MIN_DURATION_MS = 1000;

// Recovers an orphaned usage session left in storage by a crash or hard tab
// close (where pagehide didn't fire / didn't deliver). Called once at content
// script startup. Emits a single recovery event with the duration accumulated
// up to the last heartbeat, then clears the slot.
export async function recoverOrphanedUsageSession(options = {}) {
  const storage = options.storage || (typeof chrome !== 'undefined' ? chrome?.storage?.local : null);
  const storageKey = options.storageKey || USAGE_SESSION_STORAGE_KEY;
  const dispatch = options.dispatch || dispatchUsageEvent;
  const minDurationMs = Number.isFinite(options.minDurationMs) ? options.minDurationMs : USAGE_SESSION_MIN_DURATION_MS;
  // idleTimeoutMs accepted for API symmetry / future use; not load-bearing
  // for the recovery payload itself, since totalMs comes from the saved
  // accumulator + last segment up to lastHeartbeat.
  void options.idleTimeoutMs;
  if (!storage || typeof storage.get !== 'function') return false;
  let saved;
  try {
    const result = await storage.get(storageKey);
    saved = result && result[storageKey];
  } catch (_) { return false; }
  // Always clear the slot — either we emit and clear, or it's malformed.
  try { await storage.remove(storageKey); } catch (_) { /* best effort */ }
  if (!saved || typeof saved !== 'object') return false;
  const startedAt = Number(saved.startedAt);
  const lastHeartbeat = Number(saved.lastHeartbeat) || startedAt;
  if (!startedAt || !lastHeartbeat) return false;
  // If the session is "fresh" (last heartbeat within idle window), it's most
  // likely a page reload of the same Twitch tab — the new tracker will start
  // a new session, but we still emit the previous one's accumulated time so
  // we don't lose it.
  const accumulated = Number(saved.accumulatedMs) || 0;
  const segmentStart = Number(saved.currentSegmentStartedAt);
  const lastSegment = Number.isFinite(segmentStart) && segmentStart > 0
    ? Math.max(0, lastHeartbeat - segmentStart)
    : 0;
  const totalMs = accumulated + lastSegment;
  if (totalMs < minDurationMs) return false;
  const stateLabel = saved.enabled === false ? 'inactive' : 'active';
  const payload = pruneParams({
    usage_source: saved.source || 'unknown',
    usage_state: stateLabel,
    duration_ms: totalMs,
    duration_sec: Math.round(totalMs / 1000),
    usage_end_reason: 'recovery_orphan',
    interval_started_at: new Date(startedAt).toISOString(),
    ...(saved.context || {}),
  });
  try {
    dispatch(payload, payload.usage_source, stateLabel);
  } catch (err) {
    console.warn('Recovery dispatch failed', err);
    return false;
  }
  return true;
}

// Tracks one continuous "usage session" per Twitch tab. Differs from the
// previous per-transition emitter in three ways:
//   1. Visibility flips and context changes do NOT emit — they pause/resume
//      and update fields in the running session.
//   2. One event fires per session, with accumulated duration_ms across all
//      visible segments. Triggers: pagehide/beforeunload, idle timeout
//      (5 min hidden), tracker disabled, or manual flush.
//   3. State is heartbeat-persisted to chrome.storage.local every minute so
//      a crashed session can be recovered on next startup (recovery_orphan).
export function createUsageTracker(options = {}) {
  const source = typeof options.source === 'string' && options.source ? options.source : 'unknown';
  const minDurationMs = Number.isFinite(options.minDurationMs) && options.minDurationMs >= 0
    ? options.minDurationMs
    : USAGE_SESSION_MIN_DURATION_MS;
  const heartbeatIntervalMs = Number.isFinite(options.heartbeatIntervalMs) && options.heartbeatIntervalMs > 0
    ? options.heartbeatIntervalMs
    : USAGE_SESSION_HEARTBEAT_MS;
  const idleTimeoutMs = Number.isFinite(options.idleTimeoutMs) && options.idleTimeoutMs > 0
    ? options.idleTimeoutMs
    : USAGE_SESSION_IDLE_TIMEOUT_MS;
  const storage = options.storage || (typeof chrome !== 'undefined' ? chrome?.storage?.local : null);
  const storageKey = options.storageKey || USAGE_SESSION_STORAGE_KEY;
  const setIntervalImpl = options.setInterval || (typeof setInterval === 'function' ? setInterval : null);
  const clearIntervalImpl = options.clearInterval || (typeof clearInterval === 'function' ? clearInterval : null);
  const setTimeoutImpl = options.setTimeout || (typeof setTimeout === 'function' ? setTimeout : null);
  const clearTimeoutImpl = options.clearTimeout || (typeof clearTimeout === 'function' ? clearTimeout : null);
  const nowFn = options.now || (() => Date.now());
  const dispatch = options.dispatch || dispatchUsageEvent;

  let enabled = options.initialEnabled !== undefined ? !!options.initialEnabled : true;
  let visible = options.initialVisible !== undefined
    ? !!options.initialVisible
    : (typeof document !== 'undefined' ? !document.hidden : true);
  let context = pruneParams(options.initialContext || {});

  // session = { id, startedAt, accumulatedMs, currentSegmentStartedAt }
  // currentSegmentStartedAt is null when the session is paused (tab hidden).
  let session = null;
  let heartbeatTimer = null;
  let idleTimer = null;

  function startSession() {
    if (session) return;
    if (!enabled) return;
    session = {
      id: genUsageSessionId(),
      startedAt: nowFn(),
      accumulatedMs: 0,
      currentSegmentStartedAt: visible ? nowFn() : null,
    };
    persistSnapshot();
    startHeartbeat();
  }

  function pauseSession() {
    if (!session || session.currentSegmentStartedAt === null) return;
    session.accumulatedMs += Math.max(0, nowFn() - session.currentSegmentStartedAt);
    session.currentSegmentStartedAt = null;
    persistSnapshot();
  }

  function resumeSession() {
    if (!session || session.currentSegmentStartedAt !== null) return;
    session.currentSegmentStartedAt = nowFn();
    persistSnapshot();
  }

  function endSession(reason) {
    if (!session) return false;
    const now = nowFn();
    const lastSegment = session.currentSegmentStartedAt !== null
      ? Math.max(0, now - session.currentSegmentStartedAt)
      : 0;
    const totalMs = session.accumulatedMs + lastSegment;
    const startedAt = session.startedAt;
    const finished = session;
    session = null;
    stopHeartbeat();
    stopIdleTimer();
    clearStorage();
    if (totalMs < minDurationMs) return false;
    const stateLabel = enabled ? 'active' : 'inactive';
    const payload = pruneParams({
      usage_source: source,
      usage_state: stateLabel,
      duration_ms: totalMs,
      duration_sec: Math.round(totalMs / 1000),
      usage_end_reason: reason || 'unknown',
      interval_started_at: new Date(startedAt).toISOString(),
      ...context,
    });
    try {
      dispatch(payload, source, stateLabel);
    } catch (err) {
      console.warn('Usage event dispatch failed', err);
    }
    return Boolean(finished);
  }

  function persistSnapshot() {
    if (!session || !storage || typeof storage.set !== 'function') return;
    const snapshot = {
      id: session.id,
      startedAt: session.startedAt,
      accumulatedMs: session.accumulatedMs,
      currentSegmentStartedAt: session.currentSegmentStartedAt,
      lastHeartbeat: nowFn(),
      context,
      enabled,
      source,
    };
    Promise.resolve(storage.set({ [storageKey]: snapshot })).catch(() => { /* best effort */ });
  }

  function clearStorage() {
    if (!storage || typeof storage.remove !== 'function') return;
    Promise.resolve(storage.remove(storageKey)).catch(() => { /* best effort */ });
  }

  function startHeartbeat() {
    if (heartbeatTimer || !setIntervalImpl) return;
    heartbeatTimer = setIntervalImpl(() => {
      if (!session) return;
      persistSnapshot();
    }, heartbeatIntervalMs);
  }

  function stopHeartbeat() {
    if (heartbeatTimer && clearIntervalImpl) {
      clearIntervalImpl(heartbeatTimer);
    }
    heartbeatTimer = null;
  }

  function startIdleTimer() {
    if (!setTimeoutImpl) return;
    stopIdleTimer();
    idleTimer = setTimeoutImpl(() => {
      idleTimer = null;
      endSession('visibility_hidden');
    }, idleTimeoutMs);
  }

  function stopIdleTimer() {
    if (idleTimer && clearTimeoutImpl) {
      clearTimeoutImpl(idleTimer);
    }
    idleTimer = null;
  }

  // Initial state
  if (visible && enabled) {
    startSession();
  }

  return {
    notifyVisibilityChange(nextVisible /* , reason */) {
      const boolVisible = !!nextVisible;
      if (boolVisible === visible) return;
      visible = boolVisible;
      if (!visible) {
        // Tab hidden → pause accumulation, arm idle timer. NO emit.
        pauseSession();
        if (session) startIdleTimer();
      } else {
        // Tab visible → cancel idle timer, resume.
        stopIdleTimer();
        if (session) {
          resumeSession();
        } else if (enabled) {
          startSession();
        }
      }
    },
    notifyEnabledChange(nextEnabled /* , reason */) {
      const boolEnabled = !!nextEnabled;
      if (boolEnabled === enabled) return;
      enabled = boolEnabled;
      if (!enabled) {
        // Deliberate disable — emit current session and stop.
        endSession('tracker_off');
      } else if (visible) {
        startSession();
      }
    },
    notifyContextChange(nextContext = {} /* , reason */) {
      // Update context fields in-place. NO emit on context change — channel
      // switch within the same browsing session is not a session boundary.
      const normalized = pruneParams(nextContext || {});
      context = normalized;
      // Persist updated context with the next heartbeat or right now if active.
      if (session) persistSnapshot();
    },
    flush(reason = 'manual_flush') {
      return endSession(reason || 'manual_flush');
    },
    isActive() {
      return Boolean(session);
    },
  };
}
