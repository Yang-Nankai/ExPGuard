// this content-script plays role of medium to publish/subscribe messages from webpage to the background script

var extensionID = chrome.runtime.id;

var prefix = 'com.tokbox.screenSharing.' + extensionID;

// this port connects with background script

function init(port, messageHandler) {
  port.onDisconnect.addListener(onDisconnect);

  // if background script sent a message
  port.onMessage.addListener(onMessage);

  // this event handler watches for messages sent from the webpage
  // it receives those messages and forwards to background script
  window.addEventListener('message', messageHandler);

  function onDisconnect() {
    port.onDisconnect.removeListener(onDisconnect);
    port.onMessage.removeListener(onMessage);
    window.removeEventListener('message', messageHandler);
    var p = chrome.runtime.connect();
    init(p, onMessageHandler(p));
  };

}

function onMessage(message) {
  if(message && message.method === 'permissionDenied') {
    window.postMessage(response('permissionDenied', message.payload), '*');
  } else if(message && message.method === 'numberTabs') {
    window.postMessage(response('numberTabs', message.payload), '*');
  } else if(message && message.method === 'createdTab') {
    window.postMessage(response('createdTab', message.payload), '*');
  } else if(message && message.method === 'updatedTab') {
    window.postMessage(response('updatedTab', message.payload), '*');
  } else if(message && message.method === 'removedTab') {
    window.postMessage(response('removedTab', message.payload), '*');
  } else if(message && message.method === 'tabs') {
    window.postMessage(response('tabs', message.payload), '*');
  } else if(message && message.method === 'version') {
    window.postMessage(response('version', message.payload), '*');
  } else if(message && message.method === 'extensionLoaded') {
    window.postMessage(response('extensionLoaded', message.payload), '*');
  }
};

var response = function(method, payload) {
  var res = {payload: payload, from: 'extension'};
  res[prefix] = method;
  return res;
}
  
function onMessageHandler(port) {
  return function onMessage(event) {
    if(event.source != window) {
      return;
    }

    if(!(event.data != null && typeof event.data === 'object' && event.data[prefix]
      && event.data.payload != null && typeof event.data.payload === 'object')) {
      return;
    }

    if(event.data.from !== 'jsapi') {
      return;
    }

    var method = event.data[prefix],
        payload = event.data.payload;

    if(!payload.requestId) {
      console.warn('Message to the extension does not have a requestId for replies.');
      return;
    }

    if(method === 'isExtensionInstalled') {
      return port.postMessage({method: 'isExtensionInstalled'});
    }

    if(method === 'getNumberTabs') {
      return port.postMessage({method: 'getNumberTabs'});
    }

    if(method === 'refreshTab') {
      return port.postMessage({method: 'refreshTab', payload: payload});
    }

    if(method === 'openTab') {
      return port.postMessage({method: 'openTab', payload: payload});
    }

    if(method === 'closeTab') {
      return port.postMessage({method: 'closeTab', payload: payload});
    }

    if(method === 'getTabs') {
      return port.postMessage({method: 'getTabs'});
    }

    if(method === 'getVersion') {
      return port.postMessage({method: 'getVersion'});
    }
  }
}

var p = chrome.runtime.connect();
init(p, onMessageHandler(p));

// inform browser that you're available!
window.postMessage(response('extensionLoaded'), '*');
