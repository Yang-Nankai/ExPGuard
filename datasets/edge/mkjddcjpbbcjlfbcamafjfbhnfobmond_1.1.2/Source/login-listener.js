/*
Content script automatically included on Wishlistr list bookmarklet login page.
Listen for login success message and post message to authenticate for extension.
*/

var allowedHosts = ['wishlistr.com', 'localhost'];
var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  if (event.source != window || allowedHosts.every(function(host) { return document.location.host.indexOf(host) === -1; }) ) {
    return;
  }

  if (event.data.type && (event.data.type == "wishlistr-auth")) {
    port.postMessage({
      type: 'auth'
    });
  }
}, false);
