// Options page — accepts a postMessage from another extension page and
// stores it. Exercises the WINDOW_MESSAGE_EVENT → CHROME_SYNC_STORAGE flow,
// classified as STORAGE_POSOING (extension UI surface).
window.addEventListener("message", (e) => {
  chrome.storage.sync.set({ serverUrl: e.data });
});
