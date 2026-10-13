# ExPAgent Static Verification — bkailheklfplleadbokdamfddbenifpf v1.1.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 6  |  Verified: 2
- Coverage: node=0.781, scope=0.771
- Flow types: {'REQUEST_FORGERY': 6}  |  Severities: {'CRITICAL': 6}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `contentLoader` [CS_1] @ L1:C819 -> L1:C827
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L1:C63260 -> L1:C63377
- **Bridge**: message `runtime.single.sender.message[contentLoader->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — REQUEST_FORGERY (`attacker-input-network-send`)

### 1. Source control (who controls the data)
The source anchor resolves to `contentLoader.js`, which registers:

```js
document.addEventListener("PriceDogExt", function(e) {
  const t = e.detail;
  switch(t.type) {
    case "proxy-request": {
      const e = t.id;
      chrome.runtime.sendMessage({type:"proxy-request", url:t.url, params:t.params, referer:t.referer}, ...)
      break;
    }
```

The content script runs at `<all_urls>` in **ISOLATED** world but shares the DOM. The deterministic harness explicitly states a page can forge `CustomEvent` fields. A page can therefore dispatch `new CustomEvent("PriceDogExt", {detail: {...}})` with attacker-chosen `url`, `params`, and `referer`. There is no origin check, no `event.source` check, and no validation of `detail` — only `t.type === "proxy-request"`, which the attacker supplies. **Source is attacker-controllable.**

### 2. Source-to-sink path
- Page `dispatchEvent("PriceDogExt")` → content script reads `e.detail` → `chrome.runtime.sendMessage({type:"proxy-request", url, params, referer})`.
- The background service worker has a **separate, directly matc

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — 🟡 UNCERTAIN  (REQUEST_FORGERY / CRITICAL, confidence 0.00)

- **Source**: `TARGET_CUSTOM_EVENT` in `contentLoader` [CS_1] @ L1:C819 -> L1:C827
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L1:C64348 -> L1:C64383
- **Bridge**: message `runtime.single.sender.message[contentLoader->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
