# Source-level Taint Flow — jpbjcnkcffbooppibceonlgknpkniiff 3.3.18

- Source type: CRX
- Files with issues: 6 / 7
- Distinct taint flows: 7  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 21 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.hostname)

- **Source**: `DOCUMENT_LOCATION` — `isolated` L1:C26894 -> L1:C26911  `…bs,ye.currentCinema===this&&delete ye.currentCinema)}}let Ce=!1,Ee=!1,Se=!1,ke=!1,Te=!1,Me=!1,xe=!1;"www.netflix.com"===»location.hostname«?Ce=!0:(document.URL||"").startsWith("www.amazon")?Ee=!0:"www.bilibili.com"===location.hostname?Se=!0:"www.youtube.com"=…`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (unknown) — `isolated` L1:C70792 -> L1:C70821  `…!1}}return b.result}()&&(s.isDip=!0),s}(nt.tabInfo,[...this.media]),t={[this.scopeStorageKey]:e};chrome.storage.session?»chrome.storage.session.set(t)«:chrome.runtime.sendMessage({type:"SET_SESSION",override:t})};sendUpdateDeb=L()(this.sendUpdate,500,{leading:!0,trailing…`
- **Sanitized**: YES
- **Frame**: `CS_1`

- **Propagation** (593 raw steps → 1 distinct lines):
   1. L1 `…nction E(e){const t=»e.toLowerCase().split(".");if(t.length<2)return{baseName:t[0],registeredDomain:t[0]};let i;if("www"===t[0]&&t.length>1)i …⟨tainted span: 66777 chars⟩… window}}catch{b={result:!1}}return b.result}()&&(s.isDip=!0),s}(nt.tabInfo,[...this.media]),t={[this.scopeStorageKey]:e}«;chrome.storage.sess…`  · ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:template-literal, INITIAL:Uint8Array.constructor, ASSIGN:logical-left, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:object.setProperty, ASSIGN:logical-right, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:conditional-consequent, ASSIGN:unary, ELEMENT:destructure-property[baseName], ELEMENT:destructure-property[registeredDomain], ITERATE:loop.iteration

---

## Flow #2 — DOCUMENT_URL (document.URL)

- **Source**: `DOCUMENT_URL` — `isolated` L1:C26919 -> L1:C26935  `…s&&delete ye.currentCinema)}}let Ce=!1,Ee=!1,Se=!1,ke=!1,Te=!1,Me=!1,xe=!1;"www.netflix.com"===location.hostname?Ce=!0:(»document.URL||""«).startsWith("www.amazon")?Ee=!0:"www.bilibili.com"===location.hostname?Se=!0:"www.youtube.com"===location.hostname?ke=!…`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (unknown) — `isolated` L1:C70792 -> L1:C70821  `…!1}}return b.result}()&&(s.isDip=!0),s}(nt.tabInfo,[...this.media]),t={[this.scopeStorageKey]:e};chrome.storage.session?»chrome.storage.session.set(t)«:chrome.runtime.sendMessage({type:"SET_SESSION",override:t})};sendUpdateDeb=L()(this.sendUpdate,500,{leading:!0,trailing…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (8 raw steps → 1 distinct lines):
   1. L1 `…tion.hostname?Ce=!0:»(document.URL||"").startsWith("www.amazon")?Ee=!0:"www.bilibili.com"===location.hostname?Se=!0:"www.youtube.com"===locat …⟨tainted span: 43850 chars⟩… window}}catch{b={result:!1}}return b.result}()&&(s.isDip=!0),s}(nt.tabInfo,[...this.media]),t={[this.scopeStorageKey]:e}«;chrome.storage.sess…`  · ASSIGN:logical-left, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty

---

## Flow #3 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `isolated` L1:C69113 -> L1:C70540  `…result);var n;const »s={tabInfo:{...e},title:document.title,displayTitle:k(navigator.mediaSession?.metadata?.title||document.title,i),domain: …⟨tainted span: 1427 chars⟩… uration&&!i.isVideo||e.webkitAudioDecodedByteCount||e.mozHasAudio)&&(i.hasAudioTrack=!0),i}(e)),creationTime:Date.now()}«;var o;return functi…`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (unknown) — `isolated` L1:C70792 -> L1:C70821  `…!1}}return b.result}()&&(s.isDip=!0),s}(nt.tabInfo,[...this.media]),t={[this.scopeStorageKey]:e};chrome.storage.session?»chrome.storage.session.set(t)«:chrome.runtime.sendMessage({type:"SET_SESSION",override:t})};sendUpdateDeb=L()(this.sendUpdate,500,{leading:!0,trailing…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (572 raw steps → 1 distinct lines):
   1. L1 `…function k(e,t,i=3){»return C&&C.title===e||(C={title:e,result:T(e,t,i)}),C.result}function T(e,t,i=3){let n=e?.trim()||"";if(!(n&&t&&t.baseN …⟨tainted span: 65822 chars⟩… window}}catch{b={result:!1}}return b.result}()&&(s.isDip=!0),s}(nt.tabInfo,[...this.media]),t={[this.scopeStorageKey]:e}«;chrome.storage.sess…`  · ELEMENT:object.setProperty, ASSIGN:logical-right, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:unary, ASSIGN:binary-right, ELEMENT:implicit.add, ASSIGN:conditional-alternate, ASSIGN:binary-left

---

## Flow #4 — SCREEN_INFO (screen.width)

- **Source**: `SCREEN_INFO` — `background` L1:C12831 -> L1:C12843  `…]))}function Se(){if("undefined"==typeof screen||!screen)return{width:1e3,height:800,left:200,top:200};const e=Math.min(»screen.width«-100,1e3),t=Math.min(screen.height-100,800),a="number"==typeof screenLeft&&Number.isFinite(screenLeft)?screenLeft:0,n="n…`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `background` L1:C14356 -> L1:C14380  `…idth)||Number.isFinite(e.height)?{...e,...Me({left:e.left,top:e.top,width:e.width,height:e.height})}:e;try{return await »chrome.windows.create(t)«}catch(e){const{left:a,top:n,...r}=t;try{return await chrome.windows.create(r)}catch(e){const{width:t,height:a,...n}=r;r…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1474 raw steps → 1 distinct lines):
   1. L1 `…ion fe(e,t,a){let n=»a;return null!=e&&(n=Math.max(e,n)),null!=t&&(n=Math.min(t,n)),n}function me(e,t,a){const n=t-e+1e-11;return t<e&&([e,t] …⟨tainted span: 23477 chars⟩… eRegex:""}}(e.v);return e.contains&&(t.type="CONTAINS"),t}),blockParts:[]},hideMediaView:ye(),holdToSpeed:ye()?2:void 0}«}function St(e){cons…`  · ASSIGN:binary-left, RETURN:Math.min, ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:binary-right, ELEMENT:implicit.add, ELEMENT:member-element-container, RETURN:Math.round, RETURN:Math.max, ASSIGN:logical-left, ASSIGN:logical-right, COPY:object-spread

---

## Flow #5 — SCREEN_INFO (screen.height)

- **Source**: `SCREEN_INFO` — `background` L1:C12864 -> L1:C12877  `…=typeof screen||!screen)return{width:1e3,height:800,left:200,top:200};const e=Math.min(screen.width-100,1e3),t=Math.min(»screen.height«-100,800),a="number"==typeof screenLeft&&Number.isFinite(screenLeft)?screenLeft:0,n="number"==typeof screenTop&&Number.i…`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `background` L1:C14356 -> L1:C14380  `…idth)||Number.isFinite(e.height)?{...e,...Me({left:e.left,top:e.top,width:e.width,height:e.height})}:e;try{return await »chrome.windows.create(t)«}catch(e){const{left:a,top:n,...r}=t;try{return await chrome.windows.create(r)}catch(e){const{width:t,height:a,...n}=r;r…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1474 raw steps → 1 distinct lines):
   1. L1 `…ion fe(e,t,a){let n=»a;return null!=e&&(n=Math.max(e,n)),null!=t&&(n=Math.min(t,n)),n}function me(e,t,a){const n=t-e+1e-11;return t<e&&([e,t] …⟨tainted span: 23477 chars⟩… eRegex:""}}(e.v);return e.contains&&(t.type="CONTAINS"),t}),blockParts:[]},hideMediaView:ye(),holdToSpeed:ye()?2:void 0}«}function St(e){cons…`  · ASSIGN:binary-left, RETURN:Math.min, ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:binary-right, ELEMENT:implicit.add, ELEMENT:member-element-container, RETURN:Math.round, RETURN:Math.max, ASSIGN:logical-left, ASSIGN:logical-right, COPY:object-spread

---

## Flow #6 — SCREEN_INFO (screen.width)

- **Source**: `SCREEN_INFO` — `options` L1:C111297 -> L1:C111309  `…n[0]}function M(){if("undefined"==typeof screen||!screen)return{width:1e3,height:800,left:200,top:200};const e=Math.min(»screen.width«-100,1e3),t=Math.min(screen.height-100,800),n="number"==typeof screenLeft&&Number.isFinite(screenLeft)?screenLeft:0,i="n…`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `options` L1:C112816 -> L1:C112840  `…width)||Number.isFinite(e.height)?{...e,...w({left:e.left,top:e.top,width:e.width,height:e.height})}:e;try{return await »chrome.windows.create(t)«}catch(e){const{left:n,top:i,...a}=t;try{return await chrome.windows.create(a)}catch(e){const{width:t,height:n,...i}=a;r…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (409 raw steps → 1 distinct lines):
   1. L1 `…tion o(e,t,n){let i=»n;return null!=e&&(i=Math.max(e,i)),null!=t&&(i=Math.min(t,i)),i}function s(e,t){const n=10**t;return Math.round(e*n)/n} …⟨tainted span: 3685 chars⟩… Number.isFinite(e.width)||Number.isFinite(e.height)?{...e,...w({left:e.left,top:e.top,width:e.width,height:e.height})}:e«;try{return await ch…`  · ASSIGN:binary-left, RETURN:Math.min, ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:binary-right, ELEMENT:implicit.add, ELEMENT:member-element-container, RETURN:Math.round, RETURN:Math.max, ASSIGN:logical-left, ASSIGN:logical-right, COPY:object-spread

---

## Flow #7 — SCREEN_INFO (screen.height)

- **Source**: `SCREEN_INFO` — `options` L1:C111330 -> L1:C111343  `…=typeof screen||!screen)return{width:1e3,height:800,left:200,top:200};const e=Math.min(screen.width-100,1e3),t=Math.min(»screen.height«-100,800),n="number"==typeof screenLeft&&Number.isFinite(screenLeft)?screenLeft:0,i="number"==typeof screenTop&&Number.i…`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `options` L1:C112816 -> L1:C112840  `…width)||Number.isFinite(e.height)?{...e,...w({left:e.left,top:e.top,width:e.width,height:e.height})}:e;try{return await »chrome.windows.create(t)«}catch(e){const{left:n,top:i,...a}=t;try{return await chrome.windows.create(a)}catch(e){const{width:t,height:n,...i}=a;r…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (409 raw steps → 1 distinct lines):
   1. L1 `…tion o(e,t,n){let i=»n;return null!=e&&(i=Math.max(e,i)),null!=t&&(i=Math.min(t,i)),i}function s(e,t){const n=10**t;return Math.round(e*n)/n} …⟨tainted span: 3685 chars⟩… Number.isFinite(e.width)||Number.isFinite(e.height)?{...e,...w({left:e.left,top:e.top,width:e.width,height:e.height})}:e«;try{return await ch…`  · ASSIGN:binary-left, RETURN:Math.min, ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:binary-right, ELEMENT:implicit.add, ELEMENT:member-element-container, RETURN:Math.round, RETURN:Math.max, ASSIGN:logical-left, ASSIGN:logical-right, COPY:object-spread

---
