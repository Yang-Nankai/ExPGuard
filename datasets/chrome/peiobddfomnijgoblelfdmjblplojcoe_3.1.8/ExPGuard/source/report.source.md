# Source-level Taint Flow — peiobddfomnijgoblelfdmjblplojcoe 3.1.8

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L2:C1405129 -> L2:C1413932  `…${a}/api/get/`};u(),»chrome.runtime.onMessage.addListener((n,i,s)=>{const u=t.TS.getInstance().getConfig();if(l.info("onMessage",n),"fetch"== …⟨tainted span: 8803 chars⟩… ),!0):"set-first-cart-celebrated"===n.action&&(chrome.storage.local.set({firstCartCelebrated:!0},()=>{s({ok:!0})}),!0)})«,chrome.alarms.onAla…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L2:C1406971 -> L2:C1407012  `…artItems:c,sourceParam:p}=n;return t?(t=t.toUpperCase().trim().replace(/HTTPS:\/\/SHARE-A-CART\.COM\/(GET|SHARE)\//,""),»fetch(r.A.data.get+encodeURIComponent(t))«.then(e=>e.json()).then(m=>{var h;if(m.error)return void s({errorCode:`${m.error}`});c&&(m.items=c),m.mobile=n.mobile;co…`  (url-control=FULL)
  - `CHROME_LOCAL_STORAGE` (lastReceivedCart) — `js/background` L2:C1407167 -> L2:C1407218  `…f(m.error)return void s({errorCode:`${m.error}`});c&&(m.items=c),m.mobile=n.mobile;const y=d.getVendorByID(m.vendor);y?(»chrome.storage.local.set({lastReceivedCart:{id:t}})«,m.mobile||n.isSafari?((null===(h=null==i?void 0:i.tab)||void 0===h?void 0:h.id)&&(r.A.data.sacTabId=i.tab.id),y.receive…`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L2:C1407500 -> L2:C1407566  `…eive] [${y.displayName}][url=${e}][cartId=${t}]`,n,{name:y.id,tags:{type:"vendor",operation:"receive",vendor:y.id}})})):»chrome.tabs.create({url:`${u.site}/receive/${t}?source=${p||""}`})«.then(async e=>{await new Promise(e=>setTimeout(e,3e3)),e.id&&(r.A.data.sacTabId=e.id),y.receive(m).catch(e=>{l.errorToS…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (278 raw steps → 1 distinct lines):
   1. L2 `…${a}/api/get/`};u(),»chrome.runtime.onMessage.addListener((n,i,s)=>{const u=t.TS.getInstance().getConfig();if(l.info("onMessage",n),"fetch"== …⟨tainted span: 30599 chars⟩… 0,when:Date.now()}))}),chrome.runtime.onMessage.addListener(e=>{"open-tab"===e.action&&chrome.tabs.create({url:e.url})})«,chrome.runtime.onIn…`  · MESSAGE, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:conditional-alternate, ELEMENT:implicit.add, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:encodeURIComponent, ELEMENT:object.setProperty, ASSIGN:template-literal
      ⇄ cross-context hop: `runtime.single.sender.message[js/sac->js/background]`

---
