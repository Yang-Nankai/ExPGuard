import { createChromeBuiltinSemantics } from "./utils";
import { createArrayInstanceTaint } from "../utils";

// --------------------- chrome.topSites -------------------
createChromeBuiltinSemantics({
  apiName: "chrome.topSites.get",
  callbackIndex: 0,
  sourceType: "CHROME_TOPSITES_INFO",
  createReturnDef: (callNode, astNode) =>
    createArrayInstanceTaint(callNode, astNode, "CHROME_TOPSITES_INFO"),
});
