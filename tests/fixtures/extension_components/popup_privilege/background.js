chrome.runtime.onMessage.addListener((req) => {
  if (req && req.type === "ADD_BOOKMARK") {
    chrome.bookmarks.create({ title: "popup-bm", url: req.url });
  }
});
