// Spread and Object.assign can only copy *known* properties. When the source
// is opaque these copies see nothing, so the taint has to ride on the
// container itself for `copy.url` to stay tainted.

// 1. bare spread
chrome.runtime.onMessageExternal.addListener(function (msg) {
  const copy = { ...msg };
  chrome.bookmarks.create({ title: "a", url: copy.url });
});

// 2. spread mixed with literal properties
chrome.runtime.onMessageExternal.addListener(function (msg) {
  const copy = { ...msg, tag: "x" };
  chrome.bookmarks.create({ title: "b", url: copy.url });
});

// 3. Object.assign onto a fresh target
chrome.runtime.onMessageExternal.addListener(function (msg) {
  const copy = Object.assign({}, msg);
  chrome.bookmarks.create({ title: "c", url: copy.url });
});
