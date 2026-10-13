# ExPAgent Dynamic Test — hijfnlgdhfpmnckieikhinolopcolofe v3.05.03

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `hkdllfbdbkfhiggmhbihldemheoadlna`
- Environment: `{'browserUrl': 'http://127.0.0.1:53830', 'runtimeExtensionId': 'hkdllfbdbkfhiggmhbihldemheoadlna', 'beaconBaseUrl': 'http://127.0.0.1:57617', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_ca77e11013c8", "url": "http://127.0.0.1:57617/beacon/expa_31aa45575099", "data": "EXPAGENT_TEST_expa_ca77e11013c8", "value": "EXPAGENT_TEST_expa_ca77e11013c8", "message": "EXPAGENT_TEST_expa_ca77e11013c8", "title": "EXPAGENT_TEST_expa_ca77e11013c8", "text": "EXPAGENT_TEST_expa_ca77e11013c8", "number": "EXPAGENT_TEST_expa_ca77e11013c8", "name": "EXPAGENT_TEST_expa_ca77e11013c8", "id": "EXPAGENT_TEST_expa_ca77e11013c8", "key": "EXPAGENT_TEST_expa_ca77e11013c8", "type": "refresh", "action": "EXPAGENT_TEST_expa_ca77e11013c8", "cmd": "EXPAGENT_TEST_expa_ca77e11013c8", "Action": "EXPAGENT_TEST_expa_ca77e11013c8", "Message": "EXPAGENT_TEST_expa_ca77e11013c8", "fun": "EXPAGENT_TEST_expa_ca77e11013c8", "auth": "EXPAGENT_TEST_expa_ca77e11013c8", "phone": "EXPAGENT_TEST_expa_ca77e11013c8", "email": "EXPAGENT_TEST_expa_ca77e11013c8", "version": "EXPAGENT_TEST_expa_ca77e11013c8", "token": "EXPAGENT_TEST_expa_ca77e11013c8", "content": "EXPAGENT_TEST_expa_ca77e11013c8", "payload": "EXPAGENT_TEST_expa_ca77e11013c8", "kind": "EXPAGENT_TEST_expa_ca77e11013c8", "requestId": "EXPAGENT_TEST_expa_ca77e11013c8", "revision": "EXPAGENT_TEST_expa_ca77e11013c8"}, {"marker": "EXPAGENT_TEST_expa_ca77e11013c8", "url": "http://127.0.0.1:57617/beacon/expa_31aa45575099", "data": {"marker": "EXPAGENT_TEST_expa_ca77e11013c8", "url": "http://127.0.0.1:57617/beacon/expa_31aa45575099", "value": "EXPAGENT_TEST_expa_ca77e11013c8", "message": "EXPAGENT_TEST_expa_ca77e11013c8", "type": "refresh"}, "value": "EXPAGENT_TEST_expa_ca77e11013c8", "message": "EXPAGENT_TEST_expa_ca77e11013c8`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "js/content_script.js", "location": "L33:C1 -> L33:C1", "eventNames": ["placeClicked", "unloading", "businessSelectedEvent", "localServiceClickedEvent", "localServiceNewResultsFetchedEvent", "searchEvent"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "(()=>{\"use strict\";var e=function(e,t,l,o){return new(l||(l=Promise))((function(n,i){function r(e){try{s(o.next(e))}catch(e){i(e)}}function a(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof l?t:new l((function(e){e(t)}))).then(r,a)}s((o=o.apply(e,t||[])).next())}))};console.log(\"🔍 GMBSpy: Content script injected on\",window.location.hostname);const t=document.createElement(\"script\");t.src=chrome.runtime.getURL(\"js/script.js\");const l=e=>new Promise((t=>{let l=0;const o=()=>{const n=document.querySelector(e);n?t(n):l<5?(l++,setTimeout(o,1e3)):t(null)};o()})),o=e=>new Promise((t=>{let l=0;const o=()=>{const n=document.querySelectorAll(e);n.length>0?t(Array.from(n)):l<5?(l++,setTimeout(o,1e3)):t([])};o()}));let n=\"\",i=\"\";const r=()=>e(void 0,void 0,void 0,(function*(){var e,t;const l=yield o('c-wiz[data-test-id=\"profile\"]'),n=null==l?void 0:l", "notes": ["已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "type", "discriminatorValues": ["refresh"], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:57617/page", "event": "placeClicked", "input": {"bytes": 1131, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_ca77e11013c8"]}, "result": {"dispatched": true}}
stimulus={"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:57617/page", "event": "placeClicked", "input": {"bytes": 1301, "topLevelKeys": ["Action", "Message", "action", "auth", 

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:57617/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-1 of 1 (Page 1 of 1).\n0: http://127.0.0.1:57617/page [selected]", "id": "lc_5fa13aa9-57d6-480b-a187-2eae45dda3d1"}]
3. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:57617/page", "event": "placeClicked", "input": {"bytes": 1131, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa
4. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:57617/page", "event": "placeClicked", "input": {"bytes": 1301, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa
5. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_crea

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:57617/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hijfnlgdhfpmnckieikhinolopcolofe\3.05.03\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: http://127.0.0.1:57617/page
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hijfnlgdhfpmnckieikhinolopcolofe\3.05.03\dynamic-evidence\flow-0\step-after-trigger.png` — Step `after-trigger`: http://127.0.0.1:57617/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hijfnlgdhfpmnckieikhinolopcolofe\3.05.03\dynamic-evidence\flow-0\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hijfnlgdhfpmnckieikhinolopcolofe\3.05.03\dynamic-evidence\flow-0\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hijfnlgdhfpmnckieikhinolopcolofe\3.05.03\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hijfnlgdhfpmnckieikhinolopcolofe\3.05.03\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hijfnlgdhfpmnckieikhinolopcolofe\3.05.03\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:57617/page

**Notes:** sinkTapKey=storage.local.set

---
