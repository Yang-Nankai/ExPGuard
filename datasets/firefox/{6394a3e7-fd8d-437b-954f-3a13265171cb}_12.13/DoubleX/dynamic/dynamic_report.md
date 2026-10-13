# ExPAgent Dynamic Test — {6394a3e7-fd8d-437b-954f-3a13265171cb} v12.13

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `{6394a3e7-fd8d-437b-954f-3a13265171cb}`
- Environment: `{'browserUrl': 'http://127.0.0.1:64764', 'runtimeExtensionId': '{6394a3e7-fd8d-437b-954f-3a13265171cb}', 'beaconBaseUrl': 'http://127.0.0.1:64735', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"exId": "EXPAGENT_TEST_expa_56611762f556", "marker": "EXPAGENT_TEST_expa_56611762f556", "url": "http://127.0.0.1:64735/beacon/expa_acffbb691a8c", "data": "EXPAGENT_TEST_expa_56611762f556", "value": "EXPAGENT_TEST_expa_56611762f556", "message": "EXPAGENT_TEST_expa_56611762f556", "title": "EXPAGENT_TEST_expa_56611762f556", "text": "EXPAGENT_TEST_expa_56611762f556", "number": "EXPAGENT_TEST_expa_56611762f556", "name": "EXPAGENT_TEST_expa_56611762f556", "id": "EXPAGENT_TEST_expa_56611762f556", "key": "EXPAGENT_TEST_expa_56611762f556", "type": "EXPAGENT_TEST_expa_56611762f556", "action": "EXPAGENT_TEST_expa_56611762f556", "cmd": "EXPAGENT_TEST_expa_56611762f556", "Action": "EXPAGENT_TEST_expa_56611762f556", "Message": "EXPAGENT_TEST_expa_56611762f556", "fun": "EXPAGENT_TEST_expa_56611762f556", "auth": "EXPAGENT_TEST_expa_56611762f556", "phone": "EXPAGENT_TEST_expa_56611762f556", "email": "EXPAGENT_TEST_expa_56611762f556", "version": "EXPAGENT_TEST_expa_56611762f556", "token": "EXPAGENT_TEST_expa_56611762f556", "content": "EXPAGENT_TEST_expa_56611762f556", "payload": "EXPAGENT_TEST_expa_56611762f556", "kind": "EXPAGENT_TEST_expa_56611762f556", "requestId": "EXPAGENT_TEST_expa_56611762f556", "revision": "EXPAGENT_TEST_expa_56611762f556", "direction": "content-request-icon"}, {"exId": "EXPAGENT_TEST_expa_56611762f556", "marker": "EXPAGENT_TEST_expa_56611762f556", "url": "http://127.0.0.1:64735/beacon/expa_acffbb691a8c", "data": "EXPAGENT_TEST_expa_56611762f556", "value": "EXPAGENT_TEST_expa_56611762f556", "message": "EXPAGENT_TEST_expa_56611762f556", "title": "EXPAGENT_TEST_expa_`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.min.js", "location": "L325", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"exId": "zh-Hans"}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "(()=>{var e={5031(e,t,n){function o(e,t){return new Promise((n,o)=>{const i=document.createElement(\"script\");i.setAttribute(\"type\",\"text/javascript\"),i.setAttribute(\"src\",e),i.async=!1,i.onload=()=>n(),i.onerror=()=>o(new Error(`Failed to load script: ${e}`)),t.appendChild(i)})}e.exports={injectScriptElement:o,waitForPageRuntime:function(e=2e3){const{RUNTIME_READY_EVENT:t}=n(4261);return new Promise(n=>{let i=!1;const s=e=>{i||(i=!0,window.removeEventListener(t,r),clearTimeout(c),n(e))},r=()=>s(!0);window.addEventListener(t,r);const a=document.head||document.documentElement;a&&\"undefined\"!=typeof chrome&&chrome.runtime?.getURL&&o(chrome.runtime.getURL(\"runtimeReadyProbe.min.js\"),a).catch(()=>{});const c=setTimeout(()=>s(!1),e)})},injectStyleSheet:function(e){const t=document.getElementsByTagName(\"head\")[0],n=document.createElement(\"link\");n.setAttribute(\"rel\",\"stylesheet\"),n.setAttribute", "notes": ["已从 sink 文件推导消息分发字段 `direction` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "direction", "discriminatorValues": ["content-request-icon", "content-response-selections"], "urlField": "url", "sinkTapKey": "storage.sync.set", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["direction", "exId"]}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"action.setIcon\"],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"action.setIcon\":[{\"ts\":1786973570702,\"arg\":{\"redacted\":true,\"length\":253}},{\"ts\":1786973579154,\"arg\":{\"redacted\":true,\"length\":253}}]}}"}
beacon={"token": "expa_acffbb691a8c", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:64735/page -> {"openedUrl": "http://127.0.0.1:64735/page", "target": {"id": "b7f7565d-642b-4e79-8d68-a81975cd7438", "type": "page", "title": "ExPAgent Sandbox", "url": "http://127.0.0.1:64735/page", "webSocketDebuggerUrl": "ws://127.0.0.1:64764/devtools/
2. `set_sink_breakpoint` content_scripts.js L2540 -> {"ok": false, "sourceFile": "content_scripts.js", "url": "moz-extension://{6394a3e7-fd8d-437b-954f-3a13265171cb}/content_scripts.js", "line": 1, "column": 0, "targetHint": "content", "breakpointId": "ff-bp-0", "error": "Firefox extension line breakpoints are unavailable in the current RDP-backed bridge: Firefox RDP extension evaluation is availa
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:64735/page", "input": {"bytes": 1231, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "direction", "email", "exId", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_56611762f556"]}, "resul
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:64735/page", "input": {"bytes": 1238, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "direction", "email", "exId", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_56611762f556"]}, "resul
5. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:64735/page", "input": {"bytes": 1460, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "direction", "email", "exId", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_56611762f556"]}, "resul
6. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:64735/page", "input": {"bytes": 1474, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "direction", "email", "exId", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone"], "testMarkers": ["EXPAGENT_TEST_expa_56611762f556"]}, "resul

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:64735/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\DoubleX\runs\firefox\{6394a3e7-fd8d-437b-954f-3a13265171cb}\12.13\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\DoubleX\runs\firefox\{6394a3e7-fd8d-437b-954f-3a13265171cb}\12.13\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\DoubleX\runs\firefox\{6394a3e7-fd8d-437b-954f-3a13265171cb}\12.13\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.


---
