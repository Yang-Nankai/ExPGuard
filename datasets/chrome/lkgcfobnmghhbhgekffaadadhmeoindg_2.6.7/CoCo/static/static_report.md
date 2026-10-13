# ExPAgent Static Verification — lkgcfobnmghhbhgekffaadadhmeoindg v2.6.7

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `crx_headers/cs_header.js` [UNKNOWN] @ L165:C1 -> L165:C1
- **Sink**: `WINDOW_POSTMESSAGE` in `crx_headers/cs_header.js` [UNKNOWN] @ L165:C1 -> L165:C1
- **Bridge**: storage `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'SENSITIVE_DATA', 'sinkCapability': 'MESSAGE_RESPONSE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification reasoning

### (a) Who controls the source
The reported "source" is extension storage: `chrome.storage.local` items `["whitelist", "toggleProxy", "proxyUrl"]`. This is **extension/private state**, not web-controllable. Per the popup code (`common/js/popup.js`), `proxyUrl` is a user-entered "Custom auth" proxy URL and `whitelist`/`toggleProxy` are user settings. So the source is genuine extension-held data (SENSITIVE_DATA/STORAGE_DATA).

### (b) Source-to-sink path
The injected report anchors are broken (file `crx_headers/cs_header.js` does not exist in the unpacked CRX, `L165` does not exist, `codeContext` is a synthetic literal `'key': 'value'`, propagation is empty). The harness confirms neither anchor resolves. I therefore inspected the real content script and found the matching semantic flow:

- `content-script.js:25` — `storage().get(["whitelist","toggleProxy","proxyUrl"], (items) => init(items));`
- `content-script.js:12-22` — `init` registers `window.addEventListener("message", ...)`; when `event.data.type == "getSettings"`:
- `content-script.js:14-20` — `window.postMessage({ type: "setSettings", value: items }, "*")`.

So the raw `items` object (including `p

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `crx_headers/cs_header.js` [UNKNOWN] @ L166:C1 -> L166:C1
- **Sink**: `WINDOW_POSTMESSAGE` in `crx_headers/cs_header.js` [UNKNOWN] @ L166:C1 -> L166:C1
- **Bridge**: storage `None`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'SENSITIVE_DATA', 'sinkCapability': 'MESSAGE_RESPONSE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification reasoning

### (a) Who controls the source
The reported "source" is extension...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
