chrome.runtime.onMessageExternal.addListener((message, _sender, sendResponse) => {
  if (!message || message.action !== "read-token") return;
  chrome.storage.sync.get("token", (result) => sendResponse(result.token));
  return true;
});
