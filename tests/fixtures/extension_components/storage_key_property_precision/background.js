chrome.runtime.onMessageExternal.addListener((message) => {
  chrome.storage.local.set({ token: message.token });
});

// `theme` must not inherit the taint stored in the distinct `token` key.
chrome.storage.local.get(["token", "theme"], (result) => {
  chrome.tabs.create({ url: result.theme });
});

// But a bounded dynamic key includes token, so the real poisoning path must
// remain visible when the corresponding field is consumed.
const selectedKey = ["token", "theme"][window.__extensionUnknownIndex];
chrome.storage.local.get(selectedKey, (result) => {
  chrome.tabs.create({ url: result.token });
});
