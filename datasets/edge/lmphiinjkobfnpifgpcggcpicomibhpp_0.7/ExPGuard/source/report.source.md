# Source-level Taint Flow — lmphiinjkobfnpifgpcggcpicomibhpp 0.7

- Source type: CRX
- Files with issues: 5 / 6
- Distinct taint flows: 4  (collapsed from 35 raw issue entries)
- Sinkless sources skipped: 34 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content.min` L1:C3552 -> L1:C3563  `…untime.sendMessage({message:"load page"},e=>{console.log(e.response)}),window.addEventListener("message",e=>{if(e.data&&»e.data.exId«===c){if(console.log("- 接收到來自插件的訊息 (content)"),"send-cc-contribute"===e.data.direction){const t=e.data.message;chrome.st…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (cc_contribute) — `content.min` L1:C3674 -> L1:C3717  `…data.exId===c){if(console.log("- 接收到來自插件的訊息 (content)"),"send-cc-contribute"===e.data.direction){const t=e.data.message;»chrome.storage.local.set({cc_contribute:t})«,window.postMessage({exId:c,direction:"complete-cc-contribute",message:t},"*")}if("send-cc-progress"===e.data.direction)…`
  - `WINDOW_POSTMESSAGE` (*) — `content.min` L1:C3718 -> L1:C3795  `…(content)"),"send-cc-contribute"===e.data.direction){const t=e.data.message;chrome.storage.local.set({cc_contribute:t}),»window.postMessage({exId:c,direction:"complete-cc-contribute",message:t},"*")«}if("send-cc-progress"===e.data.direction){const t=e.data.message;chrome.storage.local.get(["cc_progress"],e=>{if(void 0…`
  - `CHROME_LOCAL_STORAGE` (cc_progress) — `content.min` L1:C3998 -> L1:C4051  `…cal.get(["cc_progress"],e=>{if(void 0!==e.cc_progress)e.cc_progress[t.vId]={subs:t.subs,updatedAt:(new Date).getTime()},»chrome.storage.local.set({cc_progress:e.cc_progress})«;else{const e={};e[t.vId]={subs:t.subs,updatedAt:(new Date).getTime()},chrome.storage.local.set({cc_progress:e})}window.…`
  - `WINDOW_POSTMESSAGE` (*) — `content.min` L1:C4164 -> L1:C4248  `…gress});else{const e={};e[t.vId]={subs:t.subs,updatedAt:(new Date).getTime()},chrome.storage.local.set({cc_progress:e})}»window.postMessage({exId:c,direction:"exist-cc-progress",message:{subs:t.subs}},"*")«,window.postMessage({exId:c,direction:"complete-cc-progress"},"*"),chrome.storage.local.getBytesInUse().then(e=>{console…`
  - `CHROME_LOCAL_STORAGE` (cc_progress) — `content.min` L1:C4122 -> L1:C4163  `…me.storage.local.set({cc_progress:e.cc_progress});else{const e={};e[t.vId]={subs:t.subs,updatedAt:(new Date).getTime()},»chrome.storage.local.set({cc_progress:e})«}window.postMessage({exId:c,direction:"exist-cc-progress",message:{subs:t.subs}},"*"),window.postMessage({exId:c,directi…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (141 raw steps → 1 distinct lines):
   1. L1 `…er("message",e=>{if(»e.data&&e.data.exId===c){if(console.log("- 接收到來自插件的訊息 (content)"),"send-cc-contribute"===e.data.direction){const t=e.dat …⟨tainted span: 1582 chars⟩… gress&&t.vId in e.cc_progress?window.postMessage({exId:c,direction:"exist-cc-progress",message:{subs:e.cc_progress[t.vId«].subs}},"*"):window…`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.local.set('cc_progress') in content.min)  ·  32× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `content.min` L1:C3552 -> L1:C3563  `…untime.sendMessage({message:"load page"},e=>{console.log(e.response)}),window.addEventListener("message",e=>{if(e.data&&»e.data.exId«===c){if(console.log("- 接收到來自插件的訊息 (content)"),"send-cc-contribute"===e.data.direction){const t=e.data.message;chrome.st…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content.min` L1:C4583 -> L1:C4689  `…ion){const t=e.data.message;chrome.storage.local.get(["cc_progress"],e=>{void 0!==e.cc_progress&&t.vId in e.cc_progress?»window.postMessage({exId:c,direction:"response-cc-progress",message:{subs:e.cc_progress[t.vId].subs}},"*")«:window.postMessage({exId:c,direction:"response-cc-progress",message:{subs:null}},"*"),window.postMessage({exId:c,direct…`
  - `WINDOW_POSTMESSAGE` (*) — `content.min` L1:C5036 -> L1:C5139  `…ion){const t=e.data.message;chrome.storage.local.get(["cc_progress"],e=>{void 0!==e.cc_progress&&t.vId in e.cc_progress?»window.postMessage({exId:c,direction:"exist-cc-progress",message:{subs:e.cc_progress[t.vId].subs}},"*")«:window.postMessage({exId:c,direction:"exist-cc-progress",message:{subs:null}},"*"),window.postMessage({exId:c,direction…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (146 raw steps → 1 distinct lines):
   1. L1 `…er("message",e=>{if(»e.data&&e.data.exId===c){if(console.log("- 接收到來自插件的訊息 (content)"),"send-cc-contribute"===e.data.direction){const t=e.dat …⟨tainted span: 1582 chars⟩… gress&&t.vId in e.cc_progress?window.postMessage({exId:c,direction:"exist-cc-progress",message:{subs:e.cc_progress[t.vId«].subs}},"*"):window…`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:identifier, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: cc_progress, sender: content.min, receiver: content.min]

---

## Flow #3 — WINDOW_MESSAGE_EVENT (From storage.local.set('cc_contribute') in content.min)

- **Source**: `WINDOW_MESSAGE_EVENT` — `content.min` L1:C3552 -> L1:C3563  `…untime.sendMessage({message:"load page"},e=>{console.log(e.response)}),window.addEventListener("message",e=>{if(e.data&&»e.data.exId«===c){if(console.log("- 接收到來自插件的訊息 (content)"),"send-cc-contribute"===e.data.direction){const t=e.data.message;chrome.st…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `external.min` L1:C1675 -> L1:C1766  `…)"),"request-cc-contribute"===e.data.direction&&chrome.storage.local.get(["cc_contribute"],e=>{void 0!==e.cc_contribute?»window.postMessage({exId:o,direction:"response-cc-contribute",message:e.cc_contribute},"*")«:window.postMessage({exId:o,direction:"response-cc-contribute",message:null},"*")}))})}else console.log("- 插件已關閉 (extern…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (145 raw steps → 1 distinct lines):
   1. L1 _(in `content.min`)_ `…ribute("exId",c),doc»ument.body.appendChild(e),function(e,t){const o=document.createElement("script");o.setAttribute("type","text/javascript" …⟨tainted span: 3523 chars⟩… gress&&t.vId in e.cc_progress?window.postMessage({exId:c,direction:"exist-cc-progress",message:{subs:e.cc_progress[t.vId«].subs}},"*"):window…`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:identifier, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: cc_contribute, sender: content.min, receiver: external.min]

---

## Flow #4 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `main.min` L1:C22117 -> L1:C22124  `…ementById("cc-sub-container");e&&(e.style.height=.7*window.innerHeight+"px")}),window.addEventListener("message",e=>{if(»!e.data«)return;const t=document.getElementById("cc-ysh-container").getAttribute("exId");if(e.data.exId===t){if("response-cc-pro…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `main.min` L1:C7140 -> L1:C7239  `…={title:t.title,thumbnail:t.thumbnail.thumbnails.length>0?t.thumbnail.thumbnails[t.thumbnail.thumbnails.length-1]:null};»window.postMessage({exId:e,direction:"send-cc-contribute",message:{cId:o,vId:n,subs:i,meta:c}},"*")«}function L(){const e=window.ytInitialData.currentVideoEndpoint.watchEndpoint.videoId;if(!e)return void console.log("- 無…`
  - `WINDOW_POSTMESSAGE` (*) — `main.min` L1:C7503 -> L1:C7587  `…nt.getElementById("cc-ysh-container").getAttribute("exId");document.getElementById("cc-spinner").style.display="inline",»window.postMessage({exId:t,direction:"send-cc-progress",message:{vId:e,subs:i}},"*")«}function k(){const e=window.ytInitialData.currentVideoEndpoint.watchEndpoint.videoId;if(!e)return void console.log("- 無…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (6181 raw steps → 1 distinct lines):
   1. L1 `…osest:d}=c.get(o),r=»i.indexOf(d),a=d.segs.indexOf(l),u=t.getElementsByClassName("cc-sub-container-inner-div")[0],{item:g}=c.get(u),p=i.index …⟨tainted span: 21297 chars⟩… const e=document.getElementById("cc-spinner");e&&(e.style.display="none")}if("complete-cc-contribute"===e.data.direction«){const e=window.ytI…`  · ASSIGN:unary, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:identifier, ASSIGN:logical-left, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:conditional-consequent, ELEMENT:object.setProperty, RETURN:Math.round, ASSIGN:template-literal, RETURN:Math.floor, RETURN:Number.toFixed, RETURN:String.replace, ELEMENT:implicit.add, RETURN:Math.ceil, ELEMENT:member-element-container

---
