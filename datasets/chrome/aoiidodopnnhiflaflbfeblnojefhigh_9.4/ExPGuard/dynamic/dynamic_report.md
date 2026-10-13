# ExPAgent Dynamic Test — aoiidodopnnhiflaflbfeblnojefhigh v9.4

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `omhdlmnddijabbklhmgfojonlgaainmm`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'omhdlmnddijabbklhmgfojonlgaainmm', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:53859', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 2 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 TOOL_LIMITATION, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — TOOL LIMITATION  (reproduced=False, confidence 0.00)

**Reasoning:** The bounded dynamic trajectory did not produce a verdict within 90 seconds; recorded as a tooling limitation rather than treating the absence of an observation as a negative result.

**Runtime evidence:** timeout-debug-state={"target": {"type": "", "url": ""}, "breakpoints": [{"sourceFile": "js/app.js", "url": "chrome-extension://omhdlmnddijabbklhmgfojonlgaainmm/js/app.js", "line": 1, "column": 0, "targetHint": "content", "breakpointId": "br:1:0:0:chrome-extension://omhdlmnddijabbklhmgfojonlgaainmm/js/app.js", "resolved": true, "locations": [{"scriptId": "6", "lineNumber": 0, "columnNumber": 24}], "targetType": "page", "targetUrl": "http://127.0.0.1:53859/cart"}, {"sourceFile": "js/background.js", "url": "chrome-extension://omhdlmnddijabbklhmgfojonlgaainmm/js/background.js", "line": 1, "column": 236576, "targetHint": "background", "breakpointId": "1:0:236576:chrome-extension://omhdlmnddijabbklhmgfojonlgaainmm/js/background.js", "resolved": true, "locations": [{"scriptId": "3", "lineNumber": 0, "columnNumber": 236576}], "targetType": "service_worker", "targetUrl": "chrome-extension://omhdlmnddijabbklhmgfojonlgaainmm/js/background.js"}], "paused": {"paused": false, "reason": "", "target": {"type": "", "url": ""}, "frames": []}, "lifecycle": {"attachCount": 3, "lastTargetId": "5507661716E7495185B9D15B7A363239"}}

**Trajectory:**
1. `timeout_debug_checkpoint` 2 resolved/registered breakpoint(s) -> {"breakpoints": [{"sourceFile": "js/app.js", "url": "chrome-extension://omhdlmnddijabbklhmgfojonlgaainmm/js/app.js", "line": 1, "column": 0, "targetHint": "content", "breakpointId": "br:1:0:0:chrome-extension://omhdlmnddijabbklhmgfojonlgaainmm/js/app.js", "resolved": true, "locations": [{"scriptId": "6", "lineNumber": 0, "columnN

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:53859/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 2 breakpoint(s); see artifact for line-level state.

**Screenshot evidence:**
- `final-state-fixture` — 2026-09-19T07:30:27.448044+00:00 | http://127.0.0.1:53859/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![final-state-fixture](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/aoiidodopnnhiflaflbfeblnojefhigh/9.4/dynamic-evidence/flow-0/step-final-state-fixture.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aoiidodopnnhiflaflbfeblnojefhigh\9.4\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aoiidodopnnhiflaflbfeblnojefhigh\9.4\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot` [final-state-fixture]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aoiidodopnnhiflaflbfeblnojefhigh\9.4\dynamic-evidence\flow-0\step-final-state-fixture.png` — Post-run controlled fixture state (reopened because the service-worker flow left no screenshot-capable page target); sink evidence remains in the trace.
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aoiidodopnnhiflaflbfeblnojefhigh\9.4\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** partialTrajectoryPreserved=true

---

## Flow #1 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 45s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** baseline=sink-tap-instrument={"error": "no extension target found", "hint": "popup"}
deep-trace=source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "js/app.js", "location": "L1:C154929 -> L1:C154937", "eventNames": ["click", "pb1_OpenUrl_Event", "pb1_Minimize_Event", "pb1_Disable_Event", "pb1_Restore_Event", "pb1_Highlight_Event", "pb1_Open_Options_Event", "pb1_openCloseUrl_Event"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": " coupon_overlay_xpath=\"\";let coupon_code_count=0;let coupon_code_exception_rids=[];let is_hidden=false;let is_minimized=false;let is_minimized_24=false;let disabled_status=0;const NOT_DISABLED=0;const TEMP_DISABLED=1;const PERM_DISABLED=2;const TEMP_DISABLED_NO_PRICE_COMP=3;const disable_type=null&&NOT_DISABLED;window.priceblink={};window.extension_id=main_browser.i18n.getMessage(\"@@extension_id\");window.settings={currency:\"$\",coupon_tex

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:53859/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---
