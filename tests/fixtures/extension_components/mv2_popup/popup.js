// MV2 popup — exercises browser_action.default_popup discovery in MV2.
// Top-level read so the engine's "click"-callback skip doesn't elide the flow.
const candidate = document.URL.split("#")[1] || "";
chrome.runtime.sendMessage({ type: "ADD_BM", url: candidate });
