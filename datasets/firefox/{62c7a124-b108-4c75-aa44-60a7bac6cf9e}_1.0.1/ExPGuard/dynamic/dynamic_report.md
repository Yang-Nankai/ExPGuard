# ExPAgent Dynamic Test — {62c7a124-b108-4c75-aa44-60a7bac6cf9e} v1.0.1

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `{62c7a124-b108-4c75-aa44-60a7bac6cf9e}`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': '{62c7a124-b108-4c75-aa44-60a7bac6cf9e}', 'beaconBaseUrl': 'http://127.0.0.1:64743', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_6cce8412e9c5", "url": "http://127.0.0.1:64743/beacon/expa_46e7c813472b", "data": {"url": "http://127.0.0.1:64743/beacon/expa_46e7c813472b"}, "value": "EXPAGENT_TEST_expa_6cce8412e9c5", "message": "EXPAGENT_TEST_expa_6cce8412e9c5", "title": "EXPAGENT_TEST_expa_6cce8412e9c5", "text": "EXPAGENT_TEST_expa_6cce8412e9c5", "number": "EXPAGENT_TEST_expa_6cce8412e9c5", "name": "EXPAGENT_TEST_expa_6cce8412e9c5", "id": "EXPAGENT_TEST_expa_6cce8412e9c5", "key": "EXPAGENT_TEST_expa_6cce8412e9c5", "type": "EXPAGENT_TEST_expa_6cce8412e9c5", "action": "joinUserInRoom", "cmd": "EXPAGENT_TEST_expa_6cce8412e9c5", "Action": "EXPAGENT_TEST_expa_6cce8412e9c5", "Message": "EXPAGENT_TEST_expa_6cce8412e9c5", "fun": "EXPAGENT_TEST_expa_6cce8412e9c5", "auth": "EXPAGENT_TEST_expa_6cce8412e9c5", "phone": "EXPAGENT_TEST_expa_6cce8412e9c5", "email": "EXPAGENT_TEST_expa_6cce8412e9c5", "version": "EXPAGENT_TEST_expa_6cce8412e9c5", "token": "EXPAGENT_TEST_expa_6cce8412e9c5", "content": "EXPAGENT_TEST_expa_6cce8412e9c5", "payload": "EXPAGENT_TEST_expa_6cce8412e9c5", "kind": "EXPAGENT_TEST_expa_6cce8412e9c5", "requestId": "EXPAGENT_TEST_expa_6cce8412e9c5", "revision": "EXPAGENT_TEST_expa_6cce8412e9c5"}, {"marker": "EXPAGENT_TEST_expa_6cce8412e9c5", "url": "http://127.0.0.1:64743/beacon/expa_46e7c813472b", "data": {"marker": "EXPAGENT_TEST_expa_6cce8412e9c5", "url": "http://127.0.0.1:64743/beacon/expa_46e7c813472b", "value": "EXPAGENT_TEST_expa_6cce8412e9c5", "message": "EXPAGENT_TEST_expa_6cce8412e9c5", "action": "joinUserInRoom"}, "value": "EXPAGENT_TEST_expa_6cce8412e9c5", "m`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "content/index.js", "location": "L1:C1568 -> L1:C7970", "eventNames": ["mouseout", "mouseover", "pause", "play", "mouseup", "pointerup"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "(()=>{\"use strict\";function e(e,n){for(var r,a=0;a<n.length&&!(r=t(e,n[a].parent,n[a].attribute));a++);return r}function t(e,t,n){switch(t){case 0:return e.target.getAttribute(n);case 1:return e.target.parentElement.getAttribute(n);case 2:return e.target.parentElement.parentElement.getAttribute(n);case 3:return e.target.parentElement.parentElement.parentElement.getAttribute(n);case 4:return e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(n);case 5:return e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(n)}}function n(e,t,n){var r=e.currentTime,a=setInterval((function(){Math.floor(e.currentTime)!==Math.floor(r)&&(t.contentWindow.postMessage({action:\"seekFromBrowser\",time:e.currentTime},n),clearInterval(a))}),1e3)}var r,a,o,i,c,s=\"chrome-extension://\"+chrome.runtime.id,d=!1,u=(window.location.origin,[{host:\"www.netfli", "notes": ["已从 sink 文件推导消息分发字段 `action` 及候选值。", "已从 sink 调用推导 URL 承载字段 `data.url`。", "已提取页面可达事件名。"], "discriminatorField": "action", "discriminatorValues": ["joinUserInRoom"], "urlField": "data.url", "sinkTapKey": "tabs.create", "messageAlias": "e", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"fetch\"],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"fetch\":[{\"ts\":1786963105912,\"request\":{\"redacted\":true,\"length\":43},\"method\":\"POST\",\"body\":{\"redacted\":true,\"length\":110}},{\"ts\":1786963105912,\"request\":{\"redacted\":true,\"length\":43},\"method\":\"POST\",\"body\":{\"redacted\":true,\"length\":110}},{\"ts\":1786963113967,\"request\":{\"redacted\":true,\"length\":43},\"method\":
beacon={"token": "expa_46e7c813472b", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:64743/page -> {"openedUrl": "http://127.0.0.1:64743/page", "target": {"id": "0f4dcf2a-19ba-4742-8843-51f38eb44a2d", "type": "page", "title": "ExPAgent Sandbox", "url": "http://127.0.0.1:64743/page", "webSocketDebuggerUrl": "ws://127.0.0.1:9222/devtools/p
2. `set_sink_breakpoint` background L1:C2516 -> L1:C2726 -> {"ok": false, "sourceFile": "background.js", "url": "moz-extension://{62c7a124-b108-4c75-aa44-60a7bac6cf9e}/background.js", "line": 1, "column": 2516, "targetHint": "background", "breakpointId": "ff-bp-0", "error": "Firefox extension line breakpoints are unavailable in the current RDP-backed bridge: Firefox RDP extension evaluation is ava
3. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:64743/page", "event": "mouseout", "input": {"bytes": 1162, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_exp
4. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:64743/page", "event": "mouseout", "input": {"bytes": 1317, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_exp

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:64743/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\{62c7a124-b108-4c75-aa44-60a7bac6cf9e}\1.0.1\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\{62c7a124-b108-4c75-aa44-60a7bac6cf9e}\1.0.1\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\{62c7a124-b108-4c75-aa44-60a7bac6cf9e}\1.0.1\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.


---
