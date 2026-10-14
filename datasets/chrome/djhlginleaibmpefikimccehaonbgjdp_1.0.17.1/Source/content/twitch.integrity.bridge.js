// Isolated-world bridge: listens for the CustomEvent emitted by the MAIN-world
// integrity capture script and relays the token to the background service
// worker, which persists it and triggers a DNR rule rebuild.
(function () {
  const EVENT_NAME = 'ggsel:integrity-captured';
  document.addEventListener(EVENT_NAME, function (ev) {
    const integrity = ev && ev.detail && typeof ev.detail.integrity === 'string' ? ev.detail.integrity : '';
    if (!integrity) return;
    try {
      chrome.runtime.sendMessage(
        { type: 'GGSEL_INTEGRITY_CAPTURED', integrity, ts: ev.detail.ts || Date.now() },
        function () { void chrome.runtime.lastError; },
      );
    } catch (_) { /* service worker might be asleep */ }
  }, false);
})();
