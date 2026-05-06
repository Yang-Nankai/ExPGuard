import {
  createChromeBuiltinSemantics,
  createChromeEventListenerSemantics,
} from "./utils";
import { DefFactory, defFactory } from "../index";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.downloads -------------------

// chrome.downloads.search
createChromeBuiltinSemantics({
  apiName: "chrome.downloads.search",
  callbackIndex: 1,
  sourceType: "CHROME_DOWNLOADS_SEARCH",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_DOWNLOADS_SEARCH"),
});

// chrome.downloads.getFileIcon
createChromeBuiltinSemantics({
  apiName: "chrome.downloads.getFileIcon",
  callbackIndex: 2,
  sourceType: "CHROME_DOWNLOADS_FILEICON",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_DOWNLOADS_FILEICON"),
});

// chrome.downloads.download
createChromeBuiltinSemantics({
  apiName: "chrome.downloads.download",
  sinkArgs: [{ index: 0, sinkType: "CHROME_DOWNLOADS_OPTIONS" }], // options 包含 url, filename 等
  callbackIndex: 1,
});

// chrome.downloads.removeFile
createChromeBuiltinSemantics({
  apiName: "chrome.downloads.removeFile",
  sinkArgs: [{ index: 0, sinkType: "CHROME_DOWNLOADS_REMOVE_ID" }], // fileId
  callbackIndex: 1,
});

// ----------------------- chrome.downloads.onChanged.addListener
createChromeEventListenerSemantics({
  apiName: "chrome.downloads.onChanged.addListener",
  sourceIndexes: [0],
  sourceType: "CHROME_DOWNLOADS_ONCHANGED",
  paramDefs: [
    (callNode) => defFactory.createUnknownDef(callNode), // delta
  ],
});

// ------------------------ chrome.downloads.onCreated.addListener
createChromeEventListenerSemantics({
  apiName: "chrome.downloads.onCreated.addListener",
  sourceIndexes: [0],
  sourceType: "CHROME_DOWNLOADS_ONCREATED",
  paramDefs: [
    (callNode) => defFactory.createUnknownDef(callNode), // delta
  ],
});
