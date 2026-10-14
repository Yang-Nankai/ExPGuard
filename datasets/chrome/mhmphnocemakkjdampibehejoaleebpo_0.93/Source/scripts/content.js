//import { syncdata.get, syncdata.set, fromEntries } from scripts/lib.js :: included via manifest.json.

var superstarterMessageData = null;
var splashObject = null;
var extensionStatus = {
  extension: true
}
var installStatus = {};
var launchStatus = {};
var config = {};


//FIXME - For some reaosn this fails.
$.getJSON(chrome.runtime.getURL("extension.config.json")).done(function( data ) {
  config = data;
}).fail(function( error ) {
  config = { //hardcoded.
    "Name": "SuperNova",
    "gamebox": []
  };
  //throw error;

});

chrome.runtime.sendMessage({ "command": "getextensionstatus" }, function (result) {
  if (result != null && typeof (result) == 'object') {
    extensionStatus = result;
  }
});

function bookmarkBadgeNotification() {
  chrome.runtime.sendMessage({ command: "badgeNotification", data: {
    type: "increment"
  }})
}

async function bookmarkNotification( gameInfo ) {
  bookmarkBadgeNotification();
  notify({
    type: "bookmark",
    data: {
      message: `
      <strong id="notification_bookmark_strong" style='font-size: 1.6em;'>Game Bookmarked!</strong>
      <br/>
      <small>Right click the bookmark to delete it.</small>`,
      game: gameInfo
    }
  });
}

function replayNotification( gameInfo ) {
  chrome.storage.sync.get([ "SuperNovaNotifications" ], function( response ) {
    if ( 
      response.SuperNovaNotifications.replay != false &&
      response.SuperNovaNotifications.all != false
    ) {
      notify({
        type: "replay",
        data: {
          message: `
            <strong id="notification_replay_strong" style='font-size: 0.85em;'>Replaying a game moves it up the list!</strong>
            <br/>
            <small>Click the star to pin it to the top.</small>`,
          game: gameInfo
        }
      });
    }
  });
  
}

async function bookmarkUsage() {
  chrome.runtime.sendMessage({ command: "postUsage", data: {
    url: window.location.href,
    type: '{ type: "Game Added", data: "' + await gameType() + '" }'
  }});
}

function DOM_hasFlashObject() {
  var bHasFlashObject = false;
  if ( $("object[type='application/x-shockwave-flash']").length > 0 ) {
    bHasFlashObject = true;
  }

  return bHasFlashObject;
}

async function gameType() {
  var sType = "HTML5";
  if ( 
    /.io$/.test( window.location.host ) &&
    await isKnown_ioSite( window.location.host )
  ) {
    sType = "iogame";
  } else if ( DOM_hasFlashObject() ) {
    sType = "Flash";
  }

  return sType;
}

/**
 * loggame
 * game : {title:string, iconurl:string, url:string playcount:Number, lastplaydate:Number, publishericon:string, pinned:Number} //pinned at slot #
 * saves game's : title icon playcount gameurl lastplaydate
 *  to a locally stored map of game urls 
 * where url is the page that the game is located on, not the swf's location
 * 
 *  store by game url in order to link players back to the site they most recently played it on
 *  although this may allow for one game to show up in their recents twice or more times.
 *  this probably will not be an issue... the ability to hide games will exist
 *  
 * promise resolve true on success
 */
async function logGame(game) {
  return new Promise(function (resolve, reject) {

    if (game.url == null || game.title == null) {
      resolve(false);
      return;
    };
    game.lastplaydate = new Date().getTime();
    game.playcount = 0;

    let games = undefined;

    lib.syncdata.get(['playedgames'], async function (res) {
      if (
        res instanceof Error &&
        res.message == 'The data being requested does not exist.\nData: ["playedgames"]'
      ) {
        lib.syncdata.set({ "playedgames": [] });
        games = {};
      } else {
        games = lib.fromEntries( res['playedgames'] );
      }  

      let value = undefined;
      if (
        games &&
        JSON.stringify( games ) != JSON.stringify({})
      ) {
        res.playedgames.every(function( savedGame ) {
          savedGame = Object.values( savedGame )[0];
          
          if (
            savedGame.title == game.title &&
            savedGame.publishericon == game.publishericon
          ) {
            value = games[savedGame.url];
            return false;
          } else {
            return true;
          }
        });
      } else {
        games = {};
      }

      if (value) { //game already exists.. increment playcount and retain any old info
        chrome.runtime.sendMessage({ command: "incrementPlayCount", data: {
          gameInfo: value
        }});
        replayNotification( value );

      } else {//game does not exist yet... enforce any new game policy
        game.pinned = -1; // don't allow pin settings from new game
        bookmarkNotification( game );
        bookmarkUsage();
        game.new = true;
        games[game.url] = game;
      }
      
      lib.syncdata.set({ playedgames: lib.entries(games) });

      resolve(true);
    });
  });
}



//FIXME: Add  optional deep scanning  capability of 1-2 levels of iframes for getBestObjectEl/getSplashObject)
//For speed reasons, perhaps only enable on sites/pages where user has enabled flash manually before?
function getBestObjectEl(searchDepth) {
  var embeds = document.getElementsByTagName("object");
  var maxembed = null;
  var maxembedwidth = 300;
  var maxembedheight = 200;
  for (var i = 0; i < embeds.length; i++) {
    var embed = embeds[i];
    if (parseInt(embed.width) > maxembedwidth && parseInt(embed.height) > maxembedheight ||
      parseInt(embed.clientWidth) > maxembedwidth && parseInt(embed.clientHeight) > maxembedheight) {
      maxembedwidth = parseInt(embed.width);
      maxembedheight = parseInt(embed.height);
      maxembed = embed;
    }
  }
  return maxembed;
}

function getSplashObject() {
  var bestObjectEl = getBestObjectEl();
  if (bestObjectEl) {
    var bestEmbed = bestObjectEl.querySelector("embed");
    var flashvarsEl = bestObjectEl.querySelector("param[name=flashvars],param[name=Flashvars],param[name=flashVars],param[name=FlashVars]");

    var movieUrl = bestEmbed != null ? bestEmbed.src : null;
    if (movieUrl == null) {
      movieUrl = bestObjectEl.getAttribute("data");
      if (movieUrl == null) {
        var movieEl = bestObjectEl.querySelector("param[name=movie],param[name=Movie]");
        if (movieEl != null) {
          movieUrl = movieEl.getAttribute("value");
        }
      }
    }
    if (movieUrl == null) return null;

    var flashvars = "";
    if (flashvarsEl) {
      flashvars = flashvarsEl.value;
    }
    if (flashvars === "") {
      flashvars = bestObjectEl.getAttribute("flashvars");
    }
    return {
      width: parseInt(bestObjectEl.width),
      height: parseInt(bestObjectEl.height),
      url: movieUrl,
      objectEl: bestObjectEl,
      flashvars: flashvars
    }
  }
  return null;
}

function addEventHandler(eventName, cb) {
  if (window.addEventListener) {
    window.addEventListener(eventName, cb, false);
  } else {
    window.attachEvent(eventName, cb);
  };
}
function sendMessageToPage(message) {
  var eventInit = {
    data: {
      key: "supernova-extension-message",
      message: JSON.stringify(message)
    }
  };
  var event = new MessageEvent('supernova-message', eventInit);
  window.dispatchEvent(event);
}
function sendStatusToPage() {
  sendMessageToPage({
    command: "status", data: {
      launchStatus: launchStatus,
      extensionStatus: extensionStatus
    }
  });
}
function superNovaMessageEventHandler(e) {
  if (!e.data || !e.data.message) return;
  if (e.data.key != "supernova-jslauncher-message") return;
  var message = null;
  try {
    message = JSON.parse(e.data.message);
  } catch (e) {
    return;
  }
  if (!message) return;

  switch (message.command) {
    case "requeststatus":
      sendStatusToPage();
      break;
    case "status":
      if (message.data.launchStatus) {
        launchStatus = extend(launchStatus, message.data.launchStatus);
        launchStatusReceived = true;
      }
      break;
    case "supernovaplayerstatus":
      if (message.data && message.data.installed) {
        extend(installStatus, { detected: true });
      } else {
        extend(installStatus, { detected: false });
      }
      break;
    case "loggame":
      if (message.data) {
        let apiobject = message.data;
        logGame(apiobject);
      }
      break;
  }
}
addEventHandler("supernova-message", superNovaMessageEventHandler);


/*!    SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
		is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
		Copyright (c) 2007-2015 The SWFObject team
*/

var ua = function () {
  function toInt(str) {
    return parseInt(str, 10);
  }


  let doc = document, nav = navigator, win = window,
    UNDEF = "undefined",
    OBJECT = "object",
    SHOCKWAVE_FLASH = "Shockwave Flash",
    SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
    FLASH_MIME_TYPE = "application/x-shockwave-flash",
    EXPRESS_INSTALL_ID = "SWFObjectExprInst",
    ON_READY_STATE_CHANGE = "onreadystatechange",
    plugin = false;

  var w3cdom = typeof doc.getElementById !== UNDEF && typeof doc.getElementsByTagName !== UNDEF && typeof doc.createElement !== UNDEF,
    u = nav.userAgent.toLowerCase(),
    p = nav.platform.toLowerCase(),
    windows = p ? /win/.test(p) : /win/.test(u),
    mac = p ? /mac/.test(p) : /mac/.test(u),
    webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
    ie = nav.appName === "Microsoft Internet Explorer",
    playerVersion = [0, 0, 0],
    d = null;
  if (typeof nav.plugins !== UNDEF && typeof (nav.plugins)[SHOCKWAVE_FLASH] === OBJECT) {
    d = (nav.plugins)[SHOCKWAVE_FLASH].description;
    // nav.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
    if (d && (typeof nav.mimeTypes !== UNDEF && (nav.mimeTypes)[FLASH_MIME_TYPE] && (nav.mimeTypes)[FLASH_MIME_TYPE].enabledPlugin)) {
      plugin = true;
      ie = false; // cascaded feature detection for Internet Explorer
      d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
      playerVersion[0] = toInt(d.replace(/^(.*)\..*$/, "$1"));
      playerVersion[1] = toInt(d.replace(/^.*\.(.*)\s.*$/, "$1"));
      playerVersion[2] = /[a-zA-Z]/.test(d) ? toInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0;
    }
  }
  else if (typeof (win).ActiveXObject !== UNDEF) {
    try {
      //@ts-ignore
      var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
      if (a) { // a will return null when ActiveX is disabled
        d = a.GetVariable("$version");
        if (d) {
          ie = true; // cascaded feature detection for Internet Explorer
          d = d.split(" ")[1].split(",");
          playerVersion = [toInt(d[0]), toInt(d[1]), toInt(d[2])];
        }
      }
    }
    catch (e) { }
  }
  return { w3: w3cdom, pv: playerVersion, wk: webkit, ie: ie, win: windows, mac: mac };
}();

function getFlashPlayerVersion() {
  return { major: this.ua.pv[0], minor: this.ua.pv[1], release: this.ua.pv[2] };
}
/* end SWFObject */
function hasFlashPlayerVersion(flashver) {
  let fv = flashver.split(".");
  let a = this.getFlashPlayerVersion();
  let keys = Object.keys(a);
  for (let i = 0; i < 3; i++) {
    fv[i] = parseInt(fv[i] || 0);
  }
  return ((fv[0] <= a.major) || (fv[0] === a.major && fv[1] <= a.minor)) || (fv[0] === a.major && fv[1] === a.minor && fv[2].release <= a.release);
}

function extend(dst, src) {
  var keys = Object.keys(src);
  for (var k = 0; k < keys.length; k++) {
    var key = keys[k];
    dst[key] = src[key];
  }
  return dst;
}

var hash = window.location.hash
var log = function (m) { }

if (hash == "#snDev" || hash == "#snLog") {
  log = console.log.bind(window.console)
} else {
}

function addEventHandler(eventName, cb) {
  if (window.addEventListener) {
    window.addEventListener(eventName, cb, false);
  } else {
    window.attachEvent(eventName, cb);
  };
}


function getLaunchStatus() {
  return launchStatus;
}
function setLaunchStatus(data) {

  return extend(installStatus, data);
}
function getInstallStatus() {
  return installStatus;
}
function setInstallStatus(data) {
  return extend(installStatus, data);
}


//Listener to accept messages from the page itself to tell us if they launched supernova via scheme
function receiveMessage(e) {
  //if (e.source != window) return;    //FIXME: Anyone can post commands
  var message = e.data;

  if (typeof (message) === "object") {
    switch (message.command) {
      case "superstarter":
        if (message.data) {
          superstarterMessageData = message.data;
          setLaunchStatus({ launchStatus: "started", launchType: "manual", launchMethod: "superstarter" });
          chrome.runtime.sendMessage({ "command": "superstarter", "data": message.data }, function (response) {
            log("Enabled superstarter!");
            window.postMessage(JSON.stringify({ event: "superstarter", status: "started", data: "manual" }), "*");

            setLaunchStatus({ launchStatus: "started", launchType: "manual", launchMethod: "superstarter" });

            //alert("Enabled superstarter!");
          }
          );
        }
        break;
    }
  }
}
window.addEventHandler("message", receiveMessage);

function processSuperStarterRequest(splashObject, sendResponse) {
  if (splashObject != null) {
    var command = "play?swfurl=" + encodeURIComponent(splashObject.url) + "&flashvars=" + encodeURIComponent(splashObject.flashvars);
    chrome.runtime.sendMessage({ "command": "superstarter", "data": command }, function (response) {
      log("Enabled superstarter!");
      window.postMessage(JSON.stringify({ event: "superstarter", status: "started", data: "manual" }), "*");

      sendResponse({ launchStatus: "started", launchType: "manual", launchMethod: "superstarter" });
      setLaunchStatus({ launchStatus: "started", launchType: "manual", launchMethod: "superstarter" });

      //alert("Enabled superstarter!");
    });
    return true;
  } else if (superstarterMessageData != null) {
    setLaunchStatus({ launchStatus: "started", launchType: "manual", launchMethod: "superstarter" });
    chrome.runtime.sendMessage({ "command": "superstarter", "data": superstarterMessageData }, function (response) {
      log("Enabled superstarter!");
      window.postMessage(JSON.stringify({ event: "superstarter", status: "started", data: "manual" }), "*");

      setLaunchStatus({ launchStatus: "started", launchType: "manual", launchMethod: "superstarter" });

      //alert("Enabled superstarter!");
    }
    );
  } else {
    sendResponse({});
  }
}

function idleOffBookmarkNotifications( SuperNovaNotifications ) {
  SuperNovaNotifications.bookmark.state = "daily";
  SuperNovaNotifications.bookmark.idle = undefined;
  chrome.storage.sync.set({ SuperNovaNotifications: SuperNovaNotifications });
}

async function checkNotificationStatus( type ) {
  return new Promise(function( resolve ) {
    chrome.storage.sync.get(["SuperNovaNotifications"], function( response ) {
      //if SuperNotifications.all is set to false, the status will be false.
      var status = response.SuperNovaNotifications.all != false;

      if ( type == "bookmark" ) {
        let bookmarkStatus = undefined;
        if ( 
          response.SuperNovaNotifications.bookmark.state == "daily" &&
          response.SuperNovaNotifications.bookmark.idle != undefined
        ) {
        //if the bookmark state is idle then...
          //Check if the idle time has expired.
          var now = new Date();
          if ( now > response.SuperNovaNotifications.bookmark.idle ) {
          //if the idle time has expired then...
            idleOffBookmarkNotifications( response.SuperNovaNotifications )
            bookmarkStatus = true;
          } else {
          //otherwise the idle time is still valid so...
            bookmarkStatus = false;
          }
        } else if ( response.SuperNovaNotifications.bookmark.state == "off" ) {
        //otherwise the bookmark state is not idle so...
        //if the bookmark state is off then..
          bookmarkStatus = false;
        } else {
        //otherwise the neither idle or off so...
          bookmarkStatus = true;
        }

        status = status && bookmarkStatus;
      } else {
        status = status && ( response.SuperNovaNotifications[type] != false );
      }
      
      resolve( status );
    });
  });
}

function listAs_ReadNotification( type ) {
  if ( type != "bookmark" ) {
    chrome.storage.sync.get([ "SuperNovaNotifications" ], function( response ) {
      var notifications = response.SuperNovaNotifications;
      if ( notifications == undefined ) {
        notifications = {
          all: true,
          bookmark: {
            state: "daily"
          },
          replay: true,
          install: true,
          firstUI_use: true
        };

        notifications[type] = false;
      } else {
        notifications[type] = false;
      }

      chrome.storage.sync.set({ SuperNovaNotifications: notifications });
    });
  }
}

async function notify( data ) {
  if ( await checkNotificationStatus( data.type ) != false ) {
    listAs_ReadNotification( data.type );
    
    data["iconurl"] = chrome.runtime.getURL("images/icon-16x16.png");

    window.postMessage({ 
      who: "afterpage",
      command: "notify",
      data: data
    }, location.origin );
    
  }
}

async function postGamePlayUsage() {
  chrome.runtime.sendMessage({ command: "postUsage", data: {
    url: window.location.href,
    type: '{ type: "Game Play", data: "' + await gameType() + '" }'
  }});
}

function clearNotifications() {
  if ( $("#supernova_notifications").length > 0 ) {
    $("#supernova_notifications")[0].contentWindow.postMessage({
      command: "clearNotifications"
    });
  }
}

function closeUI_iframe() {
  $("#supernova_ui").off();
  $("#supernova_ui").fadeOut("slow", function() {
    $("#supernova_ui").remove();
  });
}

function checkforgame( games ) {
  $(document).ready(function () {
    function titleExists( titles ) {
      if ( titles ) {
        return titles[titles.findIndex(function( title ) {
          return new RegExp( lib.regexpEscape( title ), "i" ).test( document.title ) ||
                 new RegExp( lib.regexpEscape( title ), "i" ).test( $("[property='og:title']").attr("content") );
        })];
      } else {
        return undefined;
      }
    }

    function isVideo( htmlEl ) {
      if (
        ( 
          htmlEl.src && 
          htmlEl.src.match(/youtube|dailymotion|vimeo/i) != null
        ) ||
        ( 
          htmlEl.id &&
          htmlEl.id.match(/video/i) != null 
          ) || 
        ( 
          htmlEl.classList.length > 0 &&  
          htmlEl.classList.value.match(/video/i) != null 
        )
      ) {
        return true;
      } else {
        return false;
      }
    }

    function isTooTall( box ) {
      var height = box.clientHeight || parseInt( box.height );
      var width = box.clientWidth || parseInt( box.width );
      return ( height / width ) > 2;
    }

    function isInvalidEmbed( box ) {
      var invalidEmbed = false;
      if ( 
        $(box).is("embed") &&
        $(box).attr("type") == undefined
      ) {
        invalidEmbed = true;
      } else if ( 
        $(box).is("embed") &&
        $(box).attr("type") &&
        $(box).attr("type").match(/x-shockwave-flash/i) == null
      ) {
        invalidEmbed = true;
      }

      return invalidEmbed;
    }
    
    function isInvalidObject( box ) {
      var invalidObject = false;
      
      if ( 
        $(box).is("object") &&
        $(box).attr("type") == undefined
      ) {
        invalidObject = true;
      } else if ( 
        $(box).is("object") &&
        $(box).attr("type") &&
        $(box).attr("type").match(/x-shockwave-flash/i) == null
      ) {
        invalidObject = true;
      }

      return invalidObject;
    }

    function hasTooManyLinks( htmlEl ) {
      return $(htmlEl).find("a").length > 5;
    }

    function validateGameBoxes( boxes ) {
      var validBox = true;
      return boxes.filter(function( box ) {
        validBox = true;
        if (isInvalidObject( box )) {
          validBox = false;
        } else if ( isInvalidEmbed(box) ) {
          validBox = false;
        } else if (hasTooManyLinks( box )) {
          validBox = false;
        } else if ( $(box).is("body") ) {
          validBox = false;
        } else if ( isVideo( box ) ) {
          validBox = false;
        } else if ( isTooTall( box ) ) {
          validBox = false;
        } 

        return validBox;
      });
    }

    function GameBoxExists( boxes ) {
      //Return true if a potential game box has the right size.
      boxes = Array.from( boxes );
      boxes = validateGameBoxes( boxes );
      
      return (boxes.every(function( box ) {
        let width = box.clientWidth || parseInt(box.width);
        let height = box.clientHeight || parseInt(box.height);
        
        return (( width >= 400 && height >= 300 ) == false);
      }) == false);
    }

    setTimeout(function() {
      var title = undefined;
      var icon = undefined;
      var potentialGameBoxes = "[id*=game], [id*=Game], [id*=flash], [id*=preroll], [class*=flash], [class*=game] [class*=Game], embed, object";
      if (config.gamebox) {
        potentialGameBoxes += (config.gamebox.length > 0 )? ", " + config.gamebox.join(", "): "";
      }

      var gameBoxExists = GameBoxExists($(potentialGameBoxes));

      games.every(function( game ) {
        title = titleExists( game.title_contenders );
        if ( title != undefined ) {
          icon = game.imgurl;
        }
        return (title == undefined);
      });

      if ( 
        gameBoxExists &&
        title != undefined
      ) {
        logGame({ 
          title: title,
          iconurl: icon, 
          url: window.location.href,
          publishericon: getFavicon(),
          publisherurl: window.location.protocol + "//" + window.location.hostname
        });

        //Clear the queue.
        saveGameContenders([]);
      } else {
        games.forEach(function( game ) {
          game.counter--;
          if ( game.counter > 0 ) {
            saveGameContenders([ game ]);
          }
        });
      }
    }, 1000);
  });
}

//Listener to accept messages from the background/ui
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.data) {
    case "runSupernovaLauncher":
      runZoneTag();
      break;      
    case "runRuffle":
      runRuffle();
      break;     
    case "getLaunchStatus":
      sendResponse(getLaunchStatus())
      break;
    case "superstarterrequest":
      var splashObject = getSplashObject();
      processSuperStarterRequest(splashObject, sendResponse);
    case "closeNotification":
      var enablerDiv2 = document.getElementById("enablerDiv2")
      if (enablerDiv2) {
        $(enablerDiv2).off();
        $(enablerDiv2).remove();
      }
      break;
    case "dismissNotification":
      var enablerDiv2 = document.getElementById("enablerDiv2")
      if (enablerDiv2) {
        enablerDiv2.style.display = 'none';
      }
      var storageObj = {};
      storageObj[window.location.host] = { "dismissed": new Date().getTime() };
      chrome.storage.local.set(storageObj, function () {
        log('Dismissed is set to true');
      })

      //chrome.runtime.sendMessage({"command":"dismissFlashPrompt"});
      break;
    case "checkforgame":
      checkforgame(message.body);
      break;
    case "notify":
      if ( message.body.type == "replay" ) {
        replayNotification(message.body.data);
      } else {
        notify(message.body);
      }
      break;
    case "postGamePlayUsage": 
      postGamePlayUsage();
      break;
    case "clearNotifications":
      clearNotifications();
      break;
    case "closeUI_iframe":
      closeUI_iframe();
      break;
    case "getSplashObject":
      sendResponse( getSplashObject() );
      break;
  }
});

function tidyWhitespace( text ) {
  if ( typeof text != "string" ) {
    throw new Error("Error: Type must be string!");
  } else {
    text = text.replace( /\s{2,}/mg, " " );
    return text.trim();
  }
}

function cleanArray( array ) {
  var blacklist = [
    "play",
    "\s*"
  ];
  array = array.filter(function( title ) {
    return blacklist.every(function( phrase ) {
      return new RegExp( "^" + phrase + "$", "i" ).exec( title ) == null;
    });
  });
  return Array.from(new Set( array.filter(function( element ) {
    return element.length > 0 ? true: false;
  })));
}


function accountForBlacklistedWords( potentialTitles ) {
  var newTitles = [];
  var blacklist = [
    /^play\s+([\s\S]+)/i
  ];
  var match = undefined;
  potentialTitles.forEach(function( title ) {
    blacklist.forEach(function( pattern ) {
      match = new RegExp( pattern ).exec( title );
      if (
        match && 
        match.length > 1 
      ) {
        match.slice(1).forEach(function( titleSlice ) {
          if ( titleSlice ) {
            newTitles.push( titleSlice );
          }
        });
      }
    });
  });

  return potentialTitles.concat( newTitles );
}

function getText(jQueryEl) {
  var possibleTitles = [];
  jQueryEl.each(function( index, link ) {
    link = $(link);
    //Add children's alt text.
    if ( link.find("[alt]").length > 0 ) {
      link.find("[alt]").each(function( index, element ) {
        possibleTitles.push( tidyWhitespace(
          $(element).attr("alt")
        ));
      });
    }

    //Add element's alt text.
    if ( link.attr("alt") ) {
      possibleTitles.push( tidyWhitespace(
        link.attr("alt")
      ));
    }
  
    //Add children's title.
    if ( link.find("[title]").length > 0 ) {
      link.find("[title]").each(function( index, element ) {
        possibleTitles.push( tidyWhitespace(
          $(element).attr("title")
        ));
      });
    }

    //Add element's title.
    if ( link.attr("title") ) {
      possibleTitles.push( tidyWhitespace( 
        link.attr("title")
      ));
    }
  
    //Add children's text.
    link.find("*").each(function( index, element ) {
      possibleTitles.push( tidyWhitespace(
        $(element).clone().children().remove().end().text()
      ));
    });
    

    //Add element's text.
    possibleTitles.push( tidyWhitespace(
      link.clone().children().remove().end().text()
    ));
  });
  
  return cleanArray(accountForBlacklistedWords( possibleTitles ));
}

function addTitles(title_contenders, titles) {
  titles.forEach(function( title ) {
    title_contenders.push(title.trim());
  });
}

function getBestGameIcon(imglist) {
  imglist = imglist.sort(function (a, b) {
    let a_area = a.clientHeight * a.clientWidth;
    let b_area = b.clientHeight * b.clientWidth;
    if ((a.alt || b.alt) && !(a.alt && b.alt)) { //xor
      if (a.alt) {
        return -1;
      } else {
        return 1;
      }
    }
    if (a_area > b_area) { return -1 } else if (a_area < b_area) { return 1 } else return 0;
  });

  for (let i = 0; i < imglist.length; i++) {
    let img = imglist[i];

    let width = parseInt( img.width ) || img.clientWidth;
    let height = parseInt( img.height ) || img.clientHeight;

    if (!height || height == 0) {
      height = 1;
    }
    let widthToHeightRatio = width / height;

    let widthToHeightMax = 3;
    let maxDimension = 350;
    let minDimension = 40;

    if (
      widthToHeightRatio < (1 / widthToHeightMax) ||
      widthToHeightRatio > widthToHeightMax ||
      width > maxDimension ||
      height > maxDimension ||
      width < minDimension ||
      height < minDimension ||
      $("img[src='" + img.src + "']").length > 3
    ) {
      continue;
    } else {
      //the picture has an acceptable w/h ratio, is not too large and doesn't appear on the page more than 3 times
      return img;
    }
  }
  
  //For Debugging purposes.
}

function getTLD(hostname) {
  var hostSplit = hostname.split(".");
  var tld = "";
  for (var i = hostSplit.length - 1; i >= 0; i--) {
    if (tld.length == 0) tld = hostSplit[i];
    else tld = hostSplit[i] + "." + tld;
    if (i != hostSplit.length - 1 && hostSplit[i].length > 3) break;
  }
  return tld;
}

function saveGameContenders( games ) {
  chrome.runtime.sendMessage({ "command": "saveGameContender", "data": { 
    games: games, 
    hostname: window.location.hostname,
  }});
}

async function isKnown_ioSite() {
  return new Promise(function( resolve ) {
    var bReturn = false;
    var urlEndsInDotIO = new RegExp(/.io$/, "i");
    var bUrlEndsInDotIO = urlEndsInDotIO.test( document.location.hostname )
    if (bUrlEndsInDotIO) {
      chrome.runtime.sendMessage({ "command": "isKnown_ioSite", "data": document.location.hostname }, function( isKnown ) {
        resolve( isKnown );
      });
    } else {
      resolve( bUrlEndsInDotIO );
    }
  });
}

function getFavicon() {
    var favicon = undefined;
    var nodeList = document.getElementsByTagName("link");
    for (var i = 0; i < nodeList.length; i++) {
      if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon")) {
        favicon = nodeList[i].getAttribute("href");
        //if the url starts with a reference to the baseURL then...
        if ( favicon.match(/^\.\//) ) {
          //remove the dot.
          favicon = window.location.protocol + "//" + window.location.hostname + "/" + favicon.slice(2);;
        } else if (favicon.match(/^\//)) {
          favicon = window.location.protocol + "//" + window.location.hostname + "/" + favicon.slice(1);
        } else if ( favicon.match("^(http|https|" + window.location.hostname + ")") == null ) {
          favicon = window.location.protocol + "//" + window.location.hostname + "/" + favicon;
        }
      }
    }

    if ( 
      favicon == undefined ||
      location.hostname == "www.addictinggames.com"
    ) {
      favicon = window.location.protocol + "//" + window.location.hostname + "/" + "favicon.ico";
    }

    return favicon;        
}

$(document).ready(function () {
  
  isKnown_ioSite().then(function( is_ioSite ) {
    if ( is_ioSite ) {
      let faviconurl = getFavicon();
      logGame({ title: window.location.hostname, iconurl: faviconurl, url: window.location.protocol + "//" + window.location.hostname, publishericon: faviconurl });
    } else {
      document.body.addEventListener("click", function (e) {
        //e.preventDefault();
        var getAnchor = function (el) {
          while (el) {
            if ((el.nodeName || el.tagName).toLowerCase() == "a") return el;
            el = el.parentNode;
          }
          return null;
        }

        e = (e || event);
        var a = getAnchor((e.target || e.srcElement));

        if (
          location.hostname == "www.addictinggames.com" &&
          a == null
        ) {
          a = $(e.target).parent().find("a")[0];
        } 

        if (a && a.href) {
          doClick(a)
        }
      }, true);

      function doClick(triggered_a) {
        let imgurl = "";
        let title_contenders = [];

        /**
         * Get triggering 'a' element and check it's content for plaintext title 
         * and it's child nodes of any depth for img and textcontent.
         * 
         * If no ( image || title ) is found then find the closest ( div || a ) 
         * that shares the same classlist with all of its siblings (at least 3 
         * have to match, including itself).
         * 
         * reject too big 250wh
         * take larget image that is within reasonable aspect ratio
         * repeated more than 3 times wrong image 
        */

        triggered_a = $(triggered_a);

        var possibleImgs = [];
        $("a[href='" + triggered_a.attr('href') + "'] img").each(function( index, htmlEl ) {
          possibleImgs.push( htmlEl );
        });
        
        $(triggered_a).parent().find("img[alt='" + triggered_a.attr("title") + "']").each(function( index, htmlEl ) {
          possibleImgs.push( htmlEl );
        });

        let img = getBestGameIcon( possibleImgs );
        
        if (img) {
          imgurl = img.src ? img.src : $(img).attr("data-noscript");
        }

        let allmatching_a = $("a[href='" + triggered_a.attr('href') + "']");
        
        let name = allmatching_a.find("*");
        name.push(allmatching_a);

        name.each(function (index, el) {
          el = $(el);
          addTitles(title_contenders, getText( el ));
        });

        title_contenders = cleanArray( title_contenders );


        if (title_contenders.length > 0 && imgurl) { 
          saveGameContenders([{
            title_contenders: title_contenders, 
            imgurl: imgurl,
            counter: 2
          }]);
          return;
        };
      }
    }
  }).catch(function( error ) {
    console.log("\n\nCatching\n\nError: " + error );
  });
});