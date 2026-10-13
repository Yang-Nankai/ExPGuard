# ExPAgent Dynamic Test — akjgeilpciajekhdkkomclnkmbapmfld v3.3.0.1000

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `akjgeilpciajekhdkkomclnkmbapmfld`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'akjgeilpciajekhdkkomclnkmbapmfld', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:58613', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://educational-search.web.app:58613', 'https://jsctrl.web.app:58613'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 58613, 'hosts': ['jsctrl.web.app', 'educational-search.web.app'], 'files': ['background.js', 'js/main.6f9bb9ec.js', 'js/options.196cd971.js'], 'replacements': 5}, {'kind': 'externally_connectable-test-sender', 'semanticFixture': True, 'positiveOnly': True, 'path': 'manifest.json', 'detail': 'Added the controlled companion ID to the disposable manifest copy.', 'companionId': 'eeejfegkcegkghkmmbebhlfhdkmgonkm'}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** Companion extension sent message but no beacon hit and no sink tap activity.

**Payload:** `{'_expagent_marker': 'expa_882c2073cc8c', 'type': 'hosting', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "options", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_c3b5813793c24856", "actualGeneration": "observer_c3b5813793c24856", "previousTargetId": "BBC4A34AE530926FE990C2EFD650CBD4", "currentTargetId": "BBC4A34AE530926FE990C2EFD650CBD4", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[],\"data\":{\"__fetch__\":true,\"__xhr__\":true,\"__function__\":true,\"__eval__\":true,\"__dom_innerHTML__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__act, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 58613, "hosts": ["jsctrl.web.app", "educational-search.web.app"], "files": ["background.js", "js/main.6f9bb9ec.js", "js/options.196cd971.js"], "replacements": 5}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` options -> {"sink_type": "all", "target_hint": "options", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_c3b5813793c24856", "targetId": "BBC4A34AE530926FE990C2EFD650CBD4", "lifecycle": {"ok": true, "targetId": "B
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["js/options.196cd971"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-mam8gqp8\\extension\\js\\options.196cd971.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "funcBtnLayoutInfo", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["type=h
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(akjgeilpciajekhdkkomclnkmbapmfld) -> {'ok': False, 'responsePending': True, 'error': 'timed out in 10.0s'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "options", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_c3b5813793c24856", "actualGeneration": "observer_c3b5813

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:58613/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state-fixture` — 2026-09-19T07:44:16.611385+00:00 | http://127.0.0.1:58613/page | sha256=1561f7a7514e175951aa0550e86f7c9490422709d8af2fbe3929d9643a24a347
  ![final-state-fixture](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/akjgeilpciajekhdkkomclnkmbapmfld/3.3.0.1000/dynamic-evidence/flow-0/step-final-state-fixture.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\akjgeilpciajekhdkkomclnkmbapmfld\3.3.0.1000\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state-fixture]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\akjgeilpciajekhdkkomclnkmbapmfld\3.3.0.1000\dynamic-evidence\flow-0\step-final-state-fixture.png` — Post-run controlled fixture state (reopened because the service-worker flow left no screenshot-capable page target); sink evidence remains in the trace.
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\akjgeilpciajekhdkkomclnkmbapmfld\3.3.0.1000\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---
