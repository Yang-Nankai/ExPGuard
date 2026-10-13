# Source-level Taint Flow — {62c7a124-b108-4c75-aa44-60a7bac6cf9e} 1.0.1

- Source type: XPI
- Files with issues: 7 / 7
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 42 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.origin)

- **Source**: `DOCUMENT_LOCATION` — `background` L1:C1380 -> L1:C2844  `…((function(){e()})),»chrome.runtime.onMessage.addListener((function(e,t,o){if("joinUserInRoom"===e.action){var n=e.room,r=e.url,a=e.isAdmin,c …⟨tainted span: 1464 chars⟩… ))}}catch(e){}else"removeTab"===e.action&&(console.log("message of removeTab"),e.tabId&&chrome.tabs.remove(e.tabId))}}))«})();`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L1:C2516 -> L1:C2726  `…action:"click",store:i,tabId:t}))}))}));else{var d="prevUrl"===i.type?"".concat(i.homeAff).concat(origin,"/"):i.homeAff;»chrome.tabs.create({url:d,pinned:!0,active:!1,index:0},(function(e){chrome.tabs.onUpdated.addListener((function(t,o){"complete"===o.status&&t===e.id&&setTimeout((function(){chrome.tabs.remove(e.id)}),3e3)}))}))«}}catch(e){}else"removeTab"===e.action&&(console.log("message of removeTab"),e.tabId&&chrome.tabs.remove(e.tabId))}}))})…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (20 raw steps → 1 distinct lines):
   1. L1 `…((function(){e()})),»chrome.runtime.onMessage.addListener((function(e,t,o){if("joinUserInRoom"===e.action){var n=e.room,r=e.url,a=e.isAdmin,c …⟨tainted span: 1464 chars⟩… ))}}catch(e){}else"removeTab"===e.action&&(console.log("message of removeTab"),e.tabId&&chrome.tabs.remove(e.tabId))}}))«})();`  · MESSAGE, ASSIGN:logical-left, ELEMENT:member-element, RETURN:string.concat, ELEMENT:member-element-container, ASSIGN:conditional-alternate, ASSIGN:identifier, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[content/contentScript->background]`

---

## Flow #2 — WINDOW_CUSTOM_EVENT (window.addEventListener(PassToBackground))

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L1:C1380 -> L1:C2844  `…((function(){e()})),»chrome.runtime.onMessage.addListener((function(e,t,o){if("joinUserInRoom"===e.action){var n=e.room,r=e.url,a=e.isAdmin,c …⟨tainted span: 1464 chars⟩… ))}}catch(e){}else"removeTab"===e.action&&(console.log("message of removeTab"),e.tabId&&chrome.tabs.remove(e.tabId))}}))«})();`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L1:C2516 -> L1:C2726  `…action:"click",store:i,tabId:t}))}))}));else{var d="prevUrl"===i.type?"".concat(i.homeAff).concat(origin,"/"):i.homeAff;»chrome.tabs.create({url:d,pinned:!0,active:!1,index:0},(function(e){chrome.tabs.onUpdated.addListener((function(t,o){"complete"===o.status&&t===e.id&&setTimeout((function(){chrome.tabs.remove(e.id)}),3e3)}))}))«}}catch(e){}else"removeTab"===e.action&&(console.log("message of removeTab"),e.tabId&&chrome.tabs.remove(e.tabId))}}))})…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (67 raw steps → 1 distinct lines):
   1. L1 `…((function(){e()})),»chrome.runtime.onMessage.addListener((function(e,t,o){if("joinUserInRoom"===e.action){var n=e.room,r=e.url,a=e.isAdmin,c …⟨tainted span: 1464 chars⟩… ))}}catch(e){}else"removeTab"===e.action&&(console.log("message of removeTab"),e.tabId&&chrome.tabs.remove(e.tabId))}}))«})();`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ELEMENT:object.setProperty, RETURN:string.concat, ELEMENT:member-element-container, ASSIGN:conditional-alternate, ASSIGN:logical-right
      ⇄ cross-context hop: `runtime.single.sender.message[netflixParty->background]; runtime.single.sender.message[content/index->background]`

---

## Flow #3 — ELEMENT_INNER_HTML (html)

- **Source**: `ELEMENT_INNER_HTML` — `popup/index` L1:C100 -> L1:C120  `(()=>{function e(){for(var e=document.getElementsByTagName("html"),t=0;t<e.length;t++){var n=e[t],i=»n.innerHTML.toString«(),o=i.replace(/__MSG_(\w+)__/g,(function(e,t){return t?chrome.i18n.getMessage(t):""}));o!=i&&(n.innerHTML=o)}}var t,n,i…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `popup/index` L1:C217 -> L1:C226  `…,i=n.innerHTML.toString(),o=i.replace(/__MSG_(\w+)__/g,(function(e,t){return t?chrome.i18n.getMessage(t):""}));o!=i&&(n.»innerHTML«=o)}}var t,n,i;e();var o=!1,c='<div id="startVideo" class="netflixext-start-party">\n<div class="netflixext-box-header">…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (39 raw steps → 1 distinct lines):
   1. L1 `(()=>{function e(){for(»var e=document.getElementsByTagName("html"),t=0;t<e.length;t++){var n=e[t],i=n.innerHTML.toString(),o=i.replace(/__MSG_(\w+)__/g,(function(e,t){return t?chrome.i18n.getMessage(t):""}));o!=i&&(n.innerHTML=o«)}}var t,n,i;e();var o=!1,c='<div id="startVideo" class="netflixext-start-party">\n<div class="netflixext-box-header">\n…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:object.setProperty

---
