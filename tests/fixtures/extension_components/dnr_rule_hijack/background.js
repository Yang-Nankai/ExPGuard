// An external message's payload becomes a dynamic declarativeNetRequest rule —
// the attacker can redirect/rewrite the victim's outbound requests.
// CHROME_ONMESSAGEEXTERNAL_MESSAGE → CHROME_DECLARATIVENETREQUEST_RULES
// (ATTACKER_INPUT → PRIVILEGED_OPERATION ⇒ PRIVILEGE_ESCALATION).
chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: msg.rules,
    removeRuleIds: [1],
  });
  sendResponse({ ok: true });
});
