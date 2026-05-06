


// ======================================================
// chrome.action
// https://developer.chrome.com/docs/extensions/reference/api/action
// ======================================================

import { createChromeBuiltinSemantics } from "./utils";

// chrome.action.disable
createChromeBuiltinSemantics({
  apiName: "chrome.action.disable",
  sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_DISABLE_TABID" }],
  callbackIndex: 1,
});

// chrome.action.enable
createChromeBuiltinSemantics({
  apiName: "chrome.action.enable",
  sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_ENABLE_TABID" }],
  callbackIndex: 1,
});

// chrome.action.openPopup
createChromeBuiltinSemantics({
  apiName: "chrome.action.openPopup",
  callbackIndex: 0,
});

// chrome.action.setBadgeText
createChromeBuiltinSemantics({
  apiName: "chrome.action.setBadgeText",
  sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_BADGE_OPTIONS" }],
  callbackIndex: 1,
});

// chrome.action.setIcon
createChromeBuiltinSemantics({
  apiName: "chrome.action.setIcon",
  sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_ICON_OPTIONS" }],
  callbackIndex: 1,
});

// chrome.action.setPopup
createChromeBuiltinSemantics({
  apiName: "chrome.action.setPopup",
  sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_POPUP_OPTIONS" }],
  callbackIndex: 1,
});

// chrome.action.setTitle
createChromeBuiltinSemantics({
  apiName: "chrome.action.setTitle",
  sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_TITLE_OPTIONS" }],
  callbackIndex: 1,
});