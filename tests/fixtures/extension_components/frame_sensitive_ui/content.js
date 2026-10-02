// Shared page DOM: this remains attacker-controlled web content.
const pageUrl = document.getElementById("page-url").value;
chrome.runtime.sendMessage({ type: "bookmark", url: pageUrl });
