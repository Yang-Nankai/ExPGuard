# ExPAgent Dynamic Test — aeeninnnlhgaojlolnbpljadhbionlal v0.1.26

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `kfihbhaehmanmdbdhiibemhikmmcpbcj`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'kfihbhaehmanmdbdhiibemhikmmcpbcj', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:61362', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://app.bluedothq.com:61362', 'https://expagent.app.bluedothq.com:61362'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 61362, 'hosts': ['expagent.app.bluedothq.com', 'app.bluedothq.com'], 'files': ['scripts/background.js', 'scripts/load_app.js', 'scripts/recorder.js', 'scripts/uploader.js'], 'replacements': 14}, {'kind': 'externally_connectable-test-sender', 'semanticFixture': True, 'positiveOnly': True, 'path': 'manifest.json', 'detail': 'Added the controlled companion ID to the disposable manifest copy.', 'companionId': 'eeejfegkcegkghkmmbebhlfhdkmgonkm'}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 3 flow(s): 2 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** Companion extension sent message but no beacon hit and no sink tap activity.

**Payload:** `{'_expagent_marker': 'expa_2a9282650877', 'type': 'message', 'data': 'http://127.0.0.1:61362/beacon/expa_2a9282650877', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': None}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_f6a923c27d9a4ab3", "actualGeneration": "observer_f6a923c27d9a4ab3", "previousTargetId": "4D69D508C83BEB3AD2BA4559F1DD6B45", "currentTargetId": "4D69D508C83BEB3AD2BA4559F1DD6B45", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon_, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 61362, "hosts": ["expagent.app.bluedothq.com", "app.bluedothq.com"], "files": ["scripts/background.js", "scripts/load_app.js", "scripts/recorder.js", "scripts/uploader.js"], "replacements": 14}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_f6a923c27d9a4ab3", "targetId": "4D69D508C83BEB3AD2BA4559F1DD6B45", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["scripts/background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-8hgdpnhv\\extension\\scripts\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "localUploadState", "listenerToken": "onMessageExternal", "matchedRouteLiterals": [], "payloa
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(kfihbhaehmanmdbdhiibemhikmmcpbcj) -> {'ok': True, 'response': None}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_f6a923c27d9a4ab3", "actualGeneration": "observer_f6a9

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://expagent.app.bluedothq.com:61362/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state-fixture` — 2026-09-19T04:11:51.224113+00:00 | https://expagent.app.bluedothq.com:61362/page | sha256=83d6402ac9f52d2aaed33e58a360976919f3dea8ccc3a36262aed881ae1487ad
  ![final-state-fixture](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/aeeninnnlhgaojlolnbpljadhbionlal/0.1.26/dynamic-evidence/flow-0/step-final-state-fixture.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aeeninnnlhgaojlolnbpljadhbionlal\0.1.26\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state-fixture]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aeeninnnlhgaojlolnbpljadhbionlal\0.1.26\dynamic-evidence\flow-0\step-final-state-fixture.png` — Post-run controlled fixture state (reopened because the service-worker flow left no screenshot-capable page target); sink evidence remains in the trace.
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aeeninnnlhgaojlolnbpljadhbionlal\0.1.26\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_d362e5364180', 'type': 'message', 'data': 'http://127.0.0.1:61362/beacon/expa_d362e5364180', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': None}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_124c597136cc4c28", "actualGeneration": "observer_124c597136cc4c28", "previousTargetId": "4D69D508C83BEB3AD2BA4559F1DD6B45", "currentTargetId": "4D69D508C83BEB3AD2BA4559F1DD6B45", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"fetch\",\"storage.sync.set\",\"storage.session.set\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\", harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 61362, "hosts": ["expagent.app.bluedothq.com", "app.bluedothq.com"], "files": ["scripts/background.js", "scripts/load_app.js", "scripts/recorder.js", "scripts/uploader.js"], "replacements": 14}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_124c597136cc4c28", "targetId": "4D69D508C83BEB3AD2BA4559F1DD6B45", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["scripts/background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-8hgdpnhv\\extension\\scripts\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "localUploadPendingArr", "listenerToken": "onMessageExternal", "matchedRouteLiterals": [], "p
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(kfihbhaehmanmdbdhiibemhikmmcpbcj) -> {'ok': True, 'response': None}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_124c597136cc4c28", "actualGeneration": "observer_124c
5. `external_fixture_result` storage.session.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://expagent.app.bluedothq.com:61362/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:11:55.128860+00:00 | https://expagent.app.bluedothq.com:61362/page | sha256=83d6402ac9f52d2aaed33e58a360976919f3dea8ccc3a36262aed881ae1487ad
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/aeeninnnlhgaojlolnbpljadhbionlal/0.1.26/dynamic-evidence/flow-1/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aeeninnnlhgaojlolnbpljadhbionlal\0.1.26\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aeeninnnlhgaojlolnbpljadhbionlal\0.1.26\dynamic-evidence\flow-1\step-final-state.png` — Step `final-state`: https://expagent.app.bluedothq.com:61362/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aeeninnnlhgaojlolnbpljadhbionlal\0.1.26\dynamic-evidence\flow-1\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #2 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_01e87bab2a8e', 'type': 'message', 'data': 'http://127.0.0.1:61362/beacon/expa_01e87bab2a8e', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': None}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_29dc695fe108477b", "actualGeneration": "observer_29dc695fe108477b", "previousTargetId": "4D69D508C83BEB3AD2BA4559F1DD6B45", "currentTargetId": "4D69D508C83BEB3AD2BA4559F1DD6B45", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"fetch\",\"storage.sync.set\",\"storage.session.set\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\", harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 61362, "hosts": ["expagent.app.bluedothq.com", "app.bluedothq.com"], "files": ["scripts/background.js", "scripts/load_app.js", "scripts/recorder.js", "scripts/uploader.js"], "replacements": 14}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_29dc695fe108477b", "targetId": "4D69D508C83BEB3AD2BA4559F1DD6B45", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["scripts/background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-8hgdpnhv\\extension\\scripts\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "localUploadState", "listenerToken": "onMessageExternal", "matchedRouteLiterals": [], "payloa
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(kfihbhaehmanmdbdhiibemhikmmcpbcj) -> {'ok': True, 'response': None}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_29dc695fe108477b", "actualGeneration": "observer_29dc
5. `external_fixture_result` storage.session.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://expagent.app.bluedothq.com:61362/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:11:59.071925+00:00 | https://expagent.app.bluedothq.com:61362/page | sha256=83d6402ac9f52d2aaed33e58a360976919f3dea8ccc3a36262aed881ae1487ad
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/aeeninnnlhgaojlolnbpljadhbionlal/0.1.26/dynamic-evidence/flow-2/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aeeninnnlhgaojlolnbpljadhbionlal\0.1.26\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aeeninnnlhgaojlolnbpljadhbionlal\0.1.26\dynamic-evidence\flow-2\step-final-state.png` — Step `final-state`: https://expagent.app.bluedothq.com:61362/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aeeninnnlhgaojlolnbpljadhbionlal\0.1.26\dynamic-evidence\flow-2\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

<!-- manual-validation-flow-0 -->
## Manual validation — Flow #0

- Final verdict: **TRUE_POSITIVE**
- Automated outcome retained for audit: `INCONCLUSIVE_AFTER_DEBUG`
- Operator observation: 按交接 steps 完成人工验证，确认该 Flow 为 TP。
- Attestation: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000-ExPAgent\ExPGuard-Opti\chrome\aeeninnnlhgaojlolnbpljadhbionlal_0.1.26\dynamic\evidence\flow-0\manual\manual_validation.json`
- Recorded at: `2026-09-19T13:59:51.788712+08:00`
