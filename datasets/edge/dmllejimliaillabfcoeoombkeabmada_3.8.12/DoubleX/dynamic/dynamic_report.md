# ExPAgent Dynamic Test — dmllejimliaillabfcoeoombkeabmada v3.8.12

- Browser: `edge`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `jfgnpipbcdnmpeebmipaphmddkihggal`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'jfgnpipbcdnmpeebmipaphmddkihggal', 'beaconBaseUrl': 'http://127.0.0.1:50763', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"source": "EXPAGENT_TEST_expa_e76c50fb6dc9", "marker": "EXPAGENT_TEST_expa_e76c50fb6dc9", "url": "http://127.0.0.1:50763/beacon/expa_588de0f45c36", "data": "EXPAGENT_TEST_expa_e76c50fb6dc9", "value": "EXPAGENT_TEST_expa_e76c50fb6dc9", "message": "EXPAGENT_TEST_expa_e76c50fb6dc9", "title": "EXPAGENT_TEST_expa_e76c50fb6dc9", "text": "EXPAGENT_TEST_expa_e76c50fb6dc9", "number": "EXPAGENT_TEST_expa_e76c50fb6dc9", "name": "EXPAGENT_TEST_expa_e76c50fb6dc9", "id": "EXPAGENT_TEST_expa_e76c50fb6dc9", "key": "EXPAGENT_TEST_expa_e76c50fb6dc9", "type": "EXPAGENT_TEST_expa_e76c50fb6dc9", "action": "EXPAGENT_TEST_expa_e76c50fb6dc9", "cmd": "EXPAGENT_TEST_expa_e76c50fb6dc9", "Action": "EXPAGENT_TEST_expa_e76c50fb6dc9", "Message": "EXPAGENT_TEST_expa_e76c50fb6dc9", "fun": "EXPAGENT_TEST_expa_e76c50fb6dc9", "auth": "EXPAGENT_TEST_expa_e76c50fb6dc9", "phone": "EXPAGENT_TEST_expa_e76c50fb6dc9", "email": "EXPAGENT_TEST_expa_e76c50fb6dc9", "version": "EXPAGENT_TEST_expa_e76c50fb6dc9", "token": "EXPAGENT_TEST_expa_e76c50fb6dc9", "content": "EXPAGENT_TEST_expa_e76c50fb6dc9", "payload": "EXPAGENT_TEST_expa_e76c50fb6dc9", "kind": "EXPAGENT_TEST_expa_e76c50fb6dc9", "requestId": "EXPAGENT_TEST_expa_e76c50fb6dc9", "revision": "EXPAGENT_TEST_expa_e76c50fb6dc9", "cachingTimeMins": "EXPAGENT_TEST_expa_e76c50fb6dc9"}, {"source": "EXPAGENT_TEST_expa_e76c50fb6dc9", "marker": "EXPAGENT_TEST_expa_e76c50fb6dc9", "url": "http://127.0.0.1:50763/beacon/expa_588de0f45c36", "data": {"marker": "EXPAGENT_TEST_expa_e76c50fb6dc9", "url": "http://127.0.0.1:50763/beacon/expa_588de0f45c36", "value": "EXPAGENT_TEST_expa_`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L12057", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"source": "faircado"}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "(() => {\n  var __create = Object.create;\n  var __defProp = Object.defineProperty;\n  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;\n  var __getOwnPropNames = Object.getOwnPropertyNames;\n  var __getProtoOf = Object.getPrototypeOf;\n  var __hasOwnProp = Object.prototype.hasOwnProperty;\n  var __commonJS = (cb, mod) => function __require() {\n    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;\n  };\n  var __copyProps = (to, from, except, desc) => {\n    if (from && typeof from === \"object\" || typeof from === \"function\") {\n      for (let key of __getOwnPropNames(from))\n        if (!__hasOwnProp.call(to, key) && key !== except)\n          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n    }\n    return to;\n  };\n  var __toESM = (mod, isNodeMode, target) => (target = mod != ", "notes": ["已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["source", "type", "cachingTimeMins"]}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"fetch\":[{\"ts\":1786903040443,\"request\":{\"redacted\":true,\"length\":56},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}},{\"ts\":1786903040449,\"request\":{\"redacted\":true,\"length\":56},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}},{\"ts\":1786903046907,\"request\":{\"redacted\":true,\"length\":56},\"method\":\"GET\",\"body\":{\"red
beacon={"token": "expa_588de0f45c36", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:50763/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: chrome-error://chromewebdata/\n1: http://127.0.0.1:50763/page\n2: http://127.0.0.1:50763/page [selected]", "id": "lc_4a979c52-189e-44ee-94b9-eb179
2. `set_sink_breakpoint` content_scripts.js L4399 -> {"ok": true, "sourceFile": "content_scripts.js", "url": "chrome-extension://jfgnpipbcdnmpeebmipaphmddkihggal/content_scripts.js", "line": 1, "column": 0, "targetHint": "content", "breakpointId": "1:0:0:chrome-extension://jfgnpipbcdnmpeebmipaphmddkihggal/content_scripts.js", "locations": []}
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:50763/page", "input": {"bytes": 1250, "topLevelKeys": ["Action", "Message", "action", "auth", "cachingTimeMins", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_e76c50fb6dc9
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:50763/page", "input": {"bytes": 1539, "topLevelKeys": ["Action", "Message", "action", "auth", "cachingTimeMins", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_e76c50fb6dc9

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:50763/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\dmllejimliaillabfcoeoombkeabmada\3.8.12\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\dmllejimliaillabfcoeoombkeabmada\3.8.12\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\dmllejimliaillabfcoeoombkeabmada\3.8.12\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\dmllejimliaillabfcoeoombkeabmada\3.8.12\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:50763/page


---
