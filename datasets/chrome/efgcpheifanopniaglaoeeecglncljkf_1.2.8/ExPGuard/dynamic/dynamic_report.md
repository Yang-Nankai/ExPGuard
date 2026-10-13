# ExPAgent Dynamic Test — efgcpheifanopniaglaoeeecglncljkf v1.2.8

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `dcofjagjelpenccmaphipgnoeglljdki`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'dcofjagjelpenccmaphipgnoeglljdki', 'beaconBaseUrl': 'http://127.0.0.1:59742', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_3a1c44c399c7", "url": "http://127.0.0.1:59742/beacon/expa_698b6060a5ce", "data": "EXPAGENT_TEST_expa_3a1c44c399c7", "value": "EXPAGENT_TEST_expa_3a1c44c399c7", "message": "EXPAGENT_TEST_expa_3a1c44c399c7", "title": "EXPAGENT_TEST_expa_3a1c44c399c7", "text": "EXPAGENT_TEST_expa_3a1c44c399c7", "number": "EXPAGENT_TEST_expa_3a1c44c399c7", "name": "EXPAGENT_TEST_expa_3a1c44c399c7", "id": "EXPAGENT_TEST_expa_3a1c44c399c7", "key": "EXPAGENT_TEST_expa_3a1c44c399c7", "type": "EXPAGENT_TEST_expa_3a1c44c399c7", "action": "EXPAGENT_TEST_expa_3a1c44c399c7", "cmd": "EXPAGENT_TEST_expa_3a1c44c399c7", "Action": "EXPAGENT_TEST_expa_3a1c44c399c7", "Message": "EXPAGENT_TEST_expa_3a1c44c399c7", "fun": "EXPAGENT_TEST_expa_3a1c44c399c7", "auth": "EXPAGENT_TEST_expa_3a1c44c399c7", "phone": "EXPAGENT_TEST_expa_3a1c44c399c7", "email": "EXPAGENT_TEST_expa_3a1c44c399c7", "version": "EXPAGENT_TEST_expa_3a1c44c399c7", "token": "EXPAGENT_TEST_expa_3a1c44c399c7", "content": "EXPAGENT_TEST_expa_3a1c44c399c7", "payload": {"url": "http://127.0.0.1:59742/beacon/expa_698b6060a5ce"}, "kind": "EXPAGENT_TEST_expa_3a1c44c399c7", "requestId": "EXPAGENT_TEST_expa_3a1c44c399c7", "revision": "EXPAGENT_TEST_expa_3a1c44c399c7", "state": "stop", "size": "EXPAGENT_TEST_expa_3a1c44c399c7", "arrayBuffer": "EXPAGENT_TEST_expa_3a1c44c399c7"}, {"marker": "EXPAGENT_TEST_expa_3a1c44c399c7", "url": "http://127.0.0.1:59742/beacon/expa_698b6060a5ce", "data": "EXPAGENT_TEST_expa_3a1c44c399c7", "value": "EXPAGENT_TEST_expa_3a1c44c399c7", "message": "EXPAGENT_TEST_expa_3a1c44c399c7", "title": "EXPAGEN`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "js/content.js", "location": "L1213:C12 -> L1216:C15", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "         ls = {};\n        }\n        return ls;\n    })();\n    const _LOG_ = localStorageProxy.CPT_LOG || localStorageProxy.cpt_log;\n    const i18n_messages = prepare_i18n_messages();\n    const sendMessageToSW = async msg => sendMessage(MESSAGE_TYPE_TO_SERVICEWORKER, msg, my.frameId);\n    const RUN_ON_ROOT_DOCUMENT_ONLY = window === window.parent;\n    const my = {\n        tabId: -1,\n        frameId: -1,\n        sessionId: -1,\n        url: location.href.match(/[^#]+/)[0],\n        origin: location.host ? location.origin : location.ancestorOrigins[0]\n    };\n    const globals = {\n        uuid: -1,\n        counter: -1,\n        version: \"\",\n        tab: {\n            w: 1280,\n            h: 720,\n            p: -1\n        },\n        domain: {}\n    };\n    const DEFAULT_SETTINGS = '{\"codec\":\"h264\",\"quality\":2,\"video\":true,\"canvas\":true,\"mediasource\":true}';\n    let reason_of_stop = \"\";\n    let work", "notes": ["已从 sink 文件推导消息分发字段 `state` 及候选值。", "已从 sink 调用推导 URL 承载字段 `payload.url`。"], "discriminatorField": "state", "discriminatorValues": ["stop", "inactive"], "urlField": "payload.url", "sinkTapKey": "declarativeNetRequest.updateSessionRules", "messageAlias": "message", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["size", "arrayBuffer"]}
sink-breakpoint=armed
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://dcofjagjelpenccmaphipgnoeglljdki/bg.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://dcofjagjelpenccmaphipgnoeglljdki/bg.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://dcofjagjelpenccmaphipgnoeglljdki/bg.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://dcofjagjelpenccmaphipgnoeglljdki/bg.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://dcofjagjelpenccmaphipgnoeglljdki/bg.js"}, "frames": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"action.setTitle\",\"action.setIcon\",\"fetch\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__downloads_download__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"__declarativeNetRequest_updateSessionRules__\":true,\"__declarativeNetRequest_updateDynamicRules__\":true,\"action.setTitle\":[{\"ts\":1786859693942,\"arg\":{\"redacted\":true,\"length\":11}},{\"ts\":1786859695323,\"arg\":{\"redacted\":true,\"length\":11}},{\"ts\":1786859700745
beacon={"token": "expa_698b6060a5ce", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:59742/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-2 of 2 (Page 1 of 1).\n0: http://127.0.0.1:59742/page\n1: http://127.0.0.1:59742/page [selected]", "id": "lc_eef1c4cb-5a18-4aae-8f8b-e4aeaf9abb35"}]
2. `set_sink_breakpoint` bg L2312:C22 -> L2335:C18 -> {"ok": true, "sourceFile": "bg.js", "url": "chrome-extension://dcofjagjelpenccmaphipgnoeglljdki/bg.js", "line": 2312, "column": 22, "targetHint": "background", "breakpointId": "1:2311:22:chrome-extension://dcofjagjelpenccmaphipgnoeglljdki/bg.js", "locations": [{"scriptId": "5", "lineNumber": 2311, "columnNumber": 58}]}
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:59742/page", "input": {"bytes": 1283, "topLevelKeys": ["Action", "Message", "action", "arrayBuffer", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_3a1c44c399c7"]},
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:59742/page", "input": {"bytes": 1287, "topLevelKeys": ["Action", "Message", "action", "arrayBuffer", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_3a1c44c399c7"]},
5. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:59742/page", "input": {"bytes": 230, "topLevelKeys": ["marker", "payload", "type"], "testMarkers": ["EXPAGENT_TEST_expa_3a1c44c399c7"]}, "result": {"posted": true, "origin": "http://127.0.0.1:59742"}}
6. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:59742/page", "input": {"bytes": 1540, "topLevelKeys": ["Action", "Message", "action", "arrayBuffer", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_3a1c44c399c7"]},
7. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:59742/page", "input": {"bytes": 1548, "topLevelKeys": ["Action", "Message", "action", "arrayBuffer", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_3a1c44c399c7"]},

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:59742/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\efgcpheifanopniaglaoeeecglncljkf\1.2.8\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\efgcpheifanopniaglaoeeecglncljkf\1.2.8\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\efgcpheifanopniaglaoeeecglncljkf\1.2.8\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\efgcpheifanopniaglaoeeecglncljkf\1.2.8\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:59742/page


---
