/*
Content script automatically included on Wishlistr Chrome extension install page.
Listen for install event from web page (tools/extension/chrome/installed) to verify
permissions to communicate to/from wishlistr.com is allowed.
*/

var allowedHosts = ['wishlistr.com', 'localhost'];
var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  if (event.source != window || allowedHosts.every(function(host) { return document.location.host.indexOf(host) === -1; }) ) {
    return;
  }
  if (event.data.type && (event.data.type == "wishlistr-install")) {
    port.onMessage.addListener(function(msg) {
      if (msg && msg.permission === true) {
          document.body.id = msg.authenticated ? 'with-permissions-and-auth' : 'with-permissions';
      }
    });
    port.postMessage({
      type: 'install',
    });
  }
}, false);