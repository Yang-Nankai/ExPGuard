# ExPAgent Dynamic Test — frankerfacez@frankerfacez.com v4.80.4.0

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `frankerfacez@frankerfacez.com`
- Environment: `{'browserUrl': 'http://127.0.0.1:53386', 'runtimeExtensionId': 'frankerfacez@frankerfacez.com', 'beaconBaseUrl': 'http://localhost:8000', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 0 CONFIRMED, 0 PARTIAL, 1 EXTERNAL_CONDITION_REQUIRED.

---

## Flow #0 — EXTERNAL CONDITION REQUIRED  (reproduced=False, confidence 0.90)

**Reasoning:** 源是 chrome.runtime.onMessageExternal / onConnectExternal（来自 externally_connectable 声明的外部网站/扩展消息）；需要匹配的受控发送方页面/扩展，属于外部消息发送方前置条件。

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://localhost:8000/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\frankerfacez@frankerfacez.com\4.80.4.0\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.


---
