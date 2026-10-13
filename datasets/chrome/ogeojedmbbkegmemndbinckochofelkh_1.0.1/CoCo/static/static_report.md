# ExPAgent Static Verification — ogeojedmbbkegmemndbinckochofelkh v1.0.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- **Not reviewed due to analysis budget:** 2 flow(s): [2, 0]
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 2}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #1 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `FETCH_RESPONSE` in `crx_headers/bg_header.js` [UNKNOWN] @ L12:C1 -> L12:C1
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `crx_headers/bg_header.js` [UNKNOWN] @ L12:C1 -> L12:C1
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'NETWORK_RESPONSE', 'sinkCapability': 'PRIVILEGED_OPERATION', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (PRIVILEGE_ESCALATION → declarativeNetRequest)

### 1. Primary-evidence assessment
The injected `report.source.md` is **insufficient on its own**: it points at `crx_headers/bg_header.js` (`responseText = 'data_from_fetch'`), a file that does **not exist** in the unpacked extension (`list_files` shows only `js/background.js`, `rules.json`, manifest, icons, locale, metadata). The harness likewise reports `resolved: false` for both anchors. The "FETCH_RESPONSE" source label is a CoCo placeholder. I therefore opened the real extension source (`js/background.js`) to verify.

### 2. Real code path (verified)
`js/background.js`:

```js
let service_host = 'https://afterdarkmode.com';

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    if (sender.origin === service_host && request.id) {
        chrome.storage.local.set({ 'id': request.id }, function(){
            updateRules(request.id);
        });
    }
});

function updateRules(id) {
    fetch(chrome.runtime.getURL('rules.json'))
        .then(response => response.json())
        .then(d => {
            d.addRules[0].action.redirect.transform.queryTransform.addOrReplace

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
