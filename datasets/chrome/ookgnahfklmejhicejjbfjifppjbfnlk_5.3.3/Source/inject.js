// Runs in MAIN world on adsmanager.facebook.com — has direct access to page's window.__accessToken
// Posts the LIVE token to the ISOLATED content script via postMessage.
(function () {
  function readAndPost() {
    try {
      var t = window.__accessToken
      var dtsg = null
      try {
        var di = require && require('DTSGInitialData')
        if (di && di.token) dtsg = di.token
      } catch (e) {}
      if (t && /^EAA/.test(t)) {
        window.postMessage({ __adsmeta: true, token: t, fbdt: dtsg || '' }, window.location.origin)
      }
    } catch (e) {}
  }
  // Fire on load and again after SPA navigation/hydration
  readAndPost()
  setTimeout(readAndPost, 1500)
  setTimeout(readAndPost, 4000)
})()
