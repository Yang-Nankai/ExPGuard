# ExPAgent Dynamic Test — nhbghfidknjdblpfcmkkdpcfigkkpgpi v0.2.143

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `nhbghfidknjdblpfcmkkdpcfigkkpgpi`
- Environment: `{'browserUrl': 'http://127.0.0.1:61137', 'runtimeExtensionId': 'nhbghfidknjdblpfcmkkdpcfigkkpgpi', 'beaconBaseUrl': 'http://127.0.0.1:61136', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED, 1 EXTERNAL_CONDITION_REQUIRED, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 60s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "DOM_MEDIA", "sourcePath": "libs/pixell-components.js", "location": "", "eventNames": [], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": ["object"], "snippet": "/*! For license information please see pixell-components.js.LICENSE.txt */\n(()=>{var e,t,a,n,i,l,o,r,d,s,c,u,f,p,E,I,y,T,m=Object.create,g=Object.defineProperty,b=Object.getOwnPropertyDescriptor,v=Object.getOwnPropertyNames,O=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty,h=(e,t)=>()=>(e&&(t=e(e=0)),t),L=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),A=(e,t)=>{for(var a in t)g(e,a,{get:t[a],enumerable:!0})},N=(e,t,a,n)=>{if(t&&\"object\"==typeof t||\"function\"==typeof t)for(let i of v(t))!_.call(e,i)&&i!==a&&g(e,i,{get:()=>t[i],enumerable:!(n=b(t,i))||n.enumerable});return e},S=(e,t,a)=>(a=

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:61136/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #2 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_3a0701218070", "url": "http://127.0.0.1:61136/beacon/expa_ab115771d775", "data": "EXPAGENT_TEST_expa_3a0701218070", "value": "EXPAGENT_TEST_expa_3a0701218070", "message": "EXPAGENT_TEST_expa_3a0701218070", "title": "EXPAGENT_TEST_expa_3a0701218070", "text": "EXPAGENT_TEST_expa_3a0701218070", "number": "EXPAGENT_TEST_expa_3a0701218070", "name": "EXPAGENT_TEST_expa_3a0701218070", "id": "EXPAGENT_TEST_expa_3a0701218070", "key": "EXPAGENT_TEST_expa_3a0701218070", "type": "EXPAGENT_TEST_expa_3a0701218070", "action": "EXPAGENT_TEST_expa_3a0701218070", "cmd": "EXPAGENT_TEST_expa_3a0701218070", "Action": "EXPAGENT_TEST_expa_3a0701218070", "Message": "EXPAGENT_TEST_expa_3a0701218070", "fun": "EXPAGENT_TEST_expa_3a0701218070", "auth": "EXPAGENT_TEST_expa_3a0701218070", "phone": "EXPAGENT_TEST_expa_3a0701218070", "email": "EXPAGENT_TEST_expa_3a0701218070", "version": "EXPAGENT_TEST_expa_3a0701218070", "token": "EXPAGENT_TEST_expa_3a0701218070", "content": "EXPAGENT_TEST_expa_3a0701218070", "payload": "EXPAGENT_TEST_expa_3a0701218070", "kind": "EXPAGENT_TEST_expa_3a0701218070", "requestId": "EXPAGENT_TEST_expa_3a0701218070", "revision": "EXPAGENT_TEST_expa_3a0701218070"}, {"marker": "EXPAGENT_TEST_expa_3a0701218070", "url": "http://127.0.0.1:61136/beacon/expa_ab115771d775", "data": {"marker": "EXPAGENT_TEST_expa_3a0701218070", "url": "http://127.0.0.1:61136/beacon/expa_ab115771d775", "value": "EXPAGENT_TEST_expa_3a0701218070", "message": "EXPAGENT_TEST_expa_3a0701218070"}, "value": "EXPAGENT_TEST_expa_3a0701218070", "message": "EXPAGENT_TEST_expa_3a07012`

**Runtime evidence:** source-contract={"surface": "DOM_MEDIA", "sourcePath": "libs/pixell-components.js", "location": "", "eventNames": [], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": ["object"], "snippet": "/*! For license information please see pixell-components.js.LICENSE.txt */\n(()=>{var e,t,a,n,i,l,o,r,d,s,c,u,f,p,E,I,y,T,m=Object.create,g=Object.defineProperty,b=Object.getOwnPropertyDescriptor,v=Object.getOwnPropertyNames,O=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty,h=(e,t)=>()=>(e&&(t=e(e=0)),t),L=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),A=(e,t)=>{for(var a in t)g(e,a,{get:t[a],enumerable:!0})},N=(e,t,a,n)=>{if(t&&\"object\"==typeof t||\"function\"==typeof t)for(let i of v(t))!_.call(e,i)&&i!==a&&g(e,i,{get:()=>t[i],enumerable:!(n=b(t,i))||n.enumerable});return e},S=(e,t,a)=>(a=null!=e?m(O(e)):{},N(!t&&e&&e.__esModule?a:g(a,\"default\",{value:e,enumerable:!0}),e)),R=e=>N(g({},\"__esModule\",{value:!0}),e),C=L(()=>{\"use strict\";!function(){if(typeof window>\"u\")return;let e=window.navigator.userAgent.match(/Edge\\/(\\d{2})\\./),t=!!e&&parseInt(e[1],10)>=16;if(\"objectFit", "notes": ["已从 sink 调用推导 URL 承载字段 `url`。", "已识别媒体 DOM 触发源。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"action.setIcon\",\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"action.setIcon\":[{\"ts\":1786848141309,\"arg\":{\"redacted\":true,\"length\":65}},{\"ts\":1786848141314,\"arg\":{\"redacted\":true,\"length\":65}},{\"ts\":1786848141314,\"arg\":{\"redacted\":true,\"length\":65}},{\"ts\":1786848141341,\"arg\":{\"redacted\":true,\"length\":65}},{\"ts\":1786848141356,\"arg\":{\"redacted\":true,
beacon={"token": "expa_ab115771d775", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:61136/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: http://127.0.0.1:61136/page\n1: chrome-error://chromewebdata/\n2: http://127.0.0.1:61136/page [selected]", "id": "lc_29a0df6f-b6a0-4d2b-babf-8fbd7
2. `set_sink_breakpoint`   -> {"ok": false, "error": {"code": -32000, "message": "Breakpoint at specified location already exists."}}
3. `sink_contract_stimulus` DOM_MEDIA -> {"action": "injectMedia", "targetUrl": "http://127.0.0.1:61136/page", "tag": "object", "src": "http://127.0.0.1:61136/beacon/expa_ab115771d775.swf", "result": {"injected": true, "tag": "OBJECT"}}
4. `sink_contract_stimulus` DOM_MEDIA -> {"action": "injectMedia", "targetUrl": "http://127.0.0.1:61136/page", "tag": "object", "src": "http://127.0.0.1:61136/beacon/expa_ab115771d775.swf", "result": {"injected": true, "tag": "OBJECT"}}

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:61136/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\nhbghfidknjdblpfcmkkdpcfigkkpgpi\0.2.143\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\nhbghfidknjdblpfcmkkdpcfigkkpgpi\0.2.143\dynamic-evidence\flow-2\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\nhbghfidknjdblpfcmkkdpcfigkkpgpi\0.2.143\dynamic-evidence\flow-2\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\nhbghfidknjdblpfcmkkdpcfigkkpgpi\0.2.143\dynamic-evidence\flow-2\key-state.png` — Key browser state after replay: http://127.0.0.1:61136/page


---

## Flow #1 — EXTERNAL CONDITION REQUIRED  (reproduced=False, confidence 0.90)

**Reasoning:** 源是 chrome.runtime.onMessageExternal / onConnectExternal（来自 externally_connectable 声明的外部网站/扩展消息）；需要匹配的受控发送方页面/扩展，属于外部消息发送方前置条件。

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:61136/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\nhbghfidknjdblpfcmkkdpcfigkkpgpi\0.2.143\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\nhbghfidknjdblpfcmkkdpcfigkkpgpi\0.2.143\dynamic-evidence\flow-1\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\nhbghfidknjdblpfcmkkdpcfigkkpgpi\0.2.143\dynamic-evidence\flow-1\key-state.png` — Key browser state after replay: http://127.0.0.1:61136/page


---
