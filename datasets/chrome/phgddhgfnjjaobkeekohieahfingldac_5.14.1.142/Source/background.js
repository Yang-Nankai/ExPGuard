//console.log('running background script');
let multipleConnectionSupport = undefined;
let nativeAvailable = false;
var fdNativePort = null;

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log(`installed: ${details.reason}`);
  if(details.reason !== 'install'){
    return;
  }

  for (const cs of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({url: cs.matches})) {
      if (tab.url.match(/(chrome|chrome-extension):\/\//gi)) {
        continue;
      }
      try{
        const target = {tabId: tab.id, allFrames: cs.all_frames};
        if (cs.js[0]) chrome.scripting.executeScript({
          files: cs.js,
          injectImmediately: cs.run_at === 'document_end',
          world: cs.world, // requires Chrome 111+
          target,
        });
      } catch (error) {
        console.log(`Could not inject content script ${error}`);
      }
    }
  }
});

function onNativeDisconnect(response){
  let msg = '';
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message);
    
    // If the native messaging host (nm host) is not installed, after the first request to open
    // the port, the initial error will be "Specified native messaging host not found".
    // So if we get that, we can assume that the nm host is not installed. If we don't get that error, any subsequent
    // disconnections will be treated as the host shutting down or crashing. See FDWC-208
    msg = chrome.runtime.lastError?.message || '';
    const notInstalled =
      msg.includes('native messaging host not found') ||
      msg.includes('Specified native messaging host not found');
    if (notInstalled) {
      chrome.storage.local.get('fdWebExtension.nativeAvailable', (items) => {
        nativeAvailable = items['fdWebExtension.nativeAvailable'];
        if(nativeAvailable){
          nativeAvailable = false;
          fdNativePort = null;
          console.log(`Native messaging disabled. FDWebConnect.exe is not available`);
          chrome.storage.local.set({ 'fdWebExtension.nativeAvailable': false },
            forceReconnectOnAllTabs);
        }
      });
      return;
    }
  }

  chrome.storage.local.get('fdWebExtension.nativeAvailable', (items) => {
    nativeAvailable = items['fdWebExtension.nativeAvailable'];

    if (nativeAvailable) {
      nativeAvailable = false;
      if (!msg.includes("Specified native messaging host not found")) {
        console.log(`Lost contact with native messaging host, retrying connection...`);
        fdNativePort = null;
        setupNativeMessaging();
      }
    } 
  });
}

function onNativeMessage(msg){
  //console.log(`native message from fd: ${JSON.stringify(msg)}`);
  if (!nativeAvailable) {
    nativeAvailable = true;
    console.log(`Native messaging enabled. FDWebConnect.exe is available`);
    chrome.storage.local.set({ 'fdWebExtension.nativeAvailable': true },
      forceReconnectOnAllTabs);
  }
  chrome.tabs.sendMessage(msg.tabId, { msg: "receiveNativeMsg", tabMsg: msg.tabMsg });
}

//service worker can be unloaded at any time. Need remember if we're connected to legacy FD
function storeMultipleConnectionSupport(enabled) {
  multipleConnectionSupport = enabled;
  chrome.storage.local.set({'fdWebExtension.multipleConnectionSupport':enabled});
}

function getMultipleConnectionSupport() {
  return new Promise(function(resolve, reject) {
    if (multipleConnectionSupport !== undefined) {
      console.log(`multiple connection support not undefined: ${multipleConnectionSupport}`)
      resolve(multipleConnectionSupport);
    } else {
      var key = 'fdWebExtension.multipleConnectionSupport';
      chrome.storage.local.get(key, items => {
        multipleConnectionSupport = items[key];
        if (multipleConnectionSupport === undefined) {
          multipleConnectionSupport = true; //default
        }
        resolve(multipleConnectionSupport);
      });
    }
  });
}

function forwardTabMsgToNative(tabId, msg) {
  //console.log(`native message from tab: Tab:${tabId}: ${msg}`); 
  if (nativeAvailable) {
    fdNativePort.postMessage({
      tabId: tabId,
      tabMsg: msg
    });
  }
}

function disconnectTabFromFD(tab) {
  //console.log('disconnectTabFromFD tabId=' + tab.id + ' executing disconnect-content-script');
  chrome.tabs.sendMessage(tab.id, {msg:"disconnectFD"});
}

function connectTabToFD(tab){
  chrome.tabs.sendMessage(tab.id, {msg:"connectFD"});
}

function connectAllTabsToFD(window) {
  chrome.tabs.query({ windowId: window.id }, function(tabs) {
    for (var j = 0; j < tabs.length; j++) {
      //console.log('onFocusChanged allTabId=' + tabs[j].id);
      //console.log('onFocusChanged connecting to FD');
      connectTabToFD(tabs[j]);
    }
  });
}

function forceReconnectOnAllTabs() {
  chrome.windows.getAll({}, function (windows) {
    for (var i = 0; i < windows.length; i++) {
      chrome.tabs.query({ windowId: windows[i].id }, function (tabs) {
        for (var j = 0; j < tabs.length; j++) {
          disconnectTabFromFD(tabs[j]);
        }
      });
    }
  });
  chrome.windows.getAll({}, function (windows) {
    for (var i = 0; i < windows.length; i++) {
      connectAllTabsToFD(windows[i]);
    }
  });
}

function disconnectAllInactiveTabsFromFD(window) {
  chrome.tabs.query({ windowId: window.id }, function(tabs) {
    for (var j = 0; j < tabs.length; j++) {
      //console.log('onFocusChanged allTabId=' + tabs[j].id);
      if (!window.focused || !tabs[j].active) {
        //console.log('onFocusChanged disconnecting from FD');
        disconnectTabFromFD(tabs[j]);
      }
    }
  });
}

function updateTabConnectionsToLegacyFD() {
  chrome.windows.getAll({}, function(windows) {
    // disconnect inactive tabs (incl active tab in windows w/out focus)
    for (var i = 0; i < windows.length; i++) {
      //console.log('onFocusChanged allWindowId=' + windows[i].id);
      disconnectAllInactiveTabsFromFD(windows[i]);
    }

    chrome.windows.getLastFocused({}, function(window) {
      connectActiveTabToFD(window);
    });
  });
}

function connectActiveTabToFD(window) {
  chrome.tabs.query({ windowId: window.id, active: true}, function(tabs) {
    if (tabs.length) {
      connectTabToFD(tabs[0]);
    }
  });
}

function setupNativeMessaging(){
  // lazy load the connection to native messaging host
  if(!fdNativePort){
    try{
      console.log("establishing connection to native messaging host");
      fdNativePort = chrome.runtime.connectNative("com.mmodal.fluency_direct_web_connector");
      fdNativePort.onMessage.addListener(onNativeMessage);
      fdNativePort.onDisconnect.addListener(onNativeDisconnect);
    } catch(error){
      console.error(`Failed to connect to native messaging host, ${error}`);
      fdNativePort = null;
    }
  }
}

// Fired when the currently focused window changes. Will be chrome.windows.WINDOW_ID_NONE if all chrome windows have lost focus.
chrome.windows.onFocusChanged.addListener(function(windowId) {
  console.log('onFocusChanged windowId=' + windowId);
  if (windowId != chrome.windows.WINDOW_ID_NONE){
    getMultipleConnectionSupport().then(supported => {
      if(!supported){ 
        updateTabConnectionsToLegacyFD();
      }else{
        chrome.tabs.query({ windowId: windowId, active: true }, function(tabs) {
          for (var j = 0; j < tabs.length; j++) {
            if (tabs[j].active){
              console.log(`windows.onfocusChanged updating active tab to new tab ${tabs[j].id}`);
              chrome.tabs.sendMessage(tabs[j].id, {msg:"pushUpdatedTabInfo"});
            }
          }
        });
      }
    }).catch((reason) =>{console.error(reason)});
  }
});

// This is very similar to the 'tabs.onUpdated' callback below, and the onFocusChange above
// When we notice one window close, make sure we notify the last focused window
chrome.windows.onRemoved.addListener(function(windowId) {
  console.log('onRemoved windowId=' + windowId);
  if (windowId != chrome.windows.WINDOW_ID_NONE){
    getMultipleConnectionSupport().then(supported => {
      if(!supported){ 
        updateTabConnectionsToLegacyFD();
      }else{
        chrome.windows.getLastFocused({}, function(lastFocused){
          chrome.tabs.query({ windowId: lastFocused.id, active: true }, function(tabs) {
            for (var j = 0; j < tabs.length; j++) {
              if (tabs[j].active){
                console.log(`windows.onRemoved updating active tab to new tab ${tabs[j].id}`);
                chrome.tabs.sendMessage(tabs[j].id, {msg:"pushUpdatedTabInfo"});
              }
            }
          });
        });
      }
    }).catch((reason) =>{console.error(reason)});
  }
});

// Fires when the active tab in a window changes.
chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log(
    'onActivated tabId=' +
      activeInfo.tabId +
      ', windowId=' +
      activeInfo.windowId,
  );
  getMultipleConnectionSupport().then(supported => {
    if(!supported){
      updateTabConnectionsToLegacyFD();
    }else{
     chrome.windows.getLastFocused({}, function(window){
        if(window.id === activeInfo.windowId){
          console.log(`tabs.onActivated updating active tab to new tab ${activeInfo.tabId}`);
          chrome.tabs.sendMessage(activeInfo.tabId, {msg:"pushUpdatedTabInfo"});
        }
      });
    }
  }).catch((reason) =>{console.error(reason)});
});

// Fired when a tab is updated.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(
    'onUpdated tabId=' + tabId + ', changeInfo=' + JSON.stringify(changeInfo),
  );

  if ('status' in changeInfo && changeInfo.status == 'complete') {
    //console.log('onUpdated tabId=' + tabId + ' page is complete');
    if (tab.active){
      chrome.windows.getLastFocused({}, function(window){
        if(window.id === tab.windowId){
          console.log(`onUpdated updating active tab to new tab ${tabId}`);
          chrome.tabs.sendMessage(tabId, {msg:"pushUpdatedTabInfo"});
        }
      });
    }
  }
});

// Fires when tab is closed. Native connections must be explicitly closed here since page no longer exists
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  //console.log('tab closed tabId=' + tabId);
  if (nativeAvailable) {
    forwardTabMsgToNative(tabId, JSON.stringify({
        msg: 'NativeDisconnect',
        fdTabId: "*"
      }));
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.message == "MultipleConnectionSupport"){
    getMultipleConnectionSupport().then(wasSupported => {
      let isSupported = request.supported;
      if (isSupported !== wasSupported) {
        storeMultipleConnectionSupport(isSupported);
        if (!isSupported) {
          updateTabConnectionsToLegacyFD();
        }
      }
    }).catch((reason) =>{console.error(reason)});
  }else if(request.message == "CheckIfTabActive"){ // should only be called after initial connection
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
    
      if(tabs[0].id == sender.tab.id){
        console.log(`yes, ${sender.tab.id}, you are active!`);
        chrome.tabs.sendMessage(sender.tab.id, {msg: "pushUpdatedTabInfo"});
      }
    });
  }else if(request.message == "CheckForActiveTab"){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
    
      if(tabs[0].id != sender.tab.id){
        console.log(`updating active tab to new tab ${sender.tab.id}`);
        chrome.tabs.sendMessage(tabs[0].id, {msg: "pushUpdatedTabInfo"});
      }
    });
  } else if (request.message == "sendNativeMsg") {
    forwardTabMsgToNative(sender.tab.id, request.nativeMsg)
  } else if (request.message == "ContentScriptLoaded"){
    setupNativeMessaging();
  }
});

chrome.webRequest.onAuthRequired.addListener(
  (details, callback) => {
    console.debug('An authorization request has been detected: ' + details.url);
  },
  { urls: ["<all_urls>"] }
);

chrome.webNavigation.onCompleted.addListener((details) => {
  console.debug(`Navigation complete: ${details.tabId} - ${details.url}`);
});

