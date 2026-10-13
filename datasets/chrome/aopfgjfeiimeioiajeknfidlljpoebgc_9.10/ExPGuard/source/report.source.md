# Source-level Taint Flow — aopfgjfeiimeioiajeknfidlljpoebgc 9.10

- Source type: CRX
- Files with issues: 2 / 4
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 4 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/contentscript` L1:C147 -> L1:C153  `…getManifest().version,plugdata=null,ServerURL="https://erail.in/";window.addEventListener("message",function(a){void 0!=»a.data«&&(plugdata=a.data,void 0!=plugdata.Action&&(void 0!=plugdata.background&&0!=plugdata.background||$("#divDetail").html("…`
- **Sink(s)**:
  - `JQUERY_ELEMENT_HTML_SET` (#IRMessage) — `js/contentscript` L2:C401 -> L2:C424  `chrome.runtime.onMessage.addListener(function(a,c,b){switch(a.Action?a.Action:a.action){case "ONRESULT":a=a.Data;SendMessageToMainPage(a.Action,a.Message,"string"===typeof a.Data?a.Data:JSON.stringify(a.Data));break;case "SendMessage":SendMessageToMainPage(a.subaction,a.message,"string"===typeof a.data?a.data:JSON.stringify(a.data))}b({})});function SendMessageToMainPage(a,c,b){$("#IRData").val(b);»$("#IRMessage").html(c)«;$("#IRCommand").html(a)}`
  - `JQUERY_ELEMENT_HTML_SET` (#IRCommand) — `js/contentscript` L2:C425 -> L2:C448  `chrome.runtime.onMessage.addListener(function(a,c,b){switch(a.Action?a.Action:a.action){case "ONRESULT":a=a.Data;SendMessageToMainPage(a.Action,a.Message,"string"===typeof a.Data?a.Data:JSON.stringify(a.Data));break;case "SendMessage":SendMessageToMainPage(a.subaction,a.message,"string"===typeof a.data?a.data:JSON.stringify(a.data))}b({})});function SendMessageToMainPage(a,c,b){$("#IRData").val(b);$("#IRMessage").html(c);»$("#IRCommand").html(a)«}`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (388 raw steps → 2 distinct lines):
   1. L1 `…function(a){void 0!=»a.data&&(plugdata=a.data,void 0!=plugdata.Action&&(void 0!=plugdata.background&&0!=plugdata.background||$("#divDetail"). …⟨tainted span: 349 chars⟩… k again if you do not get status in 1 min.<br/><div id='divAvlCtr'></div></center>"),chrome.runtime.sendMessage(plugdata«,function(a){})))});`  · ASSIGN:binary-right, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L2 `»chrome.runtime.onMessage.addListener(function(a,c,b){switch(a.Action?a.Action:a.action){case "ONRESULT":a=a.Data;SendMessageToMainPage(a.Action,a.Message,"string"===typeof a.Data?a.Data:JSON.stringify(a.Data));break;case "SendMessage":SendMessageToMainPage(a.subaction,a.message,"string"===typeof a.data?a.data:JSON.stringify(a.data))}b({})});function SendMessageToMainPage(a,c,b){$("#IRData").val(b);$("#IRMessage").html(c);$("#IRCommand").html(a«)}`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, RETURN:json.stringify
      ⇄ cross-context hop: `runtime.single.sender.message[js/erailchrome->js/contentscript]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/erailchrome` L2:C0 -> L3:C419 (spans to L3)  `»chrome.runtime.onMessage.addListener(function(a,b,c){a.TabID=b.tab.id;plugdata=a;switch(a.Action){case "SendMessageToTab …⟨tainted span: 518 chars⟩… "CLEARCOOKIE":ClearCookie(a,b.tab.id);break;case "GET_BLOB":toDataUrl(a.URL,function(c){a.Data=c;SendMessage("ONRESULT",«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/erailchrome` L4:C24 -> L4:C32  `function toDataUrl(a,b){»fetch(a)«.then(function(a){if(a.ok)return a.blob()}).then(function(a){var c=new FileReader;c.onload=function(){b(c.result)};c.readAsDataURL(a)}).catch(function(a){console.log(a)})}`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/erailchrome` L7:C359 -> L7:C455  `…=a.Method&&(a.FetchMethod="GET");c={};a.Message&&(c=JSON.parse(a.Message),"GET"===c.FetchMethod&&(a.FetchMethod="GET"));»fetch(a.URL,{method:a.FetchMethod?a.FetchMethod:"POST",headers:b,body:a.post,redirect:"follow"})«.then(function(a){if(a.ok)return a.text();throw Error("Something went wrong");`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `js/erailchrome` L7:C359 -> L7:C455  `…=a.Method&&(a.FetchMethod="GET");c={};a.Message&&(c=JSON.parse(a.Message),"GET"===c.FetchMethod&&(a.FetchMethod="GET"));»fetch(a.URL,{method:a.FetchMethod?a.FetchMethod:"POST",headers:b,body:a.post,redirect:"follow"})«.then(function(a){if(a.ok)return a.text();throw Error("Something went wrong");`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/erailchrome` L1:C264 -> L1:C305  `var RequestQ=[],plugdata=null,IRTab=null,IRData=null;function CreateTab(a){chrome.tabs.query({},function(b){for(var c=!1,d=0;d<b.length;d++){var e=b[d];try{if(-1<e.url.toLowerCase().indexOf(a.Domain)){c=!0;chrome.tabs.update(e.id,{url:a.URL});break}}catch(f){}}c||»chrome.tabs.create({url:a.URL,active:!1})«})}`
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `js/erailchrome` L3:C267 -> L3:C353  `a,a.TabID)});c({});break;case "SendMessage":return chrome.tabs.query({},function(d){for(var b=0;b<d.length;++b)if(d[b].url&&-1<d[b].url.indexOf(a.url)){chrome.tabs.sendMessage(d[b].id,a);void 0==a.focused&&(a.focused=!1);void 0==a.drawAttention&&(a.drawAttention=!1);»chrome.windows.update(d[b].windowId,{focused:a.focused,drawAttention:a.drawAttention})«;break}c({})}),!0;default:RequestQ.push(a),DownloadData(),c({})}});`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (492 raw steps → 8 distinct lines):
   1. L2 (→L3) `…ner(function(a,b,c){»a.TabID=b.tab.id;plugdata=a;switch(a.Action){case "SendMessageToTab":chrome.tabs.sendMessage(a.SendToTabID,a.Data,functi …⟨tainted span: 465 chars⟩… "CLEARCOOKIE":ClearCookie(a,b.tab.id);break;case "GET_BLOB":toDataUrl(a.URL,function(c){a.Data=c;SendMessage("ONRESULT",«`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element
      ⇄ cross-context hop: `runtime.single.sender.message[js/contentscript->js/erailchrome]`
   2. L8 `}).then(function(b){»a.Data=b;SendMessage("ONRESULT",a,a.TabID);DownloadData()}).catch(function(b){a.Data="Error";SendMessage("ONRESULT",a,a.TabID);DownloadData()});RequestQ.shift()}}function SendMessage(a,b,c){chrome.tabs.sendMessage(c,{Action:a,Data:b},function(a){plugdata=null})«}function OngetAllInWindow(a){for(var b=0;b<a.length;b++)if(-1<a[b].url.toLowerCase().indexOf(plugdata.URL.toLowerCase())){SendMessage(plugdata.Action,plugdata,a[b].id);break}}`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:member-element, ELEMENT:array.shift
   3. L6 `function GetIRCookie(a,b){»chrome.cookies.getAll({domain:a.URL},function(c){var d=[];$(c).each(function(){d.push({name:this.name,value:this.value,domain:this.domain,secure:this.secure,path:this.path})});a.Data=JSON.stringify(d);SendMessage("ONRESULT",a,b)})«}`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   4. L5 `function ClearCookie(a,b){»chrome.cookies.getAll({domain:a.URL},function(c){$(c).each(function(){chrome.cookies.remove({url:"http://"+this.domain,name:this.name},function(a){});chrome.cookies.remove({url:"http://"+this.domain+"/enquiry",name:this.name},function(a){})});a.Data=JSON.stringify([]);SendMessage("ONRESULT",a,b)})«}`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   5. L4 `function toDataUrl(a,b){fetch(»a«).then(function(a){if(a.ok)return a.blob()}).then(function(a){var c=new FileReader;c.onload=function(){b(c.result)};c.readAsDataURL(a)}).catch(function(a){console.log(a)})}`  · ASSIGN:identifier
   6. L3 `»a,a.TabID)});c({});break;case "SendMessage":return chrome.tabs.query({},function(d){for(var b=0;b<d.length;++b)if(d[b].url&&-1<d[b].url.indexOf(a.url)){chrome.tabs.sendMessage(d[b].id,a);void 0==a.focused&&(a.focused=!1);void 0==a.drawAttention&&(a.drawAttention=!1);chrome.windows.update(d[b].windowId,{focused:a.focused,drawAttention:a.drawAttention});break}c({})}),!0;default:RequestQ.push(a«),DownloadData(),c({})}});`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty
   7. L1 `var »RequestQ=[],plugdata=null,IRTab=null,IRData=null;function CreateTab(a){chrome.tabs.query({},function(b){for(var c=!1,d=0;d<b.length;d++){var e=b[d];try{if(-1<e.url.toLowerCase().indexOf(a.Domain)){c=!0;chrome.tabs.update(e.id,{url:a.URL});break}}catch(f){}}c||chrome.tabs.create({url:a.URL,active:!1})«})}`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element
   8. L7 (→L8) `…ownloadData(){if(0!=»RequestQ.length){var a=RequestQ[0];plugdata=a;var b=new Headers;if(void 0!=plugdata.headersList)for(var c=0;c<plugdata.h …⟨tainted span: 503 chars⟩… ,headers:b,body:a.post,redirect:"follow"}).then(function(a){if(a.ok)return a.text();throw Error("Something went wrong");«`  · ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, RETURN:json.parse, ASSIGN:binary-left, ASSIGN:conditional-consequent, ELEMENT:object.setProperty

---
