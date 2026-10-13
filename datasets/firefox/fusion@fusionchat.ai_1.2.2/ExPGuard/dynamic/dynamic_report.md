# ExPAgent Dynamic Test — fusion@fusionchat.ai v1.2.2

- Browser: `firefox`  |  LLM: `deepseek` / `deepseek-v4-pro`
- Runtime extension id: `fusion@fusionchat.ai`
- Environment: `{'browserUrl': 'http://127.0.0.1:59209', 'runtimeExtensionId': 'fusion@fusionchat.ai', 'beaconBaseUrl': 'http://127.0.0.1:53096', 'headless': True, 'safety': {'mode': 'isolated-controlled-validation', 'allowedTestOrigins': ['http://127.0.0.1', 'http://[::1]', 'http://localhost'], 'network': 'loopback and explicitly configured controlled origins only', 'testInput': 'bounded JSON with harmless EXPAGENT_TEST_* markers', 'sensitiveData': 'credentials, cookies, tokens, and personal data are not read or collected'}, 'networkIsolation': True}`

**Assessment:** Dynamically tested 3 flow(s): 0 CONFIRMED, 0 PARTIAL, 2 DEFERRED_COMPANION_EXTENSION, 1 INCONCLUSIVE_AFTER_DEBUG.

---

## Flow #3 — COMPANION EXTENSION DEFERRED  (reproduced=False, confidence 1.00)

**Reasoning:** The flow requires a browser-authenticated sender from an extension ID allowlist. ExPAgent deliberately does not create or impersonate a companion extension.

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:53096/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Human/external handoff:** `COMPANION_EXTENSION_REQUIRED` (DEFERRED)
- Retain this flow for a future dedicated companion-extension fixture. No sender ID was fabricated during this run.
- Resume: Implement an explicit companion-extension harness, then rerun.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\fusion@fusionchat.ai\1.2.2\dynamic-evidence\flow-3\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `human-handoff`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\fusion@fusionchat.ai\1.2.2\dynamic-evidence\flow-3\human-handoff.json` — Operator action required before this flow can be resumed.


---

## Flow #1 — INCONCLUSIVE AFTER DEBUG  (reproduced=False, confidence 0.00)

**Reasoning:** ReAct LLM phase exceeded its 30s budget (thinking-mode latency); deterministic evidence retained and graded inconclusive rather than guessed.

**Runtime evidence:** deep-trace=source-contract={"surface": "WINDOW_MESSAGE", "sourcePath": "content.js", "location": "L8:C1107956 -> L8:C1107972", "eventNames": [], "eventTarget": "window", "eventDetailKey": "data", "envelope": {"message": "login"}, "forwardField": "", "requirements": {"message": "sign-out"}, "selectors": [], "mediaTags": [], "snippet": "ch=null,this.isWritingContent=!1;var n=new MutationObserver((e=>{e.forEach((e=>{\"characterData\"===e.type&&this.checkMatchesTrigger(this.element.innerText)}))}));n.observe(this.element,{attributes:!0,characterData:!0,subtree:!0})}async checkMatchesTrigger(e){let t=e.match(/Fusion:[^?]*\\?/g);if(!t)return;let n=t[t.length-1];if(n==this.lastMatch)return;this.lastMatch=n;let r=await this.docWriter.askFusion(n);r.error||this.writeResponse(r)}async writeResponse({compositionId:e}){let t=this.lastMatch.replace(\"?\",\"\")+\"\\n\";this.element.innerText=this.element.innerTe

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:53096/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.


---

## Flow #2 — COMPANION EXTENSION DEFERRED  (reproduced=False, confidence 1.00)

**Reasoning:** The flow requires a browser-authenticated sender from an extension ID allowlist. ExPAgent deliberately does not create or impersonate a companion extension.

**Planned trajectory:**
1. `list_cdp_targets` Confirm extension target/background/service-worker exists.
2. `get_extension_runtime_state` Snapshot pre-trigger badge/storage/runtime state.
3. `new_page/navigate_page` Open approved source fixture only: http://127.0.0.1:53096/page
4. `list_scripts/search_in_sources` Confirm relevant content script/listener is injected.
5. `post_controlled_message/set_controlled_dom/dispatch_controlled_event` Inject a JSON test marker through the matching local source surface.
6. `observe` Check beacon/network/console/runtime state/screenshot.
7. `ReAct-adjust` If not reproduced, mutate target URL, event/message shape, DOM selectors, action names, timing, then re-observe.

**Line-level debug:** Extension debugger recorded 1 breakpoint(s); see artifact for line-level state.

**Human/external handoff:** `COMPANION_EXTENSION_REQUIRED` (DEFERRED)
- Retain this flow for a future dedicated companion-extension fixture. No sender ID was fabricated during this run.
- Resume: Implement an explicit companion-extension harness, then rerun.

**Evidence artifacts:**
- `transcript`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\fusion@fusionchat.ai\1.2.2\dynamic-evidence\flow-2\trajectory.txt` — Bounded ReAct trajectory and tool evidence.
- `debug`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\fusion@fusionchat.ai\1.2.2\dynamic-evidence\flow-2\extension-debug.json` — Persistent CDP extension debugger breakpoint/pause state.
- `human-handoff`: `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\Temp\firefox_dynamic_workspace\ExPGuard-Opti\runs\firefox\fusion@fusionchat.ai\1.2.2\dynamic-evidence\flow-2\human-handoff.json` — Operator action required before this flow can be resumed.


---
