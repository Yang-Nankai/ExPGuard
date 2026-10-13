# Source-level Taint Flow — igkkmokkmlbkkgdnkkancbonkbbmkioc 2.0.2

- Source type: CRX
- Files with issues: 6 / 6
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `ct.bundle` L1:C153 -> L1:C154  `…der-screenshot-v3",t="https://apv3.s3.ap-northeast-2.amazonaws.com";window.addEventListener("message",(t=>{let a=t.data;»a«.p==e&&"tobg"==a.cmd&&chrome.runtime.sendMessage(a.data,(e=>{a.cb&&window.postMessage({cmd:"ctcb",cb:a.cb,data:e})}))}))…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `ct.bundle` L1:C221 -> L1:C268  `…window.addEventListener("message",(t=>{let a=t.data;a.p==e&&"tobg"==a.cmd&&chrome.runtime.sendMessage(a.data,(e=>{a.cb&&»window.postMessage({cmd:"ctcb",cb:a.cb,data:e})«}))}));{chrome.storage.local.get("updateTime",(e=>{e.updateTime&&Date.now()-e.updateTime>2592e5&&chrome.storage.local.se…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (46 raw steps → 1 distinct lines):
   1. L1 `…",(t=>{let a=t.data;»a.p==e&&"tobg"==a.cmd&&chrome.runtime.sendMessage(a.data,(e=>{a.cb&&window.postMessage({cmd:"ctcb",cb:a.cb,data:e})}))}) …⟨tainted span: 578 chars⟩… cument.body.setAttribute("inMainTabUse",1),chrome.runtime.onMessage.addListener(((e,t,a)=>{"canbeuse"==e.topic&&a(!0)}))«)})();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[background->ct.bundle]; runtime.single.sender.message[background->ct.bundle]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L2:C3456 -> L2:C4771  `…;let c={},s=!1,i=-1;»chrome.runtime.onMessage.addListener(((t,a,r)=>{switch(t.cmd){case"get_bg":chrome.storage.local.get(["uid"],(t=>{let o=t …⟨tainted span: 1315 chars⟩… etRequest.updateDynamicRules(t.data);break;case"usr":chrome.declarativeNetRequest.updateSessionRules(t.data)}return!0}))«,function(){let e=""…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `background` L2:C3807 -> L2:C3841  `…id,htab:i,mf:t.mf||""})}));break;case"get_mf":chrome.storage.local.get("mf",(e=>{r(e.mf||"")}));break;case"set_storage":»chrome.storage.local.set(t.data,r)«;break;case"get_storage":chrome.storage.local.get(t.data,r);break;case"set_res":c[t.url]=t.data;break;case"get_res":r(c[…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `background` L2:C4039 -> L2:C4113  `…":c[t.url]=t.data;break;case"get_res":r(c[t.url]);break;case"l2inited":r(s),s=!0;break;case"htab":"create"==t.fun?-1==i?»chrome.windows.create(t.data,(e=>{i=e.tabs[0].id,r({winId:e.id,htab:i})}))«:chrome.tabs.get(i,(e=>{e?(chrome.tabs.update(i,{url:t.data.url}),r({winId:e.windowId,htab:e.id})):chrome.windows.create…`
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `background` L2:C4306 -> L2:C4343  `…d:e.windowId,htab:e.id})):chrome.windows.create(t.data,(e=>{i=e.tabs[0].id,r({winId:e.id,htab:i})}))})):"update"==t.fun?»chrome.windows.update(t.winId,t.data)«:"remove"==t.fun&&chrome.windows.remove(t.winId);break;case"tab":if("create"==t.fun){var o={...t.data};o.index||(o.index…`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L2:C4632 -> L2:C4687  `…}))}else"update"==t.fun?chrome.tabs.update(t.tabId,t.data):"remove"==t.fun&&chrome.tabs.remove(t.tabId);break;case"udr":»chrome.declarativeNetRequest.updateDynamicRules(t.data)«;break;case"usr":chrome.declarativeNetRequest.updateSessionRules(t.data)}return!0})),function(){let e="",t=1;chrome.stor…`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L2:C4704 -> L2:C4759  `…un&&chrome.tabs.remove(t.tabId);break;case"udr":chrome.declarativeNetRequest.updateDynamicRules(t.data);break;case"usr":»chrome.declarativeNetRequest.updateSessionRules(t.data)«}return!0})),function(){let e="",t=1;chrome.storage.local.get(["installTime","uid"],(function(a){a.uid?e=a.uid:(e=a.uid|…`
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L2:C4479 -> L2:C4515  `…&&chrome.windows.remove(t.winId);break;case"tab":if("create"==t.fun){var o={...t.data};o.index||(o.index=a.tab.index+1),»chrome.tabs.create(o,(e=>{r(e.id)}))«}else"update"==t.fun?chrome.tabs.update(t.tabId,t.data):"remove"==t.fun&&chrome.tabs.remove(t.tabId);break;case"udr":chr…`
  - `CHROME_DOWNLOADS_OPTIONS` — `background` L4:C34685 -> L4:C34769  `…itor.html?nanoId="+h})})):"copy"===t&&chrome.tabs.sendMessage(n.tab.id,{type:"area_copy",data:y[h]})}))}function O(e,t){»chrome.downloads.download({url:e,filename:"Apex_".concat(Date.now(),".").concat(t)})«}function N(e){g=e,"cancel"===e||"stop"===e?("cancel"===e&&(S=0,chrome.runtime.sendMessage({type:"close_window"})),x(),w…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `background` L2:C4212 -> L2:C4286  `…inId:e.id,htab:i})})):chrome.tabs.get(i,(e=>{e?(chrome.tabs.update(i,{url:t.data.url}),r({winId:e.windowId,htab:e.id})):»chrome.windows.create(t.data,(e=>{i=e.tabs[0].id,r({winId:e.id,htab:i})}))«})):"update"==t.fun?chrome.windows.update(t.winId,t.data):"remove"==t.fun&&chrome.windows.remove(t.winId);break;case"tab…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (303 raw steps → 2 distinct lines):
   1. L2 `…{e=t.jdRules||[]})),»chrome.runtime.onMessage.addListener(((e,t,r)=>("dojd"==e.cmd&&this.check(t.tab,e.data)&&a(e.data),!0)))},check:function …⟨tainted span: 3836 chars⟩… etRequest.updateDynamicRules(t.data);break;case"usr":chrome.declarativeNetRequest.updateSessionRules(t.data)}return!0}))«,function(){let e=""…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:binary-right, COPY:object-spread, ASSIGN:logical-left
      ⇄ cross-context hop: `runtime.single.sender.message[ct.bundle->background]`
   2. L4 `…1];t[r]=o})),t};var »y={},m={},g="stop",_=-1,w=null,I=null,S=0;function E(e,t,n,r){chrome.tabs.captureVisibleTab(t[0].windowId,{format:"png"} …⟨tainted span: 5249 chars⟩… unction(t){chrome.tabs.sendMessage(t[0].id,{type:"show_count_down",count_down_number:e.count_down_number})}))}var r,o}))«,chrome.runtime.onIn…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, RETURN:string.concat, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative, RETURN:fallback-return
      ⇄ cross-context hop: `runtime.single.sender.message[ct.bundle->background]`

---
