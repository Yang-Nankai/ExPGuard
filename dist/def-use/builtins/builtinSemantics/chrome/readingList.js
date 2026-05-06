"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const utils_2 = require("../utils");
// --------------------- chrome.readingList -------------------
// chrome.readingList.query
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.readingList.query",
    callbackIndex: 1,
    sourceType: "CHROME_READINGLIST_INFO",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_READINGLIST_INFO"),
});
// chrome.readingList.addEntry
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.readingList.addEntry",
    sinkArgs: [{ index: 0, sinkType: "CHROME_READINGLIST_ADD_OPTIONS" }], // {url, title, hasBeenRead}
    callbackIndex: 1,
});
// chrome.readingList.removeEntry
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.readingList.removeEntry",
    sinkArgs: [{ index: 0, sinkType: "CHROME_READINGLIST_REMOVE_URL" }], // url
    callbackIndex: 1,
});
// chrome.readingList.updateEntry
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.readingList.updateEntry",
    sinkArgs: [{ index: 0, sinkType: "CHROME_READINGLIST_UPDATE_OPTIONS" }], // {url, title, hasBeenRead}
    callbackIndex: 1,
});
