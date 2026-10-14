// Notifications Broadcast (E06) — extension client.
//
// Responsibilities:
//   * pollOnce()  — fetch /api/v1/notifications/poll, render notification
//                   via chrome.notifications.create if 200, log shown/blocked/
//                   errored as appropriate
//   * handleClicked(notificationId) — open click_url in new tab AFTER
//                   re-validating regex; queue 'clicked' callback
//   * Durable callback queue in chrome.storage.local — survives SW restart
//   * Subscription opt-out sync — PUT /subscription
//
// All endpoints HTTPS-only via DEFAULT_API_BASE. For cross-origin POST/PUT,
// fetch auto-sends Origin so the backend's originGuard sees chrome-extension://.
// For GET (poll) the MV3 SW does NOT send Origin when the URL matches a
// host_permission — by-design Chromium behaviour. We compensate by stamping
// X-Ext-Id: chrome.runtime.id on every SW fetch; the backend originGuard
// accepts it as an equivalent proof of "this is our extension talking".

const EXT_ID = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) || '';
const EXT_HEADERS = EXT_ID ? { 'x-ext-id': EXT_ID } : {};

import {
  NOTIFICATIONS_ENABLED,
  NOTIFICATIONS_POLL_INTERVAL_MIN,
  buildPollEndpoint,
  buildCallbackEndpoint,
  buildSubscriptionEndpoint,
  OWN_ANALYTICS_TIMEOUT_MS,
} from './config.js';
import { getUserId } from './analytics.js';

const ALARM_NAME = 'notifications-poll';
const CALLBACK_QUEUE_KEY = 'notifQueue';      // chrome.storage.local key
const SUBSCRIPTION_RETRY_QUEUE_KEY = 'notifSubscriptionRetryQueue';
const NOTIF_MAP_KEY = 'notifShownMap';        // notificationId → {campaignId, clickUrl}
const QUEUE_HARD_CAP = 50;                    // never persist more than 50 pending callbacks
const CLICK_URL_RE = /^https?:\/\//;
const EXTENSION_VERSION = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getManifest)
  ? chrome.runtime.getManifest().version
  : 'unknown';

// ---- Subscription gate ----
//
// User can flip the toggle off in options. We also gate on Chrome's
// system-level permission via chrome.notifications.getPermissionLevel
// — if the OS blocked Chrome notifications, calling create() would no-op
// silently. Better to detect early and skip the network roundtrip.

async function isSubscribedLocal() {
  return new Promise((resolve) => {
    if (!chrome.storage || !chrome.storage.sync) return resolve(true);
    chrome.storage.sync.get({ notificationsOptedIn: true }, (v) => resolve(!!v.notificationsOptedIn));
  });
}

function isOsPermissionGranted() {
  return new Promise((resolve) => {
    if (!chrome.notifications || typeof chrome.notifications.getPermissionLevel !== 'function') {
      return resolve(true);
    }
    chrome.notifications.getPermissionLevel((level) => resolve(level === 'granted'));
  });
}

// ---- Durable callback queue ----
//
// Callbacks (shown/clicked/blocked/errored) MUST land server-side even
// if the SW dies between event and network. Mirrors the analytics batch
// buffer pattern (see common/analytics.js#createBatchBuffer) — when the
// SW wakes up next time we drain the queue.

async function loadQueue() {
  return new Promise((resolve) => {
    chrome.storage.local.get({ [CALLBACK_QUEUE_KEY]: [] }, (v) => resolve(Array.isArray(v[CALLBACK_QUEUE_KEY]) ? v[CALLBACK_QUEUE_KEY] : []));
  });
}

async function saveQueue(items) {
  // Hard cap: trim oldest first if we got hot enough to fill the buffer.
  const trimmed = items.length > QUEUE_HARD_CAP ? items.slice(-QUEUE_HARD_CAP) : items;
  return new Promise((resolve) => {
    chrome.storage.local.set({ [CALLBACK_QUEUE_KEY]: trimmed }, () => resolve());
  });
}

function isValidSubscriptionRetryEntry(entry) {
  return !!entry
    && typeof entry === 'object'
    && typeof entry.user_id === 'string'
    && entry.user_id.length > 0
    && typeof entry.opted_out === 'boolean'
    && Number.isFinite(entry.ts);
}

function normalizeSubscriptionRetryQueue(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const out = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!isValidSubscriptionRetryEntry(value)) continue;
    const userId = value.user_id;
    if (key !== userId) continue;
    out[userId] = {
      user_id: userId,
      opted_out: value.opted_out,
      ts: value.ts,
    };
  }
  return out;
}

async function loadSubscriptionRetryQueue() {
  return new Promise((resolve) => {
    chrome.storage.local.get({ [SUBSCRIPTION_RETRY_QUEUE_KEY]: {} }, (v) => {
      resolve(normalizeSubscriptionRetryQueue(v[SUBSCRIPTION_RETRY_QUEUE_KEY]));
    });
  });
}

async function saveSubscriptionRetryQueue(items) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [SUBSCRIPTION_RETRY_QUEUE_KEY]: normalizeSubscriptionRetryQueue(items) }, () => resolve());
  });
}

let subscriptionRetryQueueWriteChain = Promise.resolve();

function mutateSubscriptionRetryQueue(mutator) {
  const run = subscriptionRetryQueueWriteChain.then(async () => {
    const q = await loadSubscriptionRetryQueue();
    const { result, save = false } = await mutator(q);
    if (save) await saveSubscriptionRetryQueue(q);
    return result;
  });
  subscriptionRetryQueueWriteChain = run.catch(() => {});
  return run;
}

async function readLocalOptedOut() {
  const notificationsOptedIn = await isSubscribedLocal();
  return !notificationsOptedIn;
}

async function ensureSubscriptionRetryWake() {
  if (!NOTIFICATIONS_ENABLED) return false;
  try {
    await startAlarm(NOTIFICATIONS_POLL_INTERVAL_MIN);
    return true;
  } catch (_) {
    return false;
  }
}

async function upsertSubscriptionRetry({ userId, optedOut, ts = Date.now() }) {
  if (typeof userId !== 'string' || userId.length === 0 || typeof optedOut !== 'boolean') {
    return { queued: false };
  }
  const result = await mutateSubscriptionRetryQueue(async (q) => {
    const existing = q[userId];
    if (existing && existing.ts > ts) {
      return { result: { queued: true, entry: existing, preserved: true } };
    }
    const entry = { user_id: userId, opted_out: optedOut, ts };
    q[userId] = entry;
    return { result: { queued: true, entry }, save: true };
  });
  if (result.queued && !result.preserved) {
    await ensureSubscriptionRetryWake();
  }
  return result;
}

async function clearSubscriptionRetryIfRequestCurrent({ userId, requestOptedOut, requestTs }) {
  const currentOptedOut = await readLocalOptedOut();
  if (currentOptedOut !== requestOptedOut) {
    await upsertSubscriptionRetry({ userId, optedOut: currentOptedOut, ts: Date.now() });
    return { cleared: false, stale: true };
  }

  return mutateSubscriptionRetryQueue(async (q) => {
    const entry = q[userId];
    if (!entry) return { result: { cleared: false, missing: true } };
    if (entry.ts > requestTs) return { result: { cleared: false, newer: true } };

    delete q[userId];
    return { result: { cleared: true }, save: true };
  });
}

async function clearSubscriptionRetryIfDrainSnapshotCurrent(entry) {
  if (!isValidSubscriptionRetryEntry(entry)) return { cleared: false, invalid: true };

  const currentOptedOut = await readLocalOptedOut();
  const result = await mutateSubscriptionRetryQueue(async (q) => {
    const currentEntry = q[entry.user_id];
    if (!currentEntry) return { result: { cleared: false, missing: true } };
    if (currentEntry.ts !== entry.ts || currentEntry.opted_out !== entry.opted_out) {
      return { result: { cleared: false, newer: true } };
    }
    if (currentOptedOut !== entry.opted_out) {
      return { result: { cleared: false, stale: true, needsUpsert: true } };
    }

    delete q[entry.user_id];
    return { result: { cleared: true }, save: true };
  });
  if (result.needsUpsert) {
    await upsertSubscriptionRetry({ userId: entry.user_id, optedOut: currentOptedOut, ts: Date.now() });
    return { cleared: false, stale: true };
  }
  return result;
}

async function queueLatestSubscriptionRetry({ userId, requestOptedOut, requestTs }) {
  const currentOptedOut = await readLocalOptedOut();
  const ts = currentOptedOut === requestOptedOut ? requestTs : Date.now();
  return upsertSubscriptionRetry({ userId, optedOut: currentOptedOut, ts });
}

function isRetryableSubscriptionStatus(status) {
  return status === 429 || status >= 500;
}

export async function enqueueCallback({ id, action, payload }) {
  const q = await loadQueue();
  q.push({ id, action, payload, ts: Date.now() });
  await saveQueue(q);
}

async function migrateLegacySubscriptionRetry(item) {
  if (!item || item.action !== 'subscription_retry') return false;
  const payload = item.payload && typeof item.payload === 'object' ? item.payload : {};
  if (typeof payload.user_id === 'string' && typeof payload.opted_out === 'boolean') {
    const ts = Number.isFinite(item.ts) ? item.ts : Date.now();
    await upsertSubscriptionRetry({
      userId: payload.user_id,
      optedOut: payload.opted_out,
      ts,
    });
  }
  return true;
}

export async function drainCallbackQueue({ fetchImpl = fetch } = {}) {
  const q = await loadQueue();
  if (q.length === 0) return { drained: 0 };

  const callbackItems = [];
  for (const item of q) {
    const migrated = await migrateLegacySubscriptionRetry(item);
    if (!migrated) callbackItems.push(item);
  }
  if (callbackItems.length !== q.length) {
    await saveQueue(callbackItems);
  }
  if (callbackItems.length === 0) return { drained: 0, remaining: 0 };

  let success = 0;
  const remaining = [];
  for (const item of callbackItems) {
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), OWN_ANALYTICS_TIMEOUT_MS);
      const res = await fetchImpl(buildCallbackEndpoint(item.id, item.action), {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...EXT_HEADERS },
        body: JSON.stringify(item.payload || {}),
        signal: ctl.signal,
      });
      clearTimeout(t);
      // 204 means accepted (callbacks always reply 204 even on internal
      // pg failure — that's the contract from T04.13). 5xx → retry next
      // tick. Anything else (4xx) → drop, we'll never recover.
      if (res.status >= 500) {
        remaining.push(item);
      } else {
        success += 1;
      }
    } catch (_err) {
      // Network failure → keep for next tick.
      remaining.push(item);
    }
  }
  await saveQueue(remaining);
  return { drained: success, remaining: remaining.length };
}

// ---- Notification ID ↔ campaign map ----
//
// chrome.notifications.create returns a string id we then receive in the
// onClicked event. We need to remember which campaign each id was so the
// click handler knows what URL to open and which callback to POST.

async function rememberNotification(notificationId, campaignId, clickUrl, deliveryId) {
  return new Promise((resolve) => {
    chrome.storage.local.get({ [NOTIF_MAP_KEY]: {} }, (v) => {
      const map = (v[NOTIF_MAP_KEY] && typeof v[NOTIF_MAP_KEY] === 'object') ? v[NOTIF_MAP_KEY] : {};
      map[notificationId] = { campaignId, clickUrl, deliveryId, ts: Date.now() };
      // Keep map bounded — drop entries older than 7 days.
      const cutoff = Date.now() - 7 * 24 * 3600 * 1000;
      for (const k of Object.keys(map)) {
        if (map[k].ts < cutoff) delete map[k];
      }
      chrome.storage.local.set({ [NOTIF_MAP_KEY]: map }, () => resolve());
    });
  });
}

async function lookupNotification(notificationId) {
  return new Promise((resolve) => {
    chrome.storage.local.get({ [NOTIF_MAP_KEY]: {} }, (v) => {
      const map = (v[NOTIF_MAP_KEY] && typeof v[NOTIF_MAP_KEY] === 'object') ? v[NOTIF_MAP_KEY] : {};
      resolve(map[notificationId] || null);
    });
  });
}

// ---- Poll + display ----

export async function drainSubscriptionRetryQueue({ fetchImpl = fetch } = {}) {
  const snapshot = await loadSubscriptionRetryQueue();
  const entries = Object.values(snapshot);
  if (entries.length === 0) return { drained: 0, remaining: 0 };

  let drained = 0;
  for (const entry of entries) {
    if (!isValidSubscriptionRetryEntry(entry)) {
      const q = await loadSubscriptionRetryQueue();
      delete q[entry && entry.user_id];
      await saveSubscriptionRetryQueue(q);
      continue;
    }

    const currentQueue = await loadSubscriptionRetryQueue();
    const currentEntry = currentQueue[entry.user_id];
    const currentOptedOut = await readLocalOptedOut();
    if (!currentEntry) continue;
    if (currentEntry.ts !== entry.ts || currentEntry.opted_out !== entry.opted_out) continue;
    if (currentOptedOut !== entry.opted_out) {
      await upsertSubscriptionRetry({ userId: entry.user_id, optedOut: currentOptedOut, ts: Date.now() });
      continue;
    }

    let timeout = null;
    try {
      const ctl = new AbortController();
      timeout = setTimeout(() => ctl.abort(), OWN_ANALYTICS_TIMEOUT_MS);
      const res = await fetchImpl(buildSubscriptionEndpoint(), {
        method: 'PUT',
        headers: { 'content-type': 'application/json', ...EXT_HEADERS },
        body: JSON.stringify({ user_id: entry.user_id, opted_out: entry.opted_out }),
        signal: ctl.signal,
      });
      clearTimeout(timeout);
      timeout = null;

      if (res.status === 204) {
        await clearSubscriptionRetryIfDrainSnapshotCurrent(entry);
        drained += 1;
      } else if (isRetryableSubscriptionStatus(res.status)) {
        await queueLatestSubscriptionRetry({
          userId: entry.user_id,
          requestOptedOut: entry.opted_out,
          requestTs: entry.ts,
        });
      } else {
        await clearSubscriptionRetryIfDrainSnapshotCurrent(entry);
        drained += 1;
      }
    } catch (_) {
      if (timeout) clearTimeout(timeout);
      await queueLatestSubscriptionRetry({
        userId: entry.user_id,
        requestOptedOut: entry.opted_out,
        requestTs: entry.ts,
      });
    }
  }

  const remainingQueue = await loadSubscriptionRetryQueue();
  return { drained, remaining: Object.keys(remainingQueue).length };
}

export async function pollOnce({ fetchImpl = fetch, now = Date.now() } = {}) {
  if (!NOTIFICATIONS_ENABLED) return { skipped: 'kill_switch' };

  const subscriptionDrain = await drainSubscriptionRetryQueue({ fetchImpl });

  const subscribed = await isSubscribedLocal();
  if (!subscribed) {
    if (!subscriptionDrain.remaining) await stopAlarm();
    return { skipped: 'opted_out_local' };
  }

  const granted = await isOsPermissionGranted();
  if (!granted) return { skipped: 'os_permission_denied' };

  // Drain pending callbacks BEFORE we add another notification — keeps
  // ordering tight so 'shown' for the previous campaign lands before
  // 'clicked' that may follow.
  await drainCallbackQueue({ fetchImpl });

  const userId = await getUserId();
  if (!userId) return { skipped: 'no_user_id' };

  let res;
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), OWN_ANALYTICS_TIMEOUT_MS);
    res = await fetchImpl(buildPollEndpoint(userId, EXTENSION_VERSION), {
      method: 'GET',
      headers: EXT_HEADERS,
      signal: ctl.signal,
    });
    clearTimeout(t);
  } catch (err) {
    return { skipped: 'network_error', error: err.message };
  }

  if (res.status === 204) return { result: '204_empty' };
  if (res.status !== 200) return { result: `unexpected_${res.status}` };

  let payload;
  try { payload = await res.json(); } catch (_) { return { skipped: 'bad_json' }; }
  if (!payload || !payload.id || !payload.title) return { skipped: 'bad_payload' };

  // Defense in depth: re-validate click_url before we ever schedule a
  // notification whose click target we can't trust.
  if (!CLICK_URL_RE.test(payload.click_url || '')) {
    // Report errored so the operator sees the campaign was poisoned.
    await enqueueCallback({
      id: payload.id,
      action: 'errored',
      payload: { user_id: userId, ts: now, reason: 'invalid_click_url' },
    });
    return { skipped: 'invalid_click_url' };
  }

  // Try to display.
  try {
    const created = await createNotification(payload);
    if (created) {
      await rememberNotification(created, payload.id, payload.click_url, payload.delivery_id);
      await enqueueCallback({
        id: payload.id,
        action: 'shown',
        payload: { user_id: userId, ts: Date.now() },
      });
      return { result: 'shown', campaignId: payload.id };
    }
    // create() returned no id → blocked (rare; getPermissionLevel said
    // granted but the call still failed). Treat as blocked.
    await enqueueCallback({
      id: payload.id,
      action: 'blocked',
      payload: { user_id: userId, ts: Date.now(), reason: 'create_no_id' },
    });
    return { result: 'blocked', campaignId: payload.id };
  } catch (err) {
    await enqueueCallback({
      id: payload.id,
      action: 'errored',
      payload: { user_id: userId, ts: Date.now(), reason: String(err && err.message).slice(0, 200) },
    });
    return { result: 'errored', campaignId: payload.id, error: err.message };
  }
}

// Create the notification. On any failure (most commonly: cross-origin icon
// URL blocked by CORS — admins paste icons from image hosts that don't return
// Access-Control-Allow-Origin) — fall back to our bundled icon128.png and try
// once more. A campaign with a bad icon URL is still better than no campaign.
//
// We tried this once on prod 2026-05-23 with a habrastorage.org icon — Chrome
// rejected create() and the whole delivery turned into "errored" with no
// visible notification. With this fallback the popup shows with the
// extension's own icon and `shown` is reported normally.
function createNotification(payload) {
  return new Promise((resolve, reject) => {
    if (!chrome.notifications || typeof chrome.notifications.create !== 'function') {
      return reject(new Error('chrome.notifications API missing'));
    }
    const localIcon = chrome.runtime.getURL('assets/icon128.png');
    const externalIcon = (payload.icon_url && /^https?:\/\//.test(payload.icon_url))
      ? payload.icon_url
      : null;
    const baseOpts = {
      type: 'basic',
      title: String(payload.title || '').slice(0, 120),
      message: String(payload.body || '').slice(0, 500),
      requireInteraction: false,
      priority: 1,
    };

    const attempt = (iconUrl, isRetry) => {
      try {
        chrome.notifications.create('', { ...baseOpts, iconUrl }, (id) => {
          if (chrome.runtime.lastError || !id) {
            const err = chrome.runtime.lastError && chrome.runtime.lastError.message;
            // First attempt with the external icon failed (typical: CORS).
            // Retry once with the local bundled icon — guarantees we render
            // something. If THAT also fails, give up and reject.
            if (!isRetry && externalIcon) {
              return attempt(localIcon, true);
            }
            return reject(new Error(err || 'chrome.notifications.create returned no id'));
          }
          resolve(id);
        });
      } catch (err) {
        if (!isRetry && externalIcon) return attempt(localIcon, true);
        reject(err);
      }
    };

    attempt(externalIcon || localIcon, false);
  });
}

// ---- Click handling ----

export async function handleClicked(notificationId, { tabsCreate = chrome.tabs.create.bind(chrome.tabs) } = {}) {
  const entry = await lookupNotification(notificationId);
  if (!entry) return { skipped: 'unknown_notification' };

  // Re-validate URL — defense in depth (T06.04 acceptance: 'security path').
  if (!CLICK_URL_RE.test(entry.clickUrl || '')) {
    return { skipped: 'invalid_url_at_click' };
  }

  try {
    tabsCreate({ url: entry.clickUrl });
  } catch (err) {
    return { skipped: 'tabs_create_failed', error: err.message };
  }

  const userId = await getUserId();
  await enqueueCallback({
    id: entry.campaignId,
    action: 'clicked',
    payload: { user_id: userId, ts: Date.now() },
  });
  // Best-effort immediate drain so the click event lands promptly while
  // the SW is awake — the queue is the safety net if the user closes
  // Chrome before fetch resolves.
  drainCallbackQueue().catch(() => {});

  // Best-effort dismiss so the card disappears once we opened the tab.
  try { chrome.notifications.clear(notificationId); } catch (_) { /* ignore */ }

  return { result: 'opened', campaignId: entry.campaignId };
}

// ---- Alarm scheduling ----

export async function startAlarm(periodInMinutes = 3) {
  if (!chrome.alarms || typeof chrome.alarms.create !== 'function') return false;
  // chrome.alarms.create overwrites an existing alarm with the same name
  // so this is idempotent.
  chrome.alarms.create(ALARM_NAME, { periodInMinutes });
  return true;
}

export async function stopAlarm() {
  if (!chrome.alarms || typeof chrome.alarms.clear !== 'function') return false;
  return new Promise((resolve) => chrome.alarms.clear(ALARM_NAME, () => resolve(true)));
}

export function isOurAlarm(name) {
  return name === ALARM_NAME;
}

// ---- Subscription sync ----

export async function syncSubscription({ optedOut, fetchImpl = fetch } = {}) {
  const userId = await getUserId();
  if (!userId) return { skipped: 'no_user_id' };

  const requestOptedOut = !!optedOut;
  const requestTs = Date.now();
  let timeout = null;

  try {
    const ctl = new AbortController();
    timeout = setTimeout(() => ctl.abort(), OWN_ANALYTICS_TIMEOUT_MS);
    const res = await fetchImpl(buildSubscriptionEndpoint(), {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...EXT_HEADERS },
      body: JSON.stringify({ user_id: userId, opted_out: requestOptedOut }),
      signal: ctl.signal,
    });
    clearTimeout(timeout);
    timeout = null;

    if (res.status === 204) {
      await clearSubscriptionRetryIfRequestCurrent({ userId, requestOptedOut, requestTs });
      return { ok: true };
    }
    if (isRetryableSubscriptionStatus(res.status)) {
      await queueLatestSubscriptionRetry({ userId, requestOptedOut, requestTs });
      return { ok: false, status: res.status, queued: true };
    }

    await clearSubscriptionRetryIfRequestCurrent({ userId, requestOptedOut, requestTs });
    return { ok: false, status: res.status, dropped: true };
  } catch (err) {
    if (timeout) clearTimeout(timeout);
    await queueLatestSubscriptionRetry({ userId, requestOptedOut, requestTs });
    return { ok: false, error: err.message, queued: true };
  }
}

// ---- Exports for testing ----
export const _internals = {
  ALARM_NAME,
  CALLBACK_QUEUE_KEY,
  SUBSCRIPTION_RETRY_QUEUE_KEY,
  NOTIF_MAP_KEY,
  CLICK_URL_RE,
  QUEUE_HARD_CAP,
  loadQueue,
  saveQueue,
  loadSubscriptionRetryQueue,
  saveSubscriptionRetryQueue,
  upsertSubscriptionRetry,
  clearSubscriptionRetryIfRequestCurrent,
  clearSubscriptionRetryIfDrainSnapshotCurrent,
  readLocalOptedOut,
  rememberNotification,
  lookupNotification,
  isSubscribedLocal,
  isOsPermissionGranted,
};
