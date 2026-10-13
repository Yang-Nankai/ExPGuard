# Source-level Taint Flow — okkffdhbfplmbjblhgapnchjinanmnij 1.4.1

- Source type: CRX
- Files with issues: 5 / 5
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content/ct` L1:C2134 -> L1:C2135  `…trict";const t="recorder-screenshot-v3",e=chrome.runtime.getURL("");window.addEventListener("message",(e=>{let a=e.data;»a«.p==t&&"tobg"==a.cmd&&chrome.runtime.sendMessage(a.data,(t=>{a.cb&&window.postMessage({cmd:"ctcb",cb:a.cb,data:t})}))}))…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `content/ct` L1:C2202 -> L1:C2249  `…window.addEventListener("message",(e=>{let a=e.data;a.p==t&&"tobg"==a.cmd&&chrome.runtime.sendMessage(a.data,(t=>{a.cb&&»window.postMessage({cmd:"ctcb",cb:a.cb,data:t})«}))}));{let a=document.createElement("script");a.src=chrome.runtime.getURL("/content/sm.js"),a.dataset.pname=t,a.dataset…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (46 raw steps → 1 distinct lines):
   1. L1 `…",(e=>{let a=e.data;»a.p==t&&"tobg"==a.cmd&&chrome.runtime.sendMessage(a.data,(t=>{a.cb&&window.postMessage({cmd:"ctcb",cb:a.cb,data:t})}))}) …⟨tainted span: 444 chars⟩… cument.body.setAttribute("inMainTabUse",1),chrome.runtime.onMessage.addListener(((t,e,a)=>{"canbeuse"==t.topic&&a(!0)}))«)})()}));`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[background/background->content/ct]; runtime.single.sender.message[background/background->content/ct]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background/background` L1:C2520 -> L1:C3835  `…;let o={},a=!1,i=-1;»chrome.runtime.onMessage.addListener(((t,r,c)=>{switch(t.cmd){case"get_bg":chrome.storage.local.get(["uid"],(t=>{let o=t …⟨tainted span: 1315 chars⟩… etRequest.updateDynamicRules(t.data);break;case"usr":chrome.declarativeNetRequest.updateSessionRules(t.data)}return!0}))«,function(){let e=""…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `background/background` L1:C2871 -> L1:C2905  `…id,htab:i,mf:t.mf||""})}));break;case"get_mf":chrome.storage.local.get("mf",(e=>{c(e.mf||"")}));break;case"set_storage":»chrome.storage.local.set(t.data,c)«;break;case"get_storage":chrome.storage.local.get(t.data,c);break;case"set_res":o[t.url]=t.data;break;case"get_res":c(o[…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `background/background` L1:C3103 -> L1:C3177  `…":o[t.url]=t.data;break;case"get_res":c(o[t.url]);break;case"l2inited":c(a),a=!0;break;case"htab":"create"==t.fun?-1==i?»chrome.windows.create(t.data,(e=>{i=e.tabs[0].id,c({winId:e.id,htab:i})}))«:chrome.tabs.get(i,(e=>{e?(chrome.tabs.update(i,{url:t.data.url}),c({winId:e.windowId,htab:e.id})):chrome.windows.create…`
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `background/background` L1:C3370 -> L1:C3407  `…d:e.windowId,htab:e.id})):chrome.windows.create(t.data,(e=>{i=e.tabs[0].id,c({winId:e.id,htab:i})}))})):"update"==t.fun?»chrome.windows.update(t.winId,t.data)«:"remove"==t.fun&&chrome.windows.remove(t.winId);break;case"tab":if("create"==t.fun){var u={...t.data};u.index||(u.index…`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background/background` L1:C3696 -> L1:C3751  `…}))}else"update"==t.fun?chrome.tabs.update(t.tabId,t.data):"remove"==t.fun&&chrome.tabs.remove(t.tabId);break;case"udr":»chrome.declarativeNetRequest.updateDynamicRules(t.data)«;break;case"usr":chrome.declarativeNetRequest.updateSessionRules(t.data)}return!0})),function(){let e="",t=1;chrome.stor…`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background/background` L1:C3768 -> L1:C3823  `…un&&chrome.tabs.remove(t.tabId);break;case"udr":chrome.declarativeNetRequest.updateDynamicRules(t.data);break;case"usr":»chrome.declarativeNetRequest.updateSessionRules(t.data)«}return!0})),function(){let e="",t=1;chrome.storage.local.get(["installTime","uid"],(function(r){r.uid?e=r.uid:(e=r.uid|…`
  - `CHROME_TABS_CREATE_OPTIONS` — `background/background` L1:C3543 -> L1:C3579  `…&&chrome.windows.remove(t.winId);break;case"tab":if("create"==t.fun){var u={...t.data};u.index||(u.index=r.tab.index+1),»chrome.tabs.create(u,(e=>{c(e.id)}))«}else"update"==t.fun?chrome.tabs.update(t.tabId,t.data):"remove"==t.fun&&chrome.tabs.remove(t.tabId);break;case"udr":chr…`
  - `CHROME_DOWNLOADS_OPTIONS` — `background/background` L3:C34682 -> L3:C34773  `…itor.html?nanoId="+h})})):"copy"===t&&chrome.tabs.sendMessage(r.tab.id,{type:"area_copy",data:p[h]})}))}function k(e,t){»chrome.downloads.download({url:e,filename:"Video Screen".concat(Date.now(),".").concat(t)})«}function O(e){y=e,"cancel"===e||"stop"===e?("cancel"===e&&(S=0,chrome.runtime.sendMessage({type:"close_window"})),x(),w…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `background/background` L1:C3276 -> L1:C3350  `…inId:e.id,htab:i})})):chrome.tabs.get(i,(e=>{e?(chrome.tabs.update(i,{url:t.data.url}),c({winId:e.windowId,htab:e.id})):»chrome.windows.create(t.data,(e=>{i=e.tabs[0].id,c({winId:e.id,htab:i})}))«})):"update"==t.fun?chrome.windows.update(t.winId,t.data):"remove"==t.fun&&chrome.windows.remove(t.winId);break;case"tab…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (303 raw steps → 2 distinct lines):
   1. L1 `…g"),"")}r=r||"";let »o={},a=!1,i=-1;chrome.runtime.onMessage.addListener(((t,r,c)=>{switch(t.cmd){case"get_bg":chrome.storage.local.get(["uid …⟨tainted span: 2106 chars⟩… .jdRules||[]})),chrome.runtime.onMessage.addListener(((e,t,n)=>("dojd"==e.cmd&&this.check(t.tab,e.data)&&r(e.data),!0)))«},check:function(e,t…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:binary-right, COPY:object-spread, ASSIGN:logical-left
      ⇄ cross-context hop: `runtime.single.sender.message[content/ct->background/background]`
   2. L3 `…1];t[n]=o})),t};var »p={},g={},y="stop",_=-1,w=null,I=null,S=0;function E(e,t,r,n){chrome.tabs.captureVisibleTab(t[0].windowId,{format:"png"} …⟨tainted span: 5298 chars⟩… unction(t){chrome.tabs.sendMessage(t[0].id,{type:"show_count_down",count_down_number:e.count_down_number})}))}var n,o}))«,chrome.runtime.onIn…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, RETURN:string.concat, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative, RETURN:fallback-return
      ⇄ cross-context hop: `runtime.single.sender.message[content/ct->background/background]`

---
