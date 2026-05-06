"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// --------------------- chrome.declarativeContent -------------------
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.declarativeContent.onPageChanged.addRules",
    sinkArgs: [{ index: 0, sinkType: "CHROME_DECLARATIVECONTENT_RULES" }],
    callbackIndex: 1,
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.declarativeContent.onPageChanged.removeRules",
    sinkArgs: [{ index: 0, sinkType: "CHROME_DECLARATIVECONTENT_RULE_IDS" }],
    callbackIndex: 1,
});
