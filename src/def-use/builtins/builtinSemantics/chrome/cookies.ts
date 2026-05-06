import { createChromeBuiltinSemantics, createChromeEventListenerSemantics } from "./utils";
import { DefFactory, defFactory } from "../index";
import { createArrayInstanceTaint } from "../utils";
// --------------------- chrome.cookies -------------------

// chrome.cookies.getAll
createChromeBuiltinSemantics({
  apiName: "chrome.cookies.getAll",
  callbackIndex: 1,
  sourceType: "CHROME_COOKIES_INFO",
  createReturnDef: (callNode, astNode) => createArrayInstanceTaint(callNode, astNode, "CHROME_COOKIES_INFO"),
});

// chrome.cookies.get
createChromeBuiltinSemantics({
  apiName: "chrome.cookies.get",
  callbackIndex: 1,
  sourceType: "CHROME_COOKIES_INFO",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
});

// chrome.cookies.getAllCookieStores
createChromeBuiltinSemantics({
  apiName: "chrome.cookies.getAllCookieStores",
  callbackIndex: 0,
  sourceType: "CHROME_COOKIES_STORE",
  createReturnDef: (callNode, astNode) => createArrayInstanceTaint(callNode, astNode, "CHROME_COOKIES_STORE"),
});

// chrome.cookies.set
createChromeBuiltinSemantics({
  apiName: "chrome.cookies.set",
  sinkArgs: [{ index: 0, sinkType: "CHROME_COOKIES_SET_OPTIONS" }],
  callbackIndex: 1,
});

// chrome.cookies.remove
createChromeBuiltinSemantics({
  apiName: "chrome.cookies.remove",
  sinkArgs: [{ index: 0, sinkType: "CHROME_COOKIES_REMOVE_OPTIONS" }],
  callbackIndex: 1,
});


// ----------------------  chrome.cookies.onChanged.addListener
createChromeEventListenerSemantics({
  apiName: "chrome.cookies.onChanged.addListener",
  sourceIndexes: [0],
  sourceType: "CHROME_COOKIES_ONCHANGED",
  paramDefs: [
    (callNode) => defFactory.createUnknownDef(callNode), // changeInfo
  ],
});