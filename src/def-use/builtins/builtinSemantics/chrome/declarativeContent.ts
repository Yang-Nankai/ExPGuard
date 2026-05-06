import { createChromeBuiltinSemantics } from "./utils";

// --------------------- chrome.declarativeContent -------------------
createChromeBuiltinSemantics({
  apiName: "chrome.declarativeContent.onPageChanged.addRules",
  sinkArgs: [{ index: 0, sinkType: "CHROME_DECLARATIVECONTENT_RULES" }],
  callbackIndex: 1,
});

createChromeBuiltinSemantics({
  apiName: "chrome.declarativeContent.onPageChanged.removeRules",
  sinkArgs: [{ index: 0, sinkType: "CHROME_DECLARATIVECONTENT_RULE_IDS" }],
  callbackIndex: 1,
});