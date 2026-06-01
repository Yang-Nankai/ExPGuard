// background.js  —  Frame: BG_1
//
// Flow patterns:
//   1. Receive translation rules from content via runtime.sendMessage.
//   2. Persist them in chrome.storage.sync (STORAGE_POISON if attacker-controlled).
//   3. Inject via chrome.scripting.executeScript (PRIVILEGE_ESCALATION via files/func).

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.kind === "REGISTER_RULE") {
    chrome.storage.sync.set({ rule: msg.payload });   // SINK CHROME_SYNC_STORAGE
    sendResponse({ ok: true });
    return;
  }

  if (msg && msg.kind === "DEPLOY") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab?.id },
      // attacker-controlled function code; ExPGuard models this as inter-procedural
      // analysis of `func`, and `args` propagate taint through patternAware binding.
      func: (greeting) => {
        document.body.innerHTML = greeting;            // taint reaches DOM via the injected func
      },
      args: [msg.greeting],
    });
  }
});
