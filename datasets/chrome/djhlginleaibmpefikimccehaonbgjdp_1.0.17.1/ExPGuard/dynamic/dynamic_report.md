# ExPAgent Dynamic Test — djhlginleaibmpefikimccehaonbgjdp v1.0.17.1

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `ancpnhmidfnkdgmjlakcglgbgipgnpbn`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'ancpnhmidfnkdgmjlakcglgbgipgnpbn', 'beaconBaseUrl': 'http://127.0.0.1:49683', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "content/twitch.integrity.bridge.js", "location": "L7:C83 -> L7:C92", "eventNames": ["ggsel:integrity-captured"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"integrity": "string"}, "selectors": [], "mediaTags": [], "snippet": "// Isolated-world bridge: listens for the CustomEvent emitted by the MAIN-world\n// integrity capture script and relays the token to the background service\n// worker, which persists it and triggers a DNR rule rebuild.\n(function () {\n  const EVENT_NAME = 'ggsel:integrity-captured';\n  document.addEventListener(EVENT_NAME, function (ev) {\n    const integrity = ev && ev.detail && typeof ev.detail.integrity === 'string' ? ev.detail.integrity : '';\n    if (!integrity) return;\n    try {\n      chrome.runtime.sendMessage(\n        { type: 'GGSEL

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:49683/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
