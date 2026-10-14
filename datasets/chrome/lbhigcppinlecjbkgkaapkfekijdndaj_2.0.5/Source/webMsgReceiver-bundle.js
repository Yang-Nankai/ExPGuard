/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 361);
/******/ })
/************************************************************************/
/******/ ({

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constants = __webpack_require__(66);

var SINGLE_URL = _constants.WEB_URL + "/single"; /**
                                                  * This is a content script to communicate with background and with the prospector website
                                                  * Has some chrome API access
                                                  * Lives in the scope of the tab(prospector website)
                                                  */

var BULK_URL = _constants.WEB_URL + "/bulk";
var OTHER_SITE = _constants.WEB_URL + "/website";
var CUSTOM_SITES = _constants.WEB_URL + "/custom";
var ONBOARDING = _constants.WEB_URL + "/start";
var ONBOARDING_COMPLETED = "onboardingCompleted";

var PREVIOUS_DOMAIN = void 0;

function init(url, tabId) {
  localStorage.setItem("_EXT_ID_", chrome.runtime.id);
  var currentUrl = window.location.href;
  var query = currentUrl.split("?")[1];
  if (isOnboardinCompleted()) {
    switch (true) {
      case url && url.indexOf("/login.salesforce.com/") != -1:
        break;
      case url && isLinkedInAdvSrchPage(url):
        currentUrl.indexOf(BULK_URL) == -1 ? window.location.href = BULK_URL : "";
        getAndShowLinkedInBulkData(url, tabId);
        break;
      case url && isSingleProfile(url):
        currentUrl.indexOf(SINGLE_URL) == -1 ? window.location.href = SINGLE_URL + "?" + query : "";
        getAndShowLinkedInSingleProfileData(url, tabId);
        break;
      case currentUrl.indexOf(ONBOARDING) != -1:
        break;
      case !isBlackListedDomain(url):
        if (!isPreviousDomain(url)) {
          PREVIOUS_DOMAIN = getDomain(url);
          currentUrl.indexOf(OTHER_SITE) == -1 ? window.location.href = OTHER_SITE : "";
          getAndShowOtherWebsiteData(url);
        }
        break;
      case !isEmptySection():
        break;
      default:
        currentUrl.indexOf(CUSTOM_SITES) == -1 ? window.location.href = CUSTOM_SITES + "?" + query : "";
        break;
    }
  } else {
    switch (true) {
      case url && isLinkedInAdvSrchPage(url):
        localStorage.setItem(ONBOARDING_COMPLETED, true);
        currentUrl.indexOf(BULK_URL) == -1 ? window.location.href = BULK_URL : "";
        getAndShowLinkedInBulkData(url, tabId);
        break;
      case url && isSingleProfile(url):
        localStorage.setItem(ONBOARDING_COMPLETED, true);
        currentUrl.indexOf(SINGLE_URL) == -1 ? window.location.href = SINGLE_URL + "?" + query : "";
        getAndShowLinkedInSingleProfileData(url, tabId);
        break;
      default:
        currentUrl.indexOf(ONBOARDING) == -1 ? window.location.href = ONBOARDING + "?" + query : "";
        break;
    }
  }
}

function isEmptySection() {
  return window.location.pathname.length < 2;
}

function isSingleProfile(url) {
  return url.indexOf("linkedin.com/in/me/") == -1 && (url.indexOf("linkedin.com/in/") != -1 || url.indexOf("/sales/people/") != -1 || url.indexOf("/sales/lead/") != -1);
}

function isLinkedInAdvSrchPage(url) {
  return url.indexOf("linkedin.com/search/results/") != -1 || url.indexOf("linkedin.com/sales/search/people") != -1 || url.indexOf("linkedin.com/sales/lists/people") != -1;
}

function isOnboardinCompleted() {
  return localStorage.getItem(ONBOARDING_COMPLETED) != null;
}

function passDataToWebScript(data, type, url) {
  window.postMessage({ data: data, type: type }, url);
}

function getAndShowLinkedInBulkData(url, tabId) {
  chrome.runtime.sendMessage({ method: "li-bulk-mode", url: url, tabId: tabId }, function (response) {
    passDataToWebScript(response, "li-bulk-mode", BULK_URL);
  });
  chrome.runtime.sendMessage({ method: "li-user-data", url: url }, function (response) {
    passDataToWebScript(response, "li-user-data", BULK_URL);
  });
}

function getAndShowLinkedInSingleProfileData(url, tabId) {
  chrome.runtime.sendMessage({ method: "li-single-mode", url: url, tabId: tabId }, function (response) {
    passDataToWebScript(response, "li-single-mode", SINGLE_URL);
  });
}
function getAndShowOtherWebsiteData(url) {
  passDataToWebScript(url, "other-website-mode", OTHER_SITE);
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request) {
    switch (request.method) {
      case "isAlreadyLoaded":
        sendResponse(true);
        break;
      case "newTabSwitched":
        if (request.value && request.value.url && request.value.tabId) {
          var _request$value = request.value,
              url = _request$value.url,
              tabId = _request$value.tabId;

          url.indexOf(_constants.WEB_URL) == -1 && init(url, tabId);
          localStorage.setItem("currentWindowUrl", url); // set window url for mixpanel
        }
        break;
      case "linkedinBulkUpdatedData":
        passDataToWebScript(request.value, "li-bulk-mode", _constants.WEB_URL);
        break;
      case "AP_LI_WARNING_MSG":
        passDataToWebScript(request.value, "li-warning", _constants.WEB_URL);
        break;
      case "google_auth_webmsgreceiver":
        passDataToWebScript(request.value, "google_auth_prospector", _constants.WEB_URL);
        break;
    }
  }
});

getBrowserUrlAndLoadRespectiveSection();
setBackgroundSpinner();

function setBackgroundSpinner() {
  var div = document.createElement("div");
  div.className = "ad-loading-wrapper";
  div.id = "_init_load_";
  div.innerHTML = "<div class=\"ad-loading-init\">\n    <div class=\"bounce1\"></div>\n    <div class=\"bounce2\"></div>\n    <div class=\"bounce3\"></div>\n  </div>";
  document.body.appendChild(div);
}

function getBrowserUrlAndLoadRespectiveSection() {
  chrome.runtime.sendMessage({ method: "getCurrentUrl" }, function (response) {
    var url = response.url,
        tabId = response.tabId;

    init(url, tabId);
  });
}

function isBlackListedDomain(url) {
  var domain = getDomain(url);
  if (domain && domain.indexOf(".") == -1) {
    return true;
  } else if (domain && hasSubdomain(domain)) {
    domain = domain.replace(/^[^.]+\./g, "");
  }
  var blackListedUrls = ["linkedin.com", "adapt.io", "adaptqe.com", "google.co.uk", "google.com", "google.co.in", "facebook.com", "youtube.com", "mailtester.com", "verifyemailaddress.org", "neverbounce.com", "whatsapp.com"];
  return blackListedUrls.indexOf(domain) != -1;
}
function getDomain(website) {
  try {
    var url = new URL(website);
    return url.host.replace("www.", "");
  } catch (e) {
    return null;
  }
}
function hasSubdomain(domain) {
  var parts = domain.split(".");
  return parts.length > 2 && parts[1].length > 3;
}
function isPreviousDomain(url) {
  return PREVIOUS_DOMAIN == getDomain(url);
}

function getCurrentMode() {
  return new Promise(function (resolve) {
    chrome.runtime.sendMessage({ method: "_IS_LEAD_MODE_" }, function (modeVal) {
      resolve(modeVal);
    });
  });
}

function updateDockModeOnHeader(dockModeType) {
  var url = window.location.href;
  passDataToWebScript(dockModeType, "dockModeType", url);
}

function toggleDockMode(modeType) {
  var NEW_MODE = "TURN-ON-NORMAL-MODE";
  if (modeType == "right-dock") {
    NEW_MODE = "TURN-ON-NORMAL-MODE";
  } else if (modeType == "left-dock") {
    NEW_MODE = "TURN-ON-LEAD-MODE";
  } else if (modeType == "pin-dock") {
    NEW_MODE = "TURN-ON-PIN-MODE";
  }
  chrome.runtime.sendMessage({ method: NEW_MODE }, function (response) {
    updateDockModeOnHeader(modeType);
  });
}
getCurrentMode().then(function (dockType) {
  updateDockModeOnHeader(dockType);
});

window.addEventListener("message", function (ev) {
  if (ev && ev.data && ev.data.type) {
    switch (ev.data.type) {
      case "toggle-dock":
        var _ev$data$mode = ev.data.mode,
            mode = _ev$data$mode === undefined ? "right-dock" : _ev$data$mode;

        toggleDockMode(mode);
        break;
      case "ONBOARDING_CLICKED":
        sendMsgToBg("ONBOARDING_CLICKED");
        break;
      case "CLICKING_FOLLOW_BTN":
        chrome.storage.local.set({ isLiFollowed: true });
        break;
      case "ALREADY_LI_FOLLOWED":
        chrome.storage.local.set({ isAlreadyLiFollowed: true });
        break;
      case "PASS_MX_ID_BG":
        sendMsgToBg("SET_MX_ID_ALIAS", ev.data.data);
        break;
      case "CHECK_PIN_OPTION_ENABLED":
        var url = window.location.href;
        passDataToWebScript(true, "PIN_OPTION_ENABLED", url);
        break;
    }
  }
}, true);

function sendMsgToBg(msg) {
  chrome.runtime.sendMessage({ method: msg });
}

setTimeout(function () {
  checkAndloadLiFollowerCount();
}, 1000);

function checkAndloadLiFollowerCount() {
  chrome.storage.local.get("isLiFollower", function (result) {
    window.postMessage({ data: result.isLiFollower, type: "li-follower-status" }, "*");
  });
}

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BASE_URL = exports.BASE_URL = void 0;
var PORT = exports.PORT = void 0;
// export let SF_API_ID;
// let clientId =
//   "314045489787-mn1d1l9kgb67ed5js7haedr6bmbg33aa.apps.googleusercontent.com";
var MX_PANEL_KEY = exports.MX_PANEL_KEY = "f8e57d35bafd760bcec71d6133605a11";

// export let isLogingAllowed = true;
// export let SALESGEAR_EXT_ID = "nbmmhcmajjdfjobnmgnkbdhfpnbhpkef";
var CHROME_EXT_URL = exports.CHROME_EXT_URL = "https://chrome.google.com/webstore/detail/adapt-prospector-find-ema/lbhigcppinlecjbkgkaapkfekijdndaj?hl=en-US";

var WEB_URL = exports.WEB_URL = "http://localhost:8081";
if (false) {
  exports.BASE_URL = BASE_URL = "https://www.adaptqe.com";
  exports.PORT = PORT = "";
  // SF_API_ID =
  //   "3MVG9szVa2RxsqBankqRLSPw8Wu1l18xI6TJs6yuRNiOOTN18gUrEWZCMYJMTut0o11KPKj1bkU8GyKEKV_Pg";
  exports.WEB_URL = WEB_URL = "https://prospector.adaptqe.com";
} else if (false) {
  exports.BASE_URL = BASE_URL = "http://localhost";
  exports.PORT = PORT = ":8080";
  // SF_API_ID =
  //   "3MVG9szVa2RxsqBankqRLSPw8WqYRKhApgxv.dhP7v5XHA3WQEVgZyFB30jnEloDMb76N6qq8ibEhmGnIUGIg";
} else if (false) {
  exports.BASE_URL = BASE_URL = "http://192.168.0.160";
  exports.PORT = PORT = ":8080";
  // SF_API_ID =
  //   "3MVG9szVa2RxsqBankqRLSPw8WqYRKhApgxv.dhP7v5XHA3WQEVgZyFB30jnEloDMb76N6qq8ibEhmGnIUGIg";
} else {
  exports.WEB_URL = WEB_URL = "https://prospector.adapt.io";
  // SALESGEAR_EXT_ID = "nbmmhcmajjdfjobnmgnkbdhfpnbhpkef"; //prod id to be replaced
  // isLogingAllowed = false;
  exports.BASE_URL = BASE_URL = "https://www.adapt.io";
  exports.WEB_URL = WEB_URL = "https://prospector.adapt.io";
  exports.PORT = PORT = "";
  // clientId =
  //   "914415660231-cslir602189b70r8racu4jopu7gokace.apps.googleusercontent.com";
  // SF_API_ID =
  //   "3MVG9uudbyLbNPZOzwvnIIHrt0TbfVFUnXhpoH9AbEv7GsVaqnyv4oTzVSMD.iLZcZEniYjZfzGOuGHmcvtlj";
  exports.MX_PANEL_KEY = MX_PANEL_KEY = "dbc42f15543c1eef23f00b8931511463";
}

var LI_URL = exports.LI_URL = "linkedin.com";
var SALES_NAV_URL = exports.SALES_NAV_URL = "linkedin.com/sales/people/";
var SALES_NAV_URL_NEW = exports.SALES_NAV_URL_NEW = "linkedin.com/sales/lead/";
var SALES_NAV_SEARCH_URL = exports.SALES_NAV_SEARCH_URL = "linkedin.com/sales/search/people";
var LINKEDIN_URL = exports.LINKEDIN_URL = "linkedin.com/in/";
var SF_URL = exports.SF_URL = "salesforce.com";

//FAQ Page

var LINKEDIN_SITE = exports.LINKEDIN_SITE = "https://www.linkedin.com";

var LOGGED_IN = exports.LOGGED_IN = "loggedIn";
var LOGGED_OUT = exports.LOGGED_OUT = "loggedOut";

/* Mixpanel for Campaign manager */
var IS_SALESGEAR_INSTALLED = exports.IS_SALESGEAR_INSTALLED = "isSalesgearInstalled";

var GOOGLE_AUTH_URL = exports.GOOGLE_AUTH_URL = "https://accounts.google.com/signin/oauth";
var ONBOARDING_LI_PROFILE_URL = exports.ONBOARDING_LI_PROFILE_URL = "https://www.linkedin.com/in/pradeep-muruganandam-562906171/";

/***/ })

/******/ });