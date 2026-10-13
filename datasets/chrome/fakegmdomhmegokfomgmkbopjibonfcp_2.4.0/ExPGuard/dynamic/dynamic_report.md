# ExPAgent Dynamic Test — fakegmdomhmegokfomgmkbopjibonfcp v2.4.0

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `eloljcjpjfgdflnfobdhcbffcdacpgll`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'eloljcjpjfgdflnfobdhcbffcdacpgll', 'beaconBaseUrl': 'http://localhost:8080', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED, 2 EXTERNAL_CONDITION_REQUIRED.

---

## Flow #1 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_ea97c540c00f", "url": "http://localhost:8080/beacon/expa_b03b7b534461", "data": "EXPAGENT_TEST_expa_ea97c540c00f", "value": "EXPAGENT_TEST_expa_ea97c540c00f", "message": "EXPAGENT_TEST_expa_ea97c540c00f", "title": "EXPAGENT_TEST_expa_ea97c540c00f", "text": "EXPAGENT_TEST_expa_ea97c540c00f", "number": "EXPAGENT_TEST_expa_ea97c540c00f", "name": "EXPAGENT_TEST_expa_ea97c540c00f", "id": "EXPAGENT_TEST_expa_ea97c540c00f", "key": "EXPAGENT_TEST_expa_ea97c540c00f", "type": "metastream-init", "action": "EXPAGENT_TEST_expa_ea97c540c00f", "cmd": "EXPAGENT_TEST_expa_ea97c540c00f", "Action": "EXPAGENT_TEST_expa_ea97c540c00f", "Message": "EXPAGENT_TEST_expa_ea97c540c00f", "fun": "EXPAGENT_TEST_expa_ea97c540c00f", "auth": "EXPAGENT_TEST_expa_ea97c540c00f", "phone": "EXPAGENT_TEST_expa_ea97c540c00f", "email": "EXPAGENT_TEST_expa_ea97c540c00f", "version": "EXPAGENT_TEST_expa_ea97c540c00f", "token": "EXPAGENT_TEST_expa_ea97c540c00f", "content": "EXPAGENT_TEST_expa_ea97c540c00f", "payload": "EXPAGENT_TEST_expa_ea97c540c00f", "kind": "EXPAGENT_TEST_expa_ea97c540c00f", "requestId": "EXPAGENT_TEST_expa_ea97c540c00f", "revision": "EXPAGENT_TEST_expa_ea97c540c00f"}, {"marker": "EXPAGENT_TEST_expa_ea97c540c00f", "url": "http://localhost:8080/beacon/expa_b03b7b534461", "data": {"marker": "EXPAGENT_TEST_expa_ea97c540c00f", "url": "http://localhost:8080/beacon/expa_b03b7b534461", "value": "EXPAGENT_TEST_expa_ea97c540c00f", "message": "EXPAGENT_TEST_expa_ea97c540c00f", "type": "metastream-init"}, "value": "EXPAGENT_TEST_expa_ea97c540c00f", "message": "EXPAGENT_TEST_expa`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "app.js", "location": "L60:C73 -> L60:C79", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "'use strict'\n\n//\n// The app script handles bidirectional communication with the background\n// script from the Metastream application.\n//\n;(function app() {\n  const isInstalled = typeof document.documentElement.dataset.extensionInstalled !== 'undefined'\n  if (isInstalled) {\n    console.debug(`Metastream already initialized`)\n    return\n  }\n\n  if (window.self !== window.top) {\n    console.warn('Metastream is unsupported within subframes.')\n    return\n  }\n\n  function dispatchInstallEvent() {\n    document.dispatchEvent(new Event('metastreamRemoteInstalled'))\n  }\n\n  // Notify background script of initialization request\n  chrome.runtime.sendMessage({ type: 'metastream-init' }, (initialized) => {\n    document.documentElement.dataset.extensionInstalled = ''\n\n    try {\n      const manifest = chrome.runtime.getManifest()\n      document.documentElement.dataset.extensionId = chrome.runtime.id\n      ", "notes": ["已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。"], "discriminatorField": "type", "discriminatorValues": ["metastream-init"], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "info", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-breakpoint=armed
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://eloljcjpjfgdflnfobdhcbffcdacpgll/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://eloljcjpjfgdflnfobdhcbffcdacpgll/background.js"}, "frames": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"declarativeNetRequest.updateSessionRules\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"__declarativeNetRequest_updateSessionRules__\":true,\"__declarativeNetRequest_updateDynamicRules__\":true,\"declarativeNetRequest.updateSessionRules\":[{\"ts\":1786859925274,\"arg\":{\"redacted\":true,\"length\":363}},{\"ts\":1786859926566,\"arg\":{\"redacted\":true,\"length\":363}},{\"ts\":1786859926953,\"arg\":
beacon={"token": "expa_b03b7b534461", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://localhost:8080/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-2 of 2 (Page 1 of 1).\n0: http://localhost:8080/page\n1: http://localhost:8080/page [selected]", "id": "lc_ba25e482-aa68-4551-a9b6-575348bf0e98"}]
2. `set_sink_breakpoint` background L653:C34 -> L653:C68 -> {"ok": true, "sourceFile": "background.js", "url": "chrome-extension://eloljcjpjfgdflnfobdhcbffcdacpgll/background.js", "line": 653, "column": 34, "targetHint": "background", "breakpointId": "1:652:34:chrome-extension://eloljcjpjfgdflnfobdhcbffcdacpgll/background.js", "locations": [{"scriptId": "5", "lineNumber": 652, "columnNumber": 34}]
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:8080/page", "input": {"bytes": 1138, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_ea97c540c00f"]}, "re
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:8080/page", "input": {"bytes": 1315, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_ea97c540c00f"]}, "re

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8080/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-1\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-1\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-1\key-state.png` — Key browser state after replay: http://localhost:8080/page


---

## Flow #3 — EXTERNAL CONDITION REQUIRED  (reproduced=False, confidence 0.90)

**Reasoning:** 源是 chrome.runtime.onMessageExternal / onConnectExternal（来自 externally_connectable 声明的外部网站/扩展消息）；需要匹配的受控发送方页面/扩展，属于外部消息发送方前置条件。

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8080/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-3\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-3\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-3\key-state.png` — Key browser state after replay: http://localhost:8080/page


---

## Flow #4 — EXTERNAL CONDITION REQUIRED  (reproduced=False, confidence 0.90)

**Reasoning:** 源是 chrome.runtime.onMessageExternal / onConnectExternal（来自 externally_connectable 声明的外部网站/扩展消息）；需要匹配的受控发送方页面/扩展，属于外部消息发送方前置条件。

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8080/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-4\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-4\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\fakegmdomhmegokfomgmkbopjibonfcp\2.4.0\dynamic-evidence\flow-4\key-state.png` — Key browser state after replay: http://localhost:8080/page


---
