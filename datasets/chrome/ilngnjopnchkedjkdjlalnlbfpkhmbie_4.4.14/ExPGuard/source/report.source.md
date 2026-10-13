# Source-level Taint Flow — ilngnjopnchkedjkdjlalnlbfpkhmbie 4.4.14

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 2  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C10832 -> L1:C10833  `…al.set({notifications:t})})().then((t=>{}))})),chrome.runtime.onMessageExternal.addListener((async(t,e,a)=>{console.log(»t«),await s().then((async e=>{switch(t.action){case"addCollection":if(t.data.collection.isCustomCursor){const s={collectio…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (current) — `background` L1:C13414 -> L1:C13507  `…=>{a({status:!0,action:"addItem"})}))}break}case"setItem":{const{data:e}=t,{item:s,animationType:r}=e;s.animationType=r,»chrome.storage.local.set({current:s,animationType:r},(()=>{a({status:!0,action:"setItem"})}))«;break}case"removeItem":{const{data:s}=t,{itemId:r}=s,o=e.collections;o.forEach((t=>{const e=t.items.findIndex((t=>t.id=…`
  - `CHROME_LOCAL_STORAGE` (animationType) — `background` L1:C13414 -> L1:C13507  `…=>{a({status:!0,action:"addItem"})}))}break}case"setItem":{const{data:e}=t,{item:s,animationType:r}=e;s.animationType=r,»chrome.storage.local.set({current:s,animationType:r},(()=>{a({status:!0,action:"setItem"})}))«;break}case"removeItem":{const{data:s}=t,{itemId:r}=s,o=e.collections;o.forEach((t=>{const e=t.items.findIndex((t=>t.id=…`
  - `CHROME_LOCAL_STORAGE` (animationType) — `background` L1:C14843 -> L1:C15087  `…ype=e.animationType,»chrome.storage.local.set({current:t,animationType:e.animationType},(()=>{chrome.tabs.query({active:!0,currentWindow:!0}, …⟨tainted span: 244 chars⟩… {chrome.tabs.sendMessage(t[0].id,{action:"changeTrails"},(t=>(a({status:!0,action:"setAnimation",content:t}),!0)))}))}))«}));break}case"setDu…`
  - `CHROME_LOCAL_STORAGE` (duration) — `background` L1:C15208 -> L1:C15441  `…));break}case"setDuration":{const{data:e}=t;chrome.storage.local.get(["current"],(({current:t})=>{t.duration=e.duration,»chrome.storage.local.set({current:t,duration:e.duration},(()=>{chrome.tabs.query({active:!0,currentWindow:!0},(t=>{chrome.tabs.sendMessage(t[0].id,{action:"changeTrails"},(t=>(a({status:!0,action:"setDuration",content:t}),!0)))}))}))«}));break}case"setConfig":await(s=t.data,new Promise(((t,e)=>{try{chrome.storage.local.set(s,(function(){t({status:!0,da…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (241 raw steps → 1 distinct lines):
   1. L1 `…,e,a)=>{console.log(»t),await s().then((async e=>{switch(t.action){case"addCollection":if(t.data.collection.isCustomCursor){const s={collecti …⟨tainted span: 4649 chars⟩… n:"changeTrails"},(t=>(a({status:!0,action:"setDuration",content:t}),!0)))}))}))}));break}case"setConfig":await(s=t.data«,new Promise(((t,e)=…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ASSIGN:binary-right, ELEMENT:destructure-property[data], ELEMENT:destructure-property[item], ELEMENT:destructure-property[animationType], ELEMENT:destructure-property[itemId]

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('current') in background)  ·  2× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C10832 -> L1:C10833  `…al.set({notifications:t})})().then((t=>{}))})),chrome.runtime.onMessageExternal.addListener((async(t,e,a)=>{console.log(»t«),await s().then((async e=>{switch(t.action){case"addCollection":if(t.data.collection.isCustomCursor){const s={collectio…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (current) — `background` L1:C14843 -> L1:C15087  `…ype=e.animationType,»chrome.storage.local.set({current:t,animationType:e.animationType},(()=>{chrome.tabs.query({active:!0,currentWindow:!0}, …⟨tainted span: 244 chars⟩… {chrome.tabs.sendMessage(t[0].id,{action:"changeTrails"},(t=>(a({status:!0,action:"setAnimation",content:t}),!0)))}))}))«}));break}case"setDu…`
  - `CHROME_LOCAL_STORAGE` (current) — `background` L1:C15208 -> L1:C15441  `…));break}case"setDuration":{const{data:e}=t;chrome.storage.local.get(["current"],(({current:t})=>{t.duration=e.duration,»chrome.storage.local.set({current:t,duration:e.duration},(()=>{chrome.tabs.query({active:!0,currentWindow:!0},(t=>{chrome.tabs.sendMessage(t[0].id,{action:"changeTrails"},(t=>(a({status:!0,action:"setDuration",content:t}),!0)))}))}))«}));break}case"setConfig":await(s=t.data,new Promise(((t,e)=>{try{chrome.storage.local.set(s,(function(){t({status:!0,da…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (245 raw steps → 1 distinct lines):
   1. L1 `…,e,a)=>{console.log(»t),await s().then((async e=>{switch(t.action){case"addCollection":if(t.data.collection.isCustomCursor){const s={collecti …⟨tainted span: 4649 chars⟩… n:"changeTrails"},(t=>(a({status:!0,action:"setDuration",content:t}),!0)))}))}))}));break}case"setConfig":await(s=t.data«,new Promise(((t,e)=…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ASSIGN:binary-right, ELEMENT:destructure-property[data], ELEMENT:destructure-property[item], ELEMENT:destructure-property[animationType], ELEMENT:destructure-property[itemId], STORAGE:STORAGE_FLOW[area: local, key: current, sender: background, receiver: background]

---
