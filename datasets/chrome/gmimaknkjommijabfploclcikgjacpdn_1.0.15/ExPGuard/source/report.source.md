# Source-level Taint Flow — gmimaknkjommijabfploclcikgjacpdn 1.0.15

- Source type: CRX
- Files with issues: 2 / 5
- Distinct taint flows: 3  (collapsed from 128 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `sw.bundle` L2:C3914 -> L2:C3915  `…mous_user_id:l,user_id:0,created_at:G(),ext_version:u.version,sign_up_at:e}}(()=>{"use strict";let l=navigator.language;»l«.split("-")[0];class e{static voices=[];static groups=[];static log(x){let{level:t,msg:E}=this.getMessages(x);this.echo(…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (options) — `sw.bundle` L3:C669 -> L3:C726  `…(t=0,f({options:x})),_?.hasOwnProperty("update")){for(let[b,S]of Object.entries(_.update))x.hasOwnProperty(b)&&(x[b]=S);»chrome.storage.sync.set({options:x},async b=>{await O()})«}}),chrome.runtime.onMessage.addListener(function(_,w,f){if(_.question==="now_playing")f({answer:"now_playing",msg:E});e…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `sw.bundle` L3:C554 -> L3:C568  `…0,0,+(b.text!=="On")]}),b))(h)).then()),_?.hasOwnProperty("title")&&(E=_.title),(_?.hasOwnProperty("options")||t)&&(t=0,»f({options:x})«),_?.hasOwnProperty("update")){for(let[b,S]of Object.entries(_.update))x.hasOwnProperty(b)&&(x[b]=S);chrome.storage.sync…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (644 raw steps → 3 distinct lines):
   1. L2 `…(0,-3)}function z(){»return{user_agent:navigator.userAgent,accept_language:navigator.language,referer:location.href}}var we=/Chrome/.test(nav …⟨tainted span: 5503 chars⟩… .addListener(async function(_,w){w==="sync"&&(u("changes",_),await O())});let O=async _=>{try{Object.assign(x,await I())«,t=1}catch(w){u("err…`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ASSIGN:template-literal, COPY:object.assign
   2. L3 `…ion(_,w,f){var h;if(»_?.type==="SYT_TURN_ON"?$(Object.assign({action_id:K.CONTENT_TURN_OFF,type:Y.ACTION},z())):_?.type==="SYT_TURN_OFF"&&$(O …⟨tainted span: 641 chars⟩… [b,S]of Object.entries(_.update))x.hasOwnProperty(b)&&(x[b]=S);chrome.storage.sync.set({options:x},async b=>{await O()})«}}),chrome.runtime.o…`  · ELEMENT:object.setProperty, COPY:object.assign, ELEMENT:member-element, RETURN:fallback-return
   3. L1 `…peof this.opt.sendPayload=="function"&&this.arr&&this.arr.length>0&&this.opt.sendPayload(this.url,e)}transString(e){let »u={};for(let A in e)typeof e[A]=="object"?u[A]=JSON.stringify(e[A]):u[A]=String(e[A])«;return u}sendImmediateInner(){this.arr&&this.arr.length>0&&(this.platformSend(this.assemblePayload()),this.timer!=null&…`  · ITERATE:loop.iteration, ELEMENT:implicit.add, ELEMENT:member-element-container, RETURN:json.stringify, ELEMENT:object.setProperty

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `sw.bundle` L3:C305 -> L3:C306  `…="SYT_TURN_OFF"&&$(Object.assign({action_id:K.CONTENT_TURN_ON,type:Y.ACTION},z())),_?.hasOwnProperty("badge")&&(h={text:»_«.badge},h?.text&&chrome.action.setBadgeText((b=>(["On","Off"].includes(b.text)&&chrome.action.setBadgeBackgroundColor({c…`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `sw.bundle` L3:C323 -> L3:C465  `…(Object.assign({action_id:K.CONTENT_TURN_ON,type:Y.ACTION},z())),_?.hasOwnProperty("badge")&&(h={text:_.badge},h?.text&&»chrome.action.setBadgeText((b=>(["On","Off"].includes(b.text)&&chrome.action.setBadgeBackgroundColor({color:[0,0,0,+(b.text!=="On")]}),b))(h))«.then()),_?.hasOwnProperty("title")&&(E=_.title),(_?.hasOwnProperty("options")||t)&&(t=0,f({options:x})),_?.hasOwnProper…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (215 raw steps → 1 distinct lines):
   1. L3 `…ion(_,w,f){var h;if(»_?.type==="SYT_TURN_ON"?$(Object.assign({action_id:K.CONTENT_TURN_OFF,type:Y.ACTION},z())):_?.type==="SYT_TURN_OFF"&&$(O …⟨tainted span: 759 chars⟩… })}}),chrome.runtime.onMessage.addListener(function(_,w,f){if(_.question==="now_playing")f({answer:"now_playing",msg:E})«;else if(_.type==="S…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:conditional-alternate, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right

---

## Flow #3 — NAVIGATOR_LANGUAGE (From storage.sync.set('options') in sw.bundle)  ·  126× duplicate paths collapsed

- **Source**: `NAVIGATOR_LANGUAGE` — `sw.bundle` L2:C3914 -> L2:C3915  `…mous_user_id:l,user_id:0,created_at:G(),ext_version:u.version,sign_up_at:e}}(()=>{"use strict";let l=navigator.language;»l«.split("-")[0];class e{static voices=[];static groups=[];static log(x){let{level:t,msg:E}=this.getMessages(x);this.echo(…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (options) — `sw.bundle` L3:C669 -> L3:C726  `…(t=0,f({options:x})),_?.hasOwnProperty("update")){for(let[b,S]of Object.entries(_.update))x.hasOwnProperty(b)&&(x[b]=S);»chrome.storage.sync.set({options:x},async b=>{await O()})«}}),chrome.runtime.onMessage.addListener(function(_,w,f){if(_.question==="now_playing")f({answer:"now_playing",msg:E});e…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `sw.bundle` L3:C554 -> L3:C568  `…0,0,+(b.text!=="On")]}),b))(h)).then()),_?.hasOwnProperty("title")&&(E=_.title),(_?.hasOwnProperty("options")||t)&&(t=0,»f({options:x})«),_?.hasOwnProperty("update")){for(let[b,S]of Object.entries(_.update))x.hasOwnProperty(b)&&(x[b]=S);chrome.storage.sync…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (659 raw steps → 3 distinct lines):
   1. L2 `…(0,-3)}function z(){»return{user_agent:navigator.userAgent,accept_language:navigator.language,referer:location.href}}var we=/Chrome/.test(nav …⟨tainted span: 5503 chars⟩… .addListener(async function(_,w){w==="sync"&&(u("changes",_),await O())});let O=async _=>{try{Object.assign(x,await I())«,t=1}catch(w){u("err…`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ASSIGN:template-literal, COPY:object.assign, STORAGE:STORAGE_FLOW[area: sync, key: options, sender: sw.bundle, receiver: sw.bundle]
   2. L3 `…ion(_,w,f){var h;if(»_?.type==="SYT_TURN_ON"?$(Object.assign({action_id:K.CONTENT_TURN_OFF,type:Y.ACTION},z())):_?.type==="SYT_TURN_OFF"&&$(O …⟨tainted span: 641 chars⟩… [b,S]of Object.entries(_.update))x.hasOwnProperty(b)&&(x[b]=S);chrome.storage.sync.set({options:x},async b=>{await O()})«}}),chrome.runtime.o…`  · ELEMENT:object.setProperty, COPY:object.assign, ELEMENT:member-element, RETURN:fallback-return
   3. L1 `…peof this.opt.sendPayload=="function"&&this.arr&&this.arr.length>0&&this.opt.sendPayload(this.url,e)}transString(e){let »u={};for(let A in e)typeof e[A]=="object"?u[A]=JSON.stringify(e[A]):u[A]=String(e[A])«;return u}sendImmediateInner(){this.arr&&this.arr.length>0&&(this.platformSend(this.assemblePayload()),this.timer!=null&…`  · ITERATE:loop.iteration, ELEMENT:implicit.add, ELEMENT:member-element-container, RETURN:json.stringify, ELEMENT:object.setProperty

---
