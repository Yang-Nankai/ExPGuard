import { createChromeBuiltinSemantics } from "./utils";

// --------------------- chrome.notifications -------------------

// chrome.notifications.create
createChromeBuiltinSemantics({
  apiName: "chrome.notifications.create",
  sinkArgs: [{ index: 0, sinkType: "CHROME_NOTIFICATIONS_CREATE_OPTIONS" }], // notification id 或 options
  callbackIndex: 1,
});

// chrome.notifications.update
createChromeBuiltinSemantics({
  apiName: "chrome.notifications.update",
  sinkArgs: [{ index: 0, sinkType: "CHROME_NOTIFICATIONS_UPDATE_ID" }, // notification id
             { index: 1, sinkType: "CHROME_NOTIFICATIONS_UPDATE_OPTIONS" }], // options
  callbackIndex: 2,
});

// chrome.notifications.clear
createChromeBuiltinSemantics({
  apiName: "chrome.notifications.clear",
  sinkArgs: [{ index: 0, sinkType: "CHROME_NOTIFICATIONS_CLEAR_ID" }], // notification id
  callbackIndex: 1,
});
