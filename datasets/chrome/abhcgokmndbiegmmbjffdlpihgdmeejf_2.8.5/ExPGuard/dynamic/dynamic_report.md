# ExPAgent Dynamic Test — abhcgokmndbiegmmbjffdlpihgdmeejf v2.8.5

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `fjhkgflepjpkplpchflinhpoinbgjdgn`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'fjhkgflepjpkplpchflinhpoinbgjdgn', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:59566', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost', 'https://expagent.growbotforfollowers.com:59566', 'https://expagent.instagram.com:59566', 'https://growbotforfollowers.com:59566'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [{'kind': 'external-response-port-semantic-fixture', 'semanticFixture': True, 'positiveOnly': True, 'port': 59566, 'hosts': ['growbotforfollowers.com', 'expagent.instagram.com', 'expagent.growbotforfollowers.com'], 'files': ['contentscript.js'], 'replacements': 1}], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.85)

**Reasoning:** 受控 DOM 值（页面可控）被内容脚本读入并流入特权 sink，携带受控 marker。

**Runtime evidence:** dom-target={"targetId": "97D78523D418E429C3E9263162C864F6", "url": "https://expagent.instagram.com:59566/page"}
new-document={'ok': True, 'result': {'id': 1, 'result': {'identifier': '1'}}}
initial-dom={'ready': True, 'selector': '#txtConsole', 'matches': True}
observer={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_7758da27cf594160", "targetId": "67B4FA189C21D77E2CB21C6F3F21971B", "lifecycle": {"ok": true, "targetId": "67B4FA189C21D77E2CB21C6F3F21971B", "targetType": "service_worker", "targetUrl": "chrome-extension://fjhkgflepjpkplpchflinhpoinbgjdgn/backgroundscript.js", "attachCount": 1, "reattached": false}, "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\",\"observerToken\":\"observer_7758da27cf594160\"}"}
storage-flags=[]
final-dom={'ready': True, 'selector': '#txtConsole', 'matches': True}
content-retrigger={"ok": false, "fields": ["extension_updated", "clickSomething", "clickViewStory", "parent"], "error": "timed out in 10.0s"}
dom-source-continuation={"invoked": true, "semanticFixture": true, "positiveOnly": true, "continuation": "invoke-dom-log-writer", "attempts": [{"kind": "invoke-dom-log-writer", "result": {"invoked": true}}]}
triggered-events=["change", "message", "click", "input"]
dom-value-sink-tap={"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_7758da27cf594160", "actualGeneration": "observer_7758da27cf594160", "previousTargetId": "67B4FA189C21D77E2CB21C6F3F21971B", "currentTargetId": "67B4FA189C21D77E2CB21C6F3F21971B", "recoveryReason": "", "recoveryResult": null, "result": "{\"keys\":[\"tabs.sendMessage\",\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_session_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__action_setBadgeText__\":true,\"__action_setTitle__\":true,\"__action_setIcon__\":true,\"__notifications_create__\":true,\"__runtime_sendMessage__\":true,\"tabs.sendMessage\":[{\"ts\":1789787499936,\"arg\":{\"redacted\":true,\"length\":9}},{\"ts\":1789787502543,\"arg\":{\"redacted\":true,\"length\":9}},{\"ts\":1789787504974,\"arg\":{\

**Trajectory:**
1. `instrument_sink` background -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerGeneration": "observer_7758da27cf594160", "targetId": "67B4FA189C21D77E2CB21C6F3F21971B", "lifecycle": {"ok": true, "targetId": "67B4FA189C21D77E2CB21C6F3F21971B", "targetType": "service_worker", "targetUrl": "chrome-extension://fjhkgflepjpkplpchflinhp
2. `dom_target` ELEMENT_TEXT_CONTENT -> {"targetId": "97D78523D418E429C3E9263162C864F6", "url": "https://expagent.instagram.com:59566/page"}
3. `set_storage_flags`  -> none inferred
4. `dom_value_replay` ELEMENT_TEXT_CONTENT -> {'ready': True, 'selector': '#txtConsole', 'matches': True}
5. `content_retrigger` extension_updated,clickSomething,clickViewStory,parent -> {"ok": false, "fields": ["extension_updated", "clickSomething", "clickViewStory", "parent"], "error": "timed out in 10.0s"}
6. `dom_source_continuation` positive-only semantic fixture -> {"invoked": true, "semanticFixture": true, "positiveOnly": true, "continuation": "invoke-dom-log-writer", "attempts": [{"kind": "invoke-dom-log-writer", "result": {"invoked": true}}]}
7. `observe` pinned content sink tap -> {"sink_type": "all", "target_hint": "background", "context": "extension-target", "observerReady": true, "observerLost": false, "observerRecovered": false, "expectedGeneration": "observer_7758da27cf594160", "actualGeneration": "observer_7758da27cf594160", "previousTargetId": "67B4FA189C21D77E2CB21C6F3F21971B", "currentTargetId": "67B4FA189C21D77E2CB21C6F3F219

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: https://expagent.instagram.com:59566/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T03:11:42.352493+00:00 | https://expagent.instagram.com:59566/page | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abhcgokmndbiegmmbjffdlpihgdmeejf/2.8.5/dynamic-evidence/flow-0/step-source-open.png>)
- `after-trigger` — 2026-09-19T03:11:52.743565+00:00 | https://expagent.instagram.com:59566/page | sha256=644516c1617cb90ea67059afeb7cc1c154a94fe37ae28425d1a132588efcb90e
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abhcgokmndbiegmmbjffdlpihgdmeejf/2.8.5/dynamic-evidence/flow-0/step-after-trigger.png>)
- `after-observation` — 2026-09-19T03:11:55.867612+00:00 | https://expagent.instagram.com:59566/page | sha256=644516c1617cb90ea67059afeb7cc1c154a94fe37ae28425d1a132588efcb90e
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abhcgokmndbiegmmbjffdlpihgdmeejf/2.8.5/dynamic-evidence/flow-0/step-after-observation.png>)
- `storage-after-observation` — 2026-09-19T03:11:56.128343+00:00 | https://expagent.instagram.com:59566/page | sha256=cfb1313c1ad01df5f834b4b5826fc645c23a20163e94b198b76b54325800a712
  ![storage-after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abhcgokmndbiegmmbjffdlpihgdmeejf/2.8.5/dynamic-evidence/flow-0/storage-after-observation.png>)
- `final-state` — 2026-09-19T03:11:56.282504+00:00 | https://expagent.instagram.com:59566/page | sha256=cf251df146816ac9395f23c83152e44ddb0183fdbbd3a7c310fc72f0d53e2209
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/abhcgokmndbiegmmbjffdlpihgdmeejf/2.8.5/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abhcgokmndbiegmmbjffdlpihgdmeejf\2.8.5\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: https://expagent.instagram.com:59566/page
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abhcgokmndbiegmmbjffdlpihgdmeejf\2.8.5\dynamic-evidence\flow-0\step-after-trigger.png` — Step `after-trigger`: https://expagent.instagram.com:59566/page
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abhcgokmndbiegmmbjffdlpihgdmeejf\2.8.5\dynamic-evidence\flow-0\step-after-observation.png` — Step `after-observation`: https://expagent.instagram.com:59566/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abhcgokmndbiegmmbjffdlpihgdmeejf\2.8.5\dynamic-evidence\flow-0\storage-after-observation.json` — Storage state at `after-observation` (markers shown, others redacted)
- `screenshot` [storage-after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abhcgokmndbiegmmbjffdlpihgdmeejf\2.8.5\dynamic-evidence\flow-0\storage-after-observation.png` — Storage panel (DevTools-style) at `after-observation`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abhcgokmndbiegmmbjffdlpihgdmeejf\2.8.5\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abhcgokmndbiegmmbjffdlpihgdmeejf\2.8.5\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: https://expagent.instagram.com:59566/page
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\abhcgokmndbiegmmbjffdlpihgdmeejf\2.8.5\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.

**Notes:** semanticFixture=true originalUiLifecycleNotClaimed=true

---
