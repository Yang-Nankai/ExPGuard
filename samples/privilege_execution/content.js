// content.js
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SAVE_BMK") {
    // SINK 1: Storage Poisoning
    chrome.storage.local.set({ title: event.data.title }, () => {
      chrome.runtime.sendMessage({ type: "EXEC", url: event.data.url });
    });
  }
});