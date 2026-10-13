# ExPAgent Static Verification — ggdmdoodcfamjggeigifpjfnnjfbland v2.0.13

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

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2: page CustomEvent → `chrome.tabs.create({url})`

### (a) Who controls the source
**Genuine attacker control.** The content script `injected.js` runs on `<all_urls>` at `document_start` (manifest confirmed). It registers a DOM listener for a fixed event name:

- `injected.js:1030` → `comm.handleC = handleC;`
- `injected.js:1031` → `comm.init(C, R)` where `comm.vmid = 'OM'`, so `comm.sid = 'OM' + 'C' = 'OMC'`
- `injected.js:216` → `document.addEventListener(comm.sid, ...)` i.e. **`document.addEventListener('OMC', handleC)`**

The page can trivially satisfy this with `document.dispatchEvent(new CustomEvent('OMC', {detail: ...}))`. The event name `OMC` is hard-coded and public; the `detail` object is entirely page-chosen. This is the extension's own user-script bridge, and it is reachable from any page script because content scripts run at `<all_urls>`.

### (b) Exact source-to-sink data path
Confirmed end-to-end:

1. `injected.js:765-766` — `function handleC(e) { var req = e.detail; ... }`
2. `injected.js:802-803` — `var func = maps[req.cmd]; if (func) func(req.data);`
3. `injected.js:777-779` — `OpenTab: function (data) { sendMessage({cmd: 'OpenTab', data: 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
