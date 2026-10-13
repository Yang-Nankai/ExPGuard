# ExPAgent Dynamic Test — adgfnejnfbkgcdioefdlidfdenheckao v1.5.4

- Browser: `edge`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `lklidkgbbepbdkocebekhdcacdhoellg`
- Environment: `{'browserUrl': 'http://127.0.0.1:52328', 'runtimeExtensionId': 'lklidkgbbepbdkocebekhdcacdhoellg', 'beaconBaseUrl': 'http://127.0.0.1:52327', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`
- Note: Dynamic environment error: unhandled errors in a TaskGroup (1 sub-exception)

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"id": "webpage_error", "marker": "EXPAGENT_TEST_expa_ef7f177e5db3", "url": "http://127.0.0.1:57826/beacon/expa_ef3298e510a7", "data": "EXPAGENT_TEST_expa_ef7f177e5db3", "value": "EXPAGENT_TEST_expa_ef7f177e5db3", "message": "EXPAGENT_TEST_expa_ef7f177e5db3", "title": "EXPAGENT_TEST_expa_ef7f177e5db3", "text": "EXPAGENT_TEST_expa_ef7f177e5db3", "number": "EXPAGENT_TEST_expa_ef7f177e5db3", "name": "webpage_error", "key": "EXPAGENT_TEST_expa_ef7f177e5db3", "type": "EXPAGENT_TEST_expa_ef7f177e5db3", "action": "EXPAGENT_TEST_expa_ef7f177e5db3", "cmd": "EXPAGENT_TEST_expa_ef7f177e5db3", "Action": "EXPAGENT_TEST_expa_ef7f177e5db3", "Message": "EXPAGENT_TEST_expa_ef7f177e5db3", "fun": "EXPAGENT_TEST_expa_ef7f177e5db3", "auth": "EXPAGENT_TEST_expa_ef7f177e5db3", "phone": "EXPAGENT_TEST_expa_ef7f177e5db3", "email": "EXPAGENT_TEST_expa_ef7f177e5db3", "version": "EXPAGENT_TEST_expa_ef7f177e5db3", "token": "EXPAGENT_TEST_expa_ef7f177e5db3", "content": "EXPAGENT_TEST_expa_ef7f177e5db3", "payload": "EXPAGENT_TEST_expa_ef7f177e5db3", "kind": "EXPAGENT_TEST_expa_ef7f177e5db3", "requestId": "EXPAGENT_TEST_expa_ef7f177e5db3", "revision": "EXPAGENT_TEST_expa_ef7f177e5db3"}, {"id": "webpage_error", "marker": "EXPAGENT_TEST_expa_ef7f177e5db3", "url": "http://127.0.0.1:57826/beacon/expa_ef3298e510a7", "data": "EXPAGENT_TEST_expa_ef7f177e5db3", "value": "EXPAGENT_TEST_expa_ef7f177e5db3", "message": "EXPAGENT_TEST_expa_ef7f177e5db3", "title": "EXPAGENT_TEST_expa_ef7f177e5db3", "text": "EXPAGENT_TEST_expa_ef7f177e5db3", "number": "EXPAGENT_TEST_expa_ef7f177e5db3", "name": "clean_cache", "key": "EX`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L245:C1 -> L245:C1", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"id": "webpage_error"}, "forwardField": "", "requirements": {"id": "webpage_error"}, "selectors": [], "mediaTags": [], "snippet": "tity.site_id.toString());\n                    iframeDocument.body.appendChild(rumScript);\n                }\n            });\n            if (document.body) {\n                document.body.insertAdjacentElement('afterbegin', iframe);\n            }\n        }\n    });\n}\nfunction codeToInject() {\n    window.addEventListener('unhandledrejection', function (_) {\n        window.postMessage({\n            id: 'webpage_error',\n            type: 'script',\n            url: window.location.href,\n            data: {\n                type: 'script',\n            },\n        }, '*');\n    });\n    window.console.error = function (...args) {\n        const argsArray = [];\n        for (const i in args) {\n            argsArray.push(args[i]);\n        }\n        window.postMessage({\n            id: 'webpage_error',\n            type: 'script',\n            url: window.location.href,\n            data: {\n                ", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `name` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已识别信封桥接（外层字段 + 转发字段）。"], "discriminatorField": "name", "discriminatorValues": ["webpage_error", "clean_cache"], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "name", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["id", "type", "url"]}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:57826/page", "input": {"bytes": 1119, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data", "email", "fun", "id", "key", "kind", "marker", "message", "name", "number", "payload", "phone", "requestId", "revision"], "testMarkers": ["EXPAGENT_TEST_expa_ef7f177e5db3"]}, "result": {"posted": true, "origin": "http://127.0.0.1:57826"}}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:57826/page", "input": {"bytes": 1117, "topLevelKeys": ["Action", "Message", "action", "auth", "cmd", "content", "data

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:57826/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\edge\adgfnejnfbkgcdioefdlidfdenheckao\1.5.4\dynamic-evidence\flow-1\step-source-open.png` — Step `source-open`: http://127.0.0.1:57826/page
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\edge\adgfnejnfbkgcdioefdlidfdenheckao\1.5.4\dynamic-evidence\flow-1\step-after-trigger.png` — Step `after-trigger`: http://127.0.0.1:57826/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\edge\adgfnejnfbkgcdioefdlidfdenheckao\1.5.4\dynamic-evidence\flow-1\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\edge\adgfnejnfbkgcdioefdlidfdenheckao\1.5.4\dynamic-evidence\flow-1\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\edge\adgfnejnfbkgcdioefdlidfdenheckao\1.5.4\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\edge\adgfnejnfbkgcdioefdlidfdenheckao\1.5.4\dynamic-evidence\flow-1\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\edge\adgfnejnfbkgcdioefdlidfdenheckao\1.5.4\dynamic-evidence\flow-1\key-state.png` — Key browser state after replay: http://127.0.0.1:57826/page

**Notes:** sinkTapKey=storage.local.set

---
