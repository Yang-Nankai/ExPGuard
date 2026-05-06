"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// --------------------- chrome.browsingData -------------------
// General remove APIs
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.remove",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "remove" }], // removal options object
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeAppcache",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "appCache" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeCache",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "cache" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeCacheStorage",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "cacheStorage" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeCookies",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "cookies" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeDownloads",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "downloads" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeFileSystems",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "fileSystems" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeFormData",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "formData" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeHistory",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "history" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeIndexedDB",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "indexedDB" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeLocalStorage",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "localStorage" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removePasswords",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "passwords" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeServiceWorkers",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "serviceWorkers" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.browsingData.removeWebSQL",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BROWSINGDATA_REMOVE", remark: "webSQL" }],
    callbackIndex: 1,
});
