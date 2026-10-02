// `isAllowed` returns from two places. Keeping only the last one seen (the
// literal `false` in the catch arm) made `if (!isAllowed(...)) return;` fold to
// true, so the analyzer pruned everything below it as dead code.
function isAllowed(url) {
  try {
    return url.indexOf("https://") === 0;
  } catch (e) {
    return false;
  }
}

chrome.runtime.onMessageExternal.addListener(function (msg) {
  if (!isAllowed(msg.url)) {
    return;
  }
  chrome.bookmarks.create({ title: "guarded", url: msg.url });
});
