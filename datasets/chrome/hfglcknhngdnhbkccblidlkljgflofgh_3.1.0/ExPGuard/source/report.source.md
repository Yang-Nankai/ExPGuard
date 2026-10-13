# Source-level Taint Flow — hfglcknhngdnhbkccblidlkljgflofgh 3.1.0

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 5  (collapsed from 162 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_CUSTOM_EVENT (window.addEventListener(savePluginMetrics))

- **Source**: `WINDOW_CUSTOM_EVENT` — `content` L1:C10470 -> L1:C10478  `…detail&&e.detail.context&&$(e.detail.eventSource,e.detail.context)}),window.addEventListener("savePluginMetrics",e=>{e&&»e.detail«&&e.detail.id&&e.detail.state&&async function(e,n){o(`Saving metrics for feature '${e}'`,n);const t=await chrome.storage…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (plugin-metrics) — `content` L1:C10638 -> L1:C10665  `…ction(e,n){o(`Saving metrics for feature '${e}'`,n);const t=await chrome.storage.local.get(s);t[s]||(t[s]={}),t[s][e]=n,»chrome.storage.local.set(t)«}(e.detail.id,e.detail.state)})}(e),function(e,n){if(!e||u())return;(async function(e){const n=await v(e);if(n){const e=…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (26 raw steps → 1 distinct lines):
   1. L1 `…(e){function n(n,t){»t.unshift(`${e}:`)}function t(...e){n(0,e)}const a={info(...e){n(0,e)},error(...e){n(0,e)},warn(...e){n(0,e)}};return Ob …⟨tainted span: 8456 chars⟩… st t=await chrome.storage.local.get(s);t[s]||(t[s]={}),t[s][e]=n,chrome.storage.local.set(t)}(e.detail.id,e.detail.state«)})}(e),function(e,n…`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:template-literal, RETURN:fallback-return, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_CUSTOM_EVENT (window.addEventListener(labsPermCheck))

- **Source**: `WINDOW_CUSTOM_EVENT` — `content` L1:C11056 -> L1:C11064  `…ck",function e(t){window.removeEventListener("labsPermCheck",e),function(e,n){M("Handling perm check...");const t=!!(e&&»e.detail«&&e.detail.labsAllowed),a=e&&e.detail&&e.detail.labsAdminDisabledFeatures||[];$("lightning-labs-allowed",{allowed:t,admi…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (labs-sessions) — `content` L1:C6998 -> L1:C7031  `…ction _(e,n){let t=(await chrome.storage.local.get(k))[k]||{},a=!!t[e];t[e]=n,n.creation||(n.creation=Date.now()),await »chrome.storage.local.set({[k]:t})«,a&&await async function(){let e=(await chrome.storage.local.get(k))[k]||{},n=Object.keys(e);const t=Date.now();n.forEac…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (28 raw steps → 1 distinct lines):
   1. L1 `…function _(e,n){let »t=(await chrome.storage.local.get(k))[k]||{},a=!!t[e];t[e]=n,n.creation||(n.creation=Date.now()),await chrome.storage.lo …⟨tainted span: 4407 chars⟩… minDisabledFeatures:a,cached:!1});let i={"labs-allowed":t,"labs-admin-disabled-features":a,"last-perm-check":Date.now()}«;_(n,i).then(()=>{S(…`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #3 — WINDOW_CUSTOM_EVENT (From storage.local.set('labs-sessions') in content)  ·  152× duplicate paths collapsed

- **Source**: `WINDOW_CUSTOM_EVENT` — `content` L1:C11056 -> L1:C11064  `…ck",function e(t){window.removeEventListener("labsPermCheck",e),function(e,n){M("Handling perm check...");const t=!!(e&&»e.detail«&&e.detail.labsAllowed),a=e&&e.detail&&e.detail.labsAdminDisabledFeatures||[];$("lightning-labs-allowed",{allowed:t,admi…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (labs-sessions) — `content` L1:C6998 -> L1:C7031  `…ction _(e,n){let t=(await chrome.storage.local.get(k))[k]||{},a=!!t[e];t[e]=n,n.creation||(n.creation=Date.now()),await »chrome.storage.local.set({[k]:t})«,a&&await async function(){let e=(await chrome.storage.local.get(k))[k]||{},n=Object.keys(e);const t=Date.now();n.forEac…`
  - `CHROME_LOCAL_STORAGE` (labs-sessions) — `content` L1:C7318 -> L1:C7351  `…||t-i>=L)&&(w(`Cleaning up old session ${n}`),delete e[n])}else w(`Cleaning up empty session ${n}`),delete e[n]}),await »chrome.storage.local.set({[k]:e})«}(),await async function(){return(await chrome.storage.local.get("labs-sid"))["labs-sid"]}()||await E(e)}async function …`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (53 raw steps → 1 distinct lines):
   1. L1 `…urn new Promise(n=>{»chrome.storage.local.get(["labs-enabled","labs-sessions"]).then(t=>{const i=t["labs-enabled"],s=t["labs-sessions"];if(i& …⟨tainted span: 8704 chars⟩… minDisabledFeatures:a,cached:!1});let i={"labs-allowed":t,"labs-admin-disabled-features":a,"last-perm-check":Date.now()}«;_(n,i).then(()=>{S(…`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary, ASSIGN:identifier, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: labs-sessions, sender: content, receiver: content], ELEMENT:member-element-container, ASSIGN:binary-right, RETURN:fallback-return

---

## Flow #4 — WINDOW_CUSTOM_EVENT (From storage.local.set('plugin-metrics') in content)

- **Source**: `WINDOW_CUSTOM_EVENT` — `content` L1:C10470 -> L1:C10478  `…detail&&e.detail.context&&$(e.detail.eventSource,e.detail.context)}),window.addEventListener("savePluginMetrics",e=>{e&&»e.detail«&&e.detail.id&&e.detail.state&&async function(e,n){o(`Saving metrics for feature '${e}'`,n);const t=await chrome.storage…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (plugin-metrics) — `background` L1:C754 -> L1:C787  `…component-manager' metrics formatting...");let t=n["component-manager"];n["component-manager"]={hidden:t},a=!0}a&&await »chrome.storage.local.set({[t]:n})«;return n}(n)}async function i(){let e=await a();if(e){const t=await chrome.storage.local.get("labs-enabled"),n=t&&t["la…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (60 raw steps → 1 distinct lines):
   1. L1 _(in `content`)_ `…!important;\n    bor»der-color: #494949 !important;\n    color: rgb(255,255,255,.7); !important;\n  }";const a=chrome.runtime.getURL("images/ …⟨tainted span: 10434 chars⟩… st t=await chrome.storage.local.get(s);t[s]||(t[s]={}),t[s][e]=n,chrome.storage.local.set(t)}(e.detail.id,e.detail.state«)})}(e),function(e,n…`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:template-literal, RETURN:fallback-return, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: plugin-metrics, sender: content, receiver: background], ELEMENT:member-element-container

---

## Flow #5 — WINDOW_CUSTOM_EVENT (From storage.local.set('plugin-metrics') in background)  ·  7× duplicate paths collapsed

- **Source**: `WINDOW_CUSTOM_EVENT` — `content` L1:C10470 -> L1:C10478  `…detail&&e.detail.context&&$(e.detail.eventSource,e.detail.context)}),window.addEventListener("savePluginMetrics",e=>{e&&»e.detail«&&e.detail.id&&e.detail.state&&async function(e,n){o(`Saving metrics for feature '${e}'`,n);const t=await chrome.storage…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (plugin-metrics) — `background` L1:C754 -> L1:C787  `…component-manager' metrics formatting...");let t=n["component-manager"];n["component-manager"]={hidden:t},a=!0}a&&await »chrome.storage.local.set({[t]:n})«;return n}(n)}async function i(){let e=await a();if(e){const t=await chrome.storage.local.get("labs-enabled"),n=t&&t["la…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (61 raw steps → 1 distinct lines):
   1. L1 _(in `content`)_ `…!important;\n    bor»der-color: #494949 !important;\n    color: rgb(255,255,255,.7); !important;\n  }";const a=chrome.runtime.getURL("images/ …⟨tainted span: 10434 chars⟩… st t=await chrome.storage.local.get(s);t[s]||(t[s]={}),t[s][e]=n,chrome.storage.local.set(t)}(e.detail.id,e.detail.state«)})}(e),function(e,n…`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:template-literal, RETURN:fallback-return, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: plugin-metrics, sender: content, receiver: background], ELEMENT:member-element-container, STORAGE:STORAGE_FLOW[area: local, key: plugin-metrics, sender: background, receiver: background]

---
