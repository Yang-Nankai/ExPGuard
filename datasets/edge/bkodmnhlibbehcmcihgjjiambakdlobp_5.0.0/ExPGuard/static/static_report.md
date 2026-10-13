# ExPAgent Static Verification — bkodmnhlibbehcmcihgjjiambakdlobp v5.0.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 2
- Coverage: node=0.995, scope=1
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L188:C8 -> L188:C15
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L11:C8 -> L32:C10
- **Bridge**: storage `STORAGE_FLOW[area: sync, key: search_history, sender: background, receiver: background]`
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `9`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the full source path. Here is my analysis.

## Decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener(function(request){...})` at L187–194. The listener uses only `request` and never inspects `sender`/`sender.id`. Because `externally_connectable` is missing, the browser's default allows **any other installed extension** to connect (web pages are blocked, but any external extension ID is accepted). The entire `request` object is attacker-controlled by that external extension. There is no fixed-ID allowlist, so this is not a trusted-peer boundary — it is an open cross-extension message surface.

**(b) Source → sink path (unbroken):**
- L188 `if (request)` → L189 `if (request.msg === 'popupSearch')` → L190 `onClickHandler(request)`.
- `onClickHandler` guard at L94–95: for a `popupSearch` message, `info.menuItemId` and `info.action` are `undefined`, so both exclusion clauses are false and the guard passes (an external sender need only send `{msg:'popupSearch', selectionText:'...'}`).
- L123 `const searchSelection = info.selectionText || info.data.search` — attacker-controlled.
- L128 `updateHistory(searchSelection, ebaySearchUrl, i

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L188:C8 -> L188:C15
- **Sink**: `CHROME_SYNC_STORAGE` in `popup` [POPUP_1] @ L231:C8 -> L234:C10
- **Bridge**: storage `STORAGE_FLOW[area: sync, key: search_history, sender: background, receiver: popup]`
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `13`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #13 — STORAGE_POSOING (`attacker-input-storage-write`)

### 1. Who controls the source?

The true source is `chrome.runtime.onMessageExternal.addListener(function (request) { ... })` at `background.js:187-194`. The manifest has **no `externally_connectable` key** (`"externallyConnectable": null`). In Chrome, when `externally_connectable` is absent, **any other installed extension** can message this extension via `runtime.sendMessage(targetId, …)` — the `ids` allowlist is unrestricted by default. Web pages are *not* directly able to connect (no `matches`), but a malicious or compromised companion extension is.

The listener ignores the `sender` parameter entirely and has no `sender.id`/origin allowlist. The only gate is `request.msg === 'popupSearch'`, which is an attacker-chosen message field, not an authentication boundary. So `request.data.search` (and `request.selectionText`) is fully attacker-controlled.

### 2. Exact source→sink data path

- `background.js:187` `onMessageExternal.addListener(function (request) {`
- `background.js:189-190` `if (request.msg === 'popupSearch') onClickHandler(request);`
- `background.js:93-98` `onClickHandler(info)` — guard

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
