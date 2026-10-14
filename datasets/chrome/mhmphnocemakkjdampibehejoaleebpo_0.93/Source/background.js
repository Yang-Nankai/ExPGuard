'use strict';
//import { syncdata.get, syncdata.set, fromEntries } from scripts/lib.js :: included via manifest.json.
//No longer included since manifestv3, so inlined.



function readSortedArrayLossy(keys, cb) {
    var response = {};
    chrome.storage.local.get(keys, function (packedLocalData) {
        chrome.storage.sync.get(keys, function (packedSyncData) {
            if (keys.length > 0 &&
                keys.every(function (key) {
                    return (packedLocalData.hasOwnProperty(key) &&
                        packedSyncData.hasOwnProperty(key));
                })) {
                keys.forEach(function (key) {
                    var localData = packedLocalData[key];
                    var syncData = packedSyncData[key];
                    var localRawData = (localData && localData.data) ? localData.data : undefined;
                    var localTs = (localData && localData.ts) ? localData.ts : 0;
                    var syncTs = (syncData && syncData.ts) ? syncData.ts : 0;
                    if (syncData && syncTs > localTs) {
                        response[key] = syncData.data;
                    }
                    else {
                        response[key] = localData.data;
                    }
                });
                cb(response);
            }
            else {
                cb(new Error("The data being requested does not exist.\nData: " + JSON.stringify(keys)));
            }
        });
    });
}
function writeSortedArrayLossy(data, cb) {
    var value = undefined;
    Object.keys(data).forEach(function (key) {
        if (Array.isArray(data[key]) == false) {
            throw new Error("The data given to writeSortedArrayLossy was not of type array.");
        }
        else {
            var wrappeddata = {};
            wrappeddata[key] = {
                ts: new Date().getTime(),
                data: data[key]
            };
            chrome.storage.local.set(wrappeddata, function () {
                wrappeddata[key].data = trimByteSize(wrappeddata[key].data);
                chrome.storage.sync.set(wrappeddata, function () {
                    if (cb)
                        cb();
                });
            });
        }
    });
}
var lib = {
  fromEntries: function( arrayOfProperties ) {
    var object = {};
    arrayOfProperties.forEach(function( element ) {
        Object.keys( element ).forEach(function( key ) {
            object[key] = element[key];
        });
    });
    return object;
  },
  entries: function( Input ) {
    var array = [];
    Object.keys( Input ).forEach(function( key ) {
        var object = {};
        object[key] = Input[key];
        array.push(object);
    });
    return array;
  },
  syncdata: {
    get: readSortedArrayLossy,
    set: writeSortedArrayLossy
  }
};

const MAXSIZE = 8000;
function getByteSize(data) {
    return JSON.stringify(data).length;
}
function trimByteSize(data) {
    var copy = data.slice(0);
    var bytesize = getByteSize(copy);
    while (bytesize > MAXSIZE) {
        var item = copy[copy.length - 1];
        bytesize -= getByteSize(item) + 1;
        copy.splice(copy.length - 1, 1);
    }
    return copy;
}

//END OF LIB INLINED IMPORTS

//var cdnBaseUrl = "https://cdn.getsupernova.com";
var getsupernovaurl = "https://getsupernova.com"; //Production
//var getsupernovaurl = "http://getsupernova.datasvc.dev.bioniclogic.com:8081"; //Development

const OFFSCREEN_DOCUMENT_PATH = "pages/offscreen.html"

function log(msg) {
  console.log("Supernova Extension - background - " + msg);
}

var lastPingedSuperStarterMs = Date.now() - MAXPINGRATE * 2;
var MAXPINGRATE = 5000;

var lastRanSuperStarterMs = Date.now() - MAXRUNRATE * 2;
var MAXRUNRATE = 3500;


let defaultpoolid = 0;

function sendOffscreenMessage( type, data ) {  
  chrome.runtime.sendMessage({
    type: type,
    target: 'offscreen',
    data: data
  });
}

//replacing $.get / $.post no longer available to background worker.
async function get(url, cb) {
  var r = await fetch(url);
  if(r.ok && r.status == 200 && cb) {
    cb(r.json())
  }
}
async function post(url, data, cb) {
  var r = await fetch({method:"POST",body:JSON.stringify(data)});
  if(r.ok && r.status == 200 && cb) {
    cb(r.json())
  }
}


async function persistGamerStatus() {
  chrome.storage.sync.get([ "partnerid", "gamerguid" ], function( response ) {
    post( getsupernovaurl + "/www/jsbin/gamerstatus", { 
      "data": { 
        i: response.gamerguid, 
        lc: { pi: response.partnerid, ts: new Date(), url: "" }
      } 
    });
  });
}

async function checkGamerStatus() {
  get(getsupernovaurl + "/www/jsbin/gamerstatus", function( response ) {
    if ( response.data == false ) {
      persistGamerStatus();
    }
  });
}

function checkExtensionStatus(cb) {
  chrome.storage.local.get(["superstarter"], function (result) {
    if (result != null && typeof (result) == 'object') {
      var superStarterInfo = result["superstarter"]? result["superstarter"]: {};
      var installed = (superStarterInfo && typeof (superStarterInfo) === 'object' && superStarterInfo.installed);

      sendOffscreenMessage("postmessage",{ command: "superstarterstatus", data: { installed: installed } });

      if (cb) cb({
        extension: true,
        superstarter: superStarterInfo.installed ? true:false
      });
    }
  });
}

function launchSuperStarter(play) {
  if (lastRanSuperStarterMs > Date.now() - MAXRUNRATE) {
    return;
  }
  lastRanSuperStarterMs = Date.now();

  chrome.runtime.sendNativeMessage('com.tacticstechnology.superstarter',
    { text: play },
    function (response) {
      if (response == null) {
        log("Superstarter failed to launch - running check on status");
        checkSuperStarterStatus();
      } else {
        log("Received " + JSON.stringify(response));
      }
    });
}


function checkSuperStarterStatus(cb) {
  if (lastPingedSuperStarterMs > Date.now() - MAXPINGRATE) {
    if(cb) { cb(null); }
    return;
  }
  lastPingedSuperStarterMs = Date.now();

  chrome.runtime.sendNativeMessage('com.tacticstechnology.superstarter',
    { text: "ping" },
    function (r) {
      var storageObj = {};
      if (r) {        
        sendOffscreenMessage("postmessage",{ command: "superstarterstatus", data: { installed: true } });
        storageObj["superstarter"] = { installed: true };
      } else {        
        sendOffscreenMessage("postmessage",{ command: "superstarterstatus", data: { installed: false } });
        storageObj["superstarter"] = { installed: false };
      }
      chrome.storage.local.set(storageObj, function () { });
      if (cb) cb(r);
    }
  );
}

async function hasOffscreenDocument() {
  const matchedClients = await clients.matchAll();
  for (const client of matchedClients) {
    if (client.url.endsWith(OFFSCREEN_DOCUMENT_PATH)) {
      return true;
    }
  }
  return false;
}

async function setupMessageFrame() {
  if(hasOffscreenDocument()) return true;

  await chrome.offscreen.createDocument({
    url: chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH),
    reasons: [chrome.offscreen.Reason.IFRAME_SCRIPTING],
    justification: 'Send Messages to IFRAME via Postmessage API for website status localstorage.',
  });

  checkSuperStarterStatus(null);  

  return true;
}

function isValidTab(tab) {
  if (tab == null) return false;
  var url = new URL(tab.url);
  if (url.protocol == "https:" || url.protocol == "http:") {
    return true;
  }
  return false;
}


function enableFlashForTab(tab) {
  if (!isValidTab(tab)) return;
  var url = new URL(tab.url);
  chrome.contentSettings.plugins.getResourceIdentifiers(function (resourceIdentifiers) {
    let flash = getFlashResourceID(resourceIdentifiers);
    if (flash != null && (url.protocol == "http:" || url.protocol == "https:")) {
      allowPluginForProtoHost(flash, url.protocol, url.hostname, 'allow')
    }
  });
}


function disableFlashForTab(tab) {
  if (!isValidTab(tab)) return;
  var url = new URL(tab.url);
  chrome.contentSettings.plugins.getResourceIdentifiers(function (resourceIdentifiers) {
    let flash = getFlashResourceID(resourceIdentifiers);
    if (flash != null && (url.protocol == "http:" || url.protocol == "https:")) {
      allowPluginForProtoHost(flash, url.protocol, url.hostname, 'block')
    }
  });
}

function getFlashStatusForTab(tab, cb) {
  if (!isValidTab(tab)) return;
  var url = new URL(tab.url);
  chrome.contentSettings.plugins.getResourceIdentifiers(function (resourceIdentifiers) {
    let flash = getFlashResourceID(resourceIdentifiers);
    if (flash != null && (url.protocol == "http:" || url.protocol == "https:")) {
      chrome.contentSettings.plugins.get(
        {
          primaryUrl: url.protocol + "//" + url.host + "/*",
          resourceIdentifier: flash
        },
        function (res) {
          cb(res)
        }
      )
    }
  });
}

async function isKnown_ioSite( site ) {
  let response = await fetch( getsupernovaurl + "/update/iogames.json" );
  let iogames = await response.json();
  
  var gameName = new RegExp( site, "i" );
  
  return iogames.every(function( game ) {
    return gameName.test( game["SITE NAME"] ) == false;
  }) == false;
  
}

async function postUsage( data ) {
  post(getsupernovaurl + "/www/jsbin/usage", {
    data: data
  });
}

async function waitToNotify( data ) {
  function listenForUpdate( tabId, object, info ) {
    if ( object.status == "complete" ) {
      chrome.tabs.sendMessage(tabId, { data: "notify", body: data });
      chrome.tabs.onUpdated.removeListener( listenForUpdate );
    }
  }
    chrome.tabs.onUpdated.addListener( listenForUpdate );
}



function incrementPlayCount( Input ) {
  if ( Input.gameInfo.sponsored == undefined ) {
    lib.syncdata.get(["playedgames"], function( response ) {
      if (
        response instanceof Error &&
        response.message == 'The data being requested does not exist.\nData: ["playedgames"]'
      ) {
        lib.syncdata.set({ "playedgames": [] });
        throw new Error("Trying to increment the playcount of a game when playedgames does not exist.");
      } else {
        let playedgames = lib.fromEntries( response.playedgames );
        if ( Input.type == "extension" ) {
          function listenForPageLoad( tabId, object, info ) {
            if ( object.status == "complete" ) {
              chrome.tabs.sendMessage(tabId, { data: "postGamePlayUsage" });
              chrome.tabs.onUpdated.removeListener( listenForPageLoad );
            }
          }

          chrome.tabs.onUpdated.addListener( listenForPageLoad );
        } else {
          chrome.tabs.query({ active: true, currentWindow: true }, function( tabs ) {
            chrome.tabs.sendMessage(tabs[0].id, { data: "postGamePlayUsage" });
          })
          
        }
        
        playedgames[Input.gameInfo.url].lastplaydate = new Date().getTime();
        playedgames[Input.gameInfo.url].playcount++;
        lib.syncdata.set({ playedgames: lib.entries(playedgames) });
      }
    });
  }
}

function setBadgeNotification( text ) {
  chrome.action.setBadgeText({ text: text });
}


function clearBadgeNotification() {
  setBadgeNotification("");
}

function incrementBadgeNotification() {
  var self = this;
  chrome.action.getBadgeText({}, function( badgeText ) {
      if ( badgeText == "" ) {
          badgeText = "1";
      } else {
          var notificationCount = parseInt( badgeText );
          notificationCount++;
          badgeText = notificationCount.toString();
      }

      setBadgeNotification( badgeText );
  });
}

function badgeNotification( Input ) {
  switch( Input.type ) {
    case "set":
      setBadgeNotification( Input.text );
      break;
    case "clear":
      clearBadgeNotification();
      break;
    case "increment": 
      incrementBadgeNotification();
      break;
  }
};

function renderNotification( data ) {
  var pageCount = 0;
  function listenForUpdate( tabId, object, info ) {
    if ( 
      object.status == "loading" 
    ) {
      pageCount++;
    } else if ( 
      object.status == "complete" && 
      pageCount == 2
    ) {
      chrome.tabs.sendMessage(tabId, { data: "notify", body: data });
      chrome.tabs.onUpdated.removeListener( listenForUpdate );
    }
  }
    chrome.tabs.onUpdated.addListener( listenForUpdate );
}

function openSettings() {
  chrome.tabs.create({ url: chrome.runtime.getURL("pages/settings.html") });
}

var potentialGames = {
  hostname: undefined,
  onUpdated: undefined,
  games: {
    push: function( value ) {
      var self = this;
      if ( Array.isArray( value ) == false ) {
        throw new Error("The input to the queue should be an array.");
      } else if ( value.length > 2 ) {
        throw new Error("The maximum length of the input array is greater than two.");
      } else if ( value.length == 0 ) {
        self.queue = [];
      } else if ( 
        value.length == 1 &&
        self.queue.length < 2
      ) {
        self.length++;
        self.queue.push( value.pop() );
      } else if (
        value.length == 1 &&
        self.queue.length == 2
      ) {
        self.queue.shift();
        self.queue.push( value.pop() );
      } else if ( value.length == 2 ) {
        self.queue = value;
      } else {
        throw new Error("An unknown potentialGames.games error occurred.")
      }
    },
    length: 0,
    queue: []
  }
};

function saveGameContender( data ) {
  chrome.tabs.onUpdated.removeListener(potentialGames.onUpdate);
    potentialGames.games.push( data.games );
    potentialGames = {
      hostname: data.hostname,
      onUpdate: function(tabid, changeinfo, tab) {
        if ( changeinfo.status == "loading" ) {
          chrome.tabs.query({ active: true, currentWindow: true }, function( tabs ) {
            
            if ( isValidTab( tabs[0] )) {
              //Given the url, generate the hostname.
              var hostname = new RegExp(/^([a-zA-Z]+:\/\/)?([a-zA-Z]*\.)?([0-9a-zA-Z\.\-]+):?[0-9]*(\.[a-zA-Z]+)\/?.*$/).exec( tabs[0].url ).slice(2).join("");  

              if( potentialGames.hostname == hostname ) {
                chrome.tabs.sendMessage(tabs[0].id, {data:"checkforgame", body: potentialGames.games.queue });
                chrome.tabs.onUpdated.removeListener(potentialGames.onUpdate);
              }
            }
          });
        }
      },
      games: potentialGames.games
    };

    chrome.tabs.onUpdated.addListener(potentialGames.onUpdate);
}

function reloadTab( tabId ) {
  chrome.tabs.duplicate( tabId, function() {
    chrome.tabs.remove( tabId );
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  checkSuperStarterStatus(null);

  switch (message.command) {
    case "getextensionstatus":
      checkExtensionStatus(function (r) {
        sendResponse(r);
      });
      return true; //async sendResponse.
    case "superstarter":
      if (message.data) {
        sendResponse("superstarter - launched");
        launchSuperStarter(message.data);
        //runZoneTag();
      }
      break;
    case "getFlashStatus":
      if (sender.url) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
          if (tabs.length > 0 && isValidTab(tabs[0])) {
            getFlashStatusForTab(tabs[0], function (res) {
              sendResponse(res);
            })
          } else {
            sendResponse({});
          }
        });
        return true;
      }
      sendResponse({});
      break;
    case "saveGameContender":
      saveGameContender( message.data );
      break;
    case "isKnown_ioSite":
      isKnown_ioSite( message.data ).then(sendResponse);
      break;
    case "checkGamerStatus": 
      checkGamerStatus();
      break;
    case "waitToNotify":
      waitToNotify( message.data );
      break;
    case "postUsage":
      postUsage( message.data );
      break;
    case "incrementPlayCount":
      incrementPlayCount( message.data );
      break;
    case "badgeNotification":       
      badgeNotification( message.data )
      break;
    case "renderNotification": 
      renderNotification( message.data );
      break;
    case "openSettings": 
      openSettings();
      break;
    case "reloadTab": 
      reloadTab( message.data );
      break;
  }
  return true;
});

async function clearNewGames() {
  lib.syncdata.get(["playedgames"], function( response ) {
    if (
      response instanceof Error &&
      response.message == 'The data being requested does not exist.\nData: ["playedgames"]'
    ) {
      lib.syncdata.set({ "playedgames": [] });
      throw new Error("Trying to clear new games when playedgames does not exist.");
    } else {
      let game = undefined;
      if ( response.playedgames ) {
        response.playedgames = lib.fromEntries( response.playedgames );
        for (let key of Object.keys( response.playedgames )) {
            game = response.playedgames[key];
            delete game.new;
        }
        lib.syncdata.set({"playedgames": lib.entries( response.playedgames )});
      }
    }
  });
}

chrome.runtime.onConnect.addListener(function( port ) {
  port.onDisconnect.addListener(function() {
    clearNewGames();
  });
});

function objectToQueryString( object ) {
  return Object.keys( object ).map(function( key ) {
    return key + "=" + object[key];
  }).join("&");
}

async function getRandomStaticOffers( validOfferData ) {
  return new Promise(function( resolve ) {
    get( getsupernovaurl + "/www/jsbin/getrandomoffers?" + objectToQueryString( validOfferData ), function( offers ) {
      resolve( offers.data );
    });
  });
}

/**
 * attempts to get the poolid from sync storage first.. if that fails, it then attempts to get the poolid from getpoolid binky using the partnerid
 * if also fails, then it returns a default pool
 * sets sync storage if a pool is reserved from the binky
 * */
function resolvePoolId() {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get(['poolid', 'partnerid'], function (res) {
      let poolid = res.poolid;
      let publisherid = res.partnerid;
      if (poolid) { resolve(poolid); return };
      if (!publisherid) { resolve(defaultpoolid); return; }
      fetch( getsupernovaurl + '/www/jsbin/getpoolid?publisherid=' + publisherid)
        .then((res) => res.json())
        .then(function (ajaxres) {
          let data = ajaxres.data;
          let status = ajaxres.status;
          if (status === 'success') {
            poolid = data.poolid;
          } else {
            poolid = defaultpoolid;
          }
          chrome.storage.sync.set({ "poolid": poolid });
          resolve(poolid);
        });
    });
  });
}

async function getCountry() {
  return new Promise(function( resolve ) {
    get("https://fun.getsupernova.com/fbrcguukCoskepBvNjiupwfkdlxyydgxngyqmehvc", function( body ) {
      try {
        body = body.replace("countrycallback(","");
        body = body.replace(");","");
        var parsedBody = JSON.parse(body);
        var countryName = parsedBody.countryName;
        resolve(countryName);
      } catch(e) {
        resolve("Unknown")      
      }      
    });
  });
}

async function saveStaticOffers() {
  chrome.storage.local.set({ "staticoffers": await getRandomStaticOffers({
    poolid: await resolvePoolId(),
    country: await getCountry()
  }) });
}

/*
  Chrome runtime waits for all the initial requests to finish before starting. 
  The request for the message iframe src was causing a lag on the 
  chrome.runtime.onMessage.addListener being set, which effectively was hanging
  the background script since it's behavior is mostly based on messaging. The 
  chrome.runtime.onStartup event only fires after the chrome process has been
  terminated, not on each reload, so the following code is meant to serve as a
  runtime.onStartup instead since it fires each time the background script is
  loaded. 
*/
//OnStartup
chrome.runtime.getPlatformInfo(function() {
  setupMessageFrame();
  saveStaticOffers();
  checkGamerStatus();
});

chrome.runtime.onInstalled.addListener(function (details) {
  
  fetch( getsupernovaurl + "/www/jsbin/install.js?type=extension", { method: "POST" }).then(function (res) {
    return res.json();
  }).then(function (body) {
    let guid = body.data.gamerguid;
    if (guid) chrome.storage.sync.set({ gamerguid: guid });
    let poolid = body.data.poolid;
    if (poolid) chrome.storage.sync.set({ poolid: poolid });
    let publisherid = body.data.publisherid;
    if (publisherid) chrome.storage.sync.set({ partnerid: publisherid });

  }).catch(function (e) {
    console.log( e );
  });
  
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (isValidTab(tabs[i])) {
        chrome.tabs.reload(tabs[i].id);
      }
    }
  });

  lib.syncdata.set({ "playedgames": [] });

  chrome.storage.sync.set({
    "SuperNovaNotifications": {
      all: true,
      bookmark: {
        state: "daily",
        idle: undefined
      },
      replay: true,
      install: true
    },
    "pinned": 0
  });

  waitToNotify({
    type: "install",
    data: {
      message: `
      <strong>Thanks for installing!</strong>
      <br/>
      <small>To get started just browse the web and play your favorite games!</small>`
    }
  });
});