const API_URL = 'https://urls.bark.us';

function sendData(url, email, runtimeId, payload = {}){

  const json = JSON.stringify(payload);
  const headers = new Headers();
  headers.append('X-Bark-Email', email);
  headers.append('X-Bark-Extension', runtimeId);
  headers.append('Content-Type', 'application/json;charset=UTF-8');

  return fetch(url, {
    method: 'POST',
    credentials: 'omit',
    cache: 'no-store',
    body: json,
    headers: headers,
  })
  .then((response) => {
    if(!response.ok){
      response.text().then(body => console.log("response body = ", body))
    }
  })
}

function injectInterceptor(config) {

  if (window.hasGeminiInterceptor) return;
  window.hasGeminiInterceptor = true;

  function logInterceptedGeminiRequest(data) {
    try {

      const params = new URLSearchParams(data);
      const outer = JSON.parse(params.get("f.req"));
      const inner = JSON.parse(outer[1]);
      const messageText = inner[0][0];

      if (messageText === null || typeof messageText !== "string" || messageText.length === 0) return;

      window.postMessage({
        type: "GEMINI_PROMPT",
        payload: {
          messageText: messageText,
          email: config.email,
          runtimeId: config.runtimeId
        }
      }, window.location.origin);

    } catch (e) {
      // We can probably just catch this, the request is not a batchexecute f.req payload
    }
  }

  // const { fetch: originalFetch } = window;
  // window.fetch = async (...args) => {
  //   console.log(">>> fetch!");
  //   const [resource, config] = args;
  //   const url = typeof resource === 'string' ? resource : resource.url;

  //   console.log(">>> url, ", url);
  //   if (url.includes("batchexecute")) {
  //     if (config?.body) logInterceptedGeminiRequest(config.body);
  //   }
  //   return originalFetch(...args);
  // };

  // --- 2. Intercept XHR ---
  const originalXhrSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(body) {
    // Only log if the URL looks like a Gemini/Google RPC call
    // The URL is stored in this._url usually after .open()
    if (body && (typeof body === 'string' || body instanceof Uint8Array || body instanceof ArrayBuffer)) {

      // We can't easily see the URL here without patching .open() too,
      // but logging all POST bodies with 'f.req' (standard for batchexecute) works:
      if (typeof body === 'string' && body.includes("f.req")) {
        logInterceptedGeminiRequest(body);
      }
    }
    return originalXhrSend.apply(this, arguments);
  };
}

function injectCanvaCapture(config) {

  if (window.hasCanvaInterceptor) return;
  window.hasCanvaInterceptor = true;

  const seenComments = new Set();
  const seenImages = new Set();

  const IMAGE_URL_MARKER = "media.canva.com/v2/document-image/";

  function currentDesignUrl() {
    // Only design routes (/design/<id>/...) carry a resolvable design context.
    // Return null off a design route so the location key is omitted entirely
    // (never sent as "", which would break the IP fallback).
    return /\/design\/[^/]+/.test(window.location.pathname) ? window.location.href : null;
  }

  function post(payload) {
    const location = currentDesignUrl();
    if (location) payload.location = location;
    payload.email = config.email;
    payload.runtimeId = config.runtimeId;
    window.postMessage({ type: "CANVA_ACTIVITY", payload: payload }, window.location.origin);
  }

  function emitComment(rawText) {
    if (typeof rawText !== "string") return;
    const text = rawText.trim();
    if (text.length === 0) return;
    if (seenComments.has(text)) return;
    seenComments.add(text);
    post({ activityType: "message", message: text });
  }

  function emitImage(url) {
    if (typeof url !== "string" || url.length === 0) return;
    if (seenImages.has(url)) return;
    seenImages.add(url);
    post({ activityType: "image", message: "", mediaUrl: url });
  }

  // Comments ride a collaboration WebSocket, never fetch/XHR (spike Fact #12),
  // but the text renders in the DOM. Canva exposes no semantic hook for comments
  // (no data-testid/role/aria-label; only hashed StyleX classes), so anchor
  // structurally, confirmed against a live session:
  //   - a comment thread is a [data-id] element that contains a <time> stamp;
  //     the <time> requirement also excludes canvas objects, which can carry
  //     data-id but never a timestamp;
  //   - within a thread, the body text is a <p> that wraps its text in a <span>
  //     and has no <time> (the author name sits directly in a <p>, and the
  //     timestamp is the <time>), so those are skipped.
  function scanComments() {
    document.querySelectorAll("[data-id]").forEach(function (thread) {
      if (!thread.querySelector("time")) return;
      thread.querySelectorAll("p").forEach(function (p) {
        if (p.querySelector("span") && !p.querySelector("time")) {
          emitComment(p.innerText || p.textContent || "");
        }
      });
    });
  }

  // Supplementary fallback for any image not surfaced by resource timing.
  function scanImages() {
    document.querySelectorAll("img").forEach(function (img) {
      const src = img.currentSrc || img.src || "";
      if (src.indexOf(IMAGE_URL_MARKER) !== -1) emitImage(src);
    });
  }

  // Primary image discovery: passive read of the resource-timing buffer for the
  // actual media.canva.com network loads (independent of how the image is
  // painted). This is the mechanism the spike used to surface imgUrls[].
  function harvestResourceEntries(entries) {
    entries.forEach(function (entry) {
      if (entry.name && entry.name.indexOf(IMAGE_URL_MARKER) !== -1) emitImage(entry.name);
    });
  }

  try {
    // Enlarge the buffer so a heavy SPA does not evict an early image entry
    // before it is read (~250-entry default cap).
    performance.setResourceTimingBufferSize(1000);
  } catch (e) { /* not fatal */ }

  try {
    const perfObserver = new PerformanceObserver(function (list) {
      harvestResourceEntries(list.getEntries());
    });
    // buffered:true replays resource entries that loaded before this observer
    // was created, which is how the late-injected module recovers images that
    // were already loaded when the page opened.
    perfObserver.observe({ type: "resource", buffered: true });
  } catch (e) { /* resource entry type unsupported: the DOM sweep still runs */ }

  // Read entries already in the buffer at install.
  try {
    harvestResourceEntries(performance.getEntriesByType("resource"));
  } catch (e) {}

  scanComments();
  scanImages();

  // Re-scan as Canva re-renders (SPA). Coalesce mutation bursts so the editor's
  // heavy DOM churn does not trigger a scan per mutation; dedup Sets guard
  // against re-posting anything already seen.
  let scanScheduled = false;
  const domObserver = new MutationObserver(function () {
    if (scanScheduled) return;
    scanScheduled = true;
    setTimeout(function () {
      scanScheduled = false;
      scanComments();
      scanImages();
    }, 500);
  });
  domObserver.observe(document.documentElement, { childList: true, subtree: true });
}

const changedTabs = {};

chrome.runtime.onMessage.addListener(function(message) {
  if (message.type === "GEMINI_PROMPT") {
    sendData(API_URL, message.payload.email, message.payload.runtimeId, {
      message: message.payload.messageText,
      type: "message",
      provider: "gemini",
      posted_at: Math.floor(Date.now() / 1000)
    })
    return;
  }

  if (message.type === "CANVA_ACTIVITY") {
    const p = message.payload;
    const payload = {
      provider: "canva",
      type: p.activityType,
      message: p.message
    };
    // bark-www branches image-vs-comment on media_url.presence, so images must
    // carry media_url. Do NOT send posted_at for canva (urls-sls server-stamps
    // it), and send location only when a design URL was resolved (never "").
    if (p.activityType === "image") payload.media_url = p.mediaUrl;
    if (p.location) payload.location = p.location;

    sendData(API_URL, p.email, p.runtimeId, payload)
    return;
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  // Chrome fires individual events for every property change so we need to
  // accumulate those changes to send as a single navigation event to the
  // backend.

  let changes = changedTabs[tab.id] || {};
  changes = { ...changes, ...changeInfo };
  changedTabs[tab.id] = changes;

  // Check if the page has finished loading and is on Gemini
  if (changeInfo.status === 'complete' && tab.url?.includes("gemini.google.com")) {
    chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (userInfo) {
      if (!userInfo.email) return;

      chrome.scripting.executeScript({
        target: { tabId: tabId },
        world: "MAIN", // Crucial: must be MAIN to wrap window.fetch
        func: injectInterceptor,
        args: [{
          email: userInfo.email,
          runtimeId: chrome.runtime.id
        }]
      });
    });
  }

  // Check if the page has finished loading and is on Canva
  if (changeInfo.status === 'complete' && tab.url?.includes("canva.com")) {
    chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (userInfo) {
      if (!userInfo.email) return;

      chrome.scripting.executeScript({
        target: { tabId: tabId },
        world: "MAIN", // Mirror the Gemini world:MAIN injection
        func: injectCanvaCapture,
        args: [{
          email: userInfo.email,
          runtimeId: chrome.runtime.id
        }]
      });
    });
  }

  if (changeInfo.status == 'complete') {
    // AJAX may trigger a 'loading' status after the page has loaded but before
    // the title is known. Keep track if we _ever_ completed loading the tab.
    changes.completed = true;
  }

  // If we have the info we need, schedule a message for posting to the
  // backend.
  if (changes.completed) {
    // SPAs do not always fire status change events in order or set the title
    // before the status is complete. A short delay allows the page to finish its
    // work so we can get the final url & title.
    if (changes.timeout) {
      clearTimeout(changes.timeout);
    }

    // If the title change hasn't come through yet, give it a bit more time
    const delay = 'title' in changes ? 500 : 10000;

    changes.timeout = setTimeout(function () {
      delete changedTabs[tab.id];

      chrome.identity.getProfileUserInfo(function (userInfo) {
        const email = userInfo.email;
        if (!email) return;

        sendData(API_URL, email, chrome.runtime.id, {
          url: changes.url,
          title: changes.title,
          type: "url",
          provider: "chrome",
        })
      });
    }, delay);
  }
});

importScripts("watchdog.js")
