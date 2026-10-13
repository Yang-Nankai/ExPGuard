# Source-level Taint Flow — bdhficnphioomdjhdfbhdepjgggekodf 6.0.1

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 3  (collapsed from 11 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.hostname)

- **Source**: `DOCUMENT_LOCATION` — `index` L2391:C25 -> L2391:C55  `const schoolName = »window.location.hostname.split«(".")[0];`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `index` L2479:C6 -> L2479:C16  `»fetch(url)«.then((response) => response.json()).then((data2) => {`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (19 raw steps → 5 distinct lines):
   1. L2391 `const »schoolName = window.location.hostname.split(".")[0]«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L2392 `if (»!schoolName«) {`  · ASSIGN:identifier, ASSIGN:unary
   3. L2395 `return »schoolName«;`  · ASSIGN:identifier
   4. L2478 `const url = »`https://${getSchoolName()}.smartschool.be/results/api/v1/evaluations/?itemsOnPage=1000`«;`  · ASSIGN:template-literal
   5. L2479 `fetch(»url«).then((response) => response.json()).then((data2) => {`  · ASSIGN:identifier

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(smppPageScriptMessage))

- **Source**: `TARGET_CUSTOM_EVENT` — `background-scripts/index` L2333:C2 -> L2338:C3 (spans to L2338)  `»browser.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background-scripts/index` L1993:C23 -> L1998:C6 (spans to L1998)  `const resp = await »fetch("https://theme.smpp.be/" + shareId, {«`  (url-control=PARTIAL)
  - `CHROME_LOCAL_STORAGE` (themeShareCache) — `background-scripts/index` L2062:C10 -> L2062:C62  `await »browser.storage.local.set({ themeShareCache: data })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (50 raw steps → 9 distinct lines):
   1. L2333 (→L2338) `»  browser.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[theme_sharing_content->background-scripts/index]`
   2. L1954 `const id = await getSharedThemeId(»shareId«);`  · ASSIGN:identifier
   3. L1947 `if (themeShareId === »shareId«) {`  · ASSIGN:identifier, ASSIGN:binary-right
   4. L1993 `const resp = await fetch("https://theme.smpp.be/" + »shareId«, {`  · ASSIGN:identifier, ASSIGN:binary-right
   5. L2005 `await updateThemeShareCache(id, »shareId«);`  · ASSIGN:identifier
   6. L2061 `data[themeId] = »shareId«;`  · ASSIGN:identifier
   7. L2046 `»return {};«`  · ELEMENT:object.setProperty
   8. L2062 `»await browser.storage.local.set({ themeShareCache: data })«;`  · ELEMENT:object.setProperty
   9. L2044 `const »cache = await browser.storage.local.get("themeShareCache")«;`  · ELEMENT:object.setProperty

---

## Flow #3 — TARGET_CUSTOM_EVENT (From storage.local.set('themeShareCache') in background-scripts/index)  ·  9× duplicate paths collapsed

- **Source**: `TARGET_CUSTOM_EVENT` — `background-scripts/index` L2333:C2 -> L2338:C3 (spans to L2338)  `»browser.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeShareCache) — `background-scripts/index` L2062:C10 -> L2062:C62  `await »browser.storage.local.set({ themeShareCache: data })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (61 raw steps → 13 distinct lines):
   1. L2333 (→L2338) `»  browser.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[theme_sharing_content->background-scripts/index]`
   2. L1954 `const id = await getSharedThemeId(»shareId«);`  · ASSIGN:identifier
   3. L1947 `if (themeShareId === »shareId«) {`  · ASSIGN:identifier, ASSIGN:binary-right
   4. L1993 `const resp = await fetch("https://theme.smpp.be/" + »shareId«, {`  · ASSIGN:identifier, ASSIGN:binary-right
   5. L2005 `await updateThemeShareCache(id, »shareId«);`  · ASSIGN:identifier
   6. L2061 `»data[themeId] = shareId«;`  · ASSIGN:identifier
   7. L2046 `»return {};«`  · ELEMENT:object.setProperty
   8. L2062 `»await browser.storage.local.set({ themeShareCache: data })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier
   9. L2044 `const »cache = await browser.storage.local.get("themeShareCache")«;`  · ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: themeShareCache, sender: background-scripts/index, receiver: background-scripts/index]
  10. L2045 `if (»!cache.themeShareCache«) {`  · ASSIGN:unary
  11. L1945 `const »cache = await loadThemeShareCache()«;`  · ELEMENT:implicit.add
  12. L1946 `for (let [theme, themeShareId] of Object.entries(»cache«)) {`  · ASSIGN:identifier
  13. L2060 `const »data = await loadThemeShareCache()«;`  · ELEMENT:implicit.add

---
