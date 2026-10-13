# Source-level Taint Flow — ailcmbgekjpnablpdkmaaccecekgdhlh 3.1.33

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L6:C24365 -> L6:C24366  `…(o){console.warn("Error sending response",o.message)}},i=a=>(console.error(a),t({error:{message:a.message}}));return Xh(»e«,r).then(n).catch(i),!0};chrome.runtime.onMessage.addListener(Fi);chrome.runtime.onMessageExternal.addListener(Fi);(D?ch…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (wkTabCache) — `background` L5:C15079 -> L5:C15102  `… ja=N($l()),Kd=N(ef()),kd=N(Va());var Ae=()=>D?browser.storage:chrome.storage,Ga=Promise.resolve(),or={set(e,r){r!=null?»Ae().local.set({[e]:r})«:Ae().local.remove(e)},async get(e,r){try{return(await Ae().local.get(e))[e]||r}catch{return r}},delete(e){Ae().local.re…`
  - `CHROME_LOCAL_STORAGE` (settings) — `background` L5:C15079 -> L5:C15102  `… ja=N($l()),Kd=N(ef()),kd=N(Va());var Ae=()=>D?browser.storage:chrome.storage,Ga=Promise.resolve(),or={set(e,r){r!=null?»Ae().local.set({[e]:r})«:Ae().local.remove(e)},async get(e,r){try{return(await Ae().local.get(e))[e]||r}catch{return r}},delete(e){Ae().local.re…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (13280 raw steps → 2 distinct lines):
   1. L6 `…,focus:r,query:t={},»useExtendedDef:n,useHash:i=!1,workspaceId:a})=>{let o=e,s=[];if(o===void 0){let h=await De();o=h.id,s=h.tabs||[]}let c=s …⟨tainted span: 22031 chars⟩… sending response",o.message)}},i=a=>(console.error(a),t({error:{message:a.message}}));return Xh(e,r).then(n).catch(i),!0«};chrome.runtime.onM…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:logical-left, ELEMENT:object.setProperty, ASSIGN:unary, ELEMENT:destructure-property[useExtendedDef], ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:conditional-alternate, ELEMENT:destructure-property[args], ELEMENT:destructure-property[path], ELEMENT:destructure-property[tabCacheWinId], ELEMENT:member-element-container, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-right, COPY:object-spread, ASSIGN:conditional-consequent, ITERATE:loop.iteration, ASSIGN:template-literal
   2. L5 (→L6) `…olve(),or={set(e,r){»r!=null?Ae().local.set({[e]:r}):Ae().local.remove(e)},async get(e,r){try{return(await Ae().local.get(e))[e]||r}catch{ret …⟨tainted span: 20198 chars⟩… .closeIfEmpty()}},jr=async(e,r=!1)=>{let{discardBlacklist:t,preventAudibleDiscard:n,tabCacheWinId:i}=await _,a=t.split(`«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:object.setProperty, RETURN:parseInt, ASSIGN:logical-left, ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:conditional-consequent, ASSIGN:template-literal, RETURN:encodeURIComponent, ELEMENT:member.length, ELEMENT:implicit.add, RETURN:array.join, ELEMENT:member-element-container, ELEMENT:destructure-property[discardBlacklist], ELEMENT:destructure-property[preventAudibleDiscard], ELEMENT:destructure-property[tabCacheWinId], RETURN:fallback-return, COPY:object-spread, ITERATE:loop.iteration, ASSIGN:conditional-alternate, ASSIGN:binary-right

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('settings') in background)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L6:C24365 -> L6:C24366  `…(o){console.warn("Error sending response",o.message)}},i=a=>(console.error(a),t({error:{message:a.message}}));return Xh(»e«,r).then(n).catch(i),!0};chrome.runtime.onMessage.addListener(Fi);chrome.runtime.onMessageExternal.addListener(Fi);(D?ch…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (settings) — `background` L5:C15079 -> L5:C15102  `… ja=N($l()),Kd=N(ef()),kd=N(Va());var Ae=()=>D?browser.storage:chrome.storage,Ga=Promise.resolve(),or={set(e,r){r!=null?»Ae().local.set({[e]:r})«:Ae().local.remove(e)},async get(e,r){try{return(await Ae().local.get(e))[e]||r}catch{return r}},delete(e){Ae().local.re…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (13283 raw steps → 2 distinct lines):
   1. L6 `…,focus:r,query:t={},»useExtendedDef:n,useHash:i=!1,workspaceId:a})=>{let o=e,s=[];if(o===void 0){let h=await De();o=h.id,s=h.tabs||[]}let c=s …⟨tainted span: 22031 chars⟩… sending response",o.message)}},i=a=>(console.error(a),t({error:{message:a.message}}));return Xh(e,r).then(n).catch(i),!0«};chrome.runtime.onM…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:logical-left, ELEMENT:object.setProperty, ASSIGN:unary, ELEMENT:destructure-property[useExtendedDef], ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:conditional-alternate, ELEMENT:destructure-property[args], ELEMENT:destructure-property[path], ELEMENT:destructure-property[tabCacheWinId], ELEMENT:member-element-container, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-right, COPY:object-spread, ASSIGN:conditional-consequent, ITERATE:loop.iteration, ASSIGN:template-literal
   2. L5 (→L6) `…olve(),or={set(e,r){»r!=null?Ae().local.set({[e]:r}):Ae().local.remove(e)},async get(e,r){try{return(await Ae().local.get(e))[e]||r}catch{ret …⟨tainted span: 20198 chars⟩… .closeIfEmpty()}},jr=async(e,r=!1)=>{let{discardBlacklist:t,preventAudibleDiscard:n,tabCacheWinId:i}=await _,a=t.split(`«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:object.setProperty, RETURN:parseInt, ASSIGN:logical-left, ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:conditional-consequent, ASSIGN:template-literal, RETURN:encodeURIComponent, ELEMENT:member.length, ELEMENT:implicit.add, RETURN:array.join, ELEMENT:member-element-container, ELEMENT:destructure-property[discardBlacklist], ELEMENT:destructure-property[preventAudibleDiscard], ELEMENT:destructure-property[tabCacheWinId], RETURN:fallback-return, COPY:object-spread, ITERATE:loop.iteration, ASSIGN:conditional-alternate, ASSIGN:binary-right, STORAGE:STORAGE_FLOW[area: local, key: settings, sender: background, receiver: background]

---
