# ExPAgent Dynamic Test — aianbfmoodjcijnafbkbfhphjbabijjf v2.1.7

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `cjbjbjllgibdmeopijecjohckipbbaak`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'cjbjbjllgibdmeopijecjohckipbbaak', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:58180', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://steamcommunity.com:58180', 'https://steamlvlup.com:58180', 'https://store.steampowered.com:58180'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 58180, 'hosts': ['steamcommunity.com', 'steamlvlup.com', 'store.steampowered.com'], 'files': ['script/background.js', 'script/badgesContent.js', 'script/booster.js', 'script/bridge.js', 'script/cardFarm.js', 'script/gameContent.js', 'script/inAddFunds.js', 'script/inCart.js', 'script/inDropCards.js', 'script/popup.js', 'script/settings.js', 'script/tradeOffer.js'], 'replacements': 51}, {'kind': 'externally_connectable-test-sender', 'semanticFixture': True, 'positiveOnly': True, 'path': 'manifest.json', 'detail': 'Added the controlled companion ID to the disposable manifest copy.', 'companionId': 'eeejfegkcegkghkmmbebhlfhdkmgonkm'}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 2 flow(s): 2 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_aaafb83b5707', 'contentScriptQuery': 'queryResult', 'message': 'osStart', 'data': 'expa_aaafb83b5707', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': False}, mapped web send: {'ok': True, 'response': True}, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_1e0bdc30b9194690", "actualGeneration": "observer_1e0bdc30b9194690", "previousTargetId": "FD69020F5245532A2BF3B1EFBFC258D1", "currentTargetId": "FD69020F5245532A2BF3B1EFBFC258D1", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__a, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 58180, "hosts": ["steamcommunity.com", "steamlvlup.com", "store.steampowered.com"], "files": ["script/background.js", "script/badgesContent.js", "script/booster.js", "script/bridge.js", "script/cardFarm.js", "script/gameContent.js", "script/inAddFunds.js", "script/inCart.js", "script/inDropCards.js", "script/popup.js", "script/settings.js", "script/tradeOffer.js"], "replacements": 51}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_1e0bdc30b9194690", "targetId": "FD69020F5245532A2BF3B1EFBFC258D1", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["script/background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-bnbpdowy\\extension\\script\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "queryResult", "listenerToken": "onMessageExternal", "matchedRouteLiterals": ["contentScriptQue
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(cjbjbjllgibdmeopijecjohckipbbaak) -> {'ok': True, 'response': False}
4. `mapped_web_origin_send` https://steamcommunity.com:58180/page -> {'ok': True, 'response': True}
5. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_1e0bdc30b9194690", "actualGeneration": "observer_1e0b
6. `external_fixture_result` storage.local.set -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://steamcommunity.com:58180/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:09:40.871096+00:00 | https://steamcommunity.com:58180/page | sha256=83d6402ac9f52d2aaed33e58a360976919f3dea8ccc3a36262aed881ae1487ad
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/aianbfmoodjcijnafbkbfhphjbabijjf/2.1.7/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aianbfmoodjcijnafbkbfhphjbabijjf\2.1.7\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aianbfmoodjcijnafbkbfhphjbabijjf\2.1.7\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: https://steamcommunity.com:58180/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aianbfmoodjcijnafbkbfhphjbabijjf\2.1.7\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** A controlled companion extension reached the external-message listener and the exact privileged sink recorded the bounded test marker. If an ID allowlist existed, only the disposable manifest copy was patched and that semantic change is recorded.

**Payload:** `{'_expagent_marker': 'expa_62262ba16e37', 'contentScriptQuery': 'apiExtension', 'message': 'osStart', 'data': {'marker': 'expa_62262ba16e37', 'value': 'expa_62262ba16e37'}, 'url': 'http://127.0.0.1:58180/beacon/expa_62262ba16e37', 'URL': 'http://127.0.0.1:58180/beacon/expa_62262ba16e37', 'height': 640, 'draft_id': 'expagent_draft'}`

**Runtime evidence:** companion send result: {'ok': True, 'response': False}, mapped web send: {'ok': True, 'response': False}, sink tap: {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_ad4fb9f55eb44d28", "actualGeneration": "observer_ad4fb9f55eb44d28", "previousTargetId": "FD69020F5245532A2BF3B1EFBFC258D1", "currentTargetId": "FD69020F5245532A2BF3B1EFBFC258D1", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"storage.local.set\",\"storage.onChanged\",\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":, harness patches: [{"kind": "external-response-port-semantic-fixture", "semanticFixture": true, "positiveOnly": true, "port": 58180, "hosts": ["steamcommunity.com", "steamlvlup.com", "store.steampowered.com"], "files": ["script/background.js", "script/badgesContent.js", "script/booster.js", "script/bridge.js", "script/cardFarm.js", "script/gameContent.js", "script/inAddFunds.js", "script/inCart.js", "script/inDropCards.js", "script/popup.js", "script/settings.js", "script/tradeOffer.js"], "replacements": 51}, {"kind": "externally_connectable-test-sender", "semanticFixture": true, "positiveOnly": true, "path": "manifest.json", "detail": "Added the controlled companion ID to the disposable manifest copy.", "companionId": "eeejfegkcegkghkmmbebhlfhdkmgonkm"}]

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_ad4fb9f55eb44d28", "targetId": "FD69020F5245532A2BF3B1EFBFC258D1", "lifecycle": {"ok": true, "targetId":
2. `companion_payload_contract` bounded source-contract derivation -> {"sourceCandidates": ["script/background"], "selectedSourcePath": "C:\\Users\\ph0jav7\\AppData\\Local\\Temp\\expagent-dynamic-bnbpdowy\\extension\\script\\background.js", "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE", "sinkRemark": "https://extension.steamlvlup.com/api/steamsocket", "listenerToken": "onMessageExternal", "matc
3. `companion_send` companion(eeejfegkcegkghkmmbebhlfhdkmgonkm) -> target(cjbjbjllgibdmeopijecjohckipbbaak) -> {'ok': True, 'response': False}
4. `mapped_web_origin_send` https://steamcommunity.com:58180/page -> {'ok': True, 'response': False}
5. `observe` sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_ad4fb9f55eb44d28", "actualGeneration": "observer_ad4f
6. `external_fixture_result` fetch -> exact sink observed

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://steamcommunity.com:58180/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `final-state` — 2026-09-19T04:09:45.664383+00:00 | https://steamcommunity.com:58180/page | sha256=83d6402ac9f52d2aaed33e58a360976919f3dea8ccc3a36262aed881ae1487ad
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/aianbfmoodjcijnafbkbfhphjbabijjf/2.1.7/dynamic-evidence/flow-1/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aianbfmoodjcijnafbkbfhphjbabijjf\2.1.7\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aianbfmoodjcijnafbkbfhphjbabijjf\2.1.7\dynamic-evidence\flow-1\step-final-state.png` — Step `final-state`: https://steamcommunity.com:58180/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\aianbfmoodjcijnafbkbfhphjbabijjf\2.1.7\dynamic-evidence\flow-1\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalSenderIdentityNotClaimed=true semanticFixture=true originalSenderIdentityNotClaimed=true

---
