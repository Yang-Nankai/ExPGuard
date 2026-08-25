// Same shape as the write-only fixture, but here `redirectUrl` is read back and
// fed to a privileged API — the write really can poison a later decision, so
// the STORAGE_POSOING finding must survive the privilege gate.
chrome.runtime.onMessageExternal.addListener(function (msg) {
  chrome.storage.local.set({ redirectUrl: msg.blob });
});

chrome.storage.local.get(["redirectUrl"], function (result) {
  chrome.tabs.create({ url: result.redirectUrl });
});
