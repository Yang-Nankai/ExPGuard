# ExPAgent Dynamic Test — kdnnmhpmcakdilnofmllgcigkibjonof v1.7.41

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `kdnnmhpmcakdilnofmllgcigkibjonof`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'kdnnmhpmcakdilnofmllgcigkibjonof', 'beaconBaseUrl': 'http://127.0.0.1:55499', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_1315b22e48fa", "url": "http://127.0.0.1:55499/beacon/expa_2d18824cbdb1", "data": "EXPAGENT_TEST_expa_1315b22e48fa", "value": "EXPAGENT_TEST_expa_1315b22e48fa", "message": "EXPAGENT_TEST_expa_1315b22e48fa", "title": "EXPAGENT_TEST_expa_1315b22e48fa", "text": "EXPAGENT_TEST_expa_1315b22e48fa", "number": "EXPAGENT_TEST_expa_1315b22e48fa", "name": "EXPAGENT_TEST_expa_1315b22e48fa", "id": "EXPAGENT_TEST_expa_1315b22e48fa", "key": "EXPAGENT_TEST_expa_1315b22e48fa", "type": "EXPAGENT_TEST_expa_1315b22e48fa", "action": "EXPAGENT_TEST_expa_1315b22e48fa", "cmd": "EXPAGENT_TEST_expa_1315b22e48fa", "Action": "EXPAGENT_TEST_expa_1315b22e48fa", "Message": "EXPAGENT_TEST_expa_1315b22e48fa", "fun": "EXPAGENT_TEST_expa_1315b22e48fa", "auth": "EXPAGENT_TEST_expa_1315b22e48fa", "phone": "EXPAGENT_TEST_expa_1315b22e48fa", "email": "EXPAGENT_TEST_expa_1315b22e48fa", "version": "EXPAGENT_TEST_expa_1315b22e48fa", "token": "EXPAGENT_TEST_expa_1315b22e48fa", "content": "EXPAGENT_TEST_expa_1315b22e48fa", "payload": "EXPAGENT_TEST_expa_1315b22e48fa", "kind": "EXPAGENT_TEST_expa_1315b22e48fa", "requestId": "EXPAGENT_TEST_expa_1315b22e48fa", "revision": "EXPAGENT_TEST_expa_1315b22e48fa", "hasOwnProperty": "EXPAGENT_TEST_expa_1315b22e48fa", "order": "EXPAGENT_TEST_expa_1315b22e48fa", "lockers": "EXPAGENT_TEST_expa_1315b22e48fa", "attributes": "EXPAGENT_TEST_expa_1315b22e48fa"}, {"marker": "EXPAGENT_TEST_expa_1315b22e48fa", "url": "http://127.0.0.1:55499/beacon/expa_2d18824cbdb1", "data": {"marker": "EXPAGENT_TEST_expa_1315b22e48fa", "url": "http://127.0.0.1:55499/beacon/e`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "content.js", "location": "L168:C5 -> L168:C13", "eventNames": ["paddle", "scroll", "mouseover", "sra_event", "securitypolicyviolation", "paste", "copy"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": " end function get_from_storage()\n\n\nfunction save_to_storage(obj)\n{\t\t\n\t// Save to chrome.storage\n\tchrome.storage.local.set(obj, function() \n\t{\n\t  \tstill_saving = false;\n\t\tif (test_mode) console.log(\"Saved to local storage: \"+JSON.stringify(obj));\n\t  \t\n\t\tif(chrome.runtime.lastError)\n\t    {\n\t        console.log(chrome.runtime.lastError.message);\n\t        return;\n\t    } \n\t});\n\t\n\tif (sra.settings.allow_in_windows && obj.hasOwnProperty(\"settings\")) \n\t\tsend_to_windows(obj); // Version 1.7.15 - Send changed \"settings\" to speech.exe\n\t\n} // end function save_to_storage(option_obj)\n\n\nfunction save_to_sync(obj)\n{\t\t\n\t// Save to chrome.storage\n\tchrome.storage.sync.set(obj, function() \n\t{\n\t  \tstill_saving = false;\n\t\tif (test_mode) console.log(\"Saved to sync storage: \"+JSON.stringify(obj));\n\t  \t\n\t\tif(chrome.runtime.lastError)\n\t    {\n\t        console.log(chrome.runtime.lastError.message);\n\t        return", "notes": ["已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["hasOwnProperty", "order", "lockers", "attributes", "id"]}
sink-breakpoint=armed
sink-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "http://127.0.0.1:55499/page"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "http://127.0.0.1:55499/page"}, "frames": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"action.setBadgeText\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"__declarativeNetRequest_updateSessionRules__\":true,\"__declarativeNetRequest_updateDynamicRules__\":true,\"action.setBadgeText\":[{\"ts\":1786899969263,\"arg\":{\"redacted\":true,\"length\":0}},{\"ts\":1786899969263,\"arg\":{\"redacted\":true,\"length\":0}},{\"ts\":1786899969280,\"arg\":{\"redacted\":true,\"length\":0}},{\"ts\":1786899970593,\"arg\":{\"r
beacon={"token": "expa_2d18824cbdb1", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:55499/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-2 of 2 (Page 1 of 1).\n0: http://127.0.0.1:55499/page\n1: http://127.0.0.1:55499/page [selected]", "id": "lc_3cd84536-811f-4e18-8b6d-f00f14fa5a50"}]
2. `set_sink_breakpoint` storage L186:C4 -> L195:C6 -> {"ok": true, "sourceFile": "storage.js", "url": "chrome-extension://kdnnmhpmcakdilnofmllgcigkibjonof/storage.js", "line": 186, "column": 4, "targetHint": "content", "breakpointId": "1:185:4:chrome-extension://kdnnmhpmcakdilnofmllgcigkibjonof/storage.js", "locations": [{"scriptId": "6", "lineNumber": 185, "columnNumber": 4}]}
3. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:55499/page", "event": "paddle", "input": {"bytes": 1339, "topLevelKeys": ["Action", "Message", "action", "attributes", "auth", "cmd", "content", "data", "email", "fun", "hasOwnProperty", "id", "key", "kind", "lockers", "marker", "message", "name", "number", "order"], "testMarkers": ["EXPAGENT_TES
4. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:55499/page", "event": "paddle", "input": {"bytes": 1715, "topLevelKeys": ["Action", "Message", "action", "attributes", "auth", "cmd", "content", "data", "email", "fun", "hasOwnProperty", "id", "key", "kind", "lockers", "marker", "message", "name", "number", "order"], "testMarkers": ["EXPAGENT_TES

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:55499/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\kdnnmhpmcakdilnofmllgcigkibjonof\1.7.41\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\kdnnmhpmcakdilnofmllgcigkibjonof\1.7.41\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\kdnnmhpmcakdilnofmllgcigkibjonof\1.7.41\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\kdnnmhpmcakdilnofmllgcigkibjonof\1.7.41\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:55499/page


---
