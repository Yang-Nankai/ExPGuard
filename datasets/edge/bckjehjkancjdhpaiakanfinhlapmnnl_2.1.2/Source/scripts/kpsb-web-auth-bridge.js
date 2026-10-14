/**
 * Runs on kpsb-extension-auth page only.
 * Security: strict origin, same-window only, basic JWT shape (token verified server-side).
 */
(function () {
  function allowedOrigin(origin) {
    try {
      var u = new URL(origin);
      if (u.protocol !== 'https:') return false;
      var h = u.hostname.toLowerCase();
      if (h === 'app.kiddoware.com') return true;
      if (/^[a-z0-9-]+\.app\.kiddoware\.com$/.test(h)) return true;
      return false;
    } catch (e) {
      return false;
    }
  }

  function looksLikeFirebaseIdToken(t) {
    if (typeof t !== 'string' || t.length < 100 || t.length > 12000) return false;
    var parts = t.split('.');
    if (parts.length !== 3) return false;
    return /^[A-Za-z0-9_-]+$/.test(parts[0]) && /^[A-Za-z0-9_-]+$/.test(parts[1]);
  }

  window.addEventListener('message', function (event) {
    if (event.source !== window) {
      return;
    }
    if (!allowedOrigin(event.origin || '')) {
      return;
    }
    var d = event.data;
    if (!d || d.type !== 'KPSB_EXTENSION_GOOGLE_OK') {
      return;
    }
    if (!looksLikeFirebaseIdToken(d.idToken)) {
      return;
    }
    var email = typeof d.email === 'string' && d.email.length < 256 ? d.email : '';
    chrome.runtime.sendMessage({
      type: 'KPSB_WEB_GOOGLE_AUTH',
      idToken: d.idToken,
      email: email
    });
  });
})();
