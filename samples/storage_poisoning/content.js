// Source: a web page controls event.data.
window.addEventListener("message", (event) => {
  if (event.source !== window || event.data?.type !== "SAVE_STARTUP_PAGE") {
    return;
  }

  // Sink: attacker-controlled data is persisted in extension-wide storage.
  chrome.storage.local.set({ startupPage: event.data.url });
});
