/**
 * Firebase config for Safe Browser extension.
 * Must match the same Firebase project used by the Vue app and Laravel backend.
 * App must be initialized before firebase-auth-compat.js runs.
 */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBxZ5ijlM4s4pmew1-sIPqYLFgHQ-xBqrE",
  authDomain: "kids-place.firebaseapp.com",
  projectId: "kids-place",
  storageBucket: "kids-place.appspot.com",
  messagingSenderId: "376371791920",
  appId: "1:376371791920:web:33198eb44185e1f7aac5f5"
};

if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(window.FIREBASE_CONFIG);
  } catch (e) {
    if (e.code !== 'app/duplicate-app') throw e;
  }
}
