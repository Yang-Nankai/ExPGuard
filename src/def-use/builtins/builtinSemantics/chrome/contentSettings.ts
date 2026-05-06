import { createChromeBuiltinSemantics } from "./utils";

// --------------------- chrome.contentSettings -------------------

// Helper: generate sink semantics for contentSettings set/clear
const contentSettingTypes = [
  "cookies",
  "images",
  "javascript",
  "plugins",
  "popups",
  "notifications",
  "microphone",
  "camera",
  "geolocation",
  "midi",
  "backgroundSync",
  "automaticDownloads",
];

contentSettingTypes.forEach((type) => {
  // set
  createChromeBuiltinSemantics({
    apiName: `chrome.contentSettings.${type}.set`,
    sinkArgs: [{ index: 0, sinkType: `CHROME_CONTENTSETTINGS_SET`, remark: type.toUpperCase() }],
    callbackIndex: 1,
  });

  // clear
  createChromeBuiltinSemantics({
    apiName: `chrome.contentSettings.${type}.clear`,
    sinkArgs: [{ index: 0, sinkType: `CHROME_CONTENTSETTINGS_CLEAR`, remark: type.toUpperCase() }],
    callbackIndex: 1,
  });
});