# Source-level Taint Flow — nbhfcmbdimdbbclfngkjfmgmjhnkjocl 4.1.2

- Source type: CRX
- Files with issues: 8 / 10
- Distinct taint flows: 3  (collapsed from 8 raw issue entries)
- Sinkless sources skipped: 15 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_INNER_HTML (user)

- **Source**: `ELEMENT_INNER_HTML` — `account` L1:C413 -> L1:C436  `…dedNodes[0].nodeName){var n=t[0].addedNodes[0].textContent,d=JSON.parse(n);e(d)}})),n=document.getElementById("user"),d=»JSON.parse(n.innerHTML)«;e(d),t.observe(n,{childList:!0});var o=window.document.createElement("div");o.setAttribute("style","display: none;"),o.…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (user) — `account` L1:C53 -> L1:C87  `(()=>{"use strict";var e=function(e){!0!==e.loading&&»chrome.storage.local.set({user:e})«.then((function(){-1!==window.location.pathname.indexOf("/account/refresh")&&window.close()}))};(function(){var t=new Mu…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L1 `… e=function(e){!0!==»e.loading&&chrome.storage.local.set({user:e}).then((function(){-1!==window.location.pathname.indexOf("/account/refresh") …⟨tainted span: 394 chars⟩… ar n=t[0].addedNodes[0].textContent,d=JSON.parse(n);e(d)}})),n=document.getElementById("user"),d=JSON.parse(n.innerHTML)«;e(d),t.observe(n,{c…`  · RETURN:json.parse, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty

---

## Flow #2 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `contentButtons` L1:C29237 -> L1:C29238  `….A.locals&&m.A.locals;var g=r(9035),h=r(5438),w=r(4150),v=function(e){return/^https:\/\/(?:[^\.]+\.)?aliexpress\./.test(»e«)},y=r(3019),x=r(2951),k=r(5192),A=r(8413),O=r(1500),S=(0,g.vs)('<div class="h-[24px] w-[24px] -mb-[3px] text-white curs…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (logs) — `contentButtons` L1:C38316 -> L1:C38380  `…r K=function(e){return chrome.storage.local.get("logs").then((function(e){return e.logs||[]})).then((function(t){return »chrome.storage.local.set({logs:[].concat(J(t),[e]).slice(-250)})«}))};function ee(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (23 raw steps → 1 distinct lines):
   1. L1 `…?aliexpress\./.test(»e)},y=r(3019),x=r(2951),k=r(5192),A=r(8413),O=r(1500),S=(0,g.vs)('<div class="h-[24px] w-[24px] -mb-[3px] text-white cur …⟨tainted span: 14918 chars⟩… 5429:(e,t,r)=>{r.d(t,{Ne:()=>n,bw:()=>o});r(4278);var n=function(){return-1!==window.location.href.indexOf("popup.html")«},o=function(){retur…`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add, COPY:array.concat.arg, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right

---

## Flow #3 — DOCUMENT_LOCATION (From storage.local.set('logs') in contentButtons)  ·  6× duplicate paths collapsed

- **Source**: `DOCUMENT_LOCATION` — `contentButtons` L1:C29237 -> L1:C29238  `….A.locals&&m.A.locals;var g=r(9035),h=r(5438),w=r(4150),v=function(e){return/^https:\/\/(?:[^\.]+\.)?aliexpress\./.test(»e«)},y=r(3019),x=r(2951),k=r(5192),A=r(8413),O=r(1500),S=(0,g.vs)('<div class="h-[24px] w-[24px] -mb-[3px] text-white curs…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (logs) — `contentButtons` L1:C38316 -> L1:C38380  `…r K=function(e){return chrome.storage.local.get("logs").then((function(e){return e.logs||[]})).then((function(t){return »chrome.storage.local.set({logs:[].concat(J(t),[e]).slice(-250)})«}))};function ee(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (60 raw steps → 1 distinct lines):
   1. L1 `…?aliexpress\./.test(»e)},y=r(3019),x=r(2951),k=r(5192),A=r(8413),O=r(1500),S=(0,g.vs)('<div class="h-[24px] w-[24px] -mb-[3px] text-white cur …⟨tainted span: 14918 chars⟩… 5429:(e,t,r)=>{r.d(t,{Ne:()=>n,bw:()=>o});r(4278);var n=function(){return-1!==window.location.href.indexOf("popup.html")«},o=function(){retur…`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add, COPY:array.concat.arg, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, STORAGE:STORAGE_FLOW[area: local, key: logs, sender: contentButtons, receiver: contentButtons], ASSIGN:logical-left, ELEMENT:computed-member-unknown-alternative, ASSIGN:logical-right

---
