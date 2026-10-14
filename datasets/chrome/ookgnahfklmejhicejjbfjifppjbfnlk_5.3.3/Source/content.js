// AdsMeta Content Script — runs on facebook.com / adsmanager.facebook.com
'use strict';

let _cachedToken = null;
let _cachedFbdt  = null;
let _cachedEaag  = null;

async function extractFromPage(url) {
  try {
    const res  = await fetch(url, { credentials: 'include' });
    const html = await res.text();

    let token = null, fbdt = null, eaag = null;

    const m1 = html.match(/window\.__accessToken="([^"]+)"/);
    if (m1) token = m1[1];
    const m2 = html.match(/__accessToken=([^&"]+)/);
    if (!token && m2) token = m2[1];
    const m3 = html.match(/access_token":"([^"]+)"/);
    if (!token && m3) token = m3[1];

    // CSRF token for GraphQL
    const md = html.match(/\["DTSGInitData",\[\],\{"token":"([^"]+)"/);
    if (md) fbdt = md[1];

    // EAAG token (different auth scope — used for hidden-admin detection)
    const mg = html.match(/EAAG[A-Za-z0-9_-]{10,}/);
    if (mg) eaag = mg[0];

    return { token, fbdt, eaag };
  } catch {
    return { token: null, fbdt: null, eaag: null };
  }
}

async function getToken() {
  if (_cachedToken) return { token: _cachedToken, fbdt: _cachedFbdt, eaag: _cachedEaag };

  // Only fetch cross-origin adsmanager URLs when already ON adsmanager (same-origin).
  // Fetching adsmanager.facebook.com from business.facebook.com is blocked by CORS.
  const onAdsManager = window.location.hostname === 'adsmanager.facebook.com';
  const urls = onAdsManager
    ? [
        'https://adsmanager.facebook.com/adsmanager/manage/campaigns',
        'https://adsmanager.facebook.com/adsmanager/manage/accounts',
      ]
    : [];

  for (const url of urls) {
    const { token, fbdt, eaag } = await extractFromPage(url);
    if (token && token !== 'NO') {
      _cachedToken = token;
      if (fbdt)  _cachedFbdt = fbdt;
      if (eaag)  _cachedEaag = eaag;
      return { token: _cachedToken, fbdt: _cachedFbdt, eaag: _cachedEaag };
    }
  }

  // Fallback: extract token from current page DOM (no cross-origin fetch needed)
  const html = document.documentElement.outerHTML;
  const t1 = html.match(/window\.__accessToken="([^"]+)"/);
  const t2 = html.match(/__accessToken=([^&"]{10,})/);
  const t3 = html.match(/"access_token":"(EAA[A-Za-z0-9_-]{20,})"/);
  // Broader patterns for business.facebook.com pages
  const t4 = html.match(/"token":"(EAA[A-Za-z0-9_-]{40,})"/);
  const t5 = html.match(/["'](EAA[A-Za-z0-9_-]{80,})["']/);
  const token = t1?.[1] || t2?.[1] || t3?.[1] || t4?.[1] || t5?.[1] || null;
  const md = html.match(/\["DTSGInitData",\[\],\{"token":"([^"]+)"/);
  const fbdt = md?.[1] || null;
  const mg = html.match(/EAAG[A-Za-z0-9_-]{10,}/);
  const eaag = mg?.[0] || null;
  if (token && token !== 'NO') {
    _cachedToken = token;
    if (fbdt) _cachedFbdt = fbdt;
    if (eaag) _cachedEaag = eaag;
    return { token: _cachedToken, fbdt: _cachedFbdt, eaag: _cachedEaag };
  }

  // Last resort: ask the background service worker. The SW has host_permissions for
  // *.facebook.com and can fetch adsmanager cross-origin (no CORS), so it works even on
  // pages like business.facebook.com billing where the token isn't embedded in the DOM.
  try {
    const swRes = await new Promise(resolve => {
      chrome.runtime.sendMessage({ type: 'SW_GET_FB_TOKEN' }, (res) => {
        resolve(chrome.runtime.lastError ? null : res);
      });
    });
    if (swRes && swRes.token) {
      _cachedToken = swRes.token;
      if (swRes.fbdt) _cachedFbdt = swRes.fbdt;
      return { token: _cachedToken, fbdt: _cachedFbdt, eaag: _cachedEaag };
    }
  } catch { /* SW unavailable */ }

  return { token: null, fbdt: null, eaag: null };
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'GET_TOKEN') {
    getToken().then(sendResponse);
    return true;
  }
  if (msg.type === 'GET_PAGE_DATA') {
    sendResponse({ url: window.location.href, title: document.title });
    return true;
  }
  if (msg.type === 'CLEAR_TOKEN') {
    _cachedToken = null; _cachedFbdt = null; _cachedEaag = null;
    sendResponse({ ok: true });
    return true;
  }
  // Proxy fetch with FB session cookies — called by background when dashboard needs Graph API data.
  // Extracts a FRESH token from the current page HTML (smeta.vn approach) and substitutes it
  // into the URL so the request always uses a live token + session cookies.
  if (msg.type === 'FETCH_WITH_CREDS') {
    const { url, method = 'GET' } = msg;
    if (!url) { sendResponse({ ok: false, error: 'no_url' }); return true; }

    // Extract fresh EAA token from current page HTML (same regex as smeta.vn)
    const html = document.documentElement.outerHTML;
    const tokenMatch = html.match(/"(EAA[A-Za-z0-9_-]{20,})"/);
    const freshToken = tokenMatch ? tokenMatch[1] : null;


    // Replace stale cached token in URL with fresh token if found
    let fetchUrl = url;
    if (freshToken) {
      fetchUrl = url.replace(/access_token=[^&]+/, 'access_token=' + freshToken);
    }

    fetch(fetchUrl, {
      method,
      credentials: 'include',
      headers: { 'Referer': 'https://business.facebook.com/adsmanager/manage/accounts' },
    })
      .then(r => r.text())
      .then(data => {
        sendResponse({ ok: true, data });
      })
      .catch(err => {
        console.error('[AdsMeta-CS] fetch error:', err.message);
        sendResponse({ ok: false, error: err.message });
      });
    return true;
  }

  // [ĐÃ GỠ] FETCH_GQL_IN_TAB — background giờ chạy GraphQL trong tab bằng chrome.scripting.executeScript
  // (tự chữa, không phụ thuộc content script). Không còn ai gọi handler này nữa.
});

// Helper — write to chrome.storage.session safely (fails silently in stale content script context)
function safeSessionSet(data) {
  try {
    const p = chrome.storage.session.set(data)
    if (p && typeof p.catch === 'function') p.catch(() => {})
  } catch {}
}

// PRIMARY: receive live token from inject.js (MAIN world) — most reliable source
window.addEventListener('message', (e) => {
  if (e.source !== window) return;
  if (!e.data || !e.data.__adsmeta) return;
  const { token, fbdt } = e.data;
  if (token && token.startsWith('EAA')) {
    _cachedToken = token;
    if (fbdt) _cachedFbdt = fbdt;
    // Store in sessionStorage (per-tab bridge for sidebar.js Priority 0)
    try { sessionStorage.setItem('_adsmeta_fb_token', token); sessionStorage.setItem('_adsmeta_fb_token_time', String(Date.now())) } catch {}
    safeSessionSet({ fb_token: token, fb_token_time: Date.now(), ...(fbdt ? { fb_fbdt: fbdt } : {}) });
    // Also store in local storage so billing page Priority 1 can read it across tabs
    try { chrome.storage.local.set({ fb_token: token, fb_token_time: Date.now() }) } catch {}
  }
});

// FALLBACK: re-fetch URLs and extract from HTML (less reliable, used if MAIN world script can't run)
// Only run on adsmanager/www — fetching adsmanager URLs from business.facebook.com causes CORS errors
const _fetchableHosts = ['adsmanager.facebook.com', 'www.facebook.com'];
if (_fetchableHosts.includes(window.location.hostname)) {
  chrome.runtime.sendMessage({ type: 'CHECK_FEATURE', feature: 'fbDataSync' }, res => {
    if (res?.enabled === false) return;
    getToken().then(({ token, fbdt, eaag }) => {
      // Don't overwrite if MAIN world already provided a fresher token
      if (token && !_cachedToken) safeSessionSet({ fb_token: token, fb_token_time: Date.now() });
      if (fbdt)  safeSessionSet({ fb_fbdt: fbdt });
      if (eaag)  safeSessionSet({ fb_token_eaag: eaag });
    });
  });
}
