// background.js — registers an offscreen document by literal URL.
// The literal "offscreen.html" is what scriptUsageTracker resolves into a
// runtime-discovered component during chrome.offscreen.createDocument.
chrome.offscreen.createDocument({
  url: "offscreen.html",
  reasons: ["DOM_PARSER"],
  justification: "Need DOMParser",
});

chrome.runtime.onMessage.addListener((req) => {
  if (req && req.type === "BM") {
    chrome.bookmarks.create({ title: "offscreen-bm", url: req.url });
  }
});
