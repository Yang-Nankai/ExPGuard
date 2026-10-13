# Source-level Taint Flow — iilnecjehheemiieeblkpkichceocomn 1.4.0

- Source type: CRX
- Files with issues: 2 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L214:C14 -> L214:C21  `console.log(»request«);`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L88:C23 -> L96:C4 (spans to L96)  `const domRes = await »fetch(`https://www.amazon.${AREA_CODE[area]}/dp/${asin}?psc=1`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L63:C23 -> L71:C4 (spans to L71)  `const domRes = await »fetch(`https://www.amazon.${AREA_CODE[area]}/product-reviews/${asin}/ref=cm_cr_getr_d_show_all?ie=UTF8&showViewpoints=1&pageNumber=1&reviewerType=all_reviews&filterByStar=all_stars&sortBy=recent`, {«`  (url-control=PARTIAL)
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L239:C12 -> L239:C50  `await »sendResponse({rv, asin: request.asin})«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L145:C20 -> L153:C4 (spans to L153)  `const res = await »fetch(`https://www.amazon.com/s?k=${kw}&page=${page}&ref=sr_pg_${page}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L180:C20 -> L188:C4 (spans to L188)  `const res = await »fetch(`https://www.amazon.com/gp/${t ? 'bestsellers' : 'new-releases'}/${c}/${n || ''}?pg=${p}`, {«`  (url-control=PARTIAL)
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L227:C12 -> L227:C87  `await »sendResponse({listing, rv, asin: request.asin, reqNum, area: request.area})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (210 raw steps → 31 distinct lines):
   1. L214 `console.log(»request«);`  · ASSIGN:identifier
   2. L215 `if (»request.kind« === 1) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L217 `const listing = await getListing(»request.asin, request.area«)`  · ASSIGN:identifier, ELEMENT:member-element
   4. L88 `const domRes = await fetch(»`https://www.amazon.${AREA_CODE[area]}/dp/${asin}?psc=1`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
   5. L231 `} else if (»request.kind« === 2) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L218 `const count = await getReviewsCount(»request.asin, request.area«)`  · ASSIGN:identifier, ELEMENT:member-element
   7. L63 `const domRes = await fetch(»`https://www.amazon.${AREA_CODE[area]}/product-reviews/${asin}/ref=cm_cr_getr_d_show_all?ie=UTF8&showViewpoints=1&pageNumber=1&reviewerType=all_reviews&filterByStar=all_stars&sortBy=recent`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
   8. L81 `const reviewCount = AREA_FUNC[»area«](text)`  · ASSIGN:identifier
   9. L243 `} else if (»request.kind« === 3) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  10. L239 `»await sendResponse({rv, asin: request.asin})«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  11. L245 `const listing = await getListing(»request.asin«)`  · ASSIGN:identifier, ELEMENT:member-element
  12. L250 `} else if (»request.kind« === 4) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L253 `const res = await getTopAsin(»request.kw, request.page«)`  · ASSIGN:identifier, ELEMENT:member-element
  14. L169 `while (page < »p«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  15. L170 `const nextDom = await getNextPage(»kw«, page)`  · ASSIGN:identifier
  16. L145 `const res = await fetch(»`https://www.amazon.com/s?k=${kw}&page=${page}&ref=sr_pg_${page}`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  17. L258 `} else if (»request.kind« === 5) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  18. L222 `Array.from({length: reqNum > request.step ? »request.step : reqNum},(_, i)=>i + request.current«).map(async (item, i) => {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ASSIGN:binary-right
  19. L221 (→L226) `»      const rv = await Promise.all(«`  · ELEMENT:object.setProperty
  20. L261 `const res1 = await getBsrAsinList(1, »request.cate, request.node, request.page«)`  · ASSIGN:identifier, ELEMENT:member-element
  21. L204 `while (page <= »p«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  22. L205 `const nextDom = await getBsrTop(t, »c, n«, page)`  · ASSIGN:identifier
  23. L180 `const res = await fetch(»`https://www.amazon.com/gp/${t ? 'bestsellers' : 'new-releases'}/${c}/${n || ''}?pg=${p}`«, {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:template-literal
  24. L227 `»await sendResponse({listing, rv, asin: request.asin, reqNum, area: request.area})«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  25. L262 `const res2 = await getBsrAsinList(0, »request.cate, request.node, request.page«)`  · ASSIGN:identifier, ELEMENT:member-element
  26. L224 `return await getReviewDom(»request.asin, item, request.area«)`  · ASSIGN:identifier, ELEMENT:member-element
  27. L116 `asin: »asin«,`  · ASSIGN:identifier
  28. L110 (→L120) `»  const req = {«`  · ELEMENT:object.setProperty
  29. L122 `const res = await fetch(`https://www.amazon.${AREA_CODE[»area«]}/hz/reviews-render/ajax/reviews/get/ref=cm_cr_getr_d_paging_btm_next_${page}`, {`  · ASSIGN:identifier
  30. L234 `Array.from({length: 50},(_, i)=>i + »request.current«).map(async (item, i) => {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  31. L236 `return await getReviewDom(»request.asin, item, request.area«)`  · ASSIGN:identifier, ELEMENT:member-element

---
