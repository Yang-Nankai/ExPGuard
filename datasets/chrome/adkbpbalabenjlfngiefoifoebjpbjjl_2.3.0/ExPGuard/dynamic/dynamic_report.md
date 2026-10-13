# ExPAgent Dynamic Test — adkbpbalabenjlfngiefoifoebjpbjjl v2.3.0

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `adkbpbalabenjlfngiefoifoebjpbjjl`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'adkbpbalabenjlfngiefoifoebjpbjjl', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:55246', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://onlineapp.live:55246', 'https://onlineapp.pro:55246', 'https://onlineapp.stream:55246'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 55246, 'hosts': ['onlineapp.pro', 'onlineapp.stream', 'onlineapp.live'], 'files': ['assets/Index.js', 'assets/options2.js', 'js/extension-worker.js', 'js/payments.js'], 'replacements': 18}, {'kind': 'externally_connectable-test-sender', 'semanticFixture': True, 'positiveOnly': True, 'path': 'manifest.json', 'detail': 'Added the controlled companion ID to the disposable manifest copy.', 'companionId': 'eeejfegkcegkghkmmbebhlfhdkmgonkm'}, {'kind': 'external-sender-tab-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'path': 'js/extension-worker.js', 'detail': 'Bounded sender.tab.id=0 supplied to an external listener.'}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_428b18cbdb80', 'source': 'supabase-auth-adapter', 'type': 'broadcast', 'action': 'setItem', 'data': {'key': 'expagent_controlled_key', 'value': 'expa_428b18cbdb80'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': {'status': 'error', 'message': 'Unauthorized domain'}}, mapped web send: {'ok': True, 'response': {'status': 'success'}}, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_a3f204eb9bfe4453", "actualGeneration": "observer_a3f204eb9bfe4453", "previousTargetId": "7B8BAF57B2452325D724BA3E0DD2B1A3", "currentTargetId": "7B8BAF57B2452325D724BA3E0DD2B1A3", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.sync.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__ac, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 55246, "hosts": ["onlineapp.pro", "onlineapp.stream", "onlineapp.live"], "files": ["assets/Index.js", "assets/options2.js", "js/extension-worker.js", "js/payments.js"], "replacements": 18}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}, {"kind": "external-sender-tab-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "path": "js/extension-worker.js", "detail": "Bounded sender.tab.id=0 supplied to an external listener."}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_a3f204eb9bfe4453", "targetId": "7B8BAF57B2452325D724BA3E0DD2B1A3", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["js/extension-worker"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-cxlsqv2x\\extension\\js\\extension-worker.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "unknown", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["source=supabase-
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(adkbpbalabenjlfngiefoifoebjpbjjl) -> {'ok': True, 'response': {'status': 'error', 'message': 'Unauthorized domain'}}
4. `mapped_web_origin_send` https://onlineapp.pro:55246/page -> {'ok': True, 'response': {'status': 'success'}}
5. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_a3f204eb9bfe4453", "actualGeneration": "observer_a3f2
6. `external_fixture_result` storage.sync.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:55246/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state-fixture` — 2026-09-19T04:11:25.469304+00:00 | http://127.0.0.1:55246/page | sha256=9a98c1c2782da05c0216ac0c9876e24a3c30a223f7d61a370ce9b0d8e6f45b34
  ![final-state-fixture](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/adkbpbalabenjlfngiefoifoebjpbjjl/2.3.0/dynamic-evidence/flow-0/step-final-state-fixture.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\adkbpbalabenjlfngiefoifoebjpbjjl\2.3.0\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state-fixture]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\adkbpbalabenjlfngiefoifoebjpbjjl\2.3.0\dynamic-evidence\flow-0\step-final-state-fixture.png` — Post-run controlled fixture state (reopened because the service-worker flow left no screenshot-capable page target); sink evidence remains in the trace.
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\adkbpbalabenjlfngiefoifoebjpbjjl\2.3.0\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---
