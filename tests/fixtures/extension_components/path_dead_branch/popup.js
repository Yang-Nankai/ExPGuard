// Tainted source `document.URL` is only assigned to `payload` along a
// branch guarded by a constant-false predicate. A path-sensitive analyzer
// must NOT report a flow.
let payload = "static";
if (1 === 2) {
  payload = document.URL;
}
chrome.runtime.sendMessage({ type: "ADD_BOOKMARK", url: payload });
