// Copyright (C) 2022 CrankWheel ehf. All Rights Reserved.
//
// This file is part of the CrankWheel Screen Sharing browser extension,
// see https://crankwheel.com/ for details.
//
// The token for Instant Demos is stored by the CrankWheel web-app when a user who has
// Instant Demos enabled starts up the app. Conversely, if a user who does not have
// Instant Demos enabled starts up the app, the token is cleared. Therefore, the
// idle detection and submitting events for activeness/idleness to the CrankWheel
// server is only enabled for users who need it.
//
// Knowledge of the user's idle state is required for Instant Demos to determine how
// many agents appear to be available to respond to demo requests, as behavior and
// messaging changes depending on whether there is a majority, a minority, or none
// of the configured agents available to handle a prospect's request for a phonecall.

function getInstantDemosToken(callback) {
  objStorageGet({'instantDemosToken': null}, function (val) {
    callback(val.instantDemosToken);
  });
}

function setInstantDemosToken(token) {
  objStorageSet({instantDemosToken: token});
}

function clearInstantDemosToken() {
  objStorageRemove('instantDemosToken');
}

function internalApiCall(uri, params, callback) {
  getServerUrl(function (serverUrl) {
    var url = serverUrl + uri + '?' + new URLSearchParams(params).toString();
    fetch(url, {
      method: 'POST',
      body: ''
    })
    .then(function (returnedValue) {
      if (callback) {
        callback(returnedValue);
      }
    })
    .catch(function (err) {
      console.log(err);
    })
  });
}

function reportIdleStateForUser(state) {
  getInstantDemosToken(function (token) {
    if (!token) return;
    var isActive = (state == "active");
    internalApiCall("/ss/internal/indicate_agent_availability", {active: isActive, token: token}, function (result) {
      result.text().then(function (text) {
        if (text == "\"invalid_token\"") {
          // Avoid unnecessary traffic.
          clearInstantDemosToken();
        }
      });
    });
  });
}

chrome.idle.onStateChanged.addListener(function (state) {
  // We broadcast the message to all open ext_popup guys, as with an open pop-up it is
  // handled especially if Instant Demos are enabled.
  chrome.runtime.sendMessage({cmd: 'chromeIdleOnStateChanged', state: state});

  // We always report it directly to the server as well; the two mechanisms
  // are mostly independent.
  reportIdleStateForUser(state);
});

// By default we use a 10-minute interval
chrome.idle.setDetectionInterval(10 * 60);

// Do an initial check when our extension is loaded
chrome.idle.queryState(10 * 60, function (state) {
  reportIdleStateForUser(state);
});

