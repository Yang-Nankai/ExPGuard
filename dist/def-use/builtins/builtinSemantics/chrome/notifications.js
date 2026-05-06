"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// --------------------- chrome.notifications -------------------
// chrome.notifications.create
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.notifications.create",
    sinkArgs: [{ index: 0, sinkType: "CHROME_NOTIFICATIONS_CREATE_OPTIONS" }], // notification id 或 options
    callbackIndex: 1,
});
// chrome.notifications.update
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.notifications.update",
    sinkArgs: [{ index: 0, sinkType: "CHROME_NOTIFICATIONS_UPDATE_ID" }, // notification id
        { index: 1, sinkType: "CHROME_NOTIFICATIONS_UPDATE_OPTIONS" }], // options
    callbackIndex: 2,
});
// chrome.notifications.clear
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.notifications.clear",
    sinkArgs: [{ index: 0, sinkType: "CHROME_NOTIFICATIONS_CLEAR_ID" }], // notification id
    callbackIndex: 1,
});
