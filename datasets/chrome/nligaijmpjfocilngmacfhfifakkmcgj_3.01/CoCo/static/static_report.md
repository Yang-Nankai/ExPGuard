# ExPAgent Static Verification — nligaijmpjfocilngmacfhfifakkmcgj v3.01

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- **Not reviewed due to analysis budget:** 2 flow(s): [1, 2]
- Coverage: node=0, scope=0
- Flow types: {'REQUEST_FORGERY': 2, 'UNKNOWN': 1}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L24:C1 -> L24:C1
- **Sink**: `XML_HTTP_REQUEST_OPEN` in `background.js` [UNKNOWN] @ L106:C1 -> L106:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'NETWORK_SEND', 'flowMeta': {'totalSteps': 2, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — REQUEST_FORGERY via `onMessageExternal` → `XMLHttpRequest.open`

### Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener(...)` at `background.js:8`. The `sender` parameter is never inspected — there is **no `sender.id` allowlist, no `sender.origin`/`sender.url` check**, and the manifest's `externally_connectable.matches` is a domain restriction only (not an unforgeable trust boundary). Any page matching `*://*.bcc.kz/*`, `https://ib.bcc.kz/*`, `*://*.bank.corp.centercredit.kz/*`, etc., can invoke this listener. Per the harness, a fixed-domain `externally_connectable` match is exploitable via XSS on those domains, and here there isn't even a runtime origin check. So `request["arg"]` is genuinely attacker-controllable. ✅

**(b) Source→sink path (unbroken?):**
`background.js:24` `sendHttpRequestToLS(request["arg"], sendResponse)` → `sendHttpRequestToLS(reqObj, ...)` at `background.js:100` → `reqObj.url` reaches `background.js:106` (`re.test(reqObj.url)`) and `background.js:113` (`httpReq.open("POST", reqObj.url)`). No reassignment, no constant overwrite. The path is direct and unbroken. ✅

**(c) Whi

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
