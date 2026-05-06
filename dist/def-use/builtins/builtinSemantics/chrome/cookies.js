"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("../index");
const utils_2 = require("../utils");
// --------------------- chrome.cookies -------------------
// chrome.cookies.getAll
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.cookies.getAll",
    callbackIndex: 1,
    sourceType: "CHROME_COOKIES_INFO",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_COOKIES_INFO"),
});
// chrome.cookies.get
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.cookies.get",
    callbackIndex: 1,
    sourceType: "CHROME_COOKIES_INFO",
    createReturnDef: (callNode) => index_1.defFactory.createUnknownDef(callNode),
});
// chrome.cookies.getAllCookieStores
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.cookies.getAllCookieStores",
    callbackIndex: 0,
    sourceType: "CHROME_COOKIES_STORE",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_COOKIES_STORE"),
});
// chrome.cookies.set
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.cookies.set",
    sinkArgs: [{ index: 0, sinkType: "CHROME_COOKIES_SET_OPTIONS" }],
    callbackIndex: 1,
});
// chrome.cookies.remove
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.cookies.remove",
    sinkArgs: [{ index: 0, sinkType: "CHROME_COOKIES_REMOVE_OPTIONS" }],
    callbackIndex: 1,
});
// ----------------------  chrome.cookies.onChanged.addListener
(0, utils_1.createChromeEventListenerSemantics)({
    apiName: "chrome.cookies.onChanged.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_COOKIES_ONCHANGED",
    paramDefs: [
        (callNode) => index_1.defFactory.createUnknownDef(callNode), // changeInfo
    ],
});
