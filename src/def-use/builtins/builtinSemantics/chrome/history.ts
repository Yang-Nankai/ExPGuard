import {
  createChromeBuiltinSemantics,
  createChromeEventListenerSemantics,
} from "./utils";
import { defFactory } from "../index";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.history -------------------

// chrome.history.search
createChromeBuiltinSemantics({
  apiName: "chrome.history.search",
  callbackIndex: 1,
  sourceType: "CHROME_HISTORY_INFO",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_HISTORY_INFO"),
});

// chrome.history.getVisits
createChromeBuiltinSemantics({
  apiName: "chrome.history.getVisits",
  callbackIndex: 0,
  sourceType: "CHROME_HISTORY_INFO",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_HISTORY_INFO"),
});

// chrome.history.addUrl
createChromeBuiltinSemantics({
  apiName: "chrome.history.addUrl",
  sinkArgs: [{ index: 0, sinkType: "CHROME_HISTORY_ADD_URL" }], // url info
  callbackIndex: 1,
});

// chrome.history.deleteRange
createChromeBuiltinSemantics({
  apiName: "chrome.history.deleteRange",
  sinkArgs: [{ index: 0, sinkType: "CHROME_HISTORY_DELETE_RANGE" }], // startTime, endTime
  callbackIndex: 1,
});

// chrome.history.deleteUrl
createChromeBuiltinSemantics({
  apiName: "chrome.history.deleteUrl",
  sinkArgs: [{ index: 0, sinkType: "CHROME_HISTORY_DELETE_URL" }], // url
  callbackIndex: 1,
});

// ------------------------ chrome.history.onVisited.addListener
createChromeEventListenerSemantics({
  apiName: "chrome.history.onVisited.addListener",
  sourceIndexes: [0],
  sourceType: "CHROME_HISTORY_ONVISITED",
  paramDefs: [
    (callNode) => defFactory.createUnknownDef(callNode), // delta
  ],
});
