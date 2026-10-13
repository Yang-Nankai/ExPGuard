# Source-level Taint Flow — keleecjcfmdfipfcjlfjghkdedjkpnln 2.0.0

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L276:C67 -> L276:C74  `console.log("external message received: " + JSON.stringify(»request«));`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeTemplate) — `background` L298:C10 -> L298:C66  `await »chrome.storage.local.set({themeTemplate: themeTemplate})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (40 raw steps → 16 distinct lines):
   1. L276 `console.log("external message received: " + »JSON.stringify(request)«);`  · ASSIGN:identifier, RETURN:json.stringify, ASSIGN:binary-right
   2. L277 `let response = await handleConfigMessage(»request«);`  · ASSIGN:identifier
   3. L284 `let themeTemplate = »request.themeTemplate || 'totoro'«;// 兼容老版本`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   4. L294 `if(»themeTemplate« == 'teto'){`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L295 `»request«[LOGO_BLOB_KEY] = false;`  · ASSIGN:identifier
   6. L297 `let savetask = saveThemeConfig(»request«);`  · ASSIGN:identifier
   7. L298 `»await chrome.storage.local.set({themeTemplate: themeTemplate})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   8. L311 `if (»themeTemplate«) {`  · ASSIGN:identifier
   9. L312 `if(oldThemeTemplate != »themeTemplate«){`  · ASSIGN:identifier, ASSIGN:binary-right
  10. L314 `changeTheme(tab.id, oldThemeTemplate, »themeTemplate«, stg);`  · ASSIGN:identifier
  11. L160 `if ( »newTheme« ){`  · ASSIGN:identifier
  12. L162 `files: [ »"themes/" + newTheme« + "/styles.css"],`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  13. L161 (→L165) `»        chrome.scripting.insertCSS({«`  · ELEMENT:object.setProperty
  14. L168 `if(»newTheme« != 'teto'){`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L178 `args  : [ »newTheme« ],`  · ASSIGN:identifier
  16. L176 (→L182) `»	    chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty

---
