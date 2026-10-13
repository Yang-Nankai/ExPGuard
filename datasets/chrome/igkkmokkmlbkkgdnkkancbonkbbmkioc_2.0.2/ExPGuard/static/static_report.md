# ExPAgent Static Verification — igkkmokkmlbkkgdnkkancbonkbbmkioc v2.0.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 8  |  Verified: 4
- Coverage: node=0.606, scope=0.543
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 7}  |  Severities: {'CRITICAL': 8}

**Assessment:** Verified 4 flow(s): 2 true-positive, 1 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L2:C102193 -> L2:C104402
- **Sink**: `CHROME_WINDOWS_UPDATE_OPTIONS` in `background` [BG_1] @ L2:C4306 -> L2:C4343
- **Bridge**: message `runtime.single.sender.message[ct.bundle->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — `WINDOW_MESSAGE_EVENT` → `chrome.windows.update`

### Decision ledger

**(a) Who controls the source?**
The actual page-to-extension bridge is in `ct.bundle.js`:

```js
window.addEventListener("message",(t=>{
  let a=t.data;
  a.p==e && "tobg"==a.cmd &&
  chrome.runtime.sendMessage(a.data, cb)
}))
```

`e` is the constant `"recorder-screenshot-v3"`. A webpage can satisfy both `a.p` and `a.cmd` trivially by posting a crafted message, so the entire forwarded object `a.data` is attacker-controlled. The content script is registered on `<all_urls>`, so any page can do this.

**(b) Source-to-sink path**
Page `window.postMessage` → `ct.bundle.js` listener → `chrome.runtime.sendMessage(a.data)` → background `chrome.runtime.onMessage.addListener` → `switch(t.cmd)` → `case "htab"` → `"update"==t.fun` → `chrome.windows.update(t.winId,t.data)`.

This is the exact HOP recorded by ExPGuard: `runtime.single.sender.message[ct.bundle->background]`.

**(c) Security-relevant argument**
Both `t.winId` and `t.data` are attacker-controlled because `t` is the forwarded `a.data` object. `chrome.windows.update(windowId, updateInfo)` is a privileged browser-window operation, and

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L2:C102193 -> L2:C104402
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `background` [BG_1] @ L2:C4632 -> L2:C4687
- **Bridge**: message `runtime.single.sender.message[ct.bundle->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?
**The page.** `ct.bundle.js` runs as a content script on `<all_urls>` and registers:

```js
window.addEventListener("message", (t => {
  let a = t.data;
  a.p == "recorder-screenshot-v3" && "tobg" == a.cmd &&
    chrome.runtime.sendMessage(a.data, ...)
}))
```

The guard is `a.p == "recorder-screenshot-v3" && a.cmd == "tobg"`. Both `a.p` and `a.cmd` are page-supplied fields, and `"recorder-screenshot-v3"`/`"tobg"` are fixed, non-secret strings. So a malicious page can trivially satisfy this and forward its own `a.data` object to the background. No `sender.id`, `sender.origin`, or `event.origin` check exists.

### (b) Exact source-to-sink path
1. Page calls `window.postMessage({p:"recorder-screenshot-v3", cmd:"tobg", data:{cmd:"udr", data:<attackerRules>}}, "*")`.
2. `ct.bundle.js` content-script listener passes `a.data` (`{cmd:"udr", data:<rules>}`) straight into `chrome.runtime.sendMessage`.
3. Background `chrome.runtime.onMessage.addListener((t,a,r)=>{ switch(t.cmd){...} })` has no sender validation (search for `sender` in `background.js` returns no matches).
4. `t.cmd === "udr"` hits:

```js
case "udr": chrome.declarativ

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L2:C102193 -> L2:C104402
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background` [BG_1] @ L2:C4479 -> L2:C4515
- **Bridge**: message `runtime.single.sender.message[ct.bundle->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source — attacker/webpage-controlled
The manifest loads `ct.bundle.js` as a content script on `<all_urls>` (world defaults to ISOLATED in MV3). I found the actual page bridge in `ct.bundle.js`:

```js
const e="recorder-screenshot-v3";
window.addEventListener("message",(t=>{
  let a=t.data;
  a.p==e && "tobg"==a.cmd &&
    chrome.runtime.sendMessage(a.data, (e=>{...}))
}));
```

Any webpage matching `<all_urls>` can `window.postMessage` a crafted object. The two gates (`a.p == "recorder-screenshot-v3"` and `a.cmd == "tobg"`) are attacker-chosen/satisfiable fields, not authentication:
- `cmd` is simply attacker-supplied.
- The constant `p` is not a secret trust anchor — the content script itself exposes it to the page DOM via `a.dataset.pname=e` on an injected `<script>` element, and `sm.bundle.js` (containing the same constant) is a web-accessible resource (`webAccessibleResources: "/*"` on `<all_urls>`).

So the source is genuinely attacker-controllable.

### (b) Exact source-to-sink path
1. Page posts: `{ p:"recorder-screenshot-v3", cmd:"tobg", data:{ cmd:"tab", fun:"create", data:{ url:"https://evil.example" } } }`.
2. `ct.bundle

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L2:C102193 -> L2:C104402
- **Sink**: `CHROME_DOWNLOADS_OPTIONS` in `background` [BG_1] @ L4:C34685 -> L4:C34769
- **Bridge**: message `runtime.single.sender.message[ct.bundle->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Error code: 400 - {'error': {'message': "An assistant message with 'tool_calls' must be followed by tool messages responding to each 'tool_call_id'. (insufficient tool messages following tool_calls message)", 'type': 'invalid_request_error', 'param': None, 'code': 'invalid_request_error'}}

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
