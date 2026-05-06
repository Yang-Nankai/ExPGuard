"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("../index");
// --------------------- chrome.identity -------------------
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.identity.getAuthToken",
    callbackIndex: 1,
    sourceType: "CHROME_IDENTITY_TOKEN",
    createReturnDef: (callNode) => index_1.defFactory.createUnknownDef(callNode),
});
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.identity.getProfileUserInfo",
    callbackIndex: 1,
    sourceType: "CHROME_IDENTITY_PROFILE",
    createReturnDef: (callNode) => index_1.defFactory.createUnknownDef(callNode),
});
