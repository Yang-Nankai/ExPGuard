# Source-level Taint Flow — effdbpeggelllpfkjppbokhmmiinhlmg 2.3.3

- Source type: CRX
- Files with issues: 5 / 6
- Distinct taint flows: 11  (collapsed from 11 raw issue entries)
- Sinkless sources skipped: 59 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `background/service_worker` L4:C2200 -> L4:C2201  `…find(t=>t.origin===e)}(t))return void e.disconnect();let r=!1,n=!0;e.onMessage.addListener(a=>{r||(r=!0,(async()=>{if(!(»a«&&"object"==typeof a&&a.type===s&&"string"==typeof a.nonce&&a.nonce.length>=16&&"string"==typeof a.origin&&a.origin.leng…`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `background/service_worker` L1:C5164 -> L1:C5250  `…archParams.set("requestId",e),r.searchParams.set("nonce",t.nonce),r.searchParams.set("origin",t.origin);try{let e=await »chrome.windows.create({url:r.toString(),type:"popup",width:480,height:560,focused:!0})«;return e?.id??null}catch(e){return console.warn(o,"popup open failed",e),null}}async function P(e,t,r){if(t.resolved)re…`
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background/service_worker` L4:C2541 -> L4:C2557  `…Message({ok:!1,reason:"ORIGIN_MISMATCH"}),e.disconnect();return}if(await L(a.origin)){let t=await N(a);if(!n)return;try{»e.postMessage(t)«,e.disconnect()}catch(e){console.warn(o,"site port post failed",e)}return}let r=crypto.randomUUID(),i=await x(r,a);if(nu…`
- **Sanitized**: YES
- **Frame**: `BG_1`

- **Propagation** (242 raw steps → 2 distinct lines):
   1. L4 `…(r=!0,(async()=>{if(»!(a&&"object"==typeof a&&a.type===s&&"string"==typeof a.nonce&&a.nonce.length>=16&&"string"==typeof a.origin&&a.origin.l …⟨tainted span: 647 chars⟩… SED"}),e.disconnect();return}n?A.set(r,{sitePort:e,origin:a.origin,nonce:a.nonce,popupPort:null,windowId:i,resolved:!1})«:chrome.windows.remo…`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:member.length, ASSIGN:unary, ASSIGN:binary-right, ELEMENT:object.setProperty
   2. L1 `…,t){let r=await w(),»n={...e,timestamp:Date.now(),nonce:t?.nonce??crypto.randomUUID(),keyId:r.keyId},a=I(n),i=new TextEncoder().encode(a),o=a …⟨tainted span: 3010 chars⟩… origin",t.origin);try{let e=await chrome.windows.create({url:r.toString(),type:"popup",width:480,height:560,focused:!0})«;return e?.id??null}…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:logical-left, ASSIGN:binary-right, RETURN:json.stringify, RETURN:fallback-return, ASSIGN:template-literal, ELEMENT:implicit.add, INITIAL:Uint8Array.constructor, RETURN:URLSearchParams.append, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href, ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative

---

## Flow #2 — ELEMENT_VALUE (translationLanguage)

- **Source**: `ELEMENT_VALUE` — `action/default_popup` L80:C33886 -> L80:C35878  `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (translationLanguage) — `action/default_popup` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (213 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_VALUE (uiLanguage)

- **Source**: `ELEMENT_VALUE` — `action/default_popup` L80:C33886 -> L80:C35878  `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (uiLanguage) — `action/default_popup` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (213 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · ELEMENT:object.setProperty

---

## Flow #4 — ELEMENT_VALUE (globalLyricOffset)

- **Source**: `ELEMENT_VALUE` — `action/default_popup` L80:C35648 -> L80:C35710  `…rAll(".controls-shown-picker .control-cell"),e=>e.dataset.control).filter(e=>!!e)).length?t:[...o.Fm],globalLyricOffset:»parseFloat(document.getElementById("globalLyricOffset").value)«||0,richsyncOffsetTrim:parseFloat(document.getElementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(docu…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (globalLyricOffset) — `action/default_popup` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (639 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · RETURN:parseFloat, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE (richsyncOffsetTrim)

- **Source**: `ELEMENT_VALUE` — `action/default_popup` L80:C35733 -> L80:C35796  `…ngth?t:[...o.Fm],globalLyricOffset:parseFloat(document.getElementById("globalLyricOffset").value)||0,richsyncOffsetTrim:»parseFloat(document.getElementById("richsyncOffsetTrim").value)«||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}};function r$(e){let t=document.queryS…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (richsyncOffsetTrim) — `action/default_popup` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (639 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · RETURN:parseFloat, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #6 — ELEMENT_VALUE (lineOffsetTrim)

- **Source**: `ELEMENT_VALUE` — `action/default_popup` L80:C35815 -> L80:C35874  `…Offset").value)||0,richsyncOffsetTrim:parseFloat(document.getElementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:»parseFloat(document.getElementById("lineOffsetTrim").value)«||0}};function r$(e){let t=document.querySelector(".controls-shown-picker");if(t&&Array.isArray(e))for(let i of e){let e…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (lineOffsetTrim) — `action/default_popup` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (639 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · RETURN:parseFloat, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #7 — ELEMENT_VALUE (translationLanguage)

- **Source**: `ELEMENT_VALUE` — `options_ui/page` L80:C33886 -> L80:C35878  `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (translationLanguage) — `options_ui/page` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (213 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · ELEMENT:object.setProperty

---

## Flow #8 — ELEMENT_VALUE (uiLanguage)

- **Source**: `ELEMENT_VALUE` — `options_ui/page` L80:C33886 -> L80:C35878  `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (uiLanguage) — `options_ui/page` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (213 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · ELEMENT:object.setProperty

---

## Flow #9 — ELEMENT_VALUE (globalLyricOffset)

- **Source**: `ELEMENT_VALUE` — `options_ui/page` L80:C35648 -> L80:C35710  `…rAll(".controls-shown-picker .control-cell"),e=>e.dataset.control).filter(e=>!!e)).length?t:[...o.Fm],globalLyricOffset:»parseFloat(document.getElementById("globalLyricOffset").value)«||0,richsyncOffsetTrim:parseFloat(document.getElementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(docu…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (globalLyricOffset) — `options_ui/page` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (639 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · RETURN:parseFloat, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #10 — ELEMENT_VALUE (richsyncOffsetTrim)

- **Source**: `ELEMENT_VALUE` — `options_ui/page` L80:C35733 -> L80:C35796  `…ngth?t:[...o.Fm],globalLyricOffset:parseFloat(document.getElementById("globalLyricOffset").value)||0,richsyncOffsetTrim:»parseFloat(document.getElementById("richsyncOffsetTrim").value)«||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}};function r$(e){let t=document.queryS…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (richsyncOffsetTrim) — `options_ui/page` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (639 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · RETURN:parseFloat, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #11 — ELEMENT_VALUE (lineOffsetTrim)

- **Source**: `ELEMENT_VALUE` — `options_ui/page` L80:C35815 -> L80:C35874  `…Offset").value)||0,richsyncOffsetTrim:parseFloat(document.getElementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:»parseFloat(document.getElementById("lineOffsetTrim").value)«||0}};function r$(e){let t=document.querySelector(".controls-shown-picker");if(t&&Array.isArray(e))for(let i of e){let e…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (lineOffsetTrim) — `options_ui/page` L80:C36081 -> L80:C36256  `….isArray(e))for(let i of e){let e=t.querySelector(`.control-cell[data-control="${i}"]`);e&&t.appendChild(e)}}let rF=e=>{»chrome.storage.sync.set(e,()=>{chrome.tabs.query({url:"https://music.youtube.com/*"},t=>{t.forEach(t=>{chrome.tabs.sendMessage(t.id,{action:"updateSettings",settings:e})})})})«},rz=e=>{let t=document.getElementById("status");t.innerText=e,t.classList.add("active"),setTimeout(()=>{t.classList.rem…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (639 raw steps → 1 distinct lines):
   1. L80 `…t="d_"+t),i.push(t)}»return{isLogsEnabled:document.getElementById("logs").checked,isAutoSwitchEnabled:document.getElementById("autoSwitch").c …⟨tainted span: 1992 chars⟩… ementById("richsyncOffsetTrim").value)||0,lineOffsetTrim:parseFloat(document.getElementById("lineOffsetTrim").value)||0}«};function r$(e){let…`  · RETURN:parseFloat, ASSIGN:logical-left, ELEMENT:object.setProperty

---
