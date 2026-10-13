# ExPAgent Dynamic Test — {c98e042b-917d-4bdb-b125-dd3ace21ab71} v4.0.1

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `{c98e042b-917d-4bdb-b125-dd3ace21ab71}`
- Environment: `{'browserUrl': 'http://127.0.0.1:63295', 'runtimeExtensionId': '{c98e042b-917d-4bdb-b125-dd3ace21ab71}', 'beaconBaseUrl': 'http://127.0.0.1:63267', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content/hotmail_bridge.js", "location": "L16:C7 -> L16:C11", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "\"use strict\";\nconst extApi = globalThis.browser ?? globalThis.chrome;\n/***********************************************************\nHotmail token bridge (isolated world)\nReceives the captured token from content/hotmail.js (MAIN world)\nvia window.postMessage and relays it to the service worker.\n***********************************************************/\n(function () {\n  const ORIGIN = \"https://outlook.live.com\";\n  const SOURCE = \"xnotifier-hotmail\";\n\n  window.addEventListener(\"message\", function (event) {\n    if (event.source !== window || event.origin !== ORIGIN) return;\n    cons
deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content/hotmail_bridge.js", "location": "L16:C7 -> L16:C11", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "\"use strict\";\nconst extApi = globalThis.browser ?? globalThis.chrome;\n/***********************************************************\nHotmail token bridge (isolated world)\nReceives the captured token from content/hotmail.js (MAIN world)\nvia window.postMessage and relays it to the service worker.\n***********************************************************/\n(function () {\n  const ORIGIN = \"https://outlook.live.com\";\n  const SOURCE = \"xnotifier-hotmail\";\n\n  window.addEventListener(\"message\", function (event) {\n    if (event.source !== window || event.origin !== ORIGIN) return;\n    cons

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:63267/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
