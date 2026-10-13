# ExPAgent Static Verification — bnlghmkgojdehkigfkkblmmeldkmoccb v1.3.6

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.219, scope=0.191
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background` [BG_1] @ L2:C78054 -> L2:C78055
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background` [BG_1] @ L2:C78207 -> L2:C78762
- **Severity evidence**: ['*://*.markuphero.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Analysis

**Harness / manifest context:** This is a MV3 extension with `chrome.runtime.onMessageExternal` exposed via `externally_connectable.matches = ["*://*.markuphero.com/*", "*://localhost/*"]` (wildcard subdomains → broader surface; flagged as the HIGH severity reason). There is **no** `sender.id` allowlist anywhere (`authenticatedExtensionAllowlist: null`), so there is no browser-authenticated trusted-peer boundary here.

**Source (item a):** `chrome.runtime.onMessageExternal.addListener((t,e,r) => …)` in `js/background.js`. The message object `t` is fully attacker-authored (message + arbitrary fields), so `t.url` is attacker-controlled. Only an external page origin (markuphero.com/* or localhost) can reach the listener; no origin/url/sender guard is applied inside the handler.

**Path (item b):** Verified in raw source at L2 C77900–78900 — the handler dispatches on `t.message`:
```js
… else if("take_scrolling_screenshot"===t.message) try{
   it().then((function(e){ var n=t.url, o=null;
      chrome.tabs.create({url:n}, function(){…})   // n === t.url, unmodified
```
`var n = t.url` is copied straight into `chrome.tabs.create`. No normalization, no scheme/host validation,

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
