# ExPAgent Dynamic Test — bfbameneiokkgbdmiekhjnmfkcnldhhm v3.0.1

- Target browser: `chrome`  |  Runtime browser: `chrome`  |  LLM: `deepseek` / `deepseek-flash`
- Runtime extension id: `manclhmpocflekchhabkompplcigdkcg`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'manclhmpocflekchhabkompplcigdkcg', 'targetBrowser': 'chrome', 'runtimeBrowser': 'chrome', 'compatibilityRuntime': False, 'beaconBaseUrl': 'http://127.0.0.1:64299', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True, 'harnessPatches': [], 'capabilityMatrix': {'version': 3, 'browser': 'chrome', 'manifestVersion': 3, 'runtimeProduct': 'Chrome/153.0.8010.48', 'runtimeCompatibility': {'available': True, 'observer': 'manifest/browser runtime', 'reason': ''}, 'contexts': {'pageMainWorld': {'available': True, 'observer': 'CDP/RDP page evaluation', 'reason': ''}, 'contentScriptIsolatedWorld': {'available': True, 'observer': 'extension content-script bridge', 'reason': ''}, 'backgroundPage': {'available': False, 'observer': 'extension background target', 'reason': 'The manifest has no persistent background page/scripts.'}, 'serviceWorker': {'available': True, 'observer': 'Chromium service-worker wake + persistent CDP attachment', 'reason': ''}, 'iframe': {'available': False, 'observer': 'frameId-scoped main/isolated execution contexts', 'reason': 'No all_frames content-script declaration was found; frame injection must be proven at runtime.'}, 'webWorker': {'available': False, 'observer': 'worker target', 'reason': 'Dedicated/shared worker target discovery and replay are not implemented.'}, 'companionExtension': {'available': True, 'observer': 'bundled controlled companion extension', 'reason': ''}}, 'observers': {'sinkInstrumentation': {'available': True, 'observer': 'runtime sink tap with observer-generation validation', 'reason': ''}, 'beacon': {'available': True, 'observer': 'loopback HTTP(S) beacon', 'reason': ''}, 'lineBreakpoint': {'available': True, 'observer': 'CDP Debugger.setBreakpointByUrl', 'reason': ''}, 'mcpPageTools': {'available': True, 'observer': 'js-reverse-mcp', 'reason': ''}}}}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 NOT_REPRODUCED.

---

## Flow #0 — 🟢 NOT REPRODUCED  (reproduced=False, confidence 0.45)

**Reasoning:** DOM source replay and observer completed, but the exact sink did not record the controlled marker. This is a runtime non-reproduction after an actual attempt, not NOT_ATTEMPTED.

**Runtime evidence:** dom-target={"targetId": "D0542DB75AFAB4EDBB7AF69DB9B7599F", "url": "http://127.0.0.1:64299/page?expagent=EXPAGENT_TEST_expa_94d946921e53"}
triggered-events=["change", "click"]
content-retrigger={}
dom-source-continuation={"invoked": false, "attempts": []}
dom-value-sink-tap={"error": "no extension target found"}

**Trajectory:**
1. `dom_value_replay` DOCUMENT_URL -> None
2. `observe` pinned popup sink tap -> {"error": "no extension target found"}

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:64299/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Screenshot evidence:**
- `source-open` — 2026-09-19T09:12:19.770532+00:00 | http://127.0.0.1:64299/page?expagent=EXPAGENT_TEST_expa_94d946921e53 | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![source-open](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bfbameneiokkgbdmiekhjnmfkcnldhhm/3.0.1/dynamic-evidence/flow-0/step-source-open.png>)
- `after-trigger` — 2026-09-19T09:12:19.968707+00:00 | http://127.0.0.1:64299/page?expagent=EXPAGENT_TEST_expa_94d946921e53 | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![after-trigger](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bfbameneiokkgbdmiekhjnmfkcnldhhm/3.0.1/dynamic-evidence/flow-0/step-after-trigger.png>)
- `after-observation` — 2026-09-19T09:12:25.139861+00:00 | http://127.0.0.1:64299/page?expagent=EXPAGENT_TEST_expa_94d946921e53 | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![after-observation](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bfbameneiokkgbdmiekhjnmfkcnldhhm/3.0.1/dynamic-evidence/flow-0/step-after-observation.png>)
- `final-state` — 2026-09-19T09:12:25.247828+00:00 | http://127.0.0.1:64299/page?expagent=EXPAGENT_TEST_expa_94d946921e53 | sha256=2b658034b6cc6640b81ac9185938616400d0897b23557084f6898734479724b1
  ![final-state](<D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPAgent/runs/chrome/bfbameneiokkgbdmiekhjnmfkcnldhhm/3.0.1/dynamic-evidence/flow-0/step-final-state.png>)

**Evidence artifacts:**
- `screenshot` [source-open]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bfbameneiokkgbdmiekhjnmfkcnldhhm\3.0.1\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: http://127.0.0.1:64299/page?expagent=EXPAGENT_TEST_expa_94d946921e53
- `screenshot` [after-trigger]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bfbameneiokkgbdmiekhjnmfkcnldhhm\3.0.1\dynamic-evidence\flow-0\step-after-trigger.png` — Step `after-trigger`: http://127.0.0.1:64299/page?expagent=EXPAGENT_TEST_expa_94d946921e53
- `screenshot` [after-observation]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bfbameneiokkgbdmiekhjnmfkcnldhhm\3.0.1\dynamic-evidence\flow-0\step-after-observation.png` — Step `after-observation`: http://127.0.0.1:64299/page?expagent=EXPAGENT_TEST_expa_94d946921e53
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bfbameneiokkgbdmiekhjnmfkcnldhhm\3.0.1\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot` [final-state]: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bfbameneiokkgbdmiekhjnmfkcnldhhm\3.0.1\dynamic-evidence\flow-0\step-final-state.png` — Step `final-state`: http://127.0.0.1:64299/page?expagent=EXPAGENT_TEST_expa_94d946921e53
- `screenshot-manifest`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\chrome\bfbameneiokkgbdmiekhjnmfkcnldhhm\3.0.1\dynamic-evidence\flow-0\screenshot-evidence.json` — Screenshot stage, controlled target URL, UTC capture time, and SHA-256 integrity metadata for downstream email/report assembly.


---
