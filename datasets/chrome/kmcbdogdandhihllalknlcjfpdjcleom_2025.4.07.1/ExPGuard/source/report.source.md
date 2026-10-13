# Source-level Taint Flow — kmcbdogdandhihllalknlcjfpdjcleom 2025.4.07.1

- Source type: CRX
- Files with issues: 2 / 7
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/dlc` L128:C4 -> L129:C34 (spans to L129)  `»event.data &&«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (observered_ga_properties) — `js/dlc` L141:C4 -> L143:C6 (spans to L143)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (62 raw steps → 10 distinct lines):
   1. L128 (→L130) `»    event.data &&«`  · ASSIGN:logical-left, ASSIGN:logical-right
   2. L130 `»event.data.includes("dl-inspector-copied_cd_list")«`  · ELEMENT:member-element, RETURN:fallback-return
   3. L133 `const data = »JSON.parse(event.data)«;`  · RETURN:json.parse
   4. L135 `let cds = »data.payload«;`  · ELEMENT:member-element
   5. L136 `const propertyID = »data.payload.propertyID«;`  · ELEMENT:member-element
   6. L139 `observered_ga_properties[»propertyID] = cds«;`  · ASSIGN:identifier
   7. L74 `var »observered_ga_properties = {}«;`  · ELEMENT:object.setProperty
   8. L141 (→L143) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   9. L2033 `if (»observered_ga_properties[msg.tid]«) {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  10. L2034 `Object.keys(»observered_ga_properties[msg.tid]«).forEach((k) => {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/dls` L20:C27 -> L20:C54  `if ( event.data && »event.data.inspector_action« ) {`
- **Sink(s)**:
  - `EVAL` — `js/dls` L31:C12 -> L31:C39  `»eval(event.data.codeToPush)«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (31 raw steps → 10 distinct lines):
   1. L20 `if ( »event.data && event.data.inspector_action« ) {`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L21 `if (»event.data.inspector_action« === "data_layer_push"){`  · ELEMENT:member-element, ASSIGN:binary-left
   3. L23 `const { »dataLayer, push« } = event.data`  · ELEMENT:destructure-property[dataLayer], ELEMENT:destructure-property[push]
   4. L26 `} else if (»event.data.inspector_action« === "insert_new_analytics_observer"){`  · ELEMENT:member-element, ASSIGN:binary-left
   5. L24 `window[»dataLayer] = window[dataLayer«] || []`  · ASSIGN:identifier
   6. L27 `const { »observed« } = event.data`  · ELEMENT:destructure-property[observed]
   7. L29 `} else if (»event.data.inspector_action« === "injectCode") {`  · ELEMENT:member-element, ASSIGN:binary-left
   8. L25 `window[»dataLayer].push(push«)`  · ASSIGN:identifier
   9. L28 `window._ap_dl.add_tracking(»observed«)`  · ASSIGN:identifier
  10. L31 `eval(»event.data.codeToPush«)`  · ELEMENT:member-element

---
