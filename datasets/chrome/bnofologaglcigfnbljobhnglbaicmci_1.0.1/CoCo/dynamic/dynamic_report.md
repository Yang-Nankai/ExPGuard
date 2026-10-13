# ExPAgent Dynamic Test — bnofologaglcigfnbljobhnglbaicmci v1.0.1

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `amlniicpibbkamfdlmkhbjceaaibcoel`
- Environment: `{'browserUrl': 'http://127.0.0.1:60903', 'runtimeExtensionId': 'amlniicpibbkamfdlmkhbjceaaibcoel', 'beaconBaseUrl': 'http://127.0.0.1:60902', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED.

---

## Flow #0 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_50ecf2426ee1", "url": "http://127.0.0.1:60902/beacon/expa_ca65c585ee18", "data": "EXPAGENT_TEST_expa_50ecf2426ee1", "value": "EXPAGENT_TEST_expa_50ecf2426ee1", "message": "EXPAGENT_TEST_expa_50ecf2426ee1", "title": "EXPAGENT_TEST_expa_50ecf2426ee1", "text": "EXPAGENT_TEST_expa_50ecf2426ee1", "number": "EXPAGENT_TEST_expa_50ecf2426ee1", "name": "EXPAGENT_TEST_expa_50ecf2426ee1", "id": "EXPAGENT_TEST_expa_50ecf2426ee1", "key": "EXPAGENT_TEST_expa_50ecf2426ee1", "type": "EXPAGENT_TEST_expa_50ecf2426ee1", "action": "getTabId", "cmd": "EXPAGENT_TEST_expa_50ecf2426ee1", "Action": "EXPAGENT_TEST_expa_50ecf2426ee1", "Message": "EXPAGENT_TEST_expa_50ecf2426ee1", "fun": "EXPAGENT_TEST_expa_50ecf2426ee1", "auth": "EXPAGENT_TEST_expa_50ecf2426ee1", "phone": "EXPAGENT_TEST_expa_50ecf2426ee1", "email": "EXPAGENT_TEST_expa_50ecf2426ee1", "version": "EXPAGENT_TEST_expa_50ecf2426ee1", "token": "EXPAGENT_TEST_expa_50ecf2426ee1", "content": "EXPAGENT_TEST_expa_50ecf2426ee1", "payload": "EXPAGENT_TEST_expa_50ecf2426ee1", "kind": "EXPAGENT_TEST_expa_50ecf2426ee1", "requestId": "EXPAGENT_TEST_expa_50ecf2426ee1", "revision": "EXPAGENT_TEST_expa_50ecf2426ee1", "textSpeecher": "EXPAGENT_TEST_expa_50ecf2426ee1", "props": "EXPAGENT_TEST_expa_50ecf2426ee1", "speed": "EXPAGENT_TEST_expa_50ecf2426ee1", "params": "EXPAGENT_TEST_expa_50ecf2426ee1"}, {"marker": "EXPAGENT_TEST_expa_50ecf2426ee1", "url": "http://127.0.0.1:60902/beacon/expa_ca65c585ee18", "data": {"marker": "EXPAGENT_TEST_expa_50ecf2426ee1", "url": "http://127.0.0.1:60902/beacon/expa_ca65c585ee18", "value": "EX`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "js/content-script.js", "location": "L70:C1 -> L70:C1", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "/******/ (() => { // webpackBootstrap\nvar __webpack_exports__ = {};\n(() => {\n  const setFonts = () => {\n    const links = [{\n      rel: 'preconnect',\n      href: 'https://fonts.googleapis.com'\n    }, {\n      rel: 'preconnect',\n      href: 'https://fonts.gstatic.com',\n      crossorigin: ''\n    }, {\n      rel: 'stylesheet',\n      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'\n    }];\n    const fragment = document.createDocumentFragment();\n    links.forEach(linkData => {\n      const link = document.createElement('link');\n      Object.keys(linkData).forEach(key => {\n        link[key] = linkData[key];\n      });\n      fragment.appendChild(link);\n    });\n    document.head.appendChild(fragment);\n  };\n  const initWidget = () => {\n    if (!document.head || !document", "notes": ["已从 sink 文件推导消息分发字段 `action` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。"], "discriminatorField": "action", "discriminatorValues": ["getTabId"], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "request", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["textSpeecher", "message", "props", "type", "speed", "params", "text"]}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"__declarativeNetRequest_updateSessionRules__\":true,\"__declarativeNetRequest_updateDynamicRules__\":true,\"fetch\":[{\"ts\":1786849493501,\"request\":{\"redacted\":true,\"length\":66},\"method\":\"POST\",\"body\":{\"redacted\":true,\"length\":36}},{\"ts\":1786849493503,\"request\":{\"redacted\":true,\"length\":66},\"method\":\"POST\",\"body\":{\"redacted\":true,\"leng
beacon={"token": "expa_ca65c585ee18", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:60902/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-2 of 2 (Page 1 of 1).\n0: http://127.0.0.1:60902/page\n1: http://127.0.0.1:60902/page [selected]", "id": "lc_a35e8ba6-ef5a-47d7-bda1-45c65a1866b7"}]
2. `set_sink_breakpoint` js/content-script.js L94:C1 -> L94:C1 -> {"ok": true, "sourceFile": "js/content-script.js", "url": "chrome-extension://amlniicpibbkamfdlmkhbjceaaibcoel/js/content-script.js", "line": 94, "column": 1, "targetHint": "background", "breakpointId": "1:93:1:chrome-extension://amlniicpibbkamfdlmkhbjceaaibcoel/js/content-script.js", "locations": []}
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:60902/page", "input": {"bytes": 1308, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "params", "payload", "phone", "props"], "testMarkers": ["EXPAGENT_TEST_expa_50ecf2426ee1"]}, "result"
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:60902/page", "input": {"bytes": 1739, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "params", "payload", "phone", "props"], "testMarkers": ["EXPAGENT_TEST_expa_50ecf2426ee1"]}, "result"

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:60902/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\bnofologaglcigfnbljobhnglbaicmci\1.0.1\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\bnofologaglcigfnbljobhnglbaicmci\1.0.1\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\bnofologaglcigfnbljobhnglbaicmci\1.0.1\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\bnofologaglcigfnbljobhnglbaicmci\1.0.1\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:60902/page


---
