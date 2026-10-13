# ExPAgent Static Verification — nemlggkoddlonfakhdkllifcgaeohkoi v1.10

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.983, scope=1
- Flow types: {'REQUEST_FORGERY': 3}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service_worker` [BG_1] @ L127:C12 -> L127:C19
- **Sink**: `FETCH_RESOURCE` in `service_worker` [BG_1] @ L29:C11 -> L32:C6
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: REQUEST_FORGERY — external message → `fetch`

I read the injected propagation report and then confirmed the actual source in `service_worker.js`. The chain is real and unbroken.

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => …)` at L125-140. The entire `message` object (`type`, `url`, `folder`) is supplied by whatever external party can reach the listener. The manifest has `externally_connectable: null` (absent) and the listener **ignores `sender` entirely** — there is no `sender.id` allowlist and no `sender.url`/origin check. Per the documented default, absent `externally_connectable` leaves the extension reachable by other extensions, so the message fields are attacker-controlled.

### (b) Source → sink path (confirmed in source)
```
L127 switch (message.type) { case 'ADD_TORRENT':
L129   if (message.url && message.url.startsWith('magnet:'))
L131     AppeGonder(settings, message.url, message.folder)
L18-20    link=message.url → params = '?action=add-url&download_dir=0&token=' + token + '&s=' + encodeURI(link)
L22       if (where !== m_folder) params += '&path=' + where   // where = m

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service_worker` [BG_1] @ L127:C12 -> L127:C19
- **Sink**: `FETCH_RESOURCE` in `service_worker` [BG_1] @ L147:C9 -> L150:C4
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: REQUEST_FORGERY — external message → `fetch`

I read the injected propagatio...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service_worker` [BG_1] @ L127:C12 -> L127:C19
- **Sink**: `FETCH_RESOURCE` in `service_worker` [BG_1] @ L186:C15 -> L190:C10
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: REQUEST_FORGERY — external message → `fetch`

I read the injected propagatio...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
