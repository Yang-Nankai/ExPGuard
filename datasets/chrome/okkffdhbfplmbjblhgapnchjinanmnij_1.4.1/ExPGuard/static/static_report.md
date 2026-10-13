# ExPAgent Static Verification — okkffdhbfplmbjblhgapnchjinanmnij v1.4.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 8  |  Verified: 4
- Coverage: node=0.674, scope=0.663
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 7}  |  Severities: {'CRITICAL': 8}

**Assessment:** Verified 4 flow(s): 3 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L1:C107989 -> L1:C110208
- **Sink**: `CHROME_WINDOWS_UPDATE_OPTIONS` in `background/background` [BG_1] @ L1:C3370 -> L1:C3407
- **Bridge**: message `runtime.single.sender.message[content/ct->background/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Summary

**Flow under verification:** `WINDOW_MESSAGE_EVENT` (page → content script) → `chrome.runtime.onMessage` (background) → `chrome.windows.update(t.winId, t.data)`.

### (a) Who controls the source — confirmed attacker-controlled

`content/ct.js` (document_start, all frames, `<all_urls>`) registers the page-message relay:

```js
const t = "recorder-screenshot-v3";
window.addEventListener("message", e => {
  let a = e.data;
  a.p == t && "tobg" == a.cmd && chrome.runtime.sendMessage(a.data, t => {
    a.cb && window.postMessage({cmd:"ctcb", cb:a.cb, data:t});
  });
});
```

- There is **no `event.source === window` check and no origin check** — a page's own `window.postMessage` trivially reaches the listener.
- The `p`/`cmd` gates are attacker-supplied message *fields* (`a.p`, `a.cmd`), not an authentication boundary. The "secret" `recorder-screenshot-v3` is also directly leaked to the page via the injected `<script data-pname="recorder-screenshot-v3" src=".../content/sm.js">` element (`a.dataset.pname = t`).
- `chrome.runtime.sendMessage(a.data, ...)` forwards the **entire page-controlled object** `a.data` to the background service worker.

### (b) Exact sourc

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L1:C107989 -> L1:C110208
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `background/background` [BG_1] @ L1:C3696 -> L1:C3751
- **Bridge**: message `runtime.single.sender.message[content/ct->background/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 (WINDOW_MESSAGE_EVENT → `chrome.declarativeNetRequest.updateDynamicRules`)

### 1. Who controls the source — ATTACKER-CONTROLLED (real bridge, with a source-file misattribution)
I located the actual page→extension bridge in `content/ct.js` (not `content/content.js` as the normalized flow claims):

```js
window.addEventListener("message",(e=>{
  let a=e.data;
  a.p==t && "tobg"==a.cmd && chrome.runtime.sendMessage(a.data,(t=>{
    a.cb && window.postMessage({cmd:"ctcb",cb:a.cb,data:t})
  }))
}));
```

where `t = "recorder-screenshot-v3"` (a public constant). A page can trivially satisfy the `p`/`cmd` field checks because they are attacker-supplied message fields, not browser-authenticated identity. So the page controls `a.data` that is forwarded to the background.

The normalized flow’s `source.file = content/content` and the harness’s `content/content.js` anchor are misattributed: `content/content.js` contains no `window.addEventListener("message")`; the real page bridge is in `content/ct.js` (the `document_start`/`all_frames` content script). The cross-boundary channel correctly names `content/ct → background`.

### 2. Data path — unbroken in code
`page 

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L1:C107989 -> L1:C110208
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background/background` [BG_1] @ L1:C3543 -> L1:C3579
- **Bridge**: message `runtime.single.sender.message[content/ct->background/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #5 (WINDOW_MESSAGE_EVENT → chrome.tabs.create)

### 1. Source control (who controls the data)

The normalized flow labels the source as `WINDOW_MESSAGE_EVENT` in a content script. The propagation HOP identifies the real sender as `content/ct` (`runtime.single.sender.message[content/ct->background/background]`).

I extracted the actual listener in `content/ct.js`:

```js
document.addEventListener("DOMContentLoaded",(()=>{
  const t="recorder-screenshot-v3";
  window.addEventListener("message",(e=>{
    let a=e.data;
    a.p==t && "tobg"==a.cmd && chrome.runtime.sendMessage(a.data,(t=>{...}))
  }));
  ...
}));
```

- The listener is registered in a content script that the manifest injects into **every frame** with `matches: ["<all_urls>"]`, `allFrames: true`, at `document_start`.
- The page fully controls `e.data`. The only gates are `a.p == "recorder-screenshot-v3"` and `a.cmd == "tobg"`. Both are attacker-chosen fields (`p` is a static, discoverable protocol tag embedded in the content script and in the injected page script `content/sm.js`; `cmd` is attacker-supplied). There is **no** `event.origin` check and no `source` check.
- Whatever the page puts in `a

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/content` [CS_1] @ L1:C107989 -> L1:C110208
- **Sink**: `CHROME_DOWNLOADS_OPTIONS` in `background/background` [BG_1] @ L3:C34682 -> L3:C34773
- **Bridge**: message `runtime.single.sender.message[content/ct->background/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #6 — `WINDOW_MESSAGE_EVENT → chrome.downloads.download`

### (a) Who controls the source?
A webpage controls it. The actual page→extension bridge is in **`content/ct.js`** (the content script that runs at `document_start`, `all_frames: true`, on `<all_urls>`). It installs:

```js
window.addEventListener("message", (e => {
  let a = e.data;
  a.p == t && "tobg" == a.cmd && chrome.runtime.sendMessage(a.data, ...)
}));
```

where `t = "recorder-screenshot-v3"`. The guard is only `a.p == "recorder-screenshot-v3" && a.cmd == "tobg"`. Both are fixed strings the attacker can learn (the token is exposed through the page-world `sm.js` injection and the public CRX), and there is **no `e.origin`, `e.source`, or `sender.id` check**. Any page on `<all_urls>` can forge this message and forward an arbitrary `data` object to the background.

*(Note: the normalized record labels the source file `content/content`, but the cross-boundary channel correctly identifies `content/ct`, and raw inspection of `ct.js` shows the real `window.addEventListener("message")` bridge.)*

### (b) Source-to-sink data path
1. Page: `window.postMessage({p:"recorder-screenshot-v3", cmd:"tobg", data

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
