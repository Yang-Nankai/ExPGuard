# ExPAgent Static Verification — ijpgjiobapjdadigoagamcmhmdfdggmg v10.7

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.762, scope=0.794
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C7234 -> L1:C7235
- **Sink**: `CHROME_COOKIES_SET_OPTIONS` in `background` [BG_1] @ L1:C7093 -> L1:C7195
- **Severity evidence**: ['https://oceanhero.today/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (CHROME_ONMESSAGEEXTERNAL_MESSAGE → CHROME_COOKIES_SET_OPTIONS)

### (a) Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener(g)`. I confirmed the registration in the minified service worker:

`chrome.runtime.onMessageExternal.addListener(g), chrome.runtime.onMessage.addListener(g);`

The manifest restricts `externally_connectable.matches` to `https://oceanhero.today/*`. That means an ordinary arbitrary page cannot reach the listener, but any JavaScript running in the `oceanhero.today` origin (the extension's own site, compromised via XSS or any content-injection bug, or a page the attacker can host/control there) can. The handler `g(e,t,r)` performs **no** `sender.id`/`sender.origin` check and no validation of the message fields before the cookie write. Per the harness rules, a web-origin `externally_connectable` restriction reduces scope but does not eliminate attacker control; it leaves a real XSS-prerequisite path.

### (b) Source-to-sink path
Verified directly in `background.js`:

```
g = function(e,t,r){
  return "addShells"===e.type &&
    chrome.cookies.get({url:"https://oceanhero.today", name:"shellsCounter"}, func

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
