# ExPAgent Dynamic Test — offaffijfcafoohdmbhllfmcbijgfkoi v1.2

- Browser: `edge`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `pkaejkfgjolmfdkonlmkkphbhhmdljcl`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'pkaejkfgjolmfdkonlmkkphbhhmdljcl', 'beaconBaseUrl': 'http://localhost:9871', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"type": "ESMART_WEB_EXTENSION_REQUEST", "marker": "EXPAGENT_TEST_expa_2b5b843422e5", "url": "http://localhost:9871/beacon/expa_b7b46d5fe785", "data": "EXPAGENT_TEST_expa_2b5b843422e5", "value": "EXPAGENT_TEST_expa_2b5b843422e5", "message": "EXPAGENT_TEST_expa_2b5b843422e5", "title": "EXPAGENT_TEST_expa_2b5b843422e5", "text": "EXPAGENT_TEST_expa_2b5b843422e5", "number": "EXPAGENT_TEST_expa_2b5b843422e5", "name": "EXPAGENT_TEST_expa_2b5b843422e5", "id": "EXPAGENT_TEST_expa_2b5b843422e5", "key": "EXPAGENT_TEST_expa_2b5b843422e5", "action": "EXPAGENT_TEST_expa_2b5b843422e5", "cmd": "EXPAGENT_TEST_expa_2b5b843422e5", "Action": "EXPAGENT_TEST_expa_2b5b843422e5", "Message": "EXPAGENT_TEST_expa_2b5b843422e5", "fun": "EXPAGENT_TEST_expa_2b5b843422e5", "auth": "EXPAGENT_TEST_expa_2b5b843422e5", "phone": "EXPAGENT_TEST_expa_2b5b843422e5", "email": "EXPAGENT_TEST_expa_2b5b843422e5", "version": "EXPAGENT_TEST_expa_2b5b843422e5", "token": "EXPAGENT_TEST_expa_2b5b843422e5", "content": "EXPAGENT_TEST_expa_2b5b843422e5", "payload": "EXPAGENT_TEST_expa_2b5b843422e5", "kind": "EXPAGENT_TEST_expa_2b5b843422e5", "requestId": "EXPAGENT_TEST_expa_2b5b843422e5", "revision": "EXPAGENT_TEST_expa_2b5b843422e5", "operation": "EXPAGENT_TEST_expa_2b5b843422e5", "method": "EXPAGENT_TEST_expa_2b5b843422e5"}, {"type": "ESMART_WEB_EXTENSION_REQUEST", "marker": "EXPAGENT_TEST_expa_2b5b843422e5", "url": "http://localhost:9871/beacon/expa_b7b46d5fe785", "data": {"marker": "EXPAGENT_TEST_expa_2b5b843422e5", "url": "http://localhost:9871/beacon/expa_b7b46d5fe785", "value": "EXPAGENT_TEST_expa_2b5b843422e5", "m`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "contentScript.js", "location": "L8:C8 -> L8:C23", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"type": "ESMART_WEB_EXTENSION_REQUEST"}, "forwardField": "", "requirements": {"type": "ESMART_WEB_EXTENSION_REQUEST"}, "selectors": [], "mediaTags": [], "snippet": "document.documentElement.setAttribute('esmartextension-installed', true);\ndocument.documentElement.setAttribute('esmartextension-version', browser.runtime.getManifest().version);\n\nwindow.addEventListener(\"message\", function (event) {\n    if (event.source != window)\n        return;\n\n    if (event.data.type && (event.data.type == \"ESMART_WEB_EXTENSION_REQUEST\")) {\n        browser.runtime.sendMessage({\n            operation: event.data.operation,\n            data: event.data.data,\n            method: event.data.method\n        }).then(function (response) {\n            window.postMessage({ type: \"ESMART_WEB_EXTENSION_RESPONSE\", requestId: event.data.requestId, response: response }, \"*\");\n        });\n    }\n}, false);", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["type", "operation", "data", "method", "requestId"]}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "postMessage", "targetUrl": "http://localhost:6800/page", "input": {"bytes": 1240, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "method", "name", "number", "operation", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_2b5b843422e5"]}, "result": {"posted": true, "origin": "http://localhost:6800"}}
stimulus={"action": "postMessage", "targetUrl": "http://localhost:6800/page", "input": {"bytes": 1606, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "method", "name", "number", "operation", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_2b5b843422e5"]}, "result": {"posted": true, "origi

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://localhost:9871/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-2 of 2 (Page 1 of 1).\n0: http://localhost:6800/page\n1: http://localhost:9871/page [selected]", "id": "lc_ee2bc969-0a32-4f21-92fc-121fd8e76a39"}]
3. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:6800/page", "input": {"bytes": 1240, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "method", "name", "number", "operation", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_2b5b843422e5"]}, "result": 
4. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:6800/page", "input": {"bytes": 1606, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "method", "name", "number", "operation", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_2b5b843422e5"]}, "result": 
5. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"storage.local.set\",\"fetch\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:9871/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\offaffijfcafoohdmbhllfmcbijgfkoi\1.2\dynamic-evidence\flow-1\step-source-open.png` — Step `source-open`: http://localhost:9871/page
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\offaffijfcafoohdmbhllfmcbijgfkoi\1.2\dynamic-evidence\flow-1\step-after-trigger.png` — Step `after-trigger`: http://localhost:9871/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\offaffijfcafoohdmbhllfmcbijgfkoi\1.2\dynamic-evidence\flow-1\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\offaffijfcafoohdmbhllfmcbijgfkoi\1.2\dynamic-evidence\flow-1\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\offaffijfcafoohdmbhllfmcbijgfkoi\1.2\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\offaffijfcafoohdmbhllfmcbijgfkoi\1.2\dynamic-evidence\flow-1\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\offaffijfcafoohdmbhllfmcbijgfkoi\1.2\dynamic-evidence\flow-1\key-state.png` — Key browser state after replay: http://localhost:9871/page

**Notes:** sinkTapKey=fetch

---
