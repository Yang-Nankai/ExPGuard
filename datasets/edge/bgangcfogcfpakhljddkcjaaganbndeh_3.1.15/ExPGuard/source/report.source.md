# Source-level Taint Flow — bgangcfogcfpakhljddkcjaaganbndeh 3.1.15

- Source type: CRX
- Files with issues: 3 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 4 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L2:C1486949 -> L2:C1496654  `…${a}/api/get/`};p(),»chrome.runtime.onMessage.addListener((n,i,c)=>{const p=t.TS.getInstance().getConfig();if(u.info("onMessage",n),"fetch"== …⟨tainted span: 9705 chars⟩… ),!0):"set-first-cart-celebrated"===n.action&&(chrome.storage.local.set({firstCartCelebrated:!0},()=>{c({ok:!0})}),!0)})«,chrome.alarms.onAla…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L2:C1489028 -> L2:C1489069  `…artItems:o,sourceParam:d}=n;return t?(t=t.toUpperCase().trim().replace(/HTTPS:\/\/SHARE-A-CART\.COM\/(GET|SHARE)\//,""),»fetch(r.A.data.get+encodeURIComponent(t))«.then(e=>e.json()).then(m=>{var h;if(m.error)return void c({errorCode:`${m.error}`});if(m.vendorStatus&&"active"!==m.ven…`  (url-control=FULL)
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L2:C1489380 -> L2:C1489418  `…s} for cartId=${t}`);const e=new URL(`${p.site}/get/${encodeURIComponent(t)}`);return d&&e.searchParams.set("source",d),»chrome.tabs.create({url:e.toString()})«,void c()}o&&(m.items=o),m.mobile=n.mobile;const y=l.getVendorByID(m.vendor);y?(chrome.storage.local.set({lastReceivedCa…`
  - `CHROME_LOCAL_STORAGE` (lastReceivedCart) — `js/background` L2:C1489498 -> L2:C1489549  `…),chrome.tabs.create({url:e.toString()}),void c()}o&&(m.items=o),m.mobile=n.mobile;const y=l.getVendorByID(m.vendor);y?(»chrome.storage.local.set({lastReceivedCart:{id:t}})«,m.mobile||n.isSafari?((null===(h=null==i?void 0:i.tab)||void 0===h?void 0:h.id)&&(r.A.data.sacTabId=i.tab.id),y.receive…`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L2:C1489831 -> L2:C1489897  `…eive] [${y.displayName}][url=${e}][cartId=${t}]`,n,{name:y.id,tags:{type:"vendor",operation:"receive",vendor:y.id}})})):»chrome.tabs.create({url:`${p.site}/receive/${t}?source=${d||""}`})«.then(async e=>{await new Promise(e=>setTimeout(e,3e3)),e.id&&(r.A.data.sacTabId=e.id),y.receive(m).catch(e=>{u.errorToS…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (336 raw steps → 1 distinct lines):
   1. L2 `…${a}/api/get/`};p(),»chrome.runtime.onMessage.addListener((n,i,c)=>{const p=t.TS.getInstance().getConfig();if(u.info("onMessage",n),"fetch"== …⟨tainted span: 31564 chars⟩… 0,when:Date.now()}))}),chrome.runtime.onMessage.addListener(e=>{"open-tab"===e.action&&chrome.tabs.create({url:e.url})})«,chrome.runtime.onIn…`  · MESSAGE, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:conditional-alternate, ELEMENT:implicit.add, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:encodeURIComponent, ASSIGN:template-literal, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container, RETURN:URLSearchParams.append, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href
      ⇄ cross-context hop: `runtime.single.sender.message[js/sac->js/background]`

---
