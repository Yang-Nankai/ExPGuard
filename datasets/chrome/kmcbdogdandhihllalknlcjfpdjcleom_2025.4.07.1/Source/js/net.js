// This console.log is vieable while inspecting the background.
console.log("background_net.js");
/* bacground_net.js - background controller for listening to, and forwarding network traffic.
 */

let popupWindowId = null;

function openNewPopup() {
  chrome.windows.create(
    {
      url: chrome.runtime.getURL("../index.html"),
      type: "popup",
      //width: 456,
      width: 370,
      //height: 668,
      height: 590,
    },
    function (window) {
      if (chrome.runtime.lastError) {
        console.log("Error creating popup");
      }
      if (window?.id) {
        // Store the ID of the newly created popup window
        popupWindowId = window.id;
      }
    }
  );
}

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (
    windowId !== chrome.windows.WINDOW_ID_NONE &&
    windowId !== popupWindowId
  ) {
    // Store the window ID in Chrome's storage
    chrome.storage.local.set({ lastFocusedWindowId: windowId });
  }
});

chrome.action.onClicked.addListener(function () {
  // Check if the popup window ID is already stored
  if (popupWindowId) {
    chrome.windows.get(popupWindowId, function (window) {
      // If the window exists and is open, close it
      if (chrome.runtime.lastError) {
        // If there's an error, it means the window doesn't exist
        openNewPopup();
      } else {
        // Close the existing popup window
        chrome.windows.remove(popupWindowId, function () {
          // After closing, open a new popup window
          openNewPopup();
        });
      }
    });
  } else {
    // No stored window ID, so open a new popup window
    openNewPopup();
  }
});

function caught_promise_error(e) {
  console.warn("caught_promise_error", e);
}
// If this version of chrome has apis (not a big issue)
var hasAPIs = chrome.webRequest;
// Set the default state of intercepting hits to false
var intercept = true;
// Set the default state of block and swap to undefined
var block_and_swap = undefined;
// Set the default state of blocking to false
var blocking = false;
// Initialize the brands observed array
var brands_observed = [];

// Initialize the url_regex_array array
var url_regex_array = [];
// Initialze the URL regex string
var url_regex = "";
var settingsForProcessMessage = undefined;
// URLS
var GA = "*://www.google-analytics.com/*";
var GTM = "*://www.googletagmanager.com/*";
var CD = "*://stats.g.doubleclick.net/*";
//const GTMSS = '.adswerve\.com\/.*collect\?.*gtm=';
//var QP = '*://gong-gc.qubit.com/*'
var ALL = ["<all_urls>"];

// Arrays of requests and processed messages used in processing
var requests = [];
var processedMessages = [];

function passes_filter(url) {
  //if (url.includes("google-analytics.com/_")) debugger;
  return url_regex.test(url);
}

function saveRequest(requestDetails) {
  if (passes_filter(requestDetails.url)) {
    processMessage(requestDetails); //requests.push(requestDetails);
  }
  //console.log("requestDetails:", requestDetails);
}

// BLOCK & SWAP FUNCTIONS

/** Block and Swap calls
Given a selector, the code will block the call, and optionally swap out with another url.
@param - requestDetails
*/
function blockAndSwap(requestDetails) {
  if (!blocking || !block_and_swap) return;
  let response = {};

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  if (
    new RegExp(escapeRegExp(block_and_swap.block), "i").test(requestDetails.url)
  ) {
    chrome.tabs.sendMessage(requestDetails.tabId, {
      msg: JSON.stringify({
        block: block_and_swap.block,
        url: requestDetails.url,
      }),
    });
    if (block_and_swap.swap) {
      console.log(
        "tried to swap",
        block_and_swap.block,
        "for:",
        block_and_swap.swap,
        "requestDetails:",
        requestDetails
      );
      chrome.tabs.sendMessage(requestDetails.tabId, {
        msg: JSON.stringify({
          swap: block_and_swap.swap,
        }),
      });
      response.redirectUrl = block_and_swap.swap;
    } else {
      console.log(
        "tried to block",
        block_and_swap.block,
        "requestDetails.url:",
        requestDetails.url
      );
      response.cancel = true;
    }
  }
  return response;
  //console.log(requestDetails.url);
}

/** Format Block and Swap
@param bs - A comma delimited string
@return block_and_swap object with block and swap keys split from the bs string
*/
function format_block_swap(bs) {
  var block_and_swap = bs ? {} : undefined;
  if (bs) {
    bs = bs.split(",");
    block_and_swap.block = bs[0];
    block_and_swap.swap = bs[1];
  }
  return block_and_swap;
}

function setup_script_blocking(block) {
  try {
    block_and_swap = JSON.parse(block);
    // if not an array, puth the object into an array
  } catch (e) {
    block_and_swap = format_block_swap(block);
    if (!block_and_swap) console.error(e);
  }
  if (!block_and_swap) return;
  chrome.webRequest.onBeforeRequest.removeListener(blockAndSwap);
  chrome.webRequest.onCompleted.removeListener(processMessage);
  if (blocking && hasAPIs) {
    chrome.webRequest.onBeforeRequest.addListener(
      blockAndSwap,
      {
        urls: ["<all_urls>"],
      },
      ["blocking"]
    );
  }
}
// END BLOCK AND SWAP FUNCTIONS

/** Setup Intercept
@param settings - Settings object - created by Popup_Main.js, and saved to Local Storage
*/
function setup_intercept(settings) {
  let intercept_urls = ALL;
  chrome.webRequest.onBeforeRequest.removeListener(saveRequest);
  chrome.webRequest.onCompleted.removeListener(processMessage);
  settings.gaControlData.observed_functions =
    settings.gaControlData.observed_functions || [];
  url_regex_array = settings.gaControlData.observed_functions.reduce(
    (urls, o) => {
      if (o.url_regex) {
        urls = urls.concat(o.url_regex);
      }
      return urls;
    },
    []
  );
  brands_observed = settings.gaControlData.observed_functions
    ? settings.gaControlData.observed_functions.reduce((brands, o) => {
        if (o.url_regex) {
          brands = brands.concat({
            brand: o.brand,
            regex: new RegExp(o.url_regex.join("|")),
          });
        }
        return brands;
      }, [])
    : [
        {
          brand: "Google",
          url: GA,
        },
        {
          brand: "Google",
          url: GTM,
        },
        {
          brand: "Google",
          url: GTMSS,
        },
      ];
  url_regex = new RegExp(url_regex_array.join("|"));
  if (intercept && hasAPIs) {
    intercepting = true;
    console.log("intercept_urls", intercept_urls);
    chrome.webRequest.onBeforeRequest.addListener(
      saveRequest,
      {
        urls: intercept_urls,
      },
      ["requestBody"]
    );
    // chrome.webRequest.onCompleted.addListener(processMessage, {
    //   urls: intercept_urls,
    // });
    // chrome.webRequest.onBeforeRedirect.addListener(processMessage, {
    //   urls: intercept_urls,
    // });
  }
}

/** Process Message
@param details
*/
function processMessage(details) {
  const request = details;

  if (!passes_filter(details.url)) return;
  if (
    processedMessages.find((d) => {
      return (
        d.requestId === details.requestId && d.statusCode === details.statusCode
      );
    })
  ) {
    return; // Only handle the message once
  }
  processedMessages.push(details);
  // var request = requests.find((req) => {
  //   return req.requestId === details.requestId;
  // });
  function is_of_interest(details) {
    return true;
    /*
      ( details.statusCode === 200 ||
        details.statusCode === 302 ||
        details.statusCode === 307)
    */
  }
  if (is_of_interest(details)) {
    /*
    For details.method === "POST"
      Look up details.requestId in the cache of saved messages
      Get the payload from the cache
      translate the payload to an object
      append the key/value pairs to the details
    */
    //console.log("brands_observed", brands_observed)
    let observed = brands_observed.find((b) => {
      //return details.url.includes(b.url);
      return b.regex.test(details.url);
    });
    var msg = null;

    function extract_raw(raw) {
      let str = "";
      raw.forEach((r) => {
        str = str + String.fromCharCode.apply(null, new Uint8Array(r.bytes));
      });
      return str;
    }

    // GET has the information in the URL
    if (
      details.method === "GET" &&
      (details.type === "image" ||
        details.type === "xmlhttprequest" ||
        details.type === "sub_frame") &&
      !details.url.includes("dataLayer_inspector_fetch")
    ) {
      if (!details.url.includes("www.googletagmanager.com")) {
        msg = JSON.stringify(convert_protocol_to_object(details.url));
      }
    } else if (details.method === "GET" && details.type === "script") {
      if (observed.brand != "Google") {
        msg = JSON.stringify(convert_protocol_to_object(details.url));
        // We don't want scripts without data
        if ((msg = "{}")) msg = undefined; // Setting msg to undefined means there is no data1
      } else if (
        details.url.includes("www.googletagmanager.com") ||
        details.url.includes("www.google-analytics.com/gtm/js?id=GTM")
      ) {
        let gtm_obj = convert_protocol_to_object(details.url);
        gtm_obj.response = details;
        const gtm = JSON.stringify(gtm_obj);
        if (details.tabId >= 0) {
          setTimeout(() => {
            chrome.tabs.sendMessage(details.tabId, {
              gtm,
            });
          }, 1000);
        }
      }
    } else if (
      details.method === "POST" &&
      ((details.type === "xmlhttprequest" && !(observed.brand === "Google")) ||
        details.type === "sub_frame")
    ) {
      if (request && request.requestBody) {
        // The request body is pretty mangled
        var postedString = undefined;
        if (request.requestBody.raw) {
          postedString = request.requestBody.raw[0]
            ? extract_raw(request.requestBody.raw)
            : "No POST Request Body";
          if (postedString != "No POST Request Body") {
            const url_data = details.url.includes("?")
              ? convert_protocol_to_object(details.url)
              : { url: details.url };
            const posted_data =
              postedString.includes("=") && postedString.includes("&")
                ? convert_protocol_to_object(postedString)
                : JSON.parse(postedString);
            msg = JSON.stringify({ ...posted_data, ...url_data });
          }
        } else if (request.requestBody.formData) {
          Object.keys(request.requestBody.formData).forEach((k) => {
            if (Array.isArray(request.requestBody.formData[k]))
              request.requestBody.formData[k] =
                request.requestBody.formData[k].join();
          });
          msg = JSON.stringify({
            ...request.requestBody.formData,
            ...convert_protocol_to_object(details.url),
          });
        }
      }
      if (!msg) {
        msg = JSON.stringify(convert_protocol_to_object(details.url));
      }
      // POST ping has the information in the request body
    } else if (
      details.method === "POST" &&
      (details.type === "ping" ||
        (details.type === "xmlhttprequest" && observed.brand === "Google"))
    ) {
      if (request && request.requestBody) {
        // The request body is pretty mangled
        var postedString =
          request.requestBody.raw && request.requestBody.raw[0]
            ? extract_raw(request.requestBody.raw)
            : "No POST Request Body";
        //        msg = JSON.stringify( convert_protocol_to_object( postedString ) );
        //console.log("POST msg:", msg)
        let params = convert_protocol_to_object(details.url);
        if (observed.brand === "Google" && params.v === "2") {
          if (postedString !== "No POST Request Body") {
            let y = postedString;
            y = y.replace(/=/g, '":"');
            y = y.replace(/&/g, '","');
            y = y.replace(/\r/g, "");
            const v2_json =
              '{"events":[{"' + y.split("\n").join('"},{"') + '"}]}';
            msg = JSON.stringify({ ...JSON.parse(v2_json), ...params });
            //console.log(msg);
          } else {
            //console.log("No POST Request Body");
            msg = JSON.stringify({
              ...params,
            });
          }
        } else {
          if (postedString !== "No POST Request Body") {
            msg = JSON.stringify({
              ...convert_protocol_to_object(postedString),
              ...params,
            });
          } else {
            // UA Pageview is a POST request and will end up here
            msg = JSON.stringify({
              ...params,
            });
          }
        }
      } else {
        //console.log("No request body");
        // Single (non-batched) GA4 hits will end up here
        msg = JSON.stringify(convert_protocol_to_object(details.url));
        // console.log(msg);
      }
    } else {
      // console.log(details);
    }
    // Don't want to keep a bunch of old messages
    if (requests.length > 500) requests = requests.slice(requests.length - 250);
    if (processedMessages.length > 500)
      processedMessages = processedMessages.slice(
        processedMessages.length - 250
      );
    if (msg && chrome.tabs && details.tabId >= 0) {
      // console.log( "~ brand:", observed, "sendMessage", details.tabId, {
      //   msg: msg,
      //   request: JSON.stringify( request ),
      //   statusCode: details.statusCode,
      //   details: details
      // } );
      // console.log('msg:', msg)
      if (observed.brand === "mParticle") {
        // console.log('parsed:', JSON.parse(unescape(msg)))
        // debugger
      }
      // function isSS(settings, details) {
      //   // regex
      //   if (details.url) {
      //   } else {
      //     return undefined;
      //   }
      // }
      // console.log("~~~~~~ processMessage - some object:", {
      //   tab: details.tabId,
      //   msg: msg,
      //   request: JSON.stringify(request),
      //   brand: observed.brand ? observed.brand : undefined,
      //   // statusCode: details.statusCode,
      //   //ss: settings && details.url.includes(settings.gtmss_subdomain) || undefined,
      //   details: details,
      // });
      //console.log("Sending message", msg);
      chrome.tabs
        .sendMessage(details.tabId, {
          source: "net.js:processMessage.has_tab_id",
          msg: msg,
          request: JSON.stringify(request),
          brand: observed.brand ? observed.brand : undefined,
          // statusCode: details.statusCode,
          //ss: settings && details.url.includes(settings.gtmss_subdomain) || undefined,
          details: details,
        })
        .catch(caught_promise_error);
    } else {
      //console.log("tabs:", chrome.tabs, "msg:", msg, "requests:", requests, "request:", request, "observed.brand:", observed.brand, "details:", details)
      if (msg && msg != "{}") {
        chrome.tabs.query({ url: "https://*/*" }, (x) => {
          // If the tab host matches the initiator host,
          // Send a special message that says this hit came from a service worker
          // If brand is google and the dl matches the url of the tab, indicate that it probably is related to this tab, but could be related to another if there is a tab with the same URL open.
          //console.log("tabs:", x)
          const tabs = x.filter((t) => {
            return t.active && t.url.includes(details.initiator);
          });
          //console.log("tabs.filtered:", tabs)
          let msg_obj = JSON.parse(msg);
          msg_obj.sent_by_service_worker = true;
          tabs.forEach((t) => {
            console.log(msg_obj.dl, t.url);
            let page = msg_obj.dl;
            if (msg_obj.dp) {
              // update
              page =
                page.match(
                  /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/
                )[0] + msg_obj.dp;
            }
            if (!page || page === t.url) {
              console.log("Sending message", msg_obj);
              chrome.tabs
                .sendMessage(t.id, {
                  source: "net.js:processMessage.no_tab_id",
                  msg: JSON.stringify(msg_obj),
                  request: JSON.stringify(request),
                  brand: observed.brand ? observed.brand : undefined,
                  // statusCode: details.statusCode,
                  details: details,
                })
                .catch(caught_promise_error);
            }
          });
        });
      }
      //console.log("Didn't Send Message", details.tabId, {msg: msg, statusCode: details.statusCode})
    }
  }
}

function convert_protocol_to_object(payload) {
  if (payload.includes("://") && !payload.includes("?")) return {};
  var parameters = payload;
  // if the payload is a URL with passed parameters
  if (payload.indexOf("?") >= 0) parameters = payload.split("?")[1];
  var items = parameters.split("&");
  var msg = {};
  for (var i = 0; i < items.length; i++) {
    var item = items[i].split("=");
    try {
      msg[item[0]] = decodeURIComponent(item[1]);
    } catch (e) {
      setTimeout(console.error.bind(console.error, e, item[1]), 1);
    }
  }

  //  console.log("convert_protocol_to_object:", msg)
  return msg;
}

/** - background_ctrl.js - Application controller
Manages badge and local storage
*/

// This console.log is vieawble while inspecting the background.
console.log("background_ctrl.js");

// Controls whether the badge is visible or not
let badge_visible = false;
// Controls whether the badge is flashing or not.
let flashingBadge = false;

/* flashBadge
Sets the badge text to NEW or nothing every second
*/
function flashBadge() {
  if (!flashingBadge) return;
  badge_visible = !badge_visible;
  chrome.action.setBadgeText({ text: badge_visible ? "NEW" : "" });
  chrome.action.setBadgeBackgroundColor({ color: "#02806D" });
  console.log("flashBadge", badge_visible);
  setTimeout(function () {
    flashBadge();
  }, 1000);
}

/** getBytesInUse
Initial funtion to determine if this is a new installation or not.
If there is not Control Data, flash the badge,
otherwise get the control data and set the badge.

*/
chrome.storage.local.getBytesInUse("gaControlData", function (r) {
  if (r === 0) {
    console.log("chrome.storage.local.getBytesInUse");
    setTimeout(function () {
      chrome.action.setBadgeText({ text: "New" });
      flashingBadge = true;
      flashBadge();
    }, 1000);
  } else {
    chrome.storage.local.get("gaControlData", setBadge);
  }
});

/** setBadge - Modifies the badge based on the settings
@param - settings - These are the setting saved by the Popup_Main.js
ON, OFF, Push, CODE, GTM, GTM+
Classic Mode or not - black v. green

*/
function setBadge(settings) {
  flashingBadge = false;
  var ctrl = settings.gaControlData;
  //intercept = ctrl ? ctrl.injectingGTM || ctrl.inspectingDataLayer : false;
  intercept = ctrl ? ctrl.inspectingDataLayer : false;
  blocking = ctrl.blockScript;
  if (blocking) setup_script_blocking(ctrl.blocking);
  if (intercept) setup_intercept(settings);
  var badgeText = ctrl.inspectingDataLayer ? "ON" : "OFF";
  var inspectColor = ctrl.classicMode ? "#353535" : "#02806D";
  var color = ctrl.inspectingDataLayer ? inspectColor : "#848484";
  var title = "Adswerve dataLayer Inspector+";
  badgeText =
    ctrl.inspectingDataLayer &&
    !ctrl.classicMode &&
    (//ctrl.injectingGTM ||
      ctrl.injectingDataLayer ||
      ctrl.hideTiming || // Really Show Timing
      ctrl.injectCode ||
      ctrl.blockScript ||
      ctrl.ignoreProperties ||
      ctrl.ignoreEvents)
      ? badgeText + "+"
      : badgeText;
  if (ctrl.injectCode || ctrl.blockScript) {
    badgeText = "CODE";
    color = "#E10042";
    title = "Adswerve dataLayer Inspector+ - Injecting code into page";
  } /*else if (
    ctrl.injectingGTM &&
    ctrl.injectingDataLayer &&
    ctrl.inspectingDataLayer
  ) {
    badgeText = "GTM+";
    color = "#FF8324";
    title =
      "Adswerve dataLayer Inspector+ - Inserting GTM & " + ctrl.dataLayerName;
  }*/ else if (ctrl.inspectingDataLayer && ctrl.injectingDataLayer) {
    badgeText = "PUSH";
    color = "#2EC5FF";
    title = "Adswerve dataLayer Inspector+ - Inserting " + ctrl.dataLayerName;
  } /*else if (ctrl.inspectingDataLayer && ctrl.injectingGTM) {
    badgeText = "GTM";
    color = "#653D62";
    title =
      "Adswerve dataLayer Inspector+ - Injecting GTM and inspecting " +
      ctrl.dataLayerName;
  }*/

  chrome.action.setTitle({ title: title });
  chrome.action.setBadgeText({ text: badgeText });
  chrome.action.setBadgeBackgroundColor({ color: color });
}

/*  set listener to update the badge based on the inspector action
Called after saving the control data.

*/
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.inspector_action === "updateBadge") {
    chrome.storage.local.get("gaControlData", setBadge);
    sendResponse();
    return true;
  } else if (request.inspector_action === "save_settings") {
    chrome.storage.local.get("gaControlData", setBadge);
    sendResponse();
    return true;
  }
  sendResponse();
});

// chrome.identity.getProfileUserInfo((result) => {
//   console.log("result:", result)
// })

// chrome.action.onClicked.addListener(function(tab) {
//   chrome.storage.local.get('main_window',
//   (result)=> {
//     console.log('main_window.result', result)
//     if (!result.main_window || !result.main_window.windowId) {
//       create_main_win()
//     } else {
//       activate_main_win(result.main_window.windowId)
//     }
//   })
// });

// function create_main_win() {
//   console.log("create_main_win")
//   chrome.windows.create({
//     url: "Popup_Main.html" ,
//     type: "panel",
//     top: 100,
//     left: 500,
//     width:350,
//     height:600
//   }).then((win) => {
//     chrome.storage.local.set({'main_window': { windowId: win.id }} );
//     console.log("create_main_win.window", { windowId: win.id })
//   });

// }

// function activate_main_win(windowId){
//   try {
//     console.log("activate_main_win.update", windowId)
//     chrome.windows.update(
//       windowId,
//       {
//         drawAttention : true,
//         focused: true
//       }
//     ).catch(() => {
//       create_main_win()
//     })
//   } catch (e) {
//     console.log("activate_main_win.error")
//     chrome.storage.local.set({'main_window': { windowId: undefined }} ).then(()=> {
//       create_main_win()
//     });
//   }
// }

/*
  https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension/
*/

let lifeline;

keepAlive();

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "keepAlive") {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});

function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

async function keepAlive() {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: "*://*/*" })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: "keepAlive" }),
        // `function` will become `func` in Chrome 93+
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId, info, tab) {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
}
