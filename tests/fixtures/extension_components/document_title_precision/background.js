chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "step-count") {
    chrome.action.setBadgeText({ text: String(message.count) });
    // A title taint in payload.title must not contaminate payload.url.
    chrome.tabs.create({ url: message.payload.url });
  }

  if (message.action === "save-title") {
    chrome.storage.local.set({ savedTitle: message.title });
  }

  if (message.action === "save-array") {
    chrome.storage.local.set({ savedValues: message.values });
  }

  if (message.action === "set-title") {
    // Direct title text remains a reportable Action flow even when converted
    // with String.prototype.toString().
    chrome.action.setTitle({ title: message.title.toString() });
  }

  if (message.action === "numeric-object-key") {
    chrome.tabs.create({ url: message.payload.url });
  }
});

// Keep the storage write security-relevant: the concrete key has a consumer.
chrome.storage.local.get("savedTitle", () => {});
