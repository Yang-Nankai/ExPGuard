# Source-level Taint Flow — {bc6c10a3-cb0f-4cbf-964a-4ab6b5476f20} 2026.11

- Source type: XPI
- Files with issues: 3 / 4
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `goldiemay_content` L1:C679 -> L1:C692  `…e,"https://app.goldiemay.com")});window.addEventListener("message",function(e){e.origin==="https://app.goldiemay.com"&&(»e.data.source«==="app"&&t(e.data),e.data.command&&e.data.command==="sendMessages"&&window.postMessage({type:"outerHeight",value:window…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (https://app.goldiemay.com) — `goldiemay_content` L1:C540 -> L1:C589  `…("Extension context invalidated"))throw n}}chrome.runtime.onMessage.addListener(function(e){e.source&&e.source==="app"||»window.postMessage(e,"https://app.goldiemay.com")«});window.addEventListener("message",function(e){e.origin==="https://app.goldiemay.com"&&(e.data.source==="app"&&t(e.dat…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (18 raw steps → 1 distinct lines):
   1. L1 `…runtime.sendMessage(»e,n=>{if(chrome.runtime.lastError){chrome.runtime.lastError.message?.includes("Extension context invalidated")||console. …⟨tainted span: 669 chars⟩… .origin==="https://app.goldiemay.com"&&(e.data.source==="app"&&t(e.data),e.data.command&&e.data.command==="sendMessages"«&&window.postMessage…`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right, MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[background->goldiemay_content]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L1:C10499 -> L1:C10539  `…ap,Y=new Map,u=!1,T=null,g=null;chrome.commands.onCommand.addListener(mr);chrome.contextMenus.onClicked.addListener(sr);»chrome.runtime.onMessage.addListener(nr)«;chrome.tabs.onActivated.addListener(cr);chrome.tabs.onUpdated.addListener(lr);chrome.tabs.onMoved.addListener(hr);chrom…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (blurStyle) — `background` L1:C12859 -> L1:C12990  `…showNothing",o({presentationMode:e,blurStyle:i,blurNotesStyle:m})}),!0;if(t.command==="enable_presentation_mode")return »chrome.storage.local.set({presentationMode:!0,blurStyle:t.blurStyle||"showPrivate",blurNotesStyle:t.blurNotesStyle||"showNothing"})«,chrome.tabs.query({url:"https://*/*"},e=>{e.filter(i=>i.url&&C(i.url)).forEach(i=>{i.id&&chrome.tabs.reload(i.id)})}),!…`
  - `CHROME_LOCAL_STORAGE` (blurNotesStyle) — `background` L1:C12859 -> L1:C12990  `…showNothing",o({presentationMode:e,blurStyle:i,blurNotesStyle:m})}),!0;if(t.command==="enable_presentation_mode")return »chrome.storage.local.set({presentationMode:!0,blurStyle:t.blurStyle||"showPrivate",blurNotesStyle:t.blurNotesStyle||"showNothing"})«,chrome.tabs.query({url:"https://*/*"},e=>{e.filter(i=>i.url&&C(i.url)).forEach(i=>{i.id&&chrome.tabs.reload(i.id)})}),!…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (18537 raw steps → 1 distinct lines):
   1. L1 `…rn ot(t)?NaN:Number(»t)}function nt(t){return t?(t=it(t),t===1/0||t===-1/0?(t<0?-1:1)*Number.MAX_VALUE:t===t?t:0):t===0?t:0}function st(t){le …⟨tainted span: 23457 chars⟩… t){g&&chrome.tabs.query({active:!0,windowId:g},([r,...o])=>{!r||!r.id||t(r)})}function c(t){yr({...t,version:"2026.11"})«}function yr(t){chro…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:object.setProperty, COPY:object-spread, ELEMENT:member.length, ITERATE:loop.iteration, ELEMENT:implicit.add, ASSIGN:conditional-alternate, ELEMENT:array-spread, ASSIGN:binary-right, ELEMENT:member-element-container, ASSIGN:logical-right, RETURN:fallback-return, ASSIGN:template-literal, RETURN:Date.constructor, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1], ELEMENT:computed-member-unknown-alternative
      ⇄ cross-context hop: `runtime.single.sender.message[goldiemay_content->background]`

---
