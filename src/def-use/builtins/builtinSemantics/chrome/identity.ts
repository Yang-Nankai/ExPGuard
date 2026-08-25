
import { createChromeBuiltinSemantics } from "./utils";
import { defFactory } from "../index";


// --------------------- chrome.identity -------------------
createChromeBuiltinSemantics({
  apiName: "chrome.identity.getAuthToken",
  callbackIndex: 1,
  sourceType: "CHROME_IDENTITY_TOKEN",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
  remarkFromArgs: () => "identity.authToken",
});

createChromeBuiltinSemantics({
  apiName: "chrome.identity.getProfileUserInfo",
  callbackIndex: 1,
  sourceType: "CHROME_IDENTITY_PROFILE",
  createReturnDef: (callNode) => defFactory.createUnknownDef(callNode),
  remarkFromArgs: () => "identity.profileUserInfo",
});