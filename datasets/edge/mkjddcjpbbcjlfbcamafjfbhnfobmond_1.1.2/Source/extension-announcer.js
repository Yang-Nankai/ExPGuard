var extensionRuntime = typeof chrome !== "undefined" && chrome.runtime ? chrome.runtime : null;
var manifest = extensionRuntime && extensionRuntime.getManifest ? extensionRuntime.getManifest() : null;

var detail = {
  installed: true,
  name: "Wishlistr",
  version: manifest ? manifest.version : null,
  browser: "edge"
};

function announceInstalled() {
  window.dispatchEvent(
    new CustomEvent("wishlistr-extension-installed", { detail: detail })
  );
}

window.addEventListener("wishlistr-extension-check", announceInstalled);

announceInstalled();
