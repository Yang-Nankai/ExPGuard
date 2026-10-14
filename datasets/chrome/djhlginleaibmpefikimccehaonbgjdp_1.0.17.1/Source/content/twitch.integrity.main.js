// Runs in the page's MAIN world on *.twitch.tv. Patches fetch + XMLHttpRequest
// to observe the `Client-Integrity` header Twitch's own JS attaches to GQL
// requests. The integrity PASETO is produced by Twitch's Kasada client
// integrity challenge and rotates roughly every 5 minutes — it is never
// persisted in localStorage, so monkey-patching the HTTP globals is the only
// way to read it from extension code. Captured values are dispatched as a
// CustomEvent on `document`, which the isolated-world bridge listens for.
(function () {
  const EVENT_NAME = 'ggsel:integrity-captured';
  let lastEmitted = '';

  function emit(value) {
    if (typeof value !== 'string') return;
    const trimmed = value.trim();
    if (!trimmed || trimmed === lastEmitted) return;
    lastEmitted = trimmed;
    try {
      document.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { integrity: trimmed, ts: Date.now() } }));
    } catch (_) { /* ignore */ }
  }

  function matchesTwitchGql(url) {
    if (typeof url !== 'string') return false;
    return url.indexOf('gql.twitch.tv') !== -1;
  }

  function extractFromHeaders(headers, url) {
    if (!headers || !matchesTwitchGql(url)) return;
    try {
      if (typeof Headers !== 'undefined' && headers instanceof Headers) {
        const v = headers.get('Client-Integrity') || headers.get('client-integrity');
        if (v) emit(v);
        return;
      }
    } catch (_) { /* ignore */ }
    if (Array.isArray(headers)) {
      for (const pair of headers) {
        if (Array.isArray(pair) && pair.length >= 2 && String(pair[0]).toLowerCase() === 'client-integrity') {
          emit(String(pair[1]));
          return;
        }
      }
      return;
    }
    if (typeof headers === 'object') {
      for (const key of Object.keys(headers)) {
        if (key.toLowerCase() === 'client-integrity') {
          emit(String(headers[key]));
          return;
        }
      }
    }
  }

  try {
    const origFetch = window.fetch;
    if (typeof origFetch === 'function') {
      window.fetch = function patchedFetch(input, init) {
        try {
          if (input && typeof input === 'object' && 'url' in input && 'headers' in input) {
            extractFromHeaders(input.headers, input.url);
          }
          if (init && init.headers) {
            const url = typeof input === 'string' ? input : (input && input.url) || '';
            extractFromHeaders(init.headers, url);
          }
        } catch (_) { /* never break the page */ }
        return origFetch.apply(this, arguments);
      };
    }
  } catch (_) { /* ignore */ }

  try {
    const origSetHeader = XMLHttpRequest.prototype.setRequestHeader;
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function patchedOpen(method, url) {
      try { this.__ggsel_url = String(url || ''); } catch (_) { /* ignore */ }
      return origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.setRequestHeader = function patchedSetHeader(name, value) {
      try {
        if (typeof name === 'string' && name.toLowerCase() === 'client-integrity' && matchesTwitchGql(this.__ggsel_url || '')) {
          emit(value);
        }
      } catch (_) { /* ignore */ }
      return origSetHeader.apply(this, arguments);
    };
  } catch (_) { /* ignore */ }
})();
