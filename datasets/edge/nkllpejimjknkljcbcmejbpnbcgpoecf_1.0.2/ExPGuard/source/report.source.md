# Source-level Taint Flow — nkllpejimjknkljcbcmejbpnbcgpoecf 1.0.2

- Source type: CRX
- Files with issues: 3 / 7
- Distinct taint flows: 6  (collapsed from 23 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/background.js-CPhEULRj` L1:C15514 -> L1:C15515  `…yload);return}R(e)?J(t.tabId||o,t.frameId,t.payload):v(o,s,t.payload)};async function ne(e,t,s){const{id:o}=t.tab;if(pe(»e«)){if(e.type==="syncfun-init"&&_(t.tab.url))return Ee(t.tab),!0;if(l.has(o)){switch(e.type){case"syncfun-webview-event":…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `assets/background.js-CPhEULRj` L1:C15171 -> L1:C15181  `…onst b=Ce(n);console.error(b);let h,M;try{console.debug(`Requesting ${s}`);const P={...i,headers:b,signal:d};h=await fe(»fetch(s,P)«,r)}catch(P){c.abort(),M=P.message}const ie={type:`syncfun-fetch-response${t}`,payload:{err:M,resp:h?await _e(h):null}};…`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `assets/background.js-CPhEULRj` L1:C15171 -> L1:C15181  `…onst b=Ce(n);console.error(b);let h,M;try{console.debug(`Requesting ${s}`);const P={...i,headers:b,signal:d};h=await fe(»fetch(s,P)«,r)}catch(P){c.abort(),M=P.message}const ie={type:`syncfun-fetch-response${t}`,payload:{err:M,resp:h?await _e(h):null}};…`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `assets/background.js-CPhEULRj` L1:C8951 -> L1:C9214  `… o=p++;A[e]=o,await »u.updateSessionRules({addRules:[{id:o,priority:2,action:{type:"modifyHeaders",requestHeaders:[{header:"Referer",operatio …⟨tainted span: 263 chars⟩… ition:{tabIds:[e],resourceTypes:["sub_frame","xmlhttprequest","other","script","image","stylesheet","font","media"]}}]})«,console.log(`[SyncF…`
  - `CHROME_CONTENTSETTINGS_SET` (POPUPS) — `assets/background.js-CPhEULRj` L1:C14366 -> L1:C14441  `…[SyncFun] Stopped watching tabId=${e}`)},B={async allowPopups(e){try{a.contentSettings&&a.contentSettings.popups&&await »a.contentSettings.popups.set({primaryPattern:e.origins[0],setting:"allow"})«}catch(t){console.warn("Failed to set popup permissions:",t.message)}}},Oe=async e=>{const{action:t,...s}=e;try{await a.…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (149 raw steps → 1 distinct lines):
   1. L1 `…w Error("Timeout")),»t))]),$={},F=async(e,t)=>{if($[t])return $[t];let s=[t],o=t;for(;o>0;)try{const r=await a.webNavigation.getFrame({tabId: …⟨tainted span: 13856 chars⟩… 0})}catch(n){console.error("Failed to focus tab:",n.message)}break}case"syncfun-permissions-request":{await Oe(e.payload«);break}}f.has(o)||(…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:destructure-property[requestId], ELEMENT:destructure-property[url], ELEMENT:destructure-property[options], ELEMENT:destructure-property[timeout], ELEMENT:destructure-property[headers], ASSIGN:unary, COPY:object-spread, ASSIGN:template-literal, ELEMENT:implicit.add, ELEMENT:destructure-property[enabled], ELEMENT:destructure-property[refererUrl], ASSIGN:logical-right, ELEMENT:destructure-property[id], ELEMENT:destructure-property[action]

---

## Flow #2 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `assets/background.js-CPhEULRj` L1:C10140 -> L1:C10141  `…,e),i=`${new URL(e).protocol}//${o}${r}`;await new Promise(b=>setTimeout(b,10));const c=await z.get({url:i,name:s});if(!»c«){console.log(`Cookie ${s} not found, may have been rejected due to SameSite`);return}if(c.sameSite==="no_restriction")r…`
- **Sink(s)**:
  - `CHROME_COOKIES_SET_OPTIONS` — `assets/background.js-CPhEULRj` L1:C10471 -> L1:C10479  `…nly:c.httpOnly,sameSite:"no_restriction",storeId:c.storeId};c.expirationDate&&(d.expirationDate=c.expirationDate),await »z.set(d)«,console.log(`Fixed SameSite for cookie: ${s} on ${o}`)}catch(s){console.debug(`Failed to fix cookie SameSite: ${s.messa…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (176 raw steps → 1 distinct lines):
   1. L1 `…({url:i,name:s});if(»!c){console.log(`Cookie ${s} not found, may have been rejected due to SameSite`);return}if(c.sameSite==="no_restriction" …⟨tainted span: 324 chars⟩… !0,httpOnly:c.httpOnly,sameSite:"no_restriction",storeId:c.storeId};c.expirationDate&&(d.expirationDate=c.expirationDate«),await z.set(d),con…`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_VALUE (theme)

- **Source**: `ELEMENT_VALUE` — `assets/options.html-sARP4UtP` L1:C1863 -> L1:C2008  `…)}catch(t){console.error("Error loading settings:",t),r("Error loading settings","error")}}async function u(){try{const »t={enabled:m.checked,theme:f.value,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.value,lastUpdated:Date.now()}«;await i.storage.local.set({extensionSettings:t}),i.runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{con…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (extensionSettings) — `assets/options.html-sARP4UtP` L1:C2015 -> L1:C2057  `…ue,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.value,lastUpdated:Date.now()};await »i.storage.local.set({extensionSettings:t})«,i.runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{console.log("Could not notify background script:",e)…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L1 `…ction u(){try{const »t={enabled:m.checked,theme:f.value,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.valu …⟨tainted span: 316 chars⟩… .runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{console.log("Could not notify background script:",e)})«,r("Settings saved s…`  · ELEMENT:object.setProperty

---

## Flow #4 — ELEMENT_VALUE (highlightColor)

- **Source**: `ELEMENT_VALUE` — `assets/options.html-sARP4UtP` L1:C1863 -> L1:C2008  `…)}catch(t){console.error("Error loading settings:",t),r("Error loading settings","error")}}async function u(){try{const »t={enabled:m.checked,theme:f.value,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.value,lastUpdated:Date.now()}«;await i.storage.local.set({extensionSettings:t}),i.runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{con…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (extensionSettings) — `assets/options.html-sARP4UtP` L1:C2015 -> L1:C2057  `…ue,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.value,lastUpdated:Date.now()};await »i.storage.local.set({extensionSettings:t})«,i.runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{console.log("Could not notify background script:",e)…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L1 `…ction u(){try{const »t={enabled:m.checked,theme:f.value,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.valu …⟨tainted span: 316 chars⟩… .runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{console.log("Could not notify background script:",e)})«,r("Settings saved s…`  · ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE (customText)

- **Source**: `ELEMENT_VALUE` — `assets/options.html-sARP4UtP` L1:C1863 -> L1:C2008  `…)}catch(t){console.error("Error loading settings:",t),r("Error loading settings","error")}}async function u(){try{const »t={enabled:m.checked,theme:f.value,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.value,lastUpdated:Date.now()}«;await i.storage.local.set({extensionSettings:t}),i.runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{con…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (extensionSettings) — `assets/options.html-sARP4UtP` L1:C2015 -> L1:C2057  `…ue,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.value,lastUpdated:Date.now()};await »i.storage.local.set({extensionSettings:t})«,i.runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{console.log("Could not notify background script:",e)…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L1 `…ction u(){try{const »t={enabled:m.checked,theme:f.value,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.valu …⟨tainted span: 316 chars⟩… .runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{console.log("Could not notify background script:",e)})«,r("Settings saved s…`  · ELEMENT:object.setProperty

---

## Flow #6 — ELEMENT_VALUE (From storage.local.set('extensionSettings') in assets/options.html-sARP4UtP)  ·  18× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `assets/options.html-sARP4UtP` L1:C1863 -> L1:C2008  `…)}catch(t){console.error("Error loading settings:",t),r("Error loading settings","error")}}async function u(){try{const »t={enabled:m.checked,theme:f.value,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.value,lastUpdated:Date.now()}«;await i.storage.local.set({extensionSettings:t}),i.runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{con…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (extensionSettings) — `assets/options.html-sARP4UtP` L1:C3301 -> L1:C3343  `…ext(),s=JSON.parse(e);if(!s.settings)throw new Error("Invalid settings file format");const c={...d,...s.settings};await »i.storage.local.set({extensionSettings:c})«,await g(),r("Settings imported successfully!","success"),console.log("Settings imported:",c)}catch(e){console.error("Er…`
  - `CHROME_LOCAL_STORAGE` (extensionSettings) — `assets/options.html-sARP4UtP` L1:C2015 -> L1:C2057  `…ue,notifications:h.checked,autoAction:y.checked,highlightColor:p.value,customText:E.value,lastUpdated:Date.now()};await »i.storage.local.set({extensionSettings:t})«,i.runtime.sendMessage({action:"settingsUpdated",data:t}).catch(e=>{console.log("Could not notify background script:",e)…`
  - `CHROME_LOCAL_STORAGE` (extensionSettings) — `assets/options.html-sARP4UtP` L1:C2373 -> L1:C2415  `…,t)}catch(t){console.error("Error saving settings:",t),r("Error saving settings","error")}}async function x(){try{await »i.storage.local.set({extensionSettings:d})«,await g(),r("Settings reset to defaults","info"),console.log("Settings reset to defaults")}catch(t){console.error("Erro…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (59 raw steps → 1 distinct lines):
   1. L1 `….href,o)}})();const »m=document.getElementById("enabled"),f=document.getElementById("theme"),h=document.getElementById("notifications"),y=doc …⟨tainted span: 2576 chars⟩…  new Error("Invalid settings file format");const c={...d,...s.settings};await i.storage.local.set({extensionSettings:c})«,await g(),r("Settin…`  · ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: extensionSettings, sender: assets/options.html-sARP4UtP, receiver: assets/options.html-sARP4UtP], ASSIGN:logical-left, ELEMENT:member-element-container, RETURN:json.stringify, ASSIGN:identifier, COPY:object-spread

---
