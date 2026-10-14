const version = '1.8.1';

function handleOnConnect(port) {
  port.onMessage.addListener(function(message) {
    if(message && message.method == 'getNumberTabs') {
      getNumberTabs();
    }
    if(message && message.method == 'getVersion') {
      getVersion();
    }
    if(message && message.method == 'getTabs') {
      getTabs();
    }
    if(message && message.method == 'openTab') {
      openTab(message.payload);
    }
    if(message && message.method == 'refreshTab') {
      refreshTab(message.payload);
    }
    if(message && message.method == 'closeTab') {
      closeTab(message.payload);
    }
    if(message && message.method == 'isExtensionInstalled') {
      isExtensionInstalled(message.payload);
    }
  });

  chrome.tabs.onRemoved.addListener(handleOnRemoved);
  chrome.tabs.onUpdated.addListener(handleOnUpdated);
  chrome.tabs.onCreated.addListener(handleOnCreated);

  port.onDisconnect.addListener(handleOnDisconnect);

  function handleOnDisconnect() {
    port.onDisconnect.removeListener(handleOnDisconnect);
    chrome.tabs.onRemoved.removeListener(handleOnRemoved);
    chrome.tabs.onUpdated.removeListener(handleOnUpdated);
    chrome.tabs.onCreated.removeListener(handleOnCreated);
  }

  function handleOnRemoved(tabId) {
    port.postMessage({method: 'removedTab', payload: {tabId: tabId}});
  }
  
  function handleOnUpdated(tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete') {
      port.postMessage({method: 'updatedTab', payload: {tabId: tabId, tab: tab, tabUrl: changeInfo.url}});
    }
  }
  
  function handleOnCreated(tab) {
    port.postMessage({method: 'createdTab', payload: {tabId: tab.id, tab: tab}});
  }

  function getNumberTabs() {
    chrome.tabs.query({}, function(tabs) {
      port.postMessage({method: 'numberTabs', payload: {numberTabs: tabs.length}});
    });
  }

  function getTabs() {
    chrome.tabs.query({}, function(tabs) {
      port.postMessage({method: 'tabs', payload: {tabs: tabs}});
    });
  }

  function getVersion() {
    port.postMessage({method: 'version', payload: {version}});
  }

  function openTab(payload) {
    chrome.tabs.create({url: payload.url});// {url: "http..."}
  }

  function refreshTab(payload) {
    chrome.tabs.refresh(payload.tab_id, {bypassCache: false});
  }

  function closeTab(payload) {
    chrome.tabs.remove(payload.tab_id);
  }

  function isExtensionInstalled(payload) {
    port.postMessage({method: 'extensionLoaded', payload});
  }
};

chrome.runtime.onConnect.addListener(handleOnConnect);
chrome.runtime.onInstalled.addListener(handleOnInstalled);

// This executes the content-script.js on already running proctorexam tabs when the extension was installed
function handleOnInstalled() {
  chrome.runtime.onInstalled.removeListener(handleOnInstalled); 
  chrome.tabs.query({ url: 'https://*.proctorexam.com/check_requirements/*'}, executeScriptOnTabs);
  chrome.tabs.query({ url: 'https://*.proctorexam.com/student_sessions/*' }, executeScriptOnTabs);
}


function executeScriptOnTabs(tabs) {
  tabs.forEach(tab => {
    chrome.tabs.update(tab.id, { active: true });
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      files: ['content-script.js']
    });
  }) 
}
