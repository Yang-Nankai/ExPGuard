// An external message's payload is fed straight into the DevTools-protocol
// Runtime.evaluate expression — arbitrary code execution in the target page,
// bypassing its CSP. CHROME_ONMESSAGEEXTERNAL_MESSAGE → CHROME_DEBUGGER_COMMAND
// (ATTACKER_INPUT → CODE_EXECUTION ⇒ CODE_INJECTION).
chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  chrome.debugger.sendCommand({ tabId: 1 }, "Runtime.evaluate", {
    expression: msg.code,
  });
  sendResponse({ ok: true });
});
