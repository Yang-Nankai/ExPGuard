# Source-level Taint Flow — 21681cbf10b2a519660257e880195e4dcb1b9dd@skrapp.io 2.6.1

- Source type: XPI
- Files with issues: 2 / 2
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `keyContentScript.bundle` L1:C1705169 -> L1:C1705170  `…1;const M=A.distinct_id;return"string"==typeof M&&M.length>0}const U=()=>"undefined"==typeof document?null:(A=>{try{if(!»A«)return null;const M=A.split(";");for(const A of M){const M=A.trim(),N=M.indexOf("=");if(-1===N)continue;if("ph_phc_AWAq…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (posthog_distinct_id) — `keyContentScript.bundle` L1:C1706210 -> L1:C1706243  `…erval(()=>{(async()=>{try{const A=U();if(!A)return;const M=await chrome.storage.local.get(D);if(M?.[D]===A)return;await »chrome.storage.local.set({[D]:A})«}catch{}})()},1e3),chrome.runtime.sendMessage({type:"getVersion"},function(A){A?.version&&A.key&&(localStorage[A.key]=A.…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (139 raw steps → 1 distinct lines):
   1. L1 `…ypeof document?null:»(A=>{try{if(!A)return null;const M=A.split(";");for(const A of M){const M=A.trim(),N=M.indexOf("=");if(-1===N)continue;i …⟨tainted span: 1087 chars⟩… =U();if(!A)return;const M=await chrome.storage.local.get(D);if(M?.[D]===A)return;await chrome.storage.local.set({[D]:A})«}catch{}})()},1e3),c…`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:implicit.add, ITERATE:loop.iteration, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:decodeURIComponent, RETURN:json.parse, ASSIGN:conditional-consequent, ASSIGN:conditional-alternate

---

## Flow #2 — ELEMENT_VALUE (access_key)

- **Source**: `ELEMENT_VALUE` — `keyContentScript.bundle` L1:C1705701 -> L1:C1705702  `…ument.getElementById("access_key");A?.value&&await(async A=>{window.clearInterval(u),chrome.storage.sync.set({accessKey:»A«});const{configSM:M}=await chrome.storage.sync.get("configSM");if(!M||M.ts&&Date.now()-M.ts>3e5){const M=await fetch(z.c…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (accessKey) — `keyContentScript.bundle` L1:C1705666 -> L1:C1705704  `…nct_id",Z=async()=>{try{const A=document.getElementById("access_key");A?.value&&await(async A=>{window.clearInterval(u),»chrome.storage.sync.set({accessKey:A})«;const{configSM:M}=await chrome.storage.sync.get("configSM");if(!M||M.ts&&Date.now()-M.ts>3e5){const M=await fetch(z.con…`
  - `FETCH_HEADERS` (https://api.skrapp.io/config/extension) — `keyContentScript.bundle` L1:C1705813 -> L1:C1705910  `…cessKey:A});const{configSM:M}=await chrome.storage.sync.get("configSM");if(!M||M.ts&&Date.now()-M.ts>3e5){const M=await »fetch(z.configAPIUrl,{method:"GET",headers:{"Content-Type":"application/json","X-Access-Key":A}})«,N=await M.json();N?.sm&&chrome.storage.sync.set({configSM:{ts:Date.now(),config:N.sm.t}})}})(A.value)}catch(A){console.…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (5 raw steps → 1 distinct lines):
   1. L1 `…ow.clearInterval(u),»chrome.storage.sync.set({accessKey:A});const{configSM:M}=await chrome.storage.sync.get("configSM");if(!M||M.ts&&Date.now …⟨tainted span: 244 chars⟩… .ts>3e5){const M=await fetch(z.configAPIUrl,{method:"GET",headers:{"Content-Type":"application/json","X-Access-Key":A}})«,N=await M.json();N?…`  · ASSIGN:identifier, ELEMENT:object.setProperty

---
