chrome.runtime.onMessage.addListener(function (msg) {
  chrome.bookmarks.create({ title: "swept", url: msg.url });
});
