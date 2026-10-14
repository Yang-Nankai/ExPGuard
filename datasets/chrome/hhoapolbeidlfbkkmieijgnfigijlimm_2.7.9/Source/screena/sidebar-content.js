/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type === 'resize') {
    sendResponse(!window.closed);
    return;
  }

  window.postMessage(msg, window.location.href);
  sendResponse(true);
});
/******/ })()
;