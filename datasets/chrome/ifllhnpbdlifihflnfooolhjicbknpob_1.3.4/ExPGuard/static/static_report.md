# ExPAgent Static Verification — ifllhnpbdlifihflnfooolhjicbknpob v1.3.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.972, scope=1
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `contentscript` [CS_1] @ L7:C12 -> L7:C20
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L31:C31 -> L31:C41
- **Bridge**: message `runtime.single.sender.message[contentscript->background]`
- **Severity evidence**: ['https://*.keywordtooldominator.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have the full chain. Let me record my analysis.

## Decision ledger

**(a) Who controls the source?**
The page running at any `https://*.keywordtooldominator.com/*` URL. The content script registers:

```js
document.addEventListener('KTD_EXT_EVENT_SEARCH', runSearchQuery, false, true);
```

`runSearchQuery` reads `e.target.getAttribute("requestUrl")` and `e.target.getAttribute("jobSearchId")` from the event target. A page can create any element, set those attributes, and dispatch the custom event on that element (bubbling to `document`), so `requestUrl` is fully page-controlled. This is a valid PAGE_TO_CONTENT_SCRIPT bridge (isolated-world listener receives DOM events dispatched by the page). No origin check, no `event.source === window` gate, no allow-list of values.

**(b) Exact source-to-sink path** (confirmed from `contentscript.js` and `background.js`):

1. `contentscript.js:10` — `requestUrl = e.target.getAttribute("requestUrl");` (page-controlled)
2. `contentscript.js:15` — `chrome.runtime.sendMessage({ url: requestUrl, msType: "search request" }, ...)`
3. `background.js:1-2` — `onMessage.addListener` → `processRequest(request).then(sendResponse)`
4. `background.js:11-13` 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
