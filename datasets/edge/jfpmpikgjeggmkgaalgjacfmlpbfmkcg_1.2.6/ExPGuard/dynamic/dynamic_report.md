# ExPAgent Dynamic Test — jfpmpikgjeggmkgaalgjacfmlpbfmkcg v1.2.6

- Browser: `edge`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `mfpmjjikjbgibgfagdnmnemlomlpmppo`
- Environment: `{'browserUrl': 'http://127.0.0.1:54844', 'runtimeExtensionId': 'mfpmjjikjbgibgfagdnmnemlomlpmppo', 'beaconBaseUrl': 'http://127.0.0.1:54843', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_0121d37c71e8", "url": "http://127.0.0.1:54843/beacon/expa_afdcea2a47d1", "data": {"url": "http://127.0.0.1:54843/beacon/expa_afdcea2a47d1"}, "value": "EXPAGENT_TEST_expa_0121d37c71e8", "message": "EXPAGENT_TEST_expa_0121d37c71e8", "title": "EXPAGENT_TEST_expa_0121d37c71e8", "text": "EXPAGENT_TEST_expa_0121d37c71e8", "number": "EXPAGENT_TEST_expa_0121d37c71e8", "name": "EXPAGENT_TEST_expa_0121d37c71e8", "id": "EXPAGENT_TEST_expa_0121d37c71e8", "key": "EXPAGENT_TEST_expa_0121d37c71e8", "type": "finalscout:version", "action": "EXPAGENT_TEST_expa_0121d37c71e8", "cmd": "EXPAGENT_TEST_expa_0121d37c71e8", "Action": "EXPAGENT_TEST_expa_0121d37c71e8", "Message": "EXPAGENT_TEST_expa_0121d37c71e8", "fun": "EXPAGENT_TEST_expa_0121d37c71e8", "auth": "EXPAGENT_TEST_expa_0121d37c71e8", "phone": "EXPAGENT_TEST_expa_0121d37c71e8", "email": "EXPAGENT_TEST_expa_0121d37c71e8", "version": "EXPAGENT_TEST_expa_0121d37c71e8", "token": "EXPAGENT_TEST_expa_0121d37c71e8", "content": "EXPAGENT_TEST_expa_0121d37c71e8", "payload": "EXPAGENT_TEST_expa_0121d37c71e8", "kind": "EXPAGENT_TEST_expa_0121d37c71e8", "requestId": "EXPAGENT_TEST_expa_0121d37c71e8", "revision": "EXPAGENT_TEST_expa_0121d37c71e8"}, {"marker": "EXPAGENT_TEST_expa_0121d37c71e8", "url": "http://127.0.0.1:54843/beacon/expa_afdcea2a47d1", "data": {"url": "http://127.0.0.1:54843/beacon/expa_afdcea2a47d1"}, "value": "EXPAGENT_TEST_expa_0121d37c71e8", "message": "EXPAGENT_TEST_expa_0121d37c71e8", "title": "EXPAGENT_TEST_expa_0121d37c71e8", "text": "EXPAGENT_TEST_expa_0121d37c71e8", "number": "EXPAGENT_TEST_exp`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "src/inject.js", "location": "L3:C74565 -> L3:C74566", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "t.inject_position||Object.assign(plugin_context,{inject_position:get_injected_position()});try{s.get(0).contentWindow.postMessage({type:e,callback_id:n,source:\"finalscout:plugin\",data:t,context:plugin_context},\"*\")}catch(e){console.error(\"[FinalScout]: failed to send msg to plugin app\",e)}}}function open_plugin_app(){$(\"body\").hasClass(classes[\"final-scout-window-opened\"])?console.log(\"[FinalScout]: already opened.\"):$(`.${classes[\"final-scout-opener-container\"]}`).click()}function init_opener(e){if($(`.${classes[\"final-scout-opener-container\"]}`).length>0)return;let{init_top:t,drag_min_top:n}=Config.opener||{};const s=$(\"body\");n=Math.max(n,0);const{opener_button_top:i}=e||{},o=`<div class=\"${classes[\"final-scout-opener-container\"]}\">\\n                          <div class=\"${classes[\"final-scout-opener-icon\"]}\"></div>\\n                          <div class=\"${classes[\"final-scout-opener-", "notes": ["已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `data.url`。"], "discriminatorField": "type", "discriminatorValues": ["finalscout:version", "finalscout:li:cookies"], "urlField": "data.url", "sinkTapKey": "tabs.create", "messageAlias": "e", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-breakpoint=armed
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://mfpmjjikjbgibgfagdnmnemlomlpmppo/src/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://mfpmjjikjbgibgfagdnmnemlomlpmppo/src/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://mfpmjjikjbgibgfagdnmnemlomlpmppo/src/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://mfpmjjikjbgibgfagdnmnemlomlpmppo/src/background.js"}, "frames": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"fetch\",\"tabs.sendMessage\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"fetch\":[{\"ts\":1786908710833,\"request\":{\"redacted\":true,\"length\":54},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}},{\"ts\":1786908718504,\"request\":{\"redacted\":true,\"length\":54},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}}],\"tabs.sendMessage\":[{\"ts\":1786908710836,\"arg\":{\"
beacon={"token": "expa_afdcea2a47d1", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:54843/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: http://127.0.0.1:54843/page\n1: chrome-error://chromewebdata/\n2: http://127.0.0.1:54843/page [selected]", "id": "lc_b77ffa3f-63d1-4744-91bb-522c6
2. `set_sink_breakpoint` src/background L3:C23381 -> L3:C23408 -> {"ok": true, "sourceFile": "src/background.js", "url": "chrome-extension://mfpmjjikjbgibgfagdnmnemlomlpmppo/src/background.js", "line": 3, "column": 23381, "targetHint": "background", "breakpointId": "1:2:23381:chrome-extension://mfpmjjikjbgibgfagdnmnemlomlpmppo/src/background.js", "locations": [{"scriptId": "5", "lineNumber": 2, "c
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:54843/page", "input": {"bytes": 1166, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_0121d37c71e8"]}, "r
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:54843/page", "input": {"bytes": 1169, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_0121d37c71e8"]}, "r
5. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:54843/page", "input": {"bytes": 1323, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_0121d37c71e8"]}, "r
6. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:54843/page", "input": {"bytes": 1329, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_0121d37c71e8"]}, "r

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:54843/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\jfpmpikgjeggmkgaalgjacfmlpbfmkcg\1.2.6\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\jfpmpikgjeggmkgaalgjacfmlpbfmkcg\1.2.6\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\jfpmpikgjeggmkgaalgjacfmlpbfmkcg\1.2.6\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\edge\jfpmpikgjeggmkgaalgjacfmlpbfmkcg\1.2.6\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:54843/page


---
