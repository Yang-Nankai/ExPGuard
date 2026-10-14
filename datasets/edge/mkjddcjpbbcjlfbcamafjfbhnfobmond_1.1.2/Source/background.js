/*
Main Event Page - The event page is loaded when it is "needed", and unloaded when it goes idle again.
https://developer.chrome.com/extensions/event_pages#lifetime
*/

importScripts('config.js');

var requiredHostPermissions = {
  origins: ["https://*.wishlistr.com/"]
};

if (!chrome.storage.sync) { // Opera does not support sync
  chrome.storage.sync = chrome.storage.local;
}

function _config() {
  return config;
}

function installURL() {
  return _config().apiProtocol + _config().apiHost + '/tools/extension/' + _config().browser + '/installed/';
}

function getCurrentTab(callback) {
  var queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions, function(tabs) {
    callback(tabs[0]);
  });
}

function executeScript(files, callback) {
  getCurrentTab(function(tab) {
    if (!tab.url || tab.url.startsWith("chrome://")) {
      return callback ? callback() : undefined;
    }

    chrome.scripting.executeScript({
      target : {tabId: tab.id},
      files: files,
    })
    .then(function() { if (callback) { callback(); } });
  });
}

function injectCode(func, args) {
  getCurrentTab(function(tab) {
    chrome.scripting.executeScript({
      target : {tabId: tab.id},
      func: func,
      args: args,
    });
  });
}

function insertCSS(files, callback) {
  getCurrentTab(function(tab) {
    chrome.scripting.insertCSS({
      files: files,
      target: {tabId: tab.id}
    }).then(function() { if (callback) { callback(); } });
  });
}

// XHR Request handlers
function setRequestHeader(headers, header, value) {
  if (header && value) {
    headers.append(header, value);
  }
}
function doRequest(type, data, successCallback, failureCallback) {

  getAccountData(function(settings) {
    if (data) {
      data = Object.keys(data).map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
      }).join('&');
    }

    var url = _config().apiProtocol + _config().apiHost + '/api/extensions/'+_config().browser+'/'+type+'.json';

    var headers = new Headers();
    setRequestHeader(headers, 'Content-Type', 'application/x-www-form-urlencoded');
    setRequestHeader(headers, 'X-Wishlistr-ID', settings.id);
    setRequestHeader(headers, 'X-Wishlistr-Auth', settings.auth);
    setRequestHeader(headers, 'X-Wishlistr-API-Key', _config().apiKey);

    fetch(url, { method: 'POST', headers: headers, body: data ? data : ''})
      .then(function(response) {
        if (!response.ok) {
          var error = new Error('HTTP error! Status: ' + response.status);
          error.status = response.status;
          throw error;
        }
        return response.json();
      })
      .then(function(data) {
        if (data && data.result && successCallback) {
          successCallback(data.result);
        } else if (failureCallback) {
          failureCallback(data.status);
        }
      })
      .catch(function(error) {
        console.error('Fetch Error:', error);
        if (failureCallback) {
          failureCallback(error.status);
        }
      });
  });
}

// Add item to Wishlistr
function addItem (info, tab) {
  info.url = tab.url;

  doRequest('item', info,
    function onSuccess() {
      chrome.tabs.sendMessage(tab.id, {action: 'item-added'});
    },
    function onFailure(httpErrorCode) {
      if (httpErrorCode === 401 ) {
        showLogin();
      } else {
        chrome.tabs.sendMessage(tab.id, {action: 'failure'});
      }
    }
  );
}

// Make auth call
function authenticate (successCallback, failureCallback) {
  doRequest('auth', null,
    function onSuccess(data) {
      if (data.username && data.id && data.auth) {
        setAccountData(data, successCallback);
      } else if (failureCallback) {
        failureCallback();
      }
    },
    function onFailure() {
      if (failureCallback) {
        failureCallback();
      }
    }
  );
}


// Set/Get/Update user data in storage
function setAccountData (data, callback) {
  var storageData = {accounts: [data], currentAccount: 0};
  chrome.storage.sync.set(storageData, function() {
    if (callback) {
      callback();
    }
  });
}

function getAccountData (callback) {
  chrome.storage.sync.get(null, function(accountData) {
    callback(accountData.accounts && accountData.accounts[0] || {});
  });
}

function updateAccountData(data) {
  getAccountData(function (currentAccount) {
    if (data.tags !== undefined) {
      currentAccount.tags = !!data.tags;
    }
    setAccountData(currentAccount);
  });
}


// Authentication
function showLogin (notitle) {
  executeScript(['url.js'], function() {
    var authURL = _config().apiProtocol + _config().apiHost + '/tools/bookmarklet/auth.php?type=extension';
    authURL += notitle ? '&notitle=1' : '';
    chrome.tabs.update(null, {url: authURL});
  });
}

function saveAuthCallbackURL (url) {
  chrome.storage.sync.set({authcallback: url});
}

function getAuthCallbackURL (callback) {
  chrome.storage.sync.get({authcallback: null}, function(data) {
    callback(data);
  });
}

function authFinished (message) {
  getAuthCallbackURL(function(data) {
    var done = function() {
      saveAuthCallbackURL(null);
      if (message) {
        injectCode(function(msg) { alert(msg); }, [message]);
        alert(message);
      }
    };

    if (data.authcallback) {
      chrome.tabs.update(null, {url: data.authcallback}, done);
    } else {
      chrome.tabs.query({active: true}, function(tabs) {
        chrome.runtime.openOptionsPage(function() {
          if (tabs && tabs[0] && tabs[0].id) {
            chrome.tabs.remove(tabs[0].id);
          }
          done();
        });
      });
    }
  });
}

function authFailure () {
  authFinished("Sorry! Authentication failed. Please try again!");
}


// Called when the user clicks on the extensions action icon.
// Injects the content script into the current page.
chrome.action.onClicked.addListener(function (tab) {
  if (tab.url.indexOf("http:") === 0 || tab.url.indexOf("https:") === 0) {
    chrome.permissions.request(requiredHostPermissions).then(function(hasRequiredHostPermissions) {
      if (hasRequiredHostPermissions) {
        //chrome.storage.sync.clear();
        getAccountData(function(settings) {
          if ((settings.username && settings.id && settings.auth) || _config().devNoAuth) {
            insertCSS(['/styles/bookmarklet.css', '/styles/icon.css', '/styles/font.css'], function() {
              injectCode(function(setting) {
                wishr_settings={tags: setting};
              }, [!!settings.tags]);
              executeScript(['bookmarklet.js']);
            });
          } else {
            showLogin();
          }
        });
      }
    });
  }
});

// Listener for content-script communication
chrome.runtime.onConnect.addListener(function (port) {
  var tab = port.sender.tab;

  port.onMessage.addListener(function (message) {
    if (message.type === 'add') {
      addItem(message.data, tab);
    }
    if (message.type === 'auth') {
      authenticate(authFinished, authFailure);
    }
    if (message.type === 'settings-change') {
      // NOTE: If we support multiple accounts, this needs to pass username
      updateAccountData(message);
    }
    if (message.type === 'current-url') {
      saveAuthCallbackURL(message.url);
    }
    if (message.type === 'install') {
      getAccountData(function(settings) {
        port.postMessage({ permission: true, authenticated: !!settings.auth });
        if (!settings.auth) { saveAuthCallbackURL(installURL()); }
      });
    }
  });
});

//  Listener for internal extension communication (options page)
chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === 'auth') {
    saveAuthCallbackURL(null);
    showLogin(true);
  }
  if (message.type === 'set-userdata') {
    setAccountData(message.data);
  }
});

// Listener for installation.
if (chrome.runtime.onInstalled) {
  chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
      // chrome.storage.sync.clear();
      chrome.tabs.create({ url: installURL() }, function (tab) {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, updatedTab) {
          if (tabId === tab.id && changeInfo.status === 'complete' && updatedTab.url === installURL()) {
            authenticate(); // Try authenticate when install complete page has loaded
          }
        });
      });
    }
  });
}

// TODO: Add unistall logic to clear up db content.
