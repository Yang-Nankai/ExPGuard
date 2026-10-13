# ExPAgent Dynamic Test — abfimpkhacgimamjbiegeoponlepcbob v1.0.4

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `abfimpkhacgimamjbiegeoponlepcbob`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'abfimpkhacgimamjbiegeoponlepcbob', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:54841', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://expagent.seedr.cc:54841', 'https://www.seedr.cc:54841'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 54841, 'hosts': ['expagent.seedr.cc', 'www.seedr.cc'], 'files': ['background.js', 'content.js', 'oauth.js', 'popup.js'], 'replacements': 26}, {'kind': 'externally_connectable-test-sender', 'semanticFixture': True, 'positiveOnly': True, 'path': 'manifest.json', 'detail': 'Added the controlled companion ID to the disposable manifest copy.', 'companionId': 'eeejfegkcegkghkmmbebhlfhdkmgonkm'}, {'kind': 'external-sender-tab-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'path': 'background.js', 'detail': 'Bounded sender.tab.id=0 supplied to an external listener.'}, {'kind': 'external-sender-tab-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'path': 'background.js', 'detail': 'Bounded sender.tab.id=0 supplied to an external listener.'}, {'kind': 'external-sender-tab-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'path': 'background.js', 'detail': 'Bounded sender.tab.id=0 supplied to an external listener.'}, {'kind': 'external-sender-tab-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'path': 'background.js', 'detail': 'Bounded sender.tab.id=0 supplied to an external listener.'}, {'kind': 'external-sender-tab-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'path': 'background.js', 'detail': 'Bounded sender.tab.id=0 supplied to an external listener.'}, {'kind': 'external-sender-tab-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'path': 'background.js', 'detail': 'Bounded sender.tab.id=0 supplied to an external listener.'}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': True, 'observer': 'extension background target', 'reason': ''}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': True, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': ''}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 7 flow(s): 6 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_fbb34cb3fc7e', 'func': 'login', 'username': 'expagent@example.invalid', 'access_token': 'expa_fbb34cb3fc7e', 'refresh_token': 'expa_fbb34cb3fc7e', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_7f1e0d1170c74b7c", "actualGeneration": "observer_7f1e0d1170c74b7c", "previousTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "currentTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__downloads_download__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__ac, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 54841, "hosts": ["expagent.seedr.cc", "www.seedr.cc"], "files": ["background.js", "content.js", "oauth.js", "popup.js"], "replacements": 26}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_7f1e0d1170c74b7c", "targetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-0dqmgw5r\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "access_token", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["func=login"], "payloadKeys": [
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(abfimpkhacgimamjbiegeoponlepcbob) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_7f1e0d1170c74b7c", "actualGeneration": "observer_7f1e
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:54841/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:14:57.849659+00:00 | about:blank | sha256=64ad55ddf3f0c73061aecad4890ab47f0b6d7e62e278b8d17e9546185c24f119
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abfimpkhacgimamjbiegeoponlepcbob/1.0.4/dynamic-evidence/flow-1/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-1\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-1\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #2 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_f9c622620a85', 'func': 'login', 'username': 'expagent@example.invalid', 'access_token': 'expa_f9c622620a85', 'refresh_token': 'expa_f9c622620a85', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_14f5e57597584659", "actualGeneration": "observer_14f5e57597584659", "previousTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "currentTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__downloads_download__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__ac, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 54841, "hosts": ["expagent.seedr.cc", "www.seedr.cc"], "files": ["background.js", "content.js", "oauth.js", "popup.js"], "replacements": 26}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_14f5e57597584659", "targetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-0dqmgw5r\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "refresh_token", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["func=login"], "payloadKeys": 
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(abfimpkhacgimamjbiegeoponlepcbob) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_14f5e57597584659", "actualGeneration": "observer_14f5
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:54841/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:15:11.716162+00:00 | about:blank | sha256=64ad55ddf3f0c73061aecad4890ab47f0b6d7e62e278b8d17e9546185c24f119
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abfimpkhacgimamjbiegeoponlepcbob/1.0.4/dynamic-evidence/flow-2/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-2\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-2\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #3 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_3345447884ee', 'func': 'login', 'username': 'expagent@example.invalid', 'access_token': 'expa_3345447884ee', 'refresh_token': 'expa_3345447884ee', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_1e5b02e5f63346c3", "actualGeneration": "observer_1e5b02e5f63346c3", "previousTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "currentTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__downloads_download__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__ac, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 54841, "hosts": ["expagent.seedr.cc", "www.seedr.cc"], "files": ["background.js", "content.js", "oauth.js", "popup.js"], "replacements": 26}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_1e5b02e5f63346c3", "targetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-0dqmgw5r\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "username", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["func=login"], "payloadKeys": ["_ex
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(abfimpkhacgimamjbiegeoponlepcbob) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_1e5b02e5f63346c3", "actualGeneration": "observer_1e5b
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:54841/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:15:25.668380+00:00 | about:blank | sha256=64ad55ddf3f0c73061aecad4890ab47f0b6d7e62e278b8d17e9546185c24f119
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abfimpkhacgimamjbiegeoponlepcbob/1.0.4/dynamic-evidence/flow-3/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-3\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-3\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-3\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #4 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_12e163b29495', 'func': 'login', 'username': 'expagent@example.invalid', 'access_token': 'expa_12e163b29495', 'refresh_token': 'expa_12e163b29495', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_709fe04326fc4a6e", "actualGeneration": "observer_709fe04326fc4a6e", "previousTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "currentTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__downloads_download__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__ac, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 54841, "hosts": ["expagent.seedr.cc", "www.seedr.cc"], "files": ["background.js", "content.js", "oauth.js", "popup.js"], "replacements": 26}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_709fe04326fc4a6e", "targetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-0dqmgw5r\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "access_token", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["func=login"], "payloadKeys": [
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(abfimpkhacgimamjbiegeoponlepcbob) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_709fe04326fc4a6e", "actualGeneration": "observer_709f
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:54841/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:15:39.636776+00:00 | about:blank | sha256=64ad55ddf3f0c73061aecad4890ab47f0b6d7e62e278b8d17e9546185c24f119
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abfimpkhacgimamjbiegeoponlepcbob/1.0.4/dynamic-evidence/flow-4/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-4\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-4\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-4\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #5 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_c92f5af4d6df', 'func': 'login', 'username': 'expagent@example.invalid', 'access_token': 'expa_c92f5af4d6df', 'refresh_token': 'expa_c92f5af4d6df', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_3bbde84f453b4205", "actualGeneration": "observer_3bbde84f453b4205", "previousTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "currentTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__downloads_download__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__ac, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 54841, "hosts": ["expagent.seedr.cc", "www.seedr.cc"], "files": ["background.js", "content.js", "oauth.js", "popup.js"], "replacements": 26}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_3bbde84f453b4205", "targetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-0dqmgw5r\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "refresh_token", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["func=login"], "payloadKeys": 
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(abfimpkhacgimamjbiegeoponlepcbob) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_3bbde84f453b4205", "actualGeneration": "observer_3bbd
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:54841/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:15:53.598698+00:00 | about:blank | sha256=64ad55ddf3f0c73061aecad4890ab47f0b6d7e62e278b8d17e9546185c24f119
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abfimpkhacgimamjbiegeoponlepcbob/1.0.4/dynamic-evidence/flow-5/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-5\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-5\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-5\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #6 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_93d0339c41c1', 'func': 'login', 'username': 'expagent@example.invalid', 'access_token': 'expa_93d0339c41c1', 'refresh_token': 'expa_93d0339c41c1', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_c8231ffe67de4df9", "actualGeneration": "observer_c8231ffe67de4df9", "previousTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "currentTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__downloads_download__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__ac, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 54841, "hosts": ["expagent.seedr.cc", "www.seedr.cc"], "files": ["background.js", "content.js", "oauth.js", "popup.js"], "replacements": 26}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "background.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_c8231ffe67de4df9", "targetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-0dqmgw5r\\extension\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "username", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["func=login"], "payloadKeys": ["_ex
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(abfimpkhacgimamjbiegeoponlepcbob) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_c8231ffe67de4df9", "actualGeneration": "observer_c823
5. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:54841/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:16:07.507967+00:00 | about:blank | sha256=64ad55ddf3f0c73061aecad4890ab47f0b6d7e62e278b8d17e9546185c24f119
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abfimpkhacgimamjbiegeoponlepcbob/1.0.4/dynamic-evidence/flow-6/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-6\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-6\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-6\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** A message reached the background (some instrumented sink fired), but the exact static sink did not execute under any contract candidate — a real rebuttal of the static routing. Semantic-fixture non-observation (SINK_NOT_FIRED) cannot rebut the original extension boundary.

**Payload:** `[{"id": "EXPAGENT_TEST_expa_d91701abefdb", "hostname": "www.seedr.cc", "marker": "EXPAGENT_TEST_expa_d91701abefdb", "url": "http://127.0.0.1:54841/beacon/expa_822fc4c216f1", "data": "EXPAGENT_TEST_expa_d91701abefdb", "value": "EXPAGENT_TEST_expa_d91701abefdb", "message": "EXPAGENT_TEST_expa_d91701abefdb", "title": "EXPAGENT_TEST_expa_d91701abefdb", "text": "EXPAGENT_TEST_expa_d91701abefdb", "number": "EXPAGENT_TEST_expa_d91701abefdb", "name": "EXPAGENT_TEST_expa_d91701abefdb", "key": "EXPAGENT_TEST_expa_d91701abefdb", "type": "open_window", "action": "EXPAGENT_TEST_expa_d91701abefdb", "cmd": "EXPAGENT_TEST_expa_d91701abefdb", "Action": "EXPAGENT_TEST_expa_d91701abefdb", "Message": "EXPAGENT_TEST_expa_d91701abefdb", "fun": "EXPAGENT_TEST_expa_d91701abefdb", "auth": "EXPAGENT_TEST_expa_d91701abefdb", "phone": "EXPAGENT_TEST_expa_d91701abefdb", "email": "EXPAGENT_TEST_expa_d91701abefdb", "version": "EXPAGENT_TEST_expa_d91701abefdb", "token": "EXPAGENT_TEST_expa_d91701abefdb", "content": "EXPAGENT_TEST_expa_d91701abefdb", "payload": "EXPAGENT_TEST_expa_d91701abefdb", "kind": "EXPAGENT_TEST_expa_d91701abefdb", "requestId": "EXPAGENT_TEST_expa_d91701abefdb", "revision": "EXPAGENT_TEST_expa_d91701abefdb", "guid": "EXPAGENT_TEST_expa_d91701abefdb", "initiatingPage": "EXPAGENT_TEST_expa_d91701abefdb", "referringPage": "EXPAGENT_TEST_expa_d91701abefdb", "fileInspectionData": "EXPAGENT_TEST_expa_d91701abefdb", "sha256": "EXPAGENT_TEST_expa_d91701abefdb"}, {"id": "EXPAGENT_TEST_expa_d91701abefdb", "hostname": "www.seedr.cc", "marker": "EXPAGENT_TEST_expa_d91701abefdb", "url": "http://1`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L215:C9 -> L215:C23", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"id": "login-page", "hostname": "www.seedr.cc"}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "k.removeAttribute('target');\n\t\t\t// Remove all other event listeners\n\t\t\tconst newLink = link.cloneNode(true);\n\t\t\tnewLink.dataset.seedrProcessed = 'true';\n\t\t\tnewLink.addEventListener('click', (e) => {\n\t\t\t\te.preventDefault();\n\t\t\t\te.stopPropagation();\n\t\t\t\taddTorrent(link.href, false);\n\t\t\t});\n\t\t\tlink.parentNode.replaceChild(newLink, link);\n\t\t}\n\t}\n}\n\n// Process new links\nfunction processNewLinks(addedNodes) {\n\taddedNodes.forEach(node => {\n\t\tif (node.nodeType === Node.ELEMENT_NODE) {\n\t\t\tif (node.tagName === 'A') {\n\t\t\t\tprocessLink(node);\n\t\t\t} else {\n\t\t\t\tnode.querySelectorAll('a').forEach(processLink);\n\t\t\t}\n\t\t}\n\t});\n}\n\n// Debounced version of processNewLinks\nconst debouncedProcessNewLinks = debounce(processNewLinks, 250);\n\n// Utility function to create element with classes\nfunction createElement(tag, classes) {\n\tconst element = document.createElement(tag);\n\tif (classes) element.className = classe", "notes": ["已从 sink 文件推导消息分发字段 `type` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "type", "discriminatorValues": ["open_window", "login", "getStorage"], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "message", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": [], "contractConfidence": "HIGH", "contractWarnings": []}
source-breakpoint={"ok": false, "sourceFile": "content.js", "url": "chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/content.js", "line": 215, "column": 0, "targetHint": "content", "breakpointId": "br:1:214:0:chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/content.js", "resolved": false, "locations": [], "targetType": "page", "targetUrl": "http://127.0.0.1:54841/page", "error": "Breakpoint was registered by CDP but did not resolve to a loaded script location. The source URL/path or execution context may not match the active target."}
sink-breakpoint=armed
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/background.js"}, "frames": []}
sink-pause={"paused": false, "reason": "", "target": {"type": "service_worker", "url": "chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/background.js"}, "frames": []}
sink-tap={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_b87165fb28084d0d", "actualGeneration": "observer_b87165fb28084d0d", "previousTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "currentTargetId": "FC28B725317FC6EC9E2E0EBFEBD4B04C", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__downloads_download__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__ac
beacon={"token": "expa_822fc4c216f1", "hit": false, "count": 0, "hits": []}

**Trajectory:**
1. `new_page` http://127.0.0.1:54841/page -> {"openedUrl": "http://127.0.0.1:54841/page", "target": {"description": "", "devtoolsFrontendUrl": "https://chrome-devtools-frontend.appspot.com/serve_rev/@199a3a541d76237379e353b348e64045584db057/inspector.html?ws=127.0.0.1:9222/devtools/pa
2. `set_source_breakpoint` content L215:C0 -> {"ok": false, "sourceFile": "content.js", "url": "chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/content.js", "line": 215, "column": 0, "targetHint": "content", "breakpointId": "br:1:214:0:chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/content.js", "resolved": false, "locations": [], "targetType": "page", "targetUrl": "http://127.0.0.1:54841/
3. `set_sink_breakpoint` background L116:C29 -> L119:C8 -> {"ok": true, "sourceFile": "background.js", "url": "chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/background.js", "line": 116, "column": 29, "targetHint": "background", "breakpointId": "1:115:29:chrome-extension://abfimpkhacgimamjbiegeoponlepcbob/background.js", "resolved": true, "locations": [{"scriptId": "3", "lineNumber": 120, "co
4. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "top-frame", "frameScoped": false, "input": {"bytes": 1401, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fileInspectionData", "fun", "guid", "hostname", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers": ["EXPAGENT_TEST_expa_
5. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "top-frame", "frameScoped": false, "input": {"bytes": 1395, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fileInspectionData", "fun", "guid", "hostname", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers": ["EXPAGENT_TEST_expa_
6. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "top-frame", "frameScoped": false, "input": {"bytes": 1400, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fileInspectionData", "fun", "guid", "hostname", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers": ["EXPAGENT_TEST_expa_
7. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "top-frame", "frameScoped": false, "input": {"bytes": 1575, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fileInspectionData", "fun", "guid", "hostname", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers": ["EXPAGENT_TEST_expa_
8. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "top-frame", "frameScoped": false, "input": {"bytes": 1563, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fileInspectionData", "fun", "guid", "hostname", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers": ["EXPAGENT_TEST_expa_
9. `sink_contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "top-frame", "frameScoped": false, "input": {"bytes": 1573, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fileInspectionData", "fun", "guid", "hostname", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers": ["EXPAGENT_TEST_expa_

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:54841/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 2 breakpoint(s); see artifact for line-level state.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:16:28.336128+00:00 | http://127.0.0.1:54841/page | sha256=9a98c1c2782da05c0216ac0c9876e24a3c30a223f7d61a370ce9b0d8e6f45b34
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abfimpkhacgimamjbiegeoponlepcbob/1.0.4/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-0\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: http://127.0.0.1:54841/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abfimpkhacgimamjbiegeoponlepcbob\1.0.4\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

<!-- manual-validation-flow-0 -->
## Manual validation — Flow #0

- Final verdict: **TRUE_POSITIVE**
- Automated outcome retained for audit: `INCONCLUSIVE_AFTER_DEBUG`
- Operator observation: 人工验证确认 WINDOW_MESSAGE_EVENT 输入进入 Fetch Body；该确认仅针对 FETCH_BODY 参数，不扩展解释为 URL 可控。
- Attestation: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000-ExPAgent\ExPGuard-Opti\chrome\abfimpkhacgimamjbiegeoponlepcbob_1.0.4\dynamic\evidence\flow-0\manual\manual_validation.json`
- Recorded at: `2026-09-19T13:59:51.788712+08:00`
