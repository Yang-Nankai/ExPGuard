# ExPAgent Dynamic Test — ailcmbgekjpnablpdkmaaccecekgdhlh v3.1.33

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `ailcmbgekjpnablpdkmaaccecekgdhlh`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'ailcmbgekjpnablpdkmaaccecekgdhlh', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:56610', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://expagent.workona.com:56610', 'https://workona.com:56610'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 56610, 'hosts': ['workona.com', 'expagent.workona.com'], 'files': ['background.js', 'popupScript.js'], 'replacements': 7}, {'kind': 'externally_connectable-test-sender', 'semanticFixture': True, 'positiveOnly': True, 'path': 'manifest.json', 'detail': 'Added the controlled companion ID to the disposable manifest copy.', 'companionId': 'eeejfegkcegkghkmmbebhlfhdkmgonkm'}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 2 flow(s): 1 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_375439ba6b65', 'method': 32, 'settings': {'discardBlacklist': 'expa_375439ba6b65'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'data': {'discardBlacklist': 'expa_375439ba6b65', 'maxTabs': 25, 'preventAudibleDiscard': True, 'suspender': 'wkna', 'tabCacheEnabled': True, 'tabCacheManagerId': None, 'tabCacheWinId': None, 'tabManagementMode': 1, 'tabManagerOn': False, 'tabSuspensionOn': False, 'tabTTL':, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_9d6acd1611e84de3", "actualGeneration": "observer_9d6acd1611e84de3", "previousTargetId": "1B7D80461C56E0B2770EE8D16DB68CD8", "currentTargetId": "1B7D80461C56E0B2770EE8D16DB68CD8", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\",\"storage.session.set\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__history_addUrl__\":true,\"__history_deleteUrl__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 56610, "hosts": ["workona.com", "expagent.workona.com"], "files": ["background.js", "popupScript.js"], "replacements": 7}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_9d6acd1611e84de3", "targetId": "1B7D80461C56E0B2770EE8D16DB68CD8", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-688c02__\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "wkTabCache", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["type=manager", "method=32"], "pa
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(ailcmbgekjpnablpdkmaaccecekgdhlh) -> {'ok': True, 'response': {'data': {'discardBlacklist': 'expa_375439ba6b65', 'maxTabs': 25, 'preventAudibleDiscard': True, 'suspender': 'wkna', 'tabCacheEnabled': True, 'tabCacheManagerId': None, 'tabCacheWinId': None, 'tabManagementMode': 1
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_9d6acd1611e84de3", "actualGeneration": "observer_9d6a
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:56610/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state-fixture` — 2026-09-19T08:10:41.432436+00:00 | http://127.0.0.1:56610/page | sha256=1561f7a7514e175951aa0550e86f7c9490422709d8af2fbe3929d9643a24a347
  ![final-state-fixture](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/ailcmbgekjpnablpdkmaaccecekgdhlh/3.1.33/dynamic-evidence/flow-0/step-final-state-fixture.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\ailcmbgekjpnablpdkmaaccecekgdhlh\3.1.33\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state-fixture]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\ailcmbgekjpnablpdkmaaccecekgdhlh\3.1.33\dynamic-evidence\flow-0\step-final-state-fixture.png` — Post-run controlled fixture state (reopened because the service-worker flow left no screenshot-capable page target); sink evidence remains in the trace.
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\ailcmbgekjpnablpdkmaaccecekgdhlh\3.1.33\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #1 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** Companion extension sent message but no beacon hit and no sink tap activity.

**Payload:** `{'_expagent_marker': 'expa_717ec898142f', 'type': 'manager', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'error': {'message': 'Invalid method (undefined)'}}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_4a2d3fd3e1dd49d8", "actualGeneration": "observer_4a2d3fd3e1dd49d8", "previousTargetId": "1B7D80461C56E0B2770EE8D16DB68CD8", "currentTargetId": "1B7D80461C56E0B2770EE8D16DB68CD8", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\",\"storage.session.set\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__history_addUrl__\":true,\"__history_deleteUrl__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 56610, "hosts": ["workona.com", "expagent.workona.com"], "files": ["background.js", "popupScript.js"], "replacements": 7}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_4a2d3fd3e1dd49d8", "targetId": "1B7D80461C56E0B2770EE8D16DB68CD8", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-688c02__\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "settings", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["type=manager"], "payloadKeys": ["_
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(ailcmbgekjpnablpdkmaaccecekgdhlh) -> {'ok': True, 'response': {'error': {'message': 'Invalid method (undefined)'}}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_4a2d3fd3e1dd49d8", "actualGeneration": "observer_4a2d

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:56610/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T08:10:45.266710+00:00 | http://127.0.0.1:56610/page | sha256=1561f7a7514e175951aa0550e86f7c9490422709d8af2fbe3929d9643a24a347
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/ailcmbgekjpnablpdkmaaccecekgdhlh/3.1.33/dynamic-evidence/flow-1/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\ailcmbgekjpnablpdkmaaccecekgdhlh\3.1.33\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\ailcmbgekjpnablpdkmaaccecekgdhlh\3.1.33\dynamic-evidence\flow-1\step-final-state.png` — Step `final-state`: http://127.0.0.1:56610/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\ailcmbgekjpnablpdkmaaccecekgdhlh\3.1.33\dynamic-evidence\flow-1\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---
