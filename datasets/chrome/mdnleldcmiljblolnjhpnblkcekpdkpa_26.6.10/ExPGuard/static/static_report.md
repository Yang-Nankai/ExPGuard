# ExPAgent Static Verification — mdnleldcmiljblolnjhpnblkcekpdkpa v26.6.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 14  |  Verified: 4
- Coverage: node=0.034, scope=0.051
- Flow types: {'STORAGE_POSOING': 5, 'PRIVILEGE_ESCALATION': 7, 'REQUEST_FORGERY': 2}  |  Severities: {'MEDIUM': 12, 'HIGH': 2}

**Assessment:** Verified 4 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #10 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `serviceWorker` [BG_1] @ L1:C43978 -> L1:C43979
- **Sink**: `CHROME_BROWSINGDATA_REMOVE` in `serviceWorker` [BG_1] @ L1:C41890 -> L1:C41933
- **Severity evidence**: ['https://*.bsstag.com/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to render a verdict. Let me summarize my analysis.

## Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener((e,t,s)=>{switch(e.action){...}})` in the background service worker (`serviceWorker.js`). `e` is the full external-message payload. The manifest's `externally_connectable.matches` restricts *which origins* can reach this listener to `https://*.bsstag.com/*` and `https://*.browserstack.com/*` (plus the fixed extension ID `khkpfminnhkjeabcnhpjcfhegbbodpjk`), but the listener body itself performs **no `sender.id` check, no `sender.origin`/`sender.url` check, and no action allow-list**. Any page/XSS on those wildcard-matched origins controls the message fields.

**(b) Exact source-to-sink data path**
From the minified source I confirmed the whole chain:

```
onMessageExternal.addListener((e,t,s)=>{
  switch(e.action){
    ...
    case de:
      return Ys(e.payload?.url, e.payload?.config||{},
                 {tabId:t.tab?.id, windowId:t.tab?.windowId}).then(s), true;
    ...
  }
})
```

`Ys` is defined as:

```
Ys=(e,t={},s)=> Xs ? e && (e=>{ try{const t=new URL(e); return "http:"===t.protocol||"http

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `app.cs` [CS_1] @ L1:C7673 -> L1:C7787
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `serviceWorker` [BG_1] @ L1:C46554 -> L1:C46662
- **Bridge**: message `runtime.single.sender.message[app.cs->serviceWorker]`
- **Severity evidence**: ['https://app.requestly.io/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me lay out the ledger.

## Decision ledger

**(a) Who controls the source?**
The source is `window.addEventListener("message", ...)` in `app.cs.js` (content script, injected only into `https://app.requestly.io/*`, `https://app.requestly.com/*`, `https://requestly.com/*`). The guard is:

```js
if ((!r || (e=>{ let t=new URL(e).origin; return te().includes(t) })(r.origin)) && r && r.data && r.data.source === "page_script")
```

I confirmed from raw source that:
- `te()` = the origins of `X.WEB_URL` (`https://app.requestly.io`) and `X.OTHER_WEB_URLS` (`https://app.requestly.com`, `https://requestly.com`).
- `ie` = `"page_script"` (an attacker-settable message field, not authentication).

So only a document running in one of the three Requestly web origins can satisfy `r.origin`; but that is an **exact web-origin check**, not a browser-authenticated `sender.id` boundary. It is bypassable via XSS/script execution on those origins. The `source` field and `action` field are attacker-chosen.

**(b) Source → sink path (unbroken)**
1. `app.cs.js` message listener: for the action group `a,c,d,S,h,T,l` (which includes `d = "startRecordingOnUrl"`), it does 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #11 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `app.cs` [CS_1] @ L1:C7673 -> L1:C7787
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `serviceWorker` [BG_1] @ L1:C25693 -> L1:C25782
- **Bridge**: message `runtime.single.sender.message[app.cs->serviceWorker]`
- **Severity evidence**: ['https://app.requestly.io/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `app.cs` [CS_1] @ L1:C7673 -> L1:C7787
- **Sink**: `CHROME_LOCAL_STORAGE` in `app.cs` [CS_1] @ L1:C2554 -> L1:C2578
- **Bridge**: message `runtime.single.sender.message[client.cs->app.cs]`
- **Severity evidence**: ['https://app.requestly.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — STORAGE_POSOING (`attacker-input-storage-write`)

### 1. Evidence gathered

**Source** (`app.cs` L1:C7673): `window.addEventListener("message", async r => { ... if((origin in te()) && r.data.source === "page_script") switch(r.data.action){...} })`. This is a page→content-script `window.postMessage` bridge in the Requestly web-app content script.

**Sink** (`app.cs` L1:C2554): `const V = async e => { await chrome.storage[q].set(e) }` where `q = "local"` (confirmed from the minified source: `q="local"`). So the sink is `chrome.storage.local.set(e)`.

**Connecting path** (confirmed in source, `app.cs.js` around L1:C7900–8100): the message switch contains:

```js
case o: return await V(r.data.object), void re(r.data);
```

with `o = "SAVE_STORAGE_OBJECT"`.

### 2. Decision ledger

- **(a) Who controls the source?** The web page running on `https://app.requestly.io/*` (also `*.requestly.com`, `requestly.com`). The page fully controls `window.postMessage` payload fields: `data.source`, `data.action`, and `data.object`. This is attacker-controllable web content (worst case via XSS on those domains; the manifest restricts the surface, hence MEDIUM, but does not elimi

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
