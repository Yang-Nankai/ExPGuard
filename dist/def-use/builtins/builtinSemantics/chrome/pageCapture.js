"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("../index");
// --------------------- chrome.pageCapture -------------------
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.pageCapture.saveAsMHTML",
    callbackIndex: 1,
    sourceType: "CHROME_PAGECAPTURE_MHTML",
    createReturnDef: (callNode) => index_1.defFactory.createUnknownDef(callNode),
});
