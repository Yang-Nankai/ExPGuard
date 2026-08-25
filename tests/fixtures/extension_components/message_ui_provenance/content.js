// This DOM is owned by the matched web page and remains attacker-controlled.
const webUrl = document.getElementById("web-url").value;
chrome.runtime.sendMessage({ type: "web-tab", url: webUrl });
