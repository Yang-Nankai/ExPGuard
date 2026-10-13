# Source-level Taint Flow — lbfjgknkjfjmnjdgdhbbmmbkoddgpdoc 11.5.7

- Source type: CRX
- Files with issues: 4 / 6
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C3014 -> L1:C3015  `…e,t){window.gmpCommand({command:e,data:t})}chrome.runtime.onMessageExternal.addListener(async(e,t,o)=>{"open_new_tab"===»e«.type?chrome.tabs.create({url:e.url},t=>{e.title&&setTimeout(()=>{chrome.runtime.lastError||chrome.scripting.executeScri…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L1:C3021 -> L1:C3210  `…ndow.gmpCommand({command:e,data:t})}chrome.runtime.onMessageExternal.addListener(async(e,t,o)=>{"open_new_tab"===e.type?»chrome.tabs.create({url:e.url},t=>{e.title&&setTimeout(()=>{chrome.runtime.lastError||chrome.scripting.executeScript({target:{tabId:t.id},func:e=>{document.title=e},args:[e.title]})},5e3)})«:"initGDrive"===e.type?l(e=>{o({status:e})}):"logoutGDrive"===e.type?(await s(),a&&function(){try{fetch("https://account…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (210 raw steps → 1 distinct lines):
   1. L1 `…00)}function d(e,t){»window.gmpCommand({command:e,data:t})}chrome.runtime.onMessageExternal.addListener(async(e,t,o)=>{"open_new_tab"===e.typ …⟨tainted span: 2496 chars⟩… ws.getAll({populate:!0},(function(t){t.forEach(t=>{const n=t.tabs;for(var a=0;a<n.length;a++){const i=n[a];i.url===e.url«&&(chrome.windows.up…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:logical-left, ASSIGN:logical-right

---

## Flow #2 — CHROME_IDENTITY_TOKEN (identity.authToken)

- **Source**: `CHROME_IDENTITY_TOKEN` — `background` L1:C2169 -> L1:C2170  `…):t&&t(null)})}async function s(){return new Promise(e=>{a?e(a):chrome.identity.getAuthToken({interactive:!0},t=>{t&&(a=»t«,e(t))})})}function u(e,t){e.targetFileId?r(null,e.fileContent,null,e.fileType,e.targetFileId,e=>{t({status:e})}):c(0,o=…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1:C3308 -> L1:C3369  `…gs:[e.title]})},5e3)}):"initGDrive"===e.type?l(e=>{o({status:e})}):"logoutGDrive"===e.type?(await s(),a&&function(){try{»fetch("https://accounts.google.com/o/oauth2/revoke?token="+a)«.then(e=>e.json()).then(e=>{}),chrome.identity.removeCachedAuthToken({token:a},e=>{}),a=null}catch(e){}}(),o({status:"OK…`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (12 raw steps → 1 distinct lines):
   1. L1 `…urn new Promise(e=>{»a?e(a):chrome.identity.getAuthToken({interactive:!0},t=>{t&&(a=t,e(t))})})}function u(e,t){e.targetFileId?r(null,e.fileC …⟨tainted span: 1348 chars⟩… ogle.com/o/oauth2/revoke?token="+a).then(e=>e.json()).then(e=>{}),chrome.identity.removeCachedAuthToken({token:a},e=>{})«,a=null}catch(e){}}(…`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty

---
