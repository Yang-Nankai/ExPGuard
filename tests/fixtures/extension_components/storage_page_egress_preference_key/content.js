chrome.storage.local.get("defaultSpeed", (storage) => {
  window.postMessage({ type: "speed-setting", speed: storage.defaultSpeed }, "*");
});
