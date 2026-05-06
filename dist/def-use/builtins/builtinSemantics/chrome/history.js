"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("../index");
const utils_2 = require("../utils");
// --------------------- chrome.history -------------------
// chrome.history.search
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.history.search",
    callbackIndex: 1,
    sourceType: "CHROME_HISTORY_INFO",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_HISTORY_INFO"),
});
// chrome.history.getVisits
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.history.getVisits",
    callbackIndex: 0,
    sourceType: "CHROME_HISTORY_INFO",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_HISTORY_INFO"),
});
// chrome.history.addUrl
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.history.addUrl",
    sinkArgs: [{ index: 0, sinkType: "CHROME_HISTORY_ADD_URL" }], // url info
    callbackIndex: 1,
});
// chrome.history.deleteRange
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.history.deleteRange",
    sinkArgs: [{ index: 0, sinkType: "CHROME_HISTORY_DELETE_RANGE" }], // startTime, endTime
    callbackIndex: 1,
});
// chrome.history.deleteUrl
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.history.deleteUrl",
    sinkArgs: [{ index: 0, sinkType: "CHROME_HISTORY_DELETE_URL" }], // url
    callbackIndex: 1,
});
// ------------------------ chrome.history.onVisited.addListener
(0, utils_1.createChromeEventListenerSemantics)({
    apiName: "chrome.history.onVisited.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_HISTORY_ONVISITED",
    paramDefs: [
        (callNode) => index_1.defFactory.createUnknownDef(callNode), // delta
    ],
});
