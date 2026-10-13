# Source-level Taint Flow — gekgfnbhagbmhfjjmljkagehgckmbili 1.1.3

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background.bundle` L1:C3100 -> L1:C3552  `…)+"+"})})),c(a))})),»chrome.runtime.onMessage.addListener(((e,t,o)=>{if("POST_DATA"===e.action){let t=(e.payload||[]).filter((e=>s(e.url)));i …⟨tainted span: 452 chars⟩… e})=>e));r("add-product-category",{category_ids:a.join(","),product_id:e.product_id}).then((e=>{o(e)}))}}))}}return!0}))«;const c=t=>{let a=e…`
- **Sink(s)**:
  - `FETCH_BODY` (https://extapi.lowdeal.in/add-product) — `background.bundle` L1:C1578 -> L1:C1599  `…"application/json","Access-Control-Allow-Origin":"POST",Authorization:e.post_api_auth_key,...r},body:JSON.stringify(a)};»fetch(e.post_api+t,n)«.then((e=>e.json())).then((function(e){o(e)})).catch((e=>{i({resError:e,message:"Server not responding!"})}))}))},o=()=>…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background.bundle` L1:C1223 -> L1:C1244  `…headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"GET",Authorization:e.post_api_auth_key,...a}};»fetch(e.post_api+t,i)«.then((e=>e.json())).then((function(e){r(e)})).catch((e=>{o({resError:e,message:"Server not responding!"})}))}))},r=func…`  (url-control=FULL)
  - `FETCH_BODY` (https://extapi.lowdeal.in/add-product-category) — `background.bundle` L1:C1578 -> L1:C1599  `…"application/json","Access-Control-Allow-Origin":"POST",Authorization:e.post_api_auth_key,...r},body:JSON.stringify(a)};»fetch(e.post_api+t,n)«.then((e=>e.json())).then((function(e){o(e)})).catch((e=>{i({resError:e,message:"Server not responding!"})}))}))},o=()=>…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (27 raw steps → 1 distinct lines):
   1. L1 `…}};fetch(e.post_api+»t,i).then((e=>e.json())).then((function(e){r(e)})).catch((e=>{o({resError:e,message:"Server not responding!"})}))}))},r= …⟨tainted span: 2312 chars⟩… e})=>e));r("add-product-category",{category_ids:a.join(","),product_id:e.product_id}).then((e=>{o(e)}))}}))}}return!0}))«;const c=t=>{let a=e…`  · MESSAGE, ASSIGN:logical-left, ELEMENT:member-element-container, RETURN:json.stringify, ELEMENT:object.setProperty, ELEMENT:member-element, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:binary-right
      ⇄ cross-context hop: `runtime.single.sender.message[contentScript.bundle->background.bundle]`

---

## Flow #2 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `background.bundle` L1:C3100 -> L1:C3552  `…)+"+"})})),c(a))})),»chrome.runtime.onMessage.addListener(((e,t,o)=>{if("POST_DATA"===e.action){let t=(e.payload||[]).filter((e=>s(e.url)));i …⟨tainted span: 452 chars⟩… e})=>e));r("add-product-category",{category_ids:a.join(","),product_id:e.product_id}).then((e=>{o(e)}))}}))}}return!0}))«;const c=t=>{let a=e…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background.bundle` L1:C1223 -> L1:C1244  `…headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"GET",Authorization:e.post_api_auth_key,...a}};»fetch(e.post_api+t,i)«.then((e=>e.json())).then((function(e){r(e)})).catch((e=>{o({resError:e,message:"Server not responding!"})}))}))},r=func…`  (url-control=FULL)
  - `FETCH_BODY` (https://extapi.lowdeal.in/add-product-category) — `background.bundle` L1:C1578 -> L1:C1599  `…"application/json","Access-Control-Allow-Origin":"POST",Authorization:e.post_api_auth_key,...r},body:JSON.stringify(a)};»fetch(e.post_api+t,n)«.then((e=>e.json())).then((function(e){o(e)})).catch((e=>{i({resError:e,message:"Server not responding!"})}))}))},o=()=>…`
  - `FETCH_BODY` (https://extapi.lowdeal.in/add-product) — `background.bundle` L1:C1578 -> L1:C1599  `…"application/json","Access-Control-Allow-Origin":"POST",Authorization:e.post_api_auth_key,...r},body:JSON.stringify(a)};»fetch(e.post_api+t,n)«.then((e=>e.json())).then((function(e){o(e)})).catch((e=>{i({resError:e,message:"Server not responding!"})}))}))},o=()=>…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (205 raw steps → 1 distinct lines):
   1. L1 `…}};fetch(e.post_api+»t,i).then((e=>e.json())).then((function(e){r(e)})).catch((e=>{o({resError:e,message:"Server not responding!"})}))}))},r= …⟨tainted span: 2312 chars⟩… e})=>e));r("add-product-category",{category_ids:a.join(","),product_id:e.product_id}).then((e=>{o(e)}))}}))}}return!0}))«;const c=t=>{let a=e…`  · MESSAGE, ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty, RETURN:json.stringify, RETURN:fallback-return, ASSIGN:logical-right
      ⇄ cross-context hop: `runtime.single.sender.message[contentScript.bundle->background.bundle]`

---
