# ExPAgent Dynamic Test — bckjehjkancjdhpaiakanfinhlapmnnl v2.1.2

- Browser: `edge`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `iikapcgkjjcmfcjpipegmlopneblhbbm`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'iikapcgkjjcmfcjpipegmlopneblhbbm', 'beaconBaseUrl': 'http://127.0.0.1:59948', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "scripts/kpsb-web-auth-bridge.js", "location": "L27", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"email": "string"}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "/**\n * Runs on kpsb-extension-auth page only.\n * Security: strict origin, same-window only, basic JWT shape (token verified server-side).\n */\n(function () {\n  function allowedOrigin(origin) {\n    try {\n      var u = new URL(origin);\n      if (u.protocol !== 'https:') return false;\n      var h = u.hostname.toLowerCase();\n      if (h === 'app.kiddoware.com') return true;\n      if (/^[a-z0-9-]+\\.app\\.kiddoware\\.com$/.test(h)) return true;\n      return false;\n    } catch (e) {\n      return false;\n    }\n  }\n\n  function looksLikeFirebaseIdToken(t) {\n    if (typeof t !== 'stri
deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "scripts/kpsb-web-auth-bridge.js", "location": "L27", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"email": "string"}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "/**\n * Runs on kpsb-extension-auth page only.\n * Security: strict origin, same-window only, basic JWT shape (token verified server-side).\n */\n(function () {\n  function allowedOrigin(origin) {\n    try {\n      var u = new URL(origin);\n      if (u.protocol !== 'https:') return false;\n      var h = u.hostname.toLowerCase();\n      if (h === 'app.kiddoware.com') return true;\n      if (/^[a-z0-9-]+\\.app\\.kiddoware\\.com$/.test(h)) return true;\n      return false;\n    } catch (e) {\n      return false;\n    }\n  }\n\n  function looksLikeFirebaseIdToken(t) {\n    if (typeof t !== 'stri

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:59948/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
