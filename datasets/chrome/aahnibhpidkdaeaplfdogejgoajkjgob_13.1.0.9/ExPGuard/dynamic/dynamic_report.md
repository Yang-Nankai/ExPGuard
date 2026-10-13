# ExPAgent Dynamic Test — aahnibhpidkdaeaplfdogejgoajkjgob v13.1.0.9

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `cbmgddmdibmidhfncheaejpjflephphl`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'cbmgddmdibmidhfncheaejpjflephphl', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://localhost:8080', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 3 flow(s): 3 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** Companion extension sent runtime.sendMessage to target extension. beacon hit confirms the onMessageExternal listener received the message and the sink fired with attacker-controlled data.

**Payload:** `{'_expagent_marker': 'expa_5659a16a1870', 'type': 'ADD_TORRENT', 'url': 'http://localhost:8080/beacon/expa_5659a16a1870', 'URL': 'http://localhost:8080/beacon/expa_5659a16a1870', 'data': {'url': 'http://localhost:8080/beacon/expa_5659a16a1870', 'marker': 'expa_5659a16a1870'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'error': 'The message port closed before a response was received.'}, beacon hits: 1

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_7658b956a4b84546", "targetId": "59B5C0A37C2EA60FCD14571A1BCE74AB", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-ey4vc2nh\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "[Unknown URL]", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["type=ADD_TORRENT"], "payloadK
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(cbmgddmdibmidhfncheaejpjflephphl) -> {'ok': False, 'error': 'The message port closed before a response was received.'}
4. `observe` beacon hit -> 1 hit(s) for marker expa_5659a16a1870

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8080/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T03:09:21.288766+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/aahnibhpidkdaeaplfdogejgoajkjgob/13.1.0.9/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aahnibhpidkdaeaplfdogejgoajkjgob\13.1.0.9\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aahnibhpidkdaeaplfdogejgoajkjgob\13.1.0.9\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aahnibhpidkdaeaplfdogejgoajkjgob\13.1.0.9\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** Companion extension sent runtime.sendMessage to target extension. beacon hit confirms the onMessageExternal listener received the message and the sink fired with attacker-controlled data.

**Payload:** `{'_expagent_marker': 'expa_74b51f72b114', 'type': 'ADD_TORRENT', 'url': 'http://localhost:8080/beacon/expa_74b51f72b114', 'URL': 'http://localhost:8080/beacon/expa_74b51f72b114', 'data': {'url': 'http://localhost:8080/beacon/expa_74b51f72b114', 'marker': 'expa_74b51f72b114'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'error': 'The message port closed before a response was received.'}, beacon hits: 1

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_fd7aeb1dad504780", "targetId": "59B5C0A37C2EA60FCD14571A1BCE74AB", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-ey4vc2nh\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "[Unknown URL]", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["type=ADD_TORRENT"], "payloadK
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(cbmgddmdibmidhfncheaejpjflephphl) -> {'ok': False, 'error': 'The message port closed before a response was received.'}
4. `observe` beacon hit -> 1 hit(s) for marker expa_74b51f72b114

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8080/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state-fixture` — 2026-09-19T03:09:32.463456+00:00 | http://localhost:8080/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![final-state-fixture](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/aahnibhpidkdaeaplfdogejgoajkjgob/13.1.0.9/dynamic-evidence/flow-1/step-final-state-fixture.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aahnibhpidkdaeaplfdogejgoajkjgob\13.1.0.9\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state-fixture]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aahnibhpidkdaeaplfdogejgoajkjgob\13.1.0.9\dynamic-evidence\flow-1\step-final-state-fixture.png` — Post-run controlled fixture state (reopened because the service-worker flow left no screenshot-capable page target); sink evidence remains in the trace.
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aahnibhpidkdaeaplfdogejgoajkjgob\13.1.0.9\dynamic-evidence\flow-1\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #2 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** Companion extension sent runtime.sendMessage to target extension. beacon hit confirms the onMessageExternal listener received the message and the sink fired with attacker-controlled data.

**Payload:** `{'_expagent_marker': 'expa_4a424d04915e', 'type': 'ADD_TORRENT', 'url': 'http://localhost:8080/beacon/expa_4a424d04915e', 'URL': 'http://localhost:8080/beacon/expa_4a424d04915e', 'data': {'url': 'http://localhost:8080/beacon/expa_4a424d04915e', 'marker': 'expa_4a424d04915e'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'error': 'The message port closed before a response was received.'}, beacon hits: 1

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_d7c711ed062f4ae0", "targetId": "59B5C0A37C2EA60FCD14571A1BCE74AB", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-ey4vc2nh\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "[Unknown URL]", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["type=ADD_TORRENT"], "payloadK
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(cbmgddmdibmidhfncheaejpjflephphl) -> {'ok': False, 'error': 'The message port closed before a response was received.'}
4. `observe` beacon hit -> 1 hit(s) for marker expa_4a424d04915e

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8080/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T03:09:33.136603+00:00 | http://localhost:8080/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/aahnibhpidkdaeaplfdogejgoajkjgob/13.1.0.9/dynamic-evidence/flow-2/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aahnibhpidkdaeaplfdogejgoajkjgob\13.1.0.9\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aahnibhpidkdaeaplfdogejgoajkjgob\13.1.0.9\dynamic-evidence\flow-2\step-final-state.png` — Step `final-state`: http://localhost:8080/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aahnibhpidkdaeaplfdogejgoajkjgob\13.1.0.9\dynamic-evidence\flow-2\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---
