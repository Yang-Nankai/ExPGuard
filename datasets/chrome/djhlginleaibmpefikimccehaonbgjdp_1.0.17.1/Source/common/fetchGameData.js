// Twitch's MutationObserver fires hundreds of times per second on a heavy
// SPA. Without dedup the topup endpoint receives a stampede of parallel
// requests before the first response (and its Cache-Control) lands. Module
// memo + single-flight collapse that into one fetch per hour per tab.
const TOPUP_CACHE_TTL_MS = 60 * 60 * 1000;

let cachedUrl = null;
let cachedAt = 0;
let pending = null;

export async function fetchTopupLink(apiBase, backgroundFetchJson, { signal } = {}) {
  if (cachedUrl && (Date.now() - cachedAt) < TOPUP_CACHE_TTL_MS) {
    return cachedUrl;
  }
  if (pending) {
    return pending;
  }
  const url = new URL('/api/v1/topup', apiBase);
  pending = (async () => {
    try {
      const data = await backgroundFetchJson(url.toString(), { signal });
      const result = data?.url ? String(data.url) : '';
      if (result) {
        cachedUrl = result;
        cachedAt = Date.now();
      }
      return result;
    } finally {
      pending = null;
    }
  })();
  return pending;
}

export function __resetTopupCacheForTest() {
  cachedUrl = null;
  cachedAt = 0;
  pending = null;
}
