# ExPAgent Static Verification — fmdnmmbkngflkenkpfgeoonodjohnapj v1.0.2

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 2
- **Not reviewed due to analysis budget:** 1 flow(s): [2]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 1}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 2 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L106
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L125

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification Report

### 1. Evidence resolution
The flow names `content_scripts.js`, which does **not exist** in the unpacked CRX. The actual content script is `content.js` (manifest: `"contentScripts": [{"js": ["content.js"]}]`). Reading `content.js` confirms the exact code pattern the flow describes, just with slightly shifted line numbers:

- Message listener at `content.js:98` (report: L106)
- `chrome.storage.local.set({ echo360ProgressState: progressPayload }, ...)` at `content.js:117` (report: L125)
- A second, equally tainted `chrome.storage.local.set({ echo360TranscriptExport: exportPayload }, ...)` at `content.js:135`

The report's flow maps cleanly to the `PROGRESS_UPDATE` branch → storage write.

### 2. Decision ledger

**(a) Who controls the source?**
Any script running in the page on `echo360.net.au` or `canvas.lms.unimelb.edu.au` (the content-script match hosts) can call `window.postMessage`. All the fields that matter — `source`, `type`, `percent`, `msg` — are chosen by the page. There is no browser-authenticated sender identity (`sender.id`) here; it is a `window` message, not an extension-runtime message.

**(b) Source-to-sink path**
```
content.js:98  window.ad

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L106
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L145

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: ## Verification Report

### 1. Evidence resolution
The flow names `content_scripts.js`, which does **not exist** in the unpacked CRX. The ac...

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
