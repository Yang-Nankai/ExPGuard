# ExPAgent Dynamic Test — lmphiinjkobfnpifgpcggcpicomibhpp v0.7

- Browser: `edge`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `paainbpbabnilcgmlipnadojdlglgepp`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'paainbpbabnilcgmlipnadojdlglgepp', 'beaconBaseUrl': 'http://localhost:5000', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_c26e45ef94df", "url": "http://localhost:5000/beacon/expa_9e7d72f15fcc", "data": "send-cc-contribute", "value": "EXPAGENT_TEST_expa_c26e45ef94df", "message": "EXPAGENT_TEST_expa_c26e45ef94df", "title": "EXPAGENT_TEST_expa_c26e45ef94df", "text": "EXPAGENT_TEST_expa_c26e45ef94df", "number": "EXPAGENT_TEST_expa_c26e45ef94df", "name": "EXPAGENT_TEST_expa_c26e45ef94df", "id": "EXPAGENT_TEST_expa_c26e45ef94df", "key": "EXPAGENT_TEST_expa_c26e45ef94df", "type": "EXPAGENT_TEST_expa_c26e45ef94df", "action": "EXPAGENT_TEST_expa_c26e45ef94df", "cmd": "EXPAGENT_TEST_expa_c26e45ef94df", "Action": "EXPAGENT_TEST_expa_c26e45ef94df", "Message": "EXPAGENT_TEST_expa_c26e45ef94df", "fun": "EXPAGENT_TEST_expa_c26e45ef94df", "auth": "EXPAGENT_TEST_expa_c26e45ef94df", "phone": "EXPAGENT_TEST_expa_c26e45ef94df", "email": "EXPAGENT_TEST_expa_c26e45ef94df", "version": "EXPAGENT_TEST_expa_c26e45ef94df", "token": "EXPAGENT_TEST_expa_c26e45ef94df", "content": "EXPAGENT_TEST_expa_c26e45ef94df", "payload": "EXPAGENT_TEST_expa_c26e45ef94df", "kind": "EXPAGENT_TEST_expa_c26e45ef94df", "requestId": "EXPAGENT_TEST_expa_c26e45ef94df", "revision": "EXPAGENT_TEST_expa_c26e45ef94df", "exId": "EXPAGENT_TEST_expa_c26e45ef94df", "direction": "EXPAGENT_TEST_expa_c26e45ef94df"}, {"marker": "EXPAGENT_TEST_expa_c26e45ef94df", "url": "http://localhost:5000/beacon/expa_9e7d72f15fcc", "data": "send-cc-progress", "value": "EXPAGENT_TEST_expa_c26e45ef94df", "message": "EXPAGENT_TEST_expa_c26e45ef94df", "title": "EXPAGENT_TEST_expa_c26e45ef94df", "text": "EXPAGENT_TEST_expa_c26e45ef94df", "num`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.min.js", "location": "L1:C1 -> L1:C1", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "!function(e){var t={};function o(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,o),c.l=!0,c.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&\"object\"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,\"default\",{enumerable:!0,value:e}),2&t&&\"string\"!=typeof e)for(var c in e)o.d(r,c,function(t){return e[t]}.bind(null,c));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,\"a\",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p=\"\"", "notes": ["已从 sink 文件推导消息分发字段 `data` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。"], "discriminatorField": "data", "discriminatorValues": ["send-cc-contribute", "send-cc-progress"], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["exId", "direction", "message"]}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"action.setIcon\",\"fetch\",\"storage.sync.set\",\"action.setBadgeText\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"action.setIcon\":[{\"ts\":1786904034968,\"arg\":{\"redacted\":true,\"length\":262}},{\"ts\":1786904035720,\"arg\":{\"redacted\":true,\"length\":262}},{\"ts\":1786904062916,\"arg\":{\"redacted\":true,\"length\":262}}],\"fetch\":[{\"ts\":1786904034969,\"request\":{\"redacted\":true,\"length\":20},\"method\":
beacon={"token": "expa_9e7d72f15fcc", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://localhost:5000/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: http://localhost:5000/page\n1: http://127.0.0.1:62282/page\n2: http://localhost:5000/page [selected]", "id": "lc_322208e5-a7aa-4415-a210-f5c4fb91f
2. `set_sink_breakpoint` content.min.js L1:C1 -> L1:C1 -> {"ok": true, "sourceFile": "content.min.js", "url": "chrome-extension://paainbpbabnilcgmlipnadojdlglgepp/content.min.js", "line": 1, "column": 1, "targetHint": "background", "breakpointId": "1:0:1:chrome-extension://paainbpbabnilcgmlipnadojdlglgepp/content.min.js", "locations": []}
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:5000/page", "input": {"bytes": 1228, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "direction", "email", "exId", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_c26e45ef94df"]}, "result
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:5000/page", "input": {"bytes": 1226, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "direction", "email", "exId", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_c26e45ef94df"]}, "result
5. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:5000/page", "input": {"bytes": 1508, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "direction", "email", "exId", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_c26e45ef94df"]}, "result
6. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://localhost:5000/page", "input": {"bytes": 1506, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "direction", "email", "exId", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_c26e45ef94df"]}, "result

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:5000/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\lmphiinjkobfnpifgpcggcpicomibhpp\0.7\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\lmphiinjkobfnpifgpcggcpicomibhpp\0.7\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\lmphiinjkobfnpifgpcggcpicomibhpp\0.7\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\lmphiinjkobfnpifgpcggcpicomibhpp\0.7\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://localhost:5000/page


---
