# ExPAgent Dynamic Test — ohjgplijcfdlhdmmdlkigbelaonpdach v1.0.7

- Browser: `edge`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `onfnobmiehblpfdlpinhcanibebgmpdc`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'onfnobmiehblpfdlpinhcanibebgmpdc', 'beaconBaseUrl': 'http://127.0.0.1:57283', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 3 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #3 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "src/ai-bridge.js", "location": "L459:C104 -> L459:C116", "eventNames": ["better-xiaoheihe-ai-settings-request", "better-xiaoheihe-ai-settings-save", "better-xiaoheihe-ai-chat-request", "better-xiaoheihe-ai-model-list-request", "better-xiaoheihe-sanitized-cookie-rule-request", "better-xiaoheihe-ai-bot-runtime-request", "better-xiaoheihe-local-settings-request", "better-xiaoheihe-local-settings-save"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"values": "object"}, "selectors": [], "mediaTags": [], "snippet": ") {\n      return;\n    }\n\n    sendRuntimeMessageSafely({\n      type,\n      detail: detail?.detail || {}\n    }, \"请求失败\", (response) => {\n      window.dispatchEvent(new CustomEvent(AI_BOT_RUNTIME_RESPONSE_EVENT, {\n        detail: stringifyEventDetail({\n   

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:57283/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #4 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "src/ai-bridge.js", "location": "L3702:C2 -> L3766:C4", "eventNames": ["better-xiaoheihe-ai-settings-request", "better-xiaoheihe-ai-settings-save", "better-xiaoheihe-ai-chat-request", "better-xiaoheihe-ai-model-list-request", "better-xiaoheihe-sanitized-cookie-rule-request", "better-xiaoheihe-ai-bot-runtime-request", "better-xiaoheihe-local-settings-request", "better-xiaoheihe-local-settings-save"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "er(AI_SETTINGS_REQUEST_EVENT, readSettings);\n  window.addEventListener(AI_SETTINGS_SAVE_EVENT, (event) => {\n    const nextSettings = normalizeAiSettings(parseEventDetail(event.detail));\n    dispatchSettings(nextSettings);\n    writeStorageLocalSafely({\n      [AI_SETTINGS_STORAGE_

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:57283/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #6 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "src/ai-bridge.js", "location": "L450:C62 -> L450:C74", "eventNames": ["better-xiaoheihe-ai-settings-request", "better-xiaoheihe-ai-settings-save", "better-xiaoheihe-ai-chat-request", "better-xiaoheihe-ai-model-list-request", "better-xiaoheihe-sanitized-cookie-rule-request", "better-xiaoheihe-ai-bot-runtime-request", "better-xiaoheihe-local-settings-request", "better-xiaoheihe-local-settings-save"], "eventTarget": "window", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"values": "object"}, "selectors": [], "mediaTags": [], "snippet": "elease\" : \"activate\";\n    sendRuntimeMessageSafely({\n      type: action === \"release\"\n        ? \"better-xiaoheihe-release-sanitized-comment-cookie\"\n        : \"better-xiaoheihe-activate-sanitized-comment-cookie\",\n      detail: {\n        id,\n        co

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:57283/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
