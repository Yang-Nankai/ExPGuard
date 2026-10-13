# ExPAgent Dynamic Test — @ffn v8.0.6

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `@ffn`
- Environment: `{'browserUrl': 'http://127.0.0.1:51578', 'runtimeExtensionId': '@ffn', 'beaconBaseUrl': 'http://127.0.0.1:51523', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "contentScript.bundle.js", "location": "", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"type": "inject_fonts_ninja_helpers"}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "(()=>{\"use strict\";const e=\"change_fonts_ninja_icon\",n=\"pong_from_fonts_ninja_extension\",t=\"persist:settings\";let s,o=!1,a=!1,i=!1;const c=()=>{if(a=!a,s){s.style.display=a?\"block\":\"none\";const e=JSON.stringify({isOpen:a});document.dispatchEvent(new CustomEvent(\"fontsninja-ext-opened\",{detail:e}))}};chrome.storage.sync.get(t,(n=>{\"string\"==typeof n[t]&&r(n[t]);const s=n[t];if(s){const n=s.iconIndex;n&&chrome.runtime.sendMessage({message:e,options:{iconIndex:n}})}})),chrome.runtime.onMessage.addListener(((e,n,t)=>\"toggle_fonts_ninja\"===e.message?(o||(()=>{if(window.s

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:51523/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
