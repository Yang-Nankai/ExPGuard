// newtab.js — runs in the privileged extension context but is reachable from
// the user's address bar. A DOM-write sink driven by document.URL is enough
// to exercise the new EXTENSION_UI_PAGE severity bucket.
const fragment = document.URL.split("#")[1] || "";
document.write(fragment);
