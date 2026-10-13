# ExPAgent Dynamic Test — hboaocjifmkibpeajkgaliiaaiodikon v2.0.8

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `hppbikdcaannmlhmijblfnnokmcmkmah`
- Environment: `{'browserUrl': 'http://127.0.0.1:57926', 'runtimeExtensionId': 'hppbikdcaannmlhmijblfnnokmcmkmah', 'beaconBaseUrl': 'http://127.0.0.1:60176', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #0 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.95)

**Reasoning:** The local beacon was hit (tainted URL reached a network-triggering privileged sink) or the exact static sink recorded the controlled marker.

**Payload:** `[{"marker": "EXPAGENT_TEST_expa_7b50baf038aa", "url": "http://127.0.0.1:60176/beacon/expa_7948d7ac8e13", "data": "EXPAGENT_TEST_expa_7b50baf038aa", "value": "EXPAGENT_TEST_expa_7b50baf038aa", "message": "EXPAGENT_TEST_expa_7b50baf038aa", "title": "EXPAGENT_TEST_expa_7b50baf038aa", "text": "EXPAGENT_TEST_expa_7b50baf038aa", "number": "EXPAGENT_TEST_expa_7b50baf038aa", "name": "EXPAGENT_TEST_expa_7b50baf038aa", "id": "EXPAGENT_TEST_expa_7b50baf038aa", "key": "EXPAGENT_TEST_expa_7b50baf038aa", "type": "EXPAGENT_TEST_expa_7b50baf038aa", "action": "log", "cmd": "EXPAGENT_TEST_expa_7b50baf038aa", "Action": "EXPAGENT_TEST_expa_7b50baf038aa", "Message": "EXPAGENT_TEST_expa_7b50baf038aa", "fun": "EXPAGENT_TEST_expa_7b50baf038aa", "auth": "EXPAGENT_TEST_expa_7b50baf038aa", "phone": "EXPAGENT_TEST_expa_7b50baf038aa", "email": "EXPAGENT_TEST_expa_7b50baf038aa", "version": "EXPAGENT_TEST_expa_7b50baf038aa", "token": "EXPAGENT_TEST_expa_7b50baf038aa", "content": "EXPAGENT_TEST_expa_7b50baf038aa", "payload": "EXPAGENT_TEST_expa_7b50baf038aa", "kind": "EXPAGENT_TEST_expa_7b50baf038aa", "requestId": "EXPAGENT_TEST_expa_7b50baf038aa", "revision": "EXPAGENT_TEST_expa_7b50baf038aa", "businessFlagResult": "EXPAGENT_TEST_expa_7b50baf038aa", "groupsInfoTwoInject": "EXPAGENT_TEST_expa_7b50baf038aa", "contactsInfoTwoInject": "EXPAGENT_TEST_expa_7b50baf038aa", "chatsInfoTwoInject": "EXPAGENT_TEST_expa_7b50baf038aa", "communityInfoTwoInject": "EXPAGENT_TEST_expa_7b50baf038aa", "retryInjectj": "EXPAGENT_TEST_expa_7b50baf038aa", "injectSuccessJ": "EXPAGENT_TEST_expa_7b50baf038aa"}, {"marker": "EXPAGENT`

**Runtime evidence:** source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content-script.js", "location": "L1:C1 -> L1:C1", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {}, "forwardField": "", "requirements": {}, "selectors": [], "mediaTags": [], "snippet": "(function(e){var t={};function o(n){if(t[n])return t[n].exports;var c=t[n]={i:n,l:!1,exports:{}};return e[n].call(c.exports,c,c.exports,o),c.l=!0,c.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){\"undefined\"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&\"object\"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,\"default\",{enumerable:!0,value:e}),2&t&&\"string\"!=typeof e)for(var c in e)o.d(n,c,function(t){return e[t]}.bind(null,c));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e[\"default\"]}:function(){return e};return o.d(t,\"a\",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o", "notes": ["已从 sink 文件推导消息分发字段 `action` 及候选值。", "已从 sink 调用推导 URL 承载字段 `url`。"], "discriminatorField": "action", "discriminatorValues": ["log"], "urlField": "url", "sinkTapKey": "storage.local.set", "messageAlias": "", "messageEventKey": "", "jsonMessageField": "", "sinkDataFields": ["businessFlagResult", "groupsInfoTwoInject", "contactsInfoTwoInject", "chatsInfoTwoInject", "communityInfoTwoInject", "retryInjectj", "injectSuccessJ"]}
sink-tap-instrument={"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:60176/page", "input": {"bytes": 1510, "topLevelKeys": ["Action", "Message", "action", "auth", "businessFlagResult", "chatsInfoTwoInject", "cmd", "communityInfoTwoInject", "contactsInfoTwoInject", "content", "data", "email", "fun", "groupsInfoTwoInject", "id", "injectSuccessJ", "key", "kind", "marker", "message"], "testMarkers": ["EXPAGENT_TEST_expa_7b50baf038aa"]}, "result": {"posted": true, "origin": "http://127.0.0.1:60176"}}
stimulus={"action": "postMessage", "targetUrl": "http://127.0.0.1:60176/page", "input": {"bytes": 2061, "topLeve

**Trajectory:**
1. `instrument_sink` all -> {"sink_type": "all", "target_hint": "background", "result": "{\"tapped\":\"all\",\"keys\":[],\"tapVar\":\"self.__expagentSinks\"}"}
2. `new_page` http://127.0.0.1:60176/page -> [{"type": "text", "text": "# new_page response\n## Pages\nShowing 1-3 of 3 (Page 1 of 1).\n0: chrome-error://chromewebdata/\n1: http://127.0.0.1:60176/page [selected]\n2: chrome-error://chromewebdata/", "id": "lc_100bd6fc-416c-4a93-ae7f-557
3. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:60176/page", "input": {"bytes": 1510, "topLevelKeys": ["Action", "Message", "action", "auth", "businessFlagResult", "chatsInfoTwoInject", "cmd", "communityInfoTwoInject", "contactsInfoTwoInject", "content", "data", "email", "fun", "groupsInfoTwoInject", "id", "injectSuccessJ", "key", "kind", "marker",
4. `contract_stimulus` WINDOW_MESSAGE -> {"action": "postMessage", "targetUrl": "http://127.0.0.1:60176/page", "input": {"bytes": 2061, "topLevelKeys": ["Action", "Message", "action", "auth", "businessFlagResult", "chatsInfoTwoInject", "cmd", "communityInfoTwoInject", "contactsInfoTwoInject", "content", "data", "email", "fun", "groupsInfoTwoInject", "id", "injectSuccessJ", "key", "kind", "marker",
5. `observe` sink tap + local beacon -> {"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_crea

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:60176/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\step-source-open.png` — Step `source-open`: http://127.0.0.1:60176/page
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\storage-after-trigger.json` — Storage state at `after-trigger` (markers shown, others redacted)
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `source-contract`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\source-contract.json` — Source-adjacent literal guards and generated local-input contract.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\hboaocjifmkibpeajkgaliiaaiodikon\2.0.8\dynamic-evidence\flow-0\key-state.png` — Key browser state after replay: http://127.0.0.1:60176/page

**Notes:** sinkTapKey=storage.local.set

---
