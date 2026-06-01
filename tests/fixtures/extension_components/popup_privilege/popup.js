// popup.js — privileged extension UI.
// Reads the current selection from the page URL the popup was opened on
// (the `document.URL` of the popup page itself carries the hash fragment
// the caller used to open it) and forwards it to background, which uses
// the value as the URL argument of chrome.bookmarks.create.
const candidateUrl = document.URL.split("#")[1] || "";
chrome.runtime.sendMessage({ type: "ADD_BOOKMARK", url: candidateUrl });
