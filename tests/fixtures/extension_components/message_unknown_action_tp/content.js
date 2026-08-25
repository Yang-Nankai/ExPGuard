const pageUrl = document.getElementById("unknown-action-source").value;
// The second candidate is opaque. Although SAVE_DRAFT itself cannot reach the
// receiver, the unknown alternative may be OPEN_URL and must not be pruned.
const type = ["SAVE_DRAFT", window.__extensionUnknownType][window.__extensionUnknownIndex];
chrome.runtime.sendMessage({ type, url: pageUrl });
