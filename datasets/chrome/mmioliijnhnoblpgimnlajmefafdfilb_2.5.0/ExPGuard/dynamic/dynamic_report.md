# ExPAgent Dynamic Test — mmioliijnhnoblpgimnlajmefafdfilb v2.5.0

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `mmioliijnhnoblpgimnlajmefafdfilb`
- Environment: `{'browserUrl': 'http://127.0.0.1:54042', 'runtimeExtensionId': 'mmioliijnhnoblpgimnlajmefafdfilb', 'beaconBaseUrl': 'http://127.0.0.1:54041', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_3f597410c82a", "url": "http://127.0.0.1:54041/beacon/expa_bfc84d8b6c2f", "data": "EXPAGENT_TEST_expa_3f597410c82a", "value": "EXPAGENT_TEST_expa_3f597410c82a", "message": "EXPAGENT_TEST_expa_3f597410c82a", "title": "EXPAGENT_TEST_expa_3f597410c82a", "text": "EXPAGENT_TEST_expa_3f597410c82a", "number": "EXPAGENT_TEST_expa_3f597410c82a", "name": "EXPAGENT_TEST_expa_3f597410c82a", "id": "EXPAGENT_TEST_expa_3f597410c82a", "key": "amconnect", "type": "EXPAGENT_TEST_expa_3f597410c82a", "action": "EXPAGENT_TEST_expa_3f597410c82a", "cmd": "EXPAGENT_TEST_expa_3f597410c82a", "Action": "EXPAGENT_TEST_expa_3f597410c82a", "Message": "EXPAGENT_TEST_expa_3f597410c82a", "fun": "EXPAGENT_TEST_expa_3f597410c82a", "auth": "EXPAGENT_TEST_expa_3f597410c82a", "phone": "EXPAGENT_TEST_expa_3f597410c82a", "email": "EXPAGENT_TEST_expa_3f597410c82a", "version": "EXPAGENT_TEST_expa_3f597410c82a", "token": "EXPAGENT_TEST_expa_3f597410c82a", "content": "EXPAGENT_TEST_expa_3f597410c82a", "payload": "EXPAGENT_TEST_expa_3f597410c82a", "kind": "EXPAGENT_TEST_expa_3f597410c82a", "requestId": "EXPAGENT_TEST_expa_3f597410c82a", "revision": "EXPAGENT_TEST_expa_3f597410c82a"}, {"marker": "EXPAGENT_TEST_expa_3f597410c82a", "url": "http://127.0.0.1:54041/beacon/expa_bfc84d8b6c2f", "data": {"marker": "EXPAGENT_TEST_expa_3f597410c82a", "url": "http://127.0.0.1:54041/beacon/expa_bfc84d8b6c2f", "value": "EXPAGENT_TEST_expa_3f597410c82a", "message": "EXPAGENT_TEST_expa_3f597410c82a", "key": "amconnect"}, "value": "EXPAGENT_TEST_expa_3f597410c82a", "message": "EXPAGENT_TEST_expa_3f597410c`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "contentScript.bundle.js", "location": "L1:C497 -> L1:C505", "eventNames": ["contentscript_host:storageChange"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"key": "amconnect"}, "selectors": [], "mediaTags": [], "snippet": "chrome.storage.sync.get([\"amconnect\"],(e=>{e||window.localStorage.removeItem(\"amconnect\")})),chrome.runtime.onMessage.addListener(((e,t,n)=>{let{eventType:o,key:c,data:a}=e;if(\"storage\"===o&&\"amconnect\"===c&&!a){window.localStorage.removeItem(\"amconnect\");let e=new CustomEvent(\"contentscript:storageChange\",{detail:{eventType:\"removed\",key:c}});document.dispatchEvent(e)}return n({success:!0}),!0})),document.addEventListener(\"contentscript_host:storageChange\",(e=>{let{eventType:t,key:n,data:o}=e.detail;\"amconnect\"===n&&(\"removed\"===t?chrome.storage.sync.remove(n):chrome.storage.sync.set(o,(()=>{})))}));", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "storage.sync.set", "messageAlias": "e", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-tap-instrument={"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:54041/page", "event": "contentscript_host:storageChange", "input": {"bytes": 1133, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_3f597410c82a"]}, "result": {"dispatched": true}}
stimulus={"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:54041/page", "event": "contentscript_host:storageChange", "input": {"bytes": 1304, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_3f597410c82a"]}, "result": {"dispatched": true}}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__fun

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:54041/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-1 of 1 (Page 1 of 1).\n0: http://127.0.0.1:54041/page [selected]", "id": "lc_bbd9176a-e8c9-4642-96bd-a6fc36a25776"}]
3. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:54041/page", "event": "contentscript_host:storageChange", "input": {"bytes": 1133, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": 
4. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:54041/page", "event": "contentscript_host:storageChange", "input": {"bytes": 1304, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": 
5. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_crea

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:54041/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mmioliijnhnoblpgimnlajmefafdfilb\2.5.0\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: http://127.0.0.1:54041/page
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mmioliijnhnoblpgimnlajmefafdfilb\2.5.0\dynamic-evidence\flow-0\step-after-trigger.png` — Step `after-trigger`: http://127.0.0.1:54041/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mmioliijnhnoblpgimnlajmefafdfilb\2.5.0\dynamic-evidence\flow-0\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mmioliijnhnoblpgimnlajmefafdfilb\2.5.0\dynamic-evidence\flow-0\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mmioliijnhnoblpgimnlajmefafdfilb\2.5.0\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mmioliijnhnoblpgimnlajmefafdfilb\2.5.0\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.

**Notes:** sinkTapKey=storage.sync.set

---
