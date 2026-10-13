# ExPAgent Static Verification — aahnibhpidkdaeaplfdogejgoajkjgob v13.1.0.9

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- **Not reviewed due to analysis budget:** 2 flow(s): [0, 1]
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 2, 'REQUEST_FORGERY': 2}  |  Severities: {'UNKNOWN': 4}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L215:C1 -> L215:C1
- **Sink**: `FETCH_RESOURCE` in `background.js` [UNKNOWN] @ L99:C1 -> L99:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'NETWORK_SEND', 'flowMeta': {'totalSteps': 5, 'omitted': 0}, 'propagation': "encodeURI(link) | '?action=add-url&download_dir=0&token=' + token + '&s=' + encodeURI(link) | params += '&path=' + where"}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the source-level report and the code around the source and sink anchors. Let me lay out the verification.

## Decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => ...)` at background.js L211 receives the whole `message` object from an external sender. The manifest has `externally_connectable: null` (omitted), which means web pages cannot connect, but other installed extensions can send `runtime.sendMessage("<id>", …)`. Crucially, there is **no `sender.id` allowlist, no `sender.origin`/`sender.url` check, and no validation of sender identity** anywhere in the listener (L211–226). `message.type`, `message.url`, and `message.folder` are all attacker-chosen fields. The `switch (message.type)` gate (`'ADD_TORRENT'`) and the `message.url.startsWith('magnet:')` gate are both satisfiable by the attacker, not trust anchors.

**(b) Exact source-to-sink path**
- L213–215: `case 'ADD_TORRENT': if (message.url && message.url.startsWith('magnet:'))` → attacker sets `type:'ADD_TORRENT'` and `url:'magnet:…'`.
- L216–217: `addTorrents(settings, message.url, message.folder)` → `message.url` is p

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L217:C1 -> L217:C1
- **Sink**: `FETCH_RESOURCE` in `background.js` [UNKNOWN] @ L99:C1 -> L99:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `4`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'NETWORK_SEND', 'flowMeta': {'totalSteps': 4, 'omitted': 0}, 'propagation': "params += '&path=' + where | params += '&path=' + where"}

**Reasoning:** Semantically identical to flow #2. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the source-level report and the code around the source and sink a...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
