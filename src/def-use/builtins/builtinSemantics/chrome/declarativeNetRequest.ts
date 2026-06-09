import { createChromeBuiltinSemantics } from "./utils";

// --------------------- chrome.declarativeNetRequest -------------------
// updateDynamicRules / updateSessionRules / updateEnabledRulesets let an
// extension rewrite, redirect, or block outbound requests at runtime. When the
// rule set (a `redirect.url` / `regexSubstitution` / `urlFilter`) is built from
// attacker-controlled data, this is a request-hijacking privilege escalation.
// We treat the options object as a CHROME_DECLARATIVENETREQUEST_RULES sink.
createChromeBuiltinSemantics({
  apiName: "chrome.declarativeNetRequest.updateDynamicRules",
  sinkArgs: [{ index: 0, sinkType: "CHROME_DECLARATIVENETREQUEST_RULES" }],
  callbackIndex: 1,
});

createChromeBuiltinSemantics({
  apiName: "chrome.declarativeNetRequest.updateSessionRules",
  sinkArgs: [{ index: 0, sinkType: "CHROME_DECLARATIVENETREQUEST_RULES" }],
  callbackIndex: 1,
});

createChromeBuiltinSemantics({
  apiName: "chrome.declarativeNetRequest.updateEnabledRulesets",
  sinkArgs: [{ index: 0, sinkType: "CHROME_DECLARATIVENETREQUEST_RULES" }],
  callbackIndex: 1,
});
