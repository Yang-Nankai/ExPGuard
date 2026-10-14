// Copyright (C) 2024 CrankWheel ehf. All Rights Reserved.
//
// This file is part of the CrankWheel Screen Sharing browser extension,
// see https://crankwheel.com/ for details.

// This content script needs to be injected into tabs we are screen sharing,
// to enable the following features:
// - Highlight the presenter's mouse.
// - Enable remote control of tabs by enabling us to translate from on-page
//   coordinates to on-screen coordinates.
// - Enable remote control of tabs with same-origin iframes by letting click
//   events bubble correctly to the iframes.
// - Correctly crop black borders from around video provided by tabCapture.
// - Implement APIs for web pages to integrate with screen sharing, documented
//   in the section "Browser tab sharing API" at https://crankwheel.com/api/,
//   namely providing "cropping hints" and for the page to detect when it is
//   being screen shared.

// This default file is equivalent to c_script.js but without any parameterization.
// It is kept around for now to minimize change for 99%+ of users while we test
// the new approach (with parameterization) and make sure it is reliable.

// TODO(joi): Remove the default version by February 2025.

var keyboardDiv = null;

function showKeyboardDiv() {
  if (keyboardDiv) return;
  keyboardDiv = document.createElement('div');
  keyboardDiv.style = 'position: fixed; display: block; top: 0px; right: 0px; margin: 0.5rem; z-index: 99999; box-sizing: border-box; border-style: solid; border-radius: 0.25rem; border-width: 1px; border-color: rgb(25 118 210); background-color: rgb(66 165 245); padding: 0.25rem 0.5rem; font-family: sans-serif; font-size: 0.8rem; line-height: 1rem; font-weight: 500; color: rgb(255 255 255); cursor: pointer; white-space: nowrap;';
  keyboardDiv.innerText = '⌨️ Request Keyboard';
  keyboardDiv.onclick = function() {
    trySendMessage({ type: "trigger_viewer_keyboard" });
  };
  document.body.appendChild(keyboardDiv);
}

function removeKeyboardDiv() {
  if (keyboardDiv) {
    document.body.removeChild(keyboardDiv);
    keyboardDiv = null;
  }
}

// Our extension context can get invalidated at any point due to us no longer being
// the active tab. When this happens, unregister listeners.
function trySendMessage(msg) {
  try {
    chrome.runtime.sendMessage(msg);
  } catch (ex) {
    unregisterListeners();
  }
}

function unregisterListeners() {
  window.removeEventListener("mousemove", throttle);
  window.removeEventListener("click", handleClick);
  window.removeEventListener("resize", throttle);
  window.removeEventListener("blur", handleBlur);
  if (cwBlurTimeout) {
    clearTimeout(cwBlurTimeout);
    cwBlurTimeout = null;
  }
  if (cwUnloadResetTimeout) {
    clearTimeout(cwUnloadResetTimeout);
    cwUnloadResetTimeout = null;
  }

  window.removeEventListener("resize", processExtraCrop);

  if (extraCropObserver) {
    extraCropObserver.disconnect();
    extraCropObserver = null;
  }

  if (processExtraCropInterval) {
    window.clearInterval(processExtraCropInterval);
    processExtraCropInterval = null;
  }

  indicateScreenSharing(false);
  removeKeyboardDiv();
}

function getZoomLevel() {
  // These are all the different zoom levels supported by Chrome. Since outerWidth
  // is not predictably always the same as innerWidth at 100% zoom, we need to
  // match to the closest level.
  var candidateLevels = [0.25, 0.33, 0.50, 0.67, 0.75, 0.80, 0.90, 1.0, 1.1, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0, 4.0, 5.0, 99999.0];

  // At 100% zoom on a Mac, outerWidth is equal to innerWidth, and the same is
  // true for a maximized window at 100% zoom on Windows. However for a non-maximized
  // window, outerWidth is 14 larger than innerWidth at 100% zoom on Windows.
  // We therefore subtract half of that to make for a good approximation in
  // hopefully all situations.
  var ratio = (window.outerWidth - 7) / window.innerWidth;
  var lastDifference = 99999999.0;
  for (var i = 0; i < candidateLevels.length; ++i) {
    var candidate = candidateLevels[i];
    var diff = Math.abs(candidate - ratio);
    if (diff > lastDifference) {
      return candidateLevels[i - 1];
    } else {
      lastDifference = diff;
    }
  }
  return 1.0;
}

// Send intial width and height
trySendMessage({ type: "resize", width: window.innerWidth, height: window.innerHeight, zoomLevel: getZoomLevel() });

function throttle(fn, threshhold, scope) {
  var last;
  var deferTimer;
  return function () {
    var now = +new Date;
    var args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(scope, args);
      }, threshhold);
    } else {
      clearTimeout(deferTimer);
      last = now;
      fn.apply(scope, args);
    }
  };
}
var allFrames = [];

// True while the page is genuinely navigating away / unloading, so a blur the
// navigation itself produces doesn't end remote control. This must never get
// stuck on: beforeunload also fires for navigations the user then cancels (the
// same content script stays alive), and pagehide fires when the page enters the
// back/forward cache (it can later be restored). So we reset it on pageshow
// (bfcache restore) and via a short self-reset timer (canceled navigation); a
// real navigation destroys this content script before that timer fires.
var cwPageUnloading = false;
var cwUnloadResetTimeout = null;

function markPageUnloading() {
  cwPageUnloading = true;
  if (cwUnloadResetTimeout) clearTimeout(cwUnloadResetTimeout);
  cwUnloadResetTimeout = setTimeout(function () {
    cwUnloadResetTimeout = null;
    cwPageUnloading = false;
  }, 1500);
}
window.addEventListener("beforeunload", markPageUnloading);
window.addEventListener("pagehide", markPageUnloading);
window.addEventListener("pageshow", function () {
  cwPageUnloading = false;
  if (cwUnloadResetTimeout) {
    clearTimeout(cwUnloadResetTimeout);
    cwUnloadResetTimeout = null;
  }
});

var cwBlurTimeout = null;

// True if focus is currently lost from this page and every accessible frame.
function focusIsLost() {
  for (var i = 0; i < allFrames.length; i++) {
    try {
      if (frames[i] && frames[i].frameElement.contentWindow.document.hasFocus()) return false;
    } catch (error) {
    }
  }
  return !document.hasFocus();
}

function handleBlur() {
  // Debounce and re-check instead of ending remote control on the first blur. A
  // same-document navigation produces a transient blur (often from an iframe
  // being torn down) while document.hasFocus() is briefly false; acting on it
  // immediately ended remote control on essentially every navigation. By waiting
  // and re-checking, a navigation self-heals (focus returns to the new document,
  // this content script is destroyed before the timer fires, or we've flagged
  // the page as unloading), while a real, sustained focus loss (switching tab or
  // app) still ends remote control.
  if (cwBlurTimeout) clearTimeout(cwBlurTimeout);
  cwBlurTimeout = setTimeout(function () {
    cwBlurTimeout = null;
    if (cwPageUnloading) return;
    if (focusIsLost()) {
      trySendMessage({ type: "blur" });
    }
  }, 300);
}
window.addEventListener("blur", handleBlur);
window.addEventListener("mousemove", throttle(function (evt) {
  trySendMessage({ type: "mouse", x: evt.clientX, y: evt.clientY, screenX: evt.screenX, screenY: evt.screenY, clientWidth: window.innerWidth, clientHeight: window.innerHeight, zoomLevel: getZoomLevel() });
}, 50, this));
window.addEventListener("resize", throttle(function () {
  trySendMessage({ type: "resize", width: window.innerWidth, height: window.innerHeight, zoomLevel: getZoomLevel() });
}, 50, this));
function handleClick(evt) {
  trySendMessage({ type: "click", x: evt.clientX, y: evt.clientY, screenX: evt.screenX, screenY: evt.screenY, clientWidth: window.innerWidth, clientHeight: window.innerHeight, zoomLevel: getZoomLevel() });
}
window.addEventListener("click", handleClick, true);
gatherAllFrames();
function canAccessIFrame(iframe) {
  var html = null;
  try {
    var doc = iframe.contentWindow.document;
    html = doc.body.innerHTML;
  } catch (err) {
    // do nothing
  }
  return (html !== null);
}
function gatherAllFrames(frame) {
  var win = frame || window;
  if (frame) allFrames.push(frame);
  for (var i = 0; i < win.frames.length; i++) {
    frame = win.frames[i];
    try {
      if (canAccessIFrame(frame.frameElement)) {
        bubbleIframeMouseEvents(frame.frameElement);
        var existingOnLoad = frame.frameElement.onload;
        frame.frameElement.onload = function (a) {
          if (existingOnLoad) existingOnLoad();
          bubbleIframeMouseEvents(a.target);
        };
        gatherAllFrames(frame);
      }
    } catch (err) {
      // do nothing
    }
  }
}
function bubbleIframeMouseEvents(iframe) {
  if (!canAccessIFrame(iframe)) return;
  function createMouseEvent(type, e) {
    // We'll need this to offset the mouse appropriately
    var boundingClientRect = iframe.getBoundingClientRect();
    var scaleX = e.currentTarget.innerWidth / boundingClientRect.width;
    var scaleY = e.currentTarget.innerHeight / boundingClientRect.height;
    // Create a new event for the this window
    return new MouseEvent(type, {
      bubbles: true,
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: (e.clientX / scaleX) + boundingClientRect.left,
      clientY: (e.clientY / scaleY) + boundingClientRect.top
    });
  }
  var existingOnMouseMove = iframe.contentWindow.onmousemove;
  iframe.contentWindow.onmousemove = function (e) {
    if (existingOnMouseMove) existingOnMouseMove(e);
    var evt = createMouseEvent("mousemove", e);
    iframe.dispatchEvent(evt);
  };
  var existingOnClick = iframe.contentWindow.onclick;
  iframe.contentWindow.onclick = function (e) {
    if (existingOnClick) existingOnClick(e);
    var evt = createMouseEvent("click", e);
    iframe.dispatchEvent(evt);
  };
  var existingOnBlur = iframe.contentWindow.onblur;
  iframe.contentWindow.onblur = function () {
    if (existingOnBlur) existingOnBlur();
    var evt = new FocusEvent("blur", { bubbles: true });
    iframe.dispatchEvent(evt);
  };
}

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.action == 'removeListener') {
    unregisterListeners();
  }
  else if (msg.action == 'showKeyboardDiv') {
    showKeyboardDiv();
  }
  else if (msg.action == 'hideKeyboardDiv') {
    removeKeyboardDiv();
  }
});


// Used by processExtraCrop.
var extraCropObserver = null;

// Sends an object with keys top, right, bottom, left (all values integers)
// for extra cropping that should be applied to our extension. This is in the
// same coordinate values as window.innerWidth and window.innerHeight, and
// each value defaults to 0 if unset.
//
// The page can specify these values by adding any or all of the following data
// attributes to the first (or only) element with 'crankwheel-extra-crop-data'
// as one of its class values:
// - data-crankwheel-crop-top
// - data-crankwheel-crop-right
// - data-crankwheel-crop-bottom
// - data-crankwheel-crop-left
//
// This function is always invoked explicitly on content script load and on
// any resize event. Any explicit invocation will also register a MutationObserver
// if not registered previously, watching for changes to the attributes and
// firing the function when they change.
function processExtraCrop() {
  var sendExtraCrop = throttle(function (obj) {
    obj.type = "extraCrop";
    trySendMessage(obj);
  }, 50, this);

  var elements = document.getElementsByClassName('crankwheel-extra-crop-data');
  if (!elements.length) {
    sendExtraCrop({ top: 0, right: 0, bottom: 0, left: 0 });
    return;
  }

  var data = getExtraCropData(elements[0]);
  sendExtraCrop(data);

  if (!extraCropObserver) {
    extraCropObserver = new MutationObserver(function (mutations) {
      processExtraCrop();
    });
    extraCropObserver.observe(elements[0], {
      attributes: true,
      attributeFilter: [
        'data-crankwheel-crop-top',
        'data-crankwheel-crop-right',
        'data-crankwheel-crop-bottom',
        'data-crankwheel-crop-left'
      ]
    });
  }
}

function indicateScreenSharing(isScreenSharing) {
  var elements = document.getElementsByClassName('crankwheel-screen-sharing-indicator');
  if (!elements.length) {
    return;
  }
  var element = elements[0];
  if (!element.dataset) {
    return;  // Most elements will always have at least an empty dataset but not all.
  }
  element.dataset.crankwheelIsSharingThisTab = isScreenSharing;
}

// Returns an object with keys top, right, bottom, left (all
// values integers and defaulting to 0 for any unset values) based on
// data items on the given element.
//
// Values are retrieved from the element as per documentation
// for processExtraCrop.
function getExtraCropData(element) {
  function attrToNum(attr) {
    return attr ? parseInt(attr, 10) : 0;
  }

  var data = element.dataset || {};
  return {
    top: attrToNum(data.crankwheelCropTop),
    right: attrToNum(data.crankwheelCropRight),
    bottom: attrToNum(data.crankwheelCropBottom),
    left: attrToNum(data.crankwheelCropLeft)
  };
}

// Initial invocation, then register for resize events as well.
processExtraCrop();
window.addEventListener("resize", processExtraCrop);

// Belt and suspenders, as we've seen timing issues with one customers'
// use of this, where I guess they add the crop information only after
// we notify that we've started screen sharing - or maybe the mutation
// observer is not fully reliable on Firefox. We know that as soon as
// the window is resized, the problem resolves, so simply calling
// processExtraCrop from time to time should resolve the issue.

// First check in 100 ms, then 150 ms later and then every 250 ms.
var processExtraCropInterval = window.setInterval(processExtraCrop, 250);
window.setTimeout(function () {
  if (processExtraCropInterval) { processExtraCrop(); }
}, 100);

// Indicate that we are screen sharing the current tab, when the script gets
// initially executed. We will indicate that we are not, when uninstalled above.
indicateScreenSharing(true);
