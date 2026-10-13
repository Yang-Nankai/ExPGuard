# Source-level Taint Flow — steve@readlang.com 0.9.38

- Source type: XPI
- Files with issues: 3 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `src/background` L105:C0 -> L233:C2 (spans to L233)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `src/background` L159:C27 -> L170:C12 (spans to L170)  `response = await »fetch(url, {«`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `src/background` L159:C27 -> L170:C12 (spans to L170)  `response = await »fetch(url, {«`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `src/background` L259:C4 -> L271:C5 (spans to L271)  `»chrome.windows.create(«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (57 raw steps → 15 distinct lines):
   1. L105 (→L233) `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[src/contentScript->src/background]`
   2. L115 `const data = »request.data?.data«;`  · ELEMENT:member-element
   3. L126 `if (»data.readlangHostname« === readlangHostname) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L135 `updateDictionaryWindow(»data.url«, function (updated) {`  · ASSIGN:identifier, ELEMENT:member-element
   5. L142 `updateDictionaryWindow(»data.url«);`  · ASSIGN:identifier, ELEMENT:member-element
   6. L153 `? `?${new URLSearchParams(»data.data«)}``  · ASSIGN:identifier, ELEMENT:member-element
   7. L156 `const url = »`${data.url}${queryStringSuffix}`«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
   8. L159 (→L170) `response = await fetch(»url, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L160 `method: »data.method«,`  · ASSIGN:identifier, ELEMENT:member-element
  10. L168 `? »JSON.stringify(data.data)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify
  11. L176 `if (»data.url.endsWith("/api/tts")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L190 `} else if (»data.dataType« === "text") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L137 `openDictionaryWindow(»data.url«);`  · ASSIGN:identifier, ELEMENT:member-element
  14. L261 `url: »url«,`  · ASSIGN:identifier
  15. L259 (→L271) `»    chrome.windows.create(«`  · ELEMENT:object.setProperty

---
