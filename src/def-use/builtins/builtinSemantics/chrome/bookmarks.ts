import { createChromeBuiltinSemantics, createChromeEventListenerSemantics } from "./utils";
import { defFactory, FlowNode, extractConfigLiteral, literalOuter } from "../index";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.bookmarks -------------------

// Existing read-style APIs. Tag with the query / id read where available.
["get", "getChildren", "getRecent", "getSubTree", "search"].forEach((name) =>
  createChromeBuiltinSemantics({
    apiName: `chrome.bookmarks.${name}`,
    callbackIndex: 1,
    sourceType: "CHROME_BOOKMARK_INFO",
    createReturnDef: (callNode, astNode) => createArrayInstanceTaint(callNode, astNode, "CHROME_BOOKMARK_INFO"),
    remarkFromArgs: (args) => {
      // search({query}) / search("text") / get(id)
      const q = extractConfigLiteral(args[0], ["query"]) ?? literalOuter(args[0]);
      return q !== undefined ? `bookmarks.${name}('${q}')` : `bookmarks.${name}`;
    },
  }),
);

createChromeBuiltinSemantics({
  apiName: "chrome.bookmarks.getTree",
  callbackIndex: 0,
  sourceType: "CHROME_BOOKMARK_INFO",
  createReturnDef: (callNode, astNode) => createArrayInstanceTaint(callNode, astNode, "CHROME_BOOKMARK_INFO"),
  remarkFromArgs: () => "bookmarks.getTree",
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