# ExPAgent Dynamic Test — {77691beb-4c53-48de-ab20-6589a537717a} v0.12.1

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `{77691beb-4c53-48de-ab20-6589a537717a}`
- Environment: `{'browserUrl': 'http://127.0.0.1:57433', 'runtimeExtensionId': '{77691beb-4c53-48de-ab20-6589a537717a}', 'beaconBaseUrl': 'http://127.0.0.1:1248', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"type": "eth:send", "data": {"marker": "EXPAGENT_TEST_expa_bdec8fe20d59", "url": "http://127.0.0.1:1248/beacon/expa_4477467beafc", "data": "EXPAGENT_TEST_expa_bdec8fe20d59", "value": "EXPAGENT_TEST_expa_bdec8fe20d59", "message": "EXPAGENT_TEST_expa_bdec8fe20d59", "title": "EXPAGENT_TEST_expa_bdec8fe20d59", "text": "EXPAGENT_TEST_expa_bdec8fe20d59", "number": "EXPAGENT_TEST_expa_bdec8fe20d59", "name": "EXPAGENT_TEST_expa_bdec8fe20d59", "id": "EXPAGENT_TEST_expa_bdec8fe20d59", "key": "EXPAGENT_TEST_expa_bdec8fe20d59", "type": "eth:send", "action": "EXPAGENT_TEST_expa_bdec8fe20d59", "cmd": "EXPAGENT_TEST_expa_bdec8fe20d59", "Action": "EXPAGENT_TEST_expa_bdec8fe20d59", "Message": "EXPAGENT_TEST_expa_bdec8fe20d59", "fun": "EXPAGENT_TEST_expa_bdec8fe20d59", "auth": "EXPAGENT_TEST_expa_bdec8fe20d59", "phone": "EXPAGENT_TEST_expa_bdec8fe20d59", "email": "EXPAGENT_TEST_expa_bdec8fe20d59", "version": "EXPAGENT_TEST_expa_bdec8fe20d59", "token": "EXPAGENT_TEST_expa_bdec8fe20d59", "content": "EXPAGENT_TEST_expa_bdec8fe20d59", "payload": "EXPAGENT_TEST_expa_bdec8fe20d59", "kind": "EXPAGENT_TEST_expa_bdec8fe20d59", "requestId": "EXPAGENT_TEST_expa_bdec8fe20d59", "revision": "EXPAGENT_TEST_expa_bdec8fe20d59"}}, {"type": "eth:send", "data": {"marker": "EXPAGENT_TEST_expa_bdec8fe20d59", "url": "http://127.0.0.1:1248/beacon/expa_4477467beafc", "value": "EXPAGENT_TEST_expa_bdec8fe20d59", "message": "EXPAGENT_TEST_expa_bdec8fe20d59", "type": "eth:send", "payload": "EXPAGENT_TEST_expa_bdec8fe20d59"}}]`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "inject.js", "location": "L18:C10 -> L18:C47", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"type": "eth:send"}, "forwardField": "data", "requirements": {"type": "eth:send"}, "selectors": [], "mediaTags": [], "snippet": "\n  try {\n    chrome.runtime.onMessage.addListener((payload, sender, sendResponse) => {\n      if (payload.type === 'eth:payload') {\n        delete payload.type\n        window.postMessage({type: 'eth:payload', payload: payload}, window.location.origin)\n      }\n      if (payload.type === 'embedded:action') {\n        window.postMessage({type: 'embedded:action', action: payload.action}, window.location.origin)\n      }\n      if (payload.type === 'eth:event') {\n        const { event, args } = payload\n        delete payload.type\n        window.postMessage({ type: 'eth:event', event, args })\n      }\n    })\n    window.addEventListener('message', event => {\n      if (event.source === window && event.data && event.data.type === 'eth:send') chrome.runtime.sendMessage(event.data.payload)\n    })\n    let script = document.createElement('script')\n    script.setAttribute('type', 'text/javascript')\n    scr", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["type", "payload"]}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"tabs.sendMessage\"],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"tabs.sendMessage\":[{\"ts\":1786963570798,\"arg\":{\"redacted\":true,\"length\":1}},{\"ts\":1786963571810,\"arg\":{\"redacted\":true,\"length\":1}},{\"ts\":1786963575826,\"arg\":{\"redacted\":true,\"length\":1}},{\"ts\":1786963579833,\"arg\":{\"redacted\":true,\"length\":1}},{\"ts\":1786963583943,\"arg\":{\"redacted\":true,\"length\":1}},{\"ts\":1786963587945,\"arg\":{\"redacted\":true,\"length\":1}},{\"ts\":1786963589206,\"arg\":{
beacon={"token": "expa_4477467beafc", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:1248/page -> {"openedUrl": "http://127.0.0.1:1248/page", "target": {"id": "4afc58a4-d22d-480f-b544-c177f2330efd", "type": "page", "title": "ExPAgent Sandbox", "url": "http://127.0.0.1:1248/page", "webSocketDebuggerUrl": "ws://127.0.0.1:57433/devtools/pa
2. `set_sink_breakpoint` index L1:C37278 -> L1:C37290 -> {"ok": false, "sourceFile": "index.js", "url": "moz-extension://{77691beb-4c53-48de-ab20-6589a537717a}/index.js", "line": 1, "column": 37278, "targetHint": "background", "breakpointId": "ff-bp-0", "error": "Firefox extension line breakpoints are unavailable in the current RDP-backed bridge: Firefox RDP extension evaluation is available, but 
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:1248/page", "input": {"bytes": 1158, "topLevelKeys": ["data", "type"], "testMarkers": ["EXPAGENT_TEST_expa_bdec8fe20d59"]}, "result": null}
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:1248/page", "input": {"bytes": 274, "topLevelKeys": ["data", "type"], "testMarkers": ["EXPAGENT_TEST_expa_bdec8fe20d59"]}, "result": null}

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:1248/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\{77691beb-4c53-48de-ab20-6589a537717a}\0.12.1\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\{77691beb-4c53-48de-ab20-6589a537717a}\0.12.1\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\{77691beb-4c53-48de-ab20-6589a537717a}\0.12.1\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.


---
