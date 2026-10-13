# Source-level Taint Flow — mkjddcjpbbcjlfbcamafjfbhnfobmond 1.1.2

- Source type: CRX
- Files with issues: 5 / 7
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L252:C2 -> L272:C4 (spans to L272)  `»port.onMessage.addListener(function (message) {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (accounts) — `background` L152:C2 -> L156:C4 (spans to L156)  `»chrome.storage.sync.set(storageData, function() {«`
  - `CHROME_SYNC_STORAGE` (authcallback) — `background` L185:C2 -> L185:C46  `»chrome.storage.sync.set({authcallback: url})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (71 raw steps → 18 distinct lines):
   1. L252 (→L272) `»  port.onMessage.addListener(function (message) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.connect.sender.message[settings-listener->background]`
   2. L253 `if (»message.type« === 'add') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L254 `addItem(»message.data«, tab);`  · ASSIGN:identifier, ELEMENT:member-element
   4. L114 `»info«.url = tab.url;`  · ASSIGN:identifier
   5. L116 `doRequest('item', »info«,`  · ASSIGN:identifier
   6. L73 `if (»data«) {`  · ASSIGN:identifier
   7. L74 `data = Object.keys(»data«).map(function (key) {`  · ASSIGN:identifier
   8. L256 `if (»message.type« === 'auth') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   9. L259 `if (»message.type« === 'settings-change') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  10. L261 `updateAccountData(»message«);`  · ASSIGN:identifier
  11. L167 `if (»data.tags« !== undefined) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  12. L168 `currentAccount.tags = »!!data.tags«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  13. L161 `»callback(accountData.accounts && accountData.accounts[0] || {})«;`  · ELEMENT:object.setProperty
  14. L151 `var »storageData = {accounts: [data], currentAccount: 0}«;`  · ELEMENT:object.setProperty
  15. L263 `if (»message.type« === 'current-url') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L264 `saveAuthCallbackURL(»message.url«);`  · ASSIGN:identifier, ELEMENT:member-element
  17. L185 `»chrome.storage.sync.set({authcallback: url})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  18. L266 `if (»message.type« === 'install') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---

## Flow #2 — STORAGE_ALL_ITEMS (storage.all.items[sync])

- **Source**: `STORAGE_ALL_ITEMS` — `background` L161:C13 -> L161:C33  `callback(»accountData.accounts« && accountData.accounts[0] || {});`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (accounts) — `background` L152:C2 -> L156:C4 (spans to L156)  `»chrome.storage.sync.set(storageData, function() {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (88 raw steps → 11 distinct lines):
   1. L161 `callback(»accountData.accounts && accountData.accounts[0] || {}«);`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L83 `setRequestHeader(headers, 'X-Wishlistr-ID', »settings.id«);`  · ELEMENT:member-element
   3. L66 `if (»header && value«) {`  · ASSIGN:identifier, ASSIGN:logical-right
   4. L67 `headers.append(header, »value«);`  · ASSIGN:identifier
   5. L84 `setRequestHeader(headers, 'X-Wishlistr-Auth', »settings.auth«);`  · ELEMENT:member-element
   6. L151 `var »storageData = {accounts: [data], currentAccount: 0}«;`  · ELEMENT:object.setProperty
   7. L268 `»port.postMessage({ permission: true, authenticated: !!settings.auth })«;`  · ELEMENT:member-element, ASSIGN:unary, ELEMENT:object.setProperty
   8. L269 `if (»!settings.auth«) { saveAuthCallbackURL(installURL()); }`  · ELEMENT:member-element, ASSIGN:unary
   9. L232 `if (»(settings.username && settings.id && settings.auth) || _config().devNoAuth«) {`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  10. L236 `}, [»!!settings.tags«]);`  · ELEMENT:member-element, ASSIGN:unary
  11. L234 (→L236) `»              injectCode(function(setting) {«`  · ELEMENT:object.setProperty

---

## Flow #3 — STORAGE_ALL_ITEMS (storage.all.items[sync])

- **Source**: `STORAGE_ALL_ITEMS` — `background` L276:C0 -> L284:C2 (spans to L284)  `»chrome.runtime.onMessage.addListener(function (message) {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (accounts) — `background` L152:C2 -> L156:C4 (spans to L156)  `»chrome.storage.sync.set(storageData, function() {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 2 distinct lines):
   1. L276 (→L284) `»chrome.runtime.onMessage.addListener(function (message) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[options->background]`
   2. L151 `var »storageData = {accounts: [data], currentAccount: 0}«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---
