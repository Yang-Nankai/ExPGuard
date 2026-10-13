# ExPAgent Dynamic Test — bcmoplgjpddohaelhnnodojbamdobbhc v1.1.0

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `ohjefjobnidkgbhdpjkdfpopjggojnoj`
- Environment: `{'browserUrl': 'http://127.0.0.1:55362', 'runtimeExtensionId': 'ohjefjobnidkgbhdpjkdfpopjggojnoj', 'beaconBaseUrl': 'http://127.0.0.1:55361', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 60s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "youtube-content.js", "location": "L165:C1 -> L165:C1", "eventNames": ["resize", "mouseenter", "mouseleave", "popstate", "locationchange"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "!function(){\"use strict\";var t='<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\\n<g clip-path=\"url(#clip0_748_2818)\">\\n<path d=\"M6.1875 16.3125H11.8125\" stroke=\"var(--ytt-icon-muted, #414651)\" stroke-width=\"1.6875\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\\n<path d=\"M5.53368 11.7422C4.86499 11.2198 4.32337 10.5527 3.9495 9.79097C3.57563 9.02923 3.37924 8.19267 3.37509 7.34414C3.35821 4.29539 5.81634 1.75781 8.86438 1.6875C10.0456 1.65889 11.2059 2.00299 12.180

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:55361/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
