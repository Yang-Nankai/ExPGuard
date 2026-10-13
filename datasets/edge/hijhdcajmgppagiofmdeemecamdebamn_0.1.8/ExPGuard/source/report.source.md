# Source-level Taint Flow — hijhdcajmgppagiofmdeemecamdebamn 0.1.8

- Source type: CRX
- Files with issues: 5 / 8
- Distinct taint flows: 4  (collapsed from 8 raw issue entries)
- Sinkless sources skipped: 23 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `src/sw` L159:C8 -> L159:C15  `if (»message«.event === 'adTimerFound') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (timeSaved) — `src/sw` L183:C12 -> L183:C114  `»chrome.storage.local.set({ timeSaved: timeSaved ? timeSaved + message.timeSaved : message.timeSaved })«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (91 raw steps → 10 distinct lines):
   1. L159 `if (»message.event« === 'adTimerFound') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L162 `} else if (»message.event« === 'adsCompleted') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L165 `} else if (»message.event« === 'adsAvoided') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L191 `if (»message.action« === 'getStats') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L176 `} else if (»message.event« === 'adAvoided') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L195 `} else if (»message.action« === 'getUserId') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L183 `chrome.storage.local.set({ timeSaved: timeSaved ? »timeSaved + message.timeSaved : message.timeSaved« })`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:conditional-consequent
   8. L181 (→L184) `»        await Promise.all([«`  · ELEMENT:object.setProperty
   9. L187 `timeSaved: timeSaved + »message.timeSaved«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  10. L185 (→L188) `»        sio.emit('adAvoided', {«`  · ELEMENT:object.setProperty

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('timeSaved') in src/sw)  ·  5× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `src/sw` L159:C8 -> L159:C15  `if (»message«.event === 'adTimerFound') {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `src/sw` L194:C8 -> L194:C47  `»sendResponse({ adsAvoided, timeSaved })«`
  - `CHROME_LOCAL_STORAGE` (timeSaved) — `src/sw` L183:C12 -> L183:C114  `»chrome.storage.local.set({ timeSaved: timeSaved ? timeSaved + message.timeSaved : message.timeSaved })«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (98 raw steps → 12 distinct lines):
   1. L159 `if (»message.event« === 'adTimerFound') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L162 `} else if (»message.event« === 'adsCompleted') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L165 `} else if (»message.event« === 'adsAvoided') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L191 `if (»message.action« === 'getStats') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L176 `} else if (»message.event« === 'adAvoided') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L195 `} else if (»message.action« === 'getUserId') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L183 `chrome.storage.local.set({ timeSaved: timeSaved ? »timeSaved + message.timeSaved : message.timeSaved« })`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:conditional-consequent
   8. L181 (→L184) `»        await Promise.all([«`  · ELEMENT:object.setProperty
   9. L187 `timeSaved: timeSaved + »message.timeSaved«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  10. L185 (→L188) `»        sio.emit('adAvoided', {«`  · ELEMENT:object.setProperty
  11. L192 `const { adsAvoided, timeSaved } = await »chrome.storage.local.get(['adsAvoided', 'timeSaved'])«`  · STORAGE:STORAGE_FLOW[area: local, key: timeSaved, sender: src/sw, receiver: src/sw]
  12. L194 `»sendResponse({ adsAvoided, timeSaved })«`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_INNER_HTML (.card-title)

- **Source**: `ELEMENT_INNER_HTML` — `src/popup` L37:C16 -> L37:C27  `if (»cardTitleOG« && cardTextOG) {`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `src/popup` L38:C26 -> L38:C35  `cardTitle.»innerHTML« = cardTitleOG`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (36 raw steps → 3 distinct lines):
   1. L37 `if (»cardTitleOG && cardTextOG«) {`  · ASSIGN:identifier, ASSIGN:logical-left
   2. L38 `cardTitle.innerHTML = »cardTitleOG«`  · ASSIGN:identifier
   3. L12 `const »cardTitle = document.querySelector('.card-title')«`  · ELEMENT:object.setProperty

---

## Flow #4 — ELEMENT_INNER_HTML (.card-text)

- **Source**: `ELEMENT_INNER_HTML` — `src/popup` L37:C31 -> L37:C41  `if (cardTitleOG && »cardTextOG«) {`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `src/popup` L39:C25 -> L39:C34  `cardText.»innerHTML« = cardTextOG`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (30 raw steps → 3 distinct lines):
   1. L37 `if (»cardTitleOG && cardTextOG«) {`  · ASSIGN:identifier, ASSIGN:logical-right
   2. L39 `cardText.innerHTML = »cardTextOG«`  · ASSIGN:identifier
   3. L13 `const »cardText = document.querySelector('.card-text')«`  · ELEMENT:object.setProperty

---
