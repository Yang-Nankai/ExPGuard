# ExPAgent Dynamic Test — claude-toolbox@lugia19.com v2.8.5

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `claude-toolbox@lugia19.com`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'claude-toolbox@lugia19.com', 'beaconBaseUrl': 'http://127.0.0.1:63097', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 1 PARTIAL.

---

## Flow #0 — 🟠 PARTIAL  (reproduced=False, confidence 0.60)

**Reasoning:** The exact static sink recorded a call, but the controlled marker/beacon was not observed in its security-relevant argument.

**Payload:** `[{"type": "EXPAGENT_TEST_expa_df8cdf73e08d", "marker": "EXPAGENT_TEST_expa_df8cdf73e08d", "url": "http://127.0.0.1:63097/beacon/expa_72961435f6a6", "data": "EXPAGENT_TEST_expa_df8cdf73e08d", "value": "EXPAGENT_TEST_expa_df8cdf73e08d", "message": "EXPAGENT_TEST_expa_df8cdf73e08d", "title": "EXPAGENT_TEST_expa_df8cdf73e08d", "text": "EXPAGENT_TEST_expa_df8cdf73e08d", "number": "EXPAGENT_TEST_expa_df8cdf73e08d", "name": "EXPAGENT_TEST_expa_df8cdf73e08d", "id": "EXPAGENT_TEST_expa_df8cdf73e08d", "key": "EXPAGENT_TEST_expa_df8cdf73e08d", "action": "EXPAGENT_TEST_expa_df8cdf73e08d", "cmd": "EXPAGENT_TEST_expa_df8cdf73e08d", "Action": "EXPAGENT_TEST_expa_df8cdf73e08d", "Message": "EXPAGENT_TEST_expa_df8cdf73e08d", "fun": "EXPAGENT_TEST_expa_df8cdf73e08d", "auth": "EXPAGENT_TEST_expa_df8cdf73e08d", "phone": "EXPAGENT_TEST_expa_df8cdf73e08d", "email": "EXPAGENT_TEST_expa_df8cdf73e08d", "version": "EXPAGENT_TEST_expa_df8cdf73e08d", "token": "EXPAGENT_TEST_expa_df8cdf73e08d", "content": "EXPAGENT_TEST_expa_df8cdf73e08d", "payload": "EXPAGENT_TEST_expa_df8cdf73e08d", "kind": "EXPAGENT_TEST_expa_df8cdf73e08d", "requestId": "EXPAGENT_TEST_expa_df8cdf73e08d", "revision": "EXPAGENT_TEST_expa_df8cdf73e08d"}, {"type": "EXPAGENT_TEST_expa_df8cdf73e08d", "marker": "EXPAGENT_TEST_expa_df8cdf73e08d", "url": "http://127.0.0.1:63097/beacon/expa_72961435f6a6", "data": {"marker": "EXPAGENT_TEST_expa_df8cdf73e08d", "url": "http://127.0.0.1:63097/beacon/expa_72961435f6a6", "value": "EXPAGENT_TEST_expa_df8cdf73e08d", "message": "EXPAGENT_TEST_expa_df8cdf73e08d"}, "value": "EXPAGENT_TEST_expa_df8cdf73e0`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content/isolated/tts.js", "location": "L293:C11 -> L293:C26", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"type": "TTS_SYNTH_REQUEST"}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": " result[key];\n\t\t} else {\n\t\t\tconst row = await _settingsDB.settings.get(key);\n\t\t\tif (row && row.value !== undefined) return row.value;\n\t\t}\n\t\treturn _resolveDefault(keyOrDef);\n\t};\n\n\tsettingsRegistry.set = async function (keyOrDef, value) {\n\t\tawait _ready;\n\t\tconst key = _resolveKey(keyOrDef);\n\t\tif (_isLocalKey(keyOrDef)) {\n\t\t\tawait chrome.storage.local.set({ [key]: value });  // chrome.storage.onChanged notifies\n\t\t} else {\n\t\t\tawait _settingsDB.settings.put({ key, value });\n\t\t\t_notifyChange(key, value);\n\t\t}\n\t};\n\n\t// ======== Change listeners ========\n\t// Two backends, one listener map. chrome.storage.onChanged covers the local-flagged keys and\n\t// fires cross-tab for free; IndexedDB has no such event, so writes are announced manually.\n\tconst _changeListeners = {}; // key -> Set<callback>\n\n\tfunction _fireListeners(key, newValue, oldValue) {\n\t\tconst listeners = _changeListeners[key];\n\t\tif (!li", "notes": ["已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-tap-instrument={"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:63097/page", "input": {"bytes": 1155, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_df8cdf73e08d"]}, "result": null}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:63097/page", "input": {"bytes": 1308, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMark

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:63097/page -> {"openedUrl": "http://127.0.0.1:63097/page", "target": {"id": "4ee97389-7ab5-4f49-9528-f39a436f390a", "type": "page", "title": "ExPAgent Sandbox", "url": "http://127.0.0.1:63097/page", "webSocketDebuggerUrl": "ws://127.0.0.1:9222/devtools/p
3. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:63097/page", "input": {"bytes": 1155, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_df8cdf73e08d"]}, "result
4. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:63097/page", "input": {"bytes": 1308, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_df8cdf73e08d"]}, "result
5. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":t

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:63097/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\claude-toolbox@lugia19.com\2.8.5\dynamic-evidence\flow-0\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\claude-toolbox@lugia19.com\2.8.5\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\claude-toolbox@lugia19.com\2.8.5\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.

**Notes:** sinkTapKey=storage.local.set

---
