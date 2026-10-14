// Copyright (C) 2022 CrankWheel ehf. All Rights Reserved.
//
// This file is part of the CrankWheel Screen Sharing browser extension,
// see https://crankwheel.com/ for details.

// The CrankWheel extension's browser action button serves a couple of purposes:
//
// a) By default, it causes the presenter UI to pop up in a narrow window, moving
//    the current window out of the way. When the presenter UI is closed, if the
//    current window hasn't been resized after we moved it out of the way, it
//    gets sized back the way it was.
//
// b) When choosing a browser tab to share, the presenter clicks the browser
//    action to confirm which tab to share.
//
// c) The button animates to show that you are sharing, and animates to show that
//    you need to confirm the browser tab to share (see B above).

var idOfRequestingTab = null;

function animateNeedConfirm(color) {
  if (color === true) {
    chrome.action.setIcon({
      path: chrome.runtime.getURL("img/cwicon19red.png")
    });
  } else {
    chrome.action.setIcon({
      path: chrome.runtime.getURL("img/cwicon19.png")
    });
  }
  getNeedConfirm(function (needConfirm) {
    if (needConfirm) {
      setTimeout(animateNeedConfirm, 400, !color);
    } else {
      chrome.action.setIcon({
        path: chrome.runtime.getURL("img/cwicon19.png")
      });
    }
  });
}

function startConfirmTab() {
  setNeedConfirm(true);
  idOfRequestingTab = epuAppPort.sender.tab.id;

  animateNeedConfirm(true);
  chrome.action.setTitle({title: chrome.i18n.getMessage('startSharingThisTabBrowserActionMessage')});
}

function doConfirmTab(tabId, tabUrl) {
  cancelConfirmTab();
  if (window.epuAppPort) {
    chrome.tabCapture.getMediaStreamId({consumerTabId: idOfRequestingTab, targetTabId: tabId}, function (streamId) {
      void chrome.runtime.lastError;
      if (streamId) {
        ecAddContentListener();
        epuAppPort.postMessage({
          cmd: 'streamForSelectedTab',
          streamId: streamId,
          tabUrl: tabUrl
        });
      } else if (chrome.runtime.lastError.message == "Cannot capture a tab with an active stream.") {
        ecInjectContentScript(tabId, true);
        epuAppPort.postMessage({cmd: 'reconfirmDone'});
      } else {
        epuAppPort.postMessage({cmd: 'streamForSelectedTabError'});
      }
    });
  }
}

function isCurrentTabShowingWebPage(callback) {
  if (currentTabId == -1) {
    callback(false);
    return;
  }

  chrome.tabs.get(currentTabId, function (tab) {
    if (!tab.url || !tab.url.startsWith('http')) {
      callback(false);
    } else {
      callback(true);
    }
  });
}

function getCallingWindowDimensions(sender, callback) {
  var windowId = sender.tab.windowId;
  chrome.windows.get(windowId, function (wnd) {
    callback([wnd.left, wnd.top, wnd.width, wnd.height]);
  });
}

function setCallingWindowDimensions(dimensions, sender, callback) {
  var windowId = sender.tab.windowId;
  console.log(dimensions);
  if (dimensions.length != 4) return;
  var left = dimensions[0];
  var top = dimensions[1];
  var width = dimensions[2];
  var height = dimensions[3];
  chrome.windows.update(windowId, {left: left, top: top, width: width, height: height});
}
