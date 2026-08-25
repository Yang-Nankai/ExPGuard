import { createChromeBuiltinSemantics } from "./utils";
import { defFactory, DefFactory } from "../index";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.system -------------------
// These are zero-arg readers; tag each source with a static descriptor so the
// report shows exactly which system facet was read.
createChromeBuiltinSemantics({
  apiName: "chrome.system.cpu.getInfo",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_CPU",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
  remarkFromArgs: () => "system.cpu",
});

createChromeBuiltinSemantics({
  apiName: "chrome.system.display.getDisplayLayout",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_DISPLAY_LAYOUT",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_SYSTEM_DISPLAY_LAYOUT"),
  remarkFromArgs: () => "system.display.layout",
});

createChromeBuiltinSemantics({
  apiName: "chrome.system.display.getInfo",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_DISPLAY",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_SYSTEM_DISPLAY"),
  remarkFromArgs: () => "system.display",
});

createChromeBuiltinSemantics({
  apiName: "chrome.system.memory.getInfo",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_MEMORY",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
  remarkFromArgs: () => "system.memory",
});

createChromeBuiltinSemantics({
  apiName: "chrome.system.storage.getInfo",
  callbackIndex: 0,
  sourceType: "CHROME_SYSTEM_STORAGE",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_SYSTEM_STORAGE"),
  remarkFromArgs: () => "system.storage",
});
