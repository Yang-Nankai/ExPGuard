// background.js  —  Frame: BG_1
//
// Flow patterns:
//   1. CHROME_ONMESSAGEEXTERNAL_MESSAGE → FETCH_RESOURCE         (REQUEST_FORGERY)
//   2. CHROME_ONMESSAGEEXTERNAL_MESSAGE → XML_HTTP_REQUEST_OPEN  (REQUEST_FORGERY)
//   3. CHROME_ONMESSAGEEXTERNAL_MESSAGE → WEBSOCKET_URL          (REQUEST_FORGERY)
//   4. CHROME_ONCONNECTEXTERNAL_ONMESSAGE → AXIOS_URL via lib    (REQUEST_FORGERY)
//   5. Sanitizer: SHA-256 digest neutralises taint before logging (no flow).

import { signedFetch } from "./signer.js";
import { connectAxios } from "./axiosBridge.js";

chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.action) {
    sendResponse({ ok: false });
    return;
  }

  switch (msg.action) {
    case "FETCH_JSON": {
      // attacker-controlled URL goes straight into fetch()
      fetch(msg.endpoint, {
        method: "GET",
        headers: { "x-trace-id": msg.traceId || "" },
      })
        .then((r) => r.json())
        .then((body) => sendResponse({ ok: true, body }));
      return true; // async response
    }

    case "RAW_XHR": {
      // XHR open with attacker-controlled URL
      const xhr = new XMLHttpRequest();
      xhr.open("POST", msg.endpoint, true);                     // SINK XML_HTTP_REQUEST_OPEN
      xhr.setRequestHeader("content-type", "application/json");
      xhr.onload = () => sendResponse({ ok: true });
      xhr.send(JSON.stringify(msg.body || {}));                 // SINK XML_HTTP_REQUEST_SEND
      return true;
    }

    case "BIND_WS": {
      const ws = new WebSocket(msg.wsUrl);                       // SINK WEBSOCKET_URL
      ws.onopen = () => ws.send(JSON.stringify(msg.handshake));  // SINK WEBSOCKET_DATA
      return false;
    }

    case "SIGNED_LOG": {
      // Sanitised path: response is hashed before sending out.
      signedFetch(msg.endpoint, msg.payload).then((digest) =>
        sendResponse({ ok: true, digest }),
      );
      return true;
    }
  }
});

chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener((msg) => {                          // SOURCE CHROME_ONCONNECTEXTERNAL_ONMESSAGE
    if (!msg || !msg.kind) return;

    if (msg.kind === "AXIOS_PROXY") {
      connectAxios(msg.url, msg.params);
    }
  });
});
