import { createChromeBuiltinSemantics } from "./utils";
import { DefFactory, defFactory } from "../index";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.fontSettings -------------------
// chrome.fontSettings.setFont
createChromeBuiltinSemantics({
  apiName: "chrome.fontSettings.setFont",
  sinkArgs: [{ index: 0, sinkType: "CHROME_FONTSETTINGS_SET_OPTIONS" }],
  callbackIndex: 1,
});

// chrome.fontSettings.getFontList
createChromeBuiltinSemantics({
  apiName: "chrome.fontSettings.getFontList",
  callbackIndex: 0,
  sourceType: "CHROME_FONTSETTINGS_FONTLIST",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_FONTSETTINGS_FONTLIST"),
});

// chrome.fontSettings.setDefaultFontSize
createChromeBuiltinSemantics({
  apiName: "chrome.fontSettings.setDefaultFontSize",
  sinkArgs: [{ index: 0, sinkType: "CHROME_FONTSETTINGS_SIZE_OPTIONS" }],
  callbackIndex: 1,
});
