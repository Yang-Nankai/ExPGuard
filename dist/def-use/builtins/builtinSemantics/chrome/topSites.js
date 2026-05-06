"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const utils_2 = require("../utils");
// --------------------- chrome.topSites -------------------
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.topSites.get",
    callbackIndex: 0,
    sourceType: "CHROME_TOPSITES_INFO",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_TOPSITES_INFO"),
});
