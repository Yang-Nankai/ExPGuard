# Source-level Taint Flow — khnbclggeggefodgimdekejhipkeobnc 5.0.10

- Source type: CRX
- Files with issues: 4 / 9
- Distinct taint flows: 7  (collapsed from 8 raw issue entries)
- Sinkless sources skipped: 13 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `assets/context-manipulator-main-BDkaZRnI` L1:C1705 -> L1:C1711  `…s://mail.google.com")};window.addEventListener("message",async t=>{if(t.origin!=="https://mail.google.com")return;const{»type:s«,methodPath:o,args:i=[],requestId:e,isGetting:n,eventType:a}=t.data;if(s==="OBSERVE_EVENT"){try{await f(a,e)}catch(r){wi…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (https://mail.google.com) — `assets/context-manipulator-main-BDkaZRnI` L1:C1487 -> L1:C1606  `…tId:s,args:i},"https://mail.google.com")})},u=async(t,s,o,i)=>{t.startsWith("gmail.")&&await l();const e=await d(t,s,o);»window.postMessage({type:"METHOD_RESULT",methodPath:t,result:e,requestId:i,status:"success"},"https://mail.google.com")«};window.addEventListener("message",async t=>{if(t.origin!=="https://mail.google.com")return;const{type:s,methodPath:o,a…`
  - `WINDOW_POSTMESSAGE` (https://mail.google.com) — `assets/context-manipulator-main-BDkaZRnI` L1:C1319 -> L1:C1407  `…indow.gmail)throw new Error("Gmail is not available in main context");window.gmail.observe.on(t,(...o)=>{const i=m(o,t);»window.postMessage({type:"OBSERVE_RESULT",requestId:s,args:i},"https://mail.google.com")«})},u=async(t,s,o,i)=>{t.startsWith("gmail.")&&await l();const e=await d(t,s,o);window.postMessage({type:"METHOD_RESULT"…`
- **Sanitized**: NO
- **Frame**: `CS_5`

- **Propagation** (375 raw steps → 1 distinct lines):
   1. L1 `…XMLHttpRequest));if(»s==="compose"){const i=t[0],e=c(i);if(e)return[e];const n=t[0]?.id;o=[typeof n=="function"?n():n]}if(["view_email","view …⟨tainted span: 1597 chars⟩… SULT",requestId:e,args:[],error:r.message},"https://mail.google.com")}return}if(s==="EXECUTE_METHOD")try{await u(o,i,n,e«)}catch(r){window.po…`  · ELEMENT:destructure-property[type], ELEMENT:destructure-property[methodPath], ELEMENT:destructure-property[args], ELEMENT:destructure-property[requestId], ELEMENT:destructure-property[isGetting], ELEMENT:destructure-property[eventType], ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ITERATE:loop.iteration, ASSIGN:logical-left, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element-container, ELEMENT:object.setProperty

---

## Flow #2 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `assets/background-DncCHPoW` L1:C4711 -> L1:C4972  `…e)!==a&&(P.set(e,a),»g({route:"/linkedin/reportKickOrBan",payload:{pageType:o,checkpointUrl:t,pageUrl:r.url??t,trigger:n,tabTitle:r.title,tab …⟨tainted span: 261 chars⟩… erUserAgent:navigator.userAgent}}).catch(c=>{l.error("[linkedin-kick-or-ban-detection] Failed to report checkpoint",c)})«)},xe=()=>{T("linked…`
- **Sink(s)**:
  - `FETCH_BODY` (https://app.lemlist.com/api/extension-next/linkedin/reportKickOrBan) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (60 raw steps → 1 distinct lines):
   1. L1 `…AM_IDS]:E})},K=e=>E[»e],Re=e=>{delete E[e],chrome.storage.session.set({[k.TAB_TEAM_IDS]:E})};chrome.tabs.onRemoved.addListener(e=>{delete F[e …⟨tainted span: 3438 chars⟩… erUserAgent:navigator.userAgent}}).catch(c=>{l.error("[linkedin-kick-or-ban-detection] Failed to report checkpoint",c)})«)},xe=()=>{T("linked…`  · ELEMENT:object.setProperty, ELEMENT:destructure-property[loginToken], ELEMENT:destructure-property[timeout], ELEMENT:destructure-property[tabId], ASSIGN:identifier, COPY:object-spread, RETURN:json.stringify

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/background-DncCHPoW` L1:C14038 -> L1:C14039  `…ime.onMessageExternal.addListener((e,t,n)=>{if(!st(t.origin??t.url))return n({ok:!1,error:"unauthorized origin"}),!1;if(»e«?.command==="openTab"&&typeof e.url=="string"){let r;try{r=new URL(e.url)}catch{return n({ok:!1,error:"invalid url"}),!1…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `assets/background-DncCHPoW` L1:C14253 -> L1:C14301  `…1,error:"invalid url"}),!1}return r.protocol!=="https:"&&r.protocol!=="http:"?(n({ok:!1,error:"invalid protocol"}),!1):(»chrome.tabs.create({url:r.toString(),active:!0})«.then(()=>n({ok:!0}),o=>{l.warn("[external] openTab failed",{error:o instanceof Error?o.message:o}),n({ok:!1,error:"tab …`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (20 raw steps → 1 distinct lines):
   1. L1 `…zed origin"}),!1;if(»e?.command==="openTab"&&typeof e.url=="string"){let r;try{r=new URL(e.url)}catch{return n({ok:!1,error:"invalid url"}),! …⟨tainted span: 407 chars⟩… {l.warn("[external] openTab failed",{error:o instanceof Error?o.message:o}),n({ok:!1,error:"tab creation failed"})}),!0)«}return n({ok:!1,err…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return

---

## Flow #4 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `assets/background-DncCHPoW` L1:C9318 -> L1:C9388  `…nsion?token=${encodeURIComponent(o.uninstallToken)}`)),await ze(e)};let S="";async function Xe(){return new Promise(e=>{»chrome.cookies.getAll({url:"https://www.linkedin.com/"},t=>{e(t??[])})«})}async function Ye(e){await g({route:"/linkedin/updateCookie",payload:{cookie:e,extensionVersion:chrome.runtime.getMan…`
- **Sink(s)**:
  - `FETCH_BODY` (https://app.lemlist.com/api/extension-next/linkedin/updateCookie) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (96 raw steps → 1 distinct lines):
   1. L1 `…AM_IDS]:E})},K=e=>E[»e],Re=e=>{delete E[e],chrome.storage.session.set({[k.TAB_TEAM_IDS]:E})};chrome.tabs.onRemoved.addListener(e=>{delete F[e …⟨tainted span: 8316 chars⟩… ccess:!1,noCookie:!0};const r=t.map(o=>`${o.name}=${o.value}`).join("; ");return r===S&&!e?{success:!0}:(await Ye(r),S=r«,{success:!0})}catch…`  · ELEMENT:object.setProperty, ELEMENT:array.find, ASSIGN:unary, RETURN:array.join, ASSIGN:identifier, ELEMENT:destructure-property[loginToken], ELEMENT:destructure-property[timeout], ELEMENT:destructure-property[tabId], COPY:object-spread, RETURN:json.stringify

---

## Flow #5 — CHROME_COOKIES_INFO (cookies(https://www.linkedin.com/))

- **Source**: `CHROME_COOKIES_INFO` — `assets/background-DncCHPoW` L1:C9670 -> L1:C9697  `…ait g({route:"/linkedin/removeCookie",payload:{cookie:e}})}async function q({force:e=!1}={}){try{const t=await Xe();if(!»t.find(o=>o.name==="li_at")«)return S&&(await Je(S),S=""),{success:!1,noCookie:!0};const r=t.map(o=>`${o.name}=${o.value}`).join("; ");return r===S&…`
- **Sink(s)**:
  - `FETCH_BODY` (https://app.lemlist.com/api/extension-next/linkedin/updateCookie) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (92 raw steps → 1 distinct lines):
   1. L1 `…AM_IDS]:E})},K=e=>E[»e],Re=e=>{delete E[e],chrome.storage.session.set({[k.TAB_TEAM_IDS]:E})};chrome.tabs.onRemoved.addListener(e=>{delete F[e …⟨tainted span: 8316 chars⟩… ccess:!1,noCookie:!0};const r=t.map(o=>`${o.name}=${o.value}`).join("; ");return r===S&&!e?{success:!0}:(await Ye(r),S=r«,{success:!0})}catch…`  · ELEMENT:array.find, ASSIGN:unary, RETURN:array.join, ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:destructure-property[loginToken], ELEMENT:destructure-property[timeout], ELEMENT:destructure-property[tabId], COPY:object-spread, RETURN:json.stringify

---

## Flow #6 — CHROME_COOKIES_INFO (cookies(https://auth.lempire.com))  ·  2× duplicate paths collapsed

- **Source**: `CHROME_COOKIES_INFO` — `assets/background-DncCHPoW` L1:C1797 -> L1:C1925  `…orage.session.set({[k.TAB_CONFIGS]:F,[k.TAB_TEAM_IDS]:E})});const re=async()=>{const e=t=>T(t).catch(()=>null);try{const»[t,n]=await Promise.all([chrome.cookies.get({url:I,name:"Meteor.loginToken"}),chrome.cookies.get({url:I,name:"Meteor.userId"})])«,[r,o]=await Promise.all([t?.value?null:e("loginToken"),n?.value?null:e("userId")]);return{token:t?.value??r??null,userI…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://app.lemlist.com/api/extension-next/linkedin/removeCookie) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
  - `FETCH_HEADERS` (https://app.lemlist.com/api/extension-next/linkedin/updateCookie) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
  - `FETCH_HEADERS` (https://app.lemlist.com/api/extension-next/linkedin/reportKickOrBan) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
  - `FETCH_HEADERS` (https://app.lemlist.com/api/extension-next/linkedin/updateTrackHeaders) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
  - `FETCH_HEADERS` (https://app.lemlist.com/api/extension-next/track-lifecycle) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
  - `FETCH_HEADERS` (https://app.lemlist.com/api/extension-next/context) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
  - `FETCH_HEADERS` (https://app.lemlist.com/api/extension-next/leads_profile_status) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
  - `FETCH_HEADERS` (https://app.lemlist.com/api/extension-next/gmail/email_tracking) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
  - `FETCH_HEADERS` ([Unknown URL]) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2023 raw steps → 1 distinct lines):
   1. L1 `…(()=>null);try{const»[t,n]=await Promise.all([chrome.cookies.get({url:I,name:"Meteor.loginToken"}),chrome.cookies.get({url:I,name:"Meteor.use …⟨tainted span: 13648 chars⟩… GET_AUTH_COOKIES,handler:async(e,t)=>{const n=await re(),r=t.sender?.tab?.id,o=r?K(r):void 0;return{...n,teamId:o??null}«}});i.handle({comman…`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary, ASSIGN:template-literal, COPY:object-spread

---

## Flow #7 — CHROME_COOKIES_INFO (cookies(https://www.linkedin.com))

- **Source**: `CHROME_COOKIES_INFO` — `assets/background-DncCHPoW` L1:C5752 -> L1:C5832  `….replace(/\*/g,".*");return new RegExp(`^${t}$`)},Fe=(e,t)=>e?.find(r=>r.name.toLowerCase()===t)?.value??"",He=async()=>»(await chrome.cookies.get({url:"https://www.linkedin.com",name:"li_at"}))?.value«??"",ae=async(e,t)=>{if(U[e]){x[e]=t;return}U[e]=!0;try{const r=await He();if(r){const o=b[e]??{headers:{},liAt:""},a={}…`
- **Sink(s)**:
  - `FETCH_BODY` (https://app.lemlist.com/api/extension-next/linkedin/updateTrackHeaders) — `assets/background-DncCHPoW` L1:C2950 -> L1:C3110  `…==void 0?K(o):void 0;c&&(a={...t,teamId:c});const d=new AbortController,f=setTimeout(()=>d.abort(),r);try{const u=await »fetch(`${me}/extension-next${e}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a),signal:d.signal})«;if(clearTimeout(f),!u.ok){if(u.status===401)throw await Promise.all([w("loginToken"),w("userId")]).catch(()=>{}),new Er…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (763 raw steps → 1 distinct lines):
   1. L1 `…AM_IDS]:E})},K=e=>E[»e],Re=e=>{delete E[e],chrome.storage.session.set({[k.TAB_TEAM_IDS]:E})};chrome.tabs.onRemoved.addListener(e=>{delete F[e …⟨tainted span: 5022 chars⟩… n.headers){const d=Fe(e.requestHeaders,c);d&&(r[c]=d)}const o=b[t]?.headers??{};Object.entries(r).some(([c,d])=>d!==o[c]«)&&ae(t,r)}},ie=e=>{…`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:object.setProperty, ELEMENT:destructure-property[loginToken], ELEMENT:destructure-property[timeout], ELEMENT:destructure-property[tabId], COPY:object-spread, RETURN:json.stringify, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-right

---
