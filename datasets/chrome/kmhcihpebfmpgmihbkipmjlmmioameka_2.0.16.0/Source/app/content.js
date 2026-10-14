(function () {
  'use strict';

  const ensureLength = (str, length, char = " ", right = true) => {
    let i = 0;
    while (str.length < length && i++ < 100) {
      if (right) {
        str = char + str;
      } else {
        str = str + char;
      }
    }
    return str;
  };

  const el = (msg, length = 30, space = " ") => ensureLength(msg, length, space);
  const sl = (msg, length = 30, space = " ") => el(msg, length, space);

  var ApiChannel = /* @__PURE__ */ ((ApiChannel2) => {
    ApiChannel2["domToCS"] = "eternl-dom-to-cs";
    ApiChannel2["csToDom"] = "eternl-cs-to-dom";
    ApiChannel2["csToBg"] = "eternl-cs-to-bg";
    ApiChannel2["bgToCs"] = "eternl-bg-to-cs";
    ApiChannel2["bgToEnable"] = "eternl-bg-to-enable";
    ApiChannel2["enableToBg"] = "eternl-enable-to-bg";
    ApiChannel2["bgToSidePanel"] = "eternl-bg-to-side-panel";
    ApiChannel2["sidePanelToBg"] = "eternl-side-panel-to-bg";
    ApiChannel2["bgToMain"] = "eternl-bg-to-main";
    ApiChannel2["mainToBg"] = "eternl-main-to-bg";
    ApiChannel2["bgToPermissions"] = "eternl-bg-to-permissions";
    ApiChannel2["permissionsToBg"] = "eternl-permissions-to-bg";
    ApiChannel2["bgToSignTx"] = "eternl-bg-to-sign-tx";
    ApiChannel2["signTxToBg"] = "eternl-sign-tx-to-bg";
    ApiChannel2["bgToSignData"] = "eternl-bg-to-sign-data";
    ApiChannel2["signDataToBg"] = "eternl-sign-data-to-bg";
    ApiChannel2["popupToBg"] = "eternl-popup-to-bg";
    ApiChannel2["bgToOffscreen"] = "eternl-bg-to-offscreen";
    ApiChannel2["offscreenToBg"] = "eternl-offscreen-to-bg";
    return ApiChannel2;
  })(ApiChannel || {});

  const getRandomId = () => Math.floor(Math.random() * 999999) + "-" + Math.floor(Math.random() * 999999) + "-" + Math.floor(Math.random() * 999999);

  var define_process_env_default = {};
  const doLogVerbose = false;
  const randId = getRandomId();
  const storeId = "contentScript-" + randId;
  const _domWasInjectedBefore = !!document.getElementById("eternl-dom-script");
  if (_domWasInjectedBefore) {
    const data = {
      channel: ApiChannel.csToDom,
      reqId: getRandomId(),
      api: "reinjected",
      payload: {
        storeId
      }
    };
    window.postMessage(data, "*");
  }
  const onMessage = (data) => {
    if (data.channel === ApiChannel.bgToCs && data.payload?.contentId === randId) {
      data.channel = ApiChannel.csToDom;
      window.postMessage(data, "*");
    }
    return false;
  };
  const onPostMessage = (msg) => {
    const data = msg.data;
    if (msg.source != window) {
      return;
    }
    if ((data?.channel ?? "") !== ApiChannel.domToCS) {
      return;
    }
    if (data.payload.contentId !== randId) {
      return;
    }
    if (data.api === "reinjected") {
      if (data.payload.storeId === storeId) {
        return;
      }
      window.removeEventListener("message", onPostMessage);
      chrome.runtime.onMessage.removeListener(onMessage);
      return;
    }
    data.channel = ApiChannel.csToBg;
    try {
      chrome.runtime.sendMessage(data, (response) => {
        const lastError = chrome.runtime.lastError;
        if (lastError && lastError.message !== "The message port closed before a response was received.") {
          console.error("onPostMessage: lastError:", chrome.runtime.lastError);
        }
        if (doLogVerbose) ;
      });
    } catch (err) {
      console.error("onPostMessage: error:", err);
    }
  };
  function injectDomScript(url) {
    const ancestorOrigins = window?.location?.ancestorOrigins;
    if (!ancestorOrigins) {
      return;
    }
    if (ancestorOrigins.length > 0) {
      for (let i = 0; i < ancestorOrigins.length; i++) {
        const origin = ancestorOrigins[i];
        if (origin.includes("eternl.io") || origin.includes("localhost")) {
          return;
        }
      }
    }
    if (!document.getElementById("eternl-dom-script")) {
      const script = document.createElement("script");
      script.setAttribute("data-token", randId);
      script.id = "eternl-dom-script";
      script.src = url + "?token=" + randId;
      (document.head || document.documentElement).appendChild(script);
    }
    window.addEventListener("message", onPostMessage);
    chrome.runtime.onMessage.addListener(onMessage);
  }
  if (typeof document !== "undefined" && document instanceof HTMLDocument) {
    injectDomScript(chrome.runtime.getURL(define_process_env_default.DEV ? "app/dom.js" : "app/dom.js"));
  }

})();
