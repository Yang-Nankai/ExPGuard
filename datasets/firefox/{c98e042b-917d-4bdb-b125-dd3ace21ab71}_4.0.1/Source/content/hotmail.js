"use strict";
/***********************************************************
Hotmail token capture (MAIN world)
Hooks fetch / XMLHttpRequest on outlook.live.com to capture the
"Authorization: MSAuth1.0 usertoken=..." header the OWA app sends,
and relays it to the isolated bridge via window.postMessage.
***********************************************************/
(function () {
  const OWA_MATCH = /\/owa\/(?:\d+\/)?(?:startupdata\.ashx|service\.svc)/i;
  const ORIGIN = "https://outlook.live.com";
  const SOURCE = "xnotifier-hotmail";
  let lastSent = null;

  function post(token) {
    if (!token || token === lastSent) return;
    lastSent = token;
    window.postMessage({ source: SOURCE, type: "token", token: token }, ORIGIN);
  }

  function readHeader(headers, name) {
    try {
      if (typeof Headers !== "undefined" && headers instanceof Headers) {
        return headers.get(name);
      }
      if (Array.isArray(headers)) {
        for (const pair of headers) {
          if (pair && pair[0] && pair[0].toLowerCase() === name) return pair[1];
        }
        return null;
      }
      if (headers && typeof headers === "object") {
        for (const k in headers) {
          if (k.toLowerCase() === name) return headers[k];
        }
      }
    } catch (e) {}
    return null;
  }

  function capture(auth) {
    if (auth && /^MSAuth1\.0/i.test(auth)) post(auth);
  }

  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    try {
      const url = typeof input === "string" ? input : input && input.url;
      if (url && OWA_MATCH.test(url)) {
        let auth = init && init.headers ? readHeader(init.headers, "authorization") : null;
        if (!auth && input && input.headers && typeof input.headers.get === "function") {
          auth = input.headers.get("authorization");
        }
        capture(auth);
      }
    } catch (e) {}
    return originalFetch.apply(this, arguments);
  };

  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSetHeader = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.open = function (method, url) {
    this.__xnUrl = url;
    return originalOpen.apply(this, arguments);
  };
  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    try {
      if (
        name &&
        name.toLowerCase() === "authorization" &&
        this.__xnUrl &&
        OWA_MATCH.test(this.__xnUrl)
      ) {
        capture(value);
      }
    } catch (e) {}
    return originalSetHeader.apply(this, arguments);
  };
})();
