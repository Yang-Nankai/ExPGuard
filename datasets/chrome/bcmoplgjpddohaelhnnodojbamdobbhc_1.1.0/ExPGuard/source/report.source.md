# Source-level Taint Flow — bcmoplgjpddohaelhnnodojbamdobbhc 1.1.0

- Source type: CRX
- Files with issues: 3 / 5
- Distinct taint flows: 6  (collapsed from 6 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `youtube-content` L1:C65453 -> L1:C65633  `…yer?key=".concat(e),a={context:{client:{clientName:"WEB",clientVersion:"2.20251215.01.00"}},videoId:t},p.label=1;case 1:»return p.trys.push([1,4,,5]),[4,fetch(r,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":navigator.userAgent},credentials:"include",body:JSON.stringify(a)})];«case 2:return(i=p.sent()).ok?[4,i.json()]:[2,null];case 3:return o=p.sent(),s=null===(n=null==o?void 0:o.captions)||void…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://www.youtube.com/youtubei/v1/player?key=) — `youtube-content` L1:C65485 -> L1:C65631  `…client:{clientName:"WEB",clientVersion:"2.20251215.01.00"}},videoId:t},p.label=1;case 1:return p.trys.push([1,4,,5]),[4,»fetch(r,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":navigator.userAgent},credentials:"include",body:JSON.stringify(a)})«];case 2:return(i=p.sent()).ok?[4,i.json()]:[2,null];case 3:return o=p.sent(),s=null===(n=null==o?void 0:o.captions)||vo…`
  - `FETCH_HEADERS` (https://www.youtube.com/youtubei/v1/player?key=) — `youtube-content` L1:C68590 -> L1:C68873  `…s.push([1,4,,5]),[4,»fetch("https://www.youtube.com/youtubei/v1/player?key=".concat(e),{method:"POST",headers:{"Content-Type":"application/js …⟨tainted span: 283 chars⟩… ntials:"include",body:JSON.stringify({context:{client:{clientName:"WEB",clientVersion:"2.20251215.01.00"}},videoId:t})})«];case 2:return(n=r.…`
  - `FETCH_HEADERS` ([Unknown URL]) — `youtube-content` L1:C74364 -> L1:C74452  `…),e=(e=t).replace(/&fmt=(srv3|ttml)/g,""),n&&(e=e+(e.includes("?")?"&":"?")+"tlang=".concat(n)),window.location.href,[4,»fetch(e,{method:"GET",headers:{"User-Agent":navigator.userAgent},credentials:"include"})«];case 2:return(r=i.sent()).ok?[3,4]:[4,r.text().catch(function(){return""})];case 3:throw i.sent(),new Error("HTTP ".co…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (10 raw steps → 1 distinct lines):
   1. L1 `…t},p.label=1;case 1:»return p.trys.push([1,4,,5]),[4,fetch(r,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":navigator …⟨tainted span: 9001 chars⟩… t(n)),window.location.href,[4,fetch(e,{method:"GET",headers:{"User-Agent":navigator.userAgent},credentials:"include"})];«case 2:return(r=i.se…`  · ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_TEXT_CONTENT (script)

- **Source**: `ELEMENT_TEXT_CONTENT` — `youtube-content` L1:C65034 -> L1:C65054  `…"\s]*[:=]["\s]*([^"'\s]+)/)),!e)for(var n=document.querySelectorAll("script"),r=0,a=Array.from(n);r<a.length;r++){if(e=(»a[r].textContent||""«).match(/INNERTUBE_API_KEY["\s]*[:=]["\s]*([^"'\s,}]+)/))break}return(null==e?void 0:e[1])?e[1]:null}function se(t,e){va…`
- **Sink(s)**:
  - `FETCH_RESOURCE` (https://www.youtube.com/youtubei/v1/player?key=) — `youtube-content` L1:C68590 -> L1:C68873  `…s.push([1,4,,5]),[4,»fetch("https://www.youtube.com/youtubei/v1/player?key=".concat(e),{method:"POST",headers:{"Content-Type":"application/js …⟨tainted span: 283 chars⟩… ntials:"include",body:JSON.stringify({context:{client:{clientName:"WEB",clientVersion:"2.20251215.01.00"}},videoId:t})})«];case 2:return(n=r.…`  (url-control=FULL)
  - `FETCH_RESOURCE` (https://www.youtube.com/youtubei/v1/player?key=) — `youtube-content` L1:C72140 -> L1:C72441  `…tubei/v1/player",[4,»fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({context:{c …⟨tainted span: 301 chars⟩… dkVersion:30,userAgent:"com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip",hl:"en",gl:"US"}},videoId:t})})«];case 1:if(!(c=v.se…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (244 raw steps → 1 distinct lines):
   1. L1 `…<a.length;r++){if(e=»(a[r].textContent||"").match(/INNERTUBE_API_KEY["\s]*[:=]["\s]*([^"'\s,}]+)/))break}return(null==e?void 0:e[1])?e[1]:nul …⟨tainted span: 7114 chars⟩… ,s=o?"https://www.youtube.com/youtubei/v1/player?key=".concat(o):"https://www.youtube.com/youtubei/v1/player",[4,fetch(s«,{method:"POST",head…`  · ASSIGN:logical-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:conditional-consequent, ELEMENT:object.setProperty, ASSIGN:unary, RETURN:string.concat

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `extension-content` L1:C202 -> L1:C213  `…/youtubetotranscript.com"===e.origin||e.origin.startsWith("http://localhost:")){if(e.data&&"EXTENSION_REQUEST_TOKENS"===»e.data.type«)try{chrome.storage.local.get(["token","refreshToken","isLoggedIn","expiresAt"],function(t){chrome.runtime.lastError||wi…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (token) — `extension-content` L1:C620 -> L1:C881  `…f(!o||!n)return;try{»chrome.storage.local.set({token:o,refreshToken:n,isLoggedIn:!0,expiresAt:Date.now()+31536e6},function(){chrome.runtime.l …⟨tainted span: 261 chars⟩… ime.sendMessage({action:"AUTH_COMPLETE",token:o,refresh_token:n,source:"email"},function(e){chrome.runtime.lastError})})«}catch(e){}}}}),wind…`
  - `CHROME_LOCAL_STORAGE` (refreshToken) — `extension-content` L1:C620 -> L1:C881  `…f(!o||!n)return;try{»chrome.storage.local.set({token:o,refreshToken:n,isLoggedIn:!0,expiresAt:Date.now()+31536e6},function(){chrome.runtime.l …⟨tainted span: 261 chars⟩… ime.sendMessage({action:"AUTH_COMPLETE",token:o,refresh_token:n,source:"email"},function(e){chrome.runtime.lastError})})«}catch(e){}}}}),wind…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (27 raw steps → 1 distinct lines):
   1. L1 `…://localhost:")){if(»e.data&&"EXTENSION_REQUEST_TOKENS"===e.data.type)try{chrome.storage.local.get(["token","refreshToken","isLoggedIn","expi …⟨tainted span: 716 chars⟩… ime.sendMessage({action:"AUTH_COMPLETE",token:o,refresh_token:n,source:"email"},function(e){chrome.runtime.lastError})})«}catch(e){}}}}),wind…`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:unary, ELEMENT:object.setProperty

---

## Flow #4 — WINDOW_MESSAGE_EVENT (From storage.local.set('token') in extension-content)

- **Source**: `WINDOW_MESSAGE_EVENT` — `extension-content` L1:C202 -> L1:C213  `…/youtubetotranscript.com"===e.origin||e.origin.startsWith("http://localhost:")){if(e.data&&"EXTENSION_REQUEST_TOKENS"===»e.data.type«)try{chrome.storage.local.get(["token","refreshToken","isLoggedIn","expiresAt"],function(t){chrome.runtime.lastError||wi…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `extension-content` L1:C331 -> L1:C494  `…pe)try{chrome.storage.local.get(["token","refreshToken","isLoggedIn","expiresAt"],function(t){chrome.runtime.lastError||»window.postMessage({type:"EXTENSION_TOKENS",token:t.token||null,refresh_token:t.refreshToken||null,isLoggedIn:!!t.isLoggedIn,expiresAt:t.expiresAt||null},e.origin)«})}catch(e){}if(e.data&&"EXTENSION_AUTH_SUCCESS"===e.data.type){var t=e.data,o=t.token,n=t.refresh_token;if(!o||!n)retur…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (30 raw steps → 1 distinct lines):
   1. L1 `…://localhost:")){if(»e.data&&"EXTENSION_REQUEST_TOKENS"===e.data.type)try{chrome.storage.local.get(["token","refreshToken","isLoggedIn","expi …⟨tainted span: 716 chars⟩… ime.sendMessage({action:"AUTH_COMPLETE",token:o,refresh_token:n,source:"email"},function(e){chrome.runtime.lastError})})«}catch(e){}}}}),wind…`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:unary, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: token, sender: extension-content, receiver: extension-content]

---

## Flow #5 — WINDOW_MESSAGE_EVENT (From storage.local.set('refreshToken') in extension-content)

- **Source**: `WINDOW_MESSAGE_EVENT` — `extension-content` L1:C202 -> L1:C213  `…/youtubetotranscript.com"===e.origin||e.origin.startsWith("http://localhost:")){if(e.data&&"EXTENSION_REQUEST_TOKENS"===»e.data.type«)try{chrome.storage.local.get(["token","refreshToken","isLoggedIn","expiresAt"],function(t){chrome.runtime.lastError||wi…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `extension-content` L1:C331 -> L1:C494  `…pe)try{chrome.storage.local.get(["token","refreshToken","isLoggedIn","expiresAt"],function(t){chrome.runtime.lastError||»window.postMessage({type:"EXTENSION_TOKENS",token:t.token||null,refresh_token:t.refreshToken||null,isLoggedIn:!!t.isLoggedIn,expiresAt:t.expiresAt||null},e.origin)«})}catch(e){}if(e.data&&"EXTENSION_AUTH_SUCCESS"===e.data.type){var t=e.data,o=t.token,n=t.refresh_token;if(!o||!n)retur…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (30 raw steps → 1 distinct lines):
   1. L1 `…://localhost:")){if(»e.data&&"EXTENSION_REQUEST_TOKENS"===e.data.type)try{chrome.storage.local.get(["token","refreshToken","isLoggedIn","expi …⟨tainted span: 716 chars⟩… ime.sendMessage({action:"AUTH_COMPLETE",token:o,refresh_token:n,source:"email"},function(e){chrome.runtime.lastError})})«}catch(e){}}}}),wind…`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:unary, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: refreshToken, sender: extension-content, receiver: extension-content]

---

## Flow #6 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L1:C38044 -> L1:C48918  `… 3:return[2]}})})}),»chrome.runtime.onMessage.addListener(function(e,t,i){var c;if("ytt-youtube-ready"===e.action)return i({success:!0}),s(vo …⟨tainted span: 10874 chars⟩… ,t({success:!1,error:n instanceof Error?n.message:"Theme toggle failed"}),[3,3];case 3:return[2]}})})}(e,i),!0):void 0})«}();`
- **Sink(s)**:
  - `FETCH_HEADERS` — `background` L1:C40966 -> L1:C41117  `…https://youtubetotranscript.com","google_oauth"!==e.source)return[3,9];a.label=2;case 2:return a.trys.push([2,7,,8]),[4,»fetch("".concat(s,"/api/auth/create-session-code"),{method:"POST",headers:{Authorization:"Bearer ".concat(e.token),"Content-Type":"application/json"}})«];case 3:return(o=a.sent()).ok?[4,o.json()]:[3,5];case 4:return i=a.sent(),u="".concat(n,"/extension/set-session?code=")…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (36 raw steps → 1 distinct lines):
   1. L1 `… 3:return[2]}})})}),»chrome.runtime.onMessage.addListener(function(e,t,i){var c;if("ytt-youtube-ready"===e.action)return i({success:!0}),s(vo …⟨tainted span: 10874 chars⟩… ,t({success:!1,error:n instanceof Error?n.message:"Theme toggle failed"}),[3,3];case 3:return[2]}})})}(e,i),!0):void 0})«}();`  · MESSAGE, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:unary, RETURN:string.concat, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[extension-content->background]`

---
