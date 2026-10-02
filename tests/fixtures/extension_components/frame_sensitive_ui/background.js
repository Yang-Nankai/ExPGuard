chrome.runtime.onMessage.addListener((message) => {
  if (message && message.type === "bookmark") {
    chrome.bookmarks.create({ title: "source-test", url: message.url });
  }
});
