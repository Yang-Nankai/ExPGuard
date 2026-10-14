// Copyright (C) 2022 CrankWheel ehf. All Rights Reserved.
//
// This file is part of the CrankWheel Screen Sharing browser extension,
// see https://crankwheel.com/ for details.
//
// The worker page is launched by the background worker as a minimized
// window, for tasks that need access to a "full fledged" JavaScript environment
// but can't be moved to the popup.
//
// It does its job and then removes itself quick as possible.

// Our search starts with ?cmd= and we want the bit after that.
var commandFromUrl = window.location.search.substring(5);

function ewDoWork(command) {
  obj = JSON.parse(decodeURIComponent(command));
  console.log(obj);
  if (obj.cmd == "workerShowCrankWheelPopup") {
    ewShowCrankWheelPopup(obj.url, obj.uiId, obj.currentWindow, obj.shouldReloadPage, ewDisappear);
  } else {
    ewDisappear();
  }
}
ewDoWork(commandFromUrl);

function ewDisappear() {
  chrome.windows.getCurrent(function (window) {
    chrome.windows.remove(window.id);
  });
}

function ewShowCrankWheelPopup(url, uiId, win, shouldReloadPage, optCb) {
  function showNew(optCb) {
    ewResizeBrowser(win, function (popWidth) {
      ewCreatePopup(popWidth, url, optCb);
    });
  }

  if (uiId === null) {
    showNew(optCb);
  } else {
    chrome.windows.get(uiId, null, function (uiWin) {
      void chrome.runtime.lastError;
      if (uiWin) {
        if (shouldReloadPage) {
          chrome.windows.remove(uiId, function () {
            showNew(optCb);
          });
        } else {
          ewResizeBrowser(win, function () {
            chrome.windows.update(uiId, { focused: true }, optCb);
          });
        }
      } else {
        showNew(optCb);
      }
    });
  }
}

function ewResizeFullscreen(win, callback) {
  // When the chrome window is fullscreen on OSX
  // we need to update it 2 times, as the first time
  // will set the window to presentation mode
  chrome.windows.update(win.id, {
    state: 'normal'
  }, function (nwin) {
    chrome.windows.update(win.id, {
      state: 'normal'
    }, function (nwin) {
      setTimeout(ewResizeBrowser, 500, nwin, callback, 'fullscreen');
    });
  });
}

function ewResizeBrowser(win, callback, fstate) {
  objStorageGet({ uiId: null }, function (val) {
    var uiId = val.uiId;
    // Never resize the UI window
    if (win.id == uiId) {
      callback();
      return;
    }
    // Only resize if the browser window seems to be on the same screen
    // as the screen object we got.
    var popWidth = Math.ceil(screen.availHeight * 0.33);
    if (win.left < (screen.availLeft - 150) || win.left > screen.availLeft + screen.availWidth + 150 ||
      win.top < screen.availTop - 150 || win.top > screen.availTop + screen.availHeight + 150) {
      callback(popWidth);
      return;
    }
    var nWidth, nLeft, nHeight = null, nTop = null;
    if (win.state == "fullscreen") {
      ewResizeFullscreen(win, callback);
    } else {
      popWidth = Math.ceil(screen.availHeight * 0.33);
      // If the browser window is in the way we move it
      var overflow = (win.left - screen.availLeft) + win.width - (screen.availWidth - popWidth);
      if (overflow > 0) {
        var leftSpace = (win.left - screen.availLeft) - overflow;
        nLeft = leftSpace < 0 ? 0 : leftSpace;
        nWidth = win.width + (leftSpace > 0 ? 0 : leftSpace);
        chrome.windows.update(win.id, {
          left: screen.availLeft + nLeft,
          width: nWidth,
          state: "normal"
        }, function (nwin) {
          objStorageSet({
            orgBrowser: {
              state: fstate || win.state,
              id: win.id,
              width: win.width,
              left: win.left,
              nWidth: nwin.width,
              nLeft: nwin.left,
              nHeight: nwin.height,
              nTop: nwin.top
            }
          });
          callback(popWidth);
        });
      } else callback(popWidth);
    }
  });
}

function ewCreatePopup(popWidth, url, optCb, optLeft) {
  let left = (optLeft === undefined) ? (screen.availLeft + screen.availWidth - popWidth) : optLeft;
  let top = (optLeft === undefined) ? screen.availTop : 0;
  left = left | 0;
  top = top | 0;
  popWidth = popWidth | 0;
  let popHeight = screen.availHeight | 0;
  chrome.windows.create({
    url: url,
    type: 'popup',
    width: popWidth,
    height: popHeight,
    left: left,
    top: top
  }, function (pop) {
    if (pop) {
      objStorageSet({ uiId: pop.id });
      if (optCb) {
        optCb();
      }
    } else {
      // We haven't seen this with our MV3 code, but in MV2 we would sometimes
      // get out-of-bounds errors when there was a mismatch between the screen
      // we thought we were getting and the one we actually got. We are keeping
      // the same belt-and-suspenders code here as we had there; if we get an
      // error creating the window, we try again at (0,0) and if we still get
      // an error after that, we show an error page with a video explaining how
      // to reload the extension, which should get us back to the right state.
      console.log(chrome.runtime.lastError);
      void chrome.runtime.lastError;
      if (optLeft === undefined) {
        console.log("We don't seem to have the right screen size; showing top-left of main screen.");
        ewCreatePopup(popWidth, url, optCb, 0);
      } else {
        console.log("Still failed when showing top-left of main screen");
        window.open('https://crankwheel.com/failed-to-open-popup/', '_blank');
      }
    }
  });
}
