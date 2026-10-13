# ExPAgent Static Verification — jjjoiagdgjhecijlkfkipeilgfgbhkgc v0.012

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 4
- **Not reviewed due to analysis budget:** 3 flow(s): [0, 1, 6]
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 2, 'STORAGE_POSOING': 4, 'UNKNOWN': 1}  |  Severities: {'UNKNOWN': 7}

**Assessment:** Verified 4 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 3 duplicate; 0 flagged triggerable for dynamic testing; 3 not reviewed due to the analysis budget.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L43:C1 -> L43:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [UNKNOWN] @ L9:C1 -> L9:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'request.obj[key]'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: Flow id #3 — `STORAGE_POSOING`

### (a) Source control
The source is `chrome.runtime.onMessageExternal.addListener` (`background.js:25`), reachable by any web origin permitted by `externally_connectable.matches`: `https://*.onionfist.com/*`.

The listener branches on the attacker-chosen `request.code`. When `request.code === "set_from_web"`, it iterates over `request.obj`:

```js
for (let key in request.obj) {
    let val = to_num(request.obj[key]);
    obj[key] = val;
}
chrome.storage.local.set(obj);
```

`request.obj` — both keys and values — is entirely attacker-controlled. The `code` field check is not a trust boundary; the attacker simply supplies `"set_from_web"`.

### (b) Source-to-sink path
The path is unbroken:

1. `request.obj` (external message payload) — `background.js:43`
2. `request.obj[key]` passed to `to_num(...)` — `background.js:44`
3. `to_num` returns either the numeric conversion or the original string/value — `background.js:9-14`
4. Result assigned into `obj[key]` — `background.js:45`
5. `chrome.storage.local.set(obj)` writes the attacker-controlled object to extension storage — `background.js:49`

The reported sink anchor `L9` (`let n = (

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L43:C1 -> L43:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [UNKNOWN] @ L44:C1 -> L44:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `4`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 2, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Semantically identical to flow #2. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: Flow id #3 — `STORAGE_POSOING`

### (a) Source control
The source is `c...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L117:C1 -> L117:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [UNKNOWN] @ L9:C1 -> L9:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `5`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'request.new_data[key]'}

**Reasoning:** Semantically identical to flow #2. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: Flow id #3 — `STORAGE_POSOING`

### (a) Source control
The source is `c...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L117:C1 -> L117:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [UNKNOWN] @ L118:C1 -> L118:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `6`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 2, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Semantically identical to flow #2. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: Flow id #3 — `STORAGE_POSOING`

### (a) Source control
The source is `c...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
