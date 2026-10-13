# Source-level Taint Flow — noofnfniimcnghnkonpdlhlaeaocidbi 1.7.5

- Source type: CRX
- Files with issues: 4 / 5
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 18 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content-scripts/content` L376:C4085 -> L376:C4099  `…this.showOriginal(r)}}async function jv(){await new Uv().init()}const Gv=()=>{window.addEventListener("message",i=>{if(!»i.data?.action«)return;const{action:l,msgId:r,msgData:u}=i.data,f=d=>{i.source?.postMessage({action:"dt-plugin-extensionResponse",msgId…`
- **Sink(s)**:
  - `CHROME_RUNTIME_SENDMESSAGE_EXTERNAL` (UNKNOWN_EXTENSION_ID) — `content-scripts/content` L376:C4552 -> L376:C4954  `…d=i.data.uiLanguage;»chrome.runtime.sendMessage(i.data.extensionId,{uiLanguage:d,action:"setI18n"},p=>{chrome.runtime.lastError?window.postMe …⟨tainted span: 402 chars⟩… stMessage({action:"setI18nCallBack",error:p.error},"*"):window.postMessage({action:"setI18nCallBack",callBack:!1},"*")})«;break;case"getI18nL…`
  - `CHROME_RUNTIME_SENDMESSAGE_EXTERNAL` (UNKNOWN_EXTENSION_ID) — `content-scripts/content` L376:C5009 -> L376:C5483  `…g=i.data.uiLanguage;»chrome.runtime.sendMessage(i.data.extensionId,{uiLanguage:g,action:"getI18nLanguage"},p=>{chrome.runtime.lastError?windo …⟨tainted span: 474 chars⟩… geCallBack",error:p.error},"*"):window.postMessage({action:"getI18nLanguageCallBack",languageList:p.languageList},"*")})«;break;case"sendExte…`
  - `CHROME_LOCAL_STORAGE` (userInfo) — `content-scripts/content` L376:C6181 -> L376:C6219  `…imestamp<"u"){const p=Math.floor(Date.now()/1e3);h.isPro=h.vipExpiryTimestamp>0&&h.vipExpiryTimestamp>p}else h.isPro=!1;»chrome.storage.local.set({userInfo:h})«.then(()=>{window.postMessage({action:"dt-plugin-login-success"},window.location.href)});break;case"dt-web-init":case"dt…`
  - `CHROME_LOCAL_STORAGE` (userInfo) — `content-scripts/content` L376:C6624 -> L376:C6662  `…imestamp<"u"){const p=Math.floor(Date.now()/1e3);v.isPro=v.vipExpiryTimestamp>0&&v.vipExpiryTimestamp>p}else v.isPro=!1;»chrome.storage.local.set({userInfo:v})«.then(()=>{f(!0)});break}})};let Ft=null,Fi=null,Yi=null,La=null,Ki=null,fo=null;function Vv(){document.addEventListener…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (71 raw steps → 1 distinct lines):
   1. L376 `…er("message",i=>{if(»!i.data?.action)return;const{action:l,msgId:r,msgData:u}=i.data,f=d=>{i.source?.postMessage({action:"dt-plugin-extension …⟨tainted span: 2596 chars⟩… =v.vipExpiryTimestamp>0&&v.vipExpiryTimestamp>p}else v.isPro=!1;chrome.storage.local.set({userInfo:v}).then(()=>{f(!0)})«;break}})};let Ft=nu…`  · ELEMENT:member-element, ASSIGN:unary, ELEMENT:destructure-property[action], ELEMENT:destructure-property[msgId], ELEMENT:destructure-property[msgData], ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:binary-left, ASSIGN:logical-right

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content-scripts/content` L319:C4916 -> L319:C4923  `…ageListener(){window.addEventListener("message",this.handleWindowMessage.bind(this),!1)}async handleWindowMessage(l){if(»!l.data«||!l.data.action)return;const{action:r}=l.data;switch(r){case"toggle-translation":this.callbacks.onToggleTranslation();b…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content-scripts/content` L319:C6128 -> L319:C6221  `…rvice:d},"*");break;case"switchTranslationService":l.data.service?(await this.callbacks.onSwitchService(l.data.service),»window.postMessage({action:"switchTranslationService",success:!0,service:l.data.service},"*")«):window.postMessage({action:"switchTranslationService",success:!1,error:"Service not specified"},"*");break;case"setPdf…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (36 raw steps → 1 distinct lines):
   1. L319 `…WindowMessage(l){if(»!l.data||!l.data.action)return;const{action:r}=l.data;switch(r){case"toggle-translation":this.callbacks.onToggleTranslat …⟨tainted span: 1543 chars⟩… dfPageCount":this.pdfPageCount=l.data.pageCount;break;case"getLanguageList":await this.handleGetLanguageList(l.data.lang«);break}}async handl…`  · ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[action], ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #3 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `background` L4:C47253 -> L4:C47254  `…hrome.runtime.getManifest().version;o&&(n["X-Client-Version"]=o);const i=navigator.language;i&&(n["X-Browser-Language"]=»i«);const c=Intl.DateTimeFormat().resolvedOptions().timeZone;c&&(n["X-Timezone"]=c);const h=await fetch(`${j.env.apiBaseUr…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://deeptranslate.ai/trans/portal/stripe/billing) — `background` L4:C47350 -> L4:C47426  `…["X-Browser-Language"]=i);const c=Intl.DateTimeFormat().resolvedOptions().timeZone;c&&(n["X-Timezone"]=c);const h=await »fetch(`${j.env.apiBaseUrl}/portal/stripe/billing`,{method:"POST",headers:n})«,f=await h.json();return h.ok&&f.code==="S000000"&&f.data&&f.data.url?{success:!0,url:f.data.url}:(console.error("Failed…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L4 `…t logged in"};const »n={"Accept-Language":t||"en",Authorization:e.token,"Content-Type":"application/json"},s=chrome.runtime.id;s&&(n["X-Plugi …⟨tainted span: 433 chars⟩… meZone;c&&(n["X-Timezone"]=c);const h=await fetch(`${j.env.apiBaseUrl}/portal/stripe/billing`,{method:"POST",headers:n})«,f=await h.json();re…`  · ASSIGN:identifier, ELEMENT:object.setProperty

---
