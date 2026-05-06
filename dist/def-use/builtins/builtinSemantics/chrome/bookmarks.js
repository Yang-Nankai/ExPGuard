"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("../index");
const utils_2 = require("../utils");
// --------------------- chrome.bookmarks -------------------
// Existing read-style APIs
["get", "getChildren", "getRecent", "getSubTree", "search"].forEach((name) => (0, utils_1.createChromeBuiltinSemantics)({
    apiName: `chrome.bookmarks.${name}`,
    callbackIndex: 1,
    sourceType: "CHROME_BOOKMARK_INFO",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_BOOKMARK_INFO"),
}));
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.bookmarks.getTree",
    callbackIndex: 0,
    sourceType: "CHROME_BOOKMARK_INFO",
    createReturnDef: (callNode, astNode) => (0, utils_2.createArrayInstanceTaint)(callNode, astNode, "CHROME_BOOKMARK_INFO"),
});
// --------------------- write-style APIs -------------------
// chrome.bookmarks.create
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.bookmarks.create",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BOOKMARK_CREATE_INFO" }], // bookmark info object
    callbackIndex: 1,
});
// chrome.bookmarks.move
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.bookmarks.move",
    sinkArgs: [
        { index: 0, sinkType: "CHROME_BOOKMARK_MOVE_ID" }, // bookmark id
        { index: 1, sinkType: "CHROME_BOOKMARK_MOVE_DESTINATION" }, // updated info
    ],
    callbackIndex: 1,
});
// chrome.bookmarks.remove
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.bookmarks.remove",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BOOKMARK_REMOVE_ID" }], // bookmark id
    callbackIndex: 1,
});
// chrome.bookmarks.removeTree
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.bookmarks.removeTree",
    sinkArgs: [{ index: 0, sinkType: "CHROME_BOOKMARK_REMOVE_TREE_ID" }], // bookmark id
    callbackIndex: 1,
});
// chrome.bookmarks.update
(0, utils_1.createChromeBuiltinSemantics)({
    apiName: "chrome.bookmarks.update",
    sinkArgs: [
        { index: 0, sinkType: "CHROME_BOOKMARK_UPDATE_ID" }, // bookmark id
        { index: 1, sinkType: "CHROME_BOOKMARK_UPDATE_INFO" }, // updated info
    ],
    callbackIndex: 2,
});
// ------------------------chrome.bookmarks.onCreated.addListener-----------------
(0, utils_1.createChromeEventListenerSemantics)({
    apiName: "chrome.bookmarks.onCreated.addListener",
    sourceIndexes: [1],
    sourceType: "CHROME_BOOKMARKS_ONCREATED",
    paramDefs: [
        (callNode) => index_1.defFactory.createLiteralDef(callNode, "BOOKMARK_ID"), // id
        (callNode) => index_1.defFactory.createUnknownDef(callNode), // bookmark
    ],
});
