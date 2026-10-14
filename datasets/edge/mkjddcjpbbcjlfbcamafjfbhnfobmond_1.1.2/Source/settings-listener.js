/*
Content script automatically included on Wishlistr list settings page.
Listen for settings (tags) changes and post message to update extension
settings.
*/

var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  if (event.source != window || document.location.host.indexOf('wishlistr.com') === -1) {
    return;
  }

  if (event.data.type && (event.data.type == "settings-change")) {
    port.postMessage(event.data);
  }
}, false);
