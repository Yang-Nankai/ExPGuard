# Source-level Taint Flow — ljojmlmdapmnibgflmmminacbjebjpno 6.0.20

- Source type: CRX
- Files with issues: 3 / 6
- Distinct taint flows: 11  (collapsed from 152 raw issue entries)
- Sinkless sources skipped: 19 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `extension` L1:C66735 -> L1:C66779  `…arent",e.textContent="R",e.style.fontSize="1.2em",e.style.fontWeight="bold",t.prepend(e)}}q=setInterval(async()=>{const »e=new URL(location.href).pathname.split("/")«,t=e[e.length-1];if(V=!document.querySelector('[jsname="eHOY6b"]'),V)try{const e=await(chrome.storage?.local?.get("mesAu…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (transcript) — `extension` L1:C69449 -> L1:C69558  `…ranscript:"",participants:new Set,rawNames:new Map});try{for(const[e,t]of d)l=l.replaceAll(`[${e}]`,`[${t}]`)}catch(e){}»chrome.storage.local.set({transcript:{meeting:o,talk:l,count:s.size,title:r,langId:a,finish:!1,startedAt:c}})«})})();`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (312 raw steps → 1 distinct lines):
   1. L1 `…x,S,I,A,B,C,E,j,q,M,»T=[],L=!1,P={interval:void 0,isPresenting:!1,curPresenter:"",enabledFullScreen:!1},V=!1;const U="https://app.meetenhance …⟨tainted span: 69486 chars⟩… }catch(e){}chrome.storage.local.set({transcript:{meeting:o,talk:l,count:s.size,title:r,langId:a,finish:!1,startedAt:c}})«})})();`  · ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:implicit.add, RETURN:array.join, RETURN:encodeURI

---

## Flow #2 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `extension` L1:C47458 -> L1:C47472  `…roundImage","hideMeetingName"],e=>function(e){const t=setInterval(()=>{if("interactive"===document.readyState&&"Meet"!==»document.title«&&"Google Meet"!==document.title&&(void 0===w&&void 0===I&&void 0===A&&void 0===x&&Le(),e.darkMode&&De(e.darkMode)),"com…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (transcript) — `extension` L1:C69449 -> L1:C69558  `…ranscript:"",participants:new Set,rawNames:new Map});try{for(const[e,t]of d)l=l.replaceAll(`[${e}]`,`[${t}]`)}catch(e){}»chrome.storage.local.set({transcript:{meeting:o,talk:l,count:s.size,title:r,langId:a,finish:!1,startedAt:c}})«})})();`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (50 raw steps → 1 distinct lines):
   1. L1 `…setInterval(()=>{if(»"interactive"===document.readyState&&"Meet"!==document.title&&"Google Meet"!==document.title&&(void 0===w&&void 0===I&&v …⟨tainted span: 22146 chars⟩… }catch(e){}chrome.storage.local.set({transcript:{meeting:o,talk:l,count:s.size,title:r,langId:a,finish:!1,startedAt:c}})«})})();`  · ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_TEXT_CONTENT ([jsname="NeC6gb"])

- **Source**: `ELEMENT_TEXT_CONTENT` — `extension` L1:C68719 -> L1:C68898  `…{const t=window.crypto?.randomUUID()??`${Date.now()}`,n=new URL(location.href).pathname.split("/"),o=n[n.length-1]??t,r=»document.querySelector('[jsname="NeC6gb"]')?.textContent||document.title.replace("Google Meet: ","").replace("Meet: ","").replace("Google Meet - ","").replace("Meet - ","").trim()«||o,{langId:a,transcriptions:i,startedAt:c}=e.detail;let{transcript:l,participants:s,rawNames:d}=i.reduce((e,t,n,o)=>{if…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (transcript) — `extension` L1:C69449 -> L1:C69558  `…ranscript:"",participants:new Set,rawNames:new Map});try{for(const[e,t]of d)l=l.replaceAll(`[${e}]`,`[${t}]`)}catch(e){}»chrome.storage.local.set({transcript:{meeting:o,talk:l,count:s.size,title:r,langId:a,finish:!1,startedAt:c}})«})})();`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (11 raw steps → 1 distinct lines):
   1. L1 `…=n[n.length-1]??t,r=»document.querySelector('[jsname="NeC6gb"]')?.textContent||document.title.replace("Google Meet: ","").replace("Meet: ","" …⟨tainted span: 839 chars⟩… }catch(e){}chrome.storage.local.set({transcript:{meeting:o,talk:l,count:s.size,title:r,langId:a,finish:!1,startedAt:c}})«})})();`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #4 — DOCUMENT_LOCATION (From storage.local.set('transcript') in extension)  ·  48× duplicate paths collapsed

- **Source**: `DOCUMENT_LOCATION` — `service_worker` L1:C1701 -> L1:C2494  `….setUninstallURL(o),»chrome.runtime.onMessage.addListener(async(e,t,o)=>{if("popupOpen"===e)chrome.action.setBadgeText({text:""}),o(!0);else  …⟨tainted span: 793 chars⟩… token,a.platinum=e.platinum;else if("object"==typeof e&&"ga"===e.type&&e.data){const{topic:t,key:o,value:n}=e.data;""}})«})();`
- **Sink(s)**:
  - `FETCH_HEADERS` (profile?app=true) — `service_worker` L1:C1056 -> L1:C1265  `…erColor="#64ffda";const a={token:"",platinum:!1,googleAuthToken:"",email:""};function s(e,t,o,n){return new Promise(s=>{»fetch(e.startsWith("http")?e:`https://app.meetenhancementsuite.com/api/${e}`,{method:t,headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${a.token}`}:{}},...n?{body:JSON.stringify(n)}:{}})«.then(e=>(e.ok||s({response:null,error:e.statusText}),e.json())).then(e=>{s({response:e,error:null})}).catch(e=>{s({resp…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (6194 raw steps → 1 distinct lines):
   1. L1 `…lor="#64ffda";const »a={token:"",platinum:!1,googleAuthToken:"",email:""};function s(e,t,o,n){return new Promise(s=>{fetch(e.startsWith("http …⟨tainted span: 1534 chars⟩… token,a.platinum=e.platinum;else if("object"==typeof e&&"ga"===e.type&&e.data){const{topic:t,key:o,value:n}=e.data;""}})«})();`  · MESSAGE, ASSIGN:binary-right, ELEMENT:member-element, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:member-element-container, ASSIGN:template-literal, COPY:object-spread, ELEMENT:destructure-property[topic], ELEMENT:destructure-property[key], ELEMENT:destructure-property[value]
      ⇄ cross-context hop: `runtime.single.sender.message[extension->service_worker]`

---

## Flow #5 — ELEMENT_TEXT_CONTENT (From storage.local.set('transcript') in extension)  ·  48× duplicate paths collapsed

- **Source**: `ELEMENT_TEXT_CONTENT` — `service_worker` L1:C1701 -> L1:C2494  `….setUninstallURL(o),»chrome.runtime.onMessage.addListener(async(e,t,o)=>{if("popupOpen"===e)chrome.action.setBadgeText({text:""}),o(!0);else  …⟨tainted span: 793 chars⟩… token,a.platinum=e.platinum;else if("object"==typeof e&&"ga"===e.type&&e.data){const{topic:t,key:o,value:n}=e.data;""}})«})();`
- **Sink(s)**:
  - `FETCH_HEADERS` (profile?app=true) — `service_worker` L1:C1056 -> L1:C1265  `…erColor="#64ffda";const a={token:"",platinum:!1,googleAuthToken:"",email:""};function s(e,t,o,n){return new Promise(s=>{»fetch(e.startsWith("http")?e:`https://app.meetenhancementsuite.com/api/${e}`,{method:t,headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${a.token}`}:{}},...n?{body:JSON.stringify(n)}:{}})«.then(e=>(e.ok||s({response:null,error:e.statusText}),e.json())).then(e=>{s({response:e,error:null})}).catch(e=>{s({resp…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (6151 raw steps → 1 distinct lines):
   1. L1 `…lor="#64ffda";const »a={token:"",platinum:!1,googleAuthToken:"",email:""};function s(e,t,o,n){return new Promise(s=>{fetch(e.startsWith("http …⟨tainted span: 1534 chars⟩… token,a.platinum=e.platinum;else if("object"==typeof e&&"ga"===e.type&&e.data){const{topic:t,key:o,value:n}=e.data;""}})«})();`  · MESSAGE, ASSIGN:binary-right, ELEMENT:member-element, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:member-element-container, ASSIGN:template-literal, COPY:object-spread, ELEMENT:destructure-property[topic], ELEMENT:destructure-property[key], ELEMENT:destructure-property[value]
      ⇄ cross-context hop: `runtime.single.sender.message[extension->service_worker]`

---

## Flow #6 — DOCUMENT_TITLE (From storage.local.set('transcript') in extension)  ·  48× duplicate paths collapsed

- **Source**: `DOCUMENT_TITLE` — `service_worker` L1:C1701 -> L1:C2494  `….setUninstallURL(o),»chrome.runtime.onMessage.addListener(async(e,t,o)=>{if("popupOpen"===e)chrome.action.setBadgeText({text:""}),o(!0);else  …⟨tainted span: 793 chars⟩… token,a.platinum=e.platinum;else if("object"==typeof e&&"ga"===e.type&&e.data){const{topic:t,key:o,value:n}=e.data;""}})«})();`
- **Sink(s)**:
  - `FETCH_HEADERS` (profile?app=true) — `service_worker` L1:C1056 -> L1:C1265  `…erColor="#64ffda";const a={token:"",platinum:!1,googleAuthToken:"",email:""};function s(e,t,o,n){return new Promise(s=>{»fetch(e.startsWith("http")?e:`https://app.meetenhancementsuite.com/api/${e}`,{method:t,headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${a.token}`}:{}},...n?{body:JSON.stringify(n)}:{}})«.then(e=>(e.ok||s({response:null,error:e.statusText}),e.json())).then(e=>{s({response:e,error:null})}).catch(e=>{s({resp…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (6108 raw steps → 1 distinct lines):
   1. L1 `…lor="#64ffda";const »a={token:"",platinum:!1,googleAuthToken:"",email:""};function s(e,t,o,n){return new Promise(s=>{fetch(e.startsWith("http …⟨tainted span: 1534 chars⟩… token,a.platinum=e.platinum;else if("object"==typeof e&&"ga"===e.type&&e.data){const{topic:t,key:o,value:n}=e.data;""}})«})();`  · MESSAGE, ASSIGN:binary-right, ELEMENT:member-element, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:member-element-container, ASSIGN:template-literal, COPY:object-spread, ELEMENT:destructure-property[topic], ELEMENT:destructure-property[key], ELEMENT:destructure-property[value]
      ⇄ cross-context hop: `runtime.single.sender.message[extension->service_worker]`

---

## Flow #7 — ELEMENT_INNER_HTML (html)

- **Source**: `ELEMENT_INNER_HTML` — `popup` L1:C284 -> L1:C304  `…ndMessage("popupOpen",e=>e),function(){for(var e=document.getElementsByTagName("html"),t=0;t<e.length;t++){var n=e[t],o=»n.innerHTML.toString«(),r=o.replace(/__MSG_(\w+)__/g,function(e,t){return t?chrome.i18n.getMessage(t):""});r!==o&&(n.innerHTML=r)}}(),functio…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `popup` L1:C400 -> L1:C409  `…],o=n.innerHTML.toString(),r=o.replace(/__MSG_(\w+)__/g,function(e,t){return t?chrome.i18n.getMessage(t):""});r!==o&&(n.»innerHTML«=r)}}(),function(){const e=chrome.runtime.getManifest().version,t=`https://www.meetenhancementsuite.com/meetpro/?version…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (39 raw steps → 1 distinct lines):
   1. L1 `…:n}})}function t(t){e("event",t.target.id,t.target.checked)}chrome.runtime.sendMessage("popupOpen",e=>e),function(){for(»var e=document.getElementsByTagName("html"),t=0;t<e.length;t++){var n=e[t],o=n.innerHTML.toString(),r=o.replace(/__MSG_(\w+)__/g,function(e,t){return t?chrome.i18n.getMessage(t):""});r!==o&&(n.innerHTML=r«)}}(),function(){const e=chrome.runtime.getManifest().version,t=`https://www.meetenhancementsuite.com/meetpro/?version=$…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:object.setProperty

---

## Flow #8 — ELEMENT_VALUE (licenseKey)

- **Source**: `ELEMENT_VALUE` — `popup` L1:C7829 -> L1:C7830  `…tivationForm").addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("licenseKey").value;if(!»t«)return void y("error");const n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},bod…`
- **Sink(s)**:
  - `FETCH_BODY` (https://meetenhancementsuite.com/token-check) — `popup` L1:C8020 -> L1:C8075  `…ation/json","Content-Type":"application/json"},body:JSON.stringify({license_key:t.trim(),increment_uses_count:"true"})};»fetch("https://meetenhancementsuite.com/token-check",n)«.then(e=>e.json()).then(e=>{e.success&&e.isPro?e.licenseKey?m(e.licenseKey):m():y("error")}).catch(()=>{y("error")})}),d…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (9 raw steps → 1 distinct lines):
   1. L1 `…ctivationForm").addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("licenseKey").value;if(»!t)return void y("error");const n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({license_key:t.trim(),increment_uses_count:"true"})}«;fetch("https://meetenhancementsuite.com/token-check",n).then(e=>e.json()).then(e=>{e.success&&e.isPro?e.licenseKey?m(e.…`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty, RETURN:json.stringify

---

## Flow #9 — ELEMENT_VALUE (adjustVolume)

- **Source**: `ELEMENT_VALUE` — `popup` L5:C285 -> L5:C332  `… in h)f[h[v]]=v;for(var E in k)h[E]=k[E];let b=document.getElementById("adjustVolume");b.addEventListener("change",()=>{»chrome.storage.sync.set({adjustVolume:b.value})«}),b.addEventListener("keydown",e=>{e.preventDefault()});let B=document.querySelector("#backgroundColorPicker");B.addEve…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (adjustVolume) — `popup` L5:C285 -> L5:C332  `… in h)f[h[v]]=v;for(var E in k)h[E]=k[E];let b=document.getElementById("adjustVolume");b.addEventListener("change",()=>{»chrome.storage.sync.set({adjustVolume:b.value})«}),b.addEventListener("keydown",e=>{e.preventDefault()});let B=document.querySelector("#backgroundColorPicker");B.addEve…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L5 `… in h)f[h[v]]=v;for(var E in k)h[E]=k[E];let b=document.getElementById("adjustVolume");b.addEventListener("change",()=>{»chrome.storage.sync.set({adjustVolume:b.value})«}),b.addEventListener("keydown",e=>{e.preventDefault()});let B=document.querySelector("#backgroundColorPicker");B.addEve…`  · ELEMENT:object.setProperty

---

## Flow #10 — ELEMENT_VALUE (#backgroundColorPicker)

- **Source**: `ELEMENT_VALUE` — `popup` L5:C483 -> L5:C533  `…,e=>{e.preventDefault()});let B=document.querySelector("#backgroundColorPicker");B.addEventListener("change",function(){»chrome.storage.sync.set({backgroundColor:B.value})«});let C=document.querySelector("#borderColor"),I="#64ffda";chrome.storage.sync.get("borderColor",e=>{setTimeout(()=>{0=…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (backgroundColor) — `popup` L5:C483 -> L5:C533  `…,e=>{e.preventDefault()});let B=document.querySelector("#backgroundColorPicker");B.addEventListener("change",function(){»chrome.storage.sync.set({backgroundColor:B.value})«});let C=document.querySelector("#borderColor"),I="#64ffda";chrome.storage.sync.get("borderColor",e=>{setTimeout(()=>{0=…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L5 `…,e=>{e.preventDefault()});let B=document.querySelector("#backgroundColorPicker");B.addEventListener("change",function(){»chrome.storage.sync.set({backgroundColor:B.value})«});let C=document.querySelector("#borderColor"),I="#64ffda";chrome.storage.sync.get("borderColor",e=>{setTimeout(()=>{0=…`  · ELEMENT:object.setProperty

---

## Flow #11 — ELEMENT_VALUE (#borderColor)

- **Source**: `ELEMENT_VALUE` — `popup` L5:C769 -> L5:C815  `…>{0==e.borderColor&&(chrome.storage.sync.set({borderColor:I}),C.value=I)},500)}),C.addEventListener("change",function(){»chrome.storage.sync.set({borderColor:C.value})«});const L=document.getElementById("autoRecord"),K=document.getElementById("autoTranscribe"),w=document.getElementById("…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (borderColor) — `popup` L5:C769 -> L5:C815  `…>{0==e.borderColor&&(chrome.storage.sync.set({borderColor:I}),C.value=I)},500)}),C.addEventListener("change",function(){»chrome.storage.sync.set({borderColor:C.value})«});const L=document.getElementById("autoRecord"),K=document.getElementById("autoTranscribe"),w=document.getElementById("…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L5 `…>{0==e.borderColor&&(chrome.storage.sync.set({borderColor:I}),C.value=I)},500)}),C.addEventListener("change",function(){»chrome.storage.sync.set({borderColor:C.value})«});const L=document.getElementById("autoRecord"),K=document.getElementById("autoTranscribe"),w=document.getElementById("…`  · ELEMENT:object.setProperty

---
