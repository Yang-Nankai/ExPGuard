// This is extension-owned Popup UI, not a page DOM source.
const extensionUrl = document.getElementById("extension-url").value;
chrome.runtime.sendMessage({ type: "ui-bookmark", url: extensionUrl });

// A popup can receive window.postMessage too, but this is extension UI rather
// than a content-script bridge. It must not become a web-to-tabs finding.
window.addEventListener("message", (event) => {
  if (event.data?.type === "ui-open") {
    chrome.tabs.create({ url: event.data.url });
  }
});
