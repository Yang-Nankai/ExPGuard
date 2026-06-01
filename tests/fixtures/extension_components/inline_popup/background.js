chrome.runtime.onMessage.addListener((req) => {
  if (req && req.type === "BM") {
    chrome.bookmarks.create({ title: "inline-bm", url: req.url });
  }
});
