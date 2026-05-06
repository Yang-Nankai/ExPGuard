import { createChromeBuiltinSemantics } from "./utils";

// ======================================================
// chrome.alarms
// https://developer.chrome.com/docs/extensions/reference/alarms
// ======================================================

// chrome.alarms.create
createChromeBuiltinSemantics({
  apiName: "chrome.alarms.create",
  sinkArgs: [{ index: 1, sinkType: "CHROME_ALARMS_CREATE_OPTIONS" }], // alarmInfo
  callbackIndex: 2, // optional callback is usually last arg
});

// chrome.alarms.clear
createChromeBuiltinSemantics({
  apiName: "chrome.alarms.clear",
  sinkArgs: [{ index: 0, sinkType: "CHROME_ALARMS_CLEAR_NAME" }], // name
  callbackIndex: 1,
});


