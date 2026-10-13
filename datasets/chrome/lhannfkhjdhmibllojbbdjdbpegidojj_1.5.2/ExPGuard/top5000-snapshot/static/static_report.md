# ExPAgent Static Verification — lhannfkhjdhmibllojbbdjdbpegidojj v1.5.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 8  |  Verified: 4
- Coverage: node=0.663, scope=0.637
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 7}  |  Severities: {'CRITICAL': 8}

**Assessment:** Verified 4 flow(s): 3 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content/content` [CS_1] @ L2:C101916 -> L2:C104135
- **Sink**: `CHROME_WINDOWS_UPDATE_OPTIONS` in `serviceWorker/sw` [BG_1] @ L1:C1440 -> L1:C1477
- **Bridge**: message `runtime.single.sender.message[js/content/ct->serviceWorker/sw]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification — PRIVILEGE_ESCALATION (#2)

### Decision ledger

**(a) Who controls the source**  
The real `WINDOW_MESSAGE_EVENT` source is in `js/content/ct.js` (manifest content script #3, `matches: ["<all_urls>"]`, `all_frames: true`):

```js
window.addEventListener("message", (t => {
  let n = t.data;
  n.p == e && "tobg" == n.cmd &&
    chrome.runtime.sendMessage(n.data, ...)
}))
```

Any webpage — including any iframe, because `all_frames: true` — can `window.postMessage` into this listener. The only predicates are `n.p == "recorder-screenshot-v3"` and `n.cmd == "tobg"`, both constants/attacker-chosen values, not authentication. There is no `event.origin` check and no `sender.id` check.

**(b) Source-to-sink path**  
Page postMessage object is unpacked:

- outer message: `{ p: "recorder-screenshot-v3", cmd: "tobg", data: <inner> }`
- content script forwards `<inner>` verbatim via `chrome.runtime.sendMessage(n.data)`
- background `chrome.runtime.onMessage.addListener` receives `<inner>` as `t`
- selecting `t.cmd = "htab"`, `t.fun = "update"` reaches:

```js
chrome.windows.update(t.winId, t.data)
```

The bridge is unbroken and verified in the raw source.

**(c) Security

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content/content` [CS_1] @ L2:C101916 -> L2:C104135
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `serviceWorker/sw` [BG_1] @ L1:C1788 -> L1:C1843
- **Bridge**: message `runtime.single.sender.message[js/content/ct->serviceWorker/sw]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 (PRIVILEGE_ESCALATION → `chrome.declarativeNetRequest.updateDynamicRules`)

### Four-part decision ledger

**(a) Who controls the source? — attacker-controlled, but via `ct.js`, not `content.js`**
The normalized source file is `js/content/content.js`, but that file has **no** `window.addEventListener("message")` (searched: no match). The actual page→extension bridge is in `js/content/ct.js` (matching the report's `messageSender: js/content/ct`), which runs on `<all_urls>` at `document_start`:

```js
window.addEventListener("message", t => {
  let n = t.data;
  n.p == "recorder-screenshot-v3" && "tobg" == n.cmd &&
    chrome.runtime.sendMessage(n.data, ...)
});
```

The checks `n.p == "recorder-screenshot-v3"` and `n.cmd == "tobg"` are **attacker-satisfiable constants**, not authentication. Any page on a matched origin can do:

```js
window.postMessage({p:"recorder-screenshot-v3", cmd:"tobg", data:{cmd:"udr", data:{...}}}, "*");
```

So the page fully controls the object `n.data` forwarded to the background. ✔

**(b) Source→sink path — unbroken**
`ct.js` forwards `n.data` via `chrome.runtime.sendMessage`. In `serviceWorker/sw.js` the listener is:

```js
ch

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content/content` [CS_1] @ L2:C101916 -> L2:C104135
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `serviceWorker/sw` [BG_1] @ L1:C1613 -> L1:C1649
- **Bridge**: message `runtime.single.sender.message[js/content/ct->serviceWorker/sw]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #5

### 1. Who controls the source?
The real page-to-extension bridge lives in **`js/content/ct.js`** (the normalized report labels the source file `js/content/content`, but its own provenance fields — `originContext: js/content/ct`, `messageSender: js/content/ct`, `messageSenderProvenance: CONTENT_SCRIPT` — and my source inspection point to `ct.js`). This content script is injected on **`<all_urls>`**, `all_frames: true`, `run_at: document_start`.

```js
window.addEventListener("message", (t => {
  let n = t.data;
  n.p == e && "tobg" == n.cmd && chrome.runtime.sendMessage(n.data, (e => {...}))
}))
```

The only gate is `n.p === "recorder-screenshot-v3"` and `n.cmd === "tobg"` — both fields are supplied by the page in the very same `postMessage`. There is **no `event.origin` check, no `sender.id` check, no schema/URL validation**. Any webpage can forge the whole object.

### 2. Exact source-to-sink path
- Page → `window.postMessage({p:"recorder-screenshot-v3", cmd:"tobg", data:D}, "*")`
- `ct.js` listener sees `n.data`, passes the `p`/`cmd` checks, and calls `chrome.runtime.sendMessage(D)`.
- Background `serviceWorker/sw.js` `chrome.runtime.onMessage.addLis

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content/content` [CS_1] @ L2:C101916 -> L2:C104135
- **Sink**: `CHROME_DOWNLOADS_OPTIONS` in `serviceWorker/sw` [BG_1] @ L3:C34698 -> L3:C34789
- **Bridge**: message `runtime.single.sender.message[js/content/ct->serviceWorker/sw]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to verify this flow. Let me record my reasoning against the primary evidence and the code I inspected.

## Decision ledger

**(a) Who controls the source?**
Any webpage the extension's `<all_urls>` content scripts run on. The actual window-message bridge is in `js/content/ct.js` (the manifest loads it with `matches: ["<all_urls>"]`, `run_at: document_start`, `all_frames: true`):

```js
window.addEventListener("message",(t=>{
  let n=t.data;
  n.p==e && "tobg"==n.cmd && chrome.runtime.sendMessage(n.data, ...)
}))
```

The only gates are `n.p === "recorder-screenshot-v3"` and `n.cmd === "tobg"` — both are attacker-chosen message fields, not any browser-authenticated sender check. So the page fully controls the object forwarded via `chrome.runtime.sendMessage`.

**(b) Exact source-to-sink path**
Page `window.postMessage({p:"recorder-screenshot-v3", cmd:"tobg", data:{type:"screen_download", data:"<url>", suffix:"<ext>"}})` →
`js/content/ct.js` forwards `n.data` → `chrome.runtime.sendMessage(n.data)` →
background `serviceWorker/sw.js` second `onMessage` listener switches on `e.type` →
`case "screen_download": O(e.data, e.suffix); break;` (also `case "download_blob

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
