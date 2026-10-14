(() => {
  // src/static/popup.js
  document.getElementById("version").innerHTML = chrome.runtime.getManifest().version;
})();
