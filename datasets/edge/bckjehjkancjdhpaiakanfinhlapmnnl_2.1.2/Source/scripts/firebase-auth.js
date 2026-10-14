/**
 * Firebase Auth helper for Safe Browser extension.
 * Uses Firebase compat SDK (loaded from CDN before this script).
 * Provides sign-in with email/password and returns ID token for backend authorize.
 */
(function () {
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded. Load firebase-app-compat.js and firebase-auth-compat.js first.');
    return;
  }

  var app;
  var auth;

  function init() {
    if (app) return app;
    if (!window.FIREBASE_CONFIG) {
      console.error('FIREBASE_CONFIG not set.');
      return null;
    }
    app = firebase.app();
    if (!app) {
      app = firebase.initializeApp(window.FIREBASE_CONFIG);
    }
    auth = firebase.auth(app);
    return app;
  }

  /**
   * Sign in with email and password, then return the Firebase ID token.
   * @param {string} email
   * @param {string} password - raw password (no hashing)
   * @returns {Promise<string>} Firebase ID token
   */
  function signInAndGetToken(email, password) {
    init();
    if (!auth) return Promise.reject(new Error('Firebase Auth not available'));

    return auth.signInWithEmailAndPassword(email, password).then(function (userCredential) {
      return userCredential.user.getIdToken();
    });
  }

  /** Google Sign-In opens app.kiddoware.com (account picker); see popup.js + kpsb-web-auth-bridge.js */

  window.firebaseAuth = {
    init: init,
    signInAndGetToken: signInAndGetToken
  };
})();
