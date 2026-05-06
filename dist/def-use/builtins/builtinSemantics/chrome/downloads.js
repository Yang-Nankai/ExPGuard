"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("../index");
const utils_2 = require("../utils");
// --------------------- chrome.downloads -------------------
// chrome.downloads.search
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.downloads.search",
    callbackIndex: 1,
    sourceType: "CHROME_DOWNLOADS_SEARCH",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_DOWNLOADS_SEARCH"),
});
// chrome.downloads.getFileIcon
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.downloads.getFileIcon",
    callbackIndex: 2,
    sourceType: "CHROME_DOWNLOADS_FILEICON",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_DOWNLOADS_FILEICON"),
});
// chrome.downloads.download
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.downloads.download",
    sinkArgs: [{ index: 0, sinkType: "CHROME_DOWNLOADS_OPTIONS" }], // options 包含 url, filename 等
    callbackIndex: 1,
});
// chrome.downloads.removeFile
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.downloads.removeFile",
    sinkArgs: [{ index: 0, sinkType: "CHROME_DOWNLOADS_REMOVE_ID" }], // fileId
    callbackIndex: 1,
});
// ----------------------- chrome.downloads.onChanged.addListener
(0, utils_1.createChromeEventListenerSemantics)({
    apiName: "chrome.downloads.onChanged.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_DOWNLOADS_ONCHANGED",
    paramDefs: [
        (callNode) => index_1.defFactory.createUnknownDef(callNode), // delta
    ],
});
// ------------------------ chrome.downloads.onCreated.addListener
(0, utils_1.createChromeEventListenerSemantics)({
    apiName: "chrome.downloads.onCreated.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_DOWNLOADS_ONCREATED",
    paramDefs: [
        (callNode) => index_1.defFactory.createUnknownDef(callNode), // delta
    ],
});
