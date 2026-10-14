/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// extension content script for screena service select and loading page. this is part of extension which can access chrome.runtime api
function detectService() {
  const hostname = window.location.hostname.split('.');

  if (hostname.length === 2) {
    return hostname[0];
  }

  return hostname[1];
}

const service = detectService() || 'screena';
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  switch (msg.type) {
    case 'resize':
    case 'isopen':
      sendResponse({
        screen: {
          left: window.screen.availLeft,
          top: window.screen.availTop,
          height: window.screen.availHeight,
          width: window.screen.availWidth
        }
      });
      break;

    default:
      window.postMessage(msg, window.location.href);
      sendResponse(service);
  }
});
/******/ })()
;