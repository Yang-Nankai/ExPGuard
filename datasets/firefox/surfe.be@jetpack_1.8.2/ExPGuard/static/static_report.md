# ExPAgent Static Verification — surfe.be@jetpack v1.8.2

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 5
- Coverage: node=0.475, scope=0.481
- Flow types: {'STORAGE_POSOING': 5}  |  Severities: {'CRITICAL': 5}

**Assessment:** Verified 5 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 4 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L975:C17 -> L975:C35
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/content` [CS_1] @ L29:C169 -> L29:C196
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the source?**
Any webpage matching the content script's `<all_urls>` surface (excluding the listed mail/file hosts). The source is a `window.addEventListener('message', ...)` handler in `content/content.js` (isolated world). A page can call `window.postMessage(payload, '*')` and the content script receives the event.

**(b) Exact source→sink path (confirmed in real source)**
- L970–972: `window.addEventListener('message', function (e) { ... })` — receives untrusted page message.
- The `JSON.parse(e.data)` branch at L974–975 is gated by `e.origin === 'https://www.youtube.com'`, but **the storage-write path is outside that guard**.
- L1021: `if (!e.data || e.data.target !== _domain_) return` — `_domain_` is a hard-coded public constant `'surfe.be'` (confirmed at `content/content.js:3`). This is an attacker-supplied field check, not authentication.
- L1023–1025: `if (e.data.cmd === 'auth') { if (e.data.token) { justroll.dispatcher(e.data) } }` — both `cmd` and `token` are attacker-chosen fields.
- L183–189 (`dispatcher`): `if (d.user && 'uid' in d.user) cm.set('uid', d.user.uid, 3600)` and `if (d.token) { chrome.storage.local.set(d); cm.set('

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L975:C17 -> L975:C35
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/content` [CS_1] @ L189:C8 -> L189:C35
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the source?**
Any webpage matching the content scr...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L975:C17 -> L975:C35
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/content` [CS_1] @ L29:C169 -> L29:C196
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the source?**
Any webpage matching the content scr...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L975:C17 -> L975:C35
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/content` [CS_1] @ L29:C169 -> L29:C196
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the source?**
Any webpage matching the content scr...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L975:C17 -> L975:C35
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/content` [CS_1] @ L29:C169 -> L29:C196
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the source?**
Any webpage matching the content scr...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
