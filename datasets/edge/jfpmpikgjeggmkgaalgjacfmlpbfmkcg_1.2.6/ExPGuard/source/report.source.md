# Source-level Taint Flow — jfpmpikgjeggmkgaalgjacfmlpbfmkcg 1.2.6

- Source type: CRX
- Files with issues: 6 / 8
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 18 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `src/background` L3:C27550 -> L3:C27656  `…id,{response:server_config,callback_id:e.callback_id})},!1,"GET");else if(e.type===Config.request_bg_types.error_report)»request_server(Config.APIs.report,Object.assign({},e.data,{key:e.key,url:e.url}),e=>{update_config(e)},!1)«;else if(e.type===Config.request_bg_types.open_url)chrome.tabs.create({url:e.url});else if(e.type===Config.request_bg_ty…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `src/background` L3:C23874 -> L3:C24009  `…_version()});let o=`${Config.server_base_path}${e}`;"POST"!==s&&(o=`${o}?${new URLSearchParams(t)}`);const a=function(){»fetch(o,{method:s,headers:{"Content-Type":"application/json"},body:"POST"===s?JSON.stringify(t):void 0,withCredentials:!0,mode:"cors"})«.then(e=>e.json().then(t=>({rsp:t,status:e.status}))).then(t=>{const{status:n,rsp:s}=t;if(console.log(`[FinalScout]: RSP…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (21 raw steps → 1 distinct lines):
   1. L3 `…;const a=function(){»fetch(o,{method:s,headers:{"Content-Type":"application/json"},body:"POST"===s?JSON.stringify(t):void 0,withCredentials:! …⟨tainted span: 3782 chars⟩… .error_report)request_server(Config.APIs.report,Object.assign({},e.data,{key:e.key,url:e.url}),e=>{update_config(e)},!1)«;else if(e.type===Co…`  · ELEMENT:object.setProperty, COPY:object.assign, RETURN:json.stringify

---

## Flow #2 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `src/background` L3:C25801 -> L3:C30051  `…al)},!1,"GET")};e()}»chrome.runtime.onMessage.addListener(function(e,t,i){if(console.log("[FinalScout]:  receive msg ",e.type,e),"finalscout: …⟨tainted span: 4250 chars⟩… inalScout]:  save user setting===>",e.setting),chrome.storage.local.set({user_settings:user_settings})}}else i(Config)})«,chrome.runtime.onMe…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `src/background` L3:C23874 -> L3:C24009  `…_version()});let o=`${Config.server_base_path}${e}`;"POST"!==s&&(o=`${o}?${new URLSearchParams(t)}`);const a=function(){»fetch(o,{method:s,headers:{"Content-Type":"application/json"},body:"POST"===s?JSON.stringify(t):void 0,withCredentials:!0,mode:"cors"})«.then(e=>e.json().then(t=>({rsp:t,status:e.status}))).then(t=>{const{status:n,rsp:s}=t;if(console.log(`[FinalScout]: RSP…`
  - `CHROME_TABS_CREATE_OPTIONS` — `src/background` L3:C23381 -> L3:C23408  `…path}${e}?${serialize_params(Object.assign(t||{},i,{version:get_version()}))}`;console.log("[FinalScout]:  goto -> ",n),»chrome.tabs.create({url:n})«},n);else{const i=`${Config.server_base_path}${e}?${serialize_params(Object.assign(t||{},{version:get_version()}))}`;con…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1990 raw steps → 1 distinct lines):
   1. L3 `…serialize_params(e){»return Object.entries(e).filter(([e,t])=>null!=t&&void 0!==t).map(([e,t])=>`${e}=${encodeURIComponent(t)}`).join("&")}fu …⟨tainted span: 7010 chars⟩… inalScout]:  save user setting===>",e.setting),chrome.storage.local.set({user_settings:user_settings})}}else i(Config)})«,chrome.runtime.onMe…`  · MESSAGE, ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left, ELEMENT:object.setProperty, COPY:object.assign-opaque, COPY:object.assign, RETURN:json.stringify, ELEMENT:implicit.add, RETURN:array.join, ASSIGN:template-literal, ASSIGN:identifier, ELEMENT:member-element
      ⇄ cross-context hop: `runtime.single.sender.message[src/inject->src/background]`

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `src/background` L3:C25801 -> L3:C30051  `…al)},!1,"GET")};e()}»chrome.runtime.onMessage.addListener(function(e,t,i){if(console.log("[FinalScout]:  receive msg ",e.type,e),"finalscout: …⟨tainted span: 4250 chars⟩… inalScout]:  save user setting===>",e.setting),chrome.storage.local.set({user_settings:user_settings})}}else i(Config)})«,chrome.runtime.onMe…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `src/background` L3:C23381 -> L3:C23408  `…path}${e}?${serialize_params(Object.assign(t||{},i,{version:get_version()}))}`;console.log("[FinalScout]:  goto -> ",n),»chrome.tabs.create({url:n})«},n);else{const i=`${Config.server_base_path}${e}?${serialize_params(Object.assign(t||{},{version:get_version()}))}`;con…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (453 raw steps → 1 distinct lines):
   1. L3 `…serialize_params(e){»return Object.entries(e).filter(([e,t])=>null!=t&&void 0!==t).map(([e,t])=>`${e}=${encodeURIComponent(t)}`).join("&")}fu …⟨tainted span: 7010 chars⟩… inalScout]:  save user setting===>",e.setting),chrome.storage.local.set({user_settings:user_settings})}}else i(Config)})«,chrome.runtime.onMe…`  · MESSAGE, ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left, ELEMENT:object.setProperty, ELEMENT:member-element, ELEMENT:implicit.add, RETURN:array.join, ASSIGN:template-literal, ASSIGN:identifier
      ⇄ cross-context hop: `runtime.single.sender.message[src/inject->src/background]`

---
