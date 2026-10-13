# ExPAgent Dynamic Test — kpcdbiholadphpbimkgckhggglklemib v1.0.3

- Browser: `chrome`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `apjnfmihfcdlbccdlbhobgiakogkifbi`
- Environment: `{'browserUrl': 'http://127.0.0.1:9222', 'runtimeExtensionId': 'apjnfmihfcdlbccdlbhobgiakogkifbi', 'beaconBaseUrl': 'http://127.0.0.1:63894', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 3 NOT_REPRODUCED.

---

## Flow #0 — 🟢 NOT REPRODUCED  (reproduced=False, confidence 0.80)

**Reasoning:** 源是扩展自身 UI（options/popup/background 页面）的 DOM 元素值，外部网页无法直接控制该元素，动态印证了静态 FALSE_POSITIVE。

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:63894/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\kpcdbiholadphpbimkgckhggglklemib\1.0.3\dynamic-evidence\flow-0\trajectory.txt` — Bounded ReAct trajectory and tool evidence.


---

## Flow #1 — 🟢 NOT REPRODUCED  (reproduced=False, confidence 0.80)

**Reasoning:** 源是扩展自身 UI 的 DOM 元素值，非页面可达；需要操作者在扩展 UI 上操作才能触发，当前隔离沙箱无法模拟。

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:63894/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\kpcdbiholadphpbimkgckhggglklemib\1.0.3\dynamic-evidence\flow-1\trajectory.txt` — Bounded ReAct trajectory and tool evidence.


---

## Flow #2 — 🟢 NOT REPRODUCED  (reproduced=False, confidence 0.80)

**Reasoning:** 源是扩展自身 UI（options/popup/background 页面）的 DOM 元素值，外部网页无法直接控制该元素，动态印证了静态 FALSE_POSITIVE。

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:63894/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\kpcdbiholadphpbimkgckhggglklemib\1.0.3\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `screenshot`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\dynamic_workspace\runs\chrome\kpcdbiholadphpbimkgckhggglklemib\1.0.3\dynamic-evidence\flow-2\key-state.png` — Key browser state after replay: http://localhost:5173/page


---
