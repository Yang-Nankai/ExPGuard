# ExPAgent Static Verification — oeahfgfmnkihbleheokmoojhgahcekpp v2.0.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.982, scope=1
- Flow types: {'REQUEST_FORGERY': 3}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service_worker` [BG_1] @ L92:C12 -> L92:C19
- **Sink**: `FETCH_RESOURCE` in `service_worker` [BG_1] @ L30:C11 -> L33:C6
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

### (a) Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => ...)` at `service_worker.js:90-105`. The entire `message` object is attacker/untrusted-controlled **from another extension**. The manifest has `externally_connectable: null` (missing), which in Chrome means **any installed extension can connect via `onMessageExternal`** (only web pages are blocked). There is **no `sender.id` allowlist or any `sender` check at all**, so no browser-authenticated IPC boundary exists. This is a real cross-extension attack surface per the severity rubric.

### (b) Source-to-sink path
The propagation is direct and unbroken:

1. `L92` — `switch (message.type)`; `message` is the external message.
2. `L94` — branch on `message.url && message.url.startsWith('magnet:')`.
3. **Magnet branch** `L96` → `SendLinkTorrentApp(settings, message.url, message.folder)`:
   - `L21` `params = '...&s=' + encodeURI(link)` (link = `message.url`)
   - `L23` `if (where !== MAIN_FOLDER) params += '&path=' + where` (`where` = `message.folder`)
   - `L30` `fetch('http://'

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service_worker` [BG_1] @ L92:C12 -> L92:C19
- **Sink**: `FETCH_RESOURCE` in `service_worker` [BG_1] @ L112:C9 -> L115:C4
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

### (a) W...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service_worker` [BG_1] @ L92:C12 -> L92:C19
- **Sink**: `FETCH_RESOURCE` in `service_worker` [BG_1] @ L151:C15 -> L155:C10
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`

### (a) W...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
