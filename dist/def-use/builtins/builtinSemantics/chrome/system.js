"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("../index");
const utils_2 = require("../utils");
// --------------------- chrome.system -------------------
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.system.cpu.getInfo",
    callbackIndex: 0,
    sourceType: "CHROME_SYSTEM_CPU",
    createReturnDef: (callNode) => index_1.defFactory.createUnknownDef(callNode),
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.system.display.getDisplayLayout",
    callbackIndex: 0,
    sourceType: "CHROME_SYSTEM_DISPLAY_LAYOUT",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_SYSTEM_DISPLAY_LAYOUT"),
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.system.display.getInfo",
    callbackIndex: 0,
    sourceType: "CHROME_SYSTEM_DISPLAY",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_SYSTEM_DISPLAY"),
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.system.memory.getInfo",
    callbackIndex: 0,
    sourceType: "CHROME_SYSTEM_MEMORY",
    createReturnDef: (callNode) => index_1.defFactory.createUnknownDef(callNode),
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.system.storage.getInfo",
    callbackIndex: 0,
    sourceType: "CHROME_SYSTEM_STORAGE",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_SYSTEM_STORAGE"),
});
