# Source-level Taint Flow — pooaceljmehmcieneahjdlhkggheonbf 1.3.1

- Source type: CRX
- Files with issues: 3 / 5
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(upword-authenticate))

- **Source**: `TARGET_CUSTOM_EVENT` — `contentScript` L2:C4022440 -> L2:C4022448  `…),setTimeout(yu,2e3),n(!0)}})),document.addEventListener("upword-authenticate",(e=>{let t;chrome.storage.sync.set({user:»e.detail«.user},(()=>{})),t=e.detail.user?"upword-login":"upword-logout",chrome.runtime.sendMessage(t)}))})()})();`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (user) — `contentScript` L2:C4022410 -> L2:C4022464  `…set");document.dispatchEvent(r),setTimeout(yu,2e3),n(!0)}})),document.addEventListener("upword-authenticate",(e=>{let t;»chrome.storage.sync.set({user:e.detail.user},(()=>{}))«,t=e.detail.user?"upword-login":"upword-logout",chrome.runtime.sendMessage(t)}))})()})();`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (9 raw steps → 1 distinct lines):
   1. L2 `…set");document.dispatchEvent(r),setTimeout(yu,2e3),n(!0)}})),document.addEventListener("upword-authenticate",(e=>{let t;»chrome.storage.sync.set({user:e.detail.user},(()=>{}))«,t=e.detail.user?"upword-login":"upword-logout",chrome.runtime.sendMessage(t)}))})()})();`  · ELEMENT:member-element, ELEMENT:object.setProperty

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(upword-authenticate))

- **Source**: `TARGET_CUSTOM_EVENT` — `login` L1:C89 -> L1:C97  `document.addEventListener("upword-authenticate",(e=>{let t;chrome.storage.sync.set({user:»e.detail«.user},(()=>{})),t=e.detail.user?"upword-login":"upword-logout",chrome.runtime.sendMessage(t)}));`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (user) — `login` L1:C59 -> L1:C113  `document.addEventListener("upword-authenticate",(e=>{let t;»chrome.storage.sync.set({user:e.detail.user},(()=>{}))«,t=e.detail.user?"upword-login":"upword-logout",chrome.runtime.sendMessage(t)}));`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L1 `document.addEventListener("upword-authenticate",(e=>{let t;»chrome.storage.sync.set({user:e.detail.user},(()=>{}))«,t=e.detail.user?"upword-login":"upword-logout",chrome.runtime.sendMessage(t)}));`  · ELEMENT:member-element, ELEMENT:object.setProperty

---
