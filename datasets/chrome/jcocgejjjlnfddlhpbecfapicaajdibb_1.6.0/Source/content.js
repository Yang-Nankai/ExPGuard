window.addEventListener("message", function(event) {
  if (event.source !== window) return;
  if (event.data?.type === "GEMINI_PROMPT") {
    chrome.runtime.sendMessage(event.data);
  }
  if (event.data?.type === "CANVA_ACTIVITY") {
    chrome.runtime.sendMessage(event.data);
  }
});
