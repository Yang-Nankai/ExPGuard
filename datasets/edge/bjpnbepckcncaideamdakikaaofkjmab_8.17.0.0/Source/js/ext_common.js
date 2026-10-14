// Copyright (C) 2022 CrankWheel ehf. All Rights Reserved.
//
// This file is part of the CrankWheel Screen Sharing browser extension,
// see https://crankwheel.com/ for details.

function getServerUrl(callback) {
  objStorageGet({serverUrl: null}, function (val) {
    var value = val.serverUrl;
    if (value) {
      callback(value);
    } else {
      if (chrome.runtime.id == 'klbhnajndhaoadcnjhodkdplkcfehiia' || chrome.runtime.id == 'gebjopojipeanednoamlckcdldamjecb') {
        callback('https://cwstaging.org');
      } else {
        callback('https://meeting.is');
      }
    }
  });
}

function setServerUrl(url) {
  objStorageSet({'serverUrl': url});
}

function setCrmConfig(config) {
  ssCrmConfig = config;
  objStorageSet({'crmConfig': config});
}

function getCrmConfig(callback) {
  objStorageGet({crmConfig: {}}, function(result) {
    callback(result.crmConfig);
  });
}

function getPopupUrl(callback) {
  var query = '?ext_id=' + chrome.runtime.id;
  getServerUrl(function (url) {
    callback(url + '/ss/zeroauth/login' + query);
  });
}

function removeAllTransientStorage() {
  // Remove all localStorage state except that which persists through restarts.
  objStorageGet({serverUrl: null, instantDemosToken: null}, function (nonTransient) {
    chrome.storage.local.clear();
    objStorageSet(nonTransient);
  });
}

function objStorageGet(keyObj, callback) {
  chrome.storage.local.get(keyObj, callback);
}

function objStorageSet(keyVals) {
  chrome.storage.local.set(keyVals);
}

function objStorageRemove(key) {
  chrome.storage.local.remove(key);
}

function setNeedConfirm(val) {
  objStorageSet({needConfirm: val});
}

function getNeedConfirm(callback) {
  objStorageGet({needConfirm: false}, function (val) {
    callback(val.needConfirm);
  })
}

function cancelConfirmTab() {
  setNeedConfirm(false);
  chrome.action.setTitle({title: chrome.i18n.getMessage('defaultBrowserActionMessage')});
  chrome.action.setIcon({
    path: chrome.runtime.getURL("img/cwicon19.png")
  });
}
