// Copyright (C) 2022 CrankWheel ehf. All Rights Reserved.
//
// This file is part of the CrankWheel Screen Sharing browser extension,
// see https://crankwheel.com/ for details.
//
// Our extension requests the following privileges, for the following reasons:
//
// == desktopCapture and tabCapture ==
//
// Required to capture a video stream of your desktop, an application or browser
// tab, to enable screen sharing.
//
// == storage ==
//
// Required to store and retrieve local settings for the extension.
//
// == idle ==
//
// Used to detect when a sales agent may be away from their computer, which
// we use on the server side to inform prospects requesting an Instant Demo
// whether it's likely that there is an agent available to handle them
// right away, or not.
//
// == activeTab ==
//
// Required to implement richer tab sharing, remote control of tabs, the optional
// audit logging feature enabled by some of our enterprise customers, and
// APIs that let web pages know they are being screen shared and control aspects
// of the screen share (see c_script.js for more details).

// Load CRM config from storage (survives service worker unload)
var ssCrmConfig = {};

objStorageGet({crmConfig: {}}, function(result) {
  ssCrmConfig = result.crmConfig;
  console.log('Loaded CRM config from storage:', ssCrmConfig);
});

chrome.runtime.onMessageExternal.addListener(function (req, sender, callback) {
  if (req.cmd == 'extensionCheck') {
    // Our web app uses this to check if exists as it has well-defined semantics
    // when the extension in question does not exist.
    callback({exists: true, version: chrome.runtime.getManifest().version});
    return false;  // Don't need callback to be valid after we return.
  } else if (req.cmd == 'getLegacySettingsOnce') {
    chrome.storage.local.get({haveRetrievedLegacySettings: false, onboarding: '', settings: ''}, function (storage) {
      if (!storage.haveRetrievedLegacySettings) {
        chrome.storage.local.set({haveRetrievedLegacySettings: true}, function () {
          callback({onboarding: storage.onboarding, settings: storage.settings});
        });
      } else {
        callback({alreadyDone: true});
      }
    });
    return true;  // We are responding asynchronously.
  } else if (req.cmd == 'setServerUrl') {
    // Although an arbitrary URL can be set, message passing only works with the
    // sites listed in manifest.json, and it's pointless to set a different site.
    setServerUrl(req.url);
    return false;
  } else if (req.cmd == 'setCrmConfig') {
    setCrmConfig(req.config);
    return false;
  } else if (req.cmd == 'chromeIdleSetDetectionInterval') {
    chrome.idle.setDetectionInterval(req.interval);
    return false;
  } else if (req.cmd == 'setInstantDemosToken') {
    setInstantDemosToken(req.token);
    return false;
  } else if (req.cmd == 'clearInstantDemosToken') {
    clearInstantDemosToken();
    return false;
  } else if (req.cmd == 'showPopup') {
    showPopupCommand(sender.tab.id, req.shouldCloseCurrentTab, req.extraQueryParams);
  } else if (req.cmd == 'closeCurrentTab') {
    chrome.tabs.remove(sender.tab.id);
  } else if (req.cmd == 'closePopup') {
    // Added 2020-11-24 but there is no response expected, and no harm if this message gets
    // ignored, so the command is backwards compatible with older extensions, and does not
    // need to be versioned.
    closePopup();
  } else if (req.cmd == 'reloadExtension') {
    // Added 2022-06-01 but there is no response expected, and no harm if the message gets
    // ignored, so the command is backwards compatible and does not need to be versioned.
    chrome.runtime.reload();
  } else if (req.cmd == 'setReloadOnPopupClose') {
    // Added 2022-06-01 but there is no response expected, and no harm if the message gets
    // ignored, so the command is backwards compatible and does not need to be versioned.
    chrome.storage.local.set({reloadOnPopupClose: req.reloadOnPopupClose});
  } else if (req.cmd == 'getManifest') {
    // Added 2022-06-03. No response needed, no harm if ignored, so backwards compatible,
    // no need to version.
    callback(chrome.runtime.getManifest());
  } else if (req.cmd == 'createHostPerm' || req.cmd == 'hasHostPerm' || req.cmd == 'removeHostPerm') {
    // This is a backwards-compatibility thing that we can remove by say
    // November 2025 (we would then require that the req.host parameter is
    // always an array).
    let origins = req.host;
    if (!Array.isArray(req.host)) {
      origins = [ req.host ];
    }

    if (req.cmd == 'createHostPerm') {
      chrome.permissions.request({
        permissions: ['tabs'],
        origins: origins,
      }, (granted) => {
        callback(granted);
      });
    } else if (req.cmd == 'hasHostPerm') {
      chrome.permissions.contains({
        permissions: ['tabs'],
        origins: origins,
      }, result => {
        callback(result);
      });
    } else if (req.cmd == 'removeHostPerm') {
      chrome.permissions.remove({
        permissions: ['tabs'],
        origins: origins,
      }, removed => {
        callback(removed);
      });
    }
    return true; // The callback must be valid after we return
  }
  return false;  // Default: Don't need the callback to be valid after we return.
});

// Show a simple survey on uninstall.
chrome.runtime.setUninstallURL("https://crankwheel.com/uninstall/?ext_id=" + chrome.runtime.id);

chrome.runtime.onStartup.addListener(function () {
  removeAllTransientStorage();
});

chrome.runtime.onInstalled.addListener(function (object) {
  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ 'url': 'https://crankwheel.com/thanks-for-installing-fs/' });
  }
});

function ebgLaunchWorker(workerCommand, optCb) {
  var workerUrl = chrome.runtime.getURL("html/ext_worker.html");
  workerUrl += "?cmd=" + encodeURIComponent(JSON.stringify(workerCommand));

  chrome.windows.create({state: "minimized", url: workerUrl}, optCb);
}

function popupRemoved() {
  objStorageRemove('uiId');
  restoreBrowser(function () {
    cancelConfirmTab();
    chrome.storage.local.get({reloadOnPopupClose: false}, function (stg) {
      if (stg.reloadOnPopupClose === true) {
        // This is default off.
        //
        // When enabled this is intended to help work around / reduce incidence of
        // https://bugs.chromium.org/p/chromium/issues/detail?id=1316588
        // and
        // https://bugs.chromium.org/p/chromium/issues/detail?id=1271154
        chrome.runtime.reload();
      }
    });
  });
}

function restoreBrowser(cb) {
  objStorageGet({ orgBrowser: null }, function (val) {
    var org = val.orgBrowser;
    objStorageRemove('orgBrowser');
    if (org === null) return cb();
    chrome.windows.get(org.id, function (win) {
      // We could have an obsolete window ID.
      void chrome.runtime.lastError;

      // Restore the browser size and position if it has not been moved
      if (("left" in win && "width" in win && "top" in win && "height" in win) &&
        win.left == org.nLeft && win.width == org.nWidth &&
        win.top == org.nTop && win.height == org.nHeight) {
        if (org.state == 'fullscreen') {
          chrome.windows.update(win.id, {
            state: 'fullscreen'
          }, function (nwin) {
            chrome.windows.update(nwin.id, {
              state: 'fullscreen'
            }, cb);
          });
        } else {
          chrome.windows.update(win.id, {
            left: org.left,
            width: org.width
          }, function (win) {
            if (org.state == 'maximized') {
              chrome.windows.update(win.id, {
                state: 'maximized'
              }, cb);
            } else {
              cb();
            }
          });
        }
      } else {
        cb();
      }
    });
  });
}

chrome.windows.onRemoved.addListener(function (id) {
  objStorageGet({ uiId: null }, function (val) {
    var uiId = val.uiId;
    if (id == uiId) {
      popupRemoved();
    }
  });
});

function showCrankWheelPopup(tab, url, optCb) {
  getPopupUrl(function (popupUrl) {
    if (tab && tab.url) {
      let salesforceMatch = tab.url.match(/.+\.lightning\.force\.com\/.+\/(?<ObjectType>Lead|Contact|Account|Opportunity)\/(?<WhoId>[^\/]+).*/);
      if (salesforceMatch) {
        popupUrl = popupUrl + "&customer-ref=" + encodeURIComponent('/lightning/r/' + salesforceMatch.groups['ObjectType'] + '/' + salesforceMatch.groups['WhoId']);
      }

      let zohoMatch = tab.url.match(/^https\:\/\/crm\.zoho\.(com|eu|in|com\.au)\/.*\/tab\/(Contacts|Leads)\/(?<WhoId>[0-9]+)$/);
      if (zohoMatch) {
        popupUrl = popupUrl + "&customer-ref=" + encodeURIComponent('/crm/fakeorg/Contacts/' + zohoMatch.groups['WhoId']);
      }

      let highlevelContactId = extractHighLevelContactId(tab.url);
      if (highlevelContactId) {
        popupUrl = popupUrl + "&customer-ref=" + encodeURIComponent('/v2/location/fakeLocation/contacts/detail/' + highlevelContactId);
      }

      let hubspotMatch = tab.url.match(/^https\:\/\/[^\/]*\.?hubspot\.com\/contacts\/[0-9]+\/record\/[0-9]+-[0-9]+\/(?<WhoId>[0-9]+)([?#].*)?$/);
      if (hubspotMatch) {
        popupUrl = popupUrl + "&customer-ref=" + encodeURIComponent('/contacts/12345/record/0-1/' + hubspotMatch.groups['WhoId']);
      }

      let lessAnnoyingMatch = tab.url.match(/.*\/View_Contact\?.*ContactId=(?<WhoId>[0-9]+).*/);
      if (lessAnnoyingMatch) {
        popupUrl = popupUrl + "&customer-ref=" + encodeURIComponent(lessAnnoyingMatch.groups['WhoId']);
      }
    }

    objStorageGet({needConfirm: false, uiId: null}, function (val) {
      chrome.windows.getCurrent(function (currentWindow) {
        showCrankWheelPopupImpl(tab, url, optCb, popupUrl, val.needConfirm, val.uiId, currentWindow);
      });
    });
  });
}

function extractHighLevelContactId(url) {
  // Try dynamic pattern from server first (supports custom domains)
  if (ssCrmConfig && ssCrmConfig.highlevel_contact_id_pattern) {
    try {
      let match = url.match(new RegExp(ssCrmConfig.highlevel_contact_id_pattern));
      if (match && match.groups && match.groups.WhoId) {
        console.log('Extracted HighLevel contact ID using dynamic pattern:', match.groups.WhoId);
        return match.groups.WhoId;
      }
    } catch (ex) {
      console.warn('Invalid HighLevel contact ID pattern', ex);
    }
  }

  // Fallback to hardcoded patterns for GoHighLevel and Max Methodology
  let ghMatch = url.match(/^https\:\/\/app\.gohighlevel\.com\/v2\/location\/[A-Za-z0-9_-]+\/contacts\/detail\/(?<WhoId>[A-Za-z0-9_-]+)\??.*$/);
  if (ghMatch && ghMatch.groups && ghMatch.groups.WhoId) {
    console.log('Extracted HighLevel contact ID using GoHighLevel fallback pattern:', ghMatch.groups.WhoId);
    return ghMatch.groups.WhoId;
  }

  let mmMatch = url.match(/^https\:\/\/app\.maxmethodology\.com\/v2\/location\/[A-Za-z0-9_-]+\/contacts\/detail\/(?<WhoId>[A-Za-z0-9_-]+)\??.*$/);
  if (mmMatch && mmMatch.groups && mmMatch.groups.WhoId) {
    console.log('Extracted HighLevel contact ID using Max Methodology fallback pattern:', mmMatch.groups.WhoId);
    return mmMatch.groups.WhoId;
  }

  return null;
}

chrome.runtime.onMessage.addListener(function (msg, sender) {
  if (msg.type === 'cw_launch_with_customer_ref') {
    showCrankWheelPopup(sender.tab);
  }
});

chrome.action.onClicked.addListener(showCrankWheelPopup);

function ebgHandleKeyboardShortcut() {
  getNeedConfirm(function (needConfirm) {
    if (needConfirm) return;
    showCrankWheelPopup();
  })
}
chrome.commands.onCommand.addListener(ebgHandleKeyboardShortcut);

function showCrankWheelPopupImpl(tab, url, optCb, popupUrl, needConfirm, uiId, currentWindow) {
  if (needConfirm) {
    cancelConfirmTab();

    if (tab) {
      chrome.runtime.sendMessage({cmd: "doConfirmTab", tabId: tab.id, tabUrl: tab.url});
      if (optCb) optCb();
      return;
    }
  }

  var shouldReloadPage = !!url;
  if (!url) {
    url = popupUrl;
  }

  // We need to do the rest in a short-lived worker window, as
  // we need access to the 'screen' object which is not available
  // in a service worker context.
  ebgLaunchWorker({
    cmd: "workerShowCrankWheelPopup",
    url: url,
    uiId: uiId,
    currentWindow: currentWindow,
    shouldReloadPage: shouldReloadPage
  }, optCb);
}

function showPopupCommand(tabId, shouldCloseCurrentTab, extraQueryParams) {
  getPopupUrl(function (url) {
    if (extraQueryParams) {
      url = url + "&" + extraQueryParams;
    }

    isSessionOngoing(function (isOngoing) {
      if (isOngoing) {
        // Session ongoing, so the popup is already open, and we don't want to navigate.
        url = null;
      }

      showCrankWheelPopup(null, url, function () {
        if (shouldCloseCurrentTab) {
          chrome.tabs.remove(tabId);
        }
      });
    });
  });
}

function closePopup() {
  objStorageGet({ uiId: null }, function (val) {
    var uiId = val.uiId;
    if (uiId) {
      chrome.windows.remove(uiId);
    }
  });
}

function isSessionOngoing(callback) {
  chrome.runtime.sendMessage({"cmd": "isSessionOngoing"}, function (response) {
    void chrome.runtime.lastError;  // 'response' will be undefined if no responders
    callback(response === true);
  });
}
