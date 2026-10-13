# ExPAgent Static Verification — bnofologaglcigfnbljobhnglbaicmci v1.0.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.953, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 2 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content-script` [CS_1] @ L71:C17 -> L71:C40
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/content-script` [CS_1] @ L93:C10 -> L95:C12
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have confirmed the source and sink in the actual content script. Let me finalize the analysis.

**Decision ledger:**

**(a) Who controls the source** — The content script `js/content-script.js` registers `window.addEventListener('message', ...)` at L70, matching `http://*/*` and `https://*/*`, `allFrames:true`, `runAt:document_start`. Any web page (or any subframe on any site) can call `window.postMessage(...)`, so `event.data.*` is fully attacker-controlled. The only "gate" is the field `event.data.textSpeecher` (L71), which the attacker simply sets to `true` — a page-satisfiable field, not authentication. `event.source === window` / self-origin checks are not even present.

**(b) Source-to-sink path** — L71 (`event.data.textSpeecher`) → L72 `switch (event.data.message)` → `case 'setNewBaseSpeed'` (L92) → L93–95 `chrome.storage.local.set({ defaultSpeed: event.data.speed })`. The tainted span `event.data.speed` (report step 3: `defaultSpeed: »event.data.speed«`) flows directly into the storage value. No message/storage hop required — it is the same CS frame, but the sink is the privileged `chrome.storage` API that crosses the page→extension boundary.

**(c) Security-relevant argu

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content-script` [CS_1] @ L71:C17 -> L71:C40
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/content-script` [CS_1] @ L108:C10 -> L113:C12
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

**Four-part ledger**

**(a) Who controls the source** — `WINDOW_MESSAGE_EVENT` on a content script declared with `matches: ["http://*/*","https://*/*"]`, `allFrames: true`, `runAt: document_start`. The listener at `js/content-script.js:70` is registered unconditionally at script load (it is not nested in an `initWidget` branch — L50–L72 sit at the same top-level scope, while `initWidget` closes at L38). Since content scripts share the page's `window` message channel, **any** http(s) page (any frame) can dispatch `window.postMessage({textSpeecher:true, message:'setVoiceParams', params:{voice,lang}})`. The gate `event.data.textSpeecher` is a caller-supplied magic field, not authentication; there is no `event.source === window`, `event.origin`, or other check anywhere in the file (`search_code` for `origin|event\.source` returns only an unrelated `crossorigin: ''` attribute at L11).

**(b) Exact source→sink path** — L71 `if (event && event.data.textSpeecher)` → L72 `switch (event.data.message)` → `case 'setVoiceParams'` (L107) → L108–113 `chrome.storage.local.set({ voiceParams: { voice: event.data.params.voice, lang: event.data.params.lang } })`. The report's propagat

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---
