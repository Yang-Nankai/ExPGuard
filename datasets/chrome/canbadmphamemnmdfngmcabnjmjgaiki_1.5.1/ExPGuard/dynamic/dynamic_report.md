# ExPAgent Dynamic Test — canbadmphamemnmdfngmcabnjmjgaiki v1.5.1

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `ekebienkhiigpckibhlceoheljdcmmeh`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'ekebienkhiigpckibhlceoheljdcmmeh', 'beaconBaseUrl': 'http://127.0.0.1:62042', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 1 flow(s): 1 CONFIRMED, 0 PARTIAL.

---

## Flow #1 — CONFIRMED (controlled condition)  (reproduced=True, confidence 0.90)

**Reasoning:** 受控 DOM 值（页面可控）被内容脚本读入并流入特权 sink，携带受控 marker。

**Runtime evidence:** dom-value-sink-tap={"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\"__windows_update__\":true,\"__windows_remove__\":true,\"__runtime_sendMessage__\":true,\"storage.onChanged\":[{\"ts\":1786858196626,\"area\":\"sync\",\"changes\":{\"greentext\":{\"newValue\":true}}}]}}"}

**Trajectory:**
1. `dom_value_replay` ELEMENT_VALUE -> {"sink_type": "all", "result": "{\"keys\":[\"storage.onChanged\"],\"data\":{\"__fetch__\":true,\"__function__\":true,\"__eval__\":true,\"__storage_local_set__\":true,\"__storage_sync_set__\":true,\"__storage_onChanged__\":true,\"__tabs_create__\":true,\"__tabs_update__\":true,\"__tabs_remove__\":true,\"__tabs_sendMessage__\":true,\"__windows_create__\":true,\

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:62042/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\canbadmphamemnmdfngmcabnjmjgaiki\1.5.1\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\canbadmphamemnmdfngmcabnjmjgaiki\1.5.1\dynamic-evidence\flow-1\key-state.png` — Key browser state after replay: http://127.0.0.1:62042/page


---
