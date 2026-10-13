# Source-level Taint Flow — bonfdkhbkkdoipfojcnimjagphdnfedb 0.2.6

- Source type: CRX
- Files with issues: 3 / 12
- Distinct taint flows: 2  (collapsed from 28 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/index.ts-C5kIJibv` L2:C121028 -> L2:C121029  `…UUID();l({deviceId:e})}})).catch(ea.captureException)})),chrome.runtime.onMessageExternal.addListener(((e,t,n)=>{switch(»e«.action){case"login":return ta=!1,e.email&&e.jwt&&chrome.storage.local.get(["jwt","isConnected"],(({jwt:t,isConnected:r}…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (email) — `assets/Text-CNnetboo` L1:C1033 -> L1:C1125  `…toStringTag,{value:"Module"}))}const i="isThemeDark",s="fetcherType",c={color:"#ff9736",colorHover:"#ff8c02",colorBackgr»ound:"#000000",colorGray70to100:"#f6f6f6",colorGray80to90:"#c7c7c7",colorGray90to80:"#4e4e4e«",colorGray100to70:"#262626",colorWhite:"#FFFFFF",colorWhiteToBlack:"#FFFFFF",colorBlackToWhite:"#151515",colorError:"#e…`
  - `CHROME_LOCAL_STORAGE` (jwt) — `assets/Text-CNnetboo` L1:C1033 -> L1:C1125  `…toStringTag,{value:"Module"}))}const i="isThemeDark",s="fetcherType",c={color:"#ff9736",colorHover:"#ff8c02",colorBackgr»ound:"#000000",colorGray70to100:"#f6f6f6",colorGray80to90:"#c7c7c7",colorGray90to80:"#4e4e4e«",colorGray100to70:"#262626",colorWhite:"#FFFFFF",colorWhiteToBlack:"#FFFFFF",colorBlackToWhite:"#151515",colorError:"#e…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (63 raw steps → 1 distinct lines):
   1. L2 `…r(((e,t,n)=>{switch(»e.action){case"login":return ta=!1,e.email&&e.jwt&&chrome.storage.local.get(["jwt","isConnected"],(({jwt:t,isConnected:r …⟨tainted span: 293 chars⟩… hen((()=>{d.getWorker(),n({success:!0})})).catch((e=>{u.error("Failed to set app store",{error:e}),n({success:!1})}))}))«,!0;case"logout":ret…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('jwt') in assets/index.ts-C5kIJibv)  ·  27× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/index.ts-C5kIJibv` L2:C121028 -> L2:C121029  `…UUID();l({deviceId:e})}})).catch(ea.captureException)})),chrome.runtime.onMessageExternal.addListener(((e,t,n)=>{switch(»e«.action){case"login":return ta=!1,e.email&&e.jwt&&chrome.storage.local.get(["jwt","isConnected"],(({jwt:t,isConnected:r}…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (isConnected) — `assets/Text-CNnetboo` L1:C1033 -> L1:C1125  `…toStringTag,{value:"Module"}))}const i="isThemeDark",s="fetcherType",c={color:"#ff9736",colorHover:"#ff8c02",colorBackgr»ound:"#000000",colorGray70to100:"#f6f6f6",colorGray80to90:"#c7c7c7",colorGray90to80:"#4e4e4e«",colorGray100to70:"#262626",colorWhite:"#FFFFFF",colorWhiteToBlack:"#FFFFFF",colorBlackToWhite:"#151515",colorError:"#e…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `assets/index.ts-C5kIJibv` L2:C121558 -> L2:C121564  `…to set app store",{error:e}),n({success:!1})})),!0;case"isLoggedIn":return chrome.storage.local.get(["jwt"],(({jwt:e})=>»n(!!e)«)),!0;case"isInstalled":return n({isNewlyInstalled:ta}),!0}})),chrome.runtime.onUpdateAvailable.addListener((e=>{u.info(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (76 raw steps → 1 distinct lines):
   1. L2 `…r(((e,t,n)=>{switch(»e.action){case"login":return ta=!1,e.email&&e.jwt&&chrome.storage.local.get(["jwt","isConnected"],(({jwt:t,isConnected:r …⟨tainted span: 293 chars⟩… hen((()=>{d.getWorker(),n({success:!0})})).catch((e=>{u.error("Failed to set app store",{error:e}),n({success:!1})}))}))«,!0;case"logout":ret…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: jwt, sender: assets/index.ts-C5kIJibv, receiver: assets/index.ts-C5kIJibv], ASSIGN:unary

---
