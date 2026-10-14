export const DEFAULT_API_BASE = 'https://twitch.ggsel.net';
export const REQUEST_TIMEOUT_MS = 7000;
// Canonical source marker for links opened from the Twitch extension.
export const DEFAULT_UTM_SOURCE = 'ggsel_twitch_extension';
// Stable canonical UTM medium for the extension (spec 3.3)
export const DEFAULT_UTM_MEDIUM = 'twitch_app';
export const GA_MEASUREMENT_ID = 'G-NCQMPNWKWS';
export const GA_API_SECRET = 'grdZVJk4ROmZPlW9HA_CpQ';
export const YM_COUNTER_ID = '104649646';

// Phase 1 own analytics — third sink parallel to GA4/Yandex.
// Set to false as kill switch if backend is overloaded or under attack.
export const OWN_ANALYTICS_ENABLED = true;
export const OWN_ANALYTICS_TIMEOUT_MS = 5000;

export function buildEventsEndpoint(base = DEFAULT_API_BASE) {
  return new URL('/api/v1/events', base).toString();
}

export function buildUninstallEndpoint(base = DEFAULT_API_BASE) {
  return new URL('/api/v1/uninstall', base).toString();
}

// Notifications Broadcast (E06) — endpoint surface for the extension.
// Backend reference: backend/src/routes/notifications.routes.js
export const NOTIFICATIONS_ENABLED = true;
export const NOTIFICATIONS_POLL_INTERVAL_MIN = 3; // chrome.alarms minimum

export function buildPollEndpoint(userId, version, base = DEFAULT_API_BASE) {
  const url = new URL('/api/v1/notifications/poll', base);
  if (userId) url.searchParams.set('user_id', userId);
  if (version) url.searchParams.set('v', version);
  return url.toString();
}

export function buildCallbackEndpoint(id, action, base = DEFAULT_API_BASE) {
  // action ∈ {shown, clicked, blocked, errored}
  return new URL(`/api/v1/notifications/${encodeURIComponent(id)}/${action}`, base).toString();
}

export function buildSubscriptionEndpoint(base = DEFAULT_API_BASE) {
  return new URL('/api/v1/notifications/subscription', base).toString();
}
