# ExPAgent Static Verification — aopfgjfeiimeioiajeknfidlljpoebgc v9.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 3
- Coverage: node=0.049, scope=0.06
- Flow types: {'REQUEST_FORGERY': 3, 'PRIVILEGE_ESCALATION': 2}  |  Severities: {'CRITICAL': 5}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #4 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/contentscript` [CS_1] @ L1:C147 -> L1:C153
- **Sink**: `CHROME_WINDOWS_UPDATE_OPTIONS` in `js/erailchrome` [BG_1] @ L3:C267 -> L3:C353
- **Bridge**: message `runtime.single.sender.message[js/contentscript->js/erailchrome]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 — `WINDOW_MESSAGE_EVENT` → `CHROME_WINDOWS_UPDATE_OPTIONS`

### 1. Source control
Confirmed in `js/contentscript.js:1`:

```js
window.addEventListener("message",function(a){void 0!=a.data&&(plugdata=a.data,void 0!=plugdata.Action&&(...chrome.runtime.sendMessage(plugdata,function(a){})))});
```

The content script is injected into every `http://*/*` / `https://*/*` frame (ISOLATED world, `allFrames:true`). Any page can run `window.postMessage(...)`, and the `message` event is delivered to the content script's listener. The entire `a.data` object is attacker-controlled; the only check is `plugdata.Action != null`, which the attacker satisfies by supplying an `Action` field. There is no `sender.id`, `event.origin`, or allow-list guard. ✔ Attacker-controlled.

### 2. Source-to-sink path
- Page `postMessage({...})` → content script `window.addEventListener("message")`.
- Content script `chrome.runtime.sendMessage(plugdata)` → background `chrome.runtime.onMessage` (HOP `runtime.single.sender.message[js/contentscript->js/erailchrome]` confirmed).
- Background `js/erailchrome.js:2-3` switches on `a.Action`; for `case "SendMessage"` it runs `chrome.tabs.query({}, 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/contentscript` [CS_1] @ L1:C147 -> L1:C153
- **Sink**: `FETCH_RESOURCE` in `js/erailchrome` [BG_1] @ L4:C24 -> L4:C32
- **Bridge**: message `runtime.single.sender.message[js/contentscript->js/erailchrome]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source control (who can drive this)
The content script is injected into **every http/https page** (`matches: http://*/*, https://*/*`, `allFrames: true`). Its listener is:

```js
window.addEventListener("message",function(a){
  void 0!=a.data && (
    plugdata=a.data,
    void 0!=plugdata.Action && (
      (void 0!=plugdata.background && 0!=plugdata.background) || $("#divDetail").html(...),
      chrome.runtime.sendMessage(plugdata,function(a){})
    )
  )
});
```

`a.data` is the page's `postMessage` payload — fully attacker-controlled. The condition reduces to: if `a.data.Action` is defined, the payload is forwarded to the background (the `|| $("#divDetail").html(...)` branch returns a truthy jQuery object whenever `background` is unset, so `Action` alone is sufficient). No `event.origin`, `event.source`, or sender check exists.

### 2. Unbroken path
- **Page → content script:** `window.postMessage` payload becomes `plugdata`.
- **Content script → background:** `chrome.runtime.sendMessage(plugdata, ...)`.
- **Background:** `chrome.runtime.onMessage.addListener(function(a,b,c){ a.TabID=b.tab.id; plugdata=a; switch(a.Action){ ... case "GET_BLOB": to

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/contentscript` [CS_1] @ L1:C147 -> L1:C153
- **Sink**: `FETCH_BODY` in `js/erailchrome` [BG_1] @ L7:C359 -> L7:C455
- **Bridge**: message `runtime.single.sender.message[js/contentscript->js/erailchrome]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have confirmed the flow with the primary evidence and the raw source. Both files match the report exactly.

## Decision ledger

**(a) Who controls the source?**
`js/contentscript.js:1` registers `window.addEventListener("message", function(a){... plugdata=a.data ... chrome.runtime.sendMessage(plugdata, ...)})`. The content script is injected on `http://*/*` and `https://*/*` (allFrames), so any webpage can call `window.postMessage({...}, "*")`. There is no `event.origin` check, no `event.source` check, and no schema/field validation — the entire message `data` object is attacker-controlled.

**(b) Exact source-to-sink path**
1. Page → content script: `window.postMessage(attackerData)` hits the listener; `plugdata = a.data`.
2. Content script → background: `chrome.runtime.sendMessage(plugdata, ...)` (the harness HOP `runtime.single.sender.message[js/contentscript->js/erailchrome]`).
3. Background `js/erailchrome.js:2`: `chrome.runtime.onMessage.addListener(function(a,b,c){ a.TabID=b.tab.id; plugdata=a; switch(a.Action){ ... default: RequestQ.push(a), DownloadData(), c({}) } })`.
4. `DownloadData` (`js/erailchrome.js:7`): `var a = RequestQ[0]`, then `fetch(a.URL, {method: a.FetchMe

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
