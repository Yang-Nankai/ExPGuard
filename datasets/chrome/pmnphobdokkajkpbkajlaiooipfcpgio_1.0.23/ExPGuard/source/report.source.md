# Source-level Taint Flow — pmnphobdokkajkpbkajlaiooipfcpgio 1.0.23

- Source type: CRX
- Files with issues: 6 / 9
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 11 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `src/js/contentScript` L1:C3206 -> L1:C3283  `…,(async t=>{t.scaleToWidth(c),t.scaleToHeight(i),t.set({left:-e.x1,top:-e.y1}),r.add(t);const a=r.toDataURL();r.clear(),»await s.images.set({dataUrl:a,title:document.title,id:Date.now().toString()})«,o({action:n.OpenEditor})}))})(i);break;case t.EditContent:alert("Now you can edit this page"),document.designMode="on";…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (images) — `src/js/contentScript` L1:C693 -> L1:C740  `…e.local.get(i.Service,(t=>{const o={...c,...t[i.Service]};e(o)}))}))},a=[],l={set:async e=>{const t=await l.get();await »chrome.storage.local.set({[i.Images]:[...t,e]})«},get:e=>new Promise((t=>{chrome.storage.local.get(i.Images,(o=>{const n=[...a,...o[i.Images]??[]];if(e){const o=n.find(…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (8 raw steps → 1 distinct lines):
   1. L1 `…nst t=await l.get();»await chrome.storage.local.set({[i.Images]:[...t,e]})},get:e=>new Promise((t=>{chrome.storage.local.get(i.Images,(o=>{co …⟨tainted span: 4445 chars⟩… d(e),i+1===c.length){const e=a.toDataURL();await s.images.set({dataUrl:e,title:document.title,id:Date.now().toString()})«,a.clear(),o({action…`  · ELEMENT:object.setProperty, ELEMENT:implicit.add

---

## Flow #2 — CHROME_TABS_CAPUTURE_VISIBLE_TAB

- **Source**: `CHROME_TABS_CAPUTURE_VISIBLE_TAB` — `src/js/serviceWorker` L1:C570 -> L1:C571  `…captureVisibleTab(a,{format:"jpeg",quality:100},(a=>{chrome.storage.local.get("tmpImg",(r=>{const s=r.tmpImg??[];s.push(»a«),chrome.storage.local.set({tmpImg:s}).then((()=>{n.sendMessage(t??0,{action:i.CheckIsScreenshotDone,data:{...e,vertical…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (tmpImg) — `src/js/serviceWorker` L1:C573 -> L1:C609  `…tureVisibleTab(a,{format:"jpeg",quality:100},(a=>{chrome.storage.local.get("tmpImg",(r=>{const s=r.tmpImg??[];s.push(a),»chrome.storage.local.set({tmpImg:s})«.then((()=>{n.sendMessage(t??0,{action:i.CheckIsScreenshotDone,data:{...e,verticalAnchor:e.verticalAnchor+1}})}))}))}))}…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L1 `…id:t}])=>{chrome.tabs.captureVisibleTab(a,{format:"jpeg",quality:100},(a=>{chrome.storage.local.get("tmpImg",(r=>{const »s=r.tmpImg??[];s.push(a),chrome.storage.local.set({tmpImg:s}).then((()=>{n.sendMessage(t??0,{action:i.CheckIsScreenshotDone,data:{...e,verticalAnchor:e.verticalAnchor+1}})}))«}))}))}))};chrome.runtime.onMessage.addListener((async({action:e,data:a})=>{switch(e){case s.Capture:await p(a);break;ca…`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #3 — CHROME_TABS_CAPUTURE_VISIBLE_TAB (From storage.local.set('tmpImg') in src/js/serviceWorker)

- **Source**: `CHROME_TABS_CAPUTURE_VISIBLE_TAB` — `src/js/serviceWorker` L1:C570 -> L1:C571  `…captureVisibleTab(a,{format:"jpeg",quality:100},(a=>{chrome.storage.local.get("tmpImg",(r=>{const s=r.tmpImg??[];s.push(»a«),chrome.storage.local.set({tmpImg:s}).then((()=>{n.sendMessage(t??0,{action:i.CheckIsScreenshotDone,data:{...e,vertical…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (tmpImg) — `src/js/serviceWorker` L1:C573 -> L1:C609  `…tureVisibleTab(a,{format:"jpeg",quality:100},(a=>{chrome.storage.local.get("tmpImg",(r=>{const s=r.tmpImg??[];s.push(a),»chrome.storage.local.set({tmpImg:s})«.then((()=>{n.sendMessage(t??0,{action:i.CheckIsScreenshotDone,data:{...e,verticalAnchor:e.verticalAnchor+1}})}))}))}))}…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (6 raw steps → 1 distinct lines):
   1. L1 `…chrome.tabs.query({active:!0},(([{windowId:a,id:t}])=>{chrome.tabs.captureVisibleTab(a,{format:"jpeg",quality:100},(a=>{»chrome.storage.local.get("tmpImg",(r=>{const s=r.tmpImg??[];s.push(a),chrome.storage.local.set({tmpImg:s}).then((()=>{n.sendMessage(t??0,{action:i.CheckIsScreenshotDone,data:{...e,verticalAnchor:e.verticalAnchor+1}})}))}))«}))}))};chrome.runtime.onMessage.addListener((async({action:e,data:a})=>{switch(e){case s.Capture:await p(a);break;case …`  · ASSIGN:identifier, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: tmpImg, sender: src/js/serviceWorker, receiver: src/js/serviceWorker], ASSIGN:logical-left, ELEMENT:member-element-container

---
