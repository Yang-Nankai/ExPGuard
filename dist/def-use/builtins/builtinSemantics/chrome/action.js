"use strict";
// ======================================================
// chrome.action
// https://developer.chrome.com/docs/extensions/reference/api/action
// ======================================================
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// chrome.action.disable
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.action.disable",
    sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_DISABLE_TABID" }],
    callbackIndex: 1,
});
// chrome.action.enable
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.action.enable",
    sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_ENABLE_TABID" }],
    callbackIndex: 1,
});
// chrome.action.openPopup
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.action.openPopup",
    callbackIndex: 0,
});
// chrome.action.setBadgeText
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.action.setBadgeText",
    sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_BADGE_OPTIONS" }],
    callbackIndex: 1,
});
// chrome.action.setIcon
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.action.setIcon",
    sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_ICON_OPTIONS" }],
    callbackIndex: 1,
});
// chrome.action.setPopup
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.action.setPopup",
    sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_POPUP_OPTIONS" }],
    callbackIndex: 1,
});
// chrome.action.setTitle
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.action.setTitle",
    sinkArgs: [{ index: 0, sinkType: "CHROME_ACTION_TITLE_OPTIONS" }],
    callbackIndex: 1,
});
