# Source-level Taint Flow — iojojcfflmfcejodomoafimdiianbgfe 7.3.25

- Source type: CRX
- Files with issues: 2 / 5
- Distinct taint flows: 10  (collapsed from 12 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `lbg` L16:C97501 -> L16:C97502  `…r(function(n,r,a){var e,c;try{if(r.id&&r.id!=ceID)throw e=!0,new Error("Attempted invalid onMessageExternal access");if(»n«.reqPerm)try{chrome.permissions.contains({permissions:["system.display"]},e=>{e?chrome.system.display.getInfo(function(e…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `lbg` L16:C98184 -> L16:C98303  `…try{a({sF:!0,aiObj:bckGrnd.aiObj})}catch(e){a({sF:!1,err:e.message})}bckGrnd.aiObj.doneF&&(bckGrnd.aiObj=null)}else{try{»a({sF:!1,err:"bckGrnd.aiObj.cID != request.cID for bckGrnd.aiObj.cID= "+bckGrnd.aiObj.cID+"  and request.cID= "+n.cID})«}catch(e){a({sF:!1,err:e.message})}bckGrnd.aiObj=null}else try{a({sF:!1,err:"Missing aiObj"})}catch(e){a({sF:!1,err:e.me…`
  - `FETCH_BODY` (https://aws.leadleaper.net/AJAX_Login) — `lbg` L16:C29815 -> L16:C30107  `…in(e,r){try{c=e,s=r,»fetch(gURLs+"AJAX_Login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlenc …⟨tainted span: 292 chars⟩… .affCode||0,gauthF:c.gauthF||!1,msauthF:c.msauthF||!1,nalF:c.nalF||!1,splF:c.splF||!1,uID:c.uID,eID:ceID,gVer:extVer})})«.then(e=>{if(!e.ok)t…`
  - `CHROME_TABS_CREATE_OPTIONS` — `lbg` L16:C61466 -> L16:C61746  `…tTimeout(function(){»chrome.tabs.create({url:s.url,index:0,active:!1,pinned:!0},function(e){bckGrnd.likeObj={winID:e.windowId,tabID:e.id,like …⟨tainted span: 280 chars⟩… eCom,cID:s.cID,snF:!!s.snF,url:s.url,urn:s.urn,snLnk:s.snLnk},chrome.storage.local.set({bckGrnd:bckGrnd},function(){})})«},l)}else{l=0;if(bck…`
  - `CHROME_LOCAL_STORAGE` (bckGrnd) — `lbg` L16:C61688 -> L16:C61744  `…Id,tabID:e.id,likePostF:!0,likeStr:s.likeStr,likeCom:s.likeCom,cID:s.cID,snF:!!s.snF,url:s.url,urn:s.urn,snLnk:s.snLnk},»chrome.storage.local.set({bckGrnd:bckGrnd},function(){})«})},l)}else{l=0;if(bckGrnd.aiObj&&bckGrnd.aiObj.winID){l=400;var h=bckGrnd.aiObj.winID;bckGrnd.aiObj=null,chrome.storage…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C62007 -> L16:C62376  `…tTimeout(function(){»chrome.windows.create({url:s.url,type:"popup",state:"normal",focused:!0,width:350,height:e,top:r,left:c},function(e){var …⟨tainted span: 369 chars⟩… puLnk,urn:s.urn,snLnk:s.snLnk,IncID:s.IncID,IncKey:s.IncKey},chrome.storage.local.set({bckGrnd:bckGrnd},function(){}))})«},l)}}else{try{r&&r(…`
  - `CHROME_LOCAL_STORAGE` (bckGrnd) — `lbg` L16:C62317 -> L16:C62373  `…:r,tabID:e,cID:s.cID,snF:!!s.snF,url:s.url,pu:s.pu,puLnk:s.puLnk,urn:s.urn,snLnk:s.snLnk,IncID:s.IncID,IncKey:s.IncKey},»chrome.storage.local.set({bckGrnd:bckGrnd},function(){})«)})},l)}}else{try{r&&r({sF:!1,er:"!request || !request.url"})}catch(e){}onError("popInWin:  !request || !request.url","r…`
  - `CHROME_LOCAL_STORAGE` (bckGrnd) — `lbg` L16:C61850 -> L16:C61906  `…,function(){})})},l)}else{l=0;if(bckGrnd.aiObj&&bckGrnd.aiObj.winID){l=400;var h=bckGrnd.aiObj.winID;bckGrnd.aiObj=null,»chrome.storage.local.set({bckGrnd:bckGrnd},function(){})«;try{chrome.windows.remove(h,function(e){chrome.runtime.lastError})}catch(e){}}setTimeout(function(){chrome.windows.crea…`
  - `CHROME_LOCAL_STORAGE` (bckGrnd) — `lbg` L16:C60469 -> L16:C60525  `…pInfo);let e=300,r=50,c=20;if(t){s.aiProcF||s.vaF||(bckGrnd.popInWin||(bckGrnd.popInWin={}),bckGrnd.popInWin.dispInfo=t,»chrome.storage.local.set({bckGrnd:bckGrnd},function(){})«);try{c=s.vaF?(a=(n=t[0].workArea).width,o=n.height,e=o-100,r=o-e-20,a-350-20):(i=(d=t[0].workArea).width,b=d.height,r=b…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1124 raw steps → 1 distinct lines):
   1. L16 `…ength?"&":"")+e+"="+»encodeURIComponent(r[e])),c}function postJsnDataNoReply(e,r,c){postDataNoReply(e,r,c,!1)}function postNmValDataNoReply(e …⟨tainted span: 97576 chars⟩… ",nalF:n.nalF||!1,gauthF:r,msauthF:c,splF:s},a)})}else{if(!n.logout)throw new Error("Unrecognized request");onLogout(a,n«)}}catch(e){var s,t,…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-left, ELEMENT:member-element-container, RETURN:encodeURIComponent, ASSIGN:logical-right, ELEMENT:member.length, RETURN:json.stringify, ASSIGN:binary-left, ASSIGN:conditional-consequent

---

## Flow #2 — CHROME_SYSTEM_DISPLAY

- **Source**: `CHROME_SYSTEM_DISPLAY` — `lbg` L16:C58198 -> L16:C58270  `…"undefined")?s?(n=-1!=c.indexOf("linkedin.com/in/"))?chrome.permissions.contains({permissions:["system.display"]},e=>{e?»chrome.system.display.getInfo(function(e){lnchInWin(c,e,bckGrnd.winID)})«:chrome.permissions.request({permissions:["system.display"]},e=>{e?chrome.system.display.getInfo(function(e){lnchInWin(c…`
- **Sink(s)**:
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `lbg` L16:C56993 -> L16:C57539  `…imeout(function(){a?»chrome.windows.update(c,{state:"normal",width:a},function(){chrome.runtime.lastError,chrome.windows.create({url:e,type:" …⟨tainted span: 546 chars⟩… per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})})«:chrome.windows.crea…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C57078 -> L16:C57537  `…e.runtime.lastError,»chrome.windows.create({url:e,type:"popup",state:"normal",focused:!0,width:250,height:s,top:t,left:n},function(e){chrome. …⟨tainted span: 459 chars⟩… :"per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})«}):chrome.windows.cr…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C57540 -> L16:C57999  `…Error})})},1e3)})}):»chrome.windows.create({url:e,type:"popup",state:"normal",focused:!0,width:250,height:s,top:t,left:n},function(e){chrome. …⟨tainted span: 459 chars⟩… :"per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})«},300)}function lnch…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (35 raw steps → 1 distinct lines):
   1. L16 `…=50,n=20,a;var o;if(»r&&(bckGrnd.popInWin||(bckGrnd.popInWin={}),bckGrnd.popInWin.dispInfo=r,chrome.storage.local.set({bckGrnd:bckGrnd},funct …⟨tainted span: 1719 chars⟩… contains({permissions:["system.display"]},e=>{e?chrome.system.display.getInfo(function(e){lnchInWin(c,e,bckGrnd.winID)})«:chrome.permissions.…`  · ELEMENT:object.setProperty, ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right

---

## Flow #3 — CHROME_SYSTEM_DISPLAY (system.display)  ·  2× duplicate paths collapsed

- **Source**: `CHROME_SYSTEM_DISPLAY` — `lbg` L16:C56685 -> L16:C56689  `…pInWin||(bckGrnd.popInWin={}),bckGrnd.popInWin.dispInfo=r,chrome.storage.local.set({bckGrnd:bckGrnd},function(){}),o=(r=»r[0]«.workArea).width,r=r.height,s=r,t=r-s,n=o-250,c)&&(a=o-250+20),null!=bckGrnd.SrchTabID&&0<bckGrnd.SrchTabID)try{winProcF…`
- **Sink(s)**:
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `lbg` L16:C56993 -> L16:C57539  `…imeout(function(){a?»chrome.windows.update(c,{state:"normal",width:a},function(){chrome.runtime.lastError,chrome.windows.create({url:e,type:" …⟨tainted span: 546 chars⟩… per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})})«:chrome.windows.crea…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C57078 -> L16:C57537  `…e.runtime.lastError,»chrome.windows.create({url:e,type:"popup",state:"normal",focused:!0,width:250,height:s,top:t,left:n},function(e){chrome. …⟨tainted span: 459 chars⟩… :"per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})«}):chrome.windows.cr…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C57540 -> L16:C57999  `…Error})})},1e3)})}):»chrome.windows.create({url:e,type:"popup",state:"normal",focused:!0,width:250,height:s,top:t,left:n},function(e){chrome. …⟨tainted span: 459 chars⟩… :"per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})«},300)}function lnch…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (34 raw steps → 1 distinct lines):
   1. L16 `…=50,n=20,a;var o;if(»r&&(bckGrnd.popInWin||(bckGrnd.popInWin={}),bckGrnd.popInWin.dispInfo=r,chrome.storage.local.set({bckGrnd:bckGrnd},funct …⟨tainted span: 1448 chars⟩… :"per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})«},300)}function lnch…`  · ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:object.setProperty

---

## Flow #4 — CHROME_SYSTEM_DISPLAY

- **Source**: `CHROME_SYSTEM_DISPLAY` — `lbg` L16:C58337 -> L16:C58409  `…ay.getInfo(function(e){lnchInWin(c,e,bckGrnd.winID)}):chrome.permissions.request({permissions:["system.display"]},e=>{e?»chrome.system.display.getInfo(function(e){lnchInWin(c,e,bckGrnd.winID)})«:lnchInWin(c,dispInfo,bckGrnd.winID)})}):chrome.tabs.create({url:c,index:0,active:!1,pinned:!0},function(e){bckGrnd.Lead…`
- **Sink(s)**:
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `lbg` L16:C56993 -> L16:C57539  `…imeout(function(){a?»chrome.windows.update(c,{state:"normal",width:a},function(){chrome.runtime.lastError,chrome.windows.create({url:e,type:" …⟨tainted span: 546 chars⟩… per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})})«:chrome.windows.crea…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C57078 -> L16:C57537  `…e.runtime.lastError,»chrome.windows.create({url:e,type:"popup",state:"normal",focused:!0,width:250,height:s,top:t,left:n},function(e){chrome. …⟨tainted span: 459 chars⟩… :"per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})«}):chrome.windows.cr…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C57540 -> L16:C57999  `…Error})})},1e3)})}):»chrome.windows.create({url:e,type:"popup",state:"normal",focused:!0,width:250,height:s,top:t,left:n},function(e){chrome. …⟨tainted span: 459 chars⟩… :"per-tab"},function(){chrome.runtime.lastError,chrome.tabs.setZoom(c,.2,function(){chrome.runtime.lastError})})},1e3)})«},300)}function lnch…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (35 raw steps → 1 distinct lines):
   1. L16 `…=50,n=20,a;var o;if(»r&&(bckGrnd.popInWin||(bckGrnd.popInWin={}),bckGrnd.popInWin.dispInfo=r,chrome.storage.local.set({bckGrnd:bckGrnd},funct …⟨tainted span: 1858 chars⟩… .request({permissions:["system.display"]},e=>{e?chrome.system.display.getInfo(function(e){lnchInWin(c,e,bckGrnd.winID)})«:lnchInWin(c,dispInf…`  · ELEMENT:object.setProperty, ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right

---

## Flow #5 — CHROME_SYSTEM_DISPLAY

- **Source**: `CHROME_SYSTEM_DISPLAY` — `lbg` L16:C73750 -> L16:C73970  `…bckGrnd},function(){})}else try{b(!1)}catch(e){}}):chrome.permissions.request({permissions:["system.display"]},e=>{if(e)»chrome.system.display.getInfo(function(e){if(e){try{b(!0)}catch(e){}bckGrnd.popInWin||(bckGrnd.popInWin={}),bckGrnd.popInWin.dispInfo=e,chrome.storage.local.set({bckGrnd:bckGrnd},function(){})}else try{b(!1)}catch(e){}})«;else try{b(!1)}catch(e){}})})}catch(e){onError("request.VAreqPerm.catch",e.message);try{b(!1)}catch(e){}}else if(h.minP…`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C62007 -> L16:C62376  `…tTimeout(function(){»chrome.windows.create({url:s.url,type:"popup",state:"normal",focused:!0,width:350,height:e,top:r,left:c},function(e){var …⟨tainted span: 369 chars⟩… puLnk,urn:s.urn,snLnk:s.snLnk,IncID:s.IncID,IncKey:s.IncKey},chrome.storage.local.set({bckGrnd:bckGrnd},function(){}))})«},l)}}else{try{r&&r(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (95 raw steps → 1 distinct lines):
   1. L16 `…dexOf("undefined")){»!t&&s.aiProcF&&bckGrnd.popInWin&&bckGrnd.popInWin.dispInfo&&(t=bckGrnd.popInWin.dispInfo);let e=300,r=50,c=20;if(t){s.ai …⟨tainted span: 13704 chars⟩… Win={}),bckGrnd.popInWin.dispInfo=e,chrome.storage.local.set({bckGrnd:bckGrnd},function(){})}else try{b(!1)}catch(e){}})«;else try{b(!1)}catc…`  · ELEMENT:object.setProperty, ELEMENT:member-element-container, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent

---

## Flow #6 — CHROME_SYSTEM_DISPLAY (system.display)

- **Source**: `CHROME_SYSTEM_DISPLAY` — `lbg` L16:C73837 -> L16:C73856  `…ons:["system.display"]},e=>{if(e)chrome.system.display.getInfo(function(e){if(e){try{b(!0)}catch(e){}bckGrnd.popInWin||(»bckGrnd.popInWin={}«),bckGrnd.popInWin.dispInfo=e,chrome.storage.local.set({bckGrnd:bckGrnd},function(){})}else try{b(!1)}catch(e){}});else …`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C62007 -> L16:C62376  `…tTimeout(function(){»chrome.windows.create({url:s.url,type:"popup",state:"normal",focused:!0,width:350,height:e,top:r,left:c},function(e){var …⟨tainted span: 369 chars⟩… puLnk,urn:s.urn,snLnk:s.snLnk,IncID:s.IncID,IncKey:s.IncKey},chrome.storage.local.set({bckGrnd:bckGrnd},function(){}))})«},l)}}else{try{r&&r(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (94 raw steps → 1 distinct lines):
   1. L16 `…dexOf("undefined")){»!t&&s.aiProcF&&bckGrnd.popInWin&&bckGrnd.popInWin.dispInfo&&(t=bckGrnd.popInWin.dispInfo);let e=300,r=50,c=20;if(t){s.ai …⟨tainted span: 13590 chars⟩… y"]},e=>{if(e)chrome.system.display.getInfo(function(e){if(e){try{b(!0)}catch(e){}bckGrnd.popInWin||(bckGrnd.popInWin={}«),bckGrnd.popInWin.d…`  · ELEMENT:object.setProperty, ELEMENT:member-element-container, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent

---

## Flow #7 — CHROME_SYSTEM_DISPLAY

- **Source**: `CHROME_SYSTEM_DISPLAY` — `lbg` L16:C97582 -> L16:C97666  `… invalid onMessageExternal access");if(n.reqPerm)try{chrome.permissions.contains({permissions:["system.display"]},e=>{e?»chrome.system.display.getInfo(function(e){popInWin("request.reqPerm.result",n,a,e)})«:chrome.permissions.request({permissions:["system.display"]},e=>{e?chrome.system.display.getInfo(function(e){popInWin("r…`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C62007 -> L16:C62376  `…tTimeout(function(){»chrome.windows.create({url:s.url,type:"popup",state:"normal",focused:!0,width:350,height:e,top:r,left:c},function(e){var …⟨tainted span: 369 chars⟩… puLnk,urn:s.urn,snLnk:s.snLnk,IncID:s.IncID,IncKey:s.IncKey},chrome.storage.local.set({bckGrnd:bckGrnd},function(){}))})«},l)}}else{try{r&&r(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (96 raw steps → 1 distinct lines):
   1. L16 `…dexOf("undefined")){»!t&&s.aiProcF&&bckGrnd.popInWin&&bckGrnd.popInWin.dispInfo&&(t=bckGrnd.popInWin.dispInfo);let e=300,r=50,c=20;if(t){s.ai …⟨tainted span: 37400 chars⟩… rmissions:["system.display"]},e=>{e?chrome.system.display.getInfo(function(e){popInWin("request.reqPerm.result",n,a,e)})«:chrome.permissions.…`  · ELEMENT:object.setProperty, ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent

---

## Flow #8 — CHROME_SYSTEM_DISPLAY (system.display)  ·  2× duplicate paths collapsed

- **Source**: `CHROME_SYSTEM_DISPLAY` — `lbg` L16:C60266 -> L16:C60279  `…nfo)}function popInWin(e,s,r,t){var c,n,a,o,d,i,b;try{if(s&&s.url&&s.url.trim().length&&-1==s.url.indexOf("undefined")){»!t&&s.aiProcF«&&bckGrnd.popInWin&&bckGrnd.popInWin.dispInfo&&(t=bckGrnd.popInWin.dispInfo);let e=300,r=50,c=20;if(t){s.aiProcF||s.vaF|…`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C62007 -> L16:C62376  `…tTimeout(function(){»chrome.windows.create({url:s.url,type:"popup",state:"normal",focused:!0,width:350,height:e,top:r,left:c},function(e){var …⟨tainted span: 369 chars⟩… puLnk,urn:s.urn,snLnk:s.snLnk,IncID:s.IncID,IncKey:s.IncKey},chrome.storage.local.set({bckGrnd:bckGrnd},function(){}))})«},l)}}else{try{r&&r(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (95 raw steps → 1 distinct lines):
   1. L16 `…dexOf("undefined")){»!t&&s.aiProcF&&bckGrnd.popInWin&&bckGrnd.popInWin.dispInfo&&(t=bckGrnd.popInWin.dispInfo);let e=300,r=50,c=20;if(t){s.ai …⟨tainted span: 2110 chars⟩… puLnk,urn:s.urn,snLnk:s.snLnk,IncID:s.IncID,IncKey:s.IncKey},chrome.storage.local.set({bckGrnd:bckGrnd},function(){}))})«},l)}}else{try{r&&r(…`  · ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent

---

## Flow #9 — CHROME_SYSTEM_DISPLAY

- **Source**: `CHROME_SYSTEM_DISPLAY` — `lbg` L16:C97733 -> L16:C97818  `…unction(e){popInWin("request.reqPerm.result",n,a,e)}):chrome.permissions.request({permissions:["system.display"]},e=>{e?»chrome.system.display.getInfo(function(e){popInWin("request.reqPerm.granted",n,a,e)})«:popInWin("request.reqPerm.NOT.granted",n,a,dispInfo)})})}catch(e){onError("onMessageExternal.reqPerm.catch",e.message),…`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `lbg` L16:C62007 -> L16:C62376  `…tTimeout(function(){»chrome.windows.create({url:s.url,type:"popup",state:"normal",focused:!0,width:350,height:e,top:r,left:c},function(e){var …⟨tainted span: 369 chars⟩… puLnk,urn:s.urn,snLnk:s.snLnk,IncID:s.IncID,IncKey:s.IncKey},chrome.storage.local.set({bckGrnd:bckGrnd},function(){}))})«},l)}}else{try{r&&r(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (62 raw steps → 1 distinct lines):
   1. L16 `…dexOf("undefined")){»!t&&s.aiProcF&&bckGrnd.popInWin&&bckGrnd.popInWin.dispInfo&&(t=bckGrnd.popInWin.dispInfo);let e=300,r=50,c=20;if(t){s.ai …⟨tainted span: 37552 chars⟩… missions:["system.display"]},e=>{e?chrome.system.display.getInfo(function(e){popInWin("request.reqPerm.granted",n,a,e)})«:popInWin("request.r…`  · ELEMENT:object.setProperty, ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent

---

## Flow #10 — JQUERY_ELEMENT_VAL (#jdjt)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/lead` L23:C31894 -> L23:C31895  `…a(n)}catch(e){onError("popListDefinition:",e.message,!1)}}function listDefinitionOnSav(){var e=$("#jdjt"),t=e.val();if(!»t«.trim().length)return e.addClass("hl").focus().val(""),!1;$.ajax({url:gURLs+"AJAX_ProjectDef",data:{gVer:extVer,aID:user…`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `js/lead` L23:C31953 -> L23:C32100  `…unction listDefinitionOnSav(){var e=$("#jdjt"),t=e.val();if(!t.trim().length)return e.addClass("hl").focus().val(""),!1;»$.ajax({url:gURLs+"AJAX_ProjectDef",data:{gVer:extVer,aID:user.aID,uID:user.uID,pID:0,fid:"pt",pt:t,gbF:!0},timeout:0,type:"POST",dataType:"json"})«.done(function(e){listDefinitionCallBack(e)}).fail(function(e,t,s){onAjaxError("listDefinitionOnSav.AJAX_ProjectDef",e,t…`
  - `JQUERY_AJAX_DATA` (https://aws.leadleaper.net/AJAX_ProjectDef) — `js/lead` L23:C31953 -> L23:C32100  `…unction listDefinitionOnSav(){var e=$("#jdjt"),t=e.val();if(!t.trim().length)return e.addClass("hl").focus().val(""),!1;»$.ajax({url:gURLs+"AJAX_ProjectDef",data:{gVer:extVer,aID:user.aID,uID:user.uID,pID:0,fid:"pt",pt:t,gbF:!0},timeout:0,type:"POST",dataType:"json"})«.done(function(e){listDefinitionCallBack(e)}).fail(function(e,t,s){onAjaxError("listDefinitionOnSav.AJAX_ProjectDef",e,t…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (12 raw steps → 1 distinct lines):
   1. L23 `…jdjt"),t=e.val();if(»!t.trim().length)return e.addClass("hl").focus().val(""),!1;$.ajax({url:gURLs+"AJAX_ProjectDef",data:{gVer:extVer,aID:us …⟨tainted span: 332 chars⟩… (function(e){listDefinitionCallBack(e)}).fail(function(e,t,s){onAjaxError("listDefinitionOnSav.AJAX_ProjectDef",e,t,s)})«}function listDefini…`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:unary, ELEMENT:object.setProperty

---
