/* global document, window, globalThis */

const config = globalThis.READLANG_EXTENSION_CONFIG;

window.readlangHostname = config.hostname;
window.READLANG = window.READLANG || {};

window.READLANG.gitCommit = config.gitCommit;

/** Compatibility version of chrome extension, can be:
 * - boolean: true
 * - integer value greater than or equal to: 2
 */
window.READLANG.chromeExtension = 3;

/** Browser type for extension. Detect via the extension URL scheme —
 * `moz-extension://` on Firefox, `chrome-extension://` everywhere else.
 * (Older code used `InstallTrigger`, which Firefox removed in v104.) */
window.READLANG.extensionBrowser =
  typeof chrome !== "undefined" &&
  chrome.runtime &&
  chrome.runtime.getURL("").startsWith("moz-extension://")
    ? "firefox"
    : "chrome";

/**
 * Save a clone of the document in case we want to use the web importer on it.
 * The web importer will not work as well on the Readlang-spannified document.
 * Only capture this once to preserve the original unmodified document.
 */
if (!window.READLANG.originalDocument) {
  window.READLANG.originalDocument = document.cloneNode(true);
}
