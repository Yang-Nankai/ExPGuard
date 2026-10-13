# ExPAgent Static Verification — oakbcaafbicdddpdlhbchhpblmhefngh v2.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `swf2js/content` [CS_1] @ L1:C1263 -> L1:C1402
- **Sink**: `FETCH_RESOURCE` in `bg` [BG_1] @ L1:C533 -> L1:C545
- **Bridge**: message `runtime.single.sender.message[dist/content->bg]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': ['runtime.single.sender.message[dist/content->bg]'], 'sinkUrlControl': ['FULL']}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Summary

**Flow under review:** `WINDOW_MESSAGE_EVENT` → `FETCH_RESOURCE` (`bg.js` `fetch(e.url)` in the `"get-swf"` handler), cross-context hop labeled `dist/content -> bg`.

### Decision ledger

**(a) Who controls the source?**
The *page* controls the source. The declared source type (`WINDOW_MESSAGE_EVENT` / `window.addEventListener("message")`) is a mislabel by ExPGuard. The real attacker-controlled data is page DOM: `swf2js/content.js` scans `document` for Flash/SWF elements and reads their `src` attributes into `links[]`:

```js
function search(){ ... e.src && validate(e.src) && links.unshift({url:e.src,...}); ...
  for(const t of [...document.querySelectorAll('object[type="application/x-shockwave-playerFlash"]')]) e(t);
  for(const t of [...document.querySelectorAll("embed[src*=swf]")]) ...
  for(const t of [...document.querySelectorAll("ruffle-embed[src*=swf]")]) ...
```

This runs on `<all_urls>` (content script, ISOLATED world but reading page DOM), so any page controls the collected `src`. The harness correctly identifies the reachability as `PAGE_TO_CONTENT_SCRIPT`.

**(b) Exact source-to-sink path (unbroken):**
1. Page DOM element `src` (attacker) → `li

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---
