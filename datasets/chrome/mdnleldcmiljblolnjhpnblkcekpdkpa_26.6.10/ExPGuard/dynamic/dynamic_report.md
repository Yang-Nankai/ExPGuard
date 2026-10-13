# ExPAgent Dynamic Test — mdnleldcmiljblolnjhpnblkcekpdkpa v26.6.10

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `mdnleldcmiljblolnjhpnblkcekpdkpa`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'mdnleldcmiljblolnjhpnblkcekpdkpa', 'beaconBaseUrl': 'http://127.0.0.1:59089', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED, 1 EXTERNAL_CONDITION_REQUIRED, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_a7d4f2cd3260", "url": "http://127.0.0.1:59089/beacon/expa_593baa386866", "data": "EXPAGENT_TEST_expa_a7d4f2cd3260", "value": "EXPAGENT_TEST_expa_a7d4f2cd3260", "message": "EXPAGENT_TEST_expa_a7d4f2cd3260", "title": "EXPAGENT_TEST_expa_a7d4f2cd3260", "text": "EXPAGENT_TEST_expa_a7d4f2cd3260", "number": "EXPAGENT_TEST_expa_a7d4f2cd3260", "name": "EXPAGENT_TEST_expa_a7d4f2cd3260", "id": "EXPAGENT_TEST_expa_a7d4f2cd3260", "key": "EXPAGENT_TEST_expa_a7d4f2cd3260", "type": "EXPAGENT_TEST_expa_a7d4f2cd3260", "action": "EXPAGENT_TEST_expa_a7d4f2cd3260", "cmd": "EXPAGENT_TEST_expa_a7d4f2cd3260", "Action": "EXPAGENT_TEST_expa_a7d4f2cd3260", "Message": "EXPAGENT_TEST_expa_a7d4f2cd3260", "fun": "EXPAGENT_TEST_expa_a7d4f2cd3260", "auth": "EXPAGENT_TEST_expa_a7d4f2cd3260", "phone": "EXPAGENT_TEST_expa_a7d4f2cd3260", "email": "EXPAGENT_TEST_expa_a7d4f2cd3260", "version": "EXPAGENT_TEST_expa_a7d4f2cd3260", "token": "EXPAGENT_TEST_expa_a7d4f2cd3260", "content": "EXPAGENT_TEST_expa_a7d4f2cd3260", "payload": "EXPAGENT_TEST_expa_a7d4f2cd3260", "kind": "EXPAGENT_TEST_expa_a7d4f2cd3260", "requestId": "EXPAGENT_TEST_expa_a7d4f2cd3260", "revision": "EXPAGENT_TEST_expa_a7d4f2cd3260"}, {"marker": "EXPAGENT_TEST_expa_a7d4f2cd3260", "url": "http://127.0.0.1:59089/beacon/expa_593baa386866", "data": {"marker": "EXPAGENT_TEST_expa_a7d4f2cd3260", "url": "http://127.0.0.1:59089/beacon/expa_593baa386866", "value": "EXPAGENT_TEST_expa_a7d4f2cd3260", "message": "EXPAGENT_TEST_expa_a7d4f2cd3260", "action": "sessionRecordingStopped"}, "value": "EXPAGENT_TEST_expa_a7d4f2cd3260", "`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "client.cs.js", "location": "L1:C7673 -> L1:C7787", "eventNames": ["view-results", "pageshow", "beforeunload", "stop", "discard", "moved", "watch", "view_rule_in_editor"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"action": "sessionRecordingStopped"}, "selectors": [], "mediaTags": [], "snippet": "cordingStarted\"===e.data.action?(le.isRecording=!0,chrome.runtime.sendMessage({action:A,payload:{markRecordingIcon:le.markRecordingIcon}}),le.showWidget&&(le.isExplicitRecording?we():ye())):\"sessionRecordingStopped\"===e.data.action&&(le.isRecording=!1,le.isExplicitRecording=!1,le.markRecordingIcon=!1,he(),Ae(),chrome.runtime.sendMessage({action:L})))}),window.addEventListener(\"beforeunload\",()=>{Se(\"getSessionData\",null,e=>{chrome.runtime.sendMessage({action:m,payload:{session:e,widgetPosition:le.widgetPosition,recordingMode:le.recordingMode,recordingStartTime:le.recordingStartTime}})})})},Re=(e,t)=>{ue[e]?.(t),delete ue[e]},Se=(e,t,n)=>{window.postMessage({source:\"requestly:extension\",action:e,payload:t},window.location.href),n&&(ue[e]=n)},we=()=>{let e=Te();e||(e=document.createElement(\"rq-session-recording-widget\"),e.classList.add(\"rq-element\"),document.documentElement.appendChild(e),", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `action` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "action", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "e", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-breakpoint=armed
sink-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "http://127.0.0.1:59089/page"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "http://127.0.0.1:59089/page"}, "frames": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"action.setIcon\",\"fetch\",\"tabs.sendMessage\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__proxy_settings_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"__declarativeNetRequest_updateSessionRules__\":true,\"__declarativeNetRequest_updateDynamicRules__\":true,\"action.setIcon\":[{\"ts\":1786891287284,\"arg\":{\"redacted\":true,\"length\":57}},{\"ts\":1786891287294,\"arg\":{\"redacted\":true,\"length\":57}},{\"ts\":1786891287303,\"arg\":{\"redacted\"
beacon={"token": "expa_593baa386866", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:59089/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: chrome-error://chromewebdata/\n1: http://127.0.0.1:59089/page\n2: http://127.0.0.1:59089/page [selected]", "id": "lc_dcfca31a-4ced-4902-a728-129ac
2. `set_sink_breakpoint` app.cs L1:C2554 -> L1:C2578 -> {"ok": true, "sourceFile": "app.cs.js", "url": "chrome-extension://mdnleldcmiljblolnjhpnblkcekpdkpa/app.cs.js", "line": 1, "column": 2554, "targetHint": "content", "breakpointId": "1:0:2554:chrome-extension://mdnleldcmiljblolnjhpnblkcekpdkpa/app.cs.js", "locations": [{"scriptId": "6", "lineNumber": 0, "columnNumber": 2572}]}
3. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:59089/page", "event": "view-results", "input": {"bytes": 1155, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST
4. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:59089/page", "event": "view-results", "input": {"bytes": 1343, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:59089/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:59089/page


---

## Flow #2 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "client.cs.js", "location": "L1:C7673 -> L1:C7787", "eventNames": ["view-results", "pageshow", "beforeunload", "stop", "discard", "moved", "watch", "view_rule_in_editor"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"action": "sessionRecordingStopped"}, "selectors": [], "mediaTags": [], "snippet": "cordingStarted\"===e.data.action?(le.isRecording=!0,chrome.runtime.sendMessage({action:A,payload:{markRecordingIcon:le.markRecordingIcon}}),le.showWidget&&(le.isExplicitRecording?we():ye())):\"sessionRecordingStopped\"===e.data.action&&(le.isRecording=!1,le.isExplicitRecording=!1,le.markRecordingIcon=!1,he(),Ae(),chrome.runtime.sendMessage({action:L})))}),window.addEventListener(\"beforeunload\",()=>{Se(\"getSessionData\",null,e=>{chrome.runtime.sendMessage({action:m,payload:
deep-trace=source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "client.cs.js", "location": "L1:C7673 -> L1:C7787", "eventNames": ["view-results", "pageshow", "beforeunload", "stop", "discard", "moved", "watch", "view_rule_in_editor"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"action": "sessionRecordingStopped"}, "selectors": [], "mediaTags": [], "snippet": "cordingStarted\"===e.data.action?(le.isRecording=!0,chrome.runtime.sendMessage({action:A,payload:{markRecordingIcon:le.markRecordingIcon}}),le.showWidget&&(le.isExplicitRecording?we():ye())):\"sessionRecordingStopped\"===e.data.action&&(le.isRecording=!1,le.isExplicitRecording=!1,le.markRecordingIcon=!1,he(),Ae(),chrome.runtime.sendMessage({action:L})))}),window.addEventListener(\"beforeunload\",()=>{Se(\"getSessionData\",null,e=>{chrome.runtime.sendMessage({action:m,payload:

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:59089/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #10 — EXTERNAL CONDITION REQUIRED  (reproduced=False, confidence 0.90)

**Reasoning:** 源是 chrome.runtime.onMessageExternal / onConnectExternal（来自 externally_connectable 声明的外部网站/扩展消息）；需要匹配的受控发送方页面/扩展，属于外部消息发送方前置条件。

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:59089/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 2 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-10\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-10\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.


---
