# Source-level Taint Flow — bjkibipmicfkjnjmjpifhdbkcdjinncp 6.6.0

- Source type: CRX
- Files with issues: 6 / 6
- Distinct taint flows: 5  (collapsed from 9 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(updateDataExtensionPopup))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L1:C6120 -> L1:C6480  `…up.newValue&&c()})),»chrome.runtime.onMessage.addListener((function(e,t,o){return"https://plus-max-speed.wip"!==t.origin&&"https://plus-max-s …⟨tainted span: 360 chars⟩… e.data.payment&&chrome.storage.local.set({date_to_payment_check:e.data.date})})),"openPopup"===e.data.action&&c()),!1}))«,a(e),chrome.webRequ…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (debugInfo) — `background` L1:C6292 -> L1:C6336  `…){return"https://plus-max-speed.wip"!==t.origin&&"https://plus-max-speed.ru"!==t.origin||("updateData"===e.data.action&&»chrome.storage.local.set({debugInfo:e.data})«.then((t=>{"creating"===e.data.payment&&chrome.storage.local.set({date_to_payment_check:e.data.date})})),"openPopup"===e…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (9 raw steps → 1 distinct lines):
   1. L1 `…up.newValue&&c()})),»chrome.runtime.onMessage.addListener((function(e,t,o){return"https://plus-max-speed.wip"!==t.origin&&"https://plus-max-s …⟨tainted span: 360 chars⟩… e.data.payment&&chrome.storage.local.set({date_to_payment_check:e.data.date})})),"openPopup"===e.data.action&&c()),!1}))«,a(e),chrome.webRequ…`  · MESSAGE, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right
      ⇄ cross-context hop: `runtime.single.sender.message[assets/content->background]`

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(openExtensionPopup))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L1:C6120 -> L1:C6480  `…up.newValue&&c()})),»chrome.runtime.onMessage.addListener((function(e,t,o){return"https://plus-max-speed.wip"!==t.origin&&"https://plus-max-s …⟨tainted span: 360 chars⟩… e.data.payment&&chrome.storage.local.set({date_to_payment_check:e.data.date})})),"openPopup"===e.data.action&&c()),!1}))«,a(e),chrome.webRequ…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (debugInfo) — `background` L1:C6292 -> L1:C6336  `…){return"https://plus-max-speed.wip"!==t.origin&&"https://plus-max-speed.ru"!==t.origin||("updateData"===e.data.action&&»chrome.storage.local.set({debugInfo:e.data})«.then((t=>{"creating"===e.data.payment&&chrome.storage.local.set({date_to_payment_check:e.data.date})})),"openPopup"===e…`
  - `CHROME_LOCAL_STORAGE` (date_to_payment_check) — `background` L1:C6376 -> L1:C6437  `…gin||("updateData"===e.data.action&&chrome.storage.local.set({debugInfo:e.data}).then((t=>{"creating"===e.data.payment&&»chrome.storage.local.set({date_to_payment_check:e.data.date})«})),"openPopup"===e.data.action&&c()),!1})),a(e),chrome.webRequest.onBeforeRedirect.addListener((t=>{chrome.storage.loca…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (13 raw steps → 1 distinct lines):
   1. L1 `…up.newValue&&c()})),»chrome.runtime.onMessage.addListener((function(e,t,o){return"https://plus-max-speed.wip"!==t.origin&&"https://plus-max-s …⟨tainted span: 360 chars⟩… e.data.payment&&chrome.storage.local.set({date_to_payment_check:e.data.date})})),"openPopup"===e.data.action&&c()),!1}))«,a(e),chrome.webRequ…`  · MESSAGE, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right
      ⇄ cross-context hop: `runtime.single.sender.message[assets/content->background]`

---

## Flow #3 — ELEMENT_VALUE (From storage.local.set('accessCode') in popup)  ·  2× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L1:C3501 -> L1:C3513  `…"194.87.118.140",o="52302",n={conn_time:"2024-12-02T17:54:26",status:"success",status_description:"Выдан запасной сервер», обратитесь« в службу поддержки!",access:"free",host:t,port:o,host_type:"bel"};!1!==e?(t=e.host,o=e.port):(l("Сервер не отвечает"),c…`
- **Sink(s)**:
  - `FETCH_BODY` (https://vpnquick.ru/api/v2/get-proxy) — `background` L1:C4566 -> L1:C4694  `…"accessCode","stateConnected"],(e=>{let t={code_access:e.accessCode||"unknown",device_id:"unknown",device_ip:"unknown"};»fetch("https://vpnquick.ru/api/v2/get-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})«.then((e=>200===e.status&&e.json())).then((e=>{i(e)})).catch((o=>{l("Error vpnquick: "+o),fetch("https://e-vsp.ru/api/v2…`
  - `FETCH_BODY` (https://e-vsp.ru/api/v2/get-proxy) — `background` L1:C4784 -> L1:C4909  `…son"},body:JSON.stringify(t)}).then((e=>200===e.status&&e.json())).then((e=>{i(e)})).catch((o=>{l("Error vpnquick: "+o),»fetch("https://e-vsp.ru/api/v2/get-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})«.then((e=>200===e.status&&e.json())).then((e=>{i(e)})).catch((t=>{l("Error e-vsp: "+t);let o="194.87.118.140",n="52302",…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (26 raw steps → 1 distinct lines):
   1. L1 `…ыдан запасной сервер», обратитесь в службу поддержки!",access:"free",host:t,port:o,host_type:"bel"};!1!==e?(t=e.host,o=e.port):(l("Сервер не  …⟨tainted span: 2258 chars⟩… о подключитесь заново. Если ошибка не уходит возможно потребуется перезагрузка ПК."}).then((()=>{c()}))),u(o,n)}))}))}))«}),1500);e===t&&(chr…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: accessCode, sender: popup, receiver: background], RETURN:json.stringify

---

## Flow #4 — ELEMENT_VALUE (textCodeSend)

- **Source**: `ELEMENT_VALUE` — `popup` L1:C3501 -> L1:C3513  `…ocument.getElementById("buttonCodeSend").addEventListener("click",(()=>{let e=document.getElementById("textCodeSend"),c=»e.value.trim«();if(""===c||c.length<20||c.length>40)return o("Неверный код"),!0;chrome.storage.local.set({accessCode:c}).then((()=>{e…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (accessCode) — `popup` L1:C3580 -> L1:C3620  `…ocument.getElementById("textCodeSend"),c=e.value.trim();if(""===c||c.length<20||c.length>40)return o("Неверный код"),!0;»chrome.storage.local.set({accessCode:c})«.then((()=>{e.value="",chrome.storage.local.set({currentState:t}).then((()=>{setTimeout((function(){chrome.storage.local…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (19 raw steps → 1 distinct lines):
   1. L1 `…d("textCodeSend"),c=»e.value.trim();if(""===c||c.length<20||c.length>40)return o("Неверный код"),!0;chrome.storage.local.set({accessCode:c}). …⟨tainted span: 274 chars⟩… ge.local.set({currentState:t}).then((()=>{setTimeout((function(){chrome.storage.local.set({currentState:n})}),1e3)}))}))«})),document.getElem…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty

---

## Flow #5 — TARGET_CUSTOM_EVENT (From storage.local.set('debugInfo') in background)  ·  4× duplicate paths collapsed

- **Source**: `TARGET_CUSTOM_EVENT` — `popup` L1:C6120 -> L1:C6480  `…ajax",{method:"POST"»,headers:{"Content-Type":"application/json"},body:JSON.stringify({method:"checkPayment",uuid:e.debugInfo.uuid})}).then(( …⟨tainted span: 360 chars⟩… e.local.set({accessCode:e.code_access}).then((()=>{chrome.storage.local.set({currentState:t}).then((e=>{setTimeout((func«tion(){chrome.storag…`
- **Sink(s)**:
  - `FETCH_BODY` (https://plus-max-speed.ru/ajax) — `popup` L1:C6067 -> L1:C6233  `…fo&&void 0!==e.debugInfo.uuid&&void 0!==e.date_to_payment_check){if((new Date).getTime()>e.date_to_payment_check)return;»fetch("https://plus-max-speed.ru/ajax",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({method:"checkPayment",uuid:e.debugInfo.uuid})})«.then((e=>e.json())).then((e=>{"success"===e.status&&"succeeded"===e.payment_status&&"active"===e.premium_status&&chrome…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (19 raw steps → 1 distinct lines):
   1. L1 `…r("click",(()=>{let »e={},t=chrome.runtime.getManifest();e.version=t.version,e.userAgent=navigator.userAgent,chrome.storage.local.get(["acces …⟨tainted span: 1364 chars⟩… e.local.set({accessCode:e.code_access}).then((()=>{chrome.storage.local.set({currentState:t}).then((e=>{setTimeout((func«tion(){chrome.storag…`  · MESSAGE, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right, STORAGE:STORAGE_FLOW[area: local, key: debugInfo, sender: background, receiver: popup], RETURN:json.stringify, RETURN:encodeURIComponent, RETURN:btoa, ASSIGN:identifier
      ⇄ cross-context hop: `runtime.single.sender.message[assets/content->background]`

---
