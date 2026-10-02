// Intentionally vulnerable MV3 sample. Use synthetic data in a test profile.
// A matching webpage can call chrome.runtime.sendMessage(extensionId, ...).
// The listener checks the command, but never authorizes sender.origin.
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.kind === "READ_COOKIES") {
    chrome.cookies.getAll({ url: "https://private.example.test/" }, (cookies) => {
      sendResponse({ cookies });
    });
    return true;
  }

  if (message.kind === "READ_HISTORY") {
    chrome.history.search({ text: "", maxResults: 10 }, (history) => {
      sendResponse({ history });
    });
    return true;
  }
});
