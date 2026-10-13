# Source-level Taint Flow — knhbjeinoabfecakfppapfgdhcpnekmm 0.1.24

- Source type: CRX
- Files with issues: 2 / 7
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 4 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `worker` L80:C7892 -> L80:C7893  `…(clearInterval(eC),eC=void 0)},wG=async()=>{chrome.runtime.onMessageExternal.addListener((I,A,C)=>{console.dir({message:»I«}),vA("Received chrome eternal message of type:"+I.type),I.type==="check"&&(console.dir({db:$A.getState()}),C({type:"che…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://api.distribute.ai/provider) — `worker` L80:C5676 -> L80:C5760  `…;return}if(LQ&&LQ.readyState===LQ.CONNECTING){vA("Websocket already connecting");return}const{token:A}=$A.getState();A&&»fetch("https://api.distribute.ai/provider",{method:"GET",headers:{Authorization:A}})«.then(C=>{C.status===401&&(vA("Logging out!"),$A.getState().clearToken(),$A.setState({token:!1}))}).catch(C=>{vA("Error …`
  - `WEBSOCKET_URL` — `worker` L80:C5934 -> L80:C6062  `…ate().clearToken(),$A.setState({token:!1}))}).catch(C=>{vA("Error checking provider validity: "+JSON.stringify(C))}),LQ=»new WebSocket(`wss://ws.distribute.ai/?token=${A}&version=0.1.24&platform=extension&lastConnectionId=${I.lastConnectionId??""}`)«,LQ.onopen=async()=>{vA("Websocket opened"),$A.getState().legacyUpdateDatabase({stats:{status:"active"}}),QG(),BG(),CG()…`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (744 raw steps → 2 distinct lines):
   1. L80 `…des(LQ.readyState)||»I.token!==EE&&(EE=I.token,vA("init in response to db change"),eI())});const eI=async()=>{const I=$A.getState();if(I.toke …⟨tainted span: 4526 chars⟩… ().legacyUpdateDatabase({dismissedFeaturesTab:I-1})):await $A.getState().legacyUpdateDatabase({dismissedFeaturesTab:DE})«};rE();`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:template-literal, ELEMENT:destructure-property[token], RETURN:fallback-return
   2. L1 `… tC}from"./assets/lo»gg-CsXoWr3Q.js";import{R as PI,c as wE}from"./assets/flags-B0MHVImD.js";function lC(I){return new Promise((A,C)=>{I.onco …⟨tainted span: 62512 chars⟩… "Tried to log out but no token present");return}vA("Logging out"),I({pastTokens:[...C.pastTokens??[],C.token],token:!1})«}}),{name:"database"…`  · ASSIGN:identifier, RETURN:json.stringify, ASSIGN:template-literal, ELEMENT:object.setProperty, RETURN:fallback-return, ASSIGN:conditional-consequent, COPY:object.assign-opaque, COPY:object.assign, ELEMENT:member-element-container, ASSIGN:unary, COPY:object-spread, ASSIGN:conditional-alternate, ELEMENT:member-element

---
