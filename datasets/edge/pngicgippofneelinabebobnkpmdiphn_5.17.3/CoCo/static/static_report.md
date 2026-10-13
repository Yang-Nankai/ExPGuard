# ExPAgent Static Verification — pngicgippofneelinabebobnkpmdiphn v5.17.3

- Browser: `edge`
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

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the sink code and its call site to verify the flow.

## Decision ledger

**(a) Who controls the source?**
The report's *nominal* source anchor (`crx_headers/jquery_header.js` L27 `new Object()`) is a mis-attribution — that file is a synthetic jQuery header and `new Object()` is not an element-text source. The harness warning confirms the file "could not be resolved." Inspecting the real sink (`js/main.js:230-249`) shows the true source of the tainted value:

- `document.cookie` entries `plt_user_email` / `plt_user_id` (page-origin cookies), and
- `document.querySelector('#login_status span a.orange').innerText` (page DOM text).

These are fully page-controllable. The content script runs on `http://*/*` / `https://*/*` (allFrames, document_end), so any non-excluded origin can set its own `plt_user_email` / `plt_user_id` cookies and render the matching DOM node.

**(b) Exact source-to-sink path**
`getCookie()` is called unconditionally at `js/main.js:455` (via `setTimeout(..., 100)`). It reads cookie/DOM values into `info` (L233-244) and, if `info.email && info.name`, executes:

```js
chrome.storage.local.set({
  'user_info': JSON.stringify(info)   // js/m

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
