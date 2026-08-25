chrome.runtime.onMessage.addListener((message) => {
  if (message && message.type === "ui-bookmark") {
    chrome.bookmarks.create({ title: "extension UI", url: message.url });
  }
  if (message && message.type === "web-tab") {
    chrome.tabs.create({ url: message.url });
  }
});
