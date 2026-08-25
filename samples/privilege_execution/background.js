chrome.runtime.onMessage.addListener((message) => {
  if (message?.type !== "OPEN_URL") return;

  // Sink: the service worker opens an attacker-selected URL with extension
  // privileges and without authenticating or validating the request.
  chrome.tabs.create({ url: message.url });
});
