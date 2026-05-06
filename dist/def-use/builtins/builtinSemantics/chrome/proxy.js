"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// --------------------- chrome.proxy -------------------
// chrome.proxy.settings.set
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.proxy.settings.set",
    sinkArgs: [{ index: 0, sinkType: "CHROME_PROXY_SETTINGS_SET" }], // proxy settings object
    callbackIndex: 1,
});
