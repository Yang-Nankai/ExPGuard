# ExPAgent Dynamic Test — clcgadagmheefcopmehicmjhimgbifph v1.9.4

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-chat`
- Runtime extension id: `oaiojdhndbpmcpohmjgpnogccgfhpckf`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'oaiojdhndbpmcpohmjgpnogccgfhpckf', 'beaconBaseUrl': 'http://127.0.0.1:63488', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 2 flow(s): 1 CONFIRMED, 1 PARTIAL.

---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** Beacon hit 3 times at /beacon/expa_b5356dd41726/inventoryhistory//, confirming the background fetch() executed on the attacker-controlled profileUrl. Sink tap shows 3 fetch calls in the background. The message contract matched exactly: {type:'relay/fetchLatestEventsPage', profileUrl} was forwarded from the content script to the background, which appended '/inventoryhistory//' and fetched. Hard proof of the full source-to-sink path.

**Runtime evidence:** [analysis] I'll work through this flow systematically. Let me start by confirming the extension is loaded and understanding the environment.
[tool-call] list_cdp_targets({})
[tool-call] get_extension_runtime_state({'target_hint': 'background'})
[tool-result]
{"runtimeExtensionId": "oaiojdhndbpmcpohmjgpnogccgfhpckf", "targets": [{"id": "B65DE4E20D4718DBAFB0E7AA65512FAC", "type": "page", "title": "ExPAgent Sandbox", "url": "http://127.0.0.1:63488/page", "extensionTarget": false, "hasWebSocket": true}, {"id": "B33415C957A939CC279D4E7BCFE66CAC", "type": "page", "title": "ExPAgent Sandbox", "url": "http://127.0.0.1:63488/page", "extensionTarget": false, "hasWebSocket": true}, {"id": "7A7F1CA1EBC93A011BFF6AFE5DDDA761", "type": "browser_ui", "title": "Omnibox Popup", "url": "chrome://omnibox-popup.top-chrome/", "extensionTarget": false, "hasWebSocket": true}, {"id": "18743B62A7C959A9C0847E9B96FA400B", "type": "browser_ui", "title": "Omnibox Popup", "url": "chrome://omnibox-popup.top-chrome/omnibox_popup_aim.html", "extensionTarget": false, "hasWebSocket": true}, {"id": "CF70BFEC7D74B4B1BEC88DDB937FF52B", "type": "service_worker", "title": "Service Worker chrome-extension://fignfifoniblkon

**Trajectory:**
1. `list_cdp_targets` {}
2. `get_extension_runtime_state` {'target_hint': 'background'} -> {"target": {"id": "D0B00DB0B1F3239987122F72AD69DDE7", "type": "service_worker", "title": "Service Worker chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/background.js", "url": "chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/background.js", "extensionTarget": true, "hasWebSocket": true}, "st
3. `list_extension_files` {'subdir': 'content'}
4. `list_extension_files` {'subdir': ''} -> Error: list_extension_files is not a valid tool, try one of [list_scripts, search_in_sources, new_page, navigate_page, list_cdp_targets, get_extension_runtime_state, mint_beacon_url, mint_test_marker, check_beacon, post_controlled_message, set_controlled_dom, dispatch_controlled_event, instrument_si
5. `list_scripts` {'filter': 'relay'}
6. `list_scripts` {'filter': 'lootspectrum'} -> [{'type': 'text', 'text': '# list_scripts response\nNo scripts found.', 'id': 'lc_61ceecbf-f29f-4504-af69-777088c189df'}]
7. `search_in_sources` {'query': 'fetchLatestEventsPage'}
8. `search_in_sources` {'query': 'relay/ping'} -> [{'type': 'text', 'text': '# search_in_sources response\nFound 2 match(es) for "relay/ping":\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/relay.js:357\n  // Handle relay/ping - get version and permissions\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/rela
9. `search_in_sources` {'query': 'profileUrl'}
10. `search_in_sources` {'query': 'sendPortMessage'} -> [{'type': 'text', 'text': '# search_in_sources response\nFound 13 match(es) for "sendPortMessage":\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/relay.js:233\n  sendPortMessage({\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/relay.js:244\n  function sendPo
11. `search_in_sources` {'query': 'addEventListener', 'urlFilter': 'relay'}
12. `search_in_sources` {'query': 'event.source === window', 'urlFilter': 'relay'} -> [{'type': 'text', 'text': '# search_in_sources response\nNo matches found for "event.source === window".', 'id': 'lc_0f21e332-c93a-41e2-8089-74284a9dd9aa'}]
13. `search_in_sources` {'query': 'event.source', 'urlFilter': 'relay'}
14. `search_in_sources` {'query': 'relay/fetchLatestEventsPage', 'urlFilter': 'relay'} -> [{'type': 'text', 'text': '# search_in_sources response\nFound 2 match(es) for "relay/fetchLatestEventsPage":\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/relay.js:691\n  // Handle relay/fetchLatestEventsPage - forward to background and relay response\n\n[14] chrome-extension:
15. `search_in_sources` {'query': 'fetchLatestEventsPage', 'urlFilter': 'relay', 'maxLineLength': 2000} -> [{'type': 'text', 'text': '# search_in_sources response\nFound 3 match(es) for "fetchLatestEventsPage":\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/relay.js:691\n  // Handle relay/fetchLatestEventsPage - forward to background and relay response\n\n[14] chrome-extension
16. `search_in_sources` {'query': 'fetchLatestEventsPage', 'urlFilter': 'relay', 'maxLineLength': 3000, 'maxResults': 5} -> [{'type': 'text', 'text': '# search_in_sources response\nFound 3 match(es) for "fetchLatestEventsPage":\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/relay.js:691\n  // Handle relay/fetchLatestEventsPage - forward to background and relay response\n\n[14]
17. `search_in_sources` {'query': 'type: "fetchLatestEventsPage"', 'urlFilter': 'relay', 'maxLineLength': 3000} -> [{'type': 'text', 'text': '# search_in_sources response\nFound 1 match(es) for "type: "fetchLatestEventsPage"":\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/relay.js:696\n  type: "fetchLatestEventsPage",\n\n---\nTip: Use get_script_source(url=..., startLine, end
18. `search_in_sources` {'query': 'fetchLatestEventsPage', 'urlFilter': 'background'}
19. `search_in_sources` {'query': 'profileUrl', 'urlFilter': 'background'} -> [{'type': 'text', 'text': '# search_in_sources response\nNo matches found for "profileUrl".', 'id': 'lc_2bc4d96d-c7f5-40d5-a89d-89a23db30238'}]
20. `search_in_sources` {'query': 'relay/fetchLatestEventsPage', 'urlFilter': 'relay', 'maxLineLength': 4000} -> [{'type': 'text', 'text': '# search_in_sources response\nFound 2 match(es) for "relay/fetchLatestEventsPage":\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/relay.js:691\n  // Handle relay/fetchLatestEventsPage - forward to background and relay response\n\n[14] chro
21. `search_in_sources` {'query': 'profileUrl: event.data.profileUrl', 'urlFilter': 'relay', 'maxLineLength': 4000} -> [{'type': 'text', 'text': '# search_in_sources response\nFound 3 match(es) for "profileUrl: event.data.profileUrl":\n\n[14] chrome-extension://oaiojdhndbpmcpohmjgpnogccgfhpckf/content/relay.js:499\n  profileUrl: event.data.profileUrl,\n\n[14] chrome-extension://oaiojdhndbpmcpohmjg
22. `search_in_sources` {'query': 'fetchLatestEventsPage', 'urlFilter': 'background.js'}
23. `search_in_sources` {'query': 'fetch(', 'urlFilter': 'background.js'} -> [{'type': 'text', 'text': '# search_in_sources response\nNo matches found for "fetch(".', 'id': 'lc_cdcfd085-9a63-4f4f-8eeb-0506ada40489'}]
24. `list_scripts` {'filter': 'background'} -> [{'type': 'text', 'text': '# list_scripts response\nNo scripts found.', 'id': 'lc_9778f25c-0318-4a0d-8e67-97a47207d0f4'}]
25. `search_in_sources` {'query': 'fetch', 'urlFilter': 'background'}
26. `search_in_sources` {'query': 'onMessage', 'urlFilter': 'background'} -> [{'type': 'text', 'text': '# search_in_sources response\nNo matches found for "onMessage".', 'id': 'lc_dad92364-bcd0-4ad1-9b71-9df32c19817f'}]
27. `instrument_sink` {'sink_type': 'fetch', 'target_hint': 'background'}
28. `mint_beacon_url` {} -> {"url": "http://127.0.0.1:63488/beacon/expa_b5356dd41726", "token": "expa_b5356dd41726"}
29. `post_controlled_message` {'payload_json': '{"type": "relay/fetchLatestEventsPage", "profileUrl": "http://127.0.0.1:63488/beacon/expa_b5356dd41726"}'} -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:63488/page", "input": {"bytes": 101, "topLevelKeys": ["profileUrl", "type"], "testMarkers": []}, "result": {"posted": true, "origin": "http://127.0.0.1:63488"}}
30. `check_beacon` {'token': 'expa_b5356dd41726', 'wait_seconds': 6}
31. `read_sink_tap` {'sink_type': 'fetch', 'target_hint': 'background'} -> {"sink_type": "fetch", "result": "{\"sink\":\"fetch\",\"calls\":[{\"ts\":1786819130495,\"request\":{\"redacted\":true,\"length\":164},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}},{\"ts\":1786819131031,\"request\":{\"redacted\":true,\"length\":164},\"method\":\"GET\",\"body\":{\"reda
32. `list_console_messages` {} -> Error: list_console_messages is not a valid tool, try one of [list_scripts, search_in_sources, new_page, navigate_page, list_cdp_targets, get_extension_runtime_state, mint_beacon_url, mint_test_marker, check_beacon, post_controlled_message, set_controlled_dom, dispatch_controlled_event, instrument_s

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:63488/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-1\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-1\key-state.png` — Key browser state after replay: http://127.0.0.1:63488/page


---

## Flow #0 — 🟠 PARTIAL  (reproduced=False, confidence 0.60)

**Reasoning:** The exact static sink recorded a call, but the controlled marker/beacon was not observed in its security-relevant argument. 这动态印证了静态 FALSE_POSITIVE：该 sink 的安全相关参数是常量/内部派生值，而非攻击者直控字符串。

**Payload:** `[{"type": "relay/ping", "marker": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "url": "http://127.0.0.1:63488/beacon/expa_af125602bd21", "data": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "value": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "message": "getVersion", "title": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "text": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "number": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "name": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "id": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "key": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "action": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "cmd": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "Action": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "Message": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "fun": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "auth": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "phone": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "email": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "version": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "token": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "content": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "payload": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "kind": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "requestId": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "revision": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "permissionType": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "sessionId": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "profileUrl": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "tabId": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "startTimestamp": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "endTimestamp": "EXPAGENT_TEST_expa_a6cdcb4a6e2b"}, {"type": "relay/ping", "marker": "EXPAGENT_TEST_expa_a6cdcb4a6e2b", "url": "http://127.0.0.1:63488/beacon/expa_af125602bd21", "data":`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content/relay.js", "location": "L358:C20 -> L358:C35", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"type": "relay/ping"}, "forwardField": "", "requirements": {"type": "relay/ping"}, "selectors": [], "mediaTags": [], "snippet": "sconnectAndRetry = () => {\n      if (retryCount < 2) {\n        console.log(\"Port disconnected, reconnecting and retrying...\");\n        pendingRequests.delete(requestId);\n        clearTimeout(timeout);\n        \n        // Trigger reconnection if not already in progress\n        if (!isReconnecting) {\n          reconnectPort();\n        }\n        \n        // Wait for reconnection, then retry\n        const checkReconnect = setInterval(() => {\n          if (!isReconnecting && port && port.onMessage) {\n            clearInterval(checkReconnect);\n            // Retry sending the message\n            sendPortMessage(message, retryCount + 1)\n              .then(resolve)\n              .catch(reject);\n          }\n        }, 100);\n        \n        // Timeout for reconnection check\n        setTimeout(() => {\n          clearInterval(checkReconnect);\n          if (!port || !port.onMessage) {\n            r", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `message` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "message", "discriminatorValues": ["getVersion", "logResponse"], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "request", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["type", "permissionType", "sessionId", "profileUrl", "tabId", "startTimestamp", "endTimestamp"]}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[\"fetch\"],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:63488/page", "input": {"bytes": 1399, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "endTimestamp", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "permissionType", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_a6cdcb4a6e2b"]}, "result": {"posted": true, "origin": "http://127.0.0.1:63488"}}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:63488/page", "input": {"byt

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[\"fetch\"],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:63488/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: http://127.0.0.1:63488/page\n1: http://127.0.0.1:63488/page\n2: http://127.0.0.1:63488/page [selected]", "id": "lc_8ec811b3-203c-42d9-8a36-67c3c3c
3. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:63488/page", "input": {"bytes": 1399, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "endTimestamp", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "permissionType", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_a6cdcb4a6e2b"]}
4. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:63488/page", "input": {"bytes": 1400, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "endTimestamp", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "permissionType", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_a6cdcb4a6e2b"]}
5. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:63488/page", "input": {"bytes": 1837, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "endTimestamp", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "permissionType", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_a6cdcb4a6e2b"]}
6. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:63488/page", "input": {"bytes": 1839, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "endTimestamp", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "permissionType", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_a6cdcb4a6e2b"]}
7. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:63488/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: http://127.0.0.1:63488/page
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-0\step-after-trigger.png` — Step `after-trigger`: http://127.0.0.1:63488/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-0\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-0\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\clcgadagmheefcopmehicmjhimgbifph\1.9.4\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:63488/page

**Notes:** sinkTapKey=fetch

---
