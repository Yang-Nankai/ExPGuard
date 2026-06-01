// offscreen.js — privileged DOM context behind chrome.offscreen.
// Note: window.addEventListener("message") fires in offscreen documents
// (unlike service workers), so this is a real attack-surface point.
window.addEventListener("message", (e) => {
  const data = e.data;
  if (data && data.type === "BM") {
    chrome.runtime.sendMessage({ type: "BM", url: data.url });
  }
});
