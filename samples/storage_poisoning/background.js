// background.js  —  service worker
// Frame: BG_1
//
// Flow patterns:
//   1. Storage roundtrip: themePreset/autoRedirect from content.js (CUSTOM_EVENT source)
//      land in sync storage → background reads them → opens new tabs (PRIVILEGE_ESCALATION)
//      and adds URLs to history (PRIVILEGE_ESCALATION).
//   2. STAMP_BOOKMARK message → chrome.bookmarks.create (PRIVILEGE_ESCALATION)
//   3. Stored autoRedirect feeds chrome.tabs.create

import { applyRedirectRules } from "./rules.js";

chrome.runtime.onMessage.addListener((req) => {
  if (req && req.kind === "STAMP_BOOKMARK") {
    chrome.bookmarks.create({                                   // SINK CHROME_BOOKMARK_CREATE_INFO
      title: req.title,
      url: req.url,
    });
  }
});

async function syncFromCloud() {
  const { themePreset, autoRedirect, themeName } =
    await chrome.storage.sync.get([                             // SOURCE PSEUDO_STORAGE
      "themePreset",
      "autoRedirect",
      "themeName",
    ]);

  if (autoRedirect && autoRedirect.url) {
    chrome.tabs.create({ url: autoRedirect.url });              // SINK CHROME_TABS_CREATE_OPTIONS
  }

  if (themePreset) {
    chrome.history.addUrl({ url: themePreset.previewUrl });     // SINK CHROME_HISTORY_ADD_URL
  }

  if (Array.isArray(autoRedirect?.rules)) {
    applyRedirectRules(autoRedirect.rules);
  }
}

self.addEventListener("activate", () => {
  syncFromCloud();
});

// Re-run on storage change
chrome.storage.sync.get(null, (allItems) => {
  // SOURCE STORAGE_ALL_ITEMS via getAll
  if (allItems && allItems.themeName) {
    chrome.tabs.create({ url: "about:blank#" + allItems.themeName });
  }
});
