# Source-level Taint Flow — kfkdboecolemdjodhmhmcibjocfopejo 3.0.6

- Source type: CRX
- Files with issues: 5 / 36
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 39 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `serviceWorker` L1:C90130 -> L1:C90131  `…kie error")}},W=chrome.runtime.getManifest(),G=()=>{chrome.runtime.onMessageExternal.addListener((function(e,t,r){var n=»e«.type,o=e.data;if("extension:openUrlPage"===n){var i=chrome.runtime.getURL("/");chrome.tabs.create({url:i+o.url,active:!…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `serviceWorker` L1:C90211 -> L1:C90274  `…nal.addListener((function(e,t,r){var n=e.type,o=e.data;if("extension:openUrlPage"===n){var i=chrome.runtime.getURL("/");»chrome.tabs.create({url:i+o.url,active:!0},(function(){r(!0)}))«}return"extension:getVersion"===n&&W&&W.version&&r(W.version),!0}))};chrome.runtime.onInstalled.addListener((function(e)…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (69 raw steps → 1 distinct lines):
   1. L1 `…kie error")}},W=chrome.runtime.getManifest(),G=()=>{chrome.runtime.onMessageExternal.addListener((function(e,t,r){var n=»e.type,o=e.data;if("extension:openUrlPage"===n){var i=chrome.runtime.getURL("/");chrome.tabs.create({url:i+o.url,active:!0},(function(){r(!0)}))}return"extension:getVersion"===n&&W&&W.version&&r(W.version)«,!0}))};chrome.runtime.onInstalled.addListener((function(e){"install"===e.reason&&chrome.tabs.create({active:!0})})),chr…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #2 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `serviceWorker` L1:C87673 -> L1:C87810  `…me.lastError;var N=function(e){chrome.storage.local.get("installChannel",(function(t){t.installChannel||new Promise(e=>{»chrome.cookies.getAll({url:"https://csdn.net"},(function(t){e(t.reduce((e,t)=>("plugin-activity-inviter"===t.name&&(e=t.value),e),""))}))«}).then(t=>{var r={extra:JSON.stringify({installDate:+new Date+"",inviter:t||"",uuid:e})};t&&M(D(D({},r),{},{spm:"1021.2…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (installChannel) — `serviceWorker` L1:C87993 -> L1:C88049  `…"",inviter:t||"",uuid:e})};t&&M(D(D({},r),{},{spm:"1021.2146.3001.6423"})),M(D(D({},r),{},{spm:"1021.2146.3001.6422"})),»chrome.storage.local.set({installChannel:`${e}-${t}`},F)«})}))};function $(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (20 raw steps → 1 distinct lines):
   1. L1 `…el||new Promise(e=>{»chrome.cookies.getAll({url:"https://csdn.net"},(function(t){e(t.reduce((e,t)=>("plugin-activity-inviter"===t.name&&(e=t. …⟨tainted span: 376 chars⟩… 2146.3001.6423"})),M(D(D({},r),{},{spm:"1021.2146.3001.6422"})),chrome.storage.local.set({installChannel:`${e}-${t}`},F)«})}))};function $(e,…`  · ELEMENT:object.setProperty, ELEMENT:array.reduce, ASSIGN:identifier, ASSIGN:logical-left, RETURN:json.stringify, ASSIGN:template-literal

---

## Flow #3 — CHROME_COOKIES_INFO (cookies(https://csdn.net))

- **Source**: `CHROME_COOKIES_INFO` — `serviceWorker` L1:C87735 -> L1:C87806  `…llChannel",(function(t){t.installChannel||new Promise(e=>{chrome.cookies.getAll({url:"https://csdn.net"},(function(t){e(»t.reduce((e,t)=>("plugin-activity-inviter"===t.name&&(e=t.value),e),"")«)}))}).then(t=>{var r={extra:JSON.stringify({installDate:+new Date+"",inviter:t||"",uuid:e})};t&&M(D(D({},r),{},{spm:"10…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (installChannel) — `serviceWorker` L1:C87993 -> L1:C88049  `…"",inviter:t||"",uuid:e})};t&&M(D(D({},r),{},{spm:"1021.2146.3001.6423"})),M(D(D({},r),{},{spm:"1021.2146.3001.6422"})),»chrome.storage.local.set({installChannel:`${e}-${t}`},F)«})}))};function $(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (18 raw steps → 1 distinct lines):
   1. L1 `…et"},(function(t){e(»t.reduce((e,t)=>("plugin-activity-inviter"===t.name&&(e=t.value),e),""))}))}).then(t=>{var r={extra:JSON.stringify({inst …⟨tainted span: 314 chars⟩… 2146.3001.6423"})),M(D(D({},r),{},{spm:"1021.2146.3001.6422"})),chrome.storage.local.set({installChannel:`${e}-${t}`},F)«})}))};function $(e,…`  · ELEMENT:array.reduce, ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:object.setProperty, RETURN:json.stringify, ASSIGN:template-literal

---
