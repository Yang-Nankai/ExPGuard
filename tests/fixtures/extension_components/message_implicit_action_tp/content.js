const pageUrl = document.getElementById("implicit-action-source").value;
// An unknown index produces the bounded ImplicitDef { OPEN_URL, SAVE_DRAFT }.
const type = ["OPEN_URL", "SAVE_DRAFT"][window.__extensionUnknownIndex];
chrome.runtime.sendMessage({ type, url: pageUrl });
