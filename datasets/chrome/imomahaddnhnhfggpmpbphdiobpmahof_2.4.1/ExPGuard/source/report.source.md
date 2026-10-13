# Source-level Taint Flow — imomahaddnhnhfggpmpbphdiobpmahof 2.4.1

- Source type: CRX
- Files with issues: 8 / 13
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `resources/js/background` L26:C16 -> L26:C23  `if (»request«.action == 'install') {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `resources/js/background` L5:C18 -> L5:C49  `rawResponse = »fetch(img_url, {method: 'get'})«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (163 raw steps → 16 distinct lines):
   1. L26 `if (»request.action« == 'install') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L32 `preloadImgs(»request.files«);`  · ASSIGN:identifier, ELEMENT:member-element
   3. L12 `imgs = »JSON.parse(imgs)«;`  · ASSIGN:identifier, RETURN:json.parse
   4. L13 `for (»var key« in imgs) {`  · ITERATE:loop.iteration
   5. L14 `if (»imgs[key].indexOf('themes_pic_file')« > 0) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   6. L15 `img_files.push('https://youtube-skins.com' + »imgs[key]«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
   7. L2 `var »img_files = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
   8. L19 `httpPreload(»img_files.shift()«);`  · ELEMENT:array.shift
   9. L5 `rawResponse = fetch(»img_url«, {method: 'get'});`  · ASSIGN:identifier
  10. L6 `if (»img_files.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  11. L7 `httpPreload(»img_files.shift()«);`  · ELEMENT:array.shift
  12. L18 `if (»img_files.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  13. L33 `skins.unshift(»request«);`  · ASSIGN:identifier
  14. L41 `if (»request.action« == 'apply_skin') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  15. L45 `if (e.skins[key].id == »request.id«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  16. L64 `if (»request.action« == 'open_cursorland') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---
