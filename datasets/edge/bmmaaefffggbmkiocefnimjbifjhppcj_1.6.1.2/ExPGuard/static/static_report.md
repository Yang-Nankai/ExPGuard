# ExPAgent Static Verification — bmmaaefffggbmkiocefnimjbifjhppcj v1.6.1.2

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 13  |  Verified: 2
- Coverage: node=0.597, scope=0.569
- Flow types: {'REQUEST_FORGERY': 11, 'PRIVILEGE_ESCALATION': 2}  |  Severities: {'HIGH': 13}

**Assessment:** Verified 2 flow(s): 0 true-positive, 2 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #12 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `js/shops/jd` [CS_8] @ L289:C107 -> L289:C115
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `js/background` [BG_1] @ L26:C289 -> L26:C463
- **Bridge**: message `runtime.single.sender.message[js/shops/jd->js/background]`
- **Severity evidence**: ['*://*.jd.com/list*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the flow against the actual extension source. Here is my analysis.

## Four-part decision ledger

**(a) Who controls the source — GENUINELY WEB-CONTROLLED**
`js/shops/jdwindow.js` is registered by the extension as a **MAIN-world** content script (background.js L38, `world:"MAIN"`, `id:"jd-monitor"`). It monkey-patches `window.XMLHttpRequest` and, when the page's own XHR to `functionId=soa_queryStock&appid=mro-ic` returns 200, dispatches:

```js
window.dispatchEvent(new CustomEvent("jd_item_ic_res",{detail:{data:{skuId:f,url:a,skuObj:g,body:c,requestBody:d}}}))
```

where `url:a` is the page's XHR URL and `skuId` is parsed from the `body` query parameter. So a page (or XSS on a matched jd.com origin) controls `detail.data.url` and `detail.data.skuId`. Source is real.

**(b) The actual source-to-sink path — MISMATCHED FIELD**
- Isolated-world `js/shops/jd.js` L288-290 listens for `jd_item_ic_res` and stores:
  - `g.GoodsId = a.skuId` (L289)
  - `g.jdSoaQueryStock = {skuId, skuObj, url:a.url, body:a.body}` (L289-290)
- The **raw `url` field** (`a.detail.data.url`) is stored only in `g.jdSoaQueryStock.url` and is consumed only by `getSoaQueryStock` (jd.js L212) → backgrou

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #0 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `js/shops/jd` [CS_8] @ L287:C450 -> L287:C458
- **Sink**: `FETCH_RESOURCE` in `js/background` [BG_1] @ L25:C197 -> L25:C245
- **Bridge**: message `runtime.single.sender.message[js/shops/jd->js/background]`
- **Severity evidence**: ['*://*.jd.com/list*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #0 — `WINDOW_CUSTOM_EVENT (jd_item_res)` → `FETCH_RESOURCE getMviewContent`

### 1. Source control
The source anchor is real and attacker-controllable. In `js/shops/jd.js` L287–288, the content script registers:

```js
window.addEventListener("jd_item_res", function(a){
  a = a.detail.data;
  ...
  g.jdItemDetails = {skuId:a.skuId, skuObj:a.skuObj, body:a.body, url:a.url};
  g.ReSetInfo();
});
```

A page running on the matched JD domains (e.g. `item.jd.com`, `list.jd.com`, `*.jd.com/list*`) can dispatch `new CustomEvent("jd_item_res", {detail:{data:{url:"...", skuId:...}}})` and fully control `a.url`, `a.skuId`, etc. So the **source** is genuinely page-controlled.

### 2. Source-to-sink path — **broken at the message bridge**
The flagged sink in `js/background.js` L25 is:

```js
if("getMviewContent"===b) return fetch(a.url,{mode:"cors",credentials:"include"})...
```

where `b = a.method` in `chrome.runtime.onMessage` (L15). For this branch to run, some frame must send `{method:"getMviewContent", url:<attacker value>}`.

I searched the entire extension for the action string:

- `getMviewContent` / `MviewContent` appears **only** in `js/background.js` L25.
- 

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
