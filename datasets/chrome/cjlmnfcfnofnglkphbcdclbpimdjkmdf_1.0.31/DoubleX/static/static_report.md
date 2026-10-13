# ExPAgent Static Verification — cjlmnfcfnofnglkphbcdclbpimdjkmdf v1.0.31

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L17493
- **Sink**: `FETCH_RESOURCE` in `background.js` [BG_1] @ L11
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 — REQUEST_FORGERY (WINDOW_MESSAGE_EVENT → fetch)

### Source-level evidence vs. actual files
The report references `content_scripts.js` L17493 and `background.js` L11, which do not exist in the shipped extension. The real shipped files are `isolated-bridge.js` (isolated-world content script) and `service-worker.js` (background service worker). Reading those files, the reported flow maps unambiguously onto actual code:

**Source anchor (`isolated-bridge.js`):**
```js
window.addEventListener("message", E => {
  if (E.source !== window) return;
  let e = E.data || {};
  ...
  e.type !== s || !e.requestId ||
  chrome.runtime.sendMessage({
    type: s,                       // "GWR_EXTENSION_GM_XHR_REQUEST"
    requestId: e.requestId,
    request: e.request || {}       // ← attacker-controlled object passed through
  }, t => { ... })
});
```
`s = "GWR_EXTENSION_GM_XHR_REQUEST"`.

**Sink anchor (`service-worker.js`):**
```js
chrome.runtime.onMessage.addListener((e, _, r) => {
  if (!e || e.type !== a) return false;   // a = "GWR_EXTENSION_GM_XHR_REQUEST"
  let E = e.request || {};
  return fetch(E.url, {                     // ← E.url is attacker-controlled
    

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
