import { createChromeBuiltinSemantics, createChromeEventListenerSemantics } from "./utils";
import { DefFactory, defFactory, extractConfigLiteral } from "../index";
import { createArrayInstanceTaint } from "../utils";

// Tag the cookie source with the domain/url it reads, e.g. `cookies(facebook.com)`.
const cookieDomainRemark = (args: any[]) => {
  const d = extractConfigLiteral(args[0], ["url", "domain"]);
  return d ? `cookies(${d})` : undefined;
};

// --------------------- chrome.cookies -------------------

// chrome.cookies.getAll
createChromeBuiltinSemantics({
  apiName: "chrome.cookies.getAll",
  callbackIndex: 1,
  sourceType: "CHROME_COOKIES_INFO",
  createReturnDef: (callNode, astNode) => createArrayInstanceTaint(callNode, astNode, "CHROME_COOKIES_INFO"),
  remarkFromArgs: cookieDomainRemark,
});

// chrome.cookies.get
createChromeBuiltinSemantics({
  apiName: "chrome.cookies.get",
  callbackIndex: 1,
  sourceType: "CHROME_COOKIES_INFO",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
  remarkFromArgs: cookieDomainRemark,
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