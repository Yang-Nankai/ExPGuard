# Source-level Taint Flow — fusion@fusionchat.ai 1.2.2

- Source type: XPI
- Files with issues: 4 / 4
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 41 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L8:C1107956 -> L8:C1107972  `…age.local.set({authToken:e})}},n_=()=>{window.addEventListener("message",(e=>{if(e.source===window&&"from-fusionchat"===»e?.data?.message«){let t=e.data.payload;"login"===t.message&&chrome.storage.local.set({authToken:t.token}),"sign-out"===t.message&&chrome…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (authToken) — `content` L8:C1108016 -> L8:C1108061  `…er("message",(e=>{if(e.source===window&&"from-fusionchat"===e?.data?.message){let t=e.data.payload;"login"===t.message&&»chrome.storage.local.set({authToken:t.token})«,"sign-out"===t.message&&chrome.storage.local.remove("authToken")}}))};n(3543);function r_(){const e=location.host.inclu…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (13 raw steps → 1 distinct lines):
   1. L8 `…age.getItem("authToken");e&&chrome.storage.local.set({authToken:e})}},n_=()=>{window.addEventListener("message",(e=>{if(»e.source===window&&"from-fusionchat"===e?.data?.message){let t=e.data.payload;"login"===t.message&&chrome.storage.local.set({authToken:t.token}),"sign-out"===t.message«&&chrome.storage.local.remove("authToken")}}))};n(3543);function r_(){const e=location.host.includes("localhost")&&docum…`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.local.set('authToken') in content)

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L8:C1107956 -> L8:C1107972  `…age.local.set({authToken:e})}},n_=()=>{window.addEventListener("message",(e=>{if(e.source===window&&"from-fusionchat"===»e?.data?.message«){let t=e.data.payload;"login"===t.message&&chrome.storage.local.set({authToken:t.token}),"sign-out"===t.message&&chrome…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (authToken) — `content` L8:C1078836 -> L8:C1078875  `…n=e,ds().defaults.headers.common={Authorization:`Bearer ${e}`},this.user=fs(e),location.host!=vs.routes.testHost&&await »chrome.storage.local.set({authToken:e})«},dreamLinkClicked(){this.store.dreamLinkClicked=!0,location.host!=vs.routes.testHost&&chrome.storage.local.set({dreamLi…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (74 raw steps → 1 distinct lines):
   1. L8 `…unction ms(e){var t=»e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:t …⟨tainted span: 36381 chars⟩… method&&a_(""),n({farewell:"goodbye"}),!0}))}async function l_(){i_(),t_(),n_(),await ks.initUser(),await ks.initStorage«(),r_(),c_(),locatio…`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:identifier, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: authToken, sender: content, receiver: content], ASSIGN:template-literal, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('authToken') in background)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `options` L1:C29350 -> L1:C29351  `…ontainer-xl,.container-xxl{--bs-gutter-x:1.5rem;--bs-gutter-y:0;width:100%;padding-right:calc(var(--bs-gutter-x)*.5);pad»d«ing-left:calc(var(--bs-gutter-x)*.5);margin-right:auto;margin-left:auto}@media (min-width:576px){.container,.container-s…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (authToken) — `content` L8:C1078836 -> L8:C1078875  `…n=e,ds().defaults.headers.common={Authorization:`Bearer ${e}`},this.user=fs(e),location.host!=vs.routes.testHost&&await »chrome.storage.local.set({authToken:e})«},dreamLinkClicked(){this.store.dreamLinkClicked=!0,location.host!=vs.routes.testHost&&chrome.storage.local.set({dreamLi…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (70 raw steps → 2 distinct lines):
   1. L1 _(in `options`)_ `…ontainer-xl,.container-xxl{--bs-gutter-x:1.5rem;--bs-gutter-y:0;width:100%;padding-right:calc(var(--bs-gutter-x)*.5);pad»ding-left:calc(var(--bs-gutter-x)*.5);margin-right:auto;margin-left:auto}@media («min-width:576px){.container,.container-sm{max-width:540px}}@media (min-width:768px){.container,.container-md,.container-…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty
   2. L8 `…unction ms(e){var t=»e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:t …⟨tainted span: 36381 chars⟩… method&&a_(""),n({farewell:"goodbye"}),!0}))}async function l_(){i_(),t_(),n_(),await ks.initUser(),await ks.initStorage«(),r_(),c_(),locatio…`  · STORAGE:STORAGE_FLOW[area: local, key: authToken, sender: background, receiver: content], ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:template-literal, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C29350 -> L1:C29351  `…e.data.user):chrome.runtime.openOptionsPage()})),chrome.runtime.onMessageExternal.addListener((function(e){"sign-out"===»e«.message&&j(),"login"===e.message&&chrome.storage.local.set({authToken:e.token})}))}function j(){chrome.storage.local.re…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (authToken) — `background` L1:C29386 -> L1:C29431  `…onsPage()})),chrome.runtime.onMessageExternal.addListener((function(e){"sign-out"===e.message&&j(),"login"===e.message&&»chrome.storage.local.set({authToken:e.token})«}))}function j(){chrome.storage.local.remove("authToken")}function N(){chrome.contextMenus.create({id:"fusion-helper",ti…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (9 raw steps → 1 distinct lines):
   1. L1 `…e.data.user):chrome.runtime.openOptionsPage()})),chrome.runtime.onMessageExternal.addListener((function(e){"sign-out"===»e.message&&j(),"login"===e.message&&chrome.storage.local.set({authToken:e.token})«}))}function j(){chrome.storage.local.remove("authToken")}function N(){chrome.contextMenus.create({id:"fusion-helper",ti…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty

---
