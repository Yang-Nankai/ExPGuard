# ExPAgent Static Verification — poaognklanhbalfcemeblaebiahbmlng v0.33

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.231, scope=0.282
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_COOKIE` in `dist/static/js/content` [CS_1] @ L2922:C4 -> L2929:C6
- **Sink**: `CHROME_LOCAL_STORAGE` in `dist/static/js/background` [BG_1] @ L20:C4 -> L22:C6
- **Bridge**: message `runtime.single.sender.message[dist/static/js/cookie->dist/static/js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have the full chain confirmed in raw source. Here is my analysis.

## Four-part decision ledger

**(a) Who controls the source?**
The real source is `dist/static/js/cookie.js` L16: `const cookie = document.cookie;`. This content script is registered in the manifest only for `https://www.gptnow.im/*`, `https://gptnow.im/*`, `https://zhinang.ai/*`, `https://www.zhinang.ai/*`. `document.cookie` in a content script reflects the page's non-httpOnly cookie jar, which the page (or any XSS on that origin) can freely set. So the value is web-content-controllable, albeit only from those companion origins — not from arbitrary `*` pages.

**(b) Exact source-to-sink data path** (confirmed via raw source):
- `cookie.js:16` `const cookie = document.cookie;`
- `cookie.js:17-19` `chrome.runtime.sendMessage({ cookie }, ...)`
- `background.js:18` `chrome.runtime.onMessage.addListener(...)`
- `background.js:19-22` `if (request.cookie) { chrome.storage.local.set({ cookie: request.cookie }); ... }`

The bridge connects: the message action/field `cookie` matches, and `request.cookie` is the unmodified cookie string.

**(c) Which security-relevant argument is attacker-controlled?**
`chrome.storage.local

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
