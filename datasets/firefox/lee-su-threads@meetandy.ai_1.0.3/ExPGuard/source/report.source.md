# Source-level Taint Flow — lee-su-threads@meetandy.ai 1.0.3

- Source type: XPI
- Files with issues: 4 / 4
- Distinct taint flows: 5  (collapsed from 6 raw issue entries)
- Sinkless sources skipped: 22 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_CUSTOM_EVENT (window.addEventListener(threads-friendships-list-loaded))

- **Source**: `WINDOW_CUSTOM_EVENT` — `content` L10:C1950 -> L10:C1958  `…USER_IDS",data:n})}});var I=[],q=[],me=[];window.addEventListener("threads-friendships-list-loaded",e=>{var o;let t=((o=»e.detail«)==null?void 0:o.users)||[];console.log(`[Threads Extractor] Friendships list loaded with ${t.length} users`),me=t,setTi…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C53722 -> L1:C53797  `…id 0:s.requestId)===o&&(window.removeEventListener("message",a),n(r.data.result))};window.addEventListener("message",a),»window.postMessage({type:"threads-fetch-request",requestId:o,userId:e},"*")«,setTimeout(()=>{window.removeEventListener("message",a),n(null)},t)})}async function G(e,t=2e3){let o=Math.random().toS…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (754 raw steps → 2 distinct lines):
   1. L10 `…ed",e=>{var o;let t=»((o=e.detail)==null?void 0:o.users)||[];console.log(`[Threads Extractor] Friendships list loaded with ${t.length} users` …⟨tainted span: 4341 chars⟩… ips-location-badge")||u.querySelector(".threads-friendships-fetch-btn"))){i++;let K=l.find(E=>E.username===d);K?S(d,K.pk«,f,y):G(d,100).then(…`  · ELEMENT:member-element, ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member.length, ASSIGN:template-literal, ELEMENT:member-element-container, ASSIGN:binary-left, RETURN:Math.min, ASSIGN:binary-right, ASSIGN:unary, ITERATE:loop.iteration, ELEMENT:destructure-property[pk], ELEMENT:destructure-property[username], ASSIGN:logical-right, ELEMENT:array.find
   2. L1 `…t o=e.querySelector(»`a[href="/@${t}"]`);if(!o)return null;let n=o;for(let a=0;a<15&&n;a++){let r=n.parentElement;if(r&&Array.from(r.children …⟨tainted span: 56933 chars⟩… on");return t.className="threads-friendships-fetch-btn",t.textContent="\u2796",t.title=`No location available for @${e}`«,t.disabled=!0,t.sty…`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_CUSTOM_EVENT (window.addEventListener(threads-profile-extracted))

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L1:C1640 -> L1:C1674  `…e(o[0].id,{url:t.url,active:!0}),e.windows.update(o[0].windowId,{focused:!0})):e.tabs.create({url:t.url})}),!1}return!1}»e.runtime.onMessage.addListener(m)«;var I="0.3.5";e.runtime.onInstalled.addListener(t=>{let a=e.runtime.getManifest().version;t.reason==="install"?(e.tabs.…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (profileCache) — `background` L1:C575 -> L1:C612  `…cal.get(["profileCache"]).then(r=>{let o=r.profileCache||{},n=t.data.username;n&&(o[n]={...t.data,timestamp:Date.now()},»e.storage.local.set({profileCache:o})«)}),!1;if(t.type==="GET_CACHED_PROFILES")return e.storage.local.get(["profileCache"]).then(r=>{let o=r.profileCache||{},…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L1 `…che"]).then(r=>{let »o=r.profileCache||{},n=t.data.username;n&&(o[n]={...t.data,timestamp:Date.now()},e.storage.local.set({profileCache:o}))} …⟨tainted span: 1180 chars⟩… .windows.update(o[0].windowId,{focused:!0})):e.tabs.create({url:t.url})}),!1}return!1}e.runtime.onMessage.addListener(m)«;var I="0.3.5";e.run…`  · MESSAGE, ELEMENT:member-element, COPY:object-spread, ASSIGN:identifier, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`

---

## Flow #3 — WINDOW_CUSTOM_EVENT (From storage.local.set('profileCache') in background)  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L1:C1640 -> L1:C1674  `…e(o[0].id,{url:t.url,active:!0}),e.windows.update(o[0].windowId,{focused:!0})):e.tabs.create({url:t.url})}),!1}return!1}»e.runtime.onMessage.addListener(m)«;var I="0.3.5";e.runtime.onInstalled.addListener(t=>{let a=e.runtime.getManifest().version;t.reason==="install"?(e.tabs.…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (profileCache) — `background` L1:C575 -> L1:C612  `…cal.get(["profileCache"]).then(r=>{let o=r.profileCache||{},n=t.data.username;n&&(o[n]={...t.data,timestamp:Date.now()},»e.storage.local.set({profileCache:o})«)}),!1;if(t.type==="GET_CACHED_PROFILES")return e.storage.local.get(["profileCache"]).then(r=>{let o=r.profileCache||{},…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (9 raw steps → 1 distinct lines):
   1. L1 `… received:",t.data),»e.storage.local.get(["profileCache"]).then(r=>{let o=r.profileCache||{},n=t.data.username;n&&(o[n]={...t.data,timestamp: …⟨tainted span: 1231 chars⟩… .windows.update(o[0].windowId,{focused:!0})):e.tabs.create({url:t.url})}),!1}return!1}e.runtime.onMessage.addListener(m)«;var I="0.3.5";e.run…`  · MESSAGE, ELEMENT:member-element, COPY:object-spread, ASSIGN:identifier, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: profileCache, sender: background, receiver: background], ASSIGN:logical-left
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`

---

## Flow #4 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `injected` L1:C19730 -> L1:C19731  `….fromEntries(_)}window.addEventListener("message",async e=>{var t,o,s;if(e.source===window){if(((t=e.data)==null?void 0:»t«.type)==="threads-userid-request"){let{requestId:n,username:r}=e.data,a=_.get(r)||null;console.log(`[Threads Extractor] …`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `injected` L1:C19884 -> L1:C19961  `…){let{requestId:n,username:r}=e.data,a=_.get(r)||null;console.log(`[Threads Extractor] User ID lookup for @${r}: ${a}`),»window.postMessage({type:"threads-userid-response",requestId:n,userId:a},"*")«}if(((o=e.data)==null?void 0:o.type)==="threads-fetch-request"){let{requestId:n,userId:r}=e.data;console.log(`[Threads E…`
  - `WINDOW_POSTMESSAGE` (*) — `injected` L1:C20151 -> L1:C20227  `…questId:n,userId:r}=e.data;console.log(`[Threads Extractor] Profile fetch request for user ID: ${r}`);let a=await se(r);»window.postMessage({type:"threads-fetch-response",requestId:n,result:a},"*")«}(s=e.data)==null||s.type}});window.__threadsFetchProfileInfo=se;window.__threadsGetUserIdMap=()=>Object.fromEntries(_);…`
- **Sanitized**: NO
- **Frame**: `MAIN_injected`

- **Propagation** (76 raw steps → 1 distinct lines):
   1. L1 `…rget_user_id:String(»e)})),o.append("__d",i.__d||"www"),console.log("[Threads Extractor] Fetching profile info for user ID:",e),i.fb_dtsg||co …⟨tainted span: 5178 chars⟩… ;let a=await se(r);window.postMessage({type:"threads-fetch-response",requestId:n,result:a},"*")}(s=e.data)==null||s.type«}});window.__threads…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:destructure-property[requestId], ELEMENT:destructure-property[username], ELEMENT:destructure-property[userId], ASSIGN:template-literal, ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_TEXT_CONTENT (script:not([src]):not([type]))

- **Source**: `ELEMENT_TEXT_CONTENT` — `injected` L1:C19116 -> L1:C19133  `…h.abs(f-p)<500){F(m,h,"regex");break}}}}}),document.querySelectorAll("script:not([src]):not([type])").forEach(n=>{let r=»n.textContent||""«;if(r.includes('"pk"')&&r.includes('"username"')){let a=[...r.matchAll(/"pk"\s*:\s*"(\d+)"/g)],c=[...r.matchAll(/"userna…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `injected` L1:C5729 -> L1:C5789  `…22c55e; font-weight: bold;")}});var j=null;function ae(){j&&clearTimeout(j),j=setTimeout(()=>{Object.keys(O).length>0&&(»window.postMessage({type:"threads-new-user-ids",data:O},"*")«,O={})},1e3)}function F(e,t,o=""){return _.has(e)?!1:(_.set(e,t),O[e]=t,ae(),o&&console.log(`%c[Threads Extractor] Found…`
- **Sanitized**: NO
- **Frame**: `MAIN_injected`

- **Propagation** (444 raw steps → 1 distinct lines):
   1. L1 `….keys(O).length>0&&(»window.postMessage({type:"threads-new-user-ids",data:O},"*"),O={})},1e3)}function F(e,t,o=""){return _.has(e)?!1:(_.set( …⟨tainted span: 13669 chars⟩… for(let u of a){let d=u[1],l=u.index;for(let p of c){let h=p[1],g=p.index;if(Math.abs(g-l)<500){F(h,d,"inline");break}}}«}});let s=_.size;ret…`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ELEMENT:array-spread, ELEMENT:object.setProperty, ELEMENT:implicit.add, ITERATE:loop.iteration, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.abs, ASSIGN:template-literal

---
