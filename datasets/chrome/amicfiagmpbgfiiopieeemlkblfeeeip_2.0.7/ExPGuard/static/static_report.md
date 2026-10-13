# ExPAgent Static Verification — amicfiagmpbgfiiopieeemlkblfeeeip v2.0.7

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 5  |  Verified: 5
- Coverage: node=0.66, scope=0.627
- Flow types: {'STORAGE_POSOING': 5}  |  Severities: {'HIGH': 5}

**Assessment:** Verified 5 flow(s): 5 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 5 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `content/c` [CS_1] @ L7:C1706 -> L7:C1719
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/c` [CS_1] @ L7:C1541 -> L7:C1568
- **Severity evidence**: ['https://*.funpay.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me consolidate the decision.

**Decision ledger**

**(a) Who controls the source?** The content script `content/c.js` (matches `https://funpay.com/*` **and** `https://*.funpay.com/*`, `runAt: document_start`, ISOLATED) reads the page DOM:
```js
function ql(){ let e=document.querySelector(".user-link-name"); return e?e.textContent:null ... }
var bt=ql;                       // getUserName
```
`.user-link-name` is a page-owned element; per the harness `PAGE_TO_CONTENT_SCRIPT`, "a page can … mutate shared DOM values." So on any matched origin (including wildcard subdomains — the cited severity reason) an attacker page can set that node's `textContent` to arbitrary text. Source = attacker-controllable. ✔

**(b) The exact source→sink path.** Line 7:
```js
function Y(){ try{ let e=Io(), t=bt();
  return {userId:e.userId, userName:t, csrfToken:e["csrf-token"]}; } ... }
```
`Y()` folds the raw DOM `textContent` into `userName` with no validation. Then line 88:
```js
async function ic(){ ua(); let e=Y(); e && D("appData", e); ... }
var Mn=ic;   // content-script init
```
and the sink on line 7:
```js
async function Ml(e,t,n=!1){ let s={}; n?s=t:s[e]=t; await chro

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `content/c` [CS_1] @ L7:C1706 -> L7:C1719
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/c` [CS_1] @ L7:C1541 -> L7:C1568
- **Severity evidence**: ['https://*.funpay.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — ELEMENT_TEXT_CONTENT (`.user-link-name`) → `chrome.storage.local.set`

### Evidence I confirmed in source (not just the report)

**Source (content/c.js, `ql`, aliased `bt`)** — DOM read, no sanitization:
```js
function ql(){try{let e=document.querySelector(".user-link-name");return e?e.textContent:null}catch(e){...return null}}
var bt=ql;
```
**Aggregation (`Y`)** — mixes the tainted name with page-supplied body data:
```js
function Y(){try{let e=Io(), t=bt();
  return {userId:e.userId, userName:t, csrfToken:e["csrf-token"]}}catch(e){...}}
```
(`Io`/`Pl` reads `document.body.dataset.appData` — also page/DOM-controlled.)

**Sink caller (`ic`) — this is the "appData" sink the report names:**
```js
async function ic(){ ua(); let e=Y(); e && D("appData", e); ... }
```

**Storage writer (`Ml`, aliased `D`)** — where `.user-link-name` lands verbatim:
```js
async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,
  await chrome.storage.local.set(s), ...}
var D=Ml;   // D("appData", {userId, userName:".user-link-name".textContent, csrfToken})
```

The path is direct and unbroken: `.user-link-name.textContent` → `Y().userName` → `D("appData", e)` → `chrome.storag

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `ELEMENT_VALUE` in `content/c` [CS_1] @ L217:C1424 -> L217:C1428
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/c` [CS_1] @ L7:C1541 -> L7:C1568
- **Severity evidence**: ['https://*.funpay.com/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me consolidate the analysis.

**Ledger**

**(a) Who controls the source?** The report labels the source `ELEMENT_VALUE`, remark `.lb-review-textarea`, provenance `CONTENT_SCRIPT`, on a content script injected into `https://funpay.com/*` + `https://*.funpay.com/*` at `document_start`, ISOLATED world. The report's literal anchor (`t={}` inside `qr()`) is imprecise — the harness itself warns "the exact source anchor does not contain the expected source API/token." Inspecting the real source resolves it: the `.lb-review-textarea` elements are created by the content script (`ds()` builds the modal HTML at L218-220 and `ge`/`Pc` appends it to `p.lead`/`document.body`, i.e. the **shared page DOM**), and their value is read at L225:
`… s.querySelectorAll(".lb-review-textarea") … a.addEventListener("input",()=>{(async()=>{let r=await qr(); r[String(a.dataset.rating)]=a.value, await D(Pr,r) })()})`.

A page script (or XSS on any `*.funpay.com` host the wildcard matches) can reach these elements in the shared DOM, set `.value`, and dispatch a synthetic `input` event. That is exactly the `PAGE_TO_CONTENT_SCRIPT` reachability the harness documents ("a page can … muta

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `ELEMENT_VALUE` in `content/c` [CS_1] @ L217:C1424 -> L217:C1428
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/c` [CS_1] @ L7:C1541 -> L7:C1568
- **Severity evidence**: ['https://*.funpay.com/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #6 — `web-content-storage-write` (STORAGE_POISONING)

### Deterministic-ledger

**(a) Who controls the source?**
The source is `ELEMENT_VALUE` on `content/c.js` with provenance `CONTENT_SCRIPT`, remark `.lb-review-textarea`, on `https://funpay.com/*` and wildcard `https://*.funpay.com/*`.

I confirmed the real element read at `content/c.js:225`:
```js
s.forEach(a=>{a.addEventListener("input",()=>{(async()=>{
  let r=await qr();
  r[String(a.dataset.rating)]=a.value,   // <-- element value -> written object
  await D(Pr,r)
})()})});
```
The textarea is injected as **light DOM** (line 131: `document.body.appendChild(s)` / `o.appendChild(s)`), and there is **no shadow root** (`attachShadow|shadowRoot` → no matches). A page script in the main world therefore shares these nodes: it can `document.querySelectorAll('.lb-review-textarea')`, set `.value`, and `dispatchEvent(new Event('input',{bubbles:true}))`. The listener is bound directly to the element, so a page-dispatched event fires it. Per the harness, a page can "mutate shared DOM values." So the source is genuinely web-controllable (via XSS on `funpay.com` or any `*.funpay.com` subdomain — the manifest matches 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `ELEMENT_VALUE` in `content/c` [CS_1] @ L88:C6893 -> L88:C6897
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/c` [CS_1] @ L7:C1541 -> L7:C1568
- **Severity evidence**: ['https://*.funpay.com/*']
- **Source report Flow ID**: `7`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #7 (STORAGE_POSOING, ELEMENT_VALUE → chrome.storage.local.set)

**Injected evidence vs. raw source.** I confirmed both anchors in `content/c.js` against the report.

**Source (L88)** — the settings-save routine `yc` (aliased `kt = yc`):
```js
async function yc(e,t,n){
  let s={};
  for(let r=0;r<e.length;r++){let i=e[r].name; s[i]=e[r].checked}   // page form fields
  document.querySelectorAll("select.LB-select").forEach(r=>{ r.name&&(s[r.name]=r.value) }),  // page DOM selects
  s.theme=t.value;
  let a=await La(s);                                                // → D(null,s,true)
  await chrome.runtime.sendMessage({target:"background",method:"saveSettings"}), ...
}
```

**Sink (L7)** — `La = hc`, `hc(e)=>D(null,e,!0)`, `D = Ml`:
```js
async function Ml(e,t,n=!1){ let s={}; return n?s=t:s[e]=t, await chrome.storage.local.set(s), ... }
```
With `n=!0`, the local `s` becomes the whole attacker-built object `t`, so `chrome.storage.local.set(s)` writes exactly the object assembled from DOM element state. The bridge is unbroken and inside one frame (no message/storage hop needed).

### Decision ledger
- **(a) Who controls the source.** `document.querySelectorAll

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
