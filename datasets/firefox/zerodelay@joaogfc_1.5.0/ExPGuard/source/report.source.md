# Source-level Taint Flow — zerodelay@joaogfc 1.5.0

- Source type: XPI
- Files with issues: 5 / 11
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(_live_catch_up_video_meta))

- **Source**: `TARGET_CUSTOM_EVENT` — `content` L143:C94 -> L143:C102  `document.addEventListener('_live_catch_up_video_meta', e => onChannelIdUpdate(common, »e.detail«));`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `content` L443:C37 -> L443:C66  `if (Object.keys(upd).length) »chrome.storage.local.set(upd)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (42 raw steps → 9 distinct lines):
   1. L143 `document.addEventListener('_live_catch_up_video_meta', e => onChannelIdUpdate(common, »e.detail«));`  · ELEMENT:member-element
   2. L433 `const channelId = »detail && detail.channel_id«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   3. L434 `if (»!channelId || !extensionAlive()«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
   4. L435 `lastChannelId = »channelId«;`  · ASSIGN:identifier
   5. L438 `if (data[common.currentChannelIdKey] !== »channelId) upd[common.currentChannelIdKey] = channelId«;`  · ASSIGN:identifier, ASSIGN:binary-right
   6. L437 `const »upd = {}«;`  · ELEMENT:object.setProperty
   7. L440 `const saved = common.getSuggestedModeForChannel(data, »channelId«);`  · ASSIGN:identifier
   8. L146 `if (»area === 'local' && changes[common.channelMemoryKey]?.newValue && lastChannelId«) {`  · ASSIGN:identifier, ASSIGN:logical-right
   9. L147 `»onChannelIdUpdate(common, { channel_id: lastChannelId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(_zd_badge))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L56:C0 -> L72:C2 (spans to L72)  `»chrome.runtime.onMessage.addListener((msg, sender) => {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `background` L69:C8 -> L69:C79  `»chrome.action.setBadgeText({ tabId: sender.tab.id, text: raw || null })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (6 raw steps → 4 distinct lines):
   1. L56 (→L72) `»chrome.runtime.onMessage.addListener((msg, sender) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L68 `const raw = typeof msg.text === 'string' ? »msg.text.slice«(0, 4) : '';`  · ELEMENT:member-element-container
   3. L69 `»chrome.action.setBadgeText({ tabId: sender.tab.id, text: raw || null })«;`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:object.setProperty
   4. L70 `if (»raw«) chrome.action.setBadgeBackgroundColor({ tabId: sender.tab.id, color: LATENCY_BADGE_COLOR });`  · ASSIGN:identifier

---

## Flow #3 — ELEMENT_VALUE (#band-slider)

- **Source**: `ELEMENT_VALUE` — `popup` L285:C18 -> L285:C42  `const v = »parseFloat(slider.value)«;`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (centerBuffer) — `popup` L199:C4 -> L199:C44  `»chrome.storage.local.set({ [key]: val })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (310 raw steps → 13 distinct lines):
   1. L285 `const v = »parseFloat(slider.value)«;`  · RETURN:parseFloat
   2. L286 `$('#band-value').textContent = »v.toFixed(1)« + 's';`  · ASSIGN:identifier, RETURN:Number.toFixed, ASSIGN:binary-left
   3. L287 `setOne('centerBuffer', »v«);`  · ASSIGN:identifier
   4. L198 `state[key] = »val«;`  · ASSIGN:identifier
   5. L481 (→L496) `»    refresh();«`  · ELEMENT:object.setProperty
   6. L199 `»chrome.storage.local.set({ [key]: val })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L524 _(in `vendor/qrcode`)_ `rect = 'l' + cellSize + ',»0« 0,' + cellSize +`  · ASSIGN:identifier
   8. L532 `copyBtn.datas»e«t.code = code;`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   9. L536 _(in `vendor/qrcode`)_ `qrSvg» += (alt.text) ? '<description id="' + esca«peXml(alt.id) + '">' +`  · ASSIGN:identifier, RETURN:Math.max, RETURN:Math.min
  10. L541 `»         qrBox.append(parseSvg«(qr.createSvgTag({ cellSize: 4, scalable: true })));`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.round
  11. L509 `// ----- PIX» (Brazil): s«uggested amounts + "copia e cola" code + QR ----`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:unary
  12. L503 `copyBtn.textContent =» L.supportCopy;«`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.abs
  13. L510 `// Brazil's who»le d«onation theme is beer 🍺 — swap the header cup for a mug.`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:binary-left

---
