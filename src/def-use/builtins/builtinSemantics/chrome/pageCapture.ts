import { createChromeBuiltinSemantics } from "./utils";
import { defFactory } from "../index";

// --------------------- chrome.pageCapture -------------------
createChromeBuiltinSemantics({
  apiName: "chrome.pageCapture.saveAsMHTML",
  callbackIndex: 1,
  sourceType: "CHROME_PAGECAPTURE_MHTML",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
});
