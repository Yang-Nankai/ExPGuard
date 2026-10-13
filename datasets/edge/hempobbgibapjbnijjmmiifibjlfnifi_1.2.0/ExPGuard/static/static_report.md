# ExPAgent Static Verification — hempobbgibapjbnijjmmiifibjlfnifi v1.2.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.44, scope=0.448
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/load` [CS_1] @ L1:C105 -> L1:C106
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/load` [CS_1] @ L1:C236 -> L1:C309
- **Severity evidence**: ['*://*.xiapibuy.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — STORAGE_POSOING (flow #1)

### 1. Source control
The source is `WINDOW_MESSAGE_EVENT` in the content script `js/load.js`. Raw source confirms:

```js
window.addEventListener('message', function(b) {
  if (b.source != window) return;
  const c = b.data;
  c['action'] && c['action'] === 'sendProductData' && (
    console.log('Received product data from page context:', c['data']),
    chrome.storage.local.set({'productData': c['data']}, function(){}),
    chrome.runtime.sendMessage({'action':'sendProductData','data':c['data']})
  );
}, false);
```

This is a page-to-content-script bridge. The page runs on Shopee/xiapibuy origins (content script matches `*://*.xiapibuy.com/*`, `*://shopee.co.id/*`, etc.). A page can call `window.postMessage(...)` to itself; `event.source === window` is satisfied by the page's own postMessage, and `action === 'sendProductData'` is an attacker-chosen field. Both guards are attacker-satisfiable, not authentication.

### 2. Source-to-sink path
Unbroken, single-expression data flow:

`b.data` → `c` → `c['data']` → `chrome.storage.local.set({'productData': c['data']})`

No sanitization, no type/schema validation, no allow-list, no over

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
