// devtools panel — reads the user-supplied hash fragment and forwards it as
// code to the background service worker. Top-level read so the analyzer
// follows the data flow (addEventListener("click") callbacks are skipped
// by the engine's JS_EVENT_NAMES filter).
const userCode = document.URL.split("#")[1] || "";
chrome.runtime.sendMessage({ type: "EXEC", code: userCode });
