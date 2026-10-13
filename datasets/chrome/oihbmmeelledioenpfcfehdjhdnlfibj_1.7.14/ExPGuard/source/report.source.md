# Source-level Taint Flow — oihbmmeelledioenpfcfehdjhdnlfibj 1.7.14

- Source type: CRX
- Files with issues: 5 / 5
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `load_embeds` L1:C465 -> L1:C624  `…ion-embeds-final.vercel.app",ENV:"production"};window.addEventListener("message",(e=>{e.origin===window.location.origin?»chrome.runtime.sendMessage(e.data,(e=>{chrome.runtime.lastError?console.error(chrome.runtime.lastError.message):window.postMessage(e,window.location.origin)}))«:console.warn("Blocked message from unauthorized origin:",e.origin)})),chrome.runtime.onMessage.addListener(((e,t,o)=>{w…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `load_embeds` L1:C577 -> L1:C621  `….origin?chrome.runtime.sendMessage(e.data,(e=>{chrome.runtime.lastError?console.error(chrome.runtime.lastError.message):»window.postMessage(e,window.location.origin)«})):console.warn("Blocked message from unauthorized origin:",e.origin)})),chrome.runtime.onMessage.addListener(((e,t,o)=…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (19 raw steps → 1 distinct lines):
   1. L1 `…dow.location.origin?»chrome.runtime.sendMessage(e.data,(e=>{chrome.runtime.lastError?console.error(chrome.runtime.lastError.message):window.p …⟨tainted span: 325 chars⟩… ed origin:",e.origin)})),chrome.runtime.onMessage.addListener(((e,t,o)=>{window.postMessage(e,window.location.origin)}))«,window.postMessage(…`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[service_worker->load_embeds]; runtime.single.sender.message[service_worker->load_embeds]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.local.set('dashboardUserEmail') in service_worker)

- **Source**: `WINDOW_MESSAGE_EVENT` — `load_embeds` L1:C465 -> L1:C624  `…ion-embeds-final.vercel.app",ENV:"production"};window.addEventListener("message",(e=>{e.origin===window.location.origin?»chrome.runtime.sendMessage(e.data,(e=>{chrome.runtime.lastError?console.error(chrome.runtime.lastError.message):window.postMessage(e,window.location.origin)}))«:console.warn("Blocked message from unauthorized origin:",e.origin)})),chrome.runtime.onMessage.addListener(((e,t,o)=>{w…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `load_embeds` L1:C577 -> L1:C621  `….origin?chrome.runtime.sendMessage(e.data,(e=>{chrome.runtime.lastError?console.error(chrome.runtime.lastError.message):»window.postMessage(e,window.location.origin)«})):console.warn("Blocked message from unauthorized origin:",e.origin)})),chrome.runtime.onMessage.addListener(((e,t,o)=…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L1 `…ion-embeds-final.vercel.app",ENV:"production"};window.addEventListener("message",(e=>{e.origin===window.location.origin?»chrome.runtime.sendMessage(e.data,(e=>{chrome.runtime.lastError?console.error(chrome.runtime.lastError.message):window.postMessage(e,window.location.origin)}))«:console.warn("Blocked message from unauthorized origin:",e.origin)})),chrome.runtime.onMessage.addListener(((e,t,o)=>{w…`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[service_worker->load_embeds]`

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `service_worker` L1:C883 -> L1:C4999  `… pendingMessages=[];»chrome.runtime.onMessage.addListener(((e,a,s)=>(e.source,e.type?.startsWith("call-extension-")?((async()=>{const a=e.typ …⟨tainted span: 4116 chars⟩… ication/json"}}).then((e=>e.json()));s({type:`${e.type}-response`,requestPayload:e.payload,payload:a})})(),!0):void 0)))«;const broadCastMess…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `service_worker` L1:C1363 -> L1:C1396  `…nse`,requestPayload:e.payload,payload:t})}else if("/chrome-storage-local-set"===a){const{key:a,value:t}=e.payload;await »chrome.storage.local.set({[a]:t})«,s({type:`${e.type}-response`,requestPayload:e.payload,payload:{message:`key - "${a}" set successfully`}})}else if("/tra…`
  - `FETCH_BODY` (https://us.i.posthog.com/capture) — `service_worker` L1:C558 -> L1:C741  `…hrome.sidePanel.setPanelBehavior({openPanelOnActionClick:!0})}));const trackPosthogEvent=async(e,a)=>{try{const s=await »fetch("https://us.i.posthog.com/capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:e,properties:a,api_key:environmentVars.POSTHOG_TOKEN})})«;if(!s.ok)throw new Error(`HTTP error! status: ${s.status}`);return await s.json()}catch(e){throw console.error(e),e}};l…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L1:C3114 -> L1:C3323  `…:{innerText:t.innerText,innerHTML:t.innerHTML}})}else if("/token"===a){const{apiKey:a,refreshToken:t}=e.payload,o=await »fetch(`https://securetoken.googleapis.com/v1/token?key=${a}`,{method:"POST",body:`grant_type=refresh_token&refresh_token=${encodeURIComponent(t)}`,headers:{"Content-Type":"application/x-www-form-urlencoded"}})«.then((e=>e.json()));s({type:`${e.type}-response`,requestPayload:e.payload,payload:o})}else if("/update-dashboardUserEma…`  (url-control=PARTIAL)
  - `FETCH_BODY` ([Unknown URL]) — `service_worker` L1:C3114 -> L1:C3323  `…:{innerText:t.innerText,innerHTML:t.innerHTML}})}else if("/token"===a){const{apiKey:a,refreshToken:t}=e.payload,o=await »fetch(`https://securetoken.googleapis.com/v1/token?key=${a}`,{method:"POST",body:`grant_type=refresh_token&refresh_token=${encodeURIComponent(t)}`,headers:{"Content-Type":"application/x-www-form-urlencoded"}})«.then((e=>e.json()));s({type:`${e.type}-response`,requestPayload:e.payload,payload:o})}else if("/update-dashboardUserEma…`
  - `CHROME_LOCAL_STORAGE` (dashboardUserEmail) — `service_worker` L1:C3483 -> L1:C3531  `…response`,requestPayload:e.payload,payload:o})}else if("/update-dashboardUserEmail"===a){const{email:a}=e.payload;await »chrome.storage.local.set({dashboardUserEmail:a})«,s({type:`${e.type}-response`,requestPayload:e.payload,payload:{message:`saved email - ${a}`}})}else if("/dashboardUserE…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L1:C4398 -> L1:C4572  `…estPayload:e.payload,payload:{sidePanelOpen}})})(),!0):e.type?.startsWith("call-assistants-")?((async()=>{const a=await »fetch(`${environmentVars.ASSISTANTS_SERVER_URL}${e.type.slice(16)}`,{method:e.method,body:JSON.stringify(e.payload),headers:{"Content-Type":"application/json",...e.headers}})«,t=await a.json();s({type:`${e.type}-response`,requestPayload:e.payload,payload:t,status:a.status})})(),!0):e.type?.star…`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `service_worker` L1:C4398 -> L1:C4572  `…estPayload:e.payload,payload:{sidePanelOpen}})})(),!0):e.type?.startsWith("call-assistants-")?((async()=>{const a=await »fetch(`${environmentVars.ASSISTANTS_SERVER_URL}${e.type.slice(16)}`,{method:e.method,body:JSON.stringify(e.payload),headers:{"Content-Type":"application/json",...e.headers}})«,t=await a.json();s({type:`${e.type}-response`,requestPayload:e.payload,payload:t,status:a.status})})(),!0):e.type?.star…`
  - `FETCH_BODY` ([Unknown URL]) — `service_worker` L1:C4398 -> L1:C4572  `…estPayload:e.payload,payload:{sidePanelOpen}})})(),!0):e.type?.startsWith("call-assistants-")?((async()=>{const a=await »fetch(`${environmentVars.ASSISTANTS_SERVER_URL}${e.type.slice(16)}`,{method:e.method,body:JSON.stringify(e.payload),headers:{"Content-Type":"application/json",...e.headers}})«,t=await a.json();s({type:`${e.type}-response`,requestPayload:e.payload,payload:t,status:a.status})})(),!0):e.type?.star…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L1:C4741 -> L1:C4895  `…questPayload:e.payload,payload:t,status:a.status})})(),!0):e.type?.startsWith("call-strapi-")?((async()=>{const a=await »fetch(`${environmentVars.STRAPI_URL}/api${e.type.slice(12)}`,{method:e.method,body:JSON.stringify(e.payload),headers:{"Content-Type":"application/json"}})«.then((e=>e.json()));s({type:`${e.type}-response`,requestPayload:e.payload,payload:a})})(),!0):void 0)));const broadCast…`  (url-control=PARTIAL)
  - `FETCH_BODY` ([Unknown URL]) — `service_worker` L1:C4741 -> L1:C4895  `…questPayload:e.payload,payload:t,status:a.status})})(),!0):e.type?.startsWith("call-strapi-")?((async()=>{const a=await »fetch(`${environmentVars.STRAPI_URL}/api${e.type.slice(12)}`,{method:e.method,body:JSON.stringify(e.payload),headers:{"Content-Type":"application/json"}})«.then((e=>e.json()));s({type:`${e.type}-response`,requestPayload:e.payload,payload:a})})(),!0):void 0)));const broadCast…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (311 raw steps → 1 distinct lines):
   1. L1 `…nc(e,a)=>{try{const »s=await fetch("https://us.i.posthog.com/capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.st …⟨tainted span: 4796 chars⟩… }=e,t=pendingMessages.filter((e=>e.type===a));return pendingMessages=pendingMessages.filter((e=>e.type!==a)),s(t),!0}}))«;let sidePanelOpen=!…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:template-literal, ELEMENT:object.setProperty, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ELEMENT:destructure-property[event], ELEMENT:destructure-property[properties], RETURN:json.stringify, ELEMENT:destructure-property[purpose], ELEMENT:destructure-property[firebaseUser], COPY:object-spread, ELEMENT:destructure-property[tabId], ELEMENT:destructure-property[apiKey], ELEMENT:destructure-property[refreshToken], RETURN:encodeURIComponent, ELEMENT:destructure-property[email], ELEMENT:destructure-property[action], ELEMENT:implicit.add, ELEMENT:destructure-property[mainMessageType]
      ⇄ cross-context hop: `runtime.single.sender.message[load_embeds->service_worker]`

---
