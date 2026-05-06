"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const utils_2 = require("../utils");
// --------------------- chrome.fontSettings -------------------
// chrome.fontSettings.setFont
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.fontSettings.setFont",
    sinkArgs: [{ index: 0, sinkType: "CHROME_FONTSETTINGS_SET_OPTIONS" }],
    callbackIndex: 1,
});
// chrome.fontSettings.getFontList
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.fontSettings.getFontList",
    callbackIndex: 0,
    sourceType: "CHROME_FONTSETTINGS_FONTLIST",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_FONTSETTINGS_FONTLIST"),
});
// chrome.fontSettings.setDefaultFontSize
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.fontSettings.setDefaultFontSize",
    sinkArgs: [{ index: 0, sinkType: "CHROME_FONTSETTINGS_SIZE_OPTIONS" }],
    callbackIndex: 1,
});
