# ExPAgent Static Verification — ifajfiofeifbbhbionejdliodenmecna v5.0.10.844

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.834, scope=0.839
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 1, 'UNKNOWN': 1}

**Assessment:** Verified 2 flow(s): 0 true-positive, 1 false-positive, 1 partial-available (PA), 0 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟠 PARTIAL / PA  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` in `Common/core-libs` [CS_2] @ L6:C6858 -> L6:C6859
- **Sink**: `WINDOW_POSTMESSAGE` in `Common/core-libs` [CS_2] @ L6:C7024 -> L6:C7077
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 20, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Reclassified from FALSE_POSITIVE to PARTIAL / PA because the source is guarded by a fixed browser-authenticated extension-ID allowlist. Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onConnectExternal.addListener(L)`, and `L` only registers a message handler after this gate:

```js
function L(e){e&&e.sender&&e.sender.id&&C(e.sender.id)&&e.onMessage.addListener(x.bind(e))}
```

`C(e.sender.id)` is `M.indexOf(e) >= 0`, where `M` is a fixed allowlist of 10 hard-coded extension IDs. `sender.id` is browser-populated from the sender extension's public key, so an ordinary webpage cannot forge it. This is a **browser-authenticated fixed-sender-ID boundary**, not web-controlled input.

**(b) Exact source-to-sink path**
`onConnectExternal` → `L(port)` → allowlist check → `port.onMessage.addListener(x.bind(port))` → `x(msg)` → for `msg.type === "query"` with `D.onQuery` falsy:

```js
t.postMessage({queryId:e.id,type:"answer",data:null})
```

Crucially, `x` is bound to the `Port` (`x.bind(e)`), so `const t = this` is the `chrome.runtime.Port`, and `t.postMessage(...)` is **`Port.postMessage`**, not `window.postMessage`. The ExPGuard sink type `WINDOW_POSTMESSAGE` is a misclassification of the minified `t.postMessage`.

**(c) Security-relevant API argument**
The sink is a message sent bac

**Attacker control:** See preserved static analyst transcript.

**PA category:** `PA_PARTIAL_TRUSTED_IPC`

**Why partially available:** The privileged path is reachable only from a fixed, browser-authenticated extension sender ID. It is not reachable by an ordinary webpage, but remains partially available to the trusted companion/peer extension (or if that peer is compromised).

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.PA_PARTIAL_TRUSTED_IPC: do not attempt as an ordinary webpage; requires the browser-authenticated companion extension.

---

## Flow #1 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `background-service` [BG_1] @ L12:C149317 -> L12:C149326
- **Sink**: `FETCH_RESOURCE` in `background-service` [BG_1] @ L12:C149708 -> L12:C149863
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 168, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': ['FULL']}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (`WINDOW_CUSTOM_EVENT` → `FETCH_RESOURCE`)

### 1. Source: not attacker-controllable
The reported source is `self.addEventListener("fetch", (e => {...}))` at `background-service.js L12:C149317`.

This is a **service-worker FetchEvent handler**, not a `window` custom event. ExPGuard's source type `WINDOW_CUSTOM_EVENT` and remark `window.addEventListener(fetch)` are a misclassification. In an MV3 extension, the service worker's `fetch` event fires for requests made within the extension's own origin/scope (extension pages, the SW itself). `e.request` is a `Request` object constructed by the **browser** for the extension's own outbound request.

Web content cannot dispatch a `fetch` event into the extension service worker, and it cannot choose `e.request` on this path. There is no content-script DOM source, no `onMessage`/`onMessageExternal` bridge (`crossBoundary.messagePassing=false`, `storagePassing=false`), and `externallyConnectable` is `null`. Nothing in the propagation injects attacker data into `e.request`.

### 2. Path
The full minified handler (confirmed via `read_minified_range`) is:

```js
self.addEventListener("fetch",(e=>{
  if(..., "GET"!==e.re

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
