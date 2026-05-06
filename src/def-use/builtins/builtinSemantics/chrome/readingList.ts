import { createChromeBuiltinSemantics } from "./utils";
import { DefFactory } from "../index";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.readingList -------------------

// chrome.readingList.query
createChromeBuiltinSemantics({
  apiName: "chrome.readingList.query",
  callbackIndex: 1,
  sourceType: "CHROME_READINGLIST_INFO",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_READINGLIST_INFO"),
});

// chrome.readingList.addEntry
createChromeBuiltinSemantics({
  apiName: "chrome.readingList.addEntry",
  sinkArgs: [{ index: 0, sinkType: "CHROME_READINGLIST_ADD_OPTIONS" }], // {url, title, hasBeenRead}
  callbackIndex: 1,
});

// chrome.readingList.removeEntry
createChromeBuiltinSemantics({
  apiName: "chrome.readingList.removeEntry",
  sinkArgs: [{ index: 0, sinkType: "CHROME_READINGLIST_REMOVE_URL" }], // url
  callbackIndex: 1,
});

// chrome.readingList.updateEntry
createChromeBuiltinSemantics({
  apiName: "chrome.readingList.updateEntry",
  sinkArgs: [{ index: 0, sinkType: "CHROME_READINGLIST_UPDATE_OPTIONS" }], // {url, title, hasBeenRead}
  callbackIndex: 1,
});
