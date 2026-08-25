// Reads the options-stored URL and uses it as a fetch target.
chrome.storage.sync.get(["serverUrl"], ({ serverUrl }) => {
  fetch(serverUrl).then((r) => r.text());
});
