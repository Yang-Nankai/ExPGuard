# ExPAgent Dynamic Test — bkailheklfplleadbokdamfddbenifpf v1.1.0

- Browser: `edge`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `hlideanaefjlkbjgcbpgncceajacpomk`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'hlideanaefjlkbjgcbpgncceajacpomk', 'beaconBaseUrl': 'http://127.0.0.1:53491', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 2 flow(s): 1 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_6633576a116b", "url": "http://127.0.0.1:53491/beacon/expa_2f1e05750a01", "data": "EXPAGENT_TEST_expa_6633576a116b", "value": "EXPAGENT_TEST_expa_6633576a116b", "message": "EXPAGENT_TEST_expa_6633576a116b", "title": "EXPAGENT_TEST_expa_6633576a116b", "text": "EXPAGENT_TEST_expa_6633576a116b", "number": "EXPAGENT_TEST_expa_6633576a116b", "name": "EXPAGENT_TEST_expa_6633576a116b", "id": "EXPAGENT_TEST_expa_6633576a116b", "key": "EXPAGENT_TEST_expa_6633576a116b", "type": "proxy-request", "action": "EXPAGENT_TEST_expa_6633576a116b", "cmd": "EXPAGENT_TEST_expa_6633576a116b", "Action": "EXPAGENT_TEST_expa_6633576a116b", "Message": "EXPAGENT_TEST_expa_6633576a116b", "fun": "EXPAGENT_TEST_expa_6633576a116b", "auth": "EXPAGENT_TEST_expa_6633576a116b", "phone": "EXPAGENT_TEST_expa_6633576a116b", "email": "EXPAGENT_TEST_expa_6633576a116b", "version": "EXPAGENT_TEST_expa_6633576a116b", "token": "EXPAGENT_TEST_expa_6633576a116b", "content": "EXPAGENT_TEST_expa_6633576a116b", "payload": "EXPAGENT_TEST_expa_6633576a116b", "kind": "EXPAGENT_TEST_expa_6633576a116b", "requestId": "EXPAGENT_TEST_expa_6633576a116b", "revision": "EXPAGENT_TEST_expa_6633576a116b", "detail": "EXPAGENT_TEST_expa_6633576a116b", "useForm": {"marker": "EXPAGENT_TEST_expa_6633576a116b", "value": "EXPAGENT_TEST_expa_6633576a116b", "url": "http://127.0.0.1:53491/beacon/expa_2f1e05750a01", "offsetx": "EXPAGENT_TEST_expa_6633576a116b", "offsety": "EXPAGENT_TEST_expa_6633576a116b", "width": 1, "height": 1, "left": 1, "top": 1}}, {"marker": "EXPAGENT_TEST_expa_6633576a116b", "url": "http://127`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "contentLoader.js", "location": "L1:C819 -> L1:C827", "eventNames": ["PriceDogExt"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"url": "/Jwt/Generate"}, "selectors": [], "mediaTags": [], "snippet": "(function(){(function(){const e=document.createElement(\"link\");e.id=\"pricedog-css\",e.rel=\"stylesheet\",e.href=chrome.runtime.getURL(\"/css/content.css\"),document.head.appendChild(e),location.hostname.includes(\".homedepot.com\")&&fetch(chrome.runtime.getURL(\"/css/content.css\")).then((e=>e.text())).then((e=>{const t=document.createElement(\"style\");e=e.replace(/url\\((\\/img\\/[^)]+)\\)/g,(function(e,t){return\"url(\"+chrome.runtime.getURL(t)+\")\"})),t.textContent=e,document.head.appendChild(t)}));const t=document.createElement(\"script\");t.src=chrome.runtime.getURL(\"/content.js\"),document.body.appendChild(t);const r=e=>{const t=new CustomEvent(\"PriceDogExtResponse\",{detail:navigator.userAgent.includes(\"Firefox\")?JSON.stringify(e):e});document.dispatchEvent(t)};document.addEventListener(\"PriceDogExt\",(function(e){const t=e.detail;switch(t.type){case\"proxy-request\":{const e=t.id;chrome.runtime.sendMess", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "type", "discriminatorValues": ["proxy-request", "proxy-request-post"], "urlField": "url", "sinkTapKey": "", "messageAlias": "t", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["detail"]}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:53491/page", "event": "PriceDogExt", "input": {"bytes": 1459, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_6633576a116b"]}, "result": {"dispatched": true}}
stimulus={"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:53491/page", "event": "PriceDogExt", "input": {"bytes": 1464, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail",

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:53491/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-2 of 2 (Page 1 of 1).\n0: http://127.0.0.1:53491/page [selected]\n1: chrome-error://chromewebdata/", "id": "lc_f74db4b9-2ea9-4dfb-8aa8-58d9f6ef72bc"}]
3. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:53491/page", "event": "PriceDogExt", "input": {"bytes": 1459, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_66
4. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:53491/page", "event": "PriceDogExt", "input": {"bytes": 1464, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_66
5. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:53491/page", "event": "PriceDogExt", "input": {"bytes": 1644, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_66
6. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "http://127.0.0.1:53491/page", "event": "PriceDogExt", "input": {"bytes": 1654, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_66
7. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\",\"cookies.set\",\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":t

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:53491/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bkailheklfplleadbokdamfddbenifpf\1.1.0\dynamic-evidence\flow-1\step-source-open.png` — Step `source-open`: http://127.0.0.1:53491/page
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bkailheklfplleadbokdamfddbenifpf\1.1.0\dynamic-evidence\flow-1\step-after-trigger.png` — Step `after-trigger`: http://127.0.0.1:53491/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bkailheklfplleadbokdamfddbenifpf\1.1.0\dynamic-evidence\flow-1\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bkailheklfplleadbokdamfddbenifpf\1.1.0\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bkailheklfplleadbokdamfddbenifpf\1.1.0\dynamic-evidence\flow-1\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\bkailheklfplleadbokdamfddbenifpf\1.1.0\dynamic-evidence\flow-1\key-state.png` — Key browser state after replay: http://127.0.0.1:53491/page

**Notes:** sinkTapKey=

---

## Flow #5 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "contentLoader.js", "location": "L1:C819 -> L1:C827", "eventNames": ["PriceDogExt"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"url": "/Jwt/Generate", "useForm": "www-form"}, "selectors": [], "mediaTags": [], "snippet": "(function(){(function(){const e=document.createElement(\"link\");e.id=\"pricedog-css\",e.rel=\"stylesheet\",e.href=chrome.runtime.getURL(\"/css/content.css\"),document.head.appendChild(e),location.hostname.includes(\".homedepot.com\")&&fetch(chrome.runtime.getURL(\"/css/content.css\")).then((e=>e.text())).then((e=>{const t=document.createElement(\"style\");e=e.replace(/url\\((\\/img\\/[^)]+)\\)/g,(function(e,t){return\"url(\"+chrome.runtime.getURL(t)+\")\"})),t.textContent=e,document.head.appendChild(t)}));const t=document.createElement(\"script\");

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:53491/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
