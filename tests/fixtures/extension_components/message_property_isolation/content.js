const draft = document.getElementById("message-draft-source").value;
// The action reaches the listener, but only `draft` is page-controlled.
chrome.runtime.sendMessage({
  type: "OPEN_URL",
  draft,
  url: "https://extension.example/safe",
});
