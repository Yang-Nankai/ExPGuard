# Source-level Taint Flow — lkhjgdkpibcepflmlgahofcmeagjmecc 7.1.8

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background/index` L477:C130295 -> L477:C130298  `…n resp}))}else{return null}}))};var background_processMessage=function processMessage(msg,sender,sendResponse){var name=»msg«.name,target=msg.target,data=_objectWithoutProperties(msg,_excluded);if(!target||target.toLowerCase()=="background"){con…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background/index` L477:C133852 -> L477:C133908  `…dResponse(true);break}case"popup-clicked":{console.log("popup-clicked handler",data);if(data&&data.data&&data.data.url){»chrome.tabs.create({url:WEB_URLS["prod"]+data.data.url})«}sendResponse(true);break}case"injectedScriptLoaded":{console.log("injectedScriptLoaded",data,sender.tab);var widgetEnab…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (349 raw steps → 1 distinct lines):
   1. L477 `…tPopup(name,url){if(»!url){url=POPUP_URL_BASE["prod"]+name}return new Promise((function(resolve){var ScenerPopups=getItem("ScenerPopups",{}); …⟨tainted span: 89542 chars⟩… urn true}else if(target.toLowerCase()=="sidebar"){console.log("SIDEBAR message",msg);background_sendMessageToSidebar(msg«).then((function(res…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ITERATE:loop.iteration, ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:unary, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member.length

---
