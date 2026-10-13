# Source-level Taint Flow — cbhljnnfpomfkmhefapcjmjignigcfpn 1.1.21

- Source type: CRX
- Files with issues: 4 / 5
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `ytTq7eWvx8` L1:C1469 -> L1:C1492  `…"div[class*=-item-active]"),n&&(t=n.innerText||"",e&&(t+="-"+(e.innerText||"")))}return!t&&e&&(t=e.innerText||""),t||(t=»document.title||"未命名文件"«),t}(),n=(window.sppxApp.getExtensionId(),{filename:e,...t});try{window.postMessage({type:"SP_DOWNLOAD_FILE",permissions…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `ytTq7eWvx8` L1:C1557 -> L1:C1647  `…t&&e&&(t=e.innerText||""),t||(t=document.title||"未命名文件"),t}(),n=(window.sppxApp.getExtensionId(),{filename:e,...t});try{»window.postMessage({type:"SP_DOWNLOAD_FILE",permissions:["downloads"],downloadData:n},"*")«}catch(e){}})),document.body.appendChild(n);const o=new MutationObserver((t=>{t.forEach((t=>{if("childList"===t.type&&t.…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (13 raw steps → 1 distinct lines):
   1. L1 `…-name");e=document.querySelector("div[class*=-item-active]"),n&&(t=n.innerText||"",e&&(t+="-"+(e.innerText||"")))}return»!t&&e&&(t=e.innerText||""),t||(t=document.title||"未命名文件"),t}(),n=(window.sppxApp.getExtensionId(),{filename:e,...t});try{window.postMessage({type:"SP_DOWNLOAD_FILE",permissions:["downloads"],downloadData:n},"*")«}catch(e){}})),document.body.appendChild(n);const o=new MutationObserver((t=>{t.forEach((t=>{if("childList"===t.type&&t.…`  · ASSIGN:logical-left, ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:object.setProperty

---

## Flow #2 — NAVIGATOR_PLATFORM (navigator.platform)

- **Source**: `NAVIGATOR_PLATFORM` — `background` L1:C1000 -> L1:C1150  `….statusText}`);this.config.debug}catch(e){this.config.debug}}async trackEvent(e,t={}){const n=await this.initClientId(),»r={...t,extension_version:chrome.runtime.getManifest().version,extension_id:chrome.runtime.id,platform:navigator.platform,browser:navigator.userAgent}«,o={client_id:n,timestamp_micros:1e3*Date.now(),events:[{name:e,params:r}]};await this.sendToGA(o)}async trackPageView(e…`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.google-analytics.com/mp/collect?measurement_id=G-M8C53SD5CH&api_secret=rUAX-_hyQBSA9ad_bd8kHQ) — `background` L1:C772 -> L1:C831  `…randomUUID();this.clientId=t,chrome.storage.local.set({ga_client_id:t}),e(t)}}))}))}async sendToGA(e){try{const t=await »fetch(this.endpoint,{method:"POST",body:JSON.stringify(e)})«;if(!t.ok)throw new Error(`GA request failed: ${t.statusText}`);this.config.debug}catch(e){this.config.debug}}async trac…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (16 raw steps → 1 distinct lines):
   1. L1 `…ndToGA(e){try{const »t=await fetch(this.endpoint,{method:"POST",body:JSON.stringify(e)});if(!t.ok)throw new Error(`GA request failed: ${t.sta …⟨tainted span: 461 chars⟩… vigator.platform,browser:navigator.userAgent},o={client_id:n,timestamp_micros:1e3*Date.now(),events:[{name:e,params:r}]}«;await this.sendToGA…`  · ELEMENT:object.setProperty, RETURN:json.stringify

---

## Flow #3 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `background` L1:C1000 -> L1:C1150  `….statusText}`);this.config.debug}catch(e){this.config.debug}}async trackEvent(e,t={}){const n=await this.initClientId(),»r={...t,extension_version:chrome.runtime.getManifest().version,extension_id:chrome.runtime.id,platform:navigator.platform,browser:navigator.userAgent}«,o={client_id:n,timestamp_micros:1e3*Date.now(),events:[{name:e,params:r}]};await this.sendToGA(o)}async trackPageView(e…`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.google-analytics.com/mp/collect?measurement_id=G-M8C53SD5CH&api_secret=rUAX-_hyQBSA9ad_bd8kHQ) — `background` L1:C772 -> L1:C831  `…randomUUID();this.clientId=t,chrome.storage.local.set({ga_client_id:t}),e(t)}}))}))}async sendToGA(e){try{const t=await »fetch(this.endpoint,{method:"POST",body:JSON.stringify(e)})«;if(!t.ok)throw new Error(`GA request failed: ${t.statusText}`);this.config.debug}catch(e){this.config.debug}}async trac…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (16 raw steps → 1 distinct lines):
   1. L1 `…ndToGA(e){try{const »t=await fetch(this.endpoint,{method:"POST",body:JSON.stringify(e)});if(!t.ok)throw new Error(`GA request failed: ${t.sta …⟨tainted span: 461 chars⟩… vigator.platform,browser:navigator.userAgent},o={client_id:n,timestamp_micros:1e3*Date.now(),events:[{name:e,params:r}]}«;await this.sendToGA…`  · ELEMENT:object.setProperty, RETURN:json.stringify

---

## Flow #4 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L1:C13911 -> L1:C15315  `…us&&y(n,s,a))}))})),»t.runtime.onMessage.addListener(((e,t,n)=>{const{action:r,data:o}=e;let s,a;switch(r){case"enable_copy":s=o.tabId,a=o.ta …⟨tainted span: 1404 chars⟩… w(),{}]});n({success:!0,result:o?.[0]?.result})}catch(e){n({success:!1,error:e?.message||String(e)})}})(),!0}return!0}))«};t.runtime.onInstal…`
- **Sink(s)**:
  - `CHROME_DOWNLOADS_OPTIONS` — `background` L1:C14619 -> L1:C14696  `…Data;let i=[];if(e.headers){const t=new Headers(e.headers);for(const[e,n]of t.entries())i.push({name:e,value:n})}return »chrome.downloads.download({url:e.url,filename:`${e.filename}.pdf`,headers:i})«,!0;case"REQUEST_PERMISSION_DIRECT":return chrome.permissions.request({permissions:o.permissions}).then((e=>{n({success:…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (42 raw steps → 1 distinct lines):
   1. L1 `…us&&y(n,s,a))}))})),»t.runtime.onMessage.addListener(((e,t,n)=>{const{action:r,data:o}=e;let s,a;switch(r){case"enable_copy":s=o.tabId,a=o.ta …⟨tainted span: 1404 chars⟩… w(),{}]});n({success:!0,result:o?.[0]?.result})}catch(e){n({success:!1,error:e?.message||String(e)})}})(),!0}return!0}))«};t.runtime.onInstal…`  · MESSAGE, ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`

---
