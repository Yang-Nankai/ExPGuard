// Extension-owned UI: this is the user's deliberate input, not web content.
const popupUrl = document.getElementById("popup-url").value;
chrome.runtime.sendMessage({ type: "bookmark", url: popupUrl });
