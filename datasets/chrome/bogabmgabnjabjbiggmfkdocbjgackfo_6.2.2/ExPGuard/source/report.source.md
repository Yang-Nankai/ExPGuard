# Source-level Taint Flow — bogabmgabnjabjbiggmfkdocbjgackfo 6.2.2

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C10242 -> L1:C10243  `…hrome.runtime.onMessageExternal.addListener(async(t,o,s)=>{try{let o=await u();switch(o.collections||(o.collections=[]),»t«.action){case"addPack":{const{collection:r,pack:i}=t;if(o.collections.some(({id:e})=>e===r.id)){const e=o.collections.fi…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `background` L1:C3458 -> L1:C3519  `…rage.local.get(o=>{if(chrome.runtime.lastError)return t(chrome.runtime.lastError);e(o)})}),g=e=>new Promise((t,o)=>{try{»chrome.storage.local.set(e,function(){t({status:!0,data:e})})«}catch(e){o(e)}});function h(e,t){return new Promise(async(o,s)=>{fetch(e).then(e=>e.blob()).then(createImageBitmap).the…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L1:C13822 -> L1:C13826  `…ointer.image,await w(t.data.selectedCursorPack,e.size),s({status:!0,action:"set_config"});break}await g(t.data).then(e=>»s(e)«)}})}),chrome.runtime.onMessage.addListener(async(e,t,o)=>{const{action:s}=e;if("getOffset"===s)o({getOffset:!1})}),chro…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1:C3585 -> L1:C3593  `…storage.local.set(e,function(){t({status:!0,data:e})})}catch(e){o(e)}});function h(e,t){return new Promise(async(o,s)=>{»fetch(e)«.then(e=>e.blob()).then(createImageBitmap).then(function(e){const s=new OffscreenCanvas(t,t);s.getContext("2d").drawImag…`  (url-control=FULL)
  - `CHROME_LOCAL_STORAGE` (selectedCursorPack) — `background` L1:C4533 -> L1:C4727  `…Y=i.nextCursorOffsetY,o.pointer.offsetSizeX=i.nextPointerOffsetX,o.pointer.offsetSizeY=i.nextPointerOffsetY,o}(e,t);try{»chrome.storage.local.set({selectedCursorPack:o,size:t},()=>{chrome.tabs.query({active:!0,currentWindow:!0},e=>{e.forEach(e=>{chrome.tabs.sendMessage(e.id,{action:"changeCursorPack"},e=>{})})})})«}catch(e){}return o}Array.prototype.current=0,Array.prototype.next=function(){return this[++this.current]},Array.prototy…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L1:C12192 -> L1:C12277  `…tions=[{...r,added:(new Date).toISOString(),items:t.map(t=>e(t,s))},...o.collections]}await chrome.storage.local.set(o),»s({status:"success",message:`'${r.name}' Collection added/overwritten successfully`})«;break}case"toogleFavoritePack":{const{collection:r,pack:i}=t;if(!o.collections.some(({id:e})=>e===r.id)){const e={id:r.…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L1:C10939 -> L1:C11006  `…th?[n,...o.newPacks].slice(0,10):[n],{...t,items:s?t.items:[n,...t.items]}}return t}),await chrome.storage.local.set(o),»s({status:"success",message:`'${i.name}' Pack added successfully`})«;break}case"setPack":{const{collection:r,pack:i}=t;if(o.collections.some(({id:e})=>e===r.id)){const e=o.collections.find…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L1:C12918 -> L1:C13011  `…ems.map(e=>e.id===i.id?{...e,isFavorite:!e?.isFavorite}:e):[...t.items,n]}}return t}),await chrome.storage.local.set(o),»s({status:"success",message:`'${i.name}' Pack added/removed successfully to/from favorites`})«;break}case"getInstalled":case"get_config":s(o);break;case"set_config":if(t.data.selectedCursorPack){const e=t.data.sele…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L1:C11723 -> L1:C11790  `…th?[n,...o.newPacks].slice(0,10):[n],{...t,items:s?t.items:[n,...t.items]}}return t}),await chrome.storage.local.set(o),»s({status:"success",message:`'${i.name}' Pack added successfully`})«;break}case"addCollection":{const{collection:r}=t,i=o.collections.some(({id:e})=>e===r.id);if(o.collections=o.collection…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L1:C13349 -> L1:C13353  `….pointer.originalPath=e.pointer.image,await w(e,o.size),s({status:!0,action:"set_config"})}else{const e=await g(t.data);»s(e)«}break;default:s({status:"error",message:"Unknown action"})}}catch(e){}await u().then(async e=>{switch(t.action){case"ge…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2093 raw steps → 1 distinct lines):
   1. L1 `…=(e,t={})=>{const o=»e.isAnimated||!1,s=e.animationSpeed,r=e.cursors?.arrow?.image?.originalFrames||e.cursor?.originalFrames||null,i=r&&Array …⟨tainted span: 13766 chars⟩… alPath=o.pointer.image,await w(t.data.selectedCursorPack,e.size),s({status:!0,action:"set_config"});break}await g(t.data«).then(e=>s(e))}})})…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[collection], ELEMENT:destructure-property[pack], ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add, ELEMENT:destructure-property[items], COPY:object-spread, ASSIGN:binary-left, RETURN:Math.floor, RETURN:fallback-return, ASSIGN:template-literal, ASSIGN:binary-right, ELEMENT:member.length, ASSIGN:conditional-alternate, ASSIGN:unary, ELEMENT:member-element-container

---
