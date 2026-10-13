# ExPAgent Static Verification — lclgapcgoggnhhmgmajgoeojpagagikn v1.1.2

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 12  |  Verified: 3
- Coverage: node=0.01, scope=0.015
- Flow types: {'STORAGE_POSOING': 5, 'REQUEST_FORGERY': 7}  |  Severities: {'CRITICAL': 12}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 2 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #5 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/main` [CS_1] @ L242:C10 -> L242:C18
- **Sink**: `FETCH_RESOURCE` in `js/background` [BG_1] @ L69:C8 -> L75:C10
- **Bridge**: message `runtime.single.sender.message[js/main->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #3 (REQUEST_FORGERY — attacker-controlled `gwd_extension` CustomEvent → background `fetch`)

### 1. Source control (attacker-controlled)
The content script registers a page-visible DOM listener:

- `js/main.js:241` — `document.addEventListener('gwd_extension', function(e) {`
- `js/main.js:242` — `switch (e.detail.type) {`

The content script runs at `document_end` on `http://*/*` and `https://*/*` (manifest), in the ISOLATED world, but **DOM events are shared across worlds**. Any page can dispatch:

```js
document.dispatchEvent(new CustomEvent('gwd_extension', { detail: {...} }))
```

`e.detail` is entirely page-controlled, including `type`, `url`, `payload`, `referer`. There is no `event.origin`, `event.source`, sender, or value validation at the source.

### 2. Source → sink path (unbroken)
The bridge is concrete and connected end-to-end:

- `js/main.js:256-260` — `case 'proxyRequestPost': proxyRequestPost(e.detail.url, e.detail.payload, cb, e.detail.referer)`
- `js/main.js:85-92` — `chrome.runtime.sendMessage({ type:'proxyRequestPost', url: url, data: payload, referer: referer })`
- `js/background.js:48` — `chrome.runtime.onMessage.addListener(function(obj,

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🟡 UNCERTAIN  (REQUEST_FORGERY / CRITICAL, confidence 0.00)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/main` [CS_1] @ L242:C10 -> L242:C18
- **Sink**: `FETCH_HEADERS` in `js/background` [BG_1] @ L69:C8 -> L75:C10
- **Bridge**: message `runtime.single.sender.message[js/main->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #7 — 🟡 UNCERTAIN  (REQUEST_FORGERY / CRITICAL, confidence 0.00)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/main` [CS_1] @ L242:C10 -> L242:C18
- **Sink**: `FETCH_BODY` in `js/background` [BG_1] @ L69:C8 -> L75:C10
- **Bridge**: message `runtime.single.sender.message[js/main->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
