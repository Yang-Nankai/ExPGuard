# ExPAgent Dynamic Test — mhmphnocemakkjdampibehejoaleebpo v0.93

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `hnilfggljjokdnbidcbggbnabfncngej`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'hnilfggljjokdnbidcbggbnabfncngej', 'beaconBaseUrl': 'http://127.0.0.1:60693', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 1 CONFIRMED, 0 PARTIAL, 2 EXTERNAL_CONDITION_REQUIRED.

---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"key": "supernova-jslauncher-message", "message": "{\"marker\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"url\": \"http://127.0.0.1:60693/beacon/expa_e6fd393f28b8\", \"data\": {\"url\": \"http://127.0.0.1:60693/beacon/expa_e6fd393f28b8\", \"title\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"value\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"publishericon\": \"EXPAGENT_TEST_expa_445230fbd5cd\"}, \"value\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"message\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"title\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"text\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"number\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"name\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"id\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"key\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"type\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"action\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"cmd\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"Action\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"Message\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"fun\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"auth\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"phone\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"email\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"version\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"token\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"content\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"payload\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"kind\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"requestId\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"revision\": \"EXPAGENT_TEST_expa_445230fbd5cd\", \"launchStatus\": \"true\", \"command\": \"requests`

**Runtime evidence:** source-contract={"surface": "MESSAGE_EVENT", "sourcePath": "scripts/content.js", "location": "L264:C7 -> L264:C13", "eventNames": ["supernova-message", "message"], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {"launchStatus": "true"}, "selectors": [], "mediaTags": [], "snippet": " from new game\n        bookmarkNotification( game );\n        bookmarkUsage();\n        game.new = true;\n        games[game.url] = game;\n      }\n      \n      lib.syncdata.set({ playedgames: lib.entries(games) });\n\n      resolve(true);\n    });\n  });\n}\n\n\n\n//FIXME: Add  optional deep scanning  capability of 1-2 levels of iframes for getBestObjectEl/getSplashObject)\n//For speed reasons, perhaps only enable on sites/pages where user has enabled flash manually before?\nfunction getBestObjectEl(searchDepth) {\n  var embeds = document.getElementsByTagName(\"object\");\n  var maxembed = null;\n  var maxembedwidth = 300;\n  var maxembedheight = 200;\n  for (var i = 0; i < embeds.length; i++) {\n    var embed = embeds[i];\n    if (parseInt(embed.width) > maxembedwidth && parseInt(embed.height) > maxembedheight ||\n      parseInt(embed.clientWidth) > maxembedwidth && parseInt(embed.clientHeight) > maxembedheight", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `command` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。", "已提取页面可达事件名。"], "discriminatorField": "command", "discriminatorValues": ["requeststatus", "status", "supernovaplayerstatus", "loggame"], "urlField": "url", "sinkTapKey": "storage.sync.set", "messageAlias": "message", "messageEventKey": "supernova-jslauncher-message", "jsonMessageField": "message", "sinkDataFields": []}
sink-tap-instrument={"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1606, "topLevelKeys": ["key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TEST_expa_445230fbd5cd\"},"]}, "result": {"dispatched": true}}
stimulus={"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1599, "topLevelKeys": ["key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TE

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:60693/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-1 of 1 (Page 1 of 1).\n0: http://127.0.0.1:60693/page [selected]", "id": "lc_3b413573-8626-46c4-9bad-f5434537a693"}]
3. `contract_stimulus` MESSAGE_EVENT -> {"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1606, "topLevelKeys": ["key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TEST_expa_445230fbd5cd\"},"]}, "result": {"dispatched": true}}
4. `contract_stimulus` MESSAGE_EVENT -> {"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1599, "topLevelKeys": ["key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TEST_expa_445230fbd5cd\"},"]}, "result": {"dispatched": true}}
5. `contract_stimulus` MESSAGE_EVENT -> {"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1614, "topLevelKeys": ["key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TEST_expa_445230fbd5cd\"},"]}, "result": {"dispatched": true}}
6. `contract_stimulus` MESSAGE_EVENT -> {"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1600, "topLevelKeys": ["key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TEST_expa_445230fbd5cd\"},"]}, "result": {"dispatched": true}}
7. `contract_stimulus` MESSAGE_EVENT -> {"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1866, "topLevelKeys": ["data", "key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd", "EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TEST_expa_445230fbd5cd\"},"]}, "result": {"dispatched": true}}
8. `contract_stimulus` MESSAGE_EVENT -> {"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1859, "topLevelKeys": ["data", "key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd", "EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TEST_expa_445230fbd5cd\"},"]}, "result": {"dispatched": true}}
9. `contract_stimulus` MESSAGE_EVENT -> {"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1874, "topLevelKeys": ["data", "key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd", "EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TEST_expa_445230fbd5cd\"},"]}, "result": {"dispatched": true}}
10. `contract_stimulus` MESSAGE_EVENT -> {"action": "dispatchMessageEvent", "targetUrl": "http://127.0.0.1:60693/page", "event": "supernova-message", "input": {"bytes": 1860, "topLevelKeys": ["data", "key", "message"], "testMarkers": ["EXPAGENT_TEST_expa_445230fbd5cd", "EXPAGENT_TEST_expa_445230fbd5cd\",", "EXPAGENT_TEST_expa_445230fbd5cd\"},"]}, "result": {"dispatched": true}}
11. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"runtime.sendMessage\",\"storage.local.set\",\"storage.onChanged\",\"tabs.sendMessage\",\"action.setBadgeText\",\"fetch\",\"storage.sync.set\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:60693/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-1\step-source-open.png` — Step `source-open`: http://127.0.0.1:60693/page
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-1\step-after-trigger.png` — Step `after-trigger`: http://127.0.0.1:60693/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-1\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-1\storage-after-trigger.png` — Storage panel (DevTools-style) at `after-trigger`
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-1\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-1\key-state.png` — Key browser state after replay: http://127.0.0.1:60693/page

**Notes:** sinkTapKey=storage.sync.set

---

## Flow #2 — EXTERNAL CONDITION REQUIRED  (reproduced=False, confidence 1.00)

**Reasoning:** The privileged sink is driven by chrome.runtime native messaging, which requires an OS-installed native host that is absent from the isolated environment.

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:60693/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Human/external handoff:** `EXTERNAL_CONDITION_REQUIRED` (DEFERRED)
- This source cannot be reached from the isolated local test fixture. Verify it later in an explicitly approved external test environment; ExPAgent did not navigate to the origin.
- Resume: Provide an operator-owned fixture matching the manifest origin.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-2\key-state.png` — Key browser state after replay: http://127.0.0.1:60693/page
- `human-handoff`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-2\human-handoff.json` — Operator action required before this flow can be resumed.


---

## Flow #3 — EXTERNAL CONDITION REQUIRED  (reproduced=False, confidence 1.00)

**Reasoning:** The privileged sink is driven by chrome.runtime native messaging, which requires an OS-installed native host that is absent from the isolated environment.

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:60693/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Human/external handoff:** `EXTERNAL_CONDITION_REQUIRED` (DEFERRED)
- This source cannot be reached from the isolated local test fixture. Verify it later in an explicitly approved external test environment; ExPAgent did not navigate to the origin.
- Resume: Provide an operator-owned fixture matching the manifest origin.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-3\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-3\key-state.png` — Key browser state after replay: http://127.0.0.1:60693/page
- `human-handoff`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\mhmphnocemakkjdampibehejoaleebpo\0.93\dynamic-evidence\flow-3\human-handoff.json` — Operator action required before this flow can be resumed.


---
