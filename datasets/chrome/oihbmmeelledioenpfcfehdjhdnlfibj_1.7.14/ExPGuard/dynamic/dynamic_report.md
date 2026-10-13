# ExPAgent Dynamic Test — oihbmmeelledioenpfcfehdjhdnlfibj v1.7.14

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `fignfifoniblkonapihmkfakmlgkbkcf`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'fignfifoniblkonapihmkfakmlgkbkcf', 'beaconBaseUrl': 'http://localhost:3000', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 3 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #1 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "load_embeds.js", "location": "L1:C465 -> L1:C624", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"EMBED_URL": "http://localhost:3005"}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "const environmentVars={ASSISTANTS_SERVER_URL:\"https://api.meetemily.ai\",GS_POSTS_APP_URL:\"https://posts.growthschool.io\",EMILY_APP_URL:\"https://app.meetemily.ai\",STRAPI_URL:\"https://strapi.meetemily.ai\",MIXPANEL_TOKEN:\"5059bb663c207eecebbdcf902625dd8a\",POSTHOG_TOKEN:\"phc_Ob0VLjGeT04l96UFrfd0mqzU0aFfQH2ct9EGjy9DIPM\",EMBED_URL:\"https://gs-extension-embeds-final.vercel.app\",ENV:\"production\"};window.addEventListener(\"message\",(e=>{e.origin===window.location.origin?chrome.runtime.sendMessage(e.data,(e=>{chrome.runtime.lastError?console.error(chrome.runtime.l

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:3000/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #2 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "load_embeds.js", "location": "L1:C465 -> L1:C624", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"EMBED_URL": "http://localhost:3005"}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "const environmentVars={ASSISTANTS_SERVER_URL:\"https://api.meetemily.ai\",GS_POSTS_APP_URL:\"https://posts.growthschool.io\",EMILY_APP_URL:\"https://app.meetemily.ai\",STRAPI_URL:\"https://strapi.meetemily.ai\",MIXPANEL_TOKEN:\"5059bb663c207eecebbdcf902625dd8a\",POSTHOG_TOKEN:\"phc_Ob0VLjGeT04l96UFrfd0mqzU0aFfQH2ct9EGjy9DIPM\",EMBED_URL:\"https://gs-extension-embeds-final.vercel.app\",ENV:\"production\"};window.addEventListener(\"message\",(e=>{e.origin===window.location.origin?chrome.runtime.sendMessage(e.data,(e=>{chrome.runtime.lastError?console.error(chrome.runtime.l

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:3000/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #6 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "load_embeds.js", "location": "L1:C465 -> L1:C624", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"EMBED_URL": "http://localhost:3005"}, "forwardField": "data", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "const environmentVars={ASSISTANTS_SERVER_URL:\"https://api.meetemily.ai\",GS_POSTS_APP_URL:\"https://posts.growthschool.io\",EMILY_APP_URL:\"https://app.meetemily.ai\",STRAPI_URL:\"https://strapi.meetemily.ai\",MIXPANEL_TOKEN:\"5059bb663c207eecebbdcf902625dd8a\",POSTHOG_TOKEN:\"phc_Ob0VLjGeT04l96UFrfd0mqzU0aFfQH2ct9EGjy9DIPM\",EMBED_URL:\"https://gs-extension-embeds-final.vercel.app\",ENV:\"production\"};window.addEventListener(\"message\",(e=>{e.origin===window.location.origin?chrome.runtime.sendMessage(e.data,(e=>{chrome.runtime.lastError?console.error(chrome.runtime.l

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:3000/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
