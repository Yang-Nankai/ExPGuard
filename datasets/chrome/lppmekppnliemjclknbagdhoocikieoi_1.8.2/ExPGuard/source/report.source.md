# Source-level Taint Flow — lppmekppnliemjclknbagdhoocikieoi 1.8.2

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 5  (collapsed from 5 raw issue entries)
- Sinkless sources skipped: 19 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content-scripts/content` L1:C4463 -> L1:C4470  `…}var T=`seventv:settings:response`,ge=`seventv:settings:update`,E=!1,D=null,O=null;function _e(e){if(e.source!==window||»!e.data«||typeof e.data!=`object`)return null;let t=e.data;if(t.type!==`seventv:settings:request`||typeof t.id!=`string`||!t.req…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `content-scripts/content` L1:C4824 -> L1:C4887  `…}:null}function k(e){e.persisted||ye()}function ve(){E||=(D=e=>{let n=_e(e);n&&t.runtime.sendMessage(n.request).then(e=>»window.postMessage({type:T,id:n.id,response:e},location.origin)«).catch(()=>window.postMessage({type:T,id:n.id,response:{ok:!1,error:`Settings service unavailable`}},location.origin))}…`
  - `WINDOW_POSTMESSAGE` (location.origin) — `content-scripts/content` L1:C4899 -> L1:C5005  `…;n&&t.runtime.sendMessage(n.request).then(e=>window.postMessage({type:T,id:n.id,response:e},location.origin)).catch(()=>»window.postMessage({type:T,id:n.id,response:{ok:!1,error:`Settings service unavailable`}},location.origin)«)},O=e=>{let t=e;t.type!==`seventv:settings:update`||typeof t.revision!=`number`||window.postMessage({type:ge,patch:t},l…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (127 raw steps → 1 distinct lines):
   1. L1 `…l;function _e(e){if(»e.source!==window||!e.data||typeof e.data!=`object`)return null;let t=e.data;if(t.type!==`seventv:settings:request`||typ …⟨tainted span: 562 chars⟩… )).catch(()=>window.postMessage({type:T,id:n.id,response:{ok:!1,error:`Settings service unavailable`}},location.origin))«},O=e=>{let t=e;t.ty…`  · ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty, ELEMENT:implicit.add, ELEMENT:member-element-container

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content-scripts/content` L1:C6524 -> L1:C6525  `…r.exp*1e3;return i<=t+n&&a>t-n}var Ee=`https://7tv.app`,R=!1,z=null,B=null,V=null,H=null,U=null,W=!1;function De(e){if(!»e«||typeof e!=`object`||!(`type`in e)||!(`token`in e))return null;let t=e;return t.type!==`7tv-token`||typeof t.token!=`st…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (7tv.account.token) — `content-scripts/content` L1:C6886 -> L1:C6914  `…:null;window.dispatchEvent(new CustomEvent(M,{detail:JSON.stringify({requestId:e,token:r})}))}async function G(e){await »t.storage.local.set({[A]:e})«}async function ke(){await t.storage.local.remove(A)}function K(e){if(!(e instanceof CustomEvent)||typeof e.detail!=`str…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (240 raw steps → 1 distinct lines):
   1. L1 `…unction Ce(e){let t=»e.replace(/-/g,`+`).replace(/_/g,`/`),n=t.padEnd(Math.ceil(t.length/4)*4,`=`),r=atob(n),i=Uint8Array.from(r,e=>e.charCod …⟨tainted span: 1629 chars⟩… detail:JSON.stringify({requestId:e,ok:t})}))}function Ae(){R||=(z=e=>{if(e.origin!==Ee)return;let t=De(e.data);!t||!L(t)«||G(t)},B=e=>{!(e in…`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:conditional-alternate, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:member.length, ASSIGN:binary-left, RETURN:fallback-return, RETURN:Math.ceil, RETURN:atob

---

## Flow #3 — WINDOW_CUSTOM_EVENT (window.addEventListener(seventv:account-token:set))

- **Source**: `WINDOW_CUSTOM_EVENT` — `content-scripts/content` L1:C7072 -> L1:C7080  `…ocal.remove(A)}function K(e){if(!(e instanceof CustomEvent)||typeof e.detail!=`string`)return null;try{let t=JSON.parse(»e.detail«);if(!t||typeof t!=`object`||Array.isArray(t))return null;let n=t;return typeof n.requestId==`string`?{requestId:n.reque…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (7tv.account.token) — `content-scripts/content` L1:C6886 -> L1:C6914  `…:null;window.dispatchEvent(new CustomEvent(M,{detail:JSON.stringify({requestId:e,token:r})}))}async function G(e){await »t.storage.local.set({[A]:e})«}async function ke(){await t.storage.local.remove(A)}function K(e){if(!(e instanceof CustomEvent)||typeof e.detail!=`str…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (362 raw steps → 1 distinct lines):
   1. L1 `…unction Ce(e){let t=»e.replace(/-/g,`+`).replace(/_/g,`/`),n=t.padEnd(Math.ceil(t.length/4)*4,`=`),r=atob(n),i=Uint8Array.from(r,e=>e.charCod …⟨tainted span: 1847 chars⟩… e);if(t){if(!t.token||!L(t.token)){q(t.requestId,!1);return}G(t.token).then(()=>q(t.requestId,!0),()=>q(t.requestId,!1))«}},H=e=>{let t=K(e);…`  · ELEMENT:member-element, RETURN:json.parse, ELEMENT:object.setProperty, COPY:object-spread, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:identifier, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-left, RETURN:Math.ceil, RETURN:atob, ASSIGN:logical-left, RETURN:json.stringify

---

## Flow #4 — WINDOW_CUSTOM_EVENT (window.addEventListener(seventv:service-status))

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L5:C6288 -> L5:C6500  `…stener(({reason:e})=>{je(()=>Ie(e)).catch(e=>{Oe.error(`Failed to initialize onboarding after extension install`,e)})}),»t.runtime.onMessage.addListener(e=>{if(Te(e))return je(Fe).then(()=>({ok:!0}),e=>(Oe.error(`Failed to open onboarding`,e),{ok:!1,error:`Unable to open onboarding.`}));if(Ee(e))return Le();if(De(e))return je(Re)})«,t.tabs.onRemoved.addListener(e=>{A.getValue().then(t=>{if(t===e)return Me()}).catch(()=>void 0)})}var Be=new Set([`debu…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (seventv.service-status.dismissed-outage-key) — `background` L5:C16443 -> L5:C16471  `…eturn{status:null,dismissed:!1}}finally{clearTimeout(n)}})().finally(()=>{X=null}),X)}async function mt(e){return await »t.storage.local.set({[J]:e})«,Y?.response.status?.outageKey===e&&(Y.response={...Y.response,dismissed:!0}),Y?.response??{status:null,dismissed:!1}}va…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2096 raw steps → 1 distinct lines):
   1. L5 `…n Te(e){return s(e)?»e.type===`seventv:onboarding/open`:!1}var k=`seventv_onboarding_notice_dismissed`;function Ee(e){return typeof e==`objec …⟨tainted span: 12010 chars⟩… }var ht=n(()=>{o(),ze(),st(),t.runtime.onMessage.addListener(e=>{if(dt(e))return e.op===`dismiss`?mt(e.outageKey):pt()})«}),gt=class{construc…`  · MESSAGE, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:conditional-consequent, ASSIGN:conditional-alternate, ELEMENT:implicit.add, ASSIGN:unary, ELEMENT:object.setProperty, ASSIGN:template-literal, ITERATE:loop.iteration, RETURN:fallback-return, ELEMENT:destructure-property[change], ELEMENT:destructure-property[scope], ASSIGN:binary-right
      ⇄ cross-context hop: `runtime.single.sender.message[content-scripts/content->background]`

---

## Flow #5 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L5:C6288 -> L5:C6500  `…stener(({reason:e})=>{je(()=>Ie(e)).catch(e=>{Oe.error(`Failed to initialize onboarding after extension install`,e)})}),»t.runtime.onMessage.addListener(e=>{if(Te(e))return je(Fe).then(()=>({ok:!0}),e=>(Oe.error(`Failed to open onboarding`,e),{ok:!1,error:`Unable to open onboarding.`}));if(Ee(e))return Le();if(De(e))return je(Re)})«,t.tabs.onRemoved.addListener(e=>{A.getValue().then(t=>{if(t===e)return Me()}).catch(()=>void 0)})}var Be=new Set([`debu…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (seventv.service-status.dismissed-outage-key) — `background` L5:C16443 -> L5:C16471  `…eturn{status:null,dismissed:!1}}finally{clearTimeout(n)}})().finally(()=>{X=null}),X)}async function mt(e){return await »t.storage.local.set({[J]:e})«,Y?.response.status?.outageKey===e&&(Y.response={...Y.response,dismissed:!0}),Y?.response??{status:null,dismissed:!1}}va…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2436 raw steps → 1 distinct lines):
   1. L5 `…n Te(e){return s(e)?»e.type===`seventv:onboarding/open`:!1}var k=`seventv_onboarding_notice_dismissed`;function Ee(e){return typeof e==`objec …⟨tainted span: 12010 chars⟩… }var ht=n(()=>{o(),ze(),st(),t.runtime.onMessage.addListener(e=>{if(dt(e))return e.op===`dismiss`?mt(e.outageKey):pt()})«}),gt=class{construc…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:conditional-consequent, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:conditional-alternate, ELEMENT:implicit.add, ELEMENT:object.setProperty, ASSIGN:template-literal, ITERATE:loop.iteration, ELEMENT:member-element-container, RETURN:fallback-return, ELEMENT:destructure-property[change], ELEMENT:destructure-property[scope], ASSIGN:binary-right
      ⇄ cross-context hop: `runtime.single.sender.message[content-scripts/content->background]`

---
