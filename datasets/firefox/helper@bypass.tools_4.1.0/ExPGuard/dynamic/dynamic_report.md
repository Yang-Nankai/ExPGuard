# ExPAgent Dynamic Test — helper@bypass.tools v4.1.0

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `helper@bypass.tools`
- Environment: `{'browserUrl': 'http://127.0.0.1:61577', 'runtimeExtensionId': 'helper@bypass.tools', 'beaconBaseUrl': 'http://localhost:13075', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 1 CONFIRMED, 0 PARTIAL, 2 SINK_NOT_FIRED.

---

## Flow #1 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"type": "easx-bypass-success", "data": {"marker": "EXPAGENT_TEST_expa_07dae018a65c", "url": "http://localhost:13075/beacon/expa_47344ca03af7", "data": "EXPAGENT_TEST_expa_07dae018a65c", "value": "EXPAGENT_TEST_expa_07dae018a65c", "message": "EXPAGENT_TEST_expa_07dae018a65c", "title": "EXPAGENT_TEST_expa_07dae018a65c", "text": "EXPAGENT_TEST_expa_07dae018a65c", "number": "EXPAGENT_TEST_expa_07dae018a65c", "name": "EXPAGENT_TEST_expa_07dae018a65c", "id": "EXPAGENT_TEST_expa_07dae018a65c", "key": "EXPAGENT_TEST_expa_07dae018a65c", "type": "GM_xmlhttpRequest", "action": "EXPAGENT_TEST_expa_07dae018a65c", "cmd": "EXPAGENT_TEST_expa_07dae018a65c", "Action": "EXPAGENT_TEST_expa_07dae018a65c", "Message": "EXPAGENT_TEST_expa_07dae018a65c", "fun": "EXPAGENT_TEST_expa_07dae018a65c", "auth": "EXPAGENT_TEST_expa_07dae018a65c", "phone": "EXPAGENT_TEST_expa_07dae018a65c", "email": "EXPAGENT_TEST_expa_07dae018a65c", "version": "EXPAGENT_TEST_expa_07dae018a65c", "token": "EXPAGENT_TEST_expa_07dae018a65c", "content": "EXPAGENT_TEST_expa_07dae018a65c", "payload": "EXPAGENT_TEST_expa_07dae018a65c", "kind": "EXPAGENT_TEST_expa_07dae018a65c", "requestId": "EXPAGENT_TEST_expa_07dae018a65c", "revision": "EXPAGENT_TEST_expa_07dae018a65c"}}, {"type": "easx-bypass-success", "data": {"marker": "EXPAGENT_TEST_expa_07dae018a65c", "url": "http://localhost:13075/beacon/expa_47344ca03af7", "value": "EXPAGENT_TEST_expa_07dae018a65c", "message": "EXPAGENT_TEST_expa_07dae018a65c", "type": "easx-bypass-success", "payload": "EXPAGENT_TEST_expa_07dae018a65c"}}]`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "proxy.js", "location": "L52:C22 -> L52:C37", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"type": "easx-bypass-success"}, "forwardField": "data", "requirements": {"type": "easx-bypass-success"}, "selectors": [], "mediaTags": [], "snippet": "==================================\n// setttttttisegs\n// ==========================================\nconst updateSettingsAttributes = (enabled, secure, waitTime, workink, lootlabs) => {\n    document.documentElement.setAttribute('data-easx-enabled', enabled);\n    document.documentElement.setAttribute('data-easx-secure', secure);\n    document.documentElement.setAttribute('data-easx-wait-time', waitTime);\n    document.documentElement.setAttribute('data-easx-workink', workink);\n    document.documentElement.setAttribute('data-easx-lootlabs', lootlabs);\n    document.documentElement.setAttribute('data-easx-ready', 'true');\n    // im thirsty \n    window.dispatchEvent(new CustomEvent('easx-settings-changed', { detail: { enabled, secure, waitTime, workink, lootlabs } }));\n};\n\n// i drank water so im no longer thirsty\nchrome.storage.local.get(['easxEnabled', 'easxSecureMode', 'easxWaitTime', 'easxWork", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "type", "discriminatorValues": ["GM_xmlhttpRequest"], "urlField": "url", "sinkTapKey": "", "messageAlias": "request", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["type", "payload"]}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"__declarativeNetRequest_updateSessionRules__\":true,\"__declarativeNetRequest_updateDynamicRules__\":true,\"storage.onChanged\":[{\"ts\":1786971689176,\"area\":\"local\",\"changes\":{\"easxBypassCount\":{\"newValue\":1}}},{\"ts\":1786971689625,\"area\":\"local\",\"changes\":{\"easxBypassCount\":{\"oldValue\":1,\"newValue\":2}}},{\"ts\":1786
beacon={"token": "expa_47344ca03af7", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://localhost:13075/page -> {"openedUrl": "http://localhost:13075/page", "target": {"id": "aaa1f7b4-0025-4ae7-a3fc-62eb38001565", "type": "page", "title": "ExPAgent Sandbox", "url": "http://localhost:13075/page", "webSocketDebuggerUrl": "ws://127.0.0.1:61577/devtools/
2. `set_sink_breakpoint` background L53:C31 -> L58:C10 -> {"ok": false, "sourceFile": "background.js", "url": "moz-extension://helper@bypass.tools/background.js", "line": 53, "column": 31, "targetHint": "background", "breakpointId": "ff-bp-52", "error": "Firefox extension line breakpoints are unavailable in the current RDP-backed bridge: Firefox RDP extension evaluation is available, but line brea
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:13075/page", "input": {"bytes": 1179, "topLevelKeys": ["data", "type"], "testMarkers": ["EXPAGENT_TEST_expa_07dae018a65c"]}, "result": null}
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:13075/page", "input": {"bytes": 297, "topLevelKeys": ["data", "type"], "testMarkers": ["EXPAGENT_TEST_expa_07dae018a65c"]}, "result": null}

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:13075/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-1\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-1\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.


---

## Flow #2 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"type": "easx-bypass-success", "data": {"marker": "EXPAGENT_TEST_expa_678f068325c7", "url": "http://localhost:13075/beacon/expa_7d4221c3c5a5", "data": "EXPAGENT_TEST_expa_678f068325c7", "value": "EXPAGENT_TEST_expa_678f068325c7", "message": "EXPAGENT_TEST_expa_678f068325c7", "title": "EXPAGENT_TEST_expa_678f068325c7", "text": "EXPAGENT_TEST_expa_678f068325c7", "number": "EXPAGENT_TEST_expa_678f068325c7", "name": "EXPAGENT_TEST_expa_678f068325c7", "id": "EXPAGENT_TEST_expa_678f068325c7", "key": "EXPAGENT_TEST_expa_678f068325c7", "type": "GM_xmlhttpRequest", "action": "EXPAGENT_TEST_expa_678f068325c7", "cmd": "EXPAGENT_TEST_expa_678f068325c7", "Action": "EXPAGENT_TEST_expa_678f068325c7", "Message": "EXPAGENT_TEST_expa_678f068325c7", "fun": "EXPAGENT_TEST_expa_678f068325c7", "auth": "EXPAGENT_TEST_expa_678f068325c7", "phone": "EXPAGENT_TEST_expa_678f068325c7", "email": "EXPAGENT_TEST_expa_678f068325c7", "version": "EXPAGENT_TEST_expa_678f068325c7", "token": "EXPAGENT_TEST_expa_678f068325c7", "content": "EXPAGENT_TEST_expa_678f068325c7", "payload": "EXPAGENT_TEST_expa_678f068325c7", "kind": "EXPAGENT_TEST_expa_678f068325c7", "requestId": "EXPAGENT_TEST_expa_678f068325c7", "revision": "EXPAGENT_TEST_expa_678f068325c7"}}, {"type": "easx-bypass-success", "data": {"marker": "EXPAGENT_TEST_expa_678f068325c7", "url": "http://localhost:13075/beacon/expa_7d4221c3c5a5", "value": "EXPAGENT_TEST_expa_678f068325c7", "message": "EXPAGENT_TEST_expa_678f068325c7", "type": "easx-bypass-success", "payload": "EXPAGENT_TEST_expa_678f068325c7"}}]`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "proxy.js", "location": "L52:C22 -> L52:C37", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"type": "easx-bypass-success"}, "forwardField": "data", "requirements": {"type": "easx-bypass-success"}, "selectors": [], "mediaTags": [], "snippet": "==================================\n// setttttttisegs\n// ==========================================\nconst updateSettingsAttributes = (enabled, secure, waitTime, workink, lootlabs) => {\n    document.documentElement.setAttribute('data-easx-enabled', enabled);\n    document.documentElement.setAttribute('data-easx-secure', secure);\n    document.documentElement.setAttribute('data-easx-wait-time', waitTime);\n    document.documentElement.setAttribute('data-easx-workink', workink);\n    document.documentElement.setAttribute('data-easx-lootlabs', lootlabs);\n    document.documentElement.setAttribute('data-easx-ready', 'true');\n    // im thirsty \n    window.dispatchEvent(new CustomEvent('easx-settings-changed', { detail: { enabled, secure, waitTime, workink, lootlabs } }));\n};\n\n// i drank water so im no longer thirsty\nchrome.storage.local.get(['easxEnabled', 'easxSecureMode', 'easxWaitTime', 'easxWork", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "type", "discriminatorValues": ["GM_xmlhttpRequest"], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "request", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["type", "payload"]}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"__declarativeNetRequest_updateSessionRules__\":true,\"__declarativeNetRequest_updateDynamicRules__\":true,\"storage.onChanged\":[{\"ts\":1786971689176,\"area\":\"local\",\"changes\":{\"easxBypassCount\":{\"newValue\":1}}},{\"ts\":1786971689625,\"area\":\"local\",\"changes\":{\"easxBypassCount\":{\"oldValue\":1,\"newValue\":2}}},{\"ts\":1786
beacon={"token": "expa_7d4221c3c5a5", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://localhost:13075/page -> {"openedUrl": "http://localhost:13075/page", "target": {"id": "aaa1f7b4-0025-4ae7-a3fc-62eb38001565", "type": "page", "title": "ExPAgent Sandbox", "url": "http://localhost:13075/page", "webSocketDebuggerUrl": "ws://127.0.0.1:61577/devtools/
2. `set_sink_breakpoint` background L53:C31 -> L58:C10 -> {"ok": false, "sourceFile": "background.js", "url": "moz-extension://helper@bypass.tools/background.js", "line": 53, "column": 31, "targetHint": "background", "breakpointId": "ff-bp-52", "error": "Firefox extension line breakpoints are unavailable in the current RDP-backed bridge: Firefox RDP extension evaluation is available, but line brea
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:13075/page", "input": {"bytes": 1179, "topLevelKeys": ["data", "type"], "testMarkers": ["EXPAGENT_TEST_expa_678f068325c7"]}, "result": null}
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:13075/page", "input": {"bytes": 297, "topLevelKeys": ["data", "type"], "testMarkers": ["EXPAGENT_TEST_expa_678f068325c7"]}, "result": null}

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:13075/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 2 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-2\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-2\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.


---

## Flow #3 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_22c57e01437d", "url": "http://localhost:13075/beacon/expa_48abc756d58c", "data": "EXPAGENT_TEST_expa_22c57e01437d", "value": "EXPAGENT_TEST_expa_22c57e01437d", "message": "EXPAGENT_TEST_expa_22c57e01437d", "title": "EXPAGENT_TEST_expa_22c57e01437d", "text": "EXPAGENT_TEST_expa_22c57e01437d", "number": "EXPAGENT_TEST_expa_22c57e01437d", "name": "EXPAGENT_TEST_expa_22c57e01437d", "id": "EXPAGENT_TEST_expa_22c57e01437d", "key": "EXPAGENT_TEST_expa_22c57e01437d", "type": "GM_xmlhttpRequest", "action": "EXPAGENT_TEST_expa_22c57e01437d", "cmd": "EXPAGENT_TEST_expa_22c57e01437d", "Action": "EXPAGENT_TEST_expa_22c57e01437d", "Message": "EXPAGENT_TEST_expa_22c57e01437d", "fun": "EXPAGENT_TEST_expa_22c57e01437d", "auth": "EXPAGENT_TEST_expa_22c57e01437d", "phone": "EXPAGENT_TEST_expa_22c57e01437d", "email": "EXPAGENT_TEST_expa_22c57e01437d", "version": "EXPAGENT_TEST_expa_22c57e01437d", "token": "EXPAGENT_TEST_expa_22c57e01437d", "content": "EXPAGENT_TEST_expa_22c57e01437d", "payload": "EXPAGENT_TEST_expa_22c57e01437d", "kind": "EXPAGENT_TEST_expa_22c57e01437d", "requestId": "EXPAGENT_TEST_expa_22c57e01437d", "revision": "EXPAGENT_TEST_expa_22c57e01437d", "method": "EXPAGENT_TEST_expa_22c57e01437d", "headers": "EXPAGENT_TEST_expa_22c57e01437d"}, {"marker": "EXPAGENT_TEST_expa_22c57e01437d", "url": "http://localhost:13075/beacon/expa_48abc756d58c", "data": {"marker": "EXPAGENT_TEST_expa_22c57e01437d", "url": "http://localhost:13075/beacon/expa_48abc756d58c", "value": "EXPAGENT_TEST_expa_22c57e01437d", "message": "EXPAGENT_TEST_expa_22c57e01437d", "type"`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "proxy.js", "location": "L71:C20 -> L71:C28", "eventNames": ["BypassTools_GM_XHR"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"type": "bt-ext-forward"}, "selectors": [], "mediaTags": [], "snippet": "ent(new CustomEvent('easx-settings-changed', { detail: { enabled, secure, waitTime, workink, lootlabs } }));\n};\n\n// i drank water so im no longer thirsty\nchrome.storage.local.get(['easxEnabled', 'easxSecureMode', 'easxWaitTime', 'easxWorkInkEnabled', 'easxLootLabsEnabled'], (result) => {\n    const enabled  = result.easxEnabled           !== false;\n    const secure   = result.easxSecureMode         !== false;\n    const waitTime = result.easxWaitTime           !== undefined ? result.easxWaitTime : 25;\n    const workink  = result.easxWorkInkEnabled     !== false; // i wont be deleting that\n    const lootlabs = result.easxLootLabsEnabled    !== false; // i wont be deleting that\n    updateSettingsAttributes(enabled, secure, waitTime, workink, lootlabs);\n    if (enabled) console.log('[BypassTools] Proxy initialized in Isolated World');\n});\n\n// listen for the voices of the pepoles who screaming", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "type", "discriminatorValues": ["GM_xmlhttpRequest"], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "request", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["id", "url", "method", "headers", "data"]}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[\"storage.onChanged\"],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "dispatchEvent", "targetUrl": "http://localhost:13075/page", "event": "BypassTools_GM_XHR", "input": {"bytes": 1228, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "headers", "id", "key", "kind", "marker", "message", "method", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_22c57e01437d"]}, "result": null}
stimulus={"action": "dispatchEvent", "targetUrl": "http://localhost:13075/page", "event": "BypassTools_GM_XHR", "input": {"bytes": 1572, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "conten

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[\"storage.onChanged\"],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://localhost:13075/page -> {"openedUrl": "http://localhost:13075/page", "target": {"id": "aaa1f7b4-0025-4ae7-a3fc-62eb38001565", "type": "page", "title": "ExPAgent Sandbox", "url": "http://localhost:13075/page", "webSocketDebuggerUrl": "ws://127.0.0.1:61577/devtools/
3. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://localhost:13075/page", "event": "BypassTools_GM_XHR", "input": {"bytes": 1228, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "headers", "id", "key", "kind", "marker", "message", "method", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_ex
4. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://localhost:13075/page", "event": "BypassTools_GM_XHR", "input": {"bytes": 1572, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "headers", "id", "key", "kind", "marker", "message", "method", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_ex
5. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\",\"fetch\"],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onCha

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:13075/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 2 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-3\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-3\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-3\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\helper@bypass.tools\4.1.0\dynamic-evidence\flow-3\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.

**Notes:** sinkTapKey=fetch

---
