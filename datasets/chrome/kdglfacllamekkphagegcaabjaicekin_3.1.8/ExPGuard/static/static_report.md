# ExPAgent Static Verification — kdglfacllamekkphagegcaabjaicekin v3.1.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- Coverage: node=0.09, scope=0.037
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 4}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L16:C63 -> L16:C70
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L34:C8 -> L34:C84
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `4`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 — `STORAGE_POSOING` via `onMessageExternal` → `chrome.storage.sync.set`

### 1. Source controllability
The source is `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => ...)` at `background.js:15`. I inspected the real code:

```js
15| chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
16|   console.log("AAAA..." + message.type);
17|   new Promise(async (resolve, reject) => {
18|     switch (message.type) {
...
32|       case 'setQiuToken': {
34|         chrome.storage.sync.set({ qiuqiToken: message.data.qiuqiToken }, (r) => { })
35|         break
```

The manifest declares:

```json
"externally_connectable": { "ids": ["*"], "matches": ["<all_urls>"] }
```

`externally_connectable.matches: ["<all_urls>"]` means **any webpage** can call `chrome.runtime.sendMessage(extensionId, ...)` and reach this listener. `ids: ["*"]` additionally opens it to any other extension. There is **no `sender.id` / `sender.origin` check** anywhere in the listener — the reported "FIXED_SENDER_ID_ALLOWLIST" is not present in the code (`senderIdCheck: false` in the harness; I confirmed no guard exists around the listener o

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L16:C63 -> L16:C70
- **Sink**: `WEBSOCKET_URL` in `background` [BG_1] @ L598:C14 -> L598:C76
- **Bridge**: storage `STORAGE_FLOW[area: sync, key: qiuqiData, sender: background, receiver: background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `7`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me record the four-part ledger.

**1. Source control — attacker-controllable.**
`background.js` L15 registers `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => ...)`. The manifest `externally_connectable` is `ids: ["*"]` (any extension) and `matches: ["<all_urls>"]` (any webpage). So an ordinary webpage on any origin — knowing only the public extension ID — can call `chrome.runtime.sendMessage(EXT_ID, ...)` and fully control `message` (including `message.type` and `message.data`). The L16 anchor (`message.type` in a `console.log`) is just the first statement inside that listener; the actual attacker payload flows through the `updateLocalData` case.

**2. Source→sink path — unbroken.**
`case 'updateLocalData'` (L57–68):
- `for (let i in message.data) localData[i] = message.data[i]` (L60–61) copies every attacker-supplied field, so `localData.vuex_token` is directly attacker-controlled.
- `bkutils.updateLocalData(localData)` (L64) additionally JSON-stringifies and writes it to `chrome.storage.sync` key `qiuqiData` (`js/bkutils.js` L25), confirming the storage hop — but it isn't even needed for the immediate sink.
- 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
