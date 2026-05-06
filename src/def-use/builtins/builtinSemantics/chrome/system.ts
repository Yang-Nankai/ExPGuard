import { createChromeBuiltinSemantics } from "./utils";
import { defFactory, DefFactory } from "../index";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.system -------------------
createChromeBuiltinSemantics({
  apiName: "chrome.system.cpu.getInfo",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_CPU",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
});

createChromeBuiltinSemantics({
  apiName: "chrome.system.display.getDisplayLayout",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_DISPLAY_LAYOUT",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_SYSTEM_DISPLAY_LAYOUT"),
});

createChromeBuiltinSemantics({
  apiName: "chrome.system.display.getInfo",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_DISPLAY",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_SYSTEM_DISPLAY"),
});

createChromeBuiltinSemantics({
  apiName: "chrome.system.memory.getInfo",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_MEMORY",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
});

createChromeBuiltinSemantics({
  apiName: "chrome.system.storage.getInfo",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_STORAGE",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_SYSTEM_STORAGE"),
});
