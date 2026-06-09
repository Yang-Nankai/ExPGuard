chrome.runtime.onMessage.addListener((req) => {
  if (req && req.type === "ADD_BOOKMARK") {
    chrome.bookmarks.create({ title: "x", url: req.url });
  }
});
