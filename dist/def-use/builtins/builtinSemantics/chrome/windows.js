"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// --------------------- chrome.windows -------------------
// chrome.windows.create
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.windows.create",
    sinkArgs: [{ index: 0, sinkType: "CHROME_WINDOWS_CREATE_OPTIONS" }],
    callbackIndex: 1,
});
// chrome.windows.update
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.windows.update",
    sinkArgs: [
        { index: 1, sinkType: "CHROME_WINDOWS_UPDATE_OPTIONS" },
    ],
    callbackIndex: 2,
});
