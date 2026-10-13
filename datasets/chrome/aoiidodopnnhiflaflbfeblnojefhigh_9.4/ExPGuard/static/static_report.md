# ExPAgent Static Verification — aoiidodopnnhiflaflbfeblnojefhigh v9.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.533, scope=0.378
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 2 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/app` [CS_1] @ L1:C154929 -> L1:C154937
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background` [BG_1] @ L1:C236576 -> L1:C236661
- **Bridge**: message `runtime.single.sender.message[js/app->js/background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me lay out the verified chain.

**Source-level evidence (confirmed in raw source, not just the report):**

1. **Attacker-reachable page↔content-script bridge (js/iframe.js, CS on `http://*/*`, `https://*/*`):**
```js
window.addEventListener("message",pb_receiveMessage,false);
function pb_receiveMessage(e){ ...
  else if(e.data && (""+e.data).indexOf("openUrl")===0){
      let ev=new CustomEvent("pb1_OpenUrl_Event",{detail:e.data});
      document.dispatchEvent(ev)}
  else if(e.data && (""+e.data).indexOf("openCloseUrl")===0){ ... }
}
window.addEventListener("message",(function(e){ if(e.data.action==="setCouponsProducts"){setCouponsProducts()} ...}));
```
No `origin` check, no `event.source` check, no action allow-list beyond a `startsWith("openUrl")` prefix. The page can arm the listener with `window.postMessage({action:"setCouponsProducts"},"*")` and then feed a raw string.

2. **Content-script forwarder (js/app.js, `init()`):**
```js
document.addEventListener("pb1_OpenUrl_Event",(function(e){
   const url=e.detail.replace("openUrl","");
   main_browser.runtime.sendMessage({action:"openUrl",url:url})
}),false,true);
```
`.replace("openUrl","")` is a pre

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/app` [CS_1] @ L1:C154929 -> L1:C154937
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/coupons_popup` [POPUP_1] @ L1:C226906 -> L1:C226991
- **Bridge**: message `runtime.single.sender.message[js/app->js/coupons_popup]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Ledger

**(a) Who controls the source — page (attacker), via a content script on a wildcard surface.**
The flow is a `TARGET_CUSTOM_EVENT` in `js/app.js`, whose remark is `target.addEventListener(pb1_OpenUrl_Event)`. The harness classifies reachability as `PAGE_TO_CONTENT_SCRIPT` and states: *"A page can forge window.postMessage/CustomEvent fields… event.source === window, same-page origin checks, and message action/type fields are not authentication."* The manifest injects `js/app.js` at `document_end` into `http://*/*` and `https://*/*` (`allFrames:false`, `world:ISOLATED`), so **any site the user visits can dispatch the custom event** — hence the CRITICAL severity. Corroborating source inspection: the literal pattern `addEventListener(["']pb1_OpenUrl_Event` regex-matches in `js/app.js`, and `action:"openUrl"` also matches there, i.e. the CS both subscribes to the page-forgeable event name and emits the `openUrl` action.

**(b) The path.** `report.source.md` (Flow #4) shows one continuous tainted line with an explicit cross-context bridge annotation:
`[HOP: runtime.single.sender.message[js/app->js/coupons_popup]]`, `Sanitized: False`, `Duplicate paths reported: 1`. The receivi

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
