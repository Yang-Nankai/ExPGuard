# ExPAgent Static Verification — fjjlkgnbokonfaiffccmofmfopdlfmmf v3.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 2
- Coverage: node=0.972, scope=1
- Flow types: {'REQUEST_FORGERY': 3}  |  Severities: {'MEDIUM': 3}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/service-worker` [BG_1] @ L110:C12 -> L110:C19
- **Sink**: `FETCH_HEADERS` in `scripts/service-worker` [BG_1] @ L121:C11 -> L125:C6
- **Severity evidence**: ['https://etrain.info/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (REQUEST_FORGERY via `onMessageExternal` → `fetch`)

### 1. Source control
The source is `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => …)` at **scripts/service-worker.js L108**. `request` is entirely supplied by the message sender. There is **no** `sender.id`/`sender.origin` guard anywhere around the listener (confirmed by search — the only `sender` usage is the unrelated `"canRun"` branch that checks `sender.url.lastIndexOf(state.iFURL, 0)`, not the `"apiReq"` branch). So the message payload, including `request.type` and `request.data`, is attacker-controlled.

### 2. Path into the sink
Confirmed from source:

- **L110** `switch (request.type)`
- **L111** `case "apiReq":`
- **L112** `const req = JSON.parse(request.data);`
- **L121–125** `return fetch(req.action, { method: req.method?.toLowerCase() ?? "get", headers: req.header, body: req.data ? (isJSON ? JSON.stringify(req.data) : req.data) : undefined })`

The propagation report matches exactly. `req.action` (URL), `req.method`, `req.header`, and `req.data` (body) are all derived directly from attacker-supplied `request.data` with no validation, scheme check, host allo

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/service-worker` [BG_1] @ L110:C12 -> L110:C19
- **Sink**: `FETCH_BODY` in `scripts/service-worker` [BG_1] @ L121:C11 -> L125:C6
- **Severity evidence**: ['https://etrain.info/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification: REQUEST_FORGERY via `onMessageExternal` → `fetch`

### 1. Source controllability
The source is `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => ...)` at `scripts/service-worker.js:108`. The message `request` is entirely supplied by an external messenger. The manifest's `externally_connectable` restricts senders to:

- `https://etrain.info/*`
- `https://m.etrain.info/*`
- `https://www.tripozo.com/*`

There is **no** `sender.id` allowlist and **no** `sender.origin`/`sender.url` check in the listener. Per the harness trust rules, a specific-host `externally_connectable` restriction reduces the attack surface but does not eliminate it: any script executing in one of those origins (XSS, a compromised page, or the site itself) can drive the flow. The action selector `request.type` and payload `request.data` are attacker-chosen, not a trust anchor.

### 2. Source-to-sink data path (unbroken)
The primary report's propagation is corroborated by the raw source:

- L110: `switch (request.type)` → attacker chooses `"apiReq"`.
- L112: `const req = JSON.parse(request.data);` — attacker-controlled JSON object.
- L121-125:
  ```js
  return fetc

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
