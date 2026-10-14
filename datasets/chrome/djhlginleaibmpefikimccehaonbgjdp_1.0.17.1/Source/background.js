import { DEFAULT_API_BASE } from "./common/config.js";
import { BACKGROUND_FETCH_MESSAGE_TYPE } from "./common/backgroundFetch.js";
import { OPEN_LINK_MESSAGE_TYPE, isSafeOpenLinkUrl } from "./common/openLink.js";
import { getSettings, setSettings } from "./common/storage.js";
import {
  ANALYTICS_MESSAGE_TYPE,
  handleAnalyticsMessage,
  handleInstall,
  createBatchBuffer,
  setOwnBackendBuffer,
  getUserId,
} from "./common/analytics.js";
import { OWN_ANALYTICS_ENABLED, OWN_ANALYTICS_TIMEOUT_MS, buildEventsEndpoint, buildUninstallEndpoint, NOTIFICATIONS_ENABLED, NOTIFICATIONS_POLL_INTERVAL_MIN } from "./common/config.js";
import { buildUsherBypassRulesUpdate } from "./common/usherBypass.js";
import { pollOnce as notificationsPollOnce, handleClicked as notificationsHandleClicked, startAlarm as notificationsStartAlarm, isOurAlarm as isNotificationsAlarm, drainCallbackQueue as notificationsDrainQueue, drainSubscriptionRetryQueue as notificationsDrainSubscriptionQueue } from "./common/notifications.js";

const RULESET_ID = "main_rules";
const dnr = chrome.declarativeNetRequest;
let rulesetUpdateChain = Promise.resolve();
let legacyCleanupPromise = null;

const AUTH_TOKEN_STORAGE_KEY = 'twitchAuthToken';
const AUTH_TOKEN_UPDATED_AT_KEY = 'twitchAuthTokenUpdatedAt';
const INTEGRITY_STORAGE_KEY = 'twitchClientIntegrity';
const INTEGRITY_UPDATED_AT_KEY = 'twitchClientIntegrityUpdatedAt';
const DEVICE_ID_STORAGE_KEY = 'twitchDeviceId';
// Twitch integrity PASETOs live ~5 min. After this we stop claiming to have it
// and the DNR rule falls back to the forward-PAT (1080p) path.
const INTEGRITY_MAX_AGE_MS = 4 * 60 * 1000;
let authTokenUpdateChain = Promise.resolve();

function buildRequestInit(rawInit) {
  const requestInit = {};
  if (!rawInit || typeof rawInit !== "object") {
    return requestInit;
  }

  if (typeof rawInit.method === "string" && rawInit.method.length > 0) {
    requestInit.method = rawInit.method;
  }

  if (rawInit.headers && typeof rawInit.headers === "object") {
    const headers = new Headers();
    for (const [key, value] of Object.entries(rawInit.headers)) {
      if (value == null) {
        continue;
      }
      try {
        headers.set(String(key), String(value));
      } catch (error) {
        console.warn("Failed to apply request header", key, error);
      }
    }
    if ([...headers.keys()].length > 0) {
      requestInit.headers = headers;
    }
  }

  if (typeof rawInit.body === "string") {
    requestInit.body = rawInit.body;
  }

  if (typeof rawInit.credentials === "string") {
    const credentials = rawInit.credentials;
    if (credentials === "omit" || credentials === "same-origin" || credentials === "include") {
      requestInit.credentials = credentials;
    }
  }

  return requestInit;
}

function queueRulesetUpdate(task) {
  function runner() {
    return task().catch(function (error) {
      console.error("Failed to apply DNR ruleset update", error);
    });
  }
  rulesetUpdateChain = rulesetUpdateChain.then(runner, runner);
  return rulesetUpdateChain;
}

function queueAuthTokenUpdate(task) {
  function runner() {
    return task().catch(function (error) {
      console.error('Failed to refresh auth token state', error);
    });
  }
  authTokenUpdateChain = authTokenUpdateChain.then(runner, runner);
  return authTokenUpdateChain;
}

async function readTwitchCookieValue(name) {
  if (!chrome.cookies || typeof chrome.cookies.get !== 'function') {
    return '';
  }
  const lookupUrls = ['https://www.twitch.tv', 'https://twitch.tv'];
  for (const url of lookupUrls) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const cookie = await chrome.cookies.get({ url, name });
      if (cookie && typeof cookie.value === 'string' && cookie.value.trim()) {
        return cookie.value.trim();
      }
    } catch (error) {
      console.warn('Failed to read Twitch cookie', name, url, error);
    }
  }
  return '';
}

async function readTwitchAuthTokenFromCookies() {
  return readTwitchCookieValue('auth-token');
}

async function readTwitchDeviceIdFromCookies() {
  return readTwitchCookieValue('unique_id');
}

async function readStoredIntegrity() {
  try {
    const stored = await chrome.storage.local.get([INTEGRITY_STORAGE_KEY, INTEGRITY_UPDATED_AT_KEY]);
    const value = typeof stored[INTEGRITY_STORAGE_KEY] === 'string' ? stored[INTEGRITY_STORAGE_KEY] : '';
    const ts = Number(stored[INTEGRITY_UPDATED_AT_KEY]) || 0;
    if (!value || !ts) return '';
    if (Date.now() - ts > INTEGRITY_MAX_AGE_MS) return '';
    return value;
  } catch (_) {
    return '';
  }
}

function resolvePlaylistBaseUrl(apiBase) {
  try {
    const base = typeof apiBase === 'string' && apiBase.trim().length > 0
      ? apiBase.trim()
      : DEFAULT_API_BASE;
    const playlistUrl = new URL('/playlist', base);
    return playlistUrl.toString().replace(/\/$/, '');
  } catch (error) {
    console.warn('Failed to resolve playlist base URL, using default', error);
    const fallback = new URL('/playlist', DEFAULT_API_BASE);
    return fallback.toString().replace(/\/$/, '');
  }
}

async function applyUsherBypassRules(tokenRaw, enable, unlock2k, apiBase, extras) {
  if (!dnr || typeof dnr.updateDynamicRules !== 'function') {
    return;
  }

  const update = buildUsherBypassRulesUpdate({
    token: tokenRaw,
    enable,
    unlock2k,
    playlistBaseUrl: resolvePlaylistBaseUrl(apiBase),
    clientIntegrity: extras && extras.clientIntegrity,
    deviceId: extras && extras.deviceId,
  });

  try {
    await dnr.updateDynamicRules(update);
    if (update.addRules.length > 0) {
      const have2kCreds = Boolean(extras && extras.clientIntegrity && extras.deviceId);
      const mode = unlock2k
        ? (have2kCreds ? 'unlock2k (full creds → 2K eligible)' : 'unlock2k (oauth only → 1080p fallback)')
        : 'direct passthrough';
      console.log(`Usher bypass rules applied — ${mode}`);
    }
  } catch (error) {
    console.error('Failed to update usher bypass rules', error);
  }
}

async function refreshAuthTokenState(reason) {
  return queueAuthTokenUpdate(async function () {
    const settings = await ensureDefaultSettings();
    const enableQuality = isQualityEnabled(settings);
    const token = await readTwitchAuthTokenFromCookies();
    const deviceId = await readTwitchDeviceIdFromCookies();
    const clientIntegrity = await readStoredIntegrity();

    try {
      const stored = await chrome.storage.local.get([
        AUTH_TOKEN_STORAGE_KEY,
        AUTH_TOKEN_UPDATED_AT_KEY,
        DEVICE_ID_STORAGE_KEY,
      ]);
      const current = typeof stored[AUTH_TOKEN_STORAGE_KEY] === 'string'
        ? stored[AUTH_TOKEN_STORAGE_KEY]
        : '';
      const currentDeviceId = typeof stored[DEVICE_ID_STORAGE_KEY] === 'string'
        ? stored[DEVICE_ID_STORAGE_KEY]
        : '';

      if (token && token !== current) {
        await chrome.storage.local.set({
          [AUTH_TOKEN_STORAGE_KEY]: token,
          [AUTH_TOKEN_UPDATED_AT_KEY]: Date.now(),
        });
        console.log('Stored Twitch auth token from cookies', { reason });
      } else if (!token && current) {
        await chrome.storage.local.remove([AUTH_TOKEN_STORAGE_KEY, AUTH_TOKEN_UPDATED_AT_KEY]);
        console.log('Cleared stored Twitch auth token', { reason });
      } else if (token && current) {
        await chrome.storage.local.set({ [AUTH_TOKEN_UPDATED_AT_KEY]: Date.now() });
      }

      if (deviceId && deviceId !== currentDeviceId) {
        await chrome.storage.local.set({ [DEVICE_ID_STORAGE_KEY]: deviceId });
      } else if (!deviceId && currentDeviceId) {
        await chrome.storage.local.remove([DEVICE_ID_STORAGE_KEY]);
      }
    } catch (error) {
      console.warn('Failed to persist Twitch auth token state', error);
    }

    // unlock2k is always enabled: logged-in users get their OAuth forwarded through
    // the proxy to unlock 2K/source quality. Keeping the parameter wired lets us add
    // a UI toggle back later without another backend/DNR refactor.
    await applyUsherBypassRules(token, enableQuality, true, settings.apiBase, {
      clientIntegrity,
      deviceId,
    });
  });
}

async function ensureDefaultSettings() {
  const current = await getSettings();
  const patch = {};

  if (!current.apiBase) {
    patch.apiBase = DEFAULT_API_BASE;
  }
  if (typeof current.enable1080p === "undefined") {
    patch.enable1080p = true;
  }

  if (Object.keys(patch).length > 0) {
    await setSettings(patch);
  }

  return Object.assign({}, current, patch);
}

function clearLegacyDnrRules() {
  if (!legacyCleanupPromise) {
    legacyCleanupPromise = (async function () {
      if (!dnr) {
        return;
      }

      if (typeof dnr.getSessionRules === "function" && typeof dnr.updateSessionRules === "function") {
        try {
          const sessionRules = await dnr.getSessionRules();
          if (Array.isArray(sessionRules) && sessionRules.length > 0) {
            const ids = sessionRules.map(function (rule) {
              return rule.id;
            });
            if (ids.length > 0) {
              await dnr.updateSessionRules({ removeRuleIds: ids, addRules: [] });
            }
          }
        } catch (error) {
          console.warn("Failed to clear legacy session DNR rules", error);
        }
      }

      if (typeof dnr.getDynamicRules === "function" && typeof dnr.updateDynamicRules === "function") {
        try {
          const dynamicRules = await dnr.getDynamicRules();
          if (Array.isArray(dynamicRules) && dynamicRules.length > 0) {
            const ids = dynamicRules.map(function (rule) {
              return rule.id;
            });
            if (ids.length > 0) {
              await dnr.updateDynamicRules({ removeRuleIds: ids, addRules: [] });
            }
          }
        } catch (error) {
          console.warn("Failed to clear legacy dynamic DNR rules", error);
        }
      }
    })();
  }
  return legacyCleanupPromise;
}

async function setRulesetEnabled(enable) {
  if (!dnr || typeof dnr.updateEnabledRulesets !== "function") {
    console.warn("declarativeNetRequest.updateEnabledRulesets is unavailable in this browser");
    return;
  }

  if (typeof dnr.getEnabledRulesets === "function") {
    try {
      const enabledIds = await dnr.getEnabledRulesets();
      const currentlyEnabled = Array.isArray(enabledIds) && enabledIds.indexOf(RULESET_ID) !== -1;
      if (enable === currentlyEnabled) {
        return;
      }
    } catch (error) {
      console.warn("Failed to read enabled DNR rulesets", error);
    }
  }

  const update = enable
    ? { enableRulesetIds: [RULESET_ID], disableRulesetIds: [] }
    : { enableRulesetIds: [], disableRulesetIds: [RULESET_ID] };

  try {
    await dnr.updateEnabledRulesets(update);
  } catch (error) {
    console.error("Failed to update declarativeNetRequest ruleset state", error);
  }
}

function isQualityEnabled(settings) {
  return !settings || settings.enable1080p !== false;
}

function syncRulesetWithSettings(options) {
  return queueRulesetUpdate(async function () {
    const settings = options && options.ensureDefaults
      ? await ensureDefaultSettings()
      : await getSettings();

    await clearLegacyDnrRules();
    await setRulesetEnabled(isQualityEnabled(settings));
  });
}

chrome.runtime.onInstalled.addListener(function (details) {
  syncRulesetWithSettings({ ensureDefaults: true });
  refreshAuthTokenState('installed');
  handleInstall(details).catch(function (error) {
    console.warn("Failed to handle install analytics", error);
  });
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== 'install') return;
  try {
    const tabCreateResult = chrome.tabs.create({ url: buildWelcomeUrl() });
    if (tabCreateResult && typeof tabCreateResult.catch === 'function') {
      tabCreateResult.catch((error) => {
        console.warn('Failed to open welcome page', error);
      });
    }
  } catch (error) {
    console.warn('Failed to open welcome page', error);
  }
});

if (chrome.runtime && chrome.runtime.onStartup) {
  chrome.runtime.onStartup.addListener(function () {
    syncRulesetWithSettings({ ensureDefaults: false });
    refreshAuthTokenState('startup');
  });
}

chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName === 'sync') {
    if (Object.prototype.hasOwnProperty.call(changes, 'enable1080p')) {
      const nextValue = changes.enable1080p ? changes.enable1080p.newValue : undefined;
      queueRulesetUpdate(async function () {
        await setRulesetEnabled(nextValue !== false);
      });
    }

    if (
      Object.prototype.hasOwnProperty.call(changes, 'enable1080p') ||
      Object.prototype.hasOwnProperty.call(changes, 'apiBase')
    ) {
      refreshAuthTokenState('storage-change');
    }
  }
});

if (chrome.cookies && chrome.cookies.onChanged) {
  chrome.cookies.onChanged.addListener(function (changeInfo) {
    const cookie = changeInfo && changeInfo.cookie;
    if (!cookie) {
      return;
    }
    if (cookie.name !== 'auth-token' && cookie.name !== 'unique_id') {
      return;
    }
    const domainRaw = typeof cookie.domain === 'string' ? cookie.domain : '';
    const domain = domainRaw.startsWith('.') ? domainRaw.slice(1) : domainRaw;
    if (domain !== 'twitch.tv' && !domain.endsWith('.twitch.tv')) {
      return;
    }
    refreshAuthTokenState('cookie-change:' + cookie.name);
  });
}

async function handleIntegrityCaptured(integrity) {
  if (typeof integrity !== 'string') return;
  const value = integrity.trim();
  if (!value || !value.startsWith('v4.local.')) return;
  try {
    const stored = await chrome.storage.local.get([INTEGRITY_STORAGE_KEY]);
    const current = typeof stored[INTEGRITY_STORAGE_KEY] === 'string' ? stored[INTEGRITY_STORAGE_KEY] : '';
    if (current === value) {
      await chrome.storage.local.set({ [INTEGRITY_UPDATED_AT_KEY]: Date.now() });
      return;
    }
    await chrome.storage.local.set({
      [INTEGRITY_STORAGE_KEY]: value,
      [INTEGRITY_UPDATED_AT_KEY]: Date.now(),
    });
    refreshAuthTokenState('integrity-captured');
  } catch (error) {
    console.warn('Failed to persist captured integrity', error);
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (!message || typeof message !== "object") {
    return;
  }

  if (message.type === ANALYTICS_MESSAGE_TYPE) {
    (async function () {
      try {
        const result = await handleAnalyticsMessage(message.payload, sender);
        sendResponse(result);
      } catch (error) {
        console.warn("Failed to process analytics message", error);
        sendResponse({ ok: false, error: error && error.message ? error.message : String(error) });
      }
    })();
    return true;
  }

  if (message.type === 'GGSEL_INTEGRITY_CAPTURED') {
    handleIntegrityCaptured(message.integrity);
    return false;
  }

  if (message.type === OPEN_LINK_MESSAGE_TYPE) {
    const url = typeof message.url === "string" ? message.url : "";
    if (!isSafeOpenLinkUrl(url)) {
      sendResponse({ ok: false, error: "Invalid URL" });
      return false;
    }

    try {
      const tabCreateResult = chrome.tabs.create({ url });
      if (tabCreateResult && typeof tabCreateResult.then === 'function') {
        tabCreateResult
          .then(() => sendResponse({ ok: true }))
          .catch((error) => sendResponse({
            ok: false,
            error: error?.message || String(error),
          }));
        return true;
      }
      sendResponse({ ok: true });
    } catch (error) {
      sendResponse({
        ok: false,
        error: error?.message || String(error),
      });
    }
    return false;
  }

  if (message.type === BACKGROUND_FETCH_MESSAGE_TYPE) {
    const url = typeof message.url === "string" ? message.url : "";
    const init = buildRequestInit(message.init);

    (async function () {
      if (!url) {
        sendResponse({ ok: false, error: "Invalid URL" });
        return;
      }

      try {
        const response = await fetch(url, init);
        const headers = {};
        response.headers.forEach(function (value, key) {
          headers[key] = value;
        });
        const bodyText = await response.text();
        sendResponse({
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          headers,
          bodyText,
        });
      } catch (error) {
        sendResponse({
          ok: false,
          error: (error && error.message) ? error.message : String(error),
        });
      }
    })();

    return true;
  }

});

syncRulesetWithSettings({ ensureDefaults: true });
refreshAuthTokenState('initial-load');

// --- Own analytics batch buffer (Phase 1) ------------------------------------
// In MV3 the service worker hibernates after ~30s idle; we persist the queue
// to chrome.storage.session so events survive sw restarts within the same
// browser session. See docs/plans/2026-04-29-analytics-phase1.md (Task 5).
const ANALYTICS_BUFFER_KEY = 'analytics_buffer_v1';
const ANALYTICS_FLUSH_INTERVAL_MS = 30 * 1000;

async function sendOwnAnalyticsBatch(events) {
  if (!Array.isArray(events) || events.length === 0) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OWN_ANALYTICS_TIMEOUT_MS);
  try {
    const response = await fetch(buildEventsEndpoint(), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ events }),
      credentials: 'omit',
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`analytics batch HTTP ${response.status}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

let analyticsFlushTimer = null;
// Spec section 6.3: chrome.storage.local for buffer persistence (survives browser restart).
// chrome.storage.session would lose events when all browser windows close.
const bufferStorage = chrome.storage.local;

if (OWN_ANALYTICS_ENABLED) {
  const analyticsBuffer = createBatchBuffer({
    flushSize: 20,
    hardCap: 100,
    persistKey: ANALYTICS_BUFFER_KEY,
    sender: sendOwnAnalyticsBatch,
    storage: bufferStorage,
  });
  setOwnBackendBuffer(analyticsBuffer);

  analyticsBuffer.restore().then(() => analyticsBuffer.flush()).catch(() => {});

  analyticsFlushTimer = setInterval(() => {
    analyticsBuffer.flush().catch(() => {});
  }, ANALYTICS_FLUSH_INTERVAL_MS);

  if (chrome.runtime && chrome.runtime.onSuspend) {
    chrome.runtime.onSuspend.addListener(() => {
      analyticsBuffer.flush().catch(() => {});
    });
  }
}

// --- Uninstall beacon (Phase 1) ----------------------------------------------
// chrome.runtime.setUninstallURL is fired best-effort when the user removes
// the extension. The user_id stays stable across restarts via storage.local
// so the same URL points at our /api/v1/uninstall endpoint with the right id.
function getExtensionVersion() {
  try {
    return chrome.runtime.getManifest()?.version || '';
  } catch (_) {
    return '';
  }
}

function getUiLanguage() {
  try {
    return chrome.i18n.getUILanguage() || '';
  } catch (_) {
    return '';
  }
}

function buildWelcomeUrl() {
  const url = new URL('/welcome/', DEFAULT_API_BASE);
  const version = getExtensionVersion();
  const lang = getUiLanguage();
  if (version) url.searchParams.set('v', version);
  if (lang) url.searchParams.set('lang', lang);
  return url.toString();
}

async function configureUninstallUrl() {
  if (!OWN_ANALYTICS_ENABLED) return;
  if (!chrome.runtime || typeof chrome.runtime.setUninstallURL !== 'function') return;
  try {
    const userId = await getUserId();
    const version = getExtensionVersion();
    const lang = getUiLanguage();
    const url = new URL(buildUninstallEndpoint());
    if (userId) url.searchParams.set('user_id', userId);
    if (version) url.searchParams.set('version', version);
    if (lang) url.searchParams.set('lang', lang);
    url.searchParams.set('ts', String(Date.now()));
    await chrome.runtime.setUninstallURL(url.toString());
  } catch (error) {
    console.warn('Failed to set uninstall URL', error);
  }
}

configureUninstallUrl();
chrome.runtime.onInstalled.addListener(() => { configureUninstallUrl(); });

// ─── Notifications Broadcast (E06) ────────────────────────────────────
//
// chrome.alarms wakes the SW every 3 minutes (Chrome's minimum). On each
// tick we hit /api/v1/notifications/poll and, if a delivery is returned,
// render it via chrome.notifications.create. Clicks open click_url after
// a regex re-validation. Callbacks (shown/clicked/blocked/errored) are
// queued in storage.local so they survive SW restarts.
//
// We deliberately do NOT auto-start on install — the alarm is registered
// either:
//   a) on the next chrome.runtime.onStartup tick (browser reopen), or
//   b) immediately if the user already opted in (or on first install with
//      default-ON toggle).

async function notificationsBootstrap() {
  if (!NOTIFICATIONS_ENABLED) return;
  try {
    await notificationsStartAlarm(NOTIFICATIONS_POLL_INTERVAL_MIN);
    notificationsDrainSubscriptionQueue().catch(() => {});
    notificationsDrainQueue().catch(() => {});
  } catch (err) {
    console.warn('notifications bootstrap failed', err && err.message);
  }
}

chrome.runtime.onInstalled.addListener(() => { notificationsBootstrap(); });
if (chrome.runtime && chrome.runtime.onStartup) {
  chrome.runtime.onStartup.addListener(() => { notificationsBootstrap(); });
}
// Cold-boot path: when the SW spins up because the alarm fired, the
// onStartup listener does NOT fire — only the alarm listener does. The
// alarm handler below covers that case (and also calls bootstrap so the
// alarm is re-registered if the user nuked it via DevTools).
chrome.alarms.onAlarm.addListener((alarm) => {
  if (!alarm || !isNotificationsAlarm(alarm.name)) return;
  notificationsPollOnce()
    .then((r) => { if (r && r.skipped !== undefined) console.debug('notif poll skipped', r); })
    .catch((err) => console.warn('notif poll failed', err && err.message));
});

// Click → open click_url in new tab + report 'clicked' callback. URL is
// re-validated inside handleClicked (defense in depth — backend already
// validates at create-campaign time).
if (chrome.notifications && chrome.notifications.onClicked) {
  chrome.notifications.onClicked.addListener((notificationId) => {
    notificationsHandleClicked(notificationId)
      .catch((err) => console.warn('notif click failed', err && err.message));
  });
}

notificationsBootstrap();
