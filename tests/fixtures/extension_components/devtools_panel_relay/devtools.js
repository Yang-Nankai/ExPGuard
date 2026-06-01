// devtools.js — registers a panel; the literal pagePath drives the runtime
// component discovery in scriptUsageTracker.
chrome.devtools.panels.create(
  "Inspector",
  "icon.png",
  "panel.html",
  () => {},
);
