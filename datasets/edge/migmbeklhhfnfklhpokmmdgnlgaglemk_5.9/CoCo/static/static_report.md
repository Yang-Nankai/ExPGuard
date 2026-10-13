# ExPAgent Static Verification — migmbeklhhfnfklhpokmmdgnlgaglemk v5.9

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [1]
- Coverage: node=0, scope=0
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `eventPage.js` [UNKNOWN] @ L112:C1 -> L112:C1
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `eventPage.js` [UNKNOWN] @ L127:C1 -> L127:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'PRIVILEGED_OPERATION', 'flowMeta': {'totalSteps': 6, 'omitted': 0}, 'propagation': 'request.getTargetData.split("#") | split[0] | parseInt(split[0]) | leftpos = parseInt(split[0]) - 420'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — Flow #1 (`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_WINDOWS_CREATE_OPTIONS`)

### 1. Who controls the source
`eventPage.js:111` registers `chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {...})`. The tainted field is `request.getTargetData`, i.e., a string supplied by an external message sender. There is **no `sender.id` allowlist, no `sender.origin`/`sender.url` check, and no action-type gate** — the handler acts on the message unconditionally (only `if (request.getTargetData)`).

Reachability nuance: the manifest does **not** declare `externally_connectable` (`null`), so per Chrome's defaults *web pages cannot connect*, but *all other installed extensions can* send messages to this extension by ID. So the attacker surface is any other extension (or a compromised extension), not an arbitrary page. It is still external, unauthenticated input with no browser-authenticated peer boundary.

### 2. Source-to-sink data path (confirmed)
- L114: `var split = request.getTargetData.split("#");` → attacker string split.
- L115: `if(split.length > 1)` (attacker-satisfiable — just include `#`).
- L117: `var leftpos = parseInt(split[0

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
