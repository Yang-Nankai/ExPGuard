# ExPAgent Dynamic Test — mdnleldcmiljblolnjhpnblkcekpdkpa v26.6.10

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `mdnleldcmiljblolnjhpnblkcekpdkpa`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'mdnleldcmiljblolnjhpnblkcekpdkpa', 'beaconBaseUrl': 'http://127.0.0.1:53376', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #1 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_dc8102981215", "url": "http://127.0.0.1:53376/beacon/expa_8036724f032a", "data": "EXPAGENT_TEST_expa_dc8102981215", "value": "EXPAGENT_TEST_expa_dc8102981215", "message": "EXPAGENT_TEST_expa_dc8102981215", "title": "EXPAGENT_TEST_expa_dc8102981215", "text": "EXPAGENT_TEST_expa_dc8102981215", "number": "EXPAGENT_TEST_expa_dc8102981215", "name": "EXPAGENT_TEST_expa_dc8102981215", "id": "EXPAGENT_TEST_expa_dc8102981215", "key": "EXPAGENT_TEST_expa_dc8102981215", "type": "EXPAGENT_TEST_expa_dc8102981215", "action": "EXPAGENT_TEST_expa_dc8102981215", "cmd": "EXPAGENT_TEST_expa_dc8102981215", "Action": "EXPAGENT_TEST_expa_dc8102981215", "Message": "EXPAGENT_TEST_expa_dc8102981215", "fun": "EXPAGENT_TEST_expa_dc8102981215", "auth": "EXPAGENT_TEST_expa_dc8102981215", "phone": "EXPAGENT_TEST_expa_dc8102981215", "email": "EXPAGENT_TEST_expa_dc8102981215", "version": "EXPAGENT_TEST_expa_dc8102981215", "token": "EXPAGENT_TEST_expa_dc8102981215", "content": "EXPAGENT_TEST_expa_dc8102981215", "payload": "EXPAGENT_TEST_expa_dc8102981215", "kind": "EXPAGENT_TEST_expa_dc8102981215", "requestId": "EXPAGENT_TEST_expa_dc8102981215", "revision": "EXPAGENT_TEST_expa_dc8102981215"}, {"marker": "EXPAGENT_TEST_expa_dc8102981215", "url": "http://127.0.0.1:53376/beacon/expa_8036724f032a", "data": {"marker": "EXPAGENT_TEST_expa_dc8102981215", "url": "http://127.0.0.1:53376/beacon/expa_8036724f032a", "value": "EXPAGENT_TEST_expa_dc8102981215", "message": "EXPAGENT_TEST_expa_dc8102981215", "action": "EXPAGENT_TEST_expa_dc8102981215"}, "value": "EXPAGENT_TEST_expa_dc810298`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "client.cs.js", "location": "L1:C44514 -> L1:C49506", "eventNames": ["view_rule_in_editor", "pageshow", "beforeunload", "stop", "discard", "moved", "watch", "view-results"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "gTime:n,position:le.widgetPosition}})))},he=()=>{const e=Te();e?.dispatchEvent(new CustomEvent(\"hide\"))},Te=()=>document.querySelector(\"rq-session-recording-widget\"),ye=()=>{const e=\"rq-session-recording-auto-mode-widget\";let t=document.querySelector(e);t||(t=document.createElement(e),t.classList.add(\"rq-element\"),document.documentElement.appendChild(t),t.addEventListener(\"watch\",()=>{chrome.runtime.sendMessage({action:E})}),t.addEventListener(\"moved\",e=>{le.widgetPosition=e.detail})),t.dispatchEvent(new CustomEvent(\"show\",de({detail:{position:le.widgetPosition}})))},Ae=()=>{let e=document.querySelector(\"rq-session-recording-auto-mode-widget\");e?.dispatchEvent(new CustomEvent(\"hide\"))},Le=()=>{const e=document.createElement(\"rq-toast\");e.classList.add(\"rq-element\"),e.setAttribute(\"heading\",\"Requestly is recording session on this tab!\"),e.setAttribute(\"icon-path\",chrome.runtime.getURL(\"re", "notes": ["已从 sink 文件推导消息分发字段 `action` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "action", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "e", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-breakpoint=armed
sink-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "http://127.0.0.1:53376/page"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "http://127.0.0.1:53376/page"}, "frames": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"action.setIcon\",\"fetch\",\"tabs.sendMessage\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__proxy_settings_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"__declarativeNetRequest_updateSessionRules__\":true,\"__declarativeNetRequest_updateDynamicRules__\":true,\"action.setIcon\":[{\"ts\":1786900755166,\"arg\":{\"redacted\":true,\"length\":56}},{\"ts\":1786900755175,\"arg\":{\"redacted\":true,\"length\":56}},{\"ts\":1786900755183,\"arg\":{\"redacted\"
beacon={"token": "expa_8036724f032a", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:53376/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: chrome-error://chromewebdata/\n1: http://127.0.0.1:53376/page\n2: http://127.0.0.1:53376/page [selected]", "id": "lc_2ec0470d-3d83-4e2c-a66e-edbbc
2. `set_sink_breakpoint` app.cs L1:C2554 -> L1:C2578 -> {"ok": true, "sourceFile": "app.cs.js", "url": "chrome-extension://mdnleldcmiljblolnjhpnblkcekpdkpa/app.cs.js", "line": 1, "column": 2554, "targetHint": "content", "breakpointId": "1:0:2554:chrome-extension://mdnleldcmiljblolnjhpnblkcekpdkpa/app.cs.js", "locations": [{"scriptId": "6", "lineNumber": 0, "columnNumber": 2572}]}
3. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:53376/page", "event": "view_rule_in_editor", "input": {"bytes": 1155, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGE
4. `sink_contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:53376/page", "event": "view_rule_in_editor", "input": {"bytes": 1351, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGE

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:53376/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-1\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-1\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mdnleldcmiljblolnjhpnblkcekpdkpa\26.6.10\dynamic-evidence\flow-1\key-state.png` — Key browser state after replay: http://127.0.0.1:53376/page


---
