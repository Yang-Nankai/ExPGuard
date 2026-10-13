# Source-level Taint Flow — nemlggkoddlonfakhdkllifcgaeohkoi 1.10

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `service_worker` L127:C12 -> L127:C19  `switch (»message«.type) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L29:C11 -> L32:C6 (spans to L32)  `return »fetch('http://' + Genel(settings.s_port) + params, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L147:C9 -> L150:C4 (spans to L150)  `return »fetch(link, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L186:C15 -> L190:C10 (spans to L190)  `return »fetch('http://' + Genel(settings.s_port) + params, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (64 raw steps → 10 distinct lines):
   1. L127 `switch (»message.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L129 `if (»message.url && message.url.startsWith('magnet:')«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   3. L131 `AppeGonder(settings, »message.url, message.folder«)`  · ASSIGN:identifier, ELEMENT:member-element
   4. L20 `let params = '?action=add-url&download_dir=0&token=' + token + '&s=' + »encodeURI(link)«`  · ASSIGN:identifier, RETURN:encodeURI, ASSIGN:binary-right
   5. L22 `if (»where !== m_folder) params += '&path=' + where«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
   6. L29 `return fetch('http://' + Genel(settings.s_port) + »params«, {`  · ASSIGN:identifier, ASSIGN:binary-right
   7. L135 `LinkGetSentPro(settings, »message.url, message.folder«)`  · ASSIGN:identifier, ELEMENT:member-element
   8. L147 `return fetch(»link«, {`  · ASSIGN:identifier
   9. L176 `if (»where !== m_folder) params += '&path=' + where«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  10. L186 `return fetch('http://' + Genel(settings.s_port) + »params«, {`  · ASSIGN:identifier, ASSIGN:binary-right

---
