# ExPAgent Dynamic Test — bcmoplgjpddohaelhnnodojbamdobbhc v1.1.0

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `cndhfmghejcdgpkjjolnbhaghceddfkb`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'cndhfmghejcdgpkjjolnbhaghceddfkb', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:59770', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://youtubetotranscript.com:59770'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 59770, 'hosts': ['youtubetotranscript.com'], 'files': ['background.js', 'extension-content.js', 'popup.js', 'welcome.js', 'youtube-content.js'], 'replacements': 15}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 3 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 45s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "extension-content.js", "location": "L1:C202 -> L1:C213", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {"type": "EXTENSION_REQUEST_TOKENS"}, "selectors": [], "mediaTags": [], "snippet": "!function(){\"use strict\";window.addEventListener(\"message\",function(e){if(\"https://youtubetotranscript.com:59770\"===e.origin||e.origin.startsWith(\"http://localhost:\")){if(e.data&&\"EXTENSION_REQUEST_TOKENS\"===e.data.type)try{chrome.storage.local.get([\"token\",\"refreshToken\",\"isLoggedIn\",\"expiresAt\"],function(t){chrome.runtime.lastError||window.postMessage({type:\"EXTENSION_TOKENS\",token:t.token||null,refresh_token:t.refreshToken||null,isLoggedIn:!!t.isLoggedIn,expiresAt:t.expiresAt||null},e.origin)})}catch(e){}if(e.data&&\"EXTENSION_AUTH_SUCCESS\"===e.da
deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "extension-content.js", "location": "L1:C202 -> L1:C213", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {"type": "EXTENSION_REQUEST_TOKENS"}, "selectors": [], "mediaTags": [], "snippet": "!function(){\"use strict\";window.addEventListener(\"message\",function(e){if(\"https://youtubetotranscript.com:59770\"===e.origin||e.origin.startsWith(\"http://localhost:\")){if(e.data&&\"EXTENSION_REQUEST_TOKENS\"===e.data.type)try{chrome.storage.local.get([\"token\",\"refreshToken\",\"isLoggedIn\",\"expiresAt\"],function(t){chrome.runtime.lastError||window.postMessage({type:\"EXTENSION_TOKENS\",token:t.token||null,refresh_token:t.refreshToken||null,isLoggedIn:!!t.isLoggedIn,expiresAt:t.expiresAt||null},e.origin)})}catch(e){}if(e.data&&\"EXTENSION_AUTH_SUCCESS\"===e.da

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://youtubetotranscript.com:59770/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #1 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 45s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "extension-content.js", "location": "L1:C202 -> L1:C213", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {"type": "EXTENSION_REQUEST_TOKENS"}, "selectors": [], "mediaTags": [], "snippet": "!function(){\"use strict\";window.addEventListener(\"message\",function(e){if(\"https://youtubetotranscript.com:59770\"===e.origin||e.origin.startsWith(\"http://localhost:\")){if(e.data&&\"EXTENSION_REQUEST_TOKENS\"===e.data.type)try{chrome.storage.local.get([\"token\",\"refreshToken\",\"isLoggedIn\",\"expiresAt\"],function(t){chrome.runtime.lastError||window.postMessage({type:\"EXTENSION_TOKENS\",token:t.token||null,refresh_token:t.refreshToken||null,isLoggedIn:!!t.isLoggedIn,expiresAt:t.expiresAt||null},e.origin)})}catch(e){}if(e.data&&\"EXTENSION_AUTH_SUCCESS\"===e.da
deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "extension-content.js", "location": "L1:C202 -> L1:C213", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {"type": "EXTENSION_REQUEST_TOKENS"}, "selectors": [], "mediaTags": [], "snippet": "!function(){\"use strict\";window.addEventListener(\"message\",function(e){if(\"https://youtubetotranscript.com:59770\"===e.origin||e.origin.startsWith(\"http://localhost:\")){if(e.data&&\"EXTENSION_REQUEST_TOKENS\"===e.data.type)try{chrome.storage.local.get([\"token\",\"refreshToken\",\"isLoggedIn\",\"expiresAt\"],function(t){chrome.runtime.lastError||window.postMessage({type:\"EXTENSION_TOKENS\",token:t.token||null,refresh_token:t.refreshToken||null,isLoggedIn:!!t.isLoggedIn,expiresAt:t.expiresAt||null},e.origin)})}catch(e){}if(e.data&&\"EXTENSION_AUTH_SUCCESS\"===e.da

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://youtubetotranscript.com:59770/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #2 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 45s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "extension-content.js", "location": "L1:C202 -> L1:C213", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {"type": "EXTENSION_REQUEST_TOKENS"}, "selectors": [], "mediaTags": [], "snippet": "!function(){\"use strict\";window.addEventListener(\"message\",function(e){if(\"https://youtubetotranscript.com:59770\"===e.origin||e.origin.startsWith(\"http://localhost:\")){if(e.data&&\"EXTENSION_REQUEST_TOKENS\"===e.data.type)try{chrome.storage.local.get([\"token\",\"refreshToken\",\"isLoggedIn\",\"expiresAt\"],function(t){chrome.runtime.lastError||window.postMessage({type:\"EXTENSION_TOKENS\",token:t.token||null,refresh_token:t.refreshToken||null,isLoggedIn:!!t.isLoggedIn,expiresAt:t.expiresAt||null},e.origin)})}catch(e){}if(e.data&&\"EXTENSION_AUTH_SUCCESS\"===e.da
deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "extension-content.js", "location": "L1:C202 -> L1:C213", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {"type": "EXTENSION_REQUEST_TOKENS"}, "selectors": [], "mediaTags": [], "snippet": "!function(){\"use strict\";window.addEventListener(\"message\",function(e){if(\"https://youtubetotranscript.com:59770\"===e.origin||e.origin.startsWith(\"http://localhost:\")){if(e.data&&\"EXTENSION_REQUEST_TOKENS\"===e.data.type)try{chrome.storage.local.get([\"token\",\"refreshToken\",\"isLoggedIn\",\"expiresAt\"],function(t){chrome.runtime.lastError||window.postMessage({type:\"EXTENSION_TOKENS\",token:t.token||null,refresh_token:t.refreshToken||null,isLoggedIn:!!t.isLoggedIn,expiresAt:t.expiresAt||null},e.origin)})}catch(e){}if(e.data&&\"EXTENSION_AUTH_SUCCESS\"===e.da

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://youtubetotranscript.com:59770/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
