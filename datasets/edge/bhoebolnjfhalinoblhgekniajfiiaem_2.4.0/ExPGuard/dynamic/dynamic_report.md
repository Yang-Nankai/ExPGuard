# ExPAgent Dynamic Test — bhoebolnjfhalinoblhgekniajfiiaem v2.4.0

- Browser: `edge`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `ccdpdjkicnobpakaplnnmgobcijgdika`
- Environment: `{'browserUrl': 'http://127.0.0.1:50064', 'runtimeExtensionId': 'ccdpdjkicnobpakaplnnmgobcijgdika', 'beaconBaseUrl': 'http://127.0.0.1:50063', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_4ce7a059b1cc", "url": "http://127.0.0.1:50063/beacon/expa_9cb906e411d8", "data": {"url": "http://127.0.0.1:50063/beacon/expa_9cb906e411d8"}, "value": "EXPAGENT_TEST_expa_4ce7a059b1cc", "message": "EXPAGENT_TEST_expa_4ce7a059b1cc", "title": "EXPAGENT_TEST_expa_4ce7a059b1cc", "text": "EXPAGENT_TEST_expa_4ce7a059b1cc", "number": "EXPAGENT_TEST_expa_4ce7a059b1cc", "name": "EXPAGENT_TEST_expa_4ce7a059b1cc", "id": "EXPAGENT_TEST_expa_4ce7a059b1cc", "key": "EXPAGENT_TEST_expa_4ce7a059b1cc", "type": "EXPAGENT_TEST_expa_4ce7a059b1cc", "action": "EXPAGENT_TEST_expa_4ce7a059b1cc", "cmd": "EXPAGENT_TEST_expa_4ce7a059b1cc", "Action": "EXPAGENT_TEST_expa_4ce7a059b1cc", "Message": "EXPAGENT_TEST_expa_4ce7a059b1cc", "fun": "EXPAGENT_TEST_expa_4ce7a059b1cc", "auth": "EXPAGENT_TEST_expa_4ce7a059b1cc", "phone": "EXPAGENT_TEST_expa_4ce7a059b1cc", "email": "EXPAGENT_TEST_expa_4ce7a059b1cc", "version": "EXPAGENT_TEST_expa_4ce7a059b1cc", "token": "EXPAGENT_TEST_expa_4ce7a059b1cc", "content": "EXPAGENT_TEST_expa_4ce7a059b1cc", "payload": "EXPAGENT_TEST_expa_4ce7a059b1cc", "kind": "EXPAGENT_TEST_expa_4ce7a059b1cc", "requestId": "EXPAGENT_TEST_expa_4ce7a059b1cc", "revision": "EXPAGENT_TEST_expa_4ce7a059b1cc", "URLtraeHTML": {"marker": "EXPAGENT_TEST_expa_4ce7a059b1cc", "value": "EXPAGENT_TEST_expa_4ce7a059b1cc", "url": "http://127.0.0.1:50063/beacon/expa_9cb906e411d8", "offsetx": "EXPAGENT_TEST_expa_4ce7a059b1cc", "offsety": "EXPAGENT_TEST_expa_4ce7a059b1cc", "width": 1, "height": 1, "left": 1, "top": 1}}, {"marker": "EXPAGENT_TEST_expa_4ce7a059b1cc", "url": "http://1`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "content.js", "location": "L250:C12 -> L250:C30", "eventNames": ["mouseleave", "contextmenu", "touchstart", "touchend", "touchcancel", "resize", "scroll", "keyup"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "     gcajaboton.style.display = \"none\";\n        gcajaboton.className = \"cRAEcajaboton\";\n      }\n    }\n    if (request.me_oyes) {\n      sendResponse({oido:true});\n    }\n    if (request.frameId_bocadillo_2022) {\n      gframeid = request.frameId_bocadillo_2022;\n      giframe.removeAttribute(\"src\");\n      giframe.setAttribute(\"srcdoc\", gHTMLbuscando);\n    }\n    if (gmanifest_version >= 3 && (request.frameId_bocadillo_2022 || request.oculta_bocadillo || request.URL_para_bocadillo)) {\n      sendResponse();\n    }\n  });\n}\nfunction fCreaEventos() {\n  if (!es_browser_action) {\n    if (gsDobleclic) {\n      document.ondblclick = function(e) {\n        var sel = \"\";\n        var el = e.target;\n        if (gsDobleclic && !(!e.ctrlKey && !e.getModifierState(\"Control\") && gsTeclaDobleclic == \"CTRL\" && !es_android) && !(!e.metaKey && gsTeclaDobleclic == \"CMD\" && !es_android) && !(!e.altKey && gsTeclaDoblec", "notes": ["已从 sink 调用推导 URL 承载字段 `data.url`。", "已提取页面可达事件名。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "data.url", "sinkTapKey": "windows.create", "messageAlias": "request", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-breakpoint=armed
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://ccdpdjkicnobpakaplnnmgobcijgdika/popup.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://ccdpdjkicnobpakaplnnmgobcijgdika/popup.js"}, "frames": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"tabs.sendMessage\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"tabs.sendMessage\":[{\"ts\":1786905551511,\"arg\":{\"redacted\":true,\"length\":10}},{\"ts\":1786905557545,\"arg\":{\"redacted\":true,\"length\":10}}]}}"}
beacon={"token": "expa_9cb906e411d8", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:50063/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: chrome-extension://ccdpdjkicnobpakaplnnmgobcijgdika/ayuda.html?aviso_icono=1\n1: http://127.0.0.1:50063/page\n2: http://127.0.0.1:50063/page [sele
2. `set_sink_breakpoint` popup L70:C2 -> L70:C101 -> {"ok": true, "sourceFile": "popup.js", "url": "chrome-extension://ccdpdjkicnobpakaplnnmgobcijgdika/popup.js", "line": 70, "column": 2, "targetHint": "background", "breakpointId": "1:69:2:chrome-extension://ccdpdjkicnobpakaplnnmgobcijgdika/popup.js", "locations": [{"scriptId": "5", "lineNumber": 69, "columnNumber": 2}]}
3. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:50063/page", "event": "mouseleave", "input": {"bytes": 1462, "topLevelKeys": ["Action", "Message", "URLtraeHTML", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TES
4. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:50063/page", "event": "mouseleave", "input": {"bytes": 1591, "topLevelKeys": ["Action", "Message", "URLtraeHTML", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TES

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:50063/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bhoebolnjfhalinoblhgekniajfiiaem\2.4.0\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bhoebolnjfhalinoblhgekniajfiiaem\2.4.0\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bhoebolnjfhalinoblhgekniajfiiaem\2.4.0\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bhoebolnjfhalinoblhgekniajfiiaem\2.4.0\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:50063/page


---
