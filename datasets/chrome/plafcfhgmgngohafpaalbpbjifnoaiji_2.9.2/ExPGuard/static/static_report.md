# ExPAgent Static Verification — plafcfhgmgngohafpaalbpbjifnoaiji v2.9.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.954, scope=0.984
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background/background` [BG_1] @ L1223:C14 -> L1223:C21
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background/background` [BG_1] @ L480:C2 -> L483:C4
- **Severity evidence**: ['https://*.incometax.gov.in/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

**Finding: TRUE_POSITIVE**

### 1. Source control
The source is `chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {...})` in `background/background.js` (L1219–1221). The `request` object is entirely attacker-controlled by any page permitted by `externally_connectable`.

The manifest `externally_connectable.matches` includes:
- `https://*.incometax.gov.in/*`
- `https://*.mca.gov.in/*`
- `https://*.gst.gov.in/*`
- and other wildcard subdomain patterns.

There is no `sender.id` allowlist. The only restriction is origin matching, which the harness correctly treats as scope reduction, not an unforgeable trust boundary (XSS on a permitted origin, or control of a wildcard-matched subdomain, allows an attacker to satisfy it). Therefore the source is genuinely untrusted/attacker-controllable.

### 2. Source-to-sink path
The primary evidence and raw source both confirm the path is unbroken:

- L1221–1233: `onMessageExternal` receives `request`, and calls:
  ```js
  rv = commonListener(sender, request, sendResponse, tabInfo);
  ```
- L469–486 `commonListener`:
  ```js
  function commonListener(sender, request, sendResponse, tabInfo){
 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
