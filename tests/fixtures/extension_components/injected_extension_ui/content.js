// This form control is declared and injected by the extension itself.
const panel = document.createElement("div");
panel.innerHTML = '<input id="extension-owned-url" type="url">';
document.documentElement.appendChild(panel);

const extensionUrl = document.getElementById("extension-owned-url").value;
chrome.tabs.create({ url: extensionUrl });

// This similarly shaped page field must remain a genuine content-script TP.
const pageUrl = document.getElementById("page-owned-url").value;
chrome.tabs.create({ url: pageUrl });
