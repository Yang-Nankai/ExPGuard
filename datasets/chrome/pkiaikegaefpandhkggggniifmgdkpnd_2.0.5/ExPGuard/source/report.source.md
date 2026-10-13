# Source-level Taint Flow — pkiaikegaefpandhkggggniifmgdkpnd 2.0.5

- Source type: CRX
- Files with issues: 3 / 10
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_OUTER_HTML (input)

- **Source**: `ELEMENT_OUTER_HTML` — `service-worker` L752:C2 -> L752:C54  `»chrome.runtime.onMessage.addListener(messageHandler)«;`
- **Sink(s)**:
  - `CHROME_ALARMS_CREATE_OPTIONS` — `service-worker` L593:C4 -> L593:C62  `»chrome.alarms.create(API_LOGGING_TIMER, {...request.data})«;`
  - `CHROME_ALARMS_CREATE_OPTIONS` — `service-worker` L599:C4 -> L599:C82  `»chrome.alarms.create(CHECK_FOR_SUCCESSFUL_SUBMISSION_TIMER, {...request.data})«;`
  - `CHROME_LOCAL_STORAGE` (unknown) — `service-worker` L24:C4 -> L36:C6 (spans to L36)  `»chrome.storage.local.set({ [key] : value }, () => {«`
  - `WINDOW_POSTMESSAGE` (*) — `service-worker` L502:C4 -> L508:C5 (spans to L508)  `»w.postMessage(«`
  - `CHROME_ALARMS_CREATE_OPTIONS` — `service-worker` L607:C6 -> L607:C63  `»chrome.alarms.create(INACTIVITY_TIMER, {...request.data})«;`
  - `CHROME_ALARMS_CREATE_OPTIONS` — `service-worker` L616:C6 -> L616:C68  `»chrome.alarms.create(LONG_INACTIVITY_TIMER, {...request.data})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2809 raw steps → 15 distinct lines):
   1. L752 `»chrome.runtime.onMessage.addListener(messageHandler)«;`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[lesson-page->service-worker]`
   2. L593 `»chrome.alarms.create(API_LOGGING_TIMER, {...request.data})«;`  · ELEMENT:object.setProperty, COPY:object-spread
   3. L599 `»chrome.alarms.create(CHECK_FOR_SUCCESSFUL_SUBMISSION_TIMER, {...request.data})«;`  · ELEMENT:object.setProperty, COPY:object-spread
   4. L639 `»setDataToStorage(PROCTORING_STATE, {[request.userGuid]: request.data})«;`  · ELEMENT:object.setProperty
   5. L24 (→L36) `»    chrome.storage.local.set({ [key] : value }, () => {«`  · ELEMENT:object.setProperty
   6. L30 `console.log(»`Set value: ${JSON.stringify(value, null, '\t')} to key: ${key} in storage.`«);`  · RETURN:json.stringify, ASSIGN:template-literal
   7. L32 `console.log(»`Set value: ${value} to key: ${key} in storage.`«);`  · ASSIGN:template-literal
   8. L668 (→L671) `»      setDataToStorage(PROGRESS_DATA_BY_USER_GUID, {«`  · ELEMENT:object.setProperty
   9. L498 `»console.log({log: data})«;`  · ELEMENT:object.setProperty
  10. L516 (→L520) `»    chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  11. L505 `data: »JSON.stringify(data)«`  · RETURN:json.stringify
  12. L502 (→L508) `»    w.postMessage(«`  · ELEMENT:object.setProperty
  13. L503 (→L506) `»      JSON.stringify({«`  · RETURN:json.stringify
  14. L607 `»chrome.alarms.create(INACTIVITY_TIMER, {...request.data})«;`  · ELEMENT:object.setProperty, COPY:object-spread
  15. L616 `»chrome.alarms.create(LONG_INACTIVITY_TIMER, {...request.data})«;`  · ELEMENT:object.setProperty, COPY:object-spread

---
