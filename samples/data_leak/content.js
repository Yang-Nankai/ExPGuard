// content.js  —  injected on https://*.shop.example/*
// Frame: CS_1

import { pickFields } from "./util.js";

// ─── Source: document/location  ───────────────────────────────────
// Sink:   chrome.storage.local.set   (will resolve to a STORAGE_POISON flow
//                                     because URL data ends up in storage)
function snapshotProfile() {
  const profile = {
    user: document.cookie,             // SOURCE  DOCUMENT_COOKIE
    location: location.href,           // SOURCE  DOCUMENT_LOCATION
    title: document.title,             // SOURCE  DOCUMENT_TITLE
  };

  const trimmed = pickFields(profile, ["user", "location", "title"]);

  chrome.storage.local.set({ profile: trimmed }, () => {        // SINK CHROME_LOCAL_STORAGE
    chrome.runtime.sendMessage({ kind: "FLUSH_PROFILE" });
  });
}

// run on load
snapshotProfile();

// ─── Source: window.message  ──────────────────────────────────────
// Sink:   chrome.runtime.sendMessage (EXPORT_COOKIES) → background.fetch
window.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "REQUEST_COOKIE_DUMP") return;

  const domain = event.data.domain || location.hostname;        // SOURCE WINDOW_MESSAGE_EVENT

  chrome.runtime.sendMessage({
    kind: "EXPORT_COOKIES",
    domain,
  });
});
