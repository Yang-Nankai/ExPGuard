# Source-level Taint Flow — cphmbaonehalpppcapioaohgmkhoklgp 1.2.47

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 9  (collapsed from 131 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C75323 -> L1:C75348  `…;const fn=document.getElementById.bind(document);let gn,un,ln,mn,hn,xn;window.addEventListener("message",function(n){if(»n.source===window&&n.data«){if("WASAI_CALL_API"===n.data.type){const{requestId:t,payload:o}=n.data;chrome.runtime.sendMessage({action:"WASAI_FETCH…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C75496 -> L1:C75628  `…ta.type){const{requestId:t,payload:o}=n.data;chrome.runtime.sendMessage({action:"WASAI_FETCH_AI",payload:o},function(n){»window.postMessage({type:"WASAI_API_RESPONSE",requestId:t,result:n?n.result:null,error:n?n.error:"No response from background"},"*")«})}if("WASAI_TEMPLATE_MSG"===n.data.type){const{requestId:t,action:o,key:e,value:i}=n.data;chrome.runtime.sendMessage({a…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C75783 -> L1:C75866  `….type){const{requestId:t,action:o,key:e,value:i}=n.data;chrome.runtime.sendMessage({action:o,key:e,value:i},function(n){»window.postMessage({type:"WASAI_TEMPLATE_RESPONSE",requestId:t,response:n||{}},"*")«})}}});let Bn=null,Cn=null;window.on("message",function(n){"FROM_LIB"===n.data.type&&"buttonClicked"===n.data.action&&o(…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (68 raw steps → 1 distinct lines):
   1. L1 `…,p.appendChild(l()),»chrome.runtime.sendMessage({memory:w},n=>{p.removeChild(p.lastChild),u(n||"No response from background script.")}))}func …⟨tainted span: 50714 chars⟩… ction:o,key:e,value:i},function(n){window.postMessage({type:"WASAI_TEMPLATE_RESPONSE",requestId:t,response:n||{}},"*")})«}}});let Bn=null,Cn=…`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:destructure-property[requestId], ELEMENT:destructure-property[payload], ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:destructure-property[action], ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], MESSAGE, ASSIGN:conditional-consequent
      ⇄ cross-context hop: `runtime.single.response.message[background->content]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C76296 -> L1:C76321  `…n.data.action&&w()});let bn=-1,En="unlimited",Sn=!1,In=!1,vn=!1,yn=!1,On=!1,kn;window.addEventListener("message",n=>{if(»n.source===window&&n.data«){if("getCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMessage({action:"storageRespo…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (cachedText) — `content` L1:C76515 -> L1:C76572  `…",n=>{window.postMessage({action:"storageResponse",text:n.cachedText||""},"*")}),"saveToChromeStorage"===n.data.action&&»chrome.storage.local.set({cachedText:n.data.text},()=>{})«,"checkCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{const t=!!n.cachedText;window.postMessage(…`
  - `CHROME_LOCAL_STORAGE` (storedText) — `content` L1:C77404 -> L1:C77454  `…xt",n=>{window.postMessage({action:"storedTextResponse",text:n.storedText||""},"*")}),"saveStoredText"===n.data.action&&»chrome.storage.local.set({storedText:n.data.text})«,"getTemplateCount"===n.data.action&&chrome.storage.local.get(null,n=>{const t=Object.keys(n).filter(n=>n.startsWith("te…`
  - `CHROME_LOCAL_STORAGE` (unknown) — `content` L1:C77719 -> L1:C77759  `…postMessage({action:"templateCountResponse",count:t},"*")}),"saveTemplate"===n.data.action){const{key:t,value:o}=n.data;»chrome.storage.local.set({[t]:o},()=>{})«}"getTemplates"===n.data.action&&chrome.storage.local.get(null,n=>{const t=Object.keys(n).filter(n=>n.startsWith("templa…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (92 raw steps → 1 distinct lines):
   1. L1 `…er("message",n=>{if(»n.source===window&&n.data){if("getCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMess …⟨tainted span: 1877 chars⟩… emplateContent",value:t[n.data.key]||""},"*")}),"deleteTemplate"===n.data.action&&chrome.storage.local.remove(n.data.key«,()=>{})}}),window.o…`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ASSIGN:identifier

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))  ·  56× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C9 -> L1:C121  `function »n(n,t){return n.split("").map(n=>{let o=n.charCodeAt(0)+t;return o>126&&(o-=95),String.fromCharCode(o)}).join(""«)}async function t(){async function n(){let n;const t=U("#application-json-data-sjs-1");if(t&&t.shadowRoot){const o=t.sh…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C10499 -> L1:C10556  `…onst t=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(t.error)return;if(t.data){const o=t.data;»window.postMessage({type:"BOOTSTRAP_SESSION",data:o},"*")«;const e=U("span.WAS_MC"),i=U("span.WAS_RC"),A=U("span.WAS_CC"),c=U("span.WAS_WF"),s=U("span.gs-numo");e&&(e.wt=o.messag…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C11076 -> L1:C11136  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_90",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function l(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C11322 -> L1:C11382  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_91",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function m(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C11568 -> L1:C11628  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_92",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function h(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C11814 -> L1:C11874  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_93",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function x(){if(!In){In=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C12060 -> L1:C12120  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_94",data:t},"*")«}}catch(n){}finally{In=!1}}}async function B(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C12306 -> L1:C12366  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_95",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function C(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C12552 -> L1:C12612  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_96",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function b(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C12798 -> L1:C12859  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_962",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function E(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C13045 -> L1:C13106  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_738",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function S(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C13292 -> L1:C13353  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_739",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function I(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C13539 -> L1:C13600  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_740",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function v(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C13786 -> L1:C13847  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_741",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function y(){if(!Sn){Sn=!0;try{const n=await chrome.runtime.sendMessage({action:"fetch…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C14033 -> L1:C14096  `…onst n=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(n.error)return;if(n.data){const t=n.data;»window.postMessage({type:"BOOTSTRAP_SESSION_741wf",data:t},"*")«}}catch(n){}finally{Sn=!1}}}async function O(){function n(n){if(!n)return"N/A";const t=void 0;return new Date(n).toLocal…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C14420 -> L1:C14481  `…onst t=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(t.error)return;if(t.data){const o=t.data;»window.postMessage({type:"BOOTSTRAP_SESSION_735",data:o},"*")«;const e=U("span.WAS_MC"),i=U("span.WAS_RC"),A=U("span.WAS_CC"),c=U("span.WAS_WF"),s=U("span.gs-numo");e&&(e.wt=o.messag…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C15125 -> L1:C15186  `…onst t=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(t.error)return;if(t.data){const o=t.data;»window.postMessage({type:"BOOTSTRAP_SESSION_WFD",data:o},"*")«;const e=U("span.WAS_MC"),i=U("span.WAS_RC"),A=U("span.WAS_CC"),c=U("span.WAS_WF");e&&(o.messages==bn?e.wt=En:e.wt=`${o.…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C15764 -> L1:C15825  `…onst t=await chrome.runtime.sendMessage({action:"fetchSubscriptionStatus"});if(t.error)return;if(t.data){const o=t.data;»window.postMessage({type:"BOOTSTRAP_SESSION_GSD",data:o},"*")«;const e=U("span.WAS_MC"),i=U("span.WAS_RC"),A=U("span.WAS_CC"),c=U("span.WAS_WF");e&&(o.messages==bn?e.wt=En:e.wt=`${o.…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (42 raw steps → 1 distinct lines):
   1. L1 `function »n(n,t){return n.split("").map(n=>{let o=n.charCodeAt(0)+t;return o>126&&(o-=95),String.fromCharCode(o)}).join("")}async  …⟨tainted span: 3983 chars⟩… tent>div.hello"),o=n.shadowRoot.querySelector("span.WAS_SS");o&&(o.wt="Log In"),t&&t.washeet.add("hidden")}return}t.data«&&await n()}catch(n)…`  · MESSAGE, ELEMENT:destructure-property[provider], ELEMENT:destructure-property[apiKey], ELEMENT:destructure-property[systemPrompt], ELEMENT:destructure-property[history], ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty, ELEMENT:array-spread, ELEMENT:implicit.add, RETURN:json.stringify, ELEMENT:member-element
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]; runtime.single.response.message[background->content]`

---

## Flow #4 — WINDOW_MESSAGE_EVENT (From storage.local.set('cachedText') in content)  ·  26× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C76296 -> L1:C76321  `…n.data.action&&w()});let bn=-1,En="unlimited",Sn=!1,In=!1,vn=!1,yn=!1,On=!1,kn;window.addEventListener("message",n=>{if(»n.source===window&&n.data«){if("getCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMessage({action:"storageRespo…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C76401 -> L1:C76473  `…essage",n=>{if(n.source===window&&n.data){if("getCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{»window.postMessage({action:"storageResponse",text:n.cachedText||""},"*")«}),"saveToChromeStorage"===n.data.action&&chrome.storage.local.set({cachedText:n.data.text},()=>{}),"checkCachedText"===…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C76673 -> L1:C76738  `….data.text},()=>{}),"checkCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{const t=!!n.cachedText;»window.postMessage({action:"buttonStateResponse",isStored:t},"*")«}),"getCachedTextForInput"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMessage({action:"inputF…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C76824 -> L1:C76899  `…tonStateResponse",isStored:t},"*")}),"getCachedTextForInput"===n.data.action&&chrome.storage.local.get("cachedText",n=>{»window.postMessage({action:"inputFieldResponse",text:n.cachedText||""},"*")«}),"getCachedTextForButton"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMessage({action:"butto…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C76986 -> L1:C77062  `…onse",text:n.cachedText||""},"*")}),"getCachedTextForButton"===n.data.action&&chrome.storage.local.get("cachedText",n=>{»window.postMessage({action:"buttonStateResponse",text:n.cachedText||""},"*")«}),"getCachedTextForCVD"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMessage({action:"cvdRespo…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C77146 -> L1:C77214  `…esponse",text:n.cachedText||""},"*")}),"getCachedTextForCVD"===n.data.action&&chrome.storage.local.get("cachedText",n=>{»window.postMessage({action:"cvdResponse",text:n.cachedText||""},"*")«}),"getStoredText"===n.data.action&&chrome.storage.local.get("storedText",n=>{window.postMessage({action:"storedTextResp…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C78020 -> L1:C78098  `…sage({action:"sendTemplates",templates:t},"*")}),"getTemplate"===n.data.action&&chrome.storage.local.get(n.data.key,t=>{»window.postMessage({action:"sendTemplateContent",value:t[n.data.key]||""},"*")«}),"deleteTemplate"===n.data.action&&chrome.storage.local.remove(n.data.key,()=>{})}}),window.on("message",function(n){"…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (97 raw steps → 1 distinct lines):
   1. L1 `…er("message",n=>{if(»n.source===window&&n.data){if("getCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMess …⟨tainted span: 1877 chars⟩… emplateContent",value:t[n.data.key]||""},"*")}),"deleteTemplate"===n.data.action&&chrome.storage.local.remove(n.data.key«,()=>{})}}),window.o…`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ASSIGN:identifier, STORAGE:STORAGE_FLOW[area: local, key: cachedText, sender: content, receiver: content]

---

## Flow #5 — WINDOW_MESSAGE_EVENT (From storage.local.set('storedText') in content)  ·  14× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C76296 -> L1:C76321  `…n.data.action&&w()});let bn=-1,En="unlimited",Sn=!1,In=!1,vn=!1,yn=!1,On=!1,kn;window.addEventListener("message",n=>{if(»n.source===window&&n.data«){if("getCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMessage({action:"storageRespo…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C77292 -> L1:C77367  `…:"cvdResponse",text:n.cachedText||""},"*")}),"getStoredText"===n.data.action&&chrome.storage.local.get("storedText",n=>{»window.postMessage({action:"storedTextResponse",text:n.storedText||""},"*")«}),"saveStoredText"===n.data.action&&chrome.storage.local.set({storedText:n.data.text}),"getTemplateCount"===n.data.acti…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C78020 -> L1:C78098  `…sage({action:"sendTemplates",templates:t},"*")}),"getTemplate"===n.data.action&&chrome.storage.local.get(n.data.key,t=>{»window.postMessage({action:"sendTemplateContent",value:t[n.data.key]||""},"*")«}),"deleteTemplate"===n.data.action&&chrome.storage.local.remove(n.data.key,()=>{})}}),window.on("message",function(n){"…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (97 raw steps → 1 distinct lines):
   1. L1 `…er("message",n=>{if(»n.source===window&&n.data){if("getCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMess …⟨tainted span: 1877 chars⟩… emplateContent",value:t[n.data.key]||""},"*")}),"deleteTemplate"===n.data.action&&chrome.storage.local.remove(n.data.key«,()=>{})}}),window.o…`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ASSIGN:identifier, STORAGE:STORAGE_FLOW[area: local, key: storedText, sender: content, receiver: content]

---

## Flow #6 — WINDOW_MESSAGE_EVENT (From storage.local.set('unknown') in content)  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C76296 -> L1:C76321  `…n.data.action&&w()});let bn=-1,En="unlimited",Sn=!1,In=!1,vn=!1,yn=!1,On=!1,kn;window.addEventListener("message",n=>{if(»n.source===window&&n.data«){if("getCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMessage({action:"storageRespo…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C78020 -> L1:C78098  `…sage({action:"sendTemplates",templates:t},"*")}),"getTemplate"===n.data.action&&chrome.storage.local.get(n.data.key,t=>{»window.postMessage({action:"sendTemplateContent",value:t[n.data.key]||""},"*")«}),"deleteTemplate"===n.data.action&&chrome.storage.local.remove(n.data.key,()=>{})}}),window.on("message",function(n){"…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (99 raw steps → 1 distinct lines):
   1. L1 `…er("message",n=>{if(»n.source===window&&n.data){if("getCachedText"===n.data.action&&chrome.storage.local.get("cachedText",n=>{window.postMess …⟨tainted span: 1877 chars⟩… emplateContent",value:t[n.data.key]||""},"*")}),"deleteTemplate"===n.data.action&&chrome.storage.local.remove(n.data.key«,()=>{})}}),window.o…`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ASSIGN:identifier, STORAGE:STORAGE_FLOW[area: local, key: unknown, sender: content, receiver: content], ELEMENT:computed-member-unknown-alternative

---

## Flow #7 — WINDOW_MESSAGE_EVENT (From storage.local.set('unknown') in background)  ·  24× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C9 -> L1:C121  `function »n(n,t){return n.split("").map(n=>{let o=n.charCodeAt(0)+t;return o>126&&(o-=95),String.fromCharCode(o)}).join(""«)}async function t(){async function n(){let n;const t=U("#application-json-data-sjs-1");if(t&&t.shadowRoot){const o=t.sh…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C78020 -> L1:C78098  `…sage({action:"sendTemplates",templates:t},"*")}),"getTemplate"===n.data.action&&chrome.storage.local.get(n.data.key,t=>{»window.postMessage({action:"sendTemplateContent",value:t[n.data.key]||""},"*")«}),"deleteTemplate"===n.data.action&&chrome.storage.local.remove(n.data.key,()=>{})}}),window.on("message",function(n){"…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (124 raw steps → 1 distinct lines):
   1. L1 `function »n(n,t){return n.split("").map(n=>{let o=n.charCodeAt(0)+t;return o>126&&(o-=95),String.fromCharCode(o)}).join("")}async  …⟨tainted span: 78091 chars⟩… chrome.storage.local.get(n.data.key,t=>{window.postMessage({action:"sendTemplateContent",value:t[n.data.key]||""},"*")})«,"deleteTemplate"===…`  · MESSAGE, ELEMENT:destructure-property[provider], ELEMENT:destructure-property[apiKey], ELEMENT:destructure-property[systemPrompt], ELEMENT:destructure-property[history], ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty, ELEMENT:array-spread, ELEMENT:implicit.add, RETURN:json.stringify, STORAGE:STORAGE_FLOW[area: local, key: unknown, sender: background, receiver: content], ELEMENT:computed-member-unknown-alternative, ASSIGN:logical-left
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`

---

## Flow #8 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L1:C9 -> L1:C121  `let e="";»chrome.runtime.onMessage.addListener((r,t)=>{"inputValue"===r.type&&(e=r.data,console.log("apiKey set to:",e))})«,chrome.runtime.onMessage.addListener((e,r,t)=>{if("WASAI_FETCH_AI"===e.action){const{provider:r,apiKey:s,systemPrompt:o…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://api.anthropic.com/v1/messages) — `background` L1:C717 -> L1:C1005  `…return"claude"===r?(»fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":s,"a …⟨tainted span: 288 chars⟩… ous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:600,system:o,messages:a})})«.then(e=>e.json()).t…`
  - `FETCH_BODY` (https://api.anthropic.com/v1/messages) — `background` L1:C717 -> L1:C1005  `…return"claude"===r?(»fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":s,"a …⟨tainted span: 288 chars⟩… ous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:600,system:o,messages:a})})«.then(e=>e.json()).t…`
  - `FETCH_HEADERS` (https://api.openai.com/v1/chat/completions) — `background` L1:C328 -> L1:C534  `…rovider:r,apiKey:s,systemPrompt:o,history:a}=e.payload;if("openai"===r){const e=[{role:"system",content:o},...a];return »fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s},body:JSON.stringify({model:"gpt-4o-mini",messages:e,max_tokens:600})})«.then(e=>e.json()).then(e=>{e.error?t({error:e.error.message||"OpenAI error"}):t({result:e.choices[0].message.content.tr…`
  - `FETCH_BODY` (https://api.openai.com/v1/chat/completions) — `background` L1:C328 -> L1:C534  `…rovider:r,apiKey:s,systemPrompt:o,history:a}=e.payload;if("openai"===r){const e=[{role:"system",content:o},...a];return »fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s},body:JSON.stringify({model:"gpt-4o-mini",messages:e,max_tokens:600})})«.then(e=>e.json()).then(e=>{e.error?t({error:e.error.message||"OpenAI error"}):t({result:e.choices[0].message.content.tr…`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L1:C1240 -> L1:C1328  `…)})}).catch(e=>t({error:e.message})),!0):(t({error:"Unknown provider: "+r}),!0)}return"WASAI_TEMPLATE_SAVE"===e.action?(»chrome.storage.local.set({[e.key]:e.value},()=>{t({success:!chrome.runtime.lastError})})«,!0):"WASAI_TEMPLATE_GET"===e.action?(chrome.storage.local.get([e.key],r=>{t({value:r[e.key]??null})}),!0):"WASAI_TEMPLA…`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L1:C1986 -> L1:C2074  `…E_GET"===e.action?(chrome.storage.local.get([e.key],r=>{t({value:r[e.key]??null})}),!0):"WASAI_STORAGE_SET"===e.action?(»chrome.storage.local.set({[e.key]:e.value},()=>{t({success:!chrome.runtime.lastError})})«,!0):"WASAI_STORAGE_REMOVE"===e.action?(chrome.storage.local.remove(e.key,()=>{t({success:!0})}),!0):void 0}),chrome.run…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (117 raw steps → 1 distinct lines):
   1. L1 `let e="";»chrome.runtime.onMessage.addListener((r,t)=>{"inputValue"===r.type&&(e=r.data,console.log("apiKey set to:",e))}),chrome. …⟨tainted span: 9532 chars⟩… ror",error:e.statusText}))}).catch(e=>{console.error("Request failed:",e),t({status:"error",error:e.toString()})}),!0}})«;`  · MESSAGE, ELEMENT:destructure-property[provider], ELEMENT:destructure-property[apiKey], ELEMENT:destructure-property[systemPrompt], ELEMENT:destructure-property[history], ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty, ELEMENT:array-spread, ELEMENT:implicit.add, RETURN:json.stringify
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`

---

## Flow #9 — WINDOW_MESSAGE_EVENT (From storage.local.set('storedText') in content)  ·  6× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L1:C9 -> L1:C121  `let e="";»chrome.runtime.onMessage.addListener((r,t)=>{"inputValue"===r.type&&(e=r.data,console.log("apiKey set to:",e))})«,chrome.runtime.onMessage.addListener((e,r,t)=>{if("WASAI_FETCH_AI"===e.action){const{provider:r,apiKey:s,systemPrompt:o…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://api.openai.com/v1/chat/completions) — `background` L1:C8404 -> L1:C8554  `…,t,s)=>{if(r.memory)return async function(r){const t=e,s="https://api.openai.com/v1/chat/completions";try{const e=await »fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({model:"gpt-4o-mini",messages:r})})«;if(!e.ok)throw console.error("API Response Error:",e.status,e.statusText),new Error(`API request failed with status ${e…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (47 raw steps → 1 distinct lines):
   1. L1 `let e="";»chrome.runtime.onMessage.addListener((r,t)=>{"inputValue"===r.type&&(e=r.data,console.log("apiKey set to:",e))}),chrome. …⟨tainted span: 9532 chars⟩… ror",error:e.statusText}))}).catch(e=>{console.error("Request failed:",e),t({status:"error",error:e.toString()})}),!0}})«;`  · MESSAGE, ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`

---
