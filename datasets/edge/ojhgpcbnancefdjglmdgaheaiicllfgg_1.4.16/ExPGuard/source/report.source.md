# Source-level Taint Flow — ojhgpcbnancefdjglmdgaheaiicllfgg 1.4.16

- Source type: CRX
- Files with issues: 3 / 13
- Distinct taint flows: 4  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ?  ·  2× duplicate paths collapsed

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `CHROME_COOKIES_REMOVE_OPTIONS` — `assets/session-CRQg-LZl` L36:C4948 -> L36:C5011  `…;const o=await new Promise(n=>chrome.cookies.getAll({},a=>n(a.filter(r=>t.includes(r.domain)))));for(const n of o)await »chrome.cookies.remove({name:n.name,url:W(n),storeId:n.storeId})«;await l(e,()=>{window.location.reload()},[])};function W(e){let t=e.secure?"https://":"http://";return e.domain.charAt(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L36 `….host);if(!r||!a)return;const i=await new Promise(s=>chrome.cookies.getAll({},u=>s(u.filter(c=>r.includes(c.domain)))));»return{locale:a,cookies:i,host:r,storage:{[r]:{localStorage:JSON.parse(o),sessionStorage:JSON.parse(n)}}}«},Y=async e=>{if(!e){const[n]=await chrome.tabs.query({active:!0,lastFocusedWindow:!0});e=n?.id}if(!e)return;const t=awa…`  · ELEMENT:object.setProperty

---

## Flow #2 — ?  ·  2× duplicate paths collapsed

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (session) — `src/pages/background/index` L1:C365 -> L1:C392  `… H={};const _={version:H.GITHUB_REF_NAME?.replace("extension_release-","")||F.version,host_permissions:["*://*.abnb.me/"»,"*://*.airbnbaction.com/",«"*://*.airbnb.ae/","*://*.airbnb.al/","*://*.airbnb.am/","*://*.airbnb.at/","*://*.airbnb.az/","*://*.airbnb.ba/","*://*…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (5 raw steps → 2 distinct lines):
   1. L36 _(in `assets/session-CRQg-LZl`)_ `….host);if(!r||!a)return;const i=await new Promise(s=>chrome.cookies.getAll({},u=>s(u.filter(c=>r.includes(c.domain)))));»return{locale:a,cookies:i,host:r,storage:{[r]:{localStorage:JSON.parse(o),sessionStorage:JSON.parse(n)}}}«},Y=async e=>{if(!e){const[n]=await chrome.tabs.query({active:!0,lastFocusedWindow:!0});e=n?.id}if(!e)return;const t=awa…`  · ELEMENT:object.setProperty
   2. L1 `…it r(t,n),!i?.email))return;const{status:s}=await l();if(s!==a)return;console.log("Account",i),console.log("Session",n),»await u({session:n,account:i})«}});`  · ELEMENT:object.setProperty

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `src/pages/background/index` L1:C5934 -> L1:C5935  `…imeout(R,1e3)};R();chrome.runtime.onMessageExternal.addListener((e,o,t)=>{const a="src/pages/popup/index.html",{data:n}=»e«,{message:r}=n;if(!["localhost","finalytic.io","vrplatform.app"].some(s=>(o.origin||"").includes(s)))return t({exists:!0…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `src/pages/background/index` L1:C6185 -> L1:C6212  `…Origin not allowed."});if(r==="redirect"&&n.redirect_url){const{appId:s,connectionId:c,redirect_url:b}=n;t({exists:!0}),»chrome.tabs.create({url:b})«,setTimeout(()=>{s&&!c&&chrome.storage.local.set({appId:s,view:"connect-view"}),c&&chrome.storage.local.set({connectionI…`
  - `CHROME_LOCAL_STORAGE` (appId) — `src/pages/background/index` L1:C6236 -> L1:C6291  `…t_url){const{appId:s,connectionId:c,redirect_url:b}=n;t({exists:!0}),chrome.tabs.create({url:b}),setTimeout(()=>{s&&!c&&»chrome.storage.local.set({appId:s,view:"connect-view"})«,c&&chrome.storage.local.set({connectionId:c,view:"connect-view"}),chrome.system.display.getInfo({singleUnified:!0},B=>{…`
  - `CHROME_LOCAL_STORAGE` (connectionId) — `src/pages/background/index` L1:C6295 -> L1:C6357  `…ists:!0}),chrome.tabs.create({url:b}),setTimeout(()=>{s&&!c&&chrome.storage.local.set({appId:s,view:"connect-view"}),c&&»chrome.storage.local.set({connectionId:c,view:"connect-view"})«,chrome.system.display.getInfo({singleUnified:!0},B=>{const C=B[0].workArea,{top:I,left:G,height:D,width:v}=C;console.lo…`
  - `CHROME_LOCAL_STORAGE` (teamId) — `src/pages/background/index` L1:C6754 -> L1:C6797  `…d(L),top:Math.round(O)},M)})},1e3)}if(r==="team_changed"){if(!n.teamId)return t({exists:!0,message:"Missing team id."});»chrome.storage.local.set({teamId:n.teamId})«,t({exists:!0,message:"Team id was set."})}r==="token"&&(n.token?chrome.storage.local.set({accessToken:n.token}):chrome.…`
  - `CHROME_LOCAL_STORAGE` (accessToken) — `src/pages/background/index` L1:C6862 -> L1:C6909  `…team id."});chrome.storage.local.set({teamId:n.teamId}),t({exists:!0,message:"Team id was set."})}r==="token"&&(n.token?»chrome.storage.local.set({accessToken:n.token})«:chrome.storage.local.remove("accessToken"),t({exists:!0,message:"Received token."}))});const p=_.host_permissions?.map(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (81 raw steps → 1 distinct lines):
   1. L1 `…/popup/index.html",{»data:n}=e,{message:r}=n;if(!["localhost","finalytic.io","vrplatform.app"].some(s=>(o.origin||"").includes(s)))return t({ …⟨tainted span: 983 chars⟩… teamId}),t({exists:!0,message:"Team id was set."})}r==="token"&&(n.token?chrome.storage.local.set({accessToken:n.token})«:chrome.storage.loca…`  · ASSIGN:identifier, ELEMENT:destructure-property[data], ELEMENT:destructure-property[message], ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[appId], ELEMENT:destructure-property[connectionId], ELEMENT:destructure-property[redirect_url], ASSIGN:unary, ELEMENT:object.setProperty

---

## Flow #4 — ?  ·  2× duplicate paths collapsed

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `CHROME_COOKIES_REMOVE_OPTIONS` — `assets/session-CRQg-LZl` L36:C4948 -> L36:C5011  `…;const o=await new Promise(n=>chrome.cookies.getAll({},a=>n(a.filter(r=>t.includes(r.domain)))));for(const n of o)await »chrome.cookies.remove({name:n.name,url:W(n),storeId:n.storeId})«;await l(e,()=>{window.location.reload()},[])};function W(e){let t=e.secure?"https://":"http://";return e.domain.charAt(…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (43 raw steps → 2 distinct lines):
   1. L36 _(in `assets/session-CRQg-LZl`)_ `….host);if(!r||!a)return;const i=await new Promise(s=>chrome.cookies.getAll({},u=>s(u.filter(c=>r.includes(c.domain)))));»return{locale:a,cookies:i,host:r,storage:{[r]:{localStorage:JSON.parse(o),sessionStorage:JSON.parse(n)}}}«},Y=async e=>{if(!e){const[n]=await chrome.tabs.query({active:!0,lastFocusedWindow:!0});e=n?.id}if(!e)return;const t=awa…`  · ELEMENT:object.setProperty
   2. L1 `…b})=>{y.payoutsUrl&&»await y?.payoutsUrl?.({session:b,tabId:t,setPayoutsProgress:l,setPayoutsData:f})},K=async(y,b)=>{if(!b)return;const V=aw …⟨tainted span: 845 chars⟩… onst b=await le(t);if(y.payoutsUrl)try{if(!i)throw Error("Team ID is missing");x(!0),await re({integration:y,session:b})«,x(!1),s("payout-suc…`  · ELEMENT:object.setProperty

---
