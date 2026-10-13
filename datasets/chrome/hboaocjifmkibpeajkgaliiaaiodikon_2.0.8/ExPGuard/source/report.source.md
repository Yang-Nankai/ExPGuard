# Source-level Taint Flow — hboaocjifmkibpeajkgaliiaaiodikon 2.0.8

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content-script` L1:C3086 -> L1:C3111  `…ityInfoTwo&&window.postMessage({communityInfoTwo:!0},"*")})),window.addEventListener("message",(function(e){if(void 0!==»e.data.businessFlagResult«&&chrome.storage.local.set({businessFlag:e.data.businessFlagResult},()=>{console.log("businessFlag saved:",e.data.busine…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (businessFlag) — `content-script` L1:C3113 -> L1:C3246  `…age({communityInfoTwo:!0},"*")})),window.addEventListener("message",(function(e){if(void 0!==e.data.businessFlagResult&&»chrome.storage.local.set({businessFlag:e.data.businessFlagResult},()=>{console.log("businessFlag saved:",e.data.businessFlagResult)})«,e.data.groupsInfoTwoInject){let t=e.data.groupsInfoTwoInject;chrome.runtime.sendMessage({groupsInfoTwoInject:t}),chrome…`
  - `CHROME_LOCAL_STORAGE` (groupsInfoTwoInject) — `content-script` L1:C3360 -> L1:C3409  `…ult)}),e.data.groupsInfoTwoInject){let t=e.data.groupsInfoTwoInject;chrome.runtime.sendMessage({groupsInfoTwoInject:t}),»chrome.storage.local.set({groupsInfoTwoInject:t})«}if(e.data.contactsInfoTwoInject){let t=e.data.contactsInfoTwoInject;chrome.runtime.sendMessage({contactsInfoTwoInject:t…`
  - `CHROME_LOCAL_STORAGE` (contactsInfoTwoInject) — `content-script` L1:C3532 -> L1:C3583  `…(e.data.contactsInfoTwoInject){let t=e.data.contactsInfoTwoInject;chrome.runtime.sendMessage({contactsInfoTwoInject:t}),»chrome.storage.local.set({contactsInfoTwoInject:t})«}if(e.data.chatsInfoTwoInject){let t=e.data.chatsInfoTwoInject;chrome.runtime.sendMessage({chatsInfoTwoInject:t}),chrome…`
  - `CHROME_LOCAL_STORAGE` (chatsInfoTwoInject) — `content-script` L1:C3697 -> L1:C3745  `…ct:t})}if(e.data.chatsInfoTwoInject){let t=e.data.chatsInfoTwoInject;chrome.runtime.sendMessage({chatsInfoTwoInject:t}),»chrome.storage.local.set({chatsInfoTwoInject:t})«}if(e.data.communityInfoTwoInject){let t=e.data.communityInfoTwoInject;chrome.runtime.sendMessage({communityInfoTwoInjec…`
  - `CHROME_LOCAL_STORAGE` (communityInfoTwoInject) — `content-script` L1:C3871 -> L1:C3923  `…data.communityInfoTwoInject){let t=e.data.communityInfoTwoInject;chrome.runtime.sendMessage({communityInfoTwoInject:t}),»chrome.storage.local.set({communityInfoTwoInject:t})«}if(e.data.retryInjectj)try{i(),o("wa.js"),console.log("successInjectj")}catch(e){console.log("retryInjectj")}if(e.data.…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (87 raw steps → 1 distinct lines):
   1. L1 `…ge",(function(e){if(»void 0!==e.data.businessFlagResult&&chrome.storage.local.set({businessFlag:e.data.businessFlagResult},()=>{console.log(" …⟨tainted span: 980 chars⟩… ryInjectj)try{i(),o("wa.js"),console.log("successInjectj")}catch(e){console.log("retryInjectj")}if(e.data.injectSuccessJ«){let e,t="";window.…`  · ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:identifier

---
