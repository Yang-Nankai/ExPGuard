"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("../index");
const utils_2 = require("../utils");
// --------------------- chrome.management -------------------
// chrome.management.get
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.management.get",
    callbackIndex: 1,
    sourceType: "CHROME_MANAGEMENT_INFO",
    createReturnDef: (callNode) => index_1.defFactory.createUnknownDef(callNode),
});
// chrome.management.getAll
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.management.getAll",
    callbackIndex: 0,
    sourceType: "CHROME_MANAGEMENT_INFO",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_MANAGEMENT_INFO"),
});
// chrome.management.setEnabled
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.management.setEnabled",
    sinkArgs: [
        { index: 0, sinkType: "CHROME_MANAGEMENT_SETENABLED_ID" }, // extension id
        { index: 1, sinkType: "CHROME_MANAGEMENT_SETENABLED_FLAG" }, // enable/disable flag
    ],
    callbackIndex: 2,
});
// chrome.management.uninstall
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.management.uninstall",
    sinkArgs: [{ index: 0, sinkType: "CHROME_MANAGEMENT_UNINSTALL_ID" }], // extension id
    callbackIndex: 1,
});
// chrome.management.launchApp
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.management.launchApp",
    sinkArgs: [{ index: 0, sinkType: "CHROME_MANAGEMENT_LAUNCHAPP_ID" }], // app id
    callbackIndex: 1,
});
(0, utils_1.createChromeEventListenerSemantics)({
    apiName: "chrome.management.onEnabled.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_MANAGEMENT_ONENABLED",
    paramDefs: [
        (callNode) => index_1.defFactory.createUnknownDef(callNode), // ExtensionInfo
    ],
});
(0, utils_1.createChromeEventListenerSemantics)({
    apiName: "chrome.management.onDisabled.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_MANAGEMENT_ONDISABLED",
    paramDefs: [
        (callNode) => index_1.defFactory.createUnknownDef(callNode), // ExtensionInfo
    ],
});
(0, utils_1.createChromeEventListenerSemantics)({
    apiName: "chrome.management.onInstalled.addListener",
    sourceIndexes: [0],
    sourceType: "CHROME_MANAGEMENT_ONINSTALLED",
    paramDefs: [
        (callNode) => index_1.defFactory.createUnknownDef(callNode), // ExtensionInfo
    ],
});
