// Source: an untrusted page can send this message to the content script.
window.addEventListener("message", (event) => {
  if (event.source !== window || event.data?.type !== "OPEN_URL") return;

  chrome.runtime.sendMessage({
    type: "OPEN_URL",
    url: event.data.url,
  });
});
