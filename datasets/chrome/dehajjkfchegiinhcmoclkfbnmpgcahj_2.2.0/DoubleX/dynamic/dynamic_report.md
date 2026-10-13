# ExPAgent Dynamic Test — dehajjkfchegiinhcmoclkfbnmpgcahj v2.2.0

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `dehajjkfchegiinhcmoclkfbnmpgcahj`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'dehajjkfchegiinhcmoclkfbnmpgcahj', 'beaconBaseUrl': 'http://127.0.0.1:63217', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"type": "relayFromIframeBridge", "data": {"marker": "EXPAGENT_TEST_expa_80a2848c55a3", "url": "http://127.0.0.1:63217/beacon/expa_76bf83723dde", "data": "EXPAGENT_TEST_expa_80a2848c55a3", "value": "EXPAGENT_TEST_expa_80a2848c55a3", "message": "EXPAGENT_TEST_expa_80a2848c55a3", "title": "EXPAGENT_TEST_expa_80a2848c55a3", "text": "EXPAGENT_TEST_expa_80a2848c55a3", "number": "EXPAGENT_TEST_expa_80a2848c55a3", "name": "EXPAGENT_TEST_expa_80a2848c55a3", "id": "EXPAGENT_TEST_expa_80a2848c55a3", "key": "EXPAGENT_TEST_expa_80a2848c55a3", "type": "userType", "action": "EXPAGENT_TEST_expa_80a2848c55a3", "cmd": "EXPAGENT_TEST_expa_80a2848c55a3", "Action": "EXPAGENT_TEST_expa_80a2848c55a3", "Message": "EXPAGENT_TEST_expa_80a2848c55a3", "fun": "EXPAGENT_TEST_expa_80a2848c55a3", "auth": "EXPAGENT_TEST_expa_80a2848c55a3", "phone": "EXPAGENT_TEST_expa_80a2848c55a3", "email": "EXPAGENT_TEST_expa_80a2848c55a3", "version": "EXPAGENT_TEST_expa_80a2848c55a3", "token": "EXPAGENT_TEST_expa_80a2848c55a3", "content": "EXPAGENT_TEST_expa_80a2848c55a3", "payload": "EXPAGENT_TEST_expa_80a2848c55a3", "kind": "EXPAGENT_TEST_expa_80a2848c55a3", "requestId": "EXPAGENT_TEST_expa_80a2848c55a3", "revision": "EXPAGENT_TEST_expa_80a2848c55a3"}}, {"type": "relayFromIframeBridge", "data": {"marker": "EXPAGENT_TEST_expa_80a2848c55a3", "url": "http://127.0.0.1:63217/beacon/expa_76bf83723dde", "value": "EXPAGENT_TEST_expa_80a2848c55a3", "message": "EXPAGENT_TEST_expa_80a2848c55a3", "type": "relayFromIframeBridge"}}]`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "version.js", "location": "L125", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"type": "relayFromIframeBridge"}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "document.body.setAttribute('data-extension-version', '2.2.0');\n\nif (location.pathname == '/v1/toolbar/bridge.php') {\n    window.storagePromise = chrome.storage.local.get().then(storage => {\n        Object.assign(sessionStorage, storage);\n        ['docentID', 'docentURL'].forEach(key => {\n            if (key in storage) {\n                localStorage[key] = storage[key];\n            }\n        });\n        chrome.storage.local.clear();\n    });\n}\n\nfunction setupTutorial(event) {\n    var msg = {\n        type: 'tutorial',\n        page: event.target.href\n    };\n    chrome.runtime.sendMessage(msg);\n};\n\ndocument.querySelectorAll('.tutorial-link').forEach(function(element) {\n    element.addEventListener('click', setupTutorial);\n    element.addEventListener('contextmenu', setupTutorial);\n});\n\nvar GoogleClassroom = Object.assign(window.GoogleClassroom || {}, {\n    scopes: [\n        'profile',\n      ", "notes": ["已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "type", "discriminatorValues": ["userType"], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "request", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["type"]}
sink-breakpoint=armed
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://dehajjkfchegiinhcmoclkfbnmpgcahj/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://dehajjkfchegiinhcmoclkfbnmpgcahj/background.js"}, "frames": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"tabs.sendMessage\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"tabs.sendMessage\":[{\"ts\":1786897519443,\"arg\":{\"redacted\":true,\"length\":9}},{\"ts\":1786897519811,\"arg\":{\"redacted\":true,\"length\":9}},{\"ts\":1786897525544,\"arg\":{\"redacted\":true,\"length\":9}},{\"ts\":1786897526570,\"arg\":{\"redacted\":true,\"length\":9}}]}}"}
beacon={"token": "expa_76bf83723dde", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:63217/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-2 of 2 (Page 1 of 1).\n0: http://127.0.0.1:63217/page\n1: http://127.0.0.1:63217/page [selected]", "id": "lc_3ffc8e94-8e8b-47ed-827f-77efd83aa1b5"}]
2. `set_sink_breakpoint` background.js L239 -> {"ok": true, "sourceFile": "background.js", "url": "chrome-extension://dehajjkfchegiinhcmoclkfbnmpgcahj/background.js", "line": 1, "column": 0, "targetHint": "background", "breakpointId": "1:0:0:chrome-extension://dehajjkfchegiinhcmoclkfbnmpgcahj/background.js", "locations": [{"scriptId": "5", "lineNumber": 0, "columnNumber": 0}]}
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:63217/page", "input": {"bytes": 1172, "topLevelKeys": ["data", "type"], "testMarkers": ["EXPAGENT_TEST_expa_80a2848c55a3"]}, "result": {"posted": true, "origin": "http://127.0.0.1:63217"}}
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:63217/page", "input": {"bytes": 257, "topLevelKeys": ["data", "type"], "testMarkers": ["EXPAGENT_TEST_expa_80a2848c55a3"]}, "result": {"posted": true, "origin": "http://127.0.0.1:63217"}}

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:63217/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\dehajjkfchegiinhcmoclkfbnmpgcahj\2.2.0\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\dehajjkfchegiinhcmoclkfbnmpgcahj\2.2.0\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\dehajjkfchegiinhcmoclkfbnmpgcahj\2.2.0\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\dehajjkfchegiinhcmoclkfbnmpgcahj\2.2.0\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:63217/page


---
