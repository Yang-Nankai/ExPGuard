import { createChromeBuiltinSemantics, createChromeEventListenerSemantics } from "./utils";
import { defFactory, FlowNode } from "../index";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.bookmarks -------------------

// Existing read-style APIs
["get", "getChildren", "getRecent", "getSubTree", "search"].forEach((name) =>
  createChromeBuiltinSemantics({
    apiName: `chrome.bookmarks.${name}`,
    callbackIndex: 1,
    sourceType: "CHROME_BOOKMARK_INFO",
    createReturnDef: (callNode, astNode) => createArrayInstanceTaint(callNode, astNode, "CHROME_BOOKMARK_INFO"),
  }),
);

createChromeBuiltinSemantics({
  apiName: "chrome.bookmarks.getTree",
  callbackIndex: 0,
  sourceType: "CHROME_BOOKMARK_INFO",
  createReturnDef: (callNode, astNode) => createArrayInstanceTaint(callNode, astNode, "CHROME_BOOKMARK_INFO"),
});

// --------------------- write-style APIs -------------------

// chrome.bookmarks.create
createChromeBuiltinSemantics({
  apiName: "chrome.bookmarks.create",
  sinkArgs: [{ index: 0, sinkType: "CHROME_BOOKMARK_CREATE_INFO" }], // bookmark info object
  callbackIndex: 1,
});

// chrome.bookmarks.move
createChromeBuiltinSemantics({
  apiName: "chrome.bookmarks.move",
  sinkArgs: [
    { index: 0, sinkType: "CHROME_BOOKMARK_MOVE_ID" }, // bookmark id
    { index: 1, sinkType: "CHROME_BOOKMARK_MOVE_DESTINATION" }, // updated info
  ],
  callbackIndex: 1,
});

// chrome.bookmarks.remove
createChromeBuiltinSemantics({
  apiName: "chrome.bookmarks.remove",
  sinkArgs: [{ index: 0, sinkType: "CHROME_BOOKMARK_REMOVE_ID" }], // bookmark id
  callbackIndex: 1,
});

// chrome.bookmarks.removeTree
createChromeBuiltinSemantics({
  apiName: "chrome.bookmarks.removeTree",
  sinkArgs: [{ index: 0, sinkType: "CHROME_BOOKMARK_REMOVE_TREE_ID" }], // bookmark id
  callbackIndex: 1,
});

// chrome.bookmarks.update
createChromeBuiltinSemantics({
  apiName: "chrome.bookmarks.update",
  sinkArgs: [
    { index: 0, sinkType: "CHROME_BOOKMARK_UPDATE_ID" }, // bookmark id
    { index: 1, sinkType: "CHROME_BOOKMARK_UPDATE_INFO" }, // updated info
  ],
  callbackIndex: 2,
});


// ------------------------chrome.bookmarks.onCreated.addListener-----------------
createChromeEventListenerSemantics({
  apiName: "chrome.bookmarks.onCreated.addListener",
  sourceIndexes: [1],
  sourceType: "CHROME_BOOKMARKS_ONCREATED",
  paramDefs: [
    (callNode) => defFactory.createLiteralDef(callNode, "BOOKMARK_ID"), // id
    (callNode) => defFactory.createUnknownDef(callNode), // bookmark
  ],
});