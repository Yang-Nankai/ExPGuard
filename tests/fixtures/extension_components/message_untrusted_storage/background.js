chrome.runtime.onMessage.addListener((message) => {
  if (message && message.type === "open-stored") {
    chrome.tabs.create({ url: message.url });
  }
});
