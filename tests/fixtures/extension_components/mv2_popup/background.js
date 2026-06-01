chrome.runtime.onMessage.addListener((req) => {
  if (req && req.type === "ADD_BM") {
    chrome.bookmarks.create({ title: "mv2-bm", url: req.url });
  }
});
