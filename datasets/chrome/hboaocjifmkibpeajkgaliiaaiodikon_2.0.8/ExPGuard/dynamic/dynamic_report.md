# ExPAgent Dynamic Test — hboaocjifmkibpeajkgaliiaaiodikon v2.0.8

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-chat`
- Runtime extension id: `hppbikdcaannmlhmijblfnnokmcmkmah`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'hppbikdcaannmlhmijblfnnokmcmkmah', 'beaconBaseUrl': 'http://127.0.0.1:51042', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_22852220de44", "url": "http://127.0.0.1:51042/beacon/expa_65f1fc8fab92", "data": "EXPAGENT_TEST_expa_22852220de44", "value": "EXPAGENT_TEST_expa_22852220de44", "message": "EXPAGENT_TEST_expa_22852220de44", "title": "EXPAGENT_TEST_expa_22852220de44", "text": "EXPAGENT_TEST_expa_22852220de44", "number": "EXPAGENT_TEST_expa_22852220de44", "name": "EXPAGENT_TEST_expa_22852220de44", "id": "EXPAGENT_TEST_expa_22852220de44", "key": "EXPAGENT_TEST_expa_22852220de44", "type": "EXPAGENT_TEST_expa_22852220de44", "action": "log", "cmd": "EXPAGENT_TEST_expa_22852220de44", "Action": "EXPAGENT_TEST_expa_22852220de44", "Message": "EXPAGENT_TEST_expa_22852220de44", "fun": "EXPAGENT_TEST_expa_22852220de44", "auth": "EXPAGENT_TEST_expa_22852220de44", "phone": "EXPAGENT_TEST_expa_22852220de44", "email": "EXPAGENT_TEST_expa_22852220de44", "version": "EXPAGENT_TEST_expa_22852220de44", "token": "EXPAGENT_TEST_expa_22852220de44", "content": "EXPAGENT_TEST_expa_22852220de44", "payload": "EXPAGENT_TEST_expa_22852220de44", "kind": "EXPAGENT_TEST_expa_22852220de44", "requestId": "EXPAGENT_TEST_expa_22852220de44", "revision": "EXPAGENT_TEST_expa_22852220de44", "contactsInfoTwoInject": "true", "chatsInfoTwoInject": "true", "communityInfoTwoInject": "true", "retryInjectj": "true", "injectSuccessJ": "true", "businessFlagResult": "EXPAGENT_TEST_expa_22852220de44", "groupsInfoTwoInject": "EXPAGENT_TEST_expa_22852220de44"}, {"marker": "EXPAGENT_TEST_expa_22852220de44", "url": "http://127.0.0.1:51042/beacon/expa_65f1fc8fab92", "data": {"marker": "EXPAGENT_TEST_expa_22852220de44`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content-script.js", "location": "L1:C3086 -> L1:C3111", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {"contactsInfoTwoInject": "true", "chatsInfoTwoInject": "true", "communityInfoTwoInject": "true", "retryInjectj": "true", "injectSuccessJ": "true"}, "selectors": [], "mediaTags": [], "snippet": "ymbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&\"object\"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,\"default\",{enumerable:!0,value:e}),2&t&&\"string\"!=typeof e)for(var c in e)o.d(n,c,function(t){return e[t]}.bind(null,c));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e[\"default\"]}:function(){return e};return o.d(t,\"a\",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p=\"/\",o(o.s=2)})({2:function(e,t,o){e.exports=o(\"ecea\")},ecea:function(e,t){function o(e){var t=document.createElement(\"script\");t.src=chrome.runtime.getURL(e),t.onload=function(){this.parentNode.removeChild(this)},(document.head||document.documentElement).appendChild(t)}function n(){", "notes": ["已从 source/sink 附近提取字面量分支。", "已从 sink 文件推导消息分发字段 `action` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。"], "discriminatorField": "action", "discriminatorValues": ["log"], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["businessFlagResult", "groupsInfoTwoInject", "contactsInfoTwoInject", "chatsInfoTwoInject", "communityInfoTwoInject", "retryInjectj", "injectSuccessJ"]}
sink-tap-instrument={"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:51042/page", "input": {"bytes": 1375, "topLevelKeys": ["Action", "Message", "action", "auth", "businessFlagResult", "chatsInfoTwoInject", "cmd", "communityInfoTwoInject", "contactsInfoTwoInject", "content", "data", "email", "fun", "groupsInfoTwoInject", "id", "injectSuccessJ", "key", "kind", "marker", "message"], "testMarkers": ["EXPAGENT_TEST_expa_22852220de44

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "content", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:51042/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: http://127.0.0.1:51042/page [selected]\n1: chrome-error://chromewebdata/\n2: chrome-error://chromewebdata/", "id": "lc_fe73c3f5-1c63-4e80-b263-37e
3. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:51042/page", "input": {"bytes": 1375, "topLevelKeys": ["Action", "Message", "action", "auth", "businessFlagResult", "chatsInfoTwoInject", "cmd", "communityInfoTwoInject", "contactsInfoTwoInject", "content", "data", "email", "fun", "groupsInfoTwoInject", "id", "injectSuccessJ", "key", "kind", "marker",
4. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:51042/page", "input": {"bytes": 1791, "topLevelKeys": ["Action", "Message", "action", "auth", "businessFlagResult", "chatsInfoTwoInject", "cmd", "communityInfoTwoInject", "contactsInfoTwoInject", "content", "data", "email", "fun", "groupsInfoTwoInject", "id", "injectSuccessJ", "key", "kind", "marker",
5. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_crea

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:51042/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: http://127.0.0.1:51042/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:51042/page

**Notes:** sinkTapKey=storage.local.set

---
