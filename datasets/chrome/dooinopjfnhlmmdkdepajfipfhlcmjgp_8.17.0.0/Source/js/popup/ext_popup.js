// Copyright (C) 2022 CrankWheel ehf. All Rights Reserved.
//
// This file is part of the CrankWheel Screen Sharing browser extension,
// see https://crankwheel.com/ for details.
//
// This file is the root handler for messages and ports serviced by the pop-up
// page.

// The search string on the popup iframe starts with ?cookie= and we want the bit after that.
var epuPopupCookie = window.location.search.substring(8);

var epuDesktopMediaPicker = null;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.cmd == "doConfirmTab") {
    doConfirmTab(message.tabId, message.tabUrl);
  } else if (message.cmd == "chromeIdleOnStateChanged") {
    if (window.epuAppPort) {
      window.epuAppPort.postMessage(message);
    }
  } else if (message.cmd == "isSessionOngoing") {
    sendResponse(!!window.epuAppPort);
  }
  return false;
});

chrome.runtime.onMessageExternal.addListener(function (req, sender, callback) {
  if (req.cookie && req.cookie ==  epuPopupCookie) {
    if (req.cmd == 'isCurrentTabShowingWebPage') {
      isCurrentTabShowingWebPage(callback);
      return true;  // Asynch response
    } else if (req.cmd == 'getCallingWindowDimensions') {
      getCallingWindowDimensions(sender, callback);
      return true;  // Asynch response
    } else if (req.cmd == 'setCallingWindowDimensions') {
      setCallingWindowDimensions(req.dimensions, sender, callback);
      return false;
    }
  }
  return false;  // Default: Don't need the callback to be valid after we return.
});

// A port is used for actions where communications need to stay
// up and running while the actions complete. This includes picking a tab
// and retrieving media streams for full screen, application window or
// a browser tab.
//
// Note: This doesn't really need to be a port any more now that it's happening
// inside the popup iframe, whose lifetime is demarcated by the lifetime of
// the webext itself, but leaving it as a port for now to limit changes, and
// because we are using existence of the window.epuAppPort variable as an indicator
// that a session is ongoing.
chrome.runtime.onConnectExternal.addListener(function (p) {
  if (p.name != epuPopupCookie) {
    // Each popup instance will only connect on a port bearing the same
    // cookie as the popup iframe was launched with (?cookie=xyz on the
    // iframe URL).
    return;
  }

  window.epuAppPort = p;

  epuAppPort.onMessage.addListener(function (req) {
    if (req.cmd == 'chooseDesktopMedia') {
      ecRemoveContentListener();
      epuDesktopMediaPicker = chrome.desktopCapture.chooseDesktopMedia(
        [req.captureType],
        epuAppPort.sender.tab,
        function (streamId, options) {
          epuAppPort.postMessage({
            cmd: 'chooseDesktopMediaResult',
            captureType: req.captureType,
            streamId: streamId
          });
        }
      );
    } else if (req.cmd == 'cancelChooseDesktopMedia') {
      if (epuDesktopMediaPicker) {
        chrome.desktopCapture.cancelChooseDesktopMedia(epuDesktopMediaPicker);
        epuDesktopMediaPicker = null;
      }
    } else if (req.cmd == 'startConfirmTab') {
      startConfirmTab();
    } else if (req.cmd == 'cancelConfirmTab') {
      cancelConfirmTab();
    } else if (req.cmd == 'setContentScriptConfig') {
      ecSetContentScriptConfig(req.config);
    } else if (req.cmd == 'showKeyboardOverlay') {
      ecShowKeyboardOverlay();
    } else if (req.cmd == 'hideKeyboardOverlay') {
      ecHideKeyboardOverlay();
    } else if (req.cmd == 'ping') {
      // Do nothing, this is just to document this as a valid request, it's
      // sent as a test when initially opening the port.
    }
  });

  epuAppPort.onDisconnect.addListener(function () {
    window.epuAppPort = null;
    ecRemoveContentListener();
  });
});
