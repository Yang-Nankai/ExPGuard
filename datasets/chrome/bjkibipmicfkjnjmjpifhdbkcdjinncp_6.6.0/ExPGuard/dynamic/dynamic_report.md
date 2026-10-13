# ExPAgent Dynamic Test — bjkibipmicfkjnjmjpifhdbkcdjinncp v6.6.0

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `bjkibipmicfkjnjmjpifhdbkcdjinncp`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'bjkibipmicfkjnjmjpifhdbkcdjinncp', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:62536', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://expagent.google.com:62536', 'https://expagent.youtube.com:62536', 'https://plus-max-speed.ru:62536', 'https://plus-max-speed.wip:62536'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 62536, 'hosts': ['plus-max-speed.wip', 'plus-max-speed.ru', 'expagent.google.com', 'expagent.youtube.com'], 'files': ['background.js', 'popup.js', 'content_scripts/content.js'], 'replacements': 5}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 4 flow(s): 3 CONFIRMED, 0 PARTIAL, 1 TOOL_LIMITATION.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_96e8b393f3ac", "url": "http://127.0.0.1:62536/beacon/expa_ac929c618406", "data": {"action": "updateData"}, "value": "EXPAGENT_TEST_expa_96e8b393f3ac", "message": "EXPAGENT_TEST_expa_96e8b393f3ac", "title": "EXPAGENT_TEST_expa_96e8b393f3ac", "text": "EXPAGENT_TEST_expa_96e8b393f3ac", "number": "EXPAGENT_TEST_expa_96e8b393f3ac", "name": "EXPAGENT_TEST_expa_96e8b393f3ac", "id": "EXPAGENT_TEST_expa_96e8b393f3ac", "key": "EXPAGENT_TEST_expa_96e8b393f3ac", "type": "EXPAGENT_TEST_expa_96e8b393f3ac", "action": "updateData", "cmd": "EXPAGENT_TEST_expa_96e8b393f3ac", "Action": "EXPAGENT_TEST_expa_96e8b393f3ac", "Message": "EXPAGENT_TEST_expa_96e8b393f3ac", "fun": "EXPAGENT_TEST_expa_96e8b393f3ac", "auth": "EXPAGENT_TEST_expa_96e8b393f3ac", "phone": "EXPAGENT_TEST_expa_96e8b393f3ac", "email": "EXPAGENT_TEST_expa_96e8b393f3ac", "version": "EXPAGENT_TEST_expa_96e8b393f3ac", "token": "EXPAGENT_TEST_expa_96e8b393f3ac", "content": "EXPAGENT_TEST_expa_96e8b393f3ac", "payload": "EXPAGENT_TEST_expa_96e8b393f3ac", "kind": "EXPAGENT_TEST_expa_96e8b393f3ac", "requestId": "EXPAGENT_TEST_expa_96e8b393f3ac", "revision": "EXPAGENT_TEST_expa_96e8b393f3ac", "guid": "EXPAGENT_TEST_expa_96e8b393f3ac", "initiatingPage": "EXPAGENT_TEST_expa_96e8b393f3ac", "referringPage": "EXPAGENT_TEST_expa_96e8b393f3ac", "fileInspectionData": "EXPAGENT_TEST_expa_96e8b393f3ac", "sha256": "EXPAGENT_TEST_expa_96e8b393f3ac", "stateConnected": {"access": "premium", "status": "success"}, "popup": {"newValue": "open"}, "detail": "EXPAGENT_TEST_expa_96e8b393f3ac"}, {"marker": "EXPAGENT_TEST_expa_`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "assets/content.js", "location": "L2:C38 -> L2:C50", "eventNames": ["updateDataExtensionPopup", "openExtensionPopup"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"stateConnected.access": "premium", "stateConnected.status": "success", "popup.newValue": "open", "data.action": "updateData"}, "selectors": [], "mediaTags": [], "snippet": "document.addEventListener(\"updateDataExtensionPopup\", (event) => {\n    chrome.runtime.sendMessage({data: event.detail}).then(r => {\n    })\n});\n\ndocument.addEventListener(\"openExtensionPopup\", (event) => {\n    chrome.runtime.sendMessage({data: event.detail}).then(r => {\n    })\n});", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `action` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "action", "discriminatorValues": ["updateData", "openPopup"], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "e", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["detail"], "contractConfidence": "HIGH", "contractWarnings": []}
page-target={"targetId": "6B450674C632E69B1BB2CC1F2CA3E523", "url": "https://plus-max-speed.ru:62536/page"}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_d18157a3b6eb4d46", "targetId": "9F89DCA4D9542849C2AF728341478B4F", "lifecycle": {"ok": true, "targetId": "9F89DCA4D9542849C2AF728341478B4F", "targetType": "service_worker", "targetUrl": "chrome-extension://bjkibipmicfkjnjmjpifhdbkcdjinncp/background.js", "attachCo
source-bridge-instrument={"sink_type": "all", "target_hint": "content", "context": "isolated-world", "observerReady": true, "observerGeneration": "observer_3c47ff1c24ed4790", "targetId": "6B450674C632E69B1BB2CC1F2CA3E523", "pageUrl": "https://plus-max-speed.ru:62536/page", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\",\"observerToken\":\"observer_3c47ff1c24ed4790\"}"}
stimulus={"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "updateDataExtensionPopup", "input": {"bytes": 1492, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiat

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_d18157a3b6eb4d46", "targetId": "9F89DCA4D9542849C2AF728341478B4F", "lifecycle": {"ok": true, "targetId":
2. `new_page` https://plus-max-speed.ru:62536/page -> {"openedUrl": "https://plus-max-speed.ru:62536/page", "target": {"description": "", "devtoolsFrontendUrl": "https://chrome-devtools-frontend.appspot.com/serve_rev/@199a3a541d76237379e353b348e64045584db057/inspector.html?ws=127.0.0.1:9222/de
3. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "updateDataExtensionPopup", "input": {"bytes": 1492, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testM
4. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "updateDataExtensionPopup", "input": {"bytes": 1491, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testM
5. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "updateDataExtensionPopup", "input": {"bytes": 1836, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testM
6. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "updateDataExtensionPopup", "input": {"bytes": 1834, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testM
7. `observe` sink tap + local beacon -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_d18157a3b6eb4d46", "actualGeneration": "observer_d181

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://plus-max-speed.ru:62536/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T11:40:40.789988+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-0/step-source-open.png>)
- `after-trigger` — 2026-09-19T11:40:42.393265+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-0/step-after-trigger.png>)
- `storage-after-trigger` — 2026-09-19T11:40:42.627079+00:00 | https://plus-max-speed.ru:62536/page | sha256=21227cdb425da75380e7029683ae3cd8971270e1d06970a3a91509aaaf761ca2
  ![storage-after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-0/storage-after-trigger.png>)
- `after-observation` — 2026-09-19T11:40:46.308192+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-0/step-after-observation.png>)
- `storage-after-observation` — 2026-09-19T11:40:46.468977+00:00 | https://plus-max-speed.ru:62536/page | sha256=777a03e9b0c009902eb7cda9ed1095e0627c70a15832421a8cb0100d6d7f0dd4
  ![storage-after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-0/storage-after-observation.png>)
- `final-state` — 2026-09-19T11:40:46.534118+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: https://plus-max-speed.ru:62536/page
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\step-after-trigger.png` — Step `after-trigger`: https://plus-max-speed.ru:62536/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot` [storage-after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\step-after-observation.png` — Step `after-observation`: https://plus-max-speed.ru:62536/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\storage-after-observation.json` — Storage state at `after-observation` (markers shown, others redacted)
- `screenshot` [storage-after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\storage-after-observation.png` — Storage panel (DevTools-style) at `after-observation`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: https://plus-max-speed.ru:62536/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** sinkTapKey=storage.local.set sourceBridgeReached=false semanticFixture=true

---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_73c2e7871cec", "url": "http://127.0.0.1:62536/beacon/expa_7709f1947f3b", "data": {"action": "updateData"}, "value": "EXPAGENT_TEST_expa_73c2e7871cec", "message": "EXPAGENT_TEST_expa_73c2e7871cec", "title": "EXPAGENT_TEST_expa_73c2e7871cec", "text": "EXPAGENT_TEST_expa_73c2e7871cec", "number": "EXPAGENT_TEST_expa_73c2e7871cec", "name": "EXPAGENT_TEST_expa_73c2e7871cec", "id": "EXPAGENT_TEST_expa_73c2e7871cec", "key": "EXPAGENT_TEST_expa_73c2e7871cec", "type": "EXPAGENT_TEST_expa_73c2e7871cec", "action": "updateData", "cmd": "EXPAGENT_TEST_expa_73c2e7871cec", "Action": "EXPAGENT_TEST_expa_73c2e7871cec", "Message": "EXPAGENT_TEST_expa_73c2e7871cec", "fun": "EXPAGENT_TEST_expa_73c2e7871cec", "auth": "EXPAGENT_TEST_expa_73c2e7871cec", "phone": "EXPAGENT_TEST_expa_73c2e7871cec", "email": "EXPAGENT_TEST_expa_73c2e7871cec", "version": "EXPAGENT_TEST_expa_73c2e7871cec", "token": "EXPAGENT_TEST_expa_73c2e7871cec", "content": "EXPAGENT_TEST_expa_73c2e7871cec", "payload": "EXPAGENT_TEST_expa_73c2e7871cec", "kind": "EXPAGENT_TEST_expa_73c2e7871cec", "requestId": "EXPAGENT_TEST_expa_73c2e7871cec", "revision": "EXPAGENT_TEST_expa_73c2e7871cec", "guid": "EXPAGENT_TEST_expa_73c2e7871cec", "initiatingPage": "EXPAGENT_TEST_expa_73c2e7871cec", "referringPage": "EXPAGENT_TEST_expa_73c2e7871cec", "fileInspectionData": "EXPAGENT_TEST_expa_73c2e7871cec", "sha256": "EXPAGENT_TEST_expa_73c2e7871cec", "stateConnected": {"access": "premium", "status": "success"}, "popup": {"newValue": "open"}, "detail": "EXPAGENT_TEST_expa_73c2e7871cec"}, {"marker": "EXPAGENT_TEST_expa_`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "assets/content.js", "location": "L7:C38 -> L7:C50", "eventNames": ["openExtensionPopup", "updateDataExtensionPopup"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"stateConnected.access": "premium", "stateConnected.status": "success", "popup.newValue": "open", "data.action": "updateData"}, "selectors": [], "mediaTags": [], "snippet": "document.addEventListener(\"updateDataExtensionPopup\", (event) => {\n    chrome.runtime.sendMessage({data: event.detail}).then(r => {\n    })\n});\n\ndocument.addEventListener(\"openExtensionPopup\", (event) => {\n    chrome.runtime.sendMessage({data: event.detail}).then(r => {\n    })\n});", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `action` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "action", "discriminatorValues": ["updateData", "openPopup"], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "e", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["detail"], "contractConfidence": "HIGH", "contractWarnings": []}
page-target={"targetId": "55E53B8419825345F3A97B47E406A036", "url": "https://plus-max-speed.ru:62536/page"}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_f052651f0fd24427", "targetId": "9F89DCA4D9542849C2AF728341478B4F", "lifecycle": {"ok": true, "targetId": "9F89DCA4D9542849C2AF728341478B4F", "targetType": "service_worker", "targetUrl": "chrome-extension://bjkibipmicfkjnjmjpifhdbkcdjinncp/background.js", "attachCo
source-bridge-instrument={"sink_type": "all", "target_hint": "content", "context": "isolated-world", "observerReady": true, "observerGeneration": "observer_71eb9628ba8c4438", "targetId": "55E53B8419825345F3A97B47E406A036", "pageUrl": "https://plus-max-speed.ru:62536/page", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\",\"observerToken\":\"observer_71eb9628ba8c4438\"}"}
stimulus={"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1492, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPag

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_f052651f0fd24427", "targetId": "9F89DCA4D9542849C2AF728341478B4F", "lifecycle": {"ok": true, "targetId":
2. `new_page` https://plus-max-speed.ru:62536/page -> {"openedUrl": "https://plus-max-speed.ru:62536/page", "target": {"description": "", "devtoolsFrontendUrl": "https://chrome-devtools-frontend.appspot.com/serve_rev/@199a3a541d76237379e353b348e64045584db057/inspector.html?ws=127.0.0.1:9222/de
3. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1492, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers
4. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1491, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers
5. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1836, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers
6. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1834, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers
7. `observe` sink tap + local beacon -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_f052651f0fd24427", "actualGeneration": "observer_f052

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://plus-max-speed.ru:62536/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T11:40:47.949992+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-1/step-source-open.png>)
- `after-trigger` — 2026-09-19T11:40:49.532057+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-1/step-after-trigger.png>)
- `storage-after-trigger` — 2026-09-19T11:40:49.706557+00:00 | https://plus-max-speed.ru:62536/page | sha256=d025a8a9829a76b9b995fef0153b7f8182b59b63e804163bf98f5c51eee61dc6
  ![storage-after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-1/storage-after-trigger.png>)
- `after-observation` — 2026-09-19T11:40:53.429527+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-1/step-after-observation.png>)
- `storage-after-observation` — 2026-09-19T11:40:53.559223+00:00 | https://plus-max-speed.ru:62536/page | sha256=a869a902f66fd265fea6a18be7e0e74783b380f372df98402ed61b0427ca5825
  ![storage-after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-1/storage-after-observation.png>)
- `final-state` — 2026-09-19T11:40:53.650795+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-1/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\step-source-open.png` — Step `source-open`: https://plus-max-speed.ru:62536/page
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\step-after-trigger.png` — Step `after-trigger`: https://plus-max-speed.ru:62536/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot` [storage-after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\step-after-observation.png` — Step `after-observation`: https://plus-max-speed.ru:62536/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\storage-after-observation.json` — Storage state at `after-observation` (markers shown, others redacted)
- `screenshot` [storage-after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\storage-after-observation.png` — Storage panel (DevTools-style) at `after-observation`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\step-final-state.png` — Step `final-state`: https://plus-max-speed.ru:62536/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-1\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** sinkTapKey=storage.local.set sourceBridgeReached=false semanticFixture=true

---

## Flow #2 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_a9fe108fc389", "url": "http://127.0.0.1:62536/beacon/expa_38995ad624dd", "data": {"action": "updateData", "payment": "creating"}, "value": "EXPAGENT_TEST_expa_a9fe108fc389", "message": "EXPAGENT_TEST_expa_a9fe108fc389", "title": "EXPAGENT_TEST_expa_a9fe108fc389", "text": "EXPAGENT_TEST_expa_a9fe108fc389", "number": "EXPAGENT_TEST_expa_a9fe108fc389", "name": "EXPAGENT_TEST_expa_a9fe108fc389", "id": "EXPAGENT_TEST_expa_a9fe108fc389", "key": "EXPAGENT_TEST_expa_a9fe108fc389", "type": "EXPAGENT_TEST_expa_a9fe108fc389", "action": "updateData", "cmd": "EXPAGENT_TEST_expa_a9fe108fc389", "Action": "EXPAGENT_TEST_expa_a9fe108fc389", "Message": "EXPAGENT_TEST_expa_a9fe108fc389", "fun": "EXPAGENT_TEST_expa_a9fe108fc389", "auth": "EXPAGENT_TEST_expa_a9fe108fc389", "phone": "EXPAGENT_TEST_expa_a9fe108fc389", "email": "EXPAGENT_TEST_expa_a9fe108fc389", "version": "EXPAGENT_TEST_expa_a9fe108fc389", "token": "EXPAGENT_TEST_expa_a9fe108fc389", "content": "EXPAGENT_TEST_expa_a9fe108fc389", "payload": "EXPAGENT_TEST_expa_a9fe108fc389", "kind": "EXPAGENT_TEST_expa_a9fe108fc389", "requestId": "EXPAGENT_TEST_expa_a9fe108fc389", "revision": "EXPAGENT_TEST_expa_a9fe108fc389", "guid": "EXPAGENT_TEST_expa_a9fe108fc389", "initiatingPage": "EXPAGENT_TEST_expa_a9fe108fc389", "referringPage": "EXPAGENT_TEST_expa_a9fe108fc389", "fileInspectionData": "EXPAGENT_TEST_expa_a9fe108fc389", "sha256": "EXPAGENT_TEST_expa_a9fe108fc389", "stateConnected": {"access": "premium", "status": "success"}, "popup": {"newValue": "open"}, "detail": "EXPAGENT_TEST_expa_a9fe108fc389"}, {"marker`

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "assets/content.js", "location": "L7:C38 -> L7:C50", "eventNames": ["openExtensionPopup", "updateDataExtensionPopup"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {"stateConnected.access": "premium", "stateConnected.status": "success", "popup.newValue": "open", "data.action": "updateData", "data.payment": "creating"}, "selectors": [], "mediaTags": [], "snippet": "document.addEventListener(\"updateDataExtensionPopup\", (event) => {\n    chrome.runtime.sendMessage({data: event.detail}).then(r => {\n    })\n});\n\ndocument.addEventListener(\"openExtensionPopup\", (event) => {\n    chrome.runtime.sendMessage({data: event.detail}).then(r => {\n    })\n});", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `action` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "action", "discriminatorValues": ["updateData", "openPopup"], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "e", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["detail"], "contractConfidence": "HIGH", "contractWarnings": []}
page-target={"targetId": "6BC11E9EE3F511E818A65B5E04A8CA71", "url": "https://plus-max-speed.ru:62536/page"}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_bf72c0a1035c47f2", "targetId": "9F89DCA4D9542849C2AF728341478B4F", "lifecycle": {"ok": true, "targetId": "9F89DCA4D9542849C2AF728341478B4F", "targetType": "service_worker", "targetUrl": "chrome-extension://bjkibipmicfkjnjmjpifhdbkcdjinncp/background.js", "attachCo
source-bridge-instrument={"sink_type": "all", "target_hint": "content", "context": "isolated-world", "observerReady": true, "observerGeneration": "observer_dfcfb60cee8e4f04", "targetId": "6BC11E9EE3F511E818A65B5E04A8CA71", "pageUrl": "https://plus-max-speed.ru:62536/page", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\",\"observerToken\":\"observer_dfcfb60cee8e4f04\"}"}
stimulus={"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1513, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", 

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_bf72c0a1035c47f2", "targetId": "9F89DCA4D9542849C2AF728341478B4F", "lifecycle": {"ok": true, "targetId":
2. `new_page` https://plus-max-speed.ru:62536/page -> {"openedUrl": "https://plus-max-speed.ru:62536/page", "target": {"description": "", "devtoolsFrontendUrl": "https://chrome-devtools-frontend.appspot.com/serve_rev/@199a3a541d76237379e353b348e64045584db057/inspector.html?ws=127.0.0.1:9222/de
3. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1513, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers
4. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1512, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers
5. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1857, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers
6. `contract_stimulus` CUSTOM_EVENT -> {"action": "dispatchEvent", "targetUrl": "top-frame", "frameScoped": false, "event": "openExtensionPopup", "input": {"bytes": 1855, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "detail", "email", "fileInspectionData", "fun", "guid", "id", "initiatingPage", "key", "kind", "marker", "message", "name", "number"], "testMarkers
7. `observe` sink tap + local beacon -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_bf72c0a1035c47f2", "actualGeneration": "observer_bf72

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://plus-max-speed.ru:62536/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T11:40:55.094785+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-2/step-source-open.png>)
- `after-trigger` — 2026-09-19T11:40:56.681792+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-2/step-after-trigger.png>)
- `storage-after-trigger` — 2026-09-19T11:40:56.922863+00:00 | https://plus-max-speed.ru:62536/page | sha256=e13baf9f995b170dc498a10a8bfa56ce5c3f7fe5de00bfd87c3c881b606dfa99
  ![storage-after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-2/storage-after-trigger.png>)
- `after-observation` — 2026-09-19T11:41:00.669618+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-2/step-after-observation.png>)
- `storage-after-observation` — 2026-09-19T11:41:00.906214+00:00 | https://plus-max-speed.ru:62536/page | sha256=e8915fbaaa479e0da4eee89c9fbb7b441bbb654c993ce63d1b441f230f943689
  ![storage-after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-2/storage-after-observation.png>)
- `final-state` — 2026-09-19T11:41:00.987961+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-2/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\step-source-open.png` — Step `source-open`: https://plus-max-speed.ru:62536/page
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\step-after-trigger.png` — Step `after-trigger`: https://plus-max-speed.ru:62536/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot` [storage-after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\step-after-observation.png` — Step `after-observation`: https://plus-max-speed.ru:62536/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\storage-after-observation.json` — Storage state at `after-observation` (markers shown, others redacted)
- `screenshot` [storage-after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\storage-after-observation.png` — Storage panel (DevTools-style) at `after-observation`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\step-final-state.png` — Step `final-state`: https://plus-max-speed.ru:62536/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-2\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** sinkTapKey=storage.local.set sourceBridgeReached=false semanticFixture=true

---

## Flow #3 — TOOL LIMITATION  (reproduced=False, confidence 1.00)

**Reasoning:** The required extension execution context could not be attached, so ExPAgent could not install the sink observer or establish a line-level breakpoint. This run provides no evidence that the static source-to-sink path is absent. {"error": "no extension target found", "hint": "popup"}

**Runtime evidence:** source-contract={"surface": "CUSTOM_EVENT", "sourcePath": "assets/content.js", "location": "L1:C6120 -> L1:C6480", "eventNames": ["openExtensionPopup", "updateDataExtensionPopup"], "eventTarget": "document", "eventDetailKey": "detail", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "document.addEventListener(\"updateDataExtensionPopup\", (event) => {\n    chrome.runtime.sendMessage({data: event.detail}).then(r => {\n    })\n});\n\ndocument.addEventListener(\"openExtensionPopup\", (event) => {\n    chrome.runtime.sendMessage({data: event.detail}).then(r => {\n    })\n});", "notes": ["contract warning: missing discriminator field", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "", "discriminatorValues": [], "urlField": "url", "sinkTapKey": "fetch", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["detail"], "contractConfidence": "LOW", "contractWarnings": ["missing discriminator field"]}
source-breakpoint=armed
source-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "https://plus-max-speed.ru:62536/page"}, "frames": []}
source-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "https://plus-max-speed.ru:62536/page"}, "frames": []}
source-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "https://plus-max-speed.ru:62536/page"}, "frames": []}
isolated-source-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "https://plus-max-speed.ru:62536/page"}, "frames": []}
isolated-source-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "https://plus-max-speed.ru:62536/page"}, "frames": []}
isolated-source-pause={"paused": false, "reason": "", "target": {"type": "page", "url": "https://plus-max-speed.ru:62536/page"}, "frames": []}
sink-tap-instrument={"error": "no extension target found", "hint": "popup"}

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://plus-max-speed.ru:62536/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Screenshot evidence:**
- `final-state` — 2026-09-19T11:41:13.802093+00:00 | https://plus-max-speed.ru:62536/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bjkibipmicfkjnjmjpifhdbkcdjinncp/6.6.0/dynamic-evidence/flow-3/step-final-state.png>)

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-3\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-3\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-3\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-3\step-final-state.png` — Step `final-state`: https://plus-max-speed.ru:62536/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bjkibipmicfkjnjmjpifhdbkcdjinncp\6.6.0\dynamic-evidence\flow-3\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** observationBackendUnavailable=true

---
