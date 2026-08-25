// A privileged sink so the flow is classified rather than page-equivalent:
// chrome.bookmarks is unreachable from the web page itself.
chrome.runtime.onMessage.addListener(function (msg) {
  chrome.bookmarks.create({ title: msg.kind, url: msg.url });
});
