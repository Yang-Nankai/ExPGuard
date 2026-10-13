# Source-level Taint Flow — beepaenfejnphdgnkmccjcfiieihhogl 4.7.3

- Source type: CRX
- Files with issues: 6 / 7
- Distinct taint flows: 16  (collapsed from 28 raw issue entries)
- Sinkless sources skipped: 23 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('apiKey') in js/sw)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/content` L1:C675 -> L1:C676  `…`:t}let fetched_portal_id;function fetchPortalID(){return fetched_portal_id||(fetched_portal_id=parseID(document.querySe»l«ector(".username").outerText),fetched_portal_id)}async function clearOldUserProfiles(){chrome.storage.local.get(["userPr…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apiKey) — `js/content` L1:C1005 -> L1:C1096  `…")&&parseFloat(e.extVersion)!==parseFloat(chrome.runtime.getManifest().version)&&chrome.storage.local.clear().then(()=>{»chrome.storage.local.set({extVersion:chrome.runtime.getManifest().version,apiKey:t},()=>{})«}),e.hasOwnProperty("userProfiles")){let t=JSON.parse(e.userProfiles),n=new Date;for(let[e,a]of Object.entries(t)){let o…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (17 raw steps → 1 distinct lines):
   1. L1 `…eID(document.querySe»lector(".username").outerText),fetched_portal_id)}async function clearOldUserProfiles(){chrome.storage.local.get(["userP …⟨tainted span: 658 chars⟩… t o=new Date(a.createdon);Math.abs(n-o)>864e6&&delete t[e]}chrome.storage.local.set({userProfiles:JSON.stringify(t)})}})«}let fetched_locatio…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:conditional-consequent, ASSIGN:logical-right, STORAGE:STORAGE_FLOW[area: local, key: apiKey, sender: js/sw, receiver: js/content], ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_VALUE (From storage.local.set('apiKey') in js/popup)  ·  2× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `js/content` L1:C803 -> L1:C804  `….username").outerText),fetched_portal_id)}async function clearOldUserProfiles(){chrome.storage.local.get(["userProfiles"»,«"extVersion","apiKey"],function(e){let t=e.apiKey;if(e.hasOwnProperty("extVersion")&&parseFloat(e.extVersion)!==parseFlo…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apiKey) — `js/content` L1:C1005 -> L1:C1096  `…")&&parseFloat(e.extVersion)!==parseFloat(chrome.runtime.getManifest().version)&&chrome.storage.local.clear().then(()=>{»chrome.storage.local.set({extVersion:chrome.runtime.getManifest().version,apiKey:t},()=>{})«}),e.hasOwnProperty("userProfiles")){let t=JSON.parse(e.userProfiles),n=new Date;for(let[e,a]of Object.entries(t)){let o…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (17 raw steps → 1 distinct lines):
   1. L1 `…arOldUserProfiles(){»chrome.storage.local.get(["userProfiles","extVersion","apiKey"],function(e){let t=e.apiKey;if(e.hasOwnProperty("extVersi …⟨tainted span: 1766 chars⟩… eadyState&&(clearInterval(t),e())},1e3)})}function activateClearSlotsOverview(){waitForPageLoad().then(()=>{document.que«rySelector("#post_se…`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left, STORAGE:STORAGE_FLOW[area: local, key: apiKey, sender: js/popup, receiver: js/content]

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/sw` L1:C675 -> L1:C676  `…/*"],runAt:"document_start",world:"MAIN"}]).catch(console.log)}),chrome.runtime.onMessageExternal.addListener((e,t,s)=>(»e«&&(e.message?"version"===e.message&&s({version:chrome.runtime.getManifest().version}):e.apiKey&&chrome.storage.local.set…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apiKey) — `js/sw` L1:C772 -> L1:C815  `….addListener((e,t,s)=>(e&&(e.message?"version"===e.message&&s({version:chrome.runtime.getManifest().version}):e.apiKey&&»chrome.storage.local.set({apiKey:e.apiKey})«),!0)),chrome.action.onClicked.addListener(e=>{chrome.tabs.sendMessage(e.id,"toggle",t=>{chrome.runtime.lastError;chrome…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (14 raw steps → 1 distinct lines):
   1. L1 `…/*"],runAt:"document_start",world:"MAIN"}]).catch(console.log)}),chrome.runtime.onMessageExternal.addListener((e,t,s)=>(»e&&(e.message?"version"===e.message&&s({version:chrome.runtime.getManifest().version}):e.apiKey&&chrome.storage.local.set({apiKey:e.apiKey}))«,!0)),chrome.action.onClicked.addListener(e=>{chrome.tabs.sendMessage(e.id,"toggle",t=>{chrome.runtime.lastError;chrome.…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:conditional-consequent, ASSIGN:logical-right

---

## Flow #4 — WINDOW_CUSTOM_EVENT (window.addEventListener(vSCP))

- **Source**: `WINDOW_CUSTOM_EVENT` — `js/sw` L1:C1120 -> L1:C3210  `…debarr.js"]})})})}),»chrome.runtime.onMessage.addListener((e,t,s)=>{if("getApntConfDets"===e.action){return(async()=>{try{const e=await getAp …⟨tainted span: 2090 chars⟩… ersion:t.extVersion},method:"POST",body:h};fetch("https://app.checkvisaslots.com"+e.resource,m).then().catch(e=>{})})}})«;const generateFilen…`
- **Sink(s)**:
  - `FETCH_BODY` (https://app.checkvisaslots.com/push/v5) — `js/sw` L1:C3133 -> L1:C3185  `…ls)).replaceAll("T00:00:00","")));const m={headers:{"x-api-key":t.apiKey,extVersion:t.extVersion},method:"POST",body:h};»fetch("https://app.checkvisaslots.com"+e.resource,m)«.then().catch(e=>{})})}});const generateFilename=(e=5)=>Array.from({length:e},()=>"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (59 raw steps → 1 distinct lines):
   1. L1 `…debarr.js"]})})})}),»chrome.runtime.onMessage.addListener((e,t,s)=>{if("getApntConfDets"===e.action){return(async()=>{try{const e=await getAp …⟨tainted span: 2349 chars⟩… (62*Math.random()))).join("")+".png";function convertSlotsResp(e){return e.length?e.reduce((e,t)=>(e[t.ID]=t.Date,e),{})«:{}}function getApnt…`  · MESSAGE, ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent, RETURN:json.stringify, ELEMENT:member-element-container, RETURN:btoa
      ⇄ cross-context hop: `runtime.single.sender.message[js/content->js/sw]`

---

## Flow #5 — ELEMENT_VALUE (#post_select)

- **Source**: `ELEMENT_VALUE` — `js/sw` L1:C1120 -> L1:C3210  `…debarr.js"]})})})}),»chrome.runtime.onMessage.addListener((e,t,s)=>{if("getApntConfDets"===e.action){return(async()=>{try{const e=await getAp …⟨tainted span: 2090 chars⟩… ersion:t.extVersion},method:"POST",body:h};fetch("https://app.checkvisaslots.com"+e.resource,m).then().catch(e=>{})})}})«;const generateFilen…`
- **Sink(s)**:
  - `FETCH_BODY` (https://app.checkvisaslots.com/push/v5) — `js/sw` L1:C3133 -> L1:C3185  `…ls)).replaceAll("T00:00:00","")));const m={headers:{"x-api-key":t.apiKey,extVersion:t.extVersion},method:"POST",body:h};»fetch("https://app.checkvisaslots.com"+e.resource,m)«.then().catch(e=>{})})}});const generateFilename=(e=5)=>Array.from({length:e},()=>"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L1 `…debarr.js"]})})})}),»chrome.runtime.onMessage.addListener((e,t,s)=>{if("getApntConfDets"===e.action){return(async()=>{try{const e=await getAp …⟨tainted span: 2090 chars⟩… ersion:t.extVersion},method:"POST",body:h};fetch("https://app.checkvisaslots.com"+e.resource,m).then().catch(e=>{})})}})«;const generateFilen…`  · MESSAGE, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[js/content->js/sw]`

---

## Flow #6 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('apiKey') in js/sw)  ·  2× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/sw` L1:C675 -> L1:C676  `…/*"],runAt:"document_start",world:"MAIN"}]).catch(console.log)}),chrome.runtime.onMessageExternal.addListener((e,t,s)=>(»e«&&(e.message?"version"===e.message&&s({version:chrome.runtime.getManifest().version}):e.apiKey&&chrome.storage.local.set…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://app.checkvisaslots.com/push/v5) — `js/sw` L1:C3133 -> L1:C3185  `…ls)).replaceAll("T00:00:00","")));const m={headers:{"x-api-key":t.apiKey,extVersion:t.extVersion},method:"POST",body:h};»fetch("https://app.checkvisaslots.com"+e.resource,m)«.then().catch(e=>{})})}});const generateFilename=(e=5)=>Array.from({length:e},()=>"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (23 raw steps → 1 distinct lines):
   1. L1 `…dListener((e,t,s)=>(»e&&(e.message?"version"===e.message&&s({version:chrome.runtime.getManifest().version}):e.apiKey&&chrome.storage.local.se …⟨tainted span: 2532 chars⟩… xtVersion:t.extVersion},method:"POST",body:h};fetch("https://app.checkvisaslots.com"+e.resource,m).then().catch(e=>{})})«}});const generateFi…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:conditional-consequent, ASSIGN:logical-right, STORAGE:STORAGE_FLOW[area: local, key: apiKey, sender: js/sw, receiver: js/sw], ELEMENT:object.setProperty

---

## Flow #7 — ELEMENT_VALUE (From storage.local.set('apiKey') in js/popup)  ·  4× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `js/sw` L1:C803 -> L1:C804  `…ssage?"version"===e.message&&s({version:chrome.runtime.getManifest().version}):e.apiKey&&chrome.storage.local.set({apiKe»y«:e.apiKey})),!0)),chrome.action.onClicked.addListener(e=>{chrome.tabs.sendMessage(e.id,"toggle",t=>{chrome.runtime.lastE…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://app.checkvisaslots.com/push/v5) — `js/sw` L1:C3133 -> L1:C3185  `…ls)).replaceAll("T00:00:00","")));const m={headers:{"x-api-key":t.apiKey,extVersion:t.extVersion},method:"POST",body:h};»fetch("https://app.checkvisaslots.com"+e.resource,m)«.then().catch(e=>{})})}});const generateFilename=(e=5)=>Array.from({length:e},()=>"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (23 raw steps → 1 distinct lines):
   1. L1 `…}):e.apiKey&&chrome.»storage.local.set({apiKey:e.apiKey})),!0)),chrome.action.onClicked.addListener(e=>{chrome.tabs.sendMessage(e.id,"toggle" …⟨tainted span: 2428 chars⟩… xtVersion:t.extVersion},method:"POST",body:h};fetch("https://app.checkvisaslots.com"+e.resource,m).then().catch(e=>{})})«}});const generateFi…`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left, STORAGE:STORAGE_FLOW[area: local, key: apiKey, sender: js/popup, receiver: js/sw]

---

## Flow #8 — ELEMENT_VALUE (slot-start-date)

- **Source**: `ELEMENT_VALUE` — `js/popup` L1:C14098 -> L1:C14227  `…cked&&showLoginDetails()}),document.getElementById("save-slot-preferences-btn").addEventListener("click",function(){let »e={slot_start_date:document.getElementById("slot-start-date").value,slot_end_date:document.getElementById("slot-end-date").value}«,t={ofc:[],ca:[]};document.querySelectorAll("#preferred-ofc-location-container select").forEach(e=>t.ofc.push(e.value)),…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (preferred_window) — `js/popup` L1:C14543 -> L1:C14718  `…(e=>t.ca.push(e.value)),t.ofc=t.ofc.filter((e,t,o)=>e&&o.indexOf(e)===t),t.ca=t.ca.filter((e,t,o)=>e&&o.indexOf(e)===t),»chrome.storage.local.set({preferred_locations:t,preferred_window:e,portal_id:document.getElementById("portal-id").value},function(){confirmSaved("save-slot-preferences-btn")})«}),document.getElementById("save-login-dets-btn").addEventListener("click",function(){let e={username:document.getElemen…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L1 `…ick",function(){let »e={slot_start_date:document.getElementById("slot-start-date").value,slot_end_date:document.getElementById("slot-end-date …⟨tainted span: 620 chars⟩… ed_window:e,portal_id:document.getElementById("portal-id").value},function(){confirmSaved("save-slot-preferences-btn")})«}),document.getEleme…`  · ELEMENT:object.setProperty

---

## Flow #9 — ELEMENT_VALUE (slot-end-date)

- **Source**: `ELEMENT_VALUE` — `js/popup` L1:C14098 -> L1:C14227  `…cked&&showLoginDetails()}),document.getElementById("save-slot-preferences-btn").addEventListener("click",function(){let »e={slot_start_date:document.getElementById("slot-start-date").value,slot_end_date:document.getElementById("slot-end-date").value}«,t={ofc:[],ca:[]};document.querySelectorAll("#preferred-ofc-location-container select").forEach(e=>t.ofc.push(e.value)),…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (preferred_window) — `js/popup` L1:C14543 -> L1:C14718  `…(e=>t.ca.push(e.value)),t.ofc=t.ofc.filter((e,t,o)=>e&&o.indexOf(e)===t),t.ca=t.ca.filter((e,t,o)=>e&&o.indexOf(e)===t),»chrome.storage.local.set({preferred_locations:t,preferred_window:e,portal_id:document.getElementById("portal-id").value},function(){confirmSaved("save-slot-preferences-btn")})«}),document.getElementById("save-login-dets-btn").addEventListener("click",function(){let e={username:document.getElemen…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L1 `…ick",function(){let »e={slot_start_date:document.getElementById("slot-start-date").value,slot_end_date:document.getElementById("slot-end-date …⟨tainted span: 620 chars⟩… ed_window:e,portal_id:document.getElementById("portal-id").value},function(){confirmSaved("save-slot-preferences-btn")})«}),document.getEleme…`  · ELEMENT:object.setProperty

---

## Flow #10 — ELEMENT_VALUE (portal-id)

- **Source**: `ELEMENT_VALUE` — `js/popup` L1:C14543 -> L1:C14718  `…(e=>t.ca.push(e.value)),t.ofc=t.ofc.filter((e,t,o)=>e&&o.indexOf(e)===t),t.ca=t.ca.filter((e,t,o)=>e&&o.indexOf(e)===t),»chrome.storage.local.set({preferred_locations:t,preferred_window:e,portal_id:document.getElementById("portal-id").value},function(){confirmSaved("save-slot-preferences-btn")})«}),document.getElementById("save-login-dets-btn").addEventListener("click",function(){let e={username:document.getElemen…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (portal_id) — `js/popup` L1:C14543 -> L1:C14718  `…(e=>t.ca.push(e.value)),t.ofc=t.ofc.filter((e,t,o)=>e&&o.indexOf(e)===t),t.ca=t.ca.filter((e,t,o)=>e&&o.indexOf(e)===t),»chrome.storage.local.set({preferred_locations:t,preferred_window:e,portal_id:document.getElementById("portal-id").value},function(){confirmSaved("save-slot-preferences-btn")})«}),document.getElementById("save-login-dets-btn").addEventListener("click",function(){let e={username:document.getElemen…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L1 `…(e=>t.ca.push(e.value)),t.ofc=t.ofc.filter((e,t,o)=>e&&o.indexOf(e)===t),t.ca=t.ca.filter((e,t,o)=>e&&o.indexOf(e)===t),»chrome.storage.local.set({preferred_locations:t,preferred_window:e,portal_id:document.getElementById("portal-id").value},function(){confirmSaved("save-slot-preferences-btn")})«}),document.getElementById("save-login-dets-btn").addEventListener("click",function(){let e={username:document.getElemen…`  · ELEMENT:object.setProperty

---

## Flow #11 — ELEMENT_VALUE (cvs-username)

- **Source**: `ELEMENT_VALUE` — `js/popup` L1:C14808 -> L1:C14921  `…"save-slot-preferences-btn")})}),document.getElementById("save-login-dets-btn").addEventListener("click",function(){let »e={username:document.getElementById("cvs-username").value,password:document.getElementById("cvs-password").value}«,t={},o=document.querySelectorAll(".question"),n=document.querySelectorAll(".answer");for(let e=0;e<o.length;e++)t[o[e].…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (loginDetails) — `js/popup` L1:C15059 -> L1:C15171  `…uerySelectorAll(".question"),n=document.querySelectorAll(".answer");for(let e=0;e<o.length;e++)t[o[e].value]=n[e].value;»chrome.storage.local.set({loginDetails:e,securityQuestions:t},function(){confirmSaved("save-login-dets-btn",3)})«});`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (8 raw steps → 1 distinct lines):
   1. L1 `…ick",function(){let »e={username:document.getElementById("cvs-username").value,password:document.getElementById("cvs-password").value},t={},o …⟨tainted span: 363 chars⟩… ].value;chrome.storage.local.set({loginDetails:e,securityQuestions:t},function(){confirmSaved("save-login-dets-btn",3)})«});`  · ELEMENT:object.setProperty

---

## Flow #12 — ELEMENT_VALUE (cvs-password)

- **Source**: `ELEMENT_VALUE` — `js/popup` L1:C14808 -> L1:C14921  `…"save-slot-preferences-btn")})}),document.getElementById("save-login-dets-btn").addEventListener("click",function(){let »e={username:document.getElementById("cvs-username").value,password:document.getElementById("cvs-password").value}«,t={},o=document.querySelectorAll(".question"),n=document.querySelectorAll(".answer");for(let e=0;e<o.length;e++)t[o[e].…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (loginDetails) — `js/popup` L1:C15059 -> L1:C15171  `…uerySelectorAll(".question"),n=document.querySelectorAll(".answer");for(let e=0;e<o.length;e++)t[o[e].value]=n[e].value;»chrome.storage.local.set({loginDetails:e,securityQuestions:t},function(){confirmSaved("save-login-dets-btn",3)})«});`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (8 raw steps → 1 distinct lines):
   1. L1 `…ick",function(){let »e={username:document.getElementById("cvs-username").value,password:document.getElementById("cvs-password").value},t={},o …⟨tainted span: 363 chars⟩… ].value;chrome.storage.local.set({loginDetails:e,securityQuestions:t},function(){confirmSaved("save-login-dets-btn",3)})«});`  · ELEMENT:object.setProperty

---

## Flow #13 — ELEMENT_VALUE (.answer)

- **Source**: `ELEMENT_VALUE` — `js/popup` L1:C14922 -> L1:C14926  `…){let e={username:document.getElementById("cvs-username").value,password:document.getElementById("cvs-password").value},»t={}«,o=document.querySelectorAll(".question"),n=document.querySelectorAll(".answer");for(let e=0;e<o.length;e++)t[o[e].value…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (securityQuestions) — `js/popup` L1:C15059 -> L1:C15171  `…uerySelectorAll(".question"),n=document.querySelectorAll(".answer");for(let e=0;e<o.length;e++)t[o[e].value]=n[e].value;»chrome.storage.local.set({loginDetails:e,securityQuestions:t},function(){confirmSaved("save-login-dets-btn",3)})«});`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (8 raw steps → 1 distinct lines):
   1. L1 `…s-password").value},»t={},o=document.querySelectorAll(".question"),n=document.querySelectorAll(".answer");for(let e=0;e<o.length;e++)t[o[e].v …⟨tainted span: 249 chars⟩… ].value;chrome.storage.local.set({loginDetails:e,securityQuestions:t},function(){confirmSaved("save-login-dets-btn",3)})«});`  · ELEMENT:object.setProperty

---

## Flow #14 — ELEMENT_VALUE (apiKey)

- **Source**: `ELEMENT_VALUE` — `js/popup` L1:C803 -> L1:C804  `…inline"}async function validateApiKey(e=!1){let t,o=document.getElementById("apiKey").value,n=e,a={headers:{"x-api-key":»o«,extVersion:chrome.runtime.getManifest().version}},l={};return!o||o.length<6?(l.ok=!1,document.getElementById("server_ms…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://app.checkvisaslots.com/validate/v3) — `js/popup` L1:C1061 -> L1:C1114  `…ter a Valid Access Code",document.querySelector(".section-server-alert").style.display="-webkit-box",l):(!n&&o?(l=await »fetch("https://app.checkvisaslots.com/validate/v3",a)«,t=await l.json(),n=200===l.status):n&&(l.ok=!0,"page"===params.from?document.querySelectorAll(".section-slots-info").fo…`
  - `CHROME_LOCAL_STORAGE` (apiKey) — `js/popup` L1:C1518 -> L1:C2105  `…-webkit-box"),await »chrome.storage.local.set({apiKey:o,valDated:(new Date).toDateString(),appointment_type:t&&t.appointment_type,visa_type:t …⟨tainted span: 587 chars⟩… ct_link");e.style.display="inline",e.href="https://checkvisaslots.com/latest-us-visa-availability/?utm_source=chr_ext"})«):(l.ok=!1,o&&(docum…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (14 raw steps → 1 distinct lines):
   1. L1 `…"apiKey").value,n=e,»a={headers:{"x-api-key":o,extVersion:chrome.runtime.getManifest().version}},l={};return!o||o.length<6?(l.ok=!1,document. …⟨tainted span: 1750 chars⟩… ocument.getElementById("extension_usage_helper").classList.add("d-none"),await chrome.storage.local.remove("apiKey")),l)«}async function addN…`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left

---

## Flow #15 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('apiKey') in js/sw)  ·  3× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/popup` L1:C675 -> L1:C676  `…mentById("apiKey").disabled=!0,document.getElementById("apiKey").type="password",document.getElementById("edit").style.d»i«splay="inline"}async function validateApiKey(e=!1){let t,o=document.getElementById("apiKey").value,n=e,a={headers:{"x-ap…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://app.checkvisaslots.com/slots/v3) — `js/popup` L1:C10039 -> L1:C10089  `…style.display="none";try{let e={headers:{"x-api-key":o.apiKey,extVersion:chrome.runtime.getManifest().version}},n=await »fetch("https://app.checkvisaslots.com/slots/v3",e)«,a=await n.json();if(200!==n.status)document.getElementById("server_msg").innerHTML=a.message,document.querySelector(".s…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (18 raw steps → 1 distinct lines):
   1. L1 `…ById("edit").style.d»isplay="inline"}async function validateApiKey(e=!1){let t,o=document.getElementById("apiKey").value,n=e,a={headers:{"x-a …⟨tainted span: 7496 chars⟩… t.getElementById("apiKey");t.value=e.apiKey??"",t.value&&(hideApikeyValue(),document.getElementById("submit").click())})«,document.getElement…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:conditional-consequent, ASSIGN:logical-right, STORAGE:STORAGE_FLOW[area: local, key: apiKey, sender: js/sw, receiver: js/popup], ELEMENT:object.setProperty

---

## Flow #16 — ELEMENT_VALUE (From storage.local.set('apiKey') in js/popup)  ·  6× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `js/popup` L1:C803 -> L1:C804  `…inline"}async function validateApiKey(e=!1){let t,o=document.getElementById("apiKey").value,n=e,a={headers:{"x-api-key":»o«,extVersion:chrome.runtime.getManifest().version}},l={};return!o||o.length<6?(l.ok=!1,document.getElementById("server_ms…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://app.checkvisaslots.com/slots/v3) — `js/popup` L1:C10039 -> L1:C10089  `…style.display="none";try{let e={headers:{"x-api-key":o.apiKey,extVersion:chrome.runtime.getManifest().version}},n=await »fetch("https://app.checkvisaslots.com/slots/v3",e)«,a=await n.json();if(200!==n.status)document.getElementById("server_msg").innerHTML=a.message,document.querySelector(".s…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (18 raw steps → 1 distinct lines):
   1. L1 `…"apiKey").value,n=e,»a={headers:{"x-api-key":o,extVersion:chrome.runtime.getManifest().version}},l={};return!o||o.length<6?(l.ok=!1,document. …⟨tainted span: 7392 chars⟩… t.getElementById("apiKey");t.value=e.apiKey??"",t.value&&(hideApikeyValue(),document.getElementById("submit").click())})«,document.getElement…`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left, STORAGE:STORAGE_FLOW[area: local, key: apiKey, sender: js/popup, receiver: js/popup]

---
