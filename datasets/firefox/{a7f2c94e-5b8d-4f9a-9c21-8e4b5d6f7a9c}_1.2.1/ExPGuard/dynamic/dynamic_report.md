# ExPAgent Dynamic Test — {a7f2c94e-5b8d-4f9a-9c21-8e4b5d6f7a9c} v1.2.1

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `{a7f2c94e-5b8d-4f9a-9c21-8e4b5d6f7a9c}`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': '{a7f2c94e-5b8d-4f9a-9c21-8e4b5d6f7a9c}', 'beaconBaseUrl': 'http://127.0.0.1:55271', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 SINK_NOT_FIRED, 2 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #2 — SINK NOT FIRED  (reproduced=False, confidence 0.85)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing.

**Payload:** `[{"data": {"marker": "EXPAGENT_TEST_expa_933940d160c5", "url": "http://127.0.0.1:55271/beacon/expa_6b891d0ea376", "data": "EXPAGENT_TEST_expa_933940d160c5", "value": "EXPAGENT_TEST_expa_933940d160c5", "message": "EXPAGENT_TEST_expa_933940d160c5", "title": "EXPAGENT_TEST_expa_933940d160c5", "text": "EXPAGENT_TEST_expa_933940d160c5", "number": "EXPAGENT_TEST_expa_933940d160c5", "name": "EXPAGENT_TEST_expa_933940d160c5", "id": "EXPAGENT_TEST_expa_933940d160c5", "key": "EXPAGENT_TEST_expa_933940d160c5", "type": "EXPAGENT_TEST_expa_933940d160c5", "action": "EXPAGENT_TEST_expa_933940d160c5", "cmd": "EXPAGENT_TEST_expa_933940d160c5", "Action": "EXPAGENT_TEST_expa_933940d160c5", "Message": "EXPAGENT_TEST_expa_933940d160c5", "fun": "EXPAGENT_TEST_expa_933940d160c5", "auth": "EXPAGENT_TEST_expa_933940d160c5", "phone": "EXPAGENT_TEST_expa_933940d160c5", "email": "EXPAGENT_TEST_expa_933940d160c5", "version": "EXPAGENT_TEST_expa_933940d160c5", "token": "EXPAGENT_TEST_expa_933940d160c5", "content": "EXPAGENT_TEST_expa_933940d160c5", "payload": "EXPAGENT_TEST_expa_933940d160c5", "kind": "EXPAGENT_TEST_expa_933940d160c5", "requestId": "EXPAGENT_TEST_expa_933940d160c5", "revision": "EXPAGENT_TEST_expa_933940d160c5"}}, {"data": {"marker": "EXPAGENT_TEST_expa_933940d160c5", "url": "http://127.0.0.1:55271/beacon/expa_6b891d0ea376", "value": "EXPAGENT_TEST_expa_933940d160c5", "message": "EXPAGENT_TEST_expa_933940d160c5"}}]`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L79:C11 -> L79:C37", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "function parseArticleContent(proxySite) {\n    var articleData = {};\n    var contentNodes = document.querySelectorAll('[data-article]');\n    contentNodes.forEach(function(node) {\n        var key = node.dataset.article;\n        articleData[key] = node.textContent.trim();\n    });\n    return proxySite ? Object.keys(articleData) : articleData;\n}\n\nfunction unlockSiteResources(unlockTimer) {\n    var resources = document.querySelectorAll('[data-locked]');\n    resources.forEach(function(res) {\n        res.removeAttribute('data-locked');\n        res.classList.remove('locked');\n    });\n    return unlockTimer ? resources.length : true;\n}\n\nfunction removeFilteredItems(unlockTimer) {\n\tvar d = new Date();\n\treturn  unlockTimer ? d.getTime() : d.toLocaleTimeString();\n}\nfunction unlockSignatureKey(unlockTimer) {\n\treturn  unlockTimer && Object.values(unlockTimer) || Object.keys(rootSite);\n}\n\nfunction extra", "notes": ["已从 sink 调用推导 URL 承载字段 `url`。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "msg", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-tap={"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"__declarativeNetRequest_updateSessionRules__\":true,\"__declarativeNetRequest_updateDynamicRules__\":true,\"storage.onChanged\":[{\"ts\":1786964273650,\"area\":\"local\",\"changes\":{\"e31qqwdw\":{\"newValue\":519}}}]}}"}
beacon={"token": "expa_6b891d0ea376", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:55271/page -> {"openedUrl": "http://127.0.0.1:55271/page", "target": {"id": "715317ae-4d03-4d81-8cd4-cc5ea0b2953f", "type": "page", "title": "ExPAgent Sandbox", "url": "http://127.0.0.1:55271/page", "webSocketDebuggerUrl": "ws://127.0.0.1:9222/devtools/p
2. `set_sink_breakpoint` background L39:C2 -> L39:C41 -> {"ok": false, "sourceFile": "background.js", "url": "moz-extension://{a7f2c94e-5b8d-4f9a-9c21-8e4b5d6f7a9c}/background.js", "line": 39, "column": 2, "targetHint": "background", "breakpointId": "ff-bp-38", "error": "Firefox extension line breakpoints are unavailable in the current RDP-backed bridge: Firefox RDP extension evaluation is availab
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:55271/page", "input": {"bytes": 1164, "topLevelKeys": ["data"], "testMarkers": ["EXPAGENT_TEST_expa_933940d160c5"]}, "result": null}
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:55271/page", "input": {"bytes": 195, "topLevelKeys": ["data"], "testMarkers": ["EXPAGENT_TEST_expa_933940d160c5"]}, "result": null}

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:55271/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\{a7f2c94e-5b8d-4f9a-9c21-8e4b5d6f7a9c}\1.2.1\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\{a7f2c94e-5b8d-4f9a-9c21-8e4b5d6f7a9c}\1.2.1\dynamic-evidence\flow-2\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\{a7f2c94e-5b8d-4f9a-9c21-8e4b5d6f7a9c}\1.2.1\dynamic-evidence\flow-2\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.


---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L79:C11 -> L79:C37", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "function parseArticleContent(proxySite) {\n    var articleData = {};\n    var contentNodes = document.querySelectorAll('[data-article]');\n    contentNodes.forEach(function(node) {\n        var key = node.dataset.article;\n        articleData[key] = node.textContent.trim();\n    });\n    return proxySite ? Object.keys(articleData) : articleData;\n}\n\nfunction unlockSiteResources(unlockTimer) {\n    var resources = document.querySelectorAll('[data-locked]');\n    resources.forEach(function(res) {\n        res.removeAttribute('data-locked');\n        res.classList.remove('locked');\n    });\n    return unlockTi
deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L79:C11 -> L79:C37", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "function parseArticleContent(proxySite) {\n    var articleData = {};\n    var contentNodes = document.querySelectorAll('[data-article]');\n    contentNodes.forEach(function(node) {\n        var key = node.dataset.article;\n        articleData[key] = node.textContent.trim();\n    });\n    return proxySite ? Object.keys(articleData) : articleData;\n}\n\nfunction unlockSiteResources(unlockTimer) {\n    var resources = document.querySelectorAll('[data-locked]');\n    resources.forEach(function(res) {\n        res.removeAttribute('data-locked');\n        res.classList.remove('locked');\n    });\n    return unlockTi

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:55271/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #1 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L79:C11 -> L79:C37", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "function parseArticleContent(proxySite) {\n    var articleData = {};\n    var contentNodes = document.querySelectorAll('[data-article]');\n    contentNodes.forEach(function(node) {\n        var key = node.dataset.article;\n        articleData[key] = node.textContent.trim();\n    });\n    return proxySite ? Object.keys(articleData) : articleData;\n}\n\nfunction unlockSiteResources(unlockTimer) {\n    var resources = document.querySelectorAll('[data-locked]');\n    resources.forEach(function(res) {\n        res.removeAttribute('data-locked');\n        res.classList.remove('locked');\n    });\n    return unlockTi
deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L79:C11 -> L79:C37", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "function parseArticleContent(proxySite) {\n    var articleData = {};\n    var contentNodes = document.querySelectorAll('[data-article]');\n    contentNodes.forEach(function(node) {\n        var key = node.dataset.article;\n        articleData[key] = node.textContent.trim();\n    });\n    return proxySite ? Object.keys(articleData) : articleData;\n}\n\nfunction unlockSiteResources(unlockTimer) {\n    var resources = document.querySelectorAll('[data-locked]');\n    resources.forEach(function(res) {\n        res.removeAttribute('data-locked');\n        res.classList.remove('locked');\n    });\n    return unlockTi

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:55271/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
