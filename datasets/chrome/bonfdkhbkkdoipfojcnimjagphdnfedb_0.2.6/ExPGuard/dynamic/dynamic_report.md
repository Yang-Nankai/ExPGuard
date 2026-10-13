# ExPAgent Dynamic Test — bonfdkhbkkdoipfojcnimjagphdnfedb v0.2.6

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `cdifejjmpipjepelkheobikabggigjgn`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'cdifejjmpipjepelkheobikabggigjgn', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://localhost:63656', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://dashboard.datahive.ai:63656', 'https://dashboard.datahive.xyz:63656', 'https://datahive-dashboard-development.web.app:63656', 'https://datahive-dashboard-production-non-store.web.app:63656', 'https://datahive-dashboard-staging.web.app:63656'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 63656, 'hosts': ['datahive-dashboard-development.web.app', 'datahive-dashboard-staging.web.app', 'datahive-dashboard-production-non-store.web.app', 'dashboard.datahive.xyz', 'dashboard.datahive.ai'], 'files': ['assets/apiClient-etL1MrFo.js'], 'replacements': 1}, {'kind': 'externally_connectable-test-sender', 'semanticFixture': True, 'positiveOnly': True, 'path': 'manifest.json', 'detail': 'Added the controlled companion ID to the disposable manifest copy.', 'companionId': 'eeejfegkcegkghkmmbebhlfhdkmgonkm'}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': True, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': ''}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 3 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** Companion extension sent message but no beacon hit and no sink tap activity.

**Payload:** `{'_expagent_marker': 'expa_61367f4cd53d', 'action': 'login', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_c1eb579b3aa3465d", "actualGeneration": "observer_c1eb579b3aa3465d", "previousTargetId": "A109901A9E1C4877C7151E7CFD0D8CE2", "currentTargetId": "A109901A9E1C4877C7151E7CFD0D8CE2", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__dom_innerHTML__\":true,\"__runtime_sendMessage__\":true},\"observerToken\":\"observer_c1eb579b3aa3465d\"}"}, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 63656, "hosts": ["datahive-dashboard-development.web.app", "datahive-dashboard-staging.web.app", "datahive-dashboard-production-non-store.web.app", "dashboard.datahive.xyz", "dashboard.datahive.ai"], "files": ["assets/apiClient-etL1MrFo.js"], "replacements": 1}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_c1eb579b3aa3465d", "targetId": "A109901A9E1C4877C7151E7CFD0D8CE2", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["assets/index.ts-C5kIJibv"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-n7fvgb3m\\extension\\assets\\index.ts-C5kIJibv.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "email", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["type=log
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(cdifejjmpipjepelkheobikabggigjgn) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_c1eb579b3aa3465d", "actualGeneration": "observer_c1eb

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:63656/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T13:25:03.167689+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bonfdkhbkkdoipfojcnimjagphdnfedb/0.2.6/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bonfdkhbkkdoipfojcnimjagphdnfedb\0.2.6\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bonfdkhbkkdoipfojcnimjagphdnfedb\0.2.6\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bonfdkhbkkdoipfojcnimjagphdnfedb\0.2.6\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #1 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** Companion extension sent message but no beacon hit and no sink tap activity.

**Payload:** `{'_expagent_marker': 'expa_82842d433255', 'action': 'login', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_86a87fc69617442d", "actualGeneration": "observer_86a87fc69617442d", "previousTargetId": "A109901A9E1C4877C7151E7CFD0D8CE2", "currentTargetId": "A109901A9E1C4877C7151E7CFD0D8CE2", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__dom_innerHTML__\":true,\"__runtime_sendMessage__\":true},\"observerToken\":\"observer_86a87fc69617442d\"}"}, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 63656, "hosts": ["datahive-dashboard-development.web.app", "datahive-dashboard-staging.web.app", "datahive-dashboard-production-non-store.web.app", "dashboard.datahive.xyz", "dashboard.datahive.ai"], "files": ["assets/apiClient-etL1MrFo.js"], "replacements": 1}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_86a87fc69617442d", "targetId": "A109901A9E1C4877C7151E7CFD0D8CE2", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["assets/index.ts-C5kIJibv"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-n7fvgb3m\\extension\\assets\\index.ts-C5kIJibv.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "jwt", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["type=login
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(cdifejjmpipjepelkheobikabggigjgn) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_86a87fc69617442d", "actualGeneration": "observer_86a8

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:63656/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T13:25:17.126488+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bonfdkhbkkdoipfojcnimjagphdnfedb/0.2.6/dynamic-evidence/flow-1/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bonfdkhbkkdoipfojcnimjagphdnfedb\0.2.6\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bonfdkhbkkdoipfojcnimjagphdnfedb\0.2.6\dynamic-evidence\flow-1\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bonfdkhbkkdoipfojcnimjagphdnfedb\0.2.6\dynamic-evidence\flow-1\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #2 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** Companion extension sent message but no beacon hit and no sink tap activity.

**Payload:** `{'_expagent_marker': 'expa_52ddb5dfa254', 'action': 'login', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_05c5b6f04db043e4", "actualGeneration": "observer_05c5b6f04db043e4", "previousTargetId": "A109901A9E1C4877C7151E7CFD0D8CE2", "currentTargetId": "A109901A9E1C4877C7151E7CFD0D8CE2", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__dom_innerHTML__\":true,\"__runtime_sendMessage__\":true},\"observerToken\":\"observer_05c5b6f04db043e4\"}"}, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 63656, "hosts": ["datahive-dashboard-development.web.app", "datahive-dashboard-staging.web.app", "datahive-dashboard-production-non-store.web.app", "dashboard.datahive.xyz", "dashboard.datahive.ai"], "files": ["assets/apiClient-etL1MrFo.js"], "replacements": 1}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_05c5b6f04db043e4", "targetId": "A109901A9E1C4877C7151E7CFD0D8CE2", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["assets/index.ts-C5kIJibv"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-n7fvgb3m\\extension\\assets\\index.ts-C5kIJibv.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "isConnected", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["ty
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(cdifejjmpipjepelkheobikabggigjgn) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_05c5b6f04db043e4", "actualGeneration": "observer_05c5

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:63656/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T13:25:31.023247+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bonfdkhbkkdoipfojcnimjagphdnfedb/0.2.6/dynamic-evidence/flow-2/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bonfdkhbkkdoipfojcnimjagphdnfedb\0.2.6\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bonfdkhbkkdoipfojcnimjagphdnfedb\0.2.6\dynamic-evidence\flow-2\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bonfdkhbkkdoipfojcnimjagphdnfedb\0.2.6\dynamic-evidence\flow-2\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---
