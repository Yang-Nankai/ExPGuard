# ExPAgent Static Verification — extension@oceanhero.today v10.7

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.225, scope=0.213
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C7234 -> L1:C7235
- **Sink**: `CHROME_COOKIES_SET_OPTIONS` in `background` [BG_1] @ L1:C7093 -> L1:C7195
- **Severity evidence**: ['https://oceanhero.today/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (`addShells` → `chrome.cookies.set`)

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener(g)` in `background.js` (confirmed at minified range C7700–C8100: `chrome.runtime.onMessageExternal.addListener(g)`). There is **no `sender.id` check, no sender.origin/url check, and no allowlist** — the listener is registered directly.

The manifest sets `externally_connectable.matches: ["https://oceanhero.today/*"]`. That means any page running under `https://oceanhero.today/*` (or script injected via XSS on that origin) can call `chrome.runtime.sendMessage(<extensionId>, payload)` and fully control the message object `e`, including `e.type` and `e.amount`. The `e.type === "addShells"` gate is an attacker-chosen message field, not a trust anchor.

### (b) Source-to-sink path
Confirmed directly in the minified source:

```js
g = function(e,t,r){
  return "addShells" === e.type &&
    chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},
      (function(t){
        var r = t ? parseInt(t.value) : 0;
        chrome.cookies.set({url:"https://oceanhero.today",
                            name:"shellsCounter",
   

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
