# ExPAgent Static Verification — cdbccfkcpkmimlajcjpodelocoeifjhp v8.7

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.935, scope=0.958
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C85860 -> L1:C85861
- **Sink**: `CHROME_COOKIES_SET_OPTIONS` in `background` [BG_1] @ L1:C85719 -> L1:C85821
- **Severity evidence**: ['https://oceanhero.today/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the exact minified source around both anchors. Here is my verification.

## Decision ledger

**(a) Who controls the source?**
The handler is registered as `chrome.runtime.onMessageExternal.addListener(x)` (and also `onMessage.addListener(x)`). The manifest's `externally_connectable.matches` is `https://oceanhero.today/*`, so a page running on `oceanhero.today` (or code injected there via XSS/subdomain issues) can send `chrome.runtime.sendMessage(EXT_ID, {type:"addShells", amount: ...})`. The `amount` field is fully attacker-controlled.

**(b) Source-to-sink path**
The report's data-flow chain is real and unbroken:
`onMessageExternal` message `t` → `"addShells"===t.type` branch → `chrome.cookies.get(...)` callback → `chrome.cookies.set({url:"https://oceanhero.today", name:"shellsCounter", value:(r + t.amount).toString()})`.
I read the raw minified source and confirmed this exact code:
```js
"addShells"===t.type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(e){
  var r=e?parseInt(e.value):0;
  chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+t.amount).toString()})
}))
```
So `t.amount` genuinely reache

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
