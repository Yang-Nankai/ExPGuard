# Source-level Taint Flow — abhcgokmndbiegmmbjffdlpihgdmeejf 2.8.5

- Source type: CRX
- Files with issues: 2 / 9
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_INNER_HTML (script)

- **Source**: `ELEMENT_INNER_HTML` — `contentscript` L12203:C12 -> L12203:C43  `if (»scriptTags[i].innerHTML.indexOf«('"username":"') > -1) {`
- **Sink(s)**:
  - `JQUERY_SETTINGS_URL` — `contentscript` L12260:C4 -> L12272:C6 (spans to L12272)  `»$.ajax({«`  (url-control=FULL)
  - `JQUERY_AJAX_URL` — `contentscript` L12260:C4 -> L12272:C6 (spans to L12272)  `»$.ajax({«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (10816 raw steps → 18 distinct lines):
   1. L12203 `if (»scriptTags[i].innerHTML.indexOf('"username":"')« > -1) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   2. L12204 `var »foundObject = getObjectWithKeyAndValue(JSON.parse(scriptTags[i].innerHTML), 'id', getCookie('ds_user_id'))«;`  · RETURN:json.parse, ELEMENT:implicit.add
   3. L12182 `for (»var prop« in theObject) {`  · ITERATE:loop.iteration
   4. L12175 `for (var i = 0; i < »theObject.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
   5. L12183 `if (»prop« == theKey) {`  · ASSIGN:identifier, ASSIGN:binary-left
   6. L12176 `result = getObjectWithKeyAndValue(»theObject[i]«, theKey, theValue);`  · ELEMENT:member-element
   7. L12184 `if (»theObject[prop]« == theValue) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L12189 `if (»theObject[prop]« instanceof Object || theObject[prop] instanceof Array) {`  · ASSIGN:identifier, ELEMENT:member-element
   9. L12190 `result = getObjectWithKeyAndValue(»theObject[prop]«, theKey, theValue);`  · ASSIGN:identifier, ELEMENT:member-element
  10. L12205 `if (»foundObject && foundObject.username«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  11. L12208 `"viewer": »foundObject«,`  · ASSIGN:identifier
  12. L12206 (→L12210) `»                user = {«`  · ELEMENT:object.setProperty
  13. L12209 `"viewerId": »foundObject.id«`  · ASSIGN:identifier, ELEMENT:member-element
  14. L12261 `url: '' + urlAcctInfo + »user.viewer.username«,`  · ELEMENT:member-element, ASSIGN:binary-right
  15. L12260 (→L12297) `»    $.ajax({«`  · ELEMENT:object.setProperty
  16. L12251 `if (»user && user.viewer && user.viewer.username != null«) {`  · ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  17. L2210 `if (»typeof user !== 'undefined' && user.viewer && user.viewer.username && usernameNorm === normalizeConvenienceUsername(user.viewer.username)«) {`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  18. L11002 `return String(»s || ''«).trim().replace(/^@/, '').toLowerCase();`  · ASSIGN:identifier, ASSIGN:logical-left

---

## Flow #2 — ELEMENT_TEXT_CONTENT (txtConsole)

- **Source**: `ELEMENT_TEXT_CONTENT` — `contentscript` L1927:C25 -> L1927:C48  `growbotLog: '' + »fakeConsole.textContent« + '\n' + txt`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (growbotLog) — `contentscript` L1926:C4 -> L1928:C23 (spans to L1928)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (648 raw steps → 4 distinct lines):
   1. L1927 `growbotLog: »'' + fakeConsole.textContent + '\n'« + txt`  · ASSIGN:binary-right, ASSIGN:binary-left
   2. L1926 (→L1928) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   3. L1930 `fakeConsole.textContent = »fakeConsole.textContent + '\n'« + txt;`  · ASSIGN:binary-left
   4. L1918 `var »fakeConsole = document.getElementById('txtConsole')«;`  · ELEMENT:object.setProperty

---

## Flow #3 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `backgroundscript` L20:C25 -> L20:C50  `if (!/firefox/i.test(»navigator.userAgent || ''«)) {`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.growbotforfollowers.com/actions/auth_login.php) — `backgroundscript` L374:C44 -> L386:C18 (spans to L386)  `const loginResponse = await »fetch('https://www.growbotforfollowers.com/actions/auth_login.php', {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (11 raw steps → 3 distinct lines):
   1. L20 `if (!/firefox/i.test(»navigator.userAgent || ''«)) {`  · ASSIGN:logical-left
   2. L374 (→L386) `»                const loginResponse = await fetch('https://www.growbotforfollowers.com/actions/auth_login.php', {«`  · ELEMENT:object.setProperty
   3. L377 (→L385) `»                    body: JSON.stringify({«`  · RETURN:json.stringify

---
