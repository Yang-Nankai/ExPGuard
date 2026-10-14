// Copyright (C) 2022 CrankWheel ehf. All Rights Reserved.
//
// This file is part of the CrankWheel Screen Sharing browser extension,
// see https://crankwheel.com/ for details.

var currentTabId = -1;

var ecContentScriptConfig = {};

function ecSetContentScriptConfig(config) {
  ecContentScriptConfig = config;
}

function ecContentMessage(message, sender, _sendResponse) {
  if (window.epuAppPort && sender.tab && sender.tab.id == currentTabId) {
    window.epuAppPort.postMessage({cmd: 'contentMessage', message: message});
  }
}

function ecAddContentListener() {
  chrome.runtime.onMessage.addListener(ecContentMessage);
}

function ecRemoveContentListener() {
  chrome.runtime.onMessage.removeListener(ecContentMessage);
}

// TODO(joi): Test that this happens only once (with one session started) when we
// have multiple views open with an ext_popup iframe
function ecInjectContentScript(tabId, skipReconfirm) {
  // Resetting extraCrop is belt and suspenders in case the injected tab is
  // special (like chrome://extensions) and does not let us run content scripts.
  if (window.epuAppPort) {
    epuAppPort.postMessage({cmd: 'resetExtraCrop'});

    // TODO(joi): Switch to always using the same file once the config
    // approach is well-tested enough; aim to do so by Feb 2025.
    var injectDefaultFile = true;
    if (ecContentScriptConfig && Object.keys(ecContentScriptConfig).length != 0) {
      injectDefaultFile = false;
    }
    var fileToExecute = "js/content/c_script_default.js";
    if (!injectDefaultFile) {
      fileToExecute = "js/content/c_script.js";
    }

    if (!ecContentScriptConfig || !ecContentScriptConfig.injectionOff) {
      chrome.scripting.executeScript(
        {
          target: {tabId: tabId},
          files: [fileToExecute]
        },
        function () {
          if (!chrome.runtime.lastError && !injectDefaultFile) {
            chrome.tabs.sendMessage(tabId, {
              action: "initialize",
              config: ecContentScriptConfig
            });
          }

          // Injection will fail if we don't have active tab permission for the tab,
          // but we don't want to show an error in console when that occurs. Instead
          // we ask the presenter to re-confirm the tab.
          if (chrome.runtime.lastError && !skipReconfirm) {
            epuAppPort.postMessage({cmd: 'needReconfirm'});
            startConfirmTab();
            console.log(epuAppPort.sender.tab.id);
          }
        }
      );
    }

    // CrankWheel has an optional, enterprise-only, audit logging function,
    // where the URL of screen-shared tabs (minus query parameters) is logged
    // to the audit log. Thus, we send the URL of the tab here, but it is only
    // logged if the audit logging functionality has been turned on by the
    // account administrator.
    chrome.tabs.get(tabId, function (tab) {
      if (tab && tab.url) {
        var url = tab.url.split(/[?#]/)[0]; // Url without query or hash
        epuAppPort.postMessage({cmd: 'sharedTabUrlForAuditLog', url: url});
      }
    });
  }
}

function ecShowKeyboardOverlay() {
  if (currentTabId != -1) {
    chrome.tabs.sendMessage(currentTabId, {action: 'showKeyboardDiv'});
  }
}

function ecHideKeyboardOverlay() {
  if (currentTabId != -1) {
    chrome.tabs.sendMessage(currentTabId, {action: 'hideKeyboardDiv'});
  }
}

chrome.tabCapture.onStatusChanged.addListener(function (info) {
  if (info.status == "active") {
    ecInjectContentScript(info.tabId, true);
    currentTabId = info.tabId;
  } else if (info.tabId == currentTabId && info.status == "stopped") {
    currentTabId = -1;
  }
  if (info.status == "stopped") {
    chrome.tabs.sendMessage(info.tabId, {
      action: "removeListener"
    });
  }
});

// Execute content script on new page, for mouse and resize events.
chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    if (tabId == currentTabId) {
      if (changeInfo.status == "loading" && changeInfo.url && window.epuAppPort) {
        // This message sends the URL over at the start of loading, which is used to
        // disallow screen sharing if the URL is not allowed per content filter.
        //
        // Note that we also get a message at the end of loading, from the injected
        // content script a couple of lines down; this is used to again allow screen
        // sharing, when transitioning from a disallowed URL to an allowed URL (we
        // wouldn't want to transition while the old disallowed URL is still being
        // displayed).
        window.epuAppPort.postMessage({cmd: 'newUrlLoadingInTab', tabUrl: changeInfo.url});
      }
      if (changeInfo.status == "complete") {
        ecInjectContentScript(tabId);
      }
    }
  }
);

