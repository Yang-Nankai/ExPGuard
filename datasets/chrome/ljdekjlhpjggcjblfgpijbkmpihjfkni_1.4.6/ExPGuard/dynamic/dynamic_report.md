# ExPAgent Dynamic Test — ljdekjlhpjggcjblfgpijbkmpihjfkni v1.4.6

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `cjepbiebffhcfpcefbpdajcinjmckofa`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'cjepbiebffhcfpcefbpdajcinjmckofa', 'beaconBaseUrl': 'http://127.0.0.1:61859', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_6528129393a6", "url": "http://127.0.0.1:61859/beacon/expa_6990e47717a9", "data": "EXPAGENT_TEST_expa_6528129393a6", "value": "EXPAGENT_TEST_expa_6528129393a6", "message": "EXPAGENT_TEST_expa_6528129393a6", "title": "EXPAGENT_TEST_expa_6528129393a6", "text": "EXPAGENT_TEST_expa_6528129393a6", "number": "EXPAGENT_TEST_expa_6528129393a6", "name": "EXPAGENT_TEST_expa_6528129393a6", "id": "EXPAGENT_TEST_expa_6528129393a6", "key": "EXPAGENT_TEST_expa_6528129393a6", "type": "EXPAGENT_TEST_expa_6528129393a6", "action": "EXPAGENT_TEST_expa_6528129393a6", "cmd": "EXPAGENT_TEST_expa_6528129393a6", "Action": "EXPAGENT_TEST_expa_6528129393a6", "Message": "EXPAGENT_TEST_expa_6528129393a6", "fun": "EXPAGENT_TEST_expa_6528129393a6", "auth": "EXPAGENT_TEST_expa_6528129393a6", "phone": "EXPAGENT_TEST_expa_6528129393a6", "email": "EXPAGENT_TEST_expa_6528129393a6", "version": "EXPAGENT_TEST_expa_6528129393a6", "token": "EXPAGENT_TEST_expa_6528129393a6", "content": "EXPAGENT_TEST_expa_6528129393a6", "payload": "EXPAGENT_TEST_expa_6528129393a6", "kind": "EXPAGENT_TEST_expa_6528129393a6", "requestId": "EXPAGENT_TEST_expa_6528129393a6", "revision": "EXPAGENT_TEST_expa_6528129393a6"}, {"marker": "EXPAGENT_TEST_expa_6528129393a6", "url": "http://127.0.0.1:61859/beacon/expa_6990e47717a9", "data": {"marker": "EXPAGENT_TEST_expa_6528129393a6", "url": "http://127.0.0.1:61859/beacon/expa_6990e47717a9", "value": "EXPAGENT_TEST_expa_6528129393a6", "message": "EXPAGENT_TEST_expa_6528129393a6"}, "value": "EXPAGENT_TEST_expa_6528129393a6", "message": "EXPAGENT_TEST_expa_6528129`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "cts.js", "location": "L1:C1416 -> L1:C1424", "eventNames": ["clogs", "ncache"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&\"object\"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,\"default\",{enumerable:!0,value:t}),2&e&&\"string\"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,\"a\",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p=\"\"", "notes": ["已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-tap-instrument={"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:61859/page", "event": "clogs", "input": {"bytes": 1155, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_6528129393a6"]}, "result": {"dispatched": true}}
stimulus={"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:61859/page", "event": "clogs", "input": {"bytes": 1308, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_6528129

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:61859/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-1 of 1 (Page 1 of 1).\n0: http://127.0.0.1:61859/page [selected]", "id": "lc_75801d5b-c433-42f7-b652-8617f6325a14"}]
3. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:61859/page", "event": "clogs", "input": {"bytes": 1155, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_652812
4. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:61859/page", "event": "clogs", "input": {"bytes": 1308, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_652812
5. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"fetch\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"_

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:61859/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\ljdekjlhpjggcjblfgpijbkmpihjfkni\1.4.6\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: http://127.0.0.1:61859/page
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\ljdekjlhpjggcjblfgpijbkmpihjfkni\1.4.6\dynamic-evidence\flow-0\step-after-trigger.png` — Step `after-trigger`: http://127.0.0.1:61859/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\ljdekjlhpjggcjblfgpijbkmpihjfkni\1.4.6\dynamic-evidence\flow-0\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\ljdekjlhpjggcjblfgpijbkmpihjfkni\1.4.6\dynamic-evidence\flow-0\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\ljdekjlhpjggcjblfgpijbkmpihjfkni\1.4.6\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\ljdekjlhpjggcjblfgpijbkmpihjfkni\1.4.6\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\ljdekjlhpjggcjblfgpijbkmpihjfkni\1.4.6\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:61859/page

**Notes:** sinkTapKey=storage.local.set

---
