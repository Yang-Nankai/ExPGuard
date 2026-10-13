# Source-level Taint Flow — gpgbiinpmelaihndlegbgfkmnpofgfei 3.7

- Source type: CRX
- Files with issues: 5 / 5
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 21 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_CUSTOM_EVENT (window.addEventListener(msfy-inner-message))

- **Source**: `WINDOW_CUSTOM_EVENT` — `js/content` L1:C626 -> L1:C634  `…>a.dispatchEvent(new CustomEvent(o,t)))({detail:JSON.stringify({type:t,value:o})});function r(e){try{const t=JSON.parse(»e.detail«),{type:a,value:i}=t;switch(a){case"average":case"barPosition":case"callout":case"collapsed":case"filterPosition":case"h…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `js/content` L1:C777 -> L1:C805  `…itch(a){case"average":case"barPosition":case"callout":case"collapsed":case"filterPosition":case"handle":case"menuWidth":»o.storage.local.set({[a]:i})«;break;case"url":o.runtime.sendMessage(t)}}catch(e){}}function d(e){const{type:t,value:o}=e;if("command"===t)c(t,o)}func…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (21 raw steps → 1 distinct lines):
   1. L1 `…t,o=n,a=e)=>a.dispatchEvent(new CustomEvent(o,t)))({detail:JSON.stringify({type:t,value:o})});function r(e){try{const t=»JSON.parse(e.detail),{type:a,value:i}=t;switch(a){case"average":case"barPosition":case"callout":case"collapsed":case"filterPosition":case"handle":case"menuWidth":o.storage.local.set({[a]:i})«;break;case"url":o.runtime.sendMessage(t)}}catch(e){}}function d(e){const{type:t,value:o}=e;if("command"===t)c(t,o)}func…`  · ELEMENT:member-element, RETURN:json.parse, ELEMENT:destructure-property[type], ELEMENT:destructure-property[value], ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_CUSTOM_EVENT (window.addEventListener(msfy-inner-message))

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L1:C334 -> L1:C443  `…Window:!0});e.action.disable(),e.runtime.onConnect.addListener((i=>{e.action.enable(i.sender.tab.id),i.sender.tab.id})),»e.runtime.onMessage.addListener((i=>{const{type:n,value:t}=i;if("url"===n)e.tabs.create({url:t,active:!0})}))«,e.runtime.onInstalled.addListener((i=>{if(i.reason===e.runtime.OnInstalledReason.INSTALL)e.storage.local.set({installed…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L1:C408 -> L1:C440  `…on.enable(i.sender.tab.id),i.sender.tab.id})),e.runtime.onMessage.addListener((i=>{const{type:n,value:t}=i;if("url"===n)»e.tabs.create({url:t,active:!0})«})),e.runtime.onInstalled.addListener((i=>{if(i.reason===e.runtime.OnInstalledReason.INSTALL)e.storage.local.set({instal…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (10 raw steps → 1 distinct lines):
   1. L1 `…Window:!0});e.action.disable(),e.runtime.onConnect.addListener((i=>{e.action.enable(i.sender.tab.id),i.sender.tab.id})),»e.runtime.onMessage.addListener((i=>{const{type:n,value:t}=i;if("url"===n)e.tabs.create({url:t,active:!0})}))«,e.runtime.onInstalled.addListener((i=>{if(i.reason===e.runtime.OnInstalledReason.INSTALL)e.storage.local.set({installed…`  · MESSAGE, ELEMENT:destructure-property[type], ELEMENT:destructure-property[value], ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[js/content->background]`

---

## Flow #3 — ELEMENT_VALUE (event(change))

- **Source**: `ELEMENT_VALUE` — `js/options` L1:C944 -> L1:C951  `…o);e&&(e.checked=n)}function r(t){const n=t.target,i="radio"===n.type?n.name:n.id,s=e(i);if(s){const t="radio"===n.type?»n.value«:n.checked;t===s.default?o.storage.local.remove(i):o.storage.local.set({[i]:t})}}function l(t,n){t?.addEventListener("cl…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `js/options` L1:C1002 -> L1:C1030  `…o"===n.type?n.name:n.id,s=e(i);if(s){const t="radio"===n.type?n.value:n.checked;t===s.default?o.storage.local.remove(i):»o.storage.local.set({[i]:t})«}}function l(t,n){t?.addEventListener("click",(t=>{t.preventDefault(),o.tabs.create({url:n,active:!0}),s&&a&&window.clos…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (8 raw steps → 1 distinct lines):
   1. L1 `…o);e&&(e.checked=n)}function r(t){const n=t.target,i="radio"===n.type?n.name:n.id,s=e(i);if(s){const t="radio"===n.type?»n.value:n.checked;t===s.default?o.storage.local.remove(i):o.storage.local.set({[i]:t})«}}function l(t,n){t?.addEventListener("click",(t=>{t.preventDefault(),o.tabs.create({url:n,active:!0}),s&&a&&window.clos…`  · ASSIGN:conditional-consequent, ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty

---

## Flow #4 — NAVIGATOR_CLIPBOARD

- **Source**: `NAVIGATOR_CLIPBOARD` — `js/polymer` L1:C2441 -> L1:C2442  `…try{navigator.clipboard.readText().then((t=>{if(/^\s*\[(\s*\"[\w-]{11}\"\s*,\s*)*(\s*\"[\w-]{11}\"\s*,?\s*\])\s*$/.test(»t«)){const o=JSON.parse(t);Ut(o)&&(Ut(Ft)&&(n=Ft,(e=o).length===n.length&&e.toString()===n.toString())||(Ft=o,Bt(o)))}var …`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `js/polymer` L1:C2156 -> L1:C2209  `…t=>Array.isArray(t)&&t.every((t=>"string"==typeof t&&11===t.length)),Jt=()=>Ut(Ft)?Ft.length:0,Yt=()=>Jt()>0,Bt=e=>{try{»t.localStorage.setItem(jt,JSON.stringify({videos:e}))«}catch(t){}},qt=()=>{try{return JSON.parse(t.localStorage.getItem(jt)).videos}catch(t){return[]}},Wt=()=>{if(!c)try{navi…`
- **Sanitized**: NO
- **Frame**: `MAIN_js_polymer`

- **Propagation** (31 raw steps → 1 distinct lines):
   1. L1 `…;let Ft;const Ut=t=>»Array.isArray(t)&&t.every((t=>"string"==typeof t&&11===t.length)),Jt=()=>Ut(Ft)?Ft.length:0,Yt=()=>Jt()>0,Bt=e=>{try{t.l …⟨tainted span: 503 chars⟩… ,?\s*\])\s*$/.test(t)){const o=JSON.parse(t);Ut(o)&&(Ut(Ft)&&(n=Ft,(e=o).length===n.length&&e.toString()===n.toString())«||(Ft=o,Bt(o)))}var …`  · ASSIGN:identifier, RETURN:json.parse, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:object.setProperty, RETURN:json.stringify, ASSIGN:conditional-consequent

---
