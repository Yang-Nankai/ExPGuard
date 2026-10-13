# ExPAgent Dynamic Test — bnlghmkgojdehkigfkkblmmeldkmoccb v1.3.6

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `nlgccdngifgddadngekjibciodfofnbf`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'nlgccdngifgddadngekjibciodfofnbf', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://localhost:56379', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://expagent.markuphero.com:56379'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'externally_connectable-test-sender', 'semanticFixture': True, 'positiveOnly': True, 'path': 'manifest.json', 'detail': 'Added the controlled companion ID to the disposable manifest copy.', 'companionId': 'eeejfegkcegkghkmmbebhlfhdkmgonkm'}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** Companion extension sent message but no beacon hit and no sink tap activity.

**Payload:** `{'_expagent_marker': 'expa_44580e00afd4', 'message': 'version', 'type': 'end', 'url': 'http://localhost:56379/beacon/expa_44580e00afd4', 'URL': 'http://localhost:56379/beacon/expa_44580e00afd4', 'data': {'url': 'http://localhost:56379/beacon/expa_44580e00afd4', 'marker': 'expa_44580e00afd4'}, 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': '1.3.6'}, mapped web send: None, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_ba70663410f64854", "actualGeneration": "observer_ba70663410f64854", "previousTargetId": "E0430115447CE74620EDDF1BA94A9E48", "currentTargetId": "E0430115447CE74620EDDF1BA94A9E48", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\", harness patches: [{"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_ba70663410f64854", "targetId": "E0430115447CE74620EDDF1BA94A9E48", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["js/background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-ibs6zcx_\\extension\\js\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["message=version", "type=end"], "pay
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(nlgccdngifgddadngekjibciodfofnbf) -> {'ok': True, 'response': '1.3.6'}
4. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_ba70663410f64854", "actualGeneration": "observer_ba70

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:56379/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T13:19:47.307330+00:00 | about:blank | sha256=dbd1a27f5de7a1235fb2fb0f3b105004e687700f0301f794d8d53b3ceb0919a0
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bnlghmkgojdehkigfkkblmmeldkmoccb/1.3.6/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bnlghmkgojdehkigfkkblmmeldkmoccb\1.3.6\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bnlghmkgojdehkigfkkblmmeldkmoccb\1.3.6\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: about:blank
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bnlghmkgojdehkigfkkblmmeldkmoccb\1.3.6\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---
