# ExPAgent Static Verification — ilehaonighjijnmpnagapkhpcdbhclfg v7.5.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 5
- Coverage: node=0.183, scope=0.099
- Flow types: {'STORAGE_POSOING': 4, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 4, 'UNKNOWN': 1}

**Assessment:** Verified 5 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 3 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #4 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `src/background` [BG_1] @ L13:C19307 -> L13:C19308
- **Sink**: `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` in `src/background` [BG_1] @ L13:C19868 -> L13:C19960
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 288, 'rawSteps': 235, 'distinctLines': 2, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 (source-report Flow #2)

### (a) Who controls the source?
The source is the whole inbound message object `e` in the background service worker's `chrome.runtime.onMessageExternal.addListener((e,t,n)=>{...})` (`src/background.js`, line 13). This listener is reached by:

- any web page whose origin matches `externally_connectable.matches` (`http://127.0.0.1/*`, `http://localhost/*`, `*://*.getgrass.io/*`, `*://*.grass.io/*`), or
- any external extension.

There is **no `sender.id`, `sender.origin`, or `sender.url` check anywhere** in the bundle (verified by regex search: zero matches for `sender.id`/`sender.origin`/`sender.url`/`t.id`). The `sender` parameter `t` is unused. So the source is attacker-controllable; the manifest host allowlist narrows the attack surface (XSS on getgrass.io/grass.io, a localhost/127.0.0.1 attacker, or an installed malicious extension) but does not neutralize it.

### (b) Exact source-to-sink path
From the raw minified source around the sink:

```js
chrome.runtime.onMessageExternal.addListener((e,t,n)=>{
  const{type:r,payload:s}=e;
  switch(r){
    case J.Ping: n("pong"); return;
    case J.GetCurrentVersion: n({success:!0,data:

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `src/background` [BG_1] @ L13:C19307 -> L13:C19308
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/background` [BG_1] @ L1:C15174 -> L1:C15223
- **Severity evidence**: ['*://*.getgrass.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 150, 'distinctLines': 2, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me lay out the four-part ledger.

## (a) Who controls the source

`chrome.runtime.onMessageExternal.addListener((e,t,n)=>{const{type:r,payload:s}=e;switch(r){…}})` — the source is an external runtime message. The manifest `externally_connectable.matches` allows:
- `http://127.0.0.1/*` and `http://localhost/*` (any local web page)
- `*://*.getgrass.io/*` and `*://*.grass.io/*` (wildcard subdomains)

There is **no `sender.id` allowlist** (`authenticatedExtensionAllowlist: null` in the harness) and the listener never even reads the `sender` argument `t`. The dispatch is based purely on the message `type` field, which is attacker-chosen. Per the browser-trust rules, wildcard-subdomain / origin matches are exploitable via XSS or subdomain control, and `127.0.0.1/localhost` pages are directly attacker-hostable surfaces. So the source is genuinely attacker-controllable.

## (b) Source-to-sink path

The report's propagation is corroborated by the raw bundle:

- Source (L13 C19307): `…onMessageExternal.addListener((e,t,n)=>{const{type:r,payload:s}=e;switch(r){…`
- Case `J.AuthenticateUser` (L13 C19280–19920): 
  ```js
  case J.AuthenticateUser:
    retu

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `src/background` [BG_1] @ L13:C19307 -> L13:C19308
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/background` [BG_1] @ L1:C15174 -> L1:C15223
- **Severity evidence**: ['*://*.getgrass.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 150, 'distinctLines': 2, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me lay out the four-part ledger.

## (a) Who controls t...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `src/background` [BG_1] @ L13:C19307 -> L13:C19308
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/background` [BG_1] @ L1:C15174 -> L1:C15223
- **Severity evidence**: ['*://*.getgrass.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 150, 'distinctLines': 2, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me lay out the four-part ledger.

## (a) Who controls t...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `src/background` [BG_1] @ L13:C19307 -> L13:C19308
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/background` [BG_1] @ L1:C15174 -> L1:C15223
- **Severity evidence**: ['*://*.getgrass.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 150, 'distinctLines': 2, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me lay out the four-part ledger.

## (a) Who controls t...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
