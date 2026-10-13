# ExPAgent Static Verification — acbabkahihnlnpajiajhimlkihphdbfi v2.17

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 14  |  Verified: 14
- Coverage: node=0.986, scope=1
- Flow types: {'STORAGE_POSOING': 10, 'REQUEST_FORGERY': 4}  |  Severities: {'MEDIUM': 14}

**Assessment:** Verified 14 flow(s): 14 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `content` [CS_1] @ L31:C0 -> L62:C2
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L33:C2 -> L33:C46
- **Bridge**: message `runtime.single.sender.message[background->content]`
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`UNTRUSTED_STORAGE`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification analysis

### Discrepancy resolution
The normalized summary record's `codeContext` shows a `content.js` `chrome.runtime.onMessage.addListener` writing `{myKey: message}` at L33, and the harness warns that the resolved anchor does not contain `onMessageExternal`. However, the authoritative primary evidence (`report.source.md`, flow id #3) and my raw-source inspection both place the real flow in **`background.js` inside `chrome.runtime.onMessageExternal.addListener`**. I verified every propagation line against `background.js` and they match exactly. The `content.js` snippet in the summary is a mis-attributed anchor; the actual source-to-sink chain is the background external-message → storage flow.

### Four-part ledger

**(a) Who controls the source?** `request` in `background.js` L284 `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => ...)`. This listener is reachable from externally-connectable web origins (`https://examroom.ai/*`, `test`/`dev` subdomains, `http://localhost:8010/*`). A page on those origins — or XSS on them — can `chrome.runtime.sendMessage(EXT_ID, payload)` and fully control `request`. Attacker-controllable, restricted

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L293:C38 -> L293:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L292:C18 -> L296:C14
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {...})` at `background.js:284`. `request` is fully controlled by whatever external context is permitted to message the extension. The manifest `externally_connectable.matches` restricts this to `https://examroom.ai/*`, `https://test.examroom.ai/*`, `https://dev.examroom.ai/*`, and `http://localhost:8010/*`. There is **no `sender.id` allowlist** (`authenticatedExtensionAllowlist: null` in the harness), and the listener body performs **no origin/field validation** before the sink. Per the rules, a restricted `externally_connectable` origin is not an unforgeable trust boundary — XSS (or control) on those domains still reaches the listener. So the source is attacker/untrusted-controllable with a reduced attack surface.

**(b) Exact source-to-sink path**
The listener's first statement (no intervening guard) is:

```
284  chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
...
292      await chrome.storage.local.set({
293          Sendmsgcontentscript: request?.key || null,
294          ClearBlockingkey: requ

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L293:C38 -> L293:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L292:C18 -> L296:C14
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ### Four-part decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => …)` at `background.js:284`. Any page whose origin matches the manifest's `externally_connectable.matches` list can send a message here:

```
https://examroom.ai/*
https://test.examroom.ai/*
https://dev.examroom.ai/*
http://localhost:8010/*
```

There is **no `sender.id` fixed-extension allowlist** and no `sender.origin`/`sender.url` validation inside the listener. The listener begins handling `request` unconditionally. Per the harness rules, origin-only restrictions reduce the attack surface but are still exploitable via XSS/subdomain compromise on those listed origins.

**(b) Exact source-to-sink path**
The report's propagation is direct, in the same function:

- `L284` `onMessageExternal.addListener(...)` receives `request`
- `L292-296` immediately executes:

```js
await chrome.storage.local.set({
    Sendmsgcontentscript: request?.key || null,
    ClearBlockingkey: request || null,
    examTabId: examTabId || null
});
```

The tainted span `request` (`L293:C38-45`) flows straight into `chrome.storage.local.set` with no san

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L293:C38 -> L293:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L451:C26 -> L454:C22
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow #3 verification — STORAGE_POSOING (attacker-input-storage-write)

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => ...)` at `background.js:284`. `request` is fully attacker-controlled when the message comes from a page allowed by `externally_connectable`:

```json
"matches": [
  "https://examroom.ai/*",
  "https://test.examroom.ai/*",
  "https://dev.examroom.ai/*",
  "http://localhost:8010/*"
]
```

There is **no `sender.id` allowlist, no `sender.origin`/`sender.url` check, and no action/type allowlist** in the listener. I searched for `sender.id`, `sender.origin`, `sender.url`, `onMessageExternal`, `onConnectExternal`; the only `onMessageExternal` handler is the one at line 284, and it does not authenticate the sender.

### (b) Exact source-to-sink path
The listener immediately writes attacker-controlled fields into storage before any branching:

```js
// L292-296
await chrome.storage.local.set({
    Sendmsgcontentscript: request?.key || null,
    ClearBlockingkey: request || null,      // entire attacker-controlled object
    examTabId: examTabId || null
});
```

The flagged sink is the `candida

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #4 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L293:C38 -> L293:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L462:C26 -> L465:C22
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 (report.flows.json id #3)

**Source:** `chrome.runtime.onMessageExternal.addListener` in `background.js` (MV3 service worker). The listener receives `(request, sender, sendResponse)` with no browser-authenticated sender boundary.

**Path:** The external message `request` flows directly into multiple `chrome.storage.local.set` calls. The flagged sink is the `request.key === "checkInstallation"` branch:

```js
if (request.key === "checkInstallation") {
    await chrome.storage.local.set({
        clientId: request.clientId || null,
        examId: request.examIdToUnblock || null
    });
    ...
}
```

I inspected `background.js` L280–522. The listener has **no** `sender.id` allowlist and **no** origin/url validation. The only gate is `request.key === "checkInstallation"`, which is an attacker-chosen message field, not a trust anchor. The stored values (`request.clientId`, `request.examIdToUnblock`) are written verbatim with only a `|| null` fallback — no sanitization, type/schema validation, or allow-list.

**Attack surface:** `externally_connectable.matches` restricts senders to `https://examroom.ai/*`, `https://test.examroom.ai/*`, `https://dev.examroom.a

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #5 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L293:C38 -> L293:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L462:C26 -> L465:C22
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis — Flow #3 (STORAGE_POSOING)

### (a) Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => …)` at `background.js:284`. This listener receives messages from **web pages** on the `externally_connectable.matches` origins (`https://examroom.ai/*`, `https://test.examroom.ai/*`, `https://dev.examroom.ai/*`, `http://localhost:8010/*`). The message body `request` is entirely supplied by the sending page — i.e., the `key`, `clientId`, and `examIdToUnblock` fields are attacker-influenced whenever an attacker can run script on one of those origins (e.g., XSS on examroom.ai, or anything served from `localhost:8010`).

### (b) Exact source-to-sink path
The report's propagation is confirmed by reading the raw source:

- L284: `onMessageExternal` registers the handler.
- L292–296: the handler immediately stores `request?.key` and the raw `request` object into `chrome.storage.local` (this alone is a poisoning write).
- L448: `if (typeof request === "object")`.
- L460: `if (request.key === "checkInstallation")` — a check on an **attacker-chosen field**, not a trust anchor.
- L462–465:
  ```js
  await chrome.s

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #6 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L293:C38 -> L293:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L481:C26 -> L484:C22
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've inspected the actual source. The report evidence plus the raw code confirm the chain.

## Analysis

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => ...)` at `background.js:284`. The message payload (`request`) is controlled by any web page allowed by `externally_connectable`. The manifest restricts it to:
- `https://examroom.ai/*`
- `https://test.examroom.ai/*`
- `https://dev.examroom.ai/*`
- `http://localhost:8010/*`

There is **no `sender.id` allowlist and no `sender.origin`/`sender.url` check** anywhere in the listener. The only trust boundary is the `externally_connectable` origin match — a web-origin restriction, which per the harness/browser trust rules is exploitable via XSS on any of those domains (or directly from `http://localhost:8010`). The sender guard is therefore not a browser-authenticated extension-ID boundary.

**(b) Exact source-to-sink path**
1. `background.js:284` — external message listener receives attacker-controlled `request`.
2. `background.js:448` — `if (typeof request === "object")`.
3. `background.js:479` — `if (request.key === "installExtension")` (attacker-chosen key).
4. `backgrou

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #7 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L293:C38 -> L293:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L481:C26 -> L484:C22
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification: STORAGE_POSOING via `onMessageExternal`

### Decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => ...)` (background.js L284). `request` is a message object fully controlled by any page allowed by `externally_connectable.matches`: `https://examroom.ai/*`, `https://test.examroom.ai/*`, `https://dev.examroom.ai/*`, and `http://localhost:8010/*`. All of these are web origins, not browser-authenticated extension IDs, so an attacker who can execute JS on those origins (e.g. XSS on examroom.ai, or the dev/localhost origin) controls `request` completely. There is no `sender.id` fixed-ID allowlist; the harness confirms `authenticatedExtensionAllowlist: null`.

**(b) Exact source-to-sink path:**
External message object `request` → `request.key === "installExtension"` gate (L479, attacker-chosen field) → `chrome.storage.local.set({clientId: request.clientId || null, examId: request.examIdToUnblock || null})` (L481–484). The propagation shows `request` (ASSIGN:identifier) flowing through member accesses into the storage sink. The gate is not a trust boundary — it is a check on an attacker-suppli

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #8 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L293:C38 -> L293:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L499:C26 -> L501:C22
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #8 (STORAGE_POSOING / attacker-input-storage-write)

### 1. Source control
The source is `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => ...)` at `background.js:284`. This is a true external-message surface. The manifest `externally_connectable.matches` includes `https://examroom.ai/*`, `https://test.examroom.ai/*`, `https://dev.examroom.ai/*`, and `http://localhost:8010/*`. Any page on those origins can legitimately call `chrome.runtime.sendMessage` to this extension, and an XSS on those same origins can do so as well. The entire `request` object is attacker-controlled.

### 2. Source-to-sink path
The propagation is straightforward and confirmed in real source:

- `L284` external listener receives `request`.
- `L497` gate: `if (request.key === "candidatePassword")` — this is a check on an **attacker-chosen field**, not a trust anchor; the attacker trivially sets `key` to `"candidatePassword"`.
- `L499-501`: `await chrome.storage.local.set({ myPassword: request.value })` — the tainted `request.value` is written verbatim into extension storage.

The bridge is not broken: the action/key gate is attacker-satisfiable and the stor

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #13 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `content` [CS_1] @ L31:C0 -> L62:C2
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L864:C18 -> L871:C14
- **Bridge**: storage `STORAGE_FLOW[area: local, key: clientId, sender: background, receiver: background]`
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. The code confirms the primary report:

- `chrome.runtime.onMessageExternal.addListener` at background.js L284 has **no `sender.id` allowlist, no origin check, no validation** before reaching storage.
- L292–296 unconditionally executes `chrome.storage.local.set({ Sendmsgcontentscript: request?.key, ClearBlockingkey: request, examTabId })` — the entire `request` object is attacker-controlled.
- Branches at L451 (`candidateData: request.value`), L462/481 (`clientId: request.clientId`, `examId: request.examIdToUnblock`), and L499 (`myPassword: request.value`) also write raw attacker fields to `chrome.storage.local`.

Decision ledger:
1. **Source control**: `onMessageExternal` messages come from web origins in `externally_connectable.matches` (`https://examroom.ai/*`, `test/dev` subdomains, `http://localhost:8010/*`). Those are web origins, not browser-authenticated extension IDs; a page there (or XSS on it) controls `request` completely. No fixed-ID allowlist exists (`authenticatedExtensionAllowlist: null`).
2. **Path**: `onMessageExternal` → `request` fields → `chrome.storage.local.set(...)` with no sanitization/guard (`Sanitized: False` in the repor

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #9 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `content` [CS_1] @ L293:C38 -> L293:C45
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L570:C31 -> L577:C10
- **Bridge**: storage `STORAGE_FLOW[area: local, key: candidateData, sender: background, receiver: background]`
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have sufficient evidence to decide this flow. Let me lay out the verification.

## Four-part decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => ...)` at background.js L284. `request` is fully controlled by whatever external page/extension sends the message. There is **no `sender.id` or `sender.origin` check inside the listener** — the only boundary is the manifest `externally_connectable.matches` (`https://examroom.ai/*`, `test.`/`dev.` examroom, `http://localhost:8010/*`). Per the browser trust rules, origin/match restrictions reduce scope but are not unforgeable (XSS on those origins, or direct control of `localhost:8010` in dev, lets an attacker drive the message). Source is genuinely attacker-controllable under that prerequisite.

**(b) Exact source-to-sink path.**
1. External message handler, branch `request.key === "candidateDetails"` (L450–454): `await chrome.storage.local.set({ candidateData: request.value, isRunningExam: true })` — the entire `request.value` object is stored raw, no schema/allow-list/sanitization.
2. `saveGeturLogs` (L525) later reads it back: `const { candidateData } = await

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #10 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `content` [CS_1] @ L293:C38 -> L293:C45
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L1164:C31 -> L1173:C10
- **Bridge**: storage `STORAGE_FLOW[area: local, key: clientId, sender: background, receiver: background]`
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `7`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #7 — REQUEST_FORGERY (attacker input → network send body)

### 1. Who controls the source?
The source is `chrome.runtime.onMessageExternal` at `background.js:284`. The handler signature is `(request, sender, sendResponse)` and there is **no `sender.id` check, no `sender.origin` check, no fixed-extension allowlist** (the harness confirms `authenticatedExtensionAllowlist: null`). The only gate is the manifest `externally_connectable.matches`, restricted to `https://examroom.ai/*`, `https://test.examroom.ai/*`, `https://dev.examroom.ai/*`, and `http://localhost:8010/*`.

Per the audit rules: externally_connectable with specific hosts is a real attack-surface reduction, but it is still exploitable via XSS/subdomain takeover on those origins; it does **not** neutralize the flow. The `request.key === "checkInstallation"` branch gate is an attacker-chosen field, not an authentication boundary. So the source is attacker-controllable (subject to XSS on an allow-listed origin).

### 2. Source-to-sink path
Confirmed from the raw source:

- `background.js:284` — `onMessageExternal` receives `request`.
- `background.js:460` — `if (request.key === "checkInstallation")` (a

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #11 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `content` [CS_1] @ L293:C38 -> L293:C45
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L75:C31 -> L77:C9
- **Bridge**: storage `STORAGE_FLOW[area: local, key: clientId, sender: background, receiver: background]`
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `7`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification — Request Forgery via `onMessageExternal` → `storage.local` → `fetch`

### 1. Who controls the source?
The source is `chrome.runtime.onMessageExternal` in `background.js:284`. The listener has **no `sender.id`, `sender.url`, or `sender.origin` guard** — I searched for `sender.id` / `sender.url` / `sender.origin` and found no matches.

The manifest restricts the message surface to:
- `https://examroom.ai/*`
- `https://test.examroom.ai/*`
- `https://dev.examroom.ai/*`
- `http://localhost:8010/*`

This is a web-origin restriction, not a browser-authenticated fixed-ID IPC boundary. Per the threat model, these origins are exploitable via XSS (and `localhost:8010` is a dev origin). So the source is attacker/untrusted-controllable.

### 2. The source-to-sink path
Confirmed in raw source:

- `background.js:284` — `onMessageExternal.addListener((request, sender, sendResponse) => ...)`
- `background.js:460-465` — branch `request.key === "checkInstallation"` stores the attacker-controlled field:
  ```js
  await chrome.storage.local.set({
      clientId: request.clientId || null,
      examId: request.examIdToUnblock || null
  });
  ```
- `background.js:475` — `await getAl

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #12 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `content` [CS_1] @ L31:C0 -> L62:C2
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L831:C39 -> L833:C17
- **Bridge**: storage `STORAGE_FLOW[area: local, key: clientId, sender: background, receiver: background]`
- **Severity evidence**: ['https://examroom.ai/*']
- **Source report Flow ID**: `7`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #7 (REQUEST_FORGERY, `attacker-input-network-send`)

### 1. Source control
The genuine source (from `report.source.md` Flow #7) is `chrome.runtime.onMessageExternal` in `background.js` L284–296, not the `content.js` `onMessage` anchor shown in the normalized record. The harness itself flagged this anchor mismatch.

I inspected `background.js`:

- L284: `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {...})`
- L292–296: immediately stores `request` fields into `chrome.storage.local` (`Sendmsgcontentscript`, `ClearBlockingkey`, `examTabId`).
- L448: `if (typeof request === "object")` → L460 `if (request.key === "checkInstallation")` → L462–465 stores `clientId: request.clientId || null` and `examId: request.examIdToUnblock || null`, then L475 calls `getAllowedExtensions()`.
- A second branch L479–484 (`installExtension`) stores the same `clientId`.

**No sender trust boundary exists.** `search_code` for `sender.id|sender.origin|sender.url|sender.tab` returned **no matches**. The manifest restricts `externally_connectable` to `https://examroom.ai/*`, `test`/`dev` subdomains, and `http://localhost:8010/*`, but there is no fixed-e

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
