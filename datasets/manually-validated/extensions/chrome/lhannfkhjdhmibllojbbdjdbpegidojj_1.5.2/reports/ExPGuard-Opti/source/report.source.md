# Source-level Taint Flow — lhannfkhjdhmibllojbbdjdbpegidojj 1.5.2

- Source type: CRX
- Files with issues: 6 / 6
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 12 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/content/ct` L1:C183 -> L1:C184  `…trict";const e="recorder-screenshot-v3",t=chrome.runtime.getURL("");window.addEventListener("message",(t=>{let n=t.data;»n«.p==e&&"tobg"==n.cmd&&chrome.runtime.sendMessage(n.data,(e=>{n.cb&&window.postMessage({cmd:"ctcb",cb:n.cb,data:e})}))}))…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content/ct` L1:C251 -> L1:C298  `…window.addEventListener("message",(t=>{let n=t.data;n.p==e&&"tobg"==n.cmd&&chrome.runtime.sendMessage(n.data,(e=>{n.cb&&»window.postMessage({cmd:"ctcb",cb:n.cb,data:e})«}))}));{let n=document.createElement("script");n.src=chrome.runtime.getURL("/js/content/sm.js"),n.dataset.pname=e,n.data…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (46 raw steps → 1 distinct lines):
   1. L1 `…",(t=>{let n=t.data;»n.p==e&&"tobg"==n.cmd&&chrome.runtime.sendMessage(n.data,(e=>{n.cb&&window.postMessage({cmd:"ctcb",cb:n.cb,data:e})}))}) …⟨tainted span: 447 chars⟩… cument.body.setAttribute("inMainTabUse",1),chrome.runtime.onMessage.addListener(((e,t,n)=>{"canbeuse"==e.topic&&n(!0)}))«)})()}));`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[serviceWorker/sw->js/content/ct]; runtime.single.sender.message[serviceWorker/sw->js/content/ct]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `serviceWorker/sw` L1:C569 -> L1:C1927  `…;let o={},a=!1,i=-1;»chrome.runtime.onMessage.addListener(((t,r,c)=>{switch(t.cmd){case"get_bg":chrome.storage.local.get(["uid"],(t=>{let o=t …⟨tainted span: 1358 chars⟩… etRequest.updateDynamicRules(t.data);break;case"usr":chrome.declarativeNetRequest.updateSessionRules(t.data)}return!0}))«,function(){let e=""…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `serviceWorker/sw` L1:C920 -> L1:C954  `…id,htab:i,mf:t.mf||""})}));break;case"get_mf":chrome.storage.local.get("mf",(e=>{c(e.mf||"")}));break;case"set_storage":»chrome.storage.local.set(t.data,c)«;break;case"get_storage":chrome.storage.local.get(t.data,c);break;case"set_res":o[t.url]=t.data;break;case"get_res":c(o[…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `serviceWorker/sw` L1:C1152 -> L1:C1226  `…":o[t.url]=t.data;break;case"get_res":c(o[t.url]);break;case"l2inited":c(a),a=!0;break;case"htab":"create"==t.fun?-1==i?»chrome.windows.create(t.data,(e=>{i=e.tabs[0].id,c({winId:e.id,htab:i})}))«:chrome.tabs.get(i,(e=>{if(e){try{chrome.tabs.update(i,{url:t.data.url})}catch(e){}c({winId:e.windowId,htab:e.id})}else …`
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `serviceWorker/sw` L1:C1440 -> L1:C1477  `…windowId,htab:e.id})}else chrome.windows.create(t.data,(e=>{i=e.tabs[0].id,c({winId:e.id,htab:i})}))})):"update"==t.fun?»chrome.windows.update(t.winId,t.data)«:"remove"==t.fun&&chrome.windows.remove(t.winId);break;case"tab":if("create"==t.fun){var u={...t.data};u.index||(u.index…`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `serviceWorker/sw` L1:C1788 -> L1:C1843  `…t.fun)try{chrome.tabs.update(t.tabId,t.data)}catch(e){}else"remove"==t.fun&&chrome.tabs.remove(t.tabId);break;case"udr":»chrome.declarativeNetRequest.updateDynamicRules(t.data)«;break;case"usr":chrome.declarativeNetRequest.updateSessionRules(t.data)}return!0})),function(){let e="",t=1;chrome.stor…`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `serviceWorker/sw` L1:C1860 -> L1:C1915  `…un&&chrome.tabs.remove(t.tabId);break;case"udr":chrome.declarativeNetRequest.updateDynamicRules(t.data);break;case"usr":»chrome.declarativeNetRequest.updateSessionRules(t.data)«}return!0})),function(){let e="",t=1;chrome.storage.local.get(["installTime","uid"],(function(r){r.uid?e=r.uid:(e=r.uid|…`
  - `CHROME_TABS_CREATE_OPTIONS` — `serviceWorker/sw` L1:C1613 -> L1:C1649  `…&&chrome.windows.remove(t.winId);break;case"tab":if("create"==t.fun){var u={...t.data};u.index||(u.index=r.tab.index+1),»chrome.tabs.create(u,(e=>{c(e.id)}))«}else if("update"==t.fun)try{chrome.tabs.update(t.tabId,t.data)}catch(e){}else"remove"==t.fun&&chrome.tabs.remove(t.tabI…`
  - `CHROME_DOWNLOADS_OPTIONS` — `serviceWorker/sw` L3:C34698 -> L3:C34789  `…anoId="+h})}catch(e){}})):"copy"===t&&chrome.tabs.sendMessage(r.tab.id,{type:"area_copy",data:p[h]})}))}function O(e,t){»chrome.downloads.download({url:e,filename:"Video Screen".concat(Date.now(),".").concat(t)})«}function k(e){g=e,"cancel"===e||"stop"===e?("cancel"===e&&(S=0,chrome.runtime.sendMessage({type:"close_window"})),x(),w…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `serviceWorker/sw` L1:C1346 -> L1:C1420  `…:chrome.tabs.get(i,(e=>{if(e){try{chrome.tabs.update(i,{url:t.data.url})}catch(e){}c({winId:e.windowId,htab:e.id})}else »chrome.windows.create(t.data,(e=>{i=e.tabs[0].id,c({winId:e.id,htab:i})}))«})):"update"==t.fun?chrome.windows.update(t.winId,t.data):"remove"==t.fun&&chrome.windows.remove(t.winId);break;case"tab…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (293 raw steps → 2 distinct lines):
   1. L1 `…g"),"")}r=r||"";let »o={},a=!1,i=-1;chrome.runtime.onMessage.addListener(((t,r,c)=>{switch(t.cmd){case"get_bg":chrome.storage.local.get(["uid …⟨tainted span: 1373 chars⟩… etRequest.updateDynamicRules(t.data);break;case"usr":chrome.declarativeNetRequest.updateSessionRules(t.data)}return!0}))«,function(){let e=""…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:binary-right, COPY:object-spread
      ⇄ cross-context hop: `runtime.single.sender.message[js/content/ct->serviceWorker/sw]`
   2. L3 `…1];t[n]=o})),t};var »p={},y={},g="stop",_=-1,w=null,I=null,S=0;function E(e,t,r,n){chrome.tabs.captureVisibleTab(t[0].windowId,{format:"png"} …⟨tainted span: 5305 chars⟩… unction(t){chrome.tabs.sendMessage(t[0].id,{type:"show_count_down",count_down_number:e.count_down_number})}))}var n,o}))«,chrome.runtime.onIn…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, RETURN:string.concat, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative, RETURN:fallback-return
      ⇄ cross-context hop: `runtime.single.sender.message[js/content/ct->serviceWorker/sw]`

---
