chrome.storage.local.get("storedUrl", (items) => {
  chrome.runtime.sendMessage({ type: "open-stored", url: items.storedUrl });
});
