# ExPAgent Static Verification — enokdcnimpdlohalipcbkknffnhhdnac v1.0.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.482, scope=0.551
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `scripts/content` [CS_1] @ L1:C497 -> L1:C505
- **Sink**: `CHROME_SYNC_STORAGE` in `scripts/content` [CS_1] @ L1:C568 -> L1:C603
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — `contentscript_host:storageChange` → `chrome.storage.sync.set`

### Decision ledger

**(a) Who controls the source — ATTACKER (any webpage).**
The content script `scripts/content.js` runs at `document_start` on `<all_urls>` (all frames, isolated world). Its listener is:

```js
document.addEventListener("contentscript_host:storageChange", e => {
  let {eventType: t, key: n, data: o} = e.detail;
  "amconnect" === n && ("removed" === t ? chrome.storage.sync.remove(n) : chrome.storage.sync.set(o, (() => {})));
});
```

A page shares the DOM with the content script's isolated world, so a page-dispatched `CustomEvent` on `document` reaches this listener. `e.detail`, `eventType`, `key`, and `data` are all fully page-controlled. The only other references to this event name in the extension source are the *dispatch* of a different event (`contentscript:storageChange`) by the content script itself; nothing dispatches `contentscript_host:storageChange` internally, which confirms the listener is effectively a page-accessible bridge.

**(b) Source-to-sink path — unbroken.**
`e.detail` (attacker) → destructure `{eventType:t, key:n, data:o}` → `o` → `chrome.storage.sync

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
