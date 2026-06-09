// background.js  —  Frame: BG_1
//
// Demonstrates simultaneous use of:
//   - chrome.runtime.connect / port.onMessage / port.postMessage  (CHANNEL: runtime.connect.*)
//   - chrome.runtime.onConnect.addListener                         (incoming port)
//   - chrome.identity.getAuthToken                                 (SENSITIVE_DATA source)
//   - chrome.pageCapture.saveAsMHTML                               (SENSITIVE_DATA source)
//   - chrome.scripting.executeScript ({ files: [...] })            (script reference → frame propagation)
//   - chrome.runtime.getURL                                        (frame propagation)
//
// Notable flows expected:
//   - CHROME_IDENTITY_TOKEN  → CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE  (DATA_LEAK)
//   - CHROME_ONCONNECTEXTERNAL_ONMESSAGE → NEW_FUNCTION                     (CODE_INJECTION)
//   - CHROME_ONCONNECTEXTERNAL_ONMESSAGE → CHROME_TABS_EXECUTE              (PRIVILEGE_ESCALATION)
//   - CHROME_PAGECAPTURE_MHTML → FETCH_RESOURCE                             (DATA_LEAK via uploader)
//
// External attack surface is `externally_connectable.ids = ["*"]` → CRITICAL severity.

import { uploadMhtml } from "./uploader.js";

// Accept connections from any extension (because externally_connectable.ids = ["*"])
chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener((msg) => {                          // SOURCE CHROME_ONCONNECTEXTERNAL_ONMESSAGE
    if (!msg) return;

    if (msg.kind === "PROBE_TOKEN") {
      chrome.identity.getAuthToken({ interactive: false }, (token) => {  // SOURCE CHROME_IDENTITY_TOKEN
        port.postMessage({ token });                              // SINK MESSAGE (external)
      });
      return;
    }

    if (msg.kind === "INJECT_FN" && typeof msg.body === "string") {
      // Function constructor: code-injection sink.
      const fn = new Function("ctx", msg.body);                   // SINK NEW_FUNCTION
      fn({ tabId: msg.tabId });
    }

    if (msg.kind === "INJECT_FILE" && msg.tabId && msg.file) {
      // chrome.scripting.executeScript with a string file – the file reference is
      // tracked by scriptUsageTracker so frame tags propagate to that script.
      chrome.scripting.executeScript({
        target: { tabId: msg.tabId },
        files: [msg.file],
      });
    }

    if (msg.kind === "EVAL_TABS" && msg.tabId) {
      chrome.tabs.executeScript(msg.tabId, { code: msg.code });   // SINK CHROME_TABS_EXECUTE
    }
  });
});

// In-extension port used by devhub content script
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {                           // SOURCE PSEUDO_MESSAGE → resolves to WINDOW_MESSAGE_EVENT via content
    if (msg && msg.kind === "GRAB_MHTML" && msg.tabId) {
      chrome.pageCapture.saveAsMHTML({ tabId: msg.tabId }, (blob) => {  // SOURCE CHROME_PAGECAPTURE_MHTML
        uploadMhtml(msg.uploadUrl, blob);
      });
    }
  });
});

// Helper script discovery: chrome.runtime.getURL marks helper.js as used.
// Without this call, scriptUsageTracker would drop helper.js from reports.
const helperUrl = chrome.runtime.getURL("helper.js");
console.log("helper at", helperUrl);
