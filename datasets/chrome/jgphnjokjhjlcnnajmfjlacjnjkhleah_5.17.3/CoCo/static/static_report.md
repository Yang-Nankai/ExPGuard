# ExPAgent Static Verification — jgphnjokjhjlcnnajmfjlacjnjkhleah v5.17.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `crx_headers/jquery_header.js` [UNKNOWN] @ L27:C1 -> L27:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/main.js` [UNKNOWN] @ L247:C1 -> L247:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'WEB_CONTENT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 2, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 (ELEMENT_TEXT_CONTENT → CHROME_LOCAL_STORAGE)

### 1. Source control (a)
The reported source anchor is **spurious**: `crx_headers/jquery_header.js L27 ... new Object()` does not exist in the unpacked CRX (`list_files()` shows no such file; it's a synthetic header artifact, and `new Object()` is not a DOM read). However, the *semantic* source is real and lives inside `js/main.js` itself:

- `getCookie()` (L231) reads page-controlled data:
  - `info['name'] = document.querySelector('#login_status span a.orange') && document.querySelector('#login_status span a.orange').innerText` (L239) — **DOM text content**, an `ELEMENT_TEXT_CONTENT` source.
  - `info['email']` / `info['id']` from `document.cookie` (`plt_user_email` / `plt_user_id`) (L233–L243).

`getCookie()` is invoked unconditionally via `setTimeout(...,100)` at L454–456 in the content script. The content script matches `http://*/*` / `https://*/*` (excluding a list of specific domains) with `allFrames: true`, `runAt: document_end`. So on any attacker-owned non-excluded domain, the page can:
- set `plt_user_email` / `plt_user_id` cookies (non-httpOnly), and
- inject `<div id="login_status"><span><a class=

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
