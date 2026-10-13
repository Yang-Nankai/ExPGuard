# Source-level Taint Flow — mklbhckkgddhlcdagmobdmnadpjokkkn 2.106.7846

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ?

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `XML_HTTP_REQUEST_OPEN` — `background` L3:C24701 -> L3:C24813  `…or("Network request timed out"))},0)},o.onabort=function(){setTimeout(function(){n(new nc("Aborted","AbortError"))},0)},»o.open(a.method,function(e){try{return""===e&&r1.location.href?r1.location.href:e}catch(t){return e}}(a.url),!0)«,"include"===a.credentials?o.withCredentials=!0:"omit"===a.credentials&&(o.withCredentials=!1),"responseType"in o&&(r2.b…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (0 raw steps → 0 distinct lines):

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L3:C455609 -> L3:C455610  `…er.runtime.onMessage.addListener((e,t)=>iw(e,t,n)),chrome.runtime.onMessageExternal.addListener(async(e,t,r)=>(await iw(»e«,t,n),r(!0),!0)),iE||(iE=!0,chrome.action.onClicked.addListener(iT),chrome.runtime.onMessage.addListener(i_)),I.browser.…`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (_sessionKey) — `background` L3:C451981 -> L3:C452024  `…Change;constructor(){this.onSessionChange=new EventSource}setValue(e,t){return this.onSessionChange.fire("set_value",t),»chrome.storage.session.set({_sessionKey:t})«}static getValue(e){return chrome.storage.session.get(e)}static clear(){return chrome.storage.session.clear()}static byt…`
  - `XML_HTTP_REQUEST_SEND` — `background` L3:C25513 -> L3:C25558  `…addEventListener("abort",i),o.onreadystatechange=function(){4===o.readyState&&a.signal.removeEventListener("abort",i)}),»o.send(void 0===a._bodyInit?null:a._bodyInit)«})}nu.polyfill=!0,r1.fetch||(r1.fetch=nu,r1.Headers=r8,r1.Request=no,r1.Response=ns);var nd=a(39875),np=a.n(nd);let nh=n…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (13066 raw steps → 2 distinct lines):
   1. L3 `…,t,r,n,a){this.path=»e,this.method=t,this.lastUpdated=r,this.expirationTime=n,this.promise=a,this.pages=new Map}addPage(e,t){this.pages.set(e …⟨tainted span: 454492 chars⟩… r.runtime.onMessage.addListener((e,t)=>iw(e,t,n)),chrome.runtime.onMessageExternal.addListener(async(e,t,r)=>(await iw(e«,t,n),r(!0),!0)),iE|…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:destructure-property[message], ELEMENT:destructure-property[payload], ELEMENT:object.setProperty, ASSIGN:template-literal, ASSIGN:logical-right, ASSIGN:unary, ASSIGN:conditional-consequent, ASSIGN:binary-right, RETURN:decodeURIComponent, COPY:object.assign-opaque, COPY:object.assign, ELEMENT:member-element-container, RETURN:fallback-return, INITIAL:URL.constructor, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href, INITIAL:Uint8Array.constructor, ELEMENT:implicit.add, ASSIGN:conditional-alternate, ELEMENT:destructure-property[actionPayload], ELEMENT:destructure-property[actionType], ELEMENT:destructure-property[queryKeys], ELEMENT:member.length, RETURN:json.parse, ELEMENT:destructure-property[filename], ELEMENT:destructure-property[mimeType], ELEMENT:destructure-property[location], ELEMENT:destructure-property[type], ELEMENT:destructure-property[endpoint], RETURN:btoa
   2. L1 `…r||!1}function r(){}»r.prototype._events=void 0,r.prototype.listeners=function(e){if(!this._events||!this._events[e])return[];if(this._events …⟨tainted span: 34301 chars⟩… turn p}},34447(e){e.exports=function(e,t){for(var r,n=-1,a=e.length,o=-1,i=[];++n<a;){var s=e[n],l=t?t(s,n,e):s;n&&r===l«||(r=l,i[++o]=s)}ret…`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ASSIGN:binary-left, ASSIGN:logical-right

---
