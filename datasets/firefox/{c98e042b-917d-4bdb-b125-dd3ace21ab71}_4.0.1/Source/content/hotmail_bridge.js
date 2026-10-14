"use strict";
const extApi = globalThis.browser ?? globalThis.chrome;
/***********************************************************
Hotmail token bridge (isolated world)
Receives the captured token from content/hotmail.js (MAIN world)
via window.postMessage and relays it to the service worker.
***********************************************************/
(function () {
  const ORIGIN = "https://outlook.live.com";
  const SOURCE = "xnotifier-hotmail";

  window.addEventListener("message", function (event) {
    if (event.source !== window || event.origin !== ORIGIN) return;
    const data = event.data;
    if (
      !data ||
      data.source !== SOURCE ||
      data.type !== "token" ||
      typeof data.token !== "string"
    ) {
      return;
    }
    try {
      extApi.runtime.sendMessage({ cmd: "hotmailToken", token: data.token });
    } catch (e) {}
  });
})();
