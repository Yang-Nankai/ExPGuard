# ExPAgent Dynamic Test — {f044e896-58f6-4398-bab7-f7f89bf91d38} v1.0.4

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `{f044e896-58f6-4398-bab7-f7f89bf91d38}`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': '{f044e896-58f6-4398-bab7-f7f89bf91d38}', 'beaconBaseUrl': 'http://127.0.0.1:56175', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.45)

**Reasoning:** 已按源码契约（含跨 message 分发的判别字段/值）重放最小候选输入，但没有任何 instrumented sink 记录到调用。

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L215:C9 -> L215:C23", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"id": "login-page", "hostname": "www.seedr.cc"}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "\t\t\tlink.removeAttribute('target');\n\t\t\t// Remove all other event listeners\n\t\t\tconst newLink = link.cloneNode(true);\n\t\t\tnewLink.dataset.seedrProcessed = 'true';\n\t\t\tnewLink.addEventListener('click', (e) => {\n\t\t\t\te.preventDefault();\n\t\t\t\te.stopPropagation();\n\t\t\t\taddTorrent(link.href, false);\n\t\t\t});\n\t\t\tlink.parentNode.replaceChild(newLink, link);\n\t\t}\n\t}\n}\n\n// Process new links\nfunction processNewLinks(addedNodes) {\n\taddedNodes.forEach(node => {\n\t\tif (node.nodeType === Node.ELEMENT_NODE) {\n\t\t\tif (node.tagName === 'A') {\n\t\t\t\tprocessLink(node);\n\t\t\t} else {\n\t\t\t\tnode.querySelectorAll('a').forEach(processLink);\n\t\t\t}\n\t\t}\n\t});\n}\n\n// Debounced version of processNewLinks\nconst debouncedProcessNewLinks = debounce(processNewLinks, 250);\n\n// Utility function to create element with classes\nfunction createElement(tag, classes) {\n\tconst element = document.createElement(tag);\n\tif (classes) element.className = ", "notes": ["已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "type", "discriminatorValues": ["open_window", "login", "getStorage"], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "message", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": []}
sink-tap={"error": "no extension target found"}
beacon={"token": "expa_76482676b4cd", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:56175/page -> {"openedUrl": "http://127.0.0.1:56175/page", "target": {"id": "81c2a9b9-142c-4cf4-b932-50461b875347", "type": "page", "title": "ExPAgent Sandbox", "url": "http://127.0.0.1:56175/page", "webSocketDebuggerUrl": "ws://127.0.0.1:9222/devtools/p
2. `set_sink_breakpoint` background L116:C29 -> L119:C8 -> {"ok": false, "sourceFile": "background.js", "url": "moz-extension://{f044e896-58f6-4398-bab7-f7f89bf91d38}/background.js", "line": 116, "column": 29, "targetHint": "background", "breakpointId": "ff-bp-115", "error": "Firefox's page-only bridge cannot attach a breakpoint to an extension background context: Debugger breakpoints are unavaila
3. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:56175/page", "input": {"bytes": 1161, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "hostname", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_6c7883a3f786"]}, "r
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:56175/page", "input": {"bytes": 1155, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "hostname", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_6c7883a3f786"]}, "r
5. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:56175/page", "input": {"bytes": 1160, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "hostname", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_6c7883a3f786"]}, "r
6. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:56175/page", "input": {"bytes": 1335, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "hostname", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_6c7883a3f786"]}, "r
7. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:56175/page", "input": {"bytes": 1323, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "hostname", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_6c7883a3f786"]}, "r
8. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:56175/page", "input": {"bytes": 1333, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "hostname", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId"], "testMarkers": ["EXPAGENT_TEST_expa_6c7883a3f786"]}, "r

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:56175/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_retest_20260817\runs\firefox\{f044e896-58f6-4398-bab7-f7f89bf91d38}\1.0.4\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_retest_20260817\runs\firefox\{f044e896-58f6-4398-bab7-f7f89bf91d38}\1.0.4\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_retest_20260817\runs\firefox\{f044e896-58f6-4398-bab7-f7f89bf91d38}\1.0.4\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.

**Notes:** deepTraceCode=SOURCE_NOT_REACHED

---
