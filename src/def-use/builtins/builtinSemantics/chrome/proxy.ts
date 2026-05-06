import { createChromeBuiltinSemantics } from "./utils";

// --------------------- chrome.proxy -------------------
// chrome.proxy.settings.set
createChromeBuiltinSemantics({
  apiName: "chrome.proxy.settings.set",
  sinkArgs: [{ index: 0, sinkType: "CHROME_PROXY_SETTINGS_SET" }], // proxy settings object
  callbackIndex: 1,
});