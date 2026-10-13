# Source-level Taint Flow — nnkbmmkimbjddlcjhakcjcjjmcgghpmp 2.0.17

- Source type: CRX
- Files with issues: 2 / 6
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/service-worker.js-B6n9e7uU` L1:C3146 -> L1:C3153  `…ddListener(function(request,sender,sendResponse){return"setToken"===request.action?(chrome.storage.local.set({app_token:»request«.token},function(){chrome.runtime.sendMessage({type:"LOGIN_CHANGED"}),sendResponse({status:"success",message:"扩展已成功接收并处理…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (app_token) — `assets/service-worker.js-B6n9e7uU` L1:C3110 -> L1:C3278  `…),chrome.runtime.onMessageExternal.addListener(function(request,sender,sendResponse){return"setToken"===request.action?(»chrome.storage.local.set({app_token:request.token},function(){chrome.runtime.sendMessage({type:"LOGIN_CHANGED"}),sendResponse({status:"success",message:"扩展已成功接收并处理"})})«,!0):"webGetToken"===request.action?(chrome.storage.local.get("app_token",result=>{result.app_token,sendResponse({status…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L1 `…ender,sendResponse){»return"setToken"===request.action?(chrome.storage.local.set({app_token:request.token},function(){chrome.runtime.sendMess …⟨tainted span: 527 chars⟩… n?(chrome.storage.local.remove("app_token",function(){sendResponse({status:"success",message:"扩展已移除Token"})}),!0):void 0«});`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('app_token') in assets/service-worker.js-B6n9e7uU)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/service-worker.js-B6n9e7uU` L1:C3146 -> L1:C3153  `…ddListener(function(request,sender,sendResponse){return"setToken"===request.action?(chrome.storage.local.set({app_token:»request«.token},function(){chrome.runtime.sendMessage({type:"LOGIN_CHANGED"}),sendResponse({status:"success",message:"扩展已成功接收并处理…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `assets/service-worker.js-B6n9e7uU` L1:C3378 -> L1:C3446  `…age:"扩展已成功接收并处理"})}),!0):"webGetToken"===request.action?(chrome.storage.local.get("app_token",result=>{result.app_token,»sendResponse({status:"success",message:"ok",token:result.app_token})«}),!0):"removeToken"===request.action?(chrome.storage.local.remove("app_token",function(){sendResponse({status:"success"…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (5 raw steps → 1 distinct lines):
   1. L1 `…ender,sendResponse){»return"setToken"===request.action?(chrome.storage.local.set({app_token:request.token},function(){chrome.runtime.sendMess …⟨tainted span: 527 chars⟩… n?(chrome.storage.local.remove("app_token",function(){sendResponse({status:"success",message:"扩展已移除Token"})}),!0):void 0«});`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: app_token, sender: assets/service-worker.js-B6n9e7uU, receiver: assets/service-worker.js-B6n9e7uU]

---
