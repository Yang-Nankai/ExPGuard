# ExPAgent Static Verification — mmehdbhpbgoegockemckbpjeoflflobc v3.0.45

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- Coverage: node=0.458, scope=0.456
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 2}  |  Severities: {'MEDIUM': 4}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `static/js/ads` [CS_3] @ L1:C12357 -> L1:C12365
- **Sink**: `CHROME_LOCAL_STORAGE` in `static/js/ads` [CS_3] @ L1:C9897 -> L1:C9949
- **Severity evidence**: ['https://www.facebook.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: `STORAGE_POSOING` (#3)

### Decision ledger

**(a) Who controls the source?**
The source is `window.addEventListener("message", ...)` in `static/js/ads.js` (content script, ISOLATED world). It reads `o.data` directly from a page `postMessage`. The harness confirms a page can forge `window.postMessage` fields; there is no `event.source`/`event.origin`/sender.id guard. The only check is `o.data.type === "ADS" || "ADS SPONSORED"`, which is attacker-satisfiable.

**(b) Source-to-sink path?**
Confirmed from the minified source:

```js
window.addEventListener("message",(async function(o){
  ...
  n=o.data
  ...
  if(... n.type && ("ADS"===... || "ADS SPONSORED"===...)){
    const n = o.data.payload || {};
    l = e(n);          // parser over attacker-controlled payload.node
    if(!l) return;
    t(l);              // save function
    ...
```

`t` reads existing `adsList` and writes:

```js
n={postId:Number(e.postLink.match(...).pop()),
   ...,
   pageLink:e.pageLink,
   btnText:e.btnText,
   subattachments:e.subattachments,
   adData:e.adData};
o[n.postId]=n;
chrome.storage.local.set({adsList:o}, ...)
```

The parser `e(n)` derives the saved fields from `n.node.c

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🟡 UNCERTAIN  (REQUEST_FORGERY / MEDIUM, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `static/js/ads` [CS_3] @ L1:C12357 -> L1:C12365
- **Sink**: `FETCH_RESOURCE` in `static/js/adsList` [POPUP_1] @ L1:C200414 -> L1:C200443
- **Bridge**: storage `STORAGE_FLOW[area: local, key: adsList, sender: static/js/ads, receiver: static/js/adsList]`
- **Severity evidence**: ['https://www.facebook.com/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
