# ExPAgent Dynamic Test — amicfiagmpbgfiiopieeemlkblfeeeip v2.0.7

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `amicfiagmpbgfiiopieeemlkblfeeeip`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'amicfiagmpbgfiiopieeemlkblfeeeip', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:60852', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://expagent.funpay.com:60852', 'https://funpay.com:60852'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 60852, 'hosts': ['funpay.com', 'expagent.funpay.com'], 'files': ['background/b.js', 'content/c.js', 'content/static/litebotpage/redirect.js'], 'replacements': 10}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 5 flow(s): 0 CONFIRMED, 0 PARTIAL, 5 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #0 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** DOM source replay and observer completed, but the exact sink did not record the controlled marker. This is a runtime non-reproduction after an actual attempt, not NOT_ATTEMPTED. Semantic-fixture non-observation (NOT_REPRODUCED) cannot rebut the original extension boundary.

**Runtime evidence:** dom-target={"targetId": "09A845CF5CA278513CA3A18F26F46F85", "url": "https://funpay.com:60852/page"}
triggered-events=["change", "input", "click", "blur"]
content-retrigger={}
dom-source-continuation={"invoked": false, "attempts": [{"kind": "invoke-dom-log-writer", "result": {"invoked": false}}]}
dom-value-sink-tap={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_54cae5f773ab45d2", "actualGeneration": "observer_54cae5f773ab45d2", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"fetch\":[{\"ts\":1789803962679,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}},{\"ts\":1789803963888,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GE

**Trajectory:**
1. `dom_value_replay` ELEMENT_TEXT_CONTENT -> {'ready': True, 'selector': '.user-link-name', 'matches': 1}
2. `observe` pinned background sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_54cae5f773ab45d2", "actualGeneration": "observer_54cae5f773ab45d2", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://funpay.com:60852/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T07:46:05.418519+00:00 | https://funpay.com:60852/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-0/step-source-open.png>)
- `after-trigger` — 2026-09-19T07:46:05.662635+00:00 | https://funpay.com:60852/page | sha256=4d5f8d4c019da14c825f5a1d95b5c700aa5ef656ade3e92f95e5f1ddf709cbe2
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-0/step-after-trigger.png>)
- `after-observation` — 2026-09-19T07:46:10.804138+00:00 | https://funpay.com:60852/page | sha256=4d5f8d4c019da14c825f5a1d95b5c700aa5ef656ade3e92f95e5f1ddf709cbe2
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-0/step-after-observation.png>)
- `storage-after-observation` — 2026-09-19T07:46:11.008656+00:00 | https://funpay.com:60852/page | sha256=c31dcd0ca5a7556dcfeed58920c0a3651e8f62853203535b45b8950ed445f793
  ![storage-after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-0/storage-after-observation.png>)
- `final-state` — 2026-09-19T07:46:11.141017+00:00 | https://funpay.com:60852/page | sha256=4d5f8d4c019da14c825f5a1d95b5c700aa5ef656ade3e92f95e5f1ddf709cbe2
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: https://funpay.com:60852/page
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-0\step-after-trigger.png` — Step `after-trigger`: https://funpay.com:60852/page
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-0\step-after-observation.png` — Step `after-observation`: https://funpay.com:60852/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-0\storage-after-observation.json` — Storage state at `after-observation` (markers shown, others redacted)
- `screenshot` [storage-after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-0\storage-after-observation.png` — Storage panel (DevTools-style) at `after-observation`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: https://funpay.com:60852/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #1 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** DOM source replay and observer completed, but the exact sink did not record the controlled marker. This is a runtime non-reproduction after an actual attempt, not NOT_ATTEMPTED. Semantic-fixture non-observation (NOT_REPRODUCED) cannot rebut the original extension boundary.

**Runtime evidence:** dom-target={"targetId": "8758392FCD37084E947731DF8D1999B1", "url": "https://funpay.com:60852/page"}
triggered-events=["change", "input", "click", "blur"]
content-retrigger={}
dom-source-continuation={"invoked": false, "attempts": [{"kind": "invoke-dom-log-writer", "result": {"invoked": false}}]}
dom-value-sink-tap={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_ff135e7a37454126", "actualGeneration": "observer_ff135e7a37454126", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"fetch\":[{\"ts\":1789803962679,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}},{\"ts\":1789803963888,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GE

**Trajectory:**
1. `dom_value_replay` ELEMENT_TEXT_CONTENT -> {'ready': True, 'selector': '.user-link-name', 'matches': 1}
2. `observe` pinned background sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_ff135e7a37454126", "actualGeneration": "observer_ff135e7a37454126", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://funpay.com:60852/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T07:46:15.926042+00:00 | https://funpay.com:60852/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-1/step-source-open.png>)
- `after-trigger` — 2026-09-19T07:46:16.184737+00:00 | https://funpay.com:60852/page | sha256=ca0957b1f2f1a8f4a3d6b1f2f445fd897de82b4dd37611bf6977b009fdeb26ab
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-1/step-after-trigger.png>)
- `after-observation` — 2026-09-19T07:46:21.316764+00:00 | https://funpay.com:60852/page | sha256=ca0957b1f2f1a8f4a3d6b1f2f445fd897de82b4dd37611bf6977b009fdeb26ab
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-1/step-after-observation.png>)
- `storage-after-observation` — 2026-09-19T07:46:21.519447+00:00 | https://funpay.com:60852/page | sha256=c31dcd0ca5a7556dcfeed58920c0a3651e8f62853203535b45b8950ed445f793
  ![storage-after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-1/storage-after-observation.png>)
- `final-state` — 2026-09-19T07:46:21.645947+00:00 | https://funpay.com:60852/page | sha256=ca0957b1f2f1a8f4a3d6b1f2f445fd897de82b4dd37611bf6977b009fdeb26ab
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-1/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-1\step-source-open.png` — Step `source-open`: https://funpay.com:60852/page
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-1\step-after-trigger.png` — Step `after-trigger`: https://funpay.com:60852/page
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-1\step-after-observation.png` — Step `after-observation`: https://funpay.com:60852/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-1\storage-after-observation.json` — Storage state at `after-observation` (markers shown, others redacted)
- `screenshot` [storage-after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-1\storage-after-observation.png` — Storage panel (DevTools-style) at `after-observation`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-1\step-final-state.png` — Step `final-state`: https://funpay.com:60852/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-1\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #2 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** DOM source replay and observer completed, but the exact sink did not record the controlled marker. This is a runtime non-reproduction after an actual attempt, not NOT_ATTEMPTED. Semantic-fixture non-observation (NOT_REPRODUCED) cannot rebut the original extension boundary.

**Runtime evidence:** dom-target={"targetId": "2EAB100C598B59900E74937D6484F4BF", "url": "https://funpay.com:60852/page"}
triggered-events=["change", "input", "click", "blur"]
content-retrigger={}
dom-source-continuation={"invoked": false, "attempts": []}
dom-value-sink-tap={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_b2ddf86293534a87", "actualGeneration": "observer_b2ddf86293534a87", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"fetch\":[{\"ts\":1789803962679,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}},{\"ts\":1789803963888,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GE

**Trajectory:**
1. `dom_value_replay` ELEMENT_VALUE -> {'ready': True, 'selector': '.lb-review-textarea', 'matches': 1}
2. `observe` pinned background sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_b2ddf86293534a87", "actualGeneration": "observer_b2ddf86293534a87", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://funpay.com:60852/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T07:46:26.197264+00:00 | https://funpay.com:60852/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-2/step-source-open.png>)
- `after-trigger` — 2026-09-19T07:46:26.394834+00:00 | https://funpay.com:60852/page | sha256=cc13a594fc380ef7a664d06daa66ab0fc9117685cf43c004cdb577e6ba13995d
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-2/step-after-trigger.png>)
- `after-observation` — 2026-09-19T07:46:31.554099+00:00 | https://funpay.com:60852/page | sha256=29695eb94c69e4ccf7c712837752a61a671b458005fdc4110d66a438eca55c35
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-2/step-after-observation.png>)
- `storage-after-observation` — 2026-09-19T07:46:31.721036+00:00 | https://funpay.com:60852/page | sha256=c31dcd0ca5a7556dcfeed58920c0a3651e8f62853203535b45b8950ed445f793
  ![storage-after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-2/storage-after-observation.png>)
- `final-state` — 2026-09-19T07:46:31.837829+00:00 | https://funpay.com:60852/page | sha256=cc13a594fc380ef7a664d06daa66ab0fc9117685cf43c004cdb577e6ba13995d
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-2/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-2\step-source-open.png` — Step `source-open`: https://funpay.com:60852/page
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-2\step-after-trigger.png` — Step `after-trigger`: https://funpay.com:60852/page
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-2\step-after-observation.png` — Step `after-observation`: https://funpay.com:60852/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-2\storage-after-observation.json` — Storage state at `after-observation` (markers shown, others redacted)
- `screenshot` [storage-after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-2\storage-after-observation.png` — Storage panel (DevTools-style) at `after-observation`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-2\step-final-state.png` — Step `final-state`: https://funpay.com:60852/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-2\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #3 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** DOM source replay and observer completed, but the exact sink did not record the controlled marker. This is a runtime non-reproduction after an actual attempt, not NOT_ATTEMPTED. Semantic-fixture non-observation (NOT_REPRODUCED) cannot rebut the original extension boundary.

**Runtime evidence:** dom-target={"targetId": "D1D5628F0A6E9D50112B63AB86545D41", "url": "https://funpay.com:60852/page"}
triggered-events=["change", "input", "click", "blur"]
content-retrigger={}
dom-source-continuation={"invoked": false, "attempts": []}
dom-value-sink-tap={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_fdbe817e786c42be", "actualGeneration": "observer_fdbe817e786c42be", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"fetch\":[{\"ts\":1789803962679,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}},{\"ts\":1789803963888,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GE

**Trajectory:**
1. `dom_value_replay` ELEMENT_VALUE -> {'ready': True, 'selector': '.lb-review-textarea', 'matches': 1}
2. `observe` pinned background sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_fdbe817e786c42be", "actualGeneration": "observer_fdbe817e786c42be", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://funpay.com:60852/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T07:46:36.526785+00:00 | https://funpay.com:60852/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-3/step-source-open.png>)
- `after-trigger` — 2026-09-19T07:46:36.847483+00:00 | https://funpay.com:60852/page | sha256=0ff0928a5cf6f2305447bc7bae8d9971b2992f181f5d9296dcca8f46e1b47d45
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-3/step-after-trigger.png>)
- `after-observation` — 2026-09-19T07:46:41.948679+00:00 | https://funpay.com:60852/page | sha256=0ff0928a5cf6f2305447bc7bae8d9971b2992f181f5d9296dcca8f46e1b47d45
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-3/step-after-observation.png>)
- `storage-after-observation` — 2026-09-19T07:46:42.145691+00:00 | https://funpay.com:60852/page | sha256=c31dcd0ca5a7556dcfeed58920c0a3651e8f62853203535b45b8950ed445f793
  ![storage-after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-3/storage-after-observation.png>)
- `final-state` — 2026-09-19T07:46:42.270778+00:00 | https://funpay.com:60852/page | sha256=0ff0928a5cf6f2305447bc7bae8d9971b2992f181f5d9296dcca8f46e1b47d45
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-3/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-3\step-source-open.png` — Step `source-open`: https://funpay.com:60852/page
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-3\step-after-trigger.png` — Step `after-trigger`: https://funpay.com:60852/page
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-3\step-after-observation.png` — Step `after-observation`: https://funpay.com:60852/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-3\storage-after-observation.json` — Storage state at `after-observation` (markers shown, others redacted)
- `screenshot` [storage-after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-3\storage-after-observation.png` — Storage panel (DevTools-style) at `after-observation`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-3\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-3\step-final-state.png` — Step `final-state`: https://funpay.com:60852/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-3\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---

## Flow #4 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.40)

**Reasoning:** DOM source replay and observer completed, but the exact sink did not record the controlled marker. This is a runtime non-reproduction after an actual attempt, not NOT_ATTEMPTED. Semantic-fixture non-observation (NOT_REPRODUCED) cannot rebut the original extension boundary.

**Runtime evidence:** dom-target={"targetId": "5B917FB75DA31FB9E73F8FD4B624F607", "url": "https://funpay.com:60852/page"}
triggered-events=["change", "input", "click", "blur"]
content-retrigger={}
dom-source-continuation={"invoked": false, "attempts": []}
dom-value-sink-tap={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_d829830c51ff46b1", "actualGeneration": "observer_d829830c51ff46b1", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"fetch\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__cookies_set__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__runtime_sendMessage__\":true,\"fetch\":[{\"ts\":1789803962679,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GET\",\"body\":{\"redacted\":true,\"length\":0}},{\"ts\":1789803963888,\"request\":{\"redacted\":true,\"length\":52},\"method\":\"GE

**Trajectory:**
1. `dom_value_replay` ELEMENT_VALUE -> {'ready': True, 'selector': '#select.LB-select', 'matches': 1}
2. `observe` pinned background sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_d829830c51ff46b1", "actualGeneration": "observer_d829830c51ff46b1", "previousTargetId": "7B6B6A786D7621EBE2CABF775A6082E9", "currentTargetId": "7B6B6A786D7621EBE2CABF775A

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://funpay.com:60852/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T07:46:47.233562+00:00 | https://funpay.com:60852/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-4/step-source-open.png>)
- `after-trigger` — 2026-09-19T07:46:47.465929+00:00 | https://funpay.com:60852/page | sha256=35b3ed89b69146575796b6a80198222bbfd609b3ca7953c675a4a8f256dcc88d
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-4/step-after-trigger.png>)
- `after-observation` — 2026-09-19T07:46:52.639753+00:00 | https://funpay.com:60852/page | sha256=35b3ed89b69146575796b6a80198222bbfd609b3ca7953c675a4a8f256dcc88d
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-4/step-after-observation.png>)
- `storage-after-observation` — 2026-09-19T07:46:52.895510+00:00 | https://funpay.com:60852/page | sha256=c31dcd0ca5a7556dcfeed58920c0a3651e8f62853203535b45b8950ed445f793
  ![storage-after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-4/storage-after-observation.png>)
- `final-state` — 2026-09-19T07:46:53.055069+00:00 | https://funpay.com:60852/page | sha256=35b3ed89b69146575796b6a80198222bbfd609b3ca7953c675a4a8f256dcc88d
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/amicfiagmpbgfiiopieeemlkblfeeeip/2.0.7/dynamic-evidence/flow-4/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-4\step-source-open.png` — Step `source-open`: https://funpay.com:60852/page
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-4\step-after-trigger.png` — Step `after-trigger`: https://funpay.com:60852/page
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-4\step-after-observation.png` — Step `after-observation`: https://funpay.com:60852/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-4\storage-after-observation.json` — Storage state at `after-observation` (markers shown, others redacted)
- `screenshot` [storage-after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-4\storage-after-observation.png` — Storage panel (DevTools-style) at `after-observation`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-4\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-4\step-final-state.png` — Step `final-state`: https://funpay.com:60852/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\amicfiagmpbgfiiopieeemlkblfeeeip\2.0.7\dynamic-evidence\flow-4\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---
