# ExPAgent Static Verification — nfmlkliedggdodlbgghmmchhgckjoaml v1.9.5

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.96, scope=1
- Flow types: {'STORAGE_POSOING': 1, 'SOURCE_REPORT_ONLY': 2}  |  Severities: {'HIGH': 1, 'UNKNOWN': 2}

**Assessment:** Verified 3 flow(s): 1 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 3 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `opt/yt_autocomment` [CS_2] @ L754:C30 -> L754:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `opt/yt_autocomment` [CS_2] @ L337:C12 -> L340:C14
- **Severity evidence**: ['https://*.youtube.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 12, 'rawSteps': 59, 'distinctLines': 10, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

### 1. Source controllability — TRUE
The source is `window.addEventListener('message', ...)` in the content script `opt/yt_autocomment.js` (L753). It reads `event.data` directly from a `message` event with no `event.origin`, `event.source`, or sender validation.

`event.data.type`, `event.data.success`, and `event.data.videoId` are all chosen by whatever code calls `window.postMessage(...)` on the YouTube page. The harness notes this correctly: page-originated `postMessage` fields are attacker-satisfiable and are not authentication. The content script runs on `https://*.youtube.com/*` in `document_start`, so a malicious/compromised YouTube page (or injected page script) can send the message.

### 2. Data path — UNBROKEN
Confirmed from the primary report and raw source:

1. `L753` — `window.addEventListener('message', ...)`
2. `L754` — `if (event.data && event.data.type === 'blockify-promo-result')`
3. `L755` — `if (event.data.success)`
4. `L756` — `saveCommentedVideo(event.data.videoId)`
5. `L330-332` — reads existing storage then `commentedVideos.push(videoId)`
6. `L337-340` — `chrome.storage.local.set({ 'promo_commented_videos': commentedVideos, 'promo_last_comme

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---

## Flow #1 — 🟢 FALSE POSITIVE  (SOURCE_REPORT_ONLY / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `twitch_utils` [MAIN_twitch_utils] @ L464:C24 -> L464:C38
- **Sink**: `WINDOW_POSTMESSAGE` in `twitch_utils` [MAIN_twitch_utils] @ L2584:C12 -> L2584:C56
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 405, 'distinctLines': 36, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

### 1. Source
`twitch_utils.js` L463–466 registers a `message` listener (`this.addEventListener('message', ...)`) whose handler branches on `event.data.key == 'FetchRequest'`. `this` here is the **worker global scope** (the file also calls `this.postMessage({...})` in the same listener), so this is a Web Worker's inbound message handler, not a page `window.addEventListener('message')` in the usual sense.

### 2. Context / frame authority
`twitch_cs.js` L18–24 `injectScript()` loads `twitch_utils.js` via a plain `<script src=chrome.runtime.getURL(...)>` tag into the **page main world** (`MAIN_twitch_utils`). It does **not** run as an isolated content script (`CS_*`), background (`BG_*`), or extension UI (`EX_*`). The manifest's Twitch content script (`twitch_cs.js`) is only the injector; `twitch_utils.js` runs with the webpage's own authority.

### 3. Sink
The sink anchor is `postTwitchWorkerMessage` (L2582–2586):

```js
function postTwitchWorkerMessage(key, value) {
    twitchWorkers.forEach((worker) => {
        worker.postMessage({key: key, value: value});   // L2584
    });
}
```

This is a **`Web Worker.postMessage`** — plain page-level messaging from the page'

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---

## Flow #2 — ⚪ DUPLICATE  (SOURCE_REPORT_ONLY / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `twitch_utils` [MAIN_twitch_utils] @ L464:C24 -> L464:C38
- **Sink**: `WINDOW_POSTMESSAGE` in `twitch_utils` [MAIN_twitch_utils] @ L467:C24 -> L470:C26
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 405, 'distinctLines': 36, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Semantically identical to flow #1. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

### 1. Source
`twitch_utils.js` L463–466 registers a `message` listener (`th...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---
