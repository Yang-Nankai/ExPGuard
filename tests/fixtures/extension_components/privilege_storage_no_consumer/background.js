// `telemetry` is written and never read anywhere in the extension, so
// poisoning it cannot influence any later decision.
chrome.runtime.onMessageExternal.addListener(function (msg) {
  chrome.storage.local.set({ telemetry: msg.blob });
});
