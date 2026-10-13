# ExPAgent Dynamic Test — okkffdhbfplmbjblhgapnchjinanmnij v1.4.1

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `lfhbahfbefnoiokhhnfmghgmnfakjfae`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'lfhbahfbefnoiokhhnfmghgmnfakjfae', 'beaconBaseUrl': 'http://127.0.0.1:61228', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 1 PARTIAL, 2 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #2 — 🟠 PARTIAL  (reproduced=False, confidence 0.60)

**Reasoning:** The exact static sink recorded a call, but the controlled marker/beacon was not observed in its security-relevant argument.

**Payload:** `[{"p": "recorder-screenshot-v3", "cmd": "tobg", "data": {"marker": "EXPAGENT_TEST_expa_a5086c99be93", "url": "http://127.0.0.1:61228/beacon/expa_a9c4ae4224b8", "data": {"url": "http://127.0.0.1:61228/beacon/expa_a9c4ae4224b8"}, "value": "EXPAGENT_TEST_expa_a5086c99be93", "message": "EXPAGENT_TEST_expa_a5086c99be93", "title": "EXPAGENT_TEST_expa_a5086c99be93", "text": "EXPAGENT_TEST_expa_a5086c99be93", "number": "EXPAGENT_TEST_expa_a5086c99be93", "name": "EXPAGENT_TEST_expa_a5086c99be93", "id": "EXPAGENT_TEST_expa_a5086c99be93", "key": "EXPAGENT_TEST_expa_a5086c99be93", "type": "EXPAGENT_TEST_expa_a5086c99be93", "action": "EXPAGENT_TEST_expa_a5086c99be93", "cmd": "get_bg", "Action": "EXPAGENT_TEST_expa_a5086c99be93", "Message": "EXPAGENT_TEST_expa_a5086c99be93", "fun": "update", "auth": "EXPAGENT_TEST_expa_a5086c99be93", "phone": "EXPAGENT_TEST_expa_a5086c99be93", "email": "EXPAGENT_TEST_expa_a5086c99be93", "version": "EXPAGENT_TEST_expa_a5086c99be93", "token": "EXPAGENT_TEST_expa_a5086c99be93", "content": "EXPAGENT_TEST_expa_a5086c99be93", "payload": "EXPAGENT_TEST_expa_a5086c99be93", "kind": "EXPAGENT_TEST_expa_a5086c99be93", "requestId": "EXPAGENT_TEST_expa_a5086c99be93", "revision": "EXPAGENT_TEST_expa_a5086c99be93"}}, {"p": "recorder-screenshot-v3", "cmd": "tobg", "data": {"marker": "EXPAGENT_TEST_expa_a5086c99be93", "url": "http://127.0.0.1:61228/beacon/expa_a9c4ae4224b8", "data": {"url": "http://127.0.0.1:61228/beacon/expa_a9c4ae4224b8"}, "value": "EXPAGENT_TEST_expa_a5086c99be93", "message": "EXPAGENT_TEST_expa_a5086c99be93", "title": "EXPAGENT_TEST_expa_a5086c99be93`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content/ct.js", "location": "L1:C107989 -> L1:C110208", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"p": "recorder-screenshot-v3", "cmd": "tobg"}, "forwardField": "data", "requirements": {"fun": "update"}, "selectors": [], "mediaTags": [], "snippet": "ngth>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t,n){chrome.storage.sync.set(e,(function(){if(chrome.runtime.lastError)return n(chrome.runtime.lastError);t(!0)}))}))}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,l(r.key),r)}}(t,n),Object.defineProperty(t,\"prototype\",{writable:!1}),e}();function f(e,t,n,r,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,o)}var p,d,h,g,y,v,m,x,b,w,T,C,S,k,E,j,D,A,N,L=n(1117),P=n.n(L),R=n(3857),H=n.n(R),O=n(8563),M=function(e){return chrome.i18n.getMessage(e)},_=!1,q={x:0,y:0},I={x:0,y:0},F={x:0,y:0},W=O(document).height(),$=window.innerWidth;function B(e){_=!0,b=O(e.target),q.x=e.pageX,q.y=e.pageY}function z(){_&&(x.css({display:\"block\"}),T.css({display:\"block\"}),V()),_", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `cmd` 及候选值。", "已从 sink 调用推导 URL 承载字段 `data.url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "cmd", "discriminatorValues": ["get_bg", "get_mf", "set_storage", "get_storage", "set_res", "get_res", "l2inited", "htab"], "urlField": "data.url", "sinkTapKey": "windows.update", "messageAlias": "t", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1180, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1180, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
stimulus={"action": "postMessage", "targ

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:61228/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-1 of 1 (Page 1 of 1).\n0: http://127.0.0.1:61228/page [selected]", "id": "lc_3fc7fb2f-cc3b-439f-8c26-1ad27db4d7d3"}]
3. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1180, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
4. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1180, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
5. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1185, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
6. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1185, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
7. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1181, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
8. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1181, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
9. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1182, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
10. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:61228/page", "input": {"bytes": 1178, "topLevelKeys": ["cmd", "data", "p"], "testMarkers": ["EXPAGENT_TEST_expa_a5086c99be93"]}, "result": {"posted": true, "origin": "http://127.0.0.1:61228"}}
11. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\",\"windows.update\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__downloads_download__\":true,\"__storage_local_set__\":true,\

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:61228/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\okkffdhbfplmbjblhgapnchjinanmnij\1.4.1\dynamic-evidence\flow-2\step-source-open.png` — Step `source-open`: http://127.0.0.1:61228/page
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\okkffdhbfplmbjblhgapnchjinanmnij\1.4.1\dynamic-evidence\flow-2\step-after-trigger.png` — Step `after-trigger`: http://127.0.0.1:61228/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\okkffdhbfplmbjblhgapnchjinanmnij\1.4.1\dynamic-evidence\flow-2\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\okkffdhbfplmbjblhgapnchjinanmnij\1.4.1\dynamic-evidence\flow-2\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\okkffdhbfplmbjblhgapnchjinanmnij\1.4.1\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\okkffdhbfplmbjblhgapnchjinanmnij\1.4.1\dynamic-evidence\flow-2\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\okkffdhbfplmbjblhgapnchjinanmnij\1.4.1\dynamic-evidence\flow-2\key-state.png` — Key browser state after replay: http://127.0.0.1:61228/page

**Notes:** sinkTapKey=windows.update

---

## Flow #5 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content/ct.js", "location": "L1:C107989 -> L1:C110208", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"p": "recorder-screenshot-v3", "cmd": "tobg"}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "ngth>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t,n){chrome.storage.sync.set(e,(function(){if(chrome.runtime.lastError)return n(chrome.runtime.lastError);t(!0)}))}))}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,l(r.key),r)}}(t,n),Object.defineProperty(t,\"prototype\",{writable:!1}),e}();function f(e,t,n,r,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,o)}var p,d,h,g,
deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content/ct.js", "location": "L1:C107989 -> L1:C110208", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"p": "recorder-screenshot-v3", "cmd": "tobg"}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "ngth>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t,n){chrome.storage.sync.set(e,(function(){if(chrome.runtime.lastError)return n(chrome.runtime.lastError);t(!0)}))}))}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,l(r.key),r)}}(t,n),Object.defineProperty(t,\"prototype\",{writable:!1}),e}();function f(e,t,n,r,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,o)}var p,d,h,g,

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:61228/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #6 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content/ct.js", "location": "L1:C107989 -> L1:C110208", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"p": "recorder-screenshot-v3", "cmd": "tobg"}, "forwardField": "data", "requirements": {"status": "start"}, "selectors": [], "mediaTags": [], "snippet": "ngth>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t,n){chrome.storage.sync.set(e,(function(){if(chrome.runtime.lastError)return n(chrome.runtime.lastError);t(!0)}))}))}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,l(r.key),r)}}(t,n),Object.defineProperty(t,\"prototype\",{writable:!1}),e}();function f(e,t,n,r,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:61228/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
