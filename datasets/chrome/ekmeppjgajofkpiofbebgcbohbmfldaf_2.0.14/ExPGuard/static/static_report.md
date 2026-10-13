# ExPAgent Static Verification — ekmeppjgajofkpiofbebgcbohbmfldaf v2.0.14

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.234, scope=0.277
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `injected` [CS_1] @ L766:C12 -> L766:C20
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background` [BG_1] @ L1:C68748 -> L1:C68795
- **Bridge**: message `runtime.single.sender.message[injected->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is `TARGET_CUSTOM_EVENT` in `injected.js` at line 766: `var req = e.detail;` inside `handleC(e)`. The listener is registered as:

```js
comm.sid = 'OM' + 'C';               // "OMC"
document.addEventListener(comm.sid, comm['handle' + srcId].bind(comm), false);
// -> document.addEventListener('OMC', handleC, false)
```

`handleC` is invoked on a plain DOM `CustomEvent('OMC')` whose `detail` is set by the dispatching page. The manifest runs this content script at `document_start` on `<all_urls>` in an ISOLATED world, but DOM events are shared across the page/isolated-world boundary, so **any webpage can dispatch `new CustomEvent('OMC', {detail: ...})` on `document` and fully control `e.detail`**. There is no secret token, event-source check, or signature on the event. ✅ Attacker-controlled.

**(b) Exact source-to-sink path**
1. `injected.js:765-804` — `handleC(e)` reads `req = e.detail`, then `var func = maps[req.cmd]; if (func) func(req.data);`.
2. `injected.js:777-779` — for `req.cmd === 'OpenTab'`, it calls `sendMessage({cmd:'OpenTab', data: data})`.
3. `injected.js:10-12` — `sendMessage` performs `chrome.runtime.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
