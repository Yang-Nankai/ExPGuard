# ExPAgent Dynamic Test — acbabkahihnlnpajiajhimlkihphdbfi v2.17

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `aepkmplggklgeiecdkjfajlniahkifoe`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'aepkmplggklgeiecdkjfajlniahkifoe', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://localhost:8010', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://dev.examroom.ai:8010', 'https://examroom.ai:8010', 'https://test.examroom.ai:8010'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 8010, 'hosts': ['examroom.ai', 'test.examroom.ai', 'dev.examroom.ai'], 'files': ['accessblocker.js', 'background.js', 'developer.js'], 'replacements': 6}, {'kind': 'externally_connectable-test-sender', 'semanticFixture': True, 'positiveOnly': True, 'path': 'manifest.json', 'detail': 'Added the controlled companion ID to the disposable manifest copy.', 'companionId': 'eeejfegkcegkghkmmbebhlfhdkmgonkm'}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': True, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': ''}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 14 flow(s): 12 CONFIRMED, 0 PARTIAL, 1 TOOL_LIMITATION, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — TOOL LIMITATION  (reproduced=False, confidence 0.20)

**Reasoning:** Companion extension sent message but no beacon hit and no sink tap activity. The sink observer execution context restarted or disappeared before collection; empty tap state is not negative evidence.

**Payload:** `{'_expagent_marker': 'expa_64711bfcead2', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "content", "context": "isolated-world", "observerReady": false, "observerLost": false, "observerRecovered": false, "expectedGeneration": "", "actualGeneration": "", "recoveryReason": "", "targetId": "", "pageUrl": "", "recoveryResult": null, "result": {"error": "no page target for isolated-world eval"}}, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` content -> {"sink_type": "all", "target_hint": "content", "context": "isolated-world", "observerReady": false, "observerGeneration": "", "targetId": "", "pageUrl": "", "result": {"error": "no page target for isolated-world eval"}}
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["content", "background.js"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "myKey", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", 
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "content", "context": "isolated-world", "observerReady": false, "observerLost": false, "observerRecovered": false, "expectedGeneration": "", "actualGeneration": "", "recoveryReason": "", "targetId": "", "

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:47:28.513145+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_b4b9699fb308', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_ba4ceea80be64ac8", "actualGeneration": "observer_ba4ceea80be64ac8", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_se, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_ba4ceea80be64ac8", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "Sendmsgcontentscript", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails",
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_ba4ceea80be64ac8", "actualGeneration": "observer_ba4c
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:47:32.310590+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-1/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-1\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-1\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #2 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_595658a161d6', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_0872e0422cda4312", "actualGeneration": "observer_0872e0422cda4312", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_se, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_0872e0422cda4312", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "ClearBlockingkey", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "na
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_0872e0422cda4312", "actualGeneration": "observer_0872
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:47:36.144199+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-2/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-2\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-2\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #3 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_fd794a55a6f0', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_9b161a86385846f2", "actualGeneration": "observer_9b161a86385846f2", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_se, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_9b161a86385846f2", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "candidateData", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "name=
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_9b161a86385846f2", "actualGeneration": "observer_9b16
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:47:40.039250+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-3/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-3\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-3\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-3\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #4 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_e5a1058337ee', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_7f4e413b2bc74890", "actualGeneration": "observer_7f4e413b2bc74890", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_se, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_7f4e413b2bc74890", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "clientId", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "name=Abort
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_7f4e413b2bc74890", "actualGeneration": "observer_7f4e
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:47:43.928838+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-4/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-4\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-4\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-4\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #5 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_c5e887b48367', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_e7a0ec2992a24c3e", "actualGeneration": "observer_e7a0ec2992a24c3e", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_se, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_e7a0ec2992a24c3e", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "examId", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "name=AbortEr
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_e7a0ec2992a24c3e", "actualGeneration": "observer_e7a0
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:47:47.822592+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-5/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-5\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-5\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-5\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #6 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_6526416c1919', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_5d84c7154e454a6a", "actualGeneration": "observer_5d84c7154e454a6a", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_se, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_5d84c7154e454a6a", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "clientId", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "name=Abort
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_5d84c7154e454a6a", "actualGeneration": "observer_5d84
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:47:51.773873+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-6/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-6\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-6\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-6\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #7 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_d157d17e2bfb', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_0b872a6cd1224a26", "actualGeneration": "observer_0b872a6cd1224a26", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_se, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_0b872a6cd1224a26", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "examId", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "name=AbortEr
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_0b872a6cd1224a26", "actualGeneration": "observer_0b87
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:47:55.644292+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-7/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-7\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-7\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-7\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #8 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_79bd02afb9a9', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_f457c364b2f04ec6", "actualGeneration": "observer_f457c364b2f04ec6", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_se, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_f457c364b2f04ec6", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "myPassword", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "name=Abo
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_f457c364b2f04ec6", "actualGeneration": "observer_f457
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:47:59.526062+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-8/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-8\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-8\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-8\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #9 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** Companion extension sent message but no beacon hit and no sink tap activity.

**Payload:** `{'_expagent_marker': 'expa_9c9fcdd00291', 'key': 'candidateDetails', 'name': 'AbortError', 'value': {'RsessionID': 'expa_9c9fcdd00291', 'candidateId': 'expa_9c9fcdd00291', 'ExamID': 'expa_9c9fcdd00291', 'VMasterID': 'expa_9c9fcdd00291'}, 'url': 'http://localhost:8010/beacon/expa_9c9fcdd00291', 'URL': 'http://localhost:8010/beacon/expa_9c9fcdd00291', 'data': {'url': 'http://localhost:8010/beacon/expa_9c9fcdd00291', 'marker': 'expa_9c9fcdd00291'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_5733866566e5429b", "actualGeneration": "observer_5733866566e5429b", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_se, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_5733866566e5429b", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "https://3l7giimka4.execute-api.us-east-1.amazonaws.com/Prod/gesturelog", "listenerToken": "onMessageExternal"
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_5733866566e5429b", "actualGeneration": "observer_5733

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:48:03.411977+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-9/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-9\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-9\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-9\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #10 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_efacaf7e63de', 'key': 'checkInstallation', 'name': 'AbortError', 'clientId': 'expa_efacaf7e63de', 'examIdToUnblock': 'expa_efacaf7e63de', 'url': 'http://localhost:8010/beacon/expa_efacaf7e63de', 'URL': 'http://localhost:8010/beacon/expa_efacaf7e63de', 'data': {'url': 'http://localhost:8010/beacon/expa_efacaf7e63de', 'marker': 'expa_efacaf7e63de'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'type': 'success', 'version': '2.17', 'installed': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_8ca96006dce54202", "actualGeneration": "observer_8ca96006dce54202", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\",\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"_, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_8ca96006dce54202", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "https://examroomapi.com/api/Allowedextensions/Extension", "listenerToken": "onMessageExternal", "matchedRoute
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'type': 'success', 'version': '2.17', 'installed': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_8ca96006dce54202", "actualGeneration": "observer_8ca9
5. `external_fixture_result` fetch -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:48:07.288584+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-10/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-10\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-10\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-10\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #11 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_e216d0a82546', 'key': 'checkInstallation', 'name': 'AbortError', 'clientId': 'expa_e216d0a82546', 'examIdToUnblock': 'expa_e216d0a82546', 'url': 'http://localhost:8010/beacon/expa_e216d0a82546', 'URL': 'http://localhost:8010/beacon/expa_e216d0a82546', 'data': {'url': 'http://localhost:8010/beacon/expa_e216d0a82546', 'marker': 'expa_e216d0a82546'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'type': 'success', 'version': '2.17', 'installed': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_4ad2415b26b34df3", "actualGeneration": "observer_4ad2415b26b34df3", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\",\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"_, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_4ad2415b26b34df3", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "[Unknown URL]", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "name=
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'type': 'success', 'version': '2.17', 'installed': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_4ad2415b26b34df3", "actualGeneration": "observer_4ad2
5. `external_fixture_result` fetch -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:48:11.222245+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-11/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-11\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-11\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-11\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #12 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_b06652ae8a8a', 'key': 'checkInstallation', 'name': 'AbortError', 'clientId': 'expa_b06652ae8a8a', 'examIdToUnblock': 'expa_b06652ae8a8a', 'url': 'http://localhost:8010/beacon/expa_b06652ae8a8a', 'URL': 'http://localhost:8010/beacon/expa_b06652ae8a8a', 'data': {'url': 'http://localhost:8010/beacon/expa_b06652ae8a8a', 'marker': 'expa_b06652ae8a8a'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'type': 'success', 'version': '2.17', 'installed': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_d901e85ec8cc4695", "actualGeneration": "observer_d901e85ec8cc4695", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\",\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"_, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_d901e85ec8cc4695", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "[Unknown URL]", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "name=
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'type': 'success', 'version': '2.17', 'installed': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_d901e85ec8cc4695", "actualGeneration": "observer_d901
5. `external_fixture_result` fetch -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:48:15.139459+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-12/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-12\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-12\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-12\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #13 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_3dca4aee25fa', 'key': 'candidateDetails', 'name': 'AbortError', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'success': True}}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_a82cc65b4edc4a4c", "actualGeneration": "observer_a82cc65b4edc4a4c", "previousTargetId": "17C9F4B15BAA7998387CE5C35073A334", "currentTargetId": "17C9F4B15BAA7998387CE5C35073A334", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\",\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"_, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 8010, "hosts": ["examroom.ai", "test.examroom.ai", "dev.examroom.ai"], "files": ["accessblocker.js", "background.js", "developer.js"], "replacements": 6}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_a82cc65b4edc4a4c", "targetId": "17C9F4B15BAA7998387CE5C35073A334", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-dkzm60nn\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "allowedUrlsList", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["key=candidateDetails", "nam
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(aepkmplggklgeiecdkjfajlniahkifoe) -> {'ok': True, 'response': {'success': True}}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_a82cc65b4edc4a4c", "actualGeneration": "observer_a82c
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8010/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:48:19.075109+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/acbabkahihnlnpajiajhimlkihphdbfi/2.17/dynamic-evidence/flow-13/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-13\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-13\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\acbabkahihnlnpajiajhimlkihphdbfi\2.17\dynamic-evidence\flow-13\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

<!-- manual-validation-flow-0 -->
## Manual validation — Flow #0

- Final verdict: **TRUE_POSITIVE**
- Automated outcome retained for audit: `TOOL_LIMITATION`
- Operator observation: 人工验证确认外部消息能够成功修改扩展 storage。
- Attestation: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000-ExPAgent\ExPGuard-Opti\chrome\acbabkahihnlnpajiajhimlkihphdbfi_2.17\dynamic\evidence\flow-0\manual\manual_validation.json`
- Recorded at: `2026-09-19T13:59:51.788712+08:00`

<!-- manual-validation-flow-9 -->
## Manual validation — Flow #9

- Final verdict: **TRUE_POSITIVE**
- Automated outcome retained for audit: `INCONCLUSIVE_AFTER_DEBUG`
- Operator observation: 人工触发 saveGeturLogs 后，fetch body 的 etbid/id/vid/msg 字段均观察到对应 marker。
- Attestation: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000-ExPAgent\ExPGuard-Opti\chrome\acbabkahihnlnpajiajhimlkihphdbfi_2.17\dynamic\evidence\flow-9\manual\manual_validation.json`
- Recorded at: `2026-09-19T13:59:51.788712+08:00`
