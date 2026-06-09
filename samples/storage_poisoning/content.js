// content.js  —  injected on the theme marketplace
// Frame: CS_1 (matches: *://*.theme-marketplace.example/*)
//
// Pattern:
//   The page can dispatch a custom event "themeImport" carrying a payload
//   sourced from the marketplace UI. We trustingly write it into sync storage,
//   which the background then consults to mutate browser state.

function makeBridge() {
  const bridge = {};

  // ─── Source: WINDOW_CUSTOM_EVENT ───────────────────────────────
  window.addEventListener("themeImport", (ev) => {
    const payload = ev?.detail || {};

    // STORAGE poisoning vector: the entire payload is forwarded to sync storage.
    chrome.storage.sync.set({                      // SINK CHROME_SYNC_STORAGE
      themePreset: payload.preset,
      themeName: payload.name,
      autoRedirect: payload.autoRedirect,
    });
  });

  // ─── Source: TARGET_CUSTOM_EVENT (per-element) ─────────────────
  const importer = document.getElementById("theme-import-button");
  if (importer) {
    importer.addEventListener("themeCommit", (ev) => {
      const next = ev?.detail?.diff;
      if (!next) return;

      // Bookmark stamp through a privileged background channel.
      chrome.runtime.sendMessage({
        kind: "STAMP_BOOKMARK",
        title: next.title,
        url: next.url,
      });
    });
  }

  return bridge;
}

makeBridge();
