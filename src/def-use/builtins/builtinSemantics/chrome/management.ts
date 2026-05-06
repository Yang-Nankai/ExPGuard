import {
  createChromeBuiltinSemantics,
  createChromeEventListenerSemantics,
} from "./utils";
import { DefFactory, defFactory } from "../index";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.management -------------------

// chrome.management.get
createChromeBuiltinSemantics({
  apiName: "chrome.management.get",
  callbackIndex: 1,
  sourceType: "CHROME_MANAGEMENT_INFO",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
});

// chrome.management.getAll
createChromeBuiltinSemantics({
  apiName: "chrome.management.getAll",
  callbackIndex: 0,
  sourceType: "CHROME_MANAGEMENT_INFO",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_MANAGEMENT_INFO"),
});

// chrome.management.setEnabled
createChromeBuiltinSemantics({
  apiName: "chrome.management.setEnabled",
  sinkArgs: [
    { index: 0, sinkType: "CHROME_MANAGEMENT_SETENABLED_ID" }, // extension id
    { index: 1, sinkType: "CHROME_MANAGEMENT_SETENABLED_FLAG" }, // enable/disable flag
  ],
  callbackIndex: 2,
});

// chrome.management.uninstall
createChromeBuiltinSemantics({
  apiName: "chrome.management.uninstall",
  sinkArgs: [{ index: 0, sinkType: "CHROME_MANAGEMENT_UNINSTALL_ID" }], // extension id
  callbackIndex: 1,
});

// chrome.management.launchApp
createChromeBuiltinSemantics({
  apiName: "chrome.management.launchApp",
  sinkArgs: [{ index: 0, sinkType: "CHROME_MANAGEMENT_LAUNCHAPP_ID" }], // app id
  callbackIndex: 1,
});

createChromeEventListenerSemantics({
  apiName: "chrome.management.onEnabled.addListener",
  sourceIndexes: [0],
  sourceType: "CHROME_MANAGEMENT_ONENABLED",
  paramDefs: [
    (callNode) => defFactory.createUnknownDef(callNode), // ExtensionInfo
  ],
});

createChromeEventListenerSemantics({
  apiName: "chrome.management.onDisabled.addListener",
  sourceIndexes: [0],
  sourceType: "CHROME_MANAGEMENT_ONDISABLED",
  paramDefs: [
    (callNode) => defFactory.createUnknownDef(callNode), // ExtensionInfo
  ],
});

createChromeEventListenerSemantics({
  apiName: "chrome.management.onInstalled.addListener",
  sourceIndexes: [0],
  sourceType: "CHROME_MANAGEMENT_ONINSTALLED",
  paramDefs: [
    (callNode) => defFactory.createUnknownDef(callNode), // ExtensionInfo
  ],
});
