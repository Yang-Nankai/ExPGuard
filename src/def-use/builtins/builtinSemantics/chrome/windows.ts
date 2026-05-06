import { createChromeBuiltinSemantics } from "./utils";

// --------------------- chrome.windows -------------------

// chrome.windows.create
createChromeBuiltinSemantics({
  apiName: "chrome.windows.create",
  sinkArgs: [{ index: 0, sinkType: "CHROME_WINDOWS_CREATE_OPTIONS" }],
  callbackIndex: 1,
});

// chrome.windows.update
createChromeBuiltinSemantics({
  apiName: "chrome.windows.update",
  sinkArgs: [
    { index: 1, sinkType: "CHROME_WINDOWS_UPDATE_OPTIONS" },
  ],
  callbackIndex: 2,
});