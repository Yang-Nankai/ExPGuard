/* global chrome, window */

"use strict";

if (
  window.location.hostname !== "readlang.com" &&
  window.location.hostname !== "test.readlang.com"
) {
  // check whether to load the Web Reader
  chrome.runtime.sendMessage({ message: "newPageLoaded" }, () => {});
}
