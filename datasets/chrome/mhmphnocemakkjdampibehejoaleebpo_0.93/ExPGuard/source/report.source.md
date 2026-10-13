# Source-level Taint Flow — mhmphnocemakkjdampibehejoaleebpo 0.93

- Source type: CRX
- Files with issues: 5 / 11
- Distinct taint flows: 9  (collapsed from 132 raw issue entries)
- Sinkless sources skipped: 39 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `scripts/content` L73:C2 -> L76:C5 (spans to L76)  `»chrome.runtime.sendMessage({ command: "postUsage", data: {«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `scripts/content` L552:C4 -> L556:C24 (spans to L556)  `»window.postMessage({ «`
  - `CHROME_LOCAL_STORAGE` (playedgames) — `scripts/content` L37:C12 -> L43:C14 (spans to L43)  `async functi»on bookmarkNotification( gameInfo ) {«`
  - `CHROME_SYNC_STORAGE` (playedgames) — `scripts/lib/jquery` L39:C16 -> L42:C18 (spans to L42)  `// Pass this if »window is not defined yet«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (567 raw steps → 17 distinct lines):
   1. L73 (→L76) `»  chrome.runtime.sendMessage({ command: "postUsage", data: {«`  · ELEMENT:object.setProperty
   2. L562 (→L565) `»  chrome.runtime.sendMessage({ command: "postUsage", data: {«`  · ELEMENT:object.setProperty
   3. L721 (→L727) `»        logGame({ «`  · ELEMENT:object.setProperty
   4. L118 `if (»game.url == null || game.title == null«) {`  · ASSIGN:binary-left, ASSIGN:logical-left
   5. L39 (→L48) `»  notify({«`  · ELEMENT:object.setProperty
   6. L552 (→L556) `»    window.postMessage({ «`  · ELEMENT:object.setProperty
   7. L157 `»games = {}«;`  · ELEMENT:object.setProperty
   8. L129 `res »instanceof «Error &&`  · ELEMENT:object.setProperty
   9. L127 `lib.»syncdata.g«et(['playedgames'], async function (res) {`  · ELEMENT:object.setProperty
  10. L174 `»lib.syncdata.set({ playedgames: lib.entries(games) })«;`  · ELEMENT:object.setProperty
  11. L33 (→L36) `»    type: "increment"«`  · ELEMENT:object.setProperty
  12. L32 `chrome.runtime».sendMessage({ c«ommand: "badgeNotification", data: {`  · ELEMENT:object.setProperty
  13. L13 _(in `scripts/lib`)_ `return »JSON.stringify(data).length«;`  · RETURN:json.stringify, ELEMENT:member.length
  14. L18 `"Name":» "SuperN«ova",`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L19 _(in `scripts/lib`)_ `var »item = copy[copy.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  16. L20 _(in `scripts/lib/jquery`)_ `// For CommonJS an»d CommonJS-like e«nvironments where a proper `window``  · ASSIGN:identifier, ASSIGN:binary-left
  17. L21 _(in `scripts/lib/jquery`)_ `// is present, exe»cute the fa«ctory and get jQuery.`  · ELEMENT:member.length, ASSIGN:binary-left

---

## Flow #2 — DOCUMENT_LOCATION (location.hostname)

- **Source**: `DOCUMENT_LOCATION` — `scripts/content` L1013:C6 -> L1013:C23  `»location.hostname« == "www.addictinggames.com"`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `scripts/content` L552:C4 -> L556:C24 (spans to L556)  `»window.postMessage({ «`
  - `CHROME_LOCAL_STORAGE` (playedgames) — `scripts/content` L37:C12 -> L43:C14 (spans to L43)  `async functi»on bookmarkNotification( gameInfo ) {«`
  - `CHROME_SYNC_STORAGE` (playedgames) — `scripts/lib/jquery` L39:C16 -> L42:C18 (spans to L42)  `// Pass this if »window is not defined yet«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1575 raw steps → 29 distinct lines):
   1. L1013 `»location.hostname« == "www.addictinggames.com"`  · ASSIGN:binary-left
   2. L1012 (→L1013) `»favicon == undefined ||«`  · ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
   3. L1015 `favicon = »window.location.protocol + "//" + window.location.hostname + "/"« + "favicon.ico";`  · ASSIGN:binary-right, ASSIGN:binary-left
   4. L1000 `if ( »favicon.match(/^\.\//)« ) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L1018 `return »favicon«;`  · ASSIGN:identifier
   6. L1002 `favicon = »window.location.protocol + "//" + window.location.hostname + "/" + favicon.slice(2)«;;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L1003 `} else if (»favicon.match(/^\//)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L1004 `favicon = »window.location.protocol + "//" + window.location.hostname + "/" + favicon.slice(1)«;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L1005 `} else if ( »favicon.match("^(http|https|" + window.location.hostname + ")")« == null ) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:fallback-return
  10. L1006 `favicon = »window.location.protocol + "//" + window.location.hostname + "/" + favicon«;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier
  11. L721 (→L727) `»        logGame({ «`  · ELEMENT:object.setProperty
  12. L726 `publisherurl: window.location.protocol + "//" + »window.location.hostname«`  · ASSIGN:binary-right
  13. L39 (→L48) `»  notify({«`  · ELEMENT:object.setProperty
  14. L552 (→L556) `»    window.postMessage({ «`  · ELEMENT:object.setProperty
  15. L157 `»games = {}«;`  · ELEMENT:object.setProperty
  16. L129 `res »instanceof «Error &&`  · ELEMENT:object.setProperty
  17. L127 `lib.»syncdata.g«et(['playedgames'], async function (res) {`  · ELEMENT:object.setProperty
  18. L174 `»lib.syncdata.set({ playedgames: lib.entries(games) })«;`  · ELEMENT:object.setProperty
  19. L33 (→L36) `»    type: "increment"«`  · ELEMENT:object.setProperty
  20. L32 `chrome.runtime».sendMessage({ c«ommand: "badgeNotification", data: {`  · ELEMENT:object.setProperty
  21. L13 _(in `scripts/lib`)_ `return »JSON.stringify(data).length«;`  · RETURN:json.stringify, ELEMENT:member.length
  22. L18 `"Name":» "SuperN«ova",`  · ASSIGN:identifier, ASSIGN:binary-left
  23. L19 _(in `scripts/lib`)_ `var »item = copy[copy.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  24. L20 _(in `scripts/lib/jquery`)_ `// For CommonJS an»d CommonJS-like e«nvironments where a proper `window``  · ASSIGN:identifier, ASSIGN:binary-left
  25. L21 _(in `scripts/lib/jquery`)_ `// is present, exe»cute the fa«ctory and get jQuery.`  · ELEMENT:member.length, ASSIGN:binary-left
  26. L972 (→L975) `»  chrome.runtime.sendMessage({ "command": "saveGameContender", "data": { «`  · ELEMENT:object.setProperty
  27. L1026 `»logGame({ title: window.location.hostname, iconurl: faviconurl, url: window.location.protocol + "//" + window.location.hostname, publishericon: faviconurl })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ASSIGN:binary-right
  28. L118 `if (»game.url == null || game.title == null«) {`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  29. L1042 (→L1043) `»location.hostname == "www.addictinggames.com" &&«`  · ASSIGN:binary-left, ASSIGN:logical-left

---

## Flow #3 — WINDOW_CUSTOM_EVENT (window.addEventListener(supernova-message))

- **Source**: `WINDOW_CUSTOM_EVENT` — `scripts/content` L264:C7 -> L264:C13  `if (!»e.data« || !e.data.message) return;`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `scripts/content` L552:C4 -> L556:C24 (spans to L556)  `»window.postMessage({ «`
  - `CHROME_LOCAL_STORAGE` (playedgames) — `scripts/content` L37:C12 -> L43:C14 (spans to L43)  `async functi»on bookmarkNotification( gameInfo ) {«`
  - `CHROME_SYNC_STORAGE` (playedgames) — `scripts/lib/jquery` L39:C16 -> L42:C18 (spans to L42)  `// Pass this if »window is not defined yet«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (678 raw steps → 37 distinct lines):
   1. L264 `if (»!e.data || !e.data.message«) return;`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   2. L265 `if (»e.data.key« != "supernova-jslauncher-message") return;`  · ELEMENT:member-element, ASSIGN:binary-left
   3. L268 `message = »JSON.parse(e.data.message)«;`  · ELEMENT:member-element, RETURN:json.parse
   4. L274 `switch (»message.command«) {`  · ELEMENT:member-element
   5. L279 `if (»message.data.launchStatus«) {`  · ELEMENT:member-element
   6. L280 `launchStatus = extend(launchStatus, »message.data.launchStatus«);`  · ELEMENT:member-element
   7. L377 `var keys = Object.keys(»src«);`  · ASSIGN:identifier
   8. L380 `dst[key] = »src[key]«;`  · ASSIGN:identifier, ELEMENT:member-element-container
   9. L9 `var »launchStatus = {}«;`  · ELEMENT:object.setProperty
  10. L285 `if (»message.data && message.data.installed«) {`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  11. L292 `if (»message.data«) {`  · ELEMENT:member-element
  12. L293 `let apiobject = »message.data«;`  · ELEMENT:member-element
  13. L294 `logGame(»apiobject«);`  · ASSIGN:identifier
  14. L118 `if (»game.url == null || game.title == null«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  15. L122 `»game«.lastplaydate = new Date().getTime();`  · ASSIGN:identifier
  16. L123 `»game«.playcount = 0;`  · ASSIGN:identifier
  17. L167 `»game«.pinned = -1; // don't allow pin settings from new game`  · ASSIGN:identifier
  18. L168 `bookmarkNotification( »game« );`  · ASSIGN:identifier
  19. L46 `game: »gameInfo«`  · ASSIGN:identifier
  20. L39 (→L48) `»  notify({«`  · ELEMENT:object.setProperty
  21. L552 (→L556) `»    window.postMessage({ «`  · ELEMENT:object.setProperty
  22. L170 `»game«.new = true;`  · ASSIGN:identifier
  23. L171 `games[»game.url] = game«;`  · ASSIGN:identifier, ELEMENT:member-element
  24. L157 `»games = {}«;`  · ELEMENT:object.setProperty
  25. L129 `res »instanceof «Error &&`  · ELEMENT:object.setProperty
  26. L127 `lib.»syncdata.g«et(['playedgames'], async function (res) {`  · ELEMENT:object.setProperty
  27. L174 `»lib.syncdata.set({ playedgames: lib.entries(games) })«;`  · ELEMENT:object.setProperty
  28. L33 (→L36) `»    type: "increment"«`  · ELEMENT:object.setProperty
  29. L32 `chrome.runtime».sendMessage({ c«ommand: "badgeNotification", data: {`  · ELEMENT:object.setProperty
  30. L13 _(in `scripts/lib`)_ `return »JSON.stringify(data).length«;`  · RETURN:json.stringify, ELEMENT:member.length
  31. L18 `"Name":» "SuperN«ova",`  · ASSIGN:identifier, ASSIGN:binary-left
  32. L19 _(in `scripts/lib`)_ `var »item = copy[copy.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  33. L20 _(in `scripts/lib/jquery`)_ `// For CommonJS an»d CommonJS-like e«nvironments where a proper `window``  · ASSIGN:identifier, ASSIGN:binary-left
  34. L21 _(in `scripts/lib/jquery`)_ `// is present, exe»cute the fa«ctory and get jQuery.`  · ELEMENT:member.length, ASSIGN:binary-left
  35. L147 (→L148) `savedGame.title == »game.title &&«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  36. L148 `savedGame.publishericon == »game.publishericon«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  37. L150 `value = »games[savedGame.url]«;`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container

---

## Flow #4 — WINDOW_CUSTOM_EVENT (From storage.local.set('playedgames') in scripts/content)  ·  16× duplicate paths collapsed

- **Source**: `WINDOW_CUSTOM_EVENT` — `scripts/ui` L264:C7 -> L264:C13  `»      «   event.clientY < 109) == false &&`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (playedgames) — `background` L49:C12 -> L55:C14 (spans to L55)  `»chrome.storage.local.set(wrappeddata, function () {«`
  - `CHROME_SYNC_STORAGE` (playedgames) — `background` L51:C16 -> L54:C18 (spans to L54)  `»chrome.storage.sync.set(wrappeddata, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1543 raw steps → 55 distinct lines):
   1. L264 _(in `scripts/ui`)_ `»          event.clientY < «109) == false &&`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   2. L265 _(in `scripts/ui`)_ `»          «self.mousedover) {`  · ELEMENT:member-element, ASSIGN:binary-left
   3. L268 _(in `scripts/lib/ruffle/655`)_ `return get»Float64ArrayMemory0().suba«rray(ptr / 8, ptr / 8 + len);`  · ELEMENT:member-element, RETURN:json.parse
   4. L274 _(in `scripts/ui`)_ `»      if (self.«mousedover == false) {`  · ELEMENT:member-element
   5. L279 _(in `scripts/notifications`)_ `return t»his.prevObject || this.co«nstructor();`  · ELEMENT:member-element
   6. L280 _(in `scripts/lib/bootstrap.bundle`)_ `_proto._triggerCloseEvent = function _tr»iggerCloseEvent(element) «{`  · ELEMENT:member-element
   7. L377 `var notificatio»nCo«unt = parseInt( badgeText );`  · ASSIGN:identifier
   8. L380 _(in `scripts/notifications`)_ `if ( !obj || »toString«.call( obj ) !== "[object Object]" ) {`  · ASSIGN:identifier, ELEMENT:member-element-container
   9. L9 (→L35) `»chrome.storage.local.get(keys, function (packedLocalData) {«`  · ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: playedgames, sender: scripts/content, receiver: background]
  10. L285 _(in `scripts/lib/ruffle/655`)_ `const CLOS»URE_DTORS = (typeof FinalizationRegist«ry === 'undefined')`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  11. L292 _(in `scripts/ui`)_ `//»next.eq(0).s«how();`  · ELEMENT:member-element
  12. L293 _(in `scripts/ui`)_ `this.setSlide(ne»xt.children(«).attr('slideid'));`  · ELEMENT:member-element
  13. L294 _(in `scripts/enabler`)_ `if ( copyIs»Array && «!Array.isArray( src ) ) {`  · ASSIGN:identifier
  14. L118 _(in `scripts/lib/jquery`)_ `val »= node[ i ] || node.getAttribute && no«de.getAttribute( i );`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  15. L122 `»type«: type,`  · ASSIGN:identifier
  16. L123 `»targ«et: 'offscreen',`  · ASSIGN:identifier
  17. L167 _(in `scripts/ui`)_ `function» get«ByteSize(data) {`  · ASSIGN:identifier
  18. L168 `sendOffscreenMessage("po»stme«ssage",{ command: "superstarterstatus", data: { installed: installed } });`  · ASSIGN:identifier
  19. L46 `»    ts: «new Date().getTime(),`  · ASSIGN:identifier
  20. L39 (→L48) `»    Object.keys(data).forEach(function (key) {«`  · ELEMENT:object.setProperty
  21. L552 (→L556) `»  return true;«`  · ELEMENT:object.setProperty
  22. L170 `if» (cb«) cb({`  · ASSIGN:identifier
  23. L171 _(in `scripts/lib/ruffle/ruffle`)_ `__exportStar(_»_webpack_require«__(325), exports);`  · ASSIGN:identifier, ELEMENT:member-element
  24. L157 `pe»rsistGamer«Status();`  · ELEMENT:object.setProperty
  25. L129 `async functi»on get(url,« cb) {`  · ELEMENT:object.setProperty
  26. L127 _(in `scripts/ui`)_ `prom»ise.contex«t = self.context;`  · ELEMENT:object.setProperty
  27. L174 _(in `scripts/content`)_ `»lib.syncdata.set({ playedgames: lib.entries(games) })«;`  · ELEMENT:object.setProperty
  28. L33 (→L36) `»            }«`  · ELEMENT:object.setProperty
  29. L32 `»cb(new Error("Th«e data being requested does not exist.\nData: " + JSON.stringify(keys)));`  · ELEMENT:object.setProperty
  30. L13 `»         return (packedLoca«lData.hasOwnProperty(key) &&`  · RETURN:json.stringify, ELEMENT:member.length
  31. L18 `»        « var syncData = packedSyncData[key];`  · ASSIGN:identifier, ASSIGN:binary-left
  32. L19 `»        var localRawData = (localData && localData.data) ? localData.data« : undefined;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  33. L20 `»var localTs = (localData && localData.ts) ? localData.ts« : 0;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-consequent, ELEMENT:member-element
  34. L21 `»var syncTs «= (syncData && syncData.ts) ? syncData.ts : 0;`  · ELEMENT:member.length, ASSIGN:binary-left
  35. L147 (→L148) `i: response.gamerguid, »«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  36. L148 `lc: { pi: response.partnerid, t»s: new Date(), url«: "" }`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  37. L150 _(in `scripts/lib/jquery`)_ `// The jQuery obje»ct is actually just «the init constructor 'enhanced'`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  38. L17 `var »localData = packedLocalData[key]«;`  · ELEMENT:implicit.add
  39. L22 `if (»syncData && syncTs > localTs«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right
  40. L26 `response[key] = »localData.data«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element
  41. L8 `var »response = {}«;`  · ELEMENT:object.setProperty
  42. L62 (→L66) `»arrayOfProperties.forEach(function( element ) {«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
  43. L566 `response.playedgames = lib.fromEntries( »response.playedgames« );`  · ELEMENT:member-element-container
  44. L568 `game = »response.playedgames[key]«;`  · ELEMENT:member-element
  45. L73 `object[key] = »Input[key]«;`  · ELEMENT:member-element
  46. L72 `var »object = {}«;`  · ELEMENT:object.setProperty
  47. L70 `var »array = []«;`  · ELEMENT:object.setProperty
  48. L571 `»lib.syncdata.set({"playedgames": lib.entries( response.playedgames )})«;`  · ELEMENT:object.setProperty
  49. L45 (→L48) `»            wrappeddata[key] = {«`  · ELEMENT:object.setProperty
  50. L44 `var »wrappeddata = {}«;`  · ELEMENT:object.setProperty
  51. L86 `return »JSON.stringify(data).length«;`  · RETURN:json.stringify, ELEMENT:member.length
  52. L91 `while (»bytesize« > MAXSIZE) {`  · ASSIGN:identifier, ASSIGN:binary-left
  53. L92 `var »item = copy[copy.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  54. L93 `bytesize -= »getByteSize(item)« + 1;`  · ASSIGN:identifier, ASSIGN:binary-left
  55. L94 `copy.splice(»copy.length« - 1, 1);`  · ELEMENT:member.length, ASSIGN:binary-left

---

## Flow #5 — DOCUMENT_LOCATION (From storage.local.set('playedgames') in scripts/content)  ·  16× duplicate paths collapsed

- **Source**: `DOCUMENT_LOCATION` — `background` L73:C2 -> L76:C5 (spans to L76)  `»      object[key] = Input[key];«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (playedgames) — `background` L49:C12 -> L55:C14 (spans to L55)  `»chrome.storage.local.set(wrappeddata, function () {«`
  - `CHROME_SYNC_STORAGE` (playedgames) — `background` L51:C16 -> L54:C18 (spans to L54)  `»chrome.storage.sync.set(wrappeddata, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1432 raw steps → 35 distinct lines):
   1. L73 (→L76) `object[key] = »Input[key];«`  · ELEMENT:object.setProperty, ELEMENT:member-element
   2. L562 (→L565) `»      throw new Error("Trying to clear new games when playedgames does not exist.");«`  · ELEMENT:object.setProperty
   3. L721 (→L727) _(in `scripts/ui`)_ `»                    throw new Error("Trying to forget game when playedgames does not exist.");«`  · ELEMENT:object.setProperty
   4. L118 _(in `scripts/lib/jquery`)_ `val »= node[ i ] || node.getAttribute && no«de.getAttribute( i );`  · ASSIGN:binary-left, ASSIGN:logical-left
   5. L39 (→L48) `»    Object.keys(data).forEach(function (key) {«`  · ELEMENT:object.setProperty
   6. L552 (→L556) `»  return true;«`  · ELEMENT:object.setProperty
   7. L157 `pe»rsistGamer«Status();`  · ELEMENT:object.setProperty
   8. L129 `async functi»on get(url,« cb) {`  · ELEMENT:object.setProperty
   9. L127 _(in `scripts/ui`)_ `prom»ise.contex«t = self.context;`  · ELEMENT:object.setProperty
  10. L174 _(in `scripts/content`)_ `»lib.syncdata.set({ playedgames: lib.entries(games) })«;`  · ELEMENT:object.setProperty
  11. L33 (→L36) `»            }«`  · ELEMENT:object.setProperty
  12. L32 `»cb(new Error("Th«e data being requested does not exist.\nData: " + JSON.stringify(keys)));`  · ELEMENT:object.setProperty
  13. L13 `»         return (packedLoca«lData.hasOwnProperty(key) &&`  · RETURN:json.stringify, ELEMENT:member.length
  14. L18 `»        « var syncData = packedSyncData[key];`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L19 `»        var localRawData = (localData && localData.data) ? localData.data« : undefined;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  16. L20 `»var localTs = (localData && localData.ts) ? localData.ts« : 0;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-consequent, ELEMENT:member-element
  17. L21 `»var syncTs «= (syncData && syncData.ts) ? syncData.ts : 0;`  · ELEMENT:member.length, ASSIGN:binary-left
  18. L9 (→L35) `»    chrome.storage.local.get(keys, function (packedLocalData) {«`  · STORAGE:STORAGE_FLOW[area: local, key: playedgames, sender: scripts/content, receiver: background]
  19. L17 `var »localData = packedLocalData[key]«;`  · ELEMENT:implicit.add
  20. L22 `if (»syncData && syncTs > localTs«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right
  21. L26 `response[key] = »localData.data«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element
  22. L8 `var »response = {}«;`  · ELEMENT:object.setProperty
  23. L62 (→L66) `»arrayOfProperties.forEach(function( element ) {«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
  24. L566 `response.playedgames = lib.fromEntries( »response.playedgames« );`  · ELEMENT:member-element-container
  25. L568 `game = »response.playedgames[key]«;`  · ELEMENT:member-element
  26. L72 `var »object = {}«;`  · ELEMENT:object.setProperty
  27. L70 `var »array = []«;`  · ELEMENT:object.setProperty
  28. L571 `»lib.syncdata.set({"playedgames": lib.entries( response.playedgames )})«;`  · ELEMENT:object.setProperty
  29. L45 (→L48) `»            wrappeddata[key] = {«`  · ELEMENT:object.setProperty
  30. L44 `var »wrappeddata = {}«;`  · ELEMENT:object.setProperty
  31. L86 `return »JSON.stringify(data).length«;`  · RETURN:json.stringify, ELEMENT:member.length
  32. L91 `while (»bytesize« > MAXSIZE) {`  · ASSIGN:identifier, ASSIGN:binary-left
  33. L92 `var »item = copy[copy.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  34. L93 `bytesize -= »getByteSize(item)« + 1;`  · ASSIGN:identifier, ASSIGN:binary-left
  35. L94 `copy.splice(»copy.length« - 1, 1);`  · ELEMENT:member.length, ASSIGN:binary-left

---

## Flow #6 — DOCUMENT_LOCATION (From storage.local.set('playedgames') in scripts/content)  ·  32× duplicate paths collapsed

- **Source**: `DOCUMENT_LOCATION` — `scripts/ui` L1013:C6 -> L1013:C23  `// Ge»t the Nth element« in the matched element set OR`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (playedgames) — `background` L49:C12 -> L55:C14 (spans to L55)  `»chrome.storage.local.set(wrappeddata, function () {«`
  - `CHROME_SYNC_STORAGE` (playedgames) — `background` L51:C16 -> L54:C18 (spans to L54)  `»chrome.storage.sync.set(wrappeddata, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2440 raw steps → 48 distinct lines):
   1. L1013 _(in `scripts/ui`)_ `// Ge»t the Nth element« in the matched element set OR`  · ASSIGN:binary-left
   2. L1012 (→L1013) _(in `scripts/enabler`)_ `}» else {«`  · ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
   3. L1015 _(in `scripts/content`)_ `favicon = »window.location.protocol + "//" + window.location.hostname + "/"« + "favicon.ico";`  · ASSIGN:binary-right, ASSIGN:binary-left
   4. L1000 _(in `scripts/enabler`)_ `// * liste»d form-associated elem«ents in a disabled fieldset`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L1018 _(in `scripts/ui`)_ `if ( num »== null« ) {`  · ASSIGN:identifier
   6. L1002 _(in `scripts/content`)_ `favicon = »window.location.protocol + "//" + window.location.hostname + "/" + favicon.slice(2)«;;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L1003 _(in `scripts/enabler`)_ `// * option elem»ents in a disabled o«ptgroup`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L1004 _(in `scripts/content`)_ `favicon = »window.location.protocol + "//" + window.location.hostname + "/" + favicon.slice(1)«;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L1005 _(in `scripts/content`)_ `} else if ( »favicon.match("^(http|https|" + window.location.hostname + ")")« == null ) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:fallback-return
  10. L1006 _(in `scripts/content`)_ `favicon = »window.location.protocol + "//" + window.location.hostname + "/" + favicon«;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier
  11. L721 (→L727) _(in `scripts/ui`)_ `»                    throw new Error("Trying to forget game when playedgames does not exist.");«`  · ELEMENT:object.setProperty
  12. L726 _(in `scripts/ui`)_ `lib.syncdata.set({ "playedgames": lib.»entries(playedgames) }, «function () {`  · ASSIGN:binary-right
  13. L39 (→L48) `»    Object.keys(data).forEach(function (key) {«`  · ELEMENT:object.setProperty
  14. L552 (→L556) `»  return true;«`  · ELEMENT:object.setProperty
  15. L157 `pe»rsistGamer«Status();`  · ELEMENT:object.setProperty
  16. L129 `async functi»on get(url,« cb) {`  · ELEMENT:object.setProperty
  17. L127 _(in `scripts/ui`)_ `prom»ise.contex«t = self.context;`  · ELEMENT:object.setProperty
  18. L174 _(in `scripts/content`)_ `»lib.syncdata.set({ playedgames: lib.entries(games) })«;`  · ELEMENT:object.setProperty
  19. L33 (→L36) `»            }«`  · ELEMENT:object.setProperty
  20. L32 `»cb(new Error("Th«e data being requested does not exist.\nData: " + JSON.stringify(keys)));`  · ELEMENT:object.setProperty
  21. L13 `»         return (packedLoca«lData.hasOwnProperty(key) &&`  · RETURN:json.stringify, ELEMENT:member.length
  22. L18 `»        « var syncData = packedSyncData[key];`  · ASSIGN:identifier, ASSIGN:binary-left
  23. L19 `»        var localRawData = (localData && localData.data) ? localData.data« : undefined;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  24. L20 `»var localTs = (localData && localData.ts) ? localData.ts« : 0;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-consequent, ELEMENT:member-element
  25. L21 `»var syncTs «= (syncData && syncData.ts) ? syncData.ts : 0;`  · ELEMENT:member.length, ASSIGN:binary-left
  26. L972 (→L975) _(in `scripts/enabler`)_ `»}«`  · ELEMENT:object.setProperty
  27. L1026 _(in `scripts/content`)_ `»logGame({ title: window.location.hostname, iconurl: faviconurl, url: window.location.protocol + "//" + window.location.hostname, publishericon: faviconurl })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ASSIGN:binary-right
  28. L118 _(in `scripts/lib/jquery`)_ `val »= node[ i ] || node.getAttribute && no«de.getAttribute( i );`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  29. L1042 (→L1043) _(in `scripts/ui`)_ `return j»Query.each( this, callback );«`  · ASSIGN:binary-left, ASSIGN:logical-left
  30. L9 (→L35) `»    chrome.storage.local.get(keys, function (packedLocalData) {«`  · STORAGE:STORAGE_FLOW[area: local, key: playedgames, sender: scripts/content, receiver: background]
  31. L17 `var »localData = packedLocalData[key]«;`  · ELEMENT:implicit.add
  32. L22 `if (»syncData && syncTs > localTs«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right
  33. L26 `response[key] = »localData.data«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element
  34. L8 `var »response = {}«;`  · ELEMENT:object.setProperty
  35. L62 (→L66) `»arrayOfProperties.forEach(function( element ) {«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
  36. L566 `response.playedgames = lib.fromEntries( »response.playedgames« );`  · ELEMENT:member-element-container
  37. L568 `game = »response.playedgames[key]«;`  · ELEMENT:member-element
  38. L73 `object[key] = »Input[key]«;`  · ELEMENT:member-element
  39. L72 `var »object = {}«;`  · ELEMENT:object.setProperty
  40. L70 `var »array = []«;`  · ELEMENT:object.setProperty
  41. L571 `»lib.syncdata.set({"playedgames": lib.entries( response.playedgames )})«;`  · ELEMENT:object.setProperty
  42. L45 (→L48) `»            wrappeddata[key] = {«`  · ELEMENT:object.setProperty
  43. L44 `var »wrappeddata = {}«;`  · ELEMENT:object.setProperty
  44. L86 `return »JSON.stringify(data).length«;`  · RETURN:json.stringify, ELEMENT:member.length
  45. L91 `while (»bytesize« > MAXSIZE) {`  · ASSIGN:identifier, ASSIGN:binary-left
  46. L92 `var »item = copy[copy.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  47. L93 `bytesize -= »getByteSize(item)« + 1;`  · ASSIGN:identifier, ASSIGN:binary-left
  48. L94 `copy.splice(»copy.length« - 1, 1);`  · ELEMENT:member.length, ASSIGN:binary-left

---

## Flow #7 — WINDOW_CUSTOM_EVENT (From storage.sync.set('playedgames') in scripts/content)  ·  16× duplicate paths collapsed

- **Source**: `WINDOW_CUSTOM_EVENT` — `scripts/ui` L264:C7 -> L264:C13  `»      «   event.clientY < 109) == false &&`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (playedgames) — `background` L49:C12 -> L55:C14 (spans to L55)  `»chrome.storage.local.set(wrappeddata, function () {«`
  - `CHROME_SYNC_STORAGE` (playedgames) — `background` L51:C16 -> L54:C18 (spans to L54)  `»chrome.storage.sync.set(wrappeddata, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1533 raw steps → 55 distinct lines):
   1. L264 _(in `scripts/ui`)_ `»          event.clientY < «109) == false &&`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   2. L265 _(in `scripts/ui`)_ `»          «self.mousedover) {`  · ELEMENT:member-element, ASSIGN:binary-left
   3. L268 _(in `scripts/lib/ruffle/655`)_ `return get»Float64ArrayMemory0().suba«rray(ptr / 8, ptr / 8 + len);`  · ELEMENT:member-element, RETURN:json.parse
   4. L274 _(in `scripts/ui`)_ `»      if (self.«mousedover == false) {`  · ELEMENT:member-element
   5. L279 _(in `scripts/notifications`)_ `return t»his.prevObject || this.co«nstructor();`  · ELEMENT:member-element
   6. L280 _(in `scripts/lib/bootstrap.bundle`)_ `_proto._triggerCloseEvent = function _tr»iggerCloseEvent(element) «{`  · ELEMENT:member-element
   7. L377 `var notificatio»nCo«unt = parseInt( badgeText );`  · ASSIGN:identifier
   8. L380 _(in `scripts/notifications`)_ `if ( !obj || »toString«.call( obj ) !== "[object Object]" ) {`  · ASSIGN:identifier, ELEMENT:member-element-container
   9. L9 `»chrome.storage.lo«cal.get(keys, function (packedLocalData) {`  · ELEMENT:object.setProperty
  10. L285 _(in `scripts/lib/ruffle/655`)_ `const CLOS»URE_DTORS = (typeof FinalizationRegist«ry === 'undefined')`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  11. L292 _(in `scripts/ui`)_ `//»next.eq(0).s«how();`  · ELEMENT:member-element
  12. L293 _(in `scripts/ui`)_ `this.setSlide(ne»xt.children(«).attr('slideid'));`  · ELEMENT:member-element
  13. L294 _(in `scripts/enabler`)_ `if ( copyIs»Array && «!Array.isArray( src ) ) {`  · ASSIGN:identifier
  14. L118 _(in `scripts/lib/jquery`)_ `val »= node[ i ] || node.getAttribute && no«de.getAttribute( i );`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  15. L122 `»type«: type,`  · ASSIGN:identifier
  16. L123 `»targ«et: 'offscreen',`  · ASSIGN:identifier
  17. L167 _(in `scripts/ui`)_ `function» get«ByteSize(data) {`  · ASSIGN:identifier
  18. L168 `sendOffscreenMessage("po»stme«ssage",{ command: "superstarterstatus", data: { installed: installed } });`  · ASSIGN:identifier
  19. L46 `»    ts: «new Date().getTime(),`  · ASSIGN:identifier
  20. L39 (→L48) `»    Object.keys(data).forEach(function (key) {«`  · ELEMENT:object.setProperty
  21. L552 (→L556) `»  return true;«`  · ELEMENT:object.setProperty
  22. L170 `if» (cb«) cb({`  · ASSIGN:identifier
  23. L171 _(in `scripts/lib/ruffle/ruffle`)_ `__exportStar(_»_webpack_require«__(325), exports);`  · ASSIGN:identifier, ELEMENT:member-element
  24. L157 `pe»rsistGamer«Status();`  · ELEMENT:object.setProperty
  25. L129 `async functi»on get(url,« cb) {`  · ELEMENT:object.setProperty
  26. L127 _(in `scripts/ui`)_ `prom»ise.contex«t = self.context;`  · ELEMENT:object.setProperty
  27. L174 _(in `scripts/content`)_ `»lib.syncdata.set({ playedgames: lib.entries(games) })«;`  · ELEMENT:object.setProperty
  28. L33 (→L36) `»            }«`  · ELEMENT:object.setProperty
  29. L32 `»cb(new Error("Th«e data being requested does not exist.\nData: " + JSON.stringify(keys)));`  · ELEMENT:object.setProperty
  30. L13 `»         return (packedLoca«lData.hasOwnProperty(key) &&`  · RETURN:json.stringify, ELEMENT:member.length
  31. L18 `»         var syncData = packedSyncData[key]«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:implicit.add
  32. L19 `»        var localRawData = («localData && localData.data) ? localData.data : undefined;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  33. L20 `»var localTs = (lo«calData && localData.ts) ? localData.ts : 0;`  · ASSIGN:identifier, ASSIGN:binary-left
  34. L21 `»var syncTs = (syncData && syncData.ts) ? syncData.ts« : 0;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-consequent, ASSIGN:identifier, ELEMENT:member-element
  35. L147 (→L148) `i: response.gamerguid, »«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  36. L148 `lc: { pi: response.partnerid, t»s: new Date(), url«: "" }`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  37. L150 _(in `scripts/lib/jquery`)_ `// The jQuery obje»ct is actually just «the init constructor 'enhanced'`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  38. L10 (→L34) `»        chrome.storage.sync.get(keys, function (packedSyncData) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: playedgames, sender: scripts/content, receiver: background]
  39. L22 `if (»syncData && syncTs > localTs«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  40. L23 `response[key] = »syncData.data«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element
  41. L8 `var »response = {}«;`  · ELEMENT:object.setProperty
  42. L566 `response.playedgames = lib.fromEntries( »response.playedgames« );`  · ELEMENT:member-element-container
  43. L62 (→L66) `»arrayOfProperties.forEach(function( element ) {«`  · ELEMENT:member-element, RETURN:fallback-return
  44. L568 `game = »response.playedgames[key]«;`  · ELEMENT:member-element
  45. L73 `object[key] = »Input[key]«;`  · ELEMENT:member-element
  46. L72 `var »object = {}«;`  · ELEMENT:object.setProperty
  47. L70 `var »array = []«;`  · ELEMENT:object.setProperty
  48. L571 `»lib.syncdata.set({"playedgames": lib.entries( response.playedgames )})«;`  · ELEMENT:object.setProperty
  49. L45 (→L48) `»            wrappeddata[key] = {«`  · ELEMENT:object.setProperty
  50. L44 `var »wrappeddata = {}«;`  · ELEMENT:object.setProperty
  51. L86 `return »JSON.stringify(data).length«;`  · RETURN:json.stringify, ELEMENT:member.length
  52. L91 `while (»bytesize« > MAXSIZE) {`  · ASSIGN:identifier, ASSIGN:binary-left
  53. L92 `var »item = copy[copy.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  54. L93 `bytesize -= »getByteSize(item)« + 1;`  · ASSIGN:identifier, ASSIGN:binary-left
  55. L94 `copy.splice(»copy.length« - 1, 1);`  · ELEMENT:member.length, ASSIGN:binary-left

---

## Flow #8 — DOCUMENT_LOCATION (From storage.sync.set('playedgames') in scripts/content)  ·  16× duplicate paths collapsed

- **Source**: `DOCUMENT_LOCATION` — `background` L73:C2 -> L76:C5 (spans to L76)  `»      object[key] = Input[key];«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (playedgames) — `background` L49:C12 -> L55:C14 (spans to L55)  `»chrome.storage.local.set(wrappeddata, function () {«`
  - `CHROME_SYNC_STORAGE` (playedgames) — `background` L51:C16 -> L54:C18 (spans to L54)  `»chrome.storage.sync.set(wrappeddata, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1422 raw steps → 34 distinct lines):
   1. L73 (→L76) `object[key] = »Input[key];«`  · ELEMENT:object.setProperty, ELEMENT:member-element
   2. L562 (→L565) `»      throw new Error("Trying to clear new games when playedgames does not exist.");«`  · ELEMENT:object.setProperty
   3. L721 (→L727) _(in `scripts/ui`)_ `»                    throw new Error("Trying to forget game when playedgames does not exist.");«`  · ELEMENT:object.setProperty
   4. L118 _(in `scripts/lib/jquery`)_ `val »= node[ i ] || node.getAttribute && no«de.getAttribute( i );`  · ASSIGN:binary-left, ASSIGN:logical-left
   5. L39 (→L48) `»    Object.keys(data).forEach(function (key) {«`  · ELEMENT:object.setProperty
   6. L552 (→L556) `»  return true;«`  · ELEMENT:object.setProperty
   7. L157 `pe»rsistGamer«Status();`  · ELEMENT:object.setProperty
   8. L129 `async functi»on get(url,« cb) {`  · ELEMENT:object.setProperty
   9. L127 _(in `scripts/ui`)_ `prom»ise.contex«t = self.context;`  · ELEMENT:object.setProperty
  10. L174 _(in `scripts/content`)_ `»lib.syncdata.set({ playedgames: lib.entries(games) })«;`  · ELEMENT:object.setProperty
  11. L33 (→L36) `»            }«`  · ELEMENT:object.setProperty
  12. L32 `»cb(new Error("Th«e data being requested does not exist.\nData: " + JSON.stringify(keys)));`  · ELEMENT:object.setProperty
  13. L13 `»         return (packedLoca«lData.hasOwnProperty(key) &&`  · RETURN:json.stringify, ELEMENT:member.length
  14. L18 `»         var syncData = packedSyncData[key]«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:implicit.add
  15. L19 `»        var localRawData = («localData && localData.data) ? localData.data : undefined;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  16. L20 `»var localTs = (lo«calData && localData.ts) ? localData.ts : 0;`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L21 `»var syncTs = (syncData && syncData.ts) ? syncData.ts« : 0;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-consequent, ASSIGN:identifier, ELEMENT:member-element
  18. L10 (→L34) `»        chrome.storage.sync.get(keys, function (packedSyncData) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: playedgames, sender: scripts/content, receiver: background]
  19. L22 `if (»syncData && syncTs > localTs«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  20. L23 `response[key] = »syncData.data«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element
  21. L8 `var »response = {}«;`  · ELEMENT:object.setProperty
  22. L566 `response.playedgames = lib.fromEntries( »response.playedgames« );`  · ELEMENT:member-element-container
  23. L62 (→L66) `»arrayOfProperties.forEach(function( element ) {«`  · ELEMENT:member-element, RETURN:fallback-return
  24. L568 `game = »response.playedgames[key]«;`  · ELEMENT:member-element
  25. L72 `var »object = {}«;`  · ELEMENT:object.setProperty
  26. L70 `var »array = []«;`  · ELEMENT:object.setProperty
  27. L571 `»lib.syncdata.set({"playedgames": lib.entries( response.playedgames )})«;`  · ELEMENT:object.setProperty
  28. L45 (→L48) `»            wrappeddata[key] = {«`  · ELEMENT:object.setProperty
  29. L44 `var »wrappeddata = {}«;`  · ELEMENT:object.setProperty
  30. L86 `return »JSON.stringify(data).length«;`  · RETURN:json.stringify, ELEMENT:member.length
  31. L91 `while (»bytesize« > MAXSIZE) {`  · ASSIGN:identifier, ASSIGN:binary-left
  32. L92 `var »item = copy[copy.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  33. L93 `bytesize -= »getByteSize(item)« + 1;`  · ASSIGN:identifier, ASSIGN:binary-left
  34. L94 `copy.splice(»copy.length« - 1, 1);`  · ELEMENT:member.length, ASSIGN:binary-left

---

## Flow #9 — DOCUMENT_LOCATION (From storage.sync.set('playedgames') in scripts/content)  ·  32× duplicate paths collapsed

- **Source**: `DOCUMENT_LOCATION` — `scripts/ui` L1013:C6 -> L1013:C23  `// Ge»t the Nth element« in the matched element set OR`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (playedgames) — `background` L49:C12 -> L55:C14 (spans to L55)  `»chrome.storage.local.set(wrappeddata, function () {«`
  - `CHROME_SYNC_STORAGE` (playedgames) — `background` L51:C16 -> L54:C18 (spans to L54)  `»chrome.storage.sync.set(wrappeddata, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2430 raw steps → 47 distinct lines):
   1. L1013 _(in `scripts/ui`)_ `// Ge»t the Nth element« in the matched element set OR`  · ASSIGN:binary-left
   2. L1012 (→L1013) _(in `scripts/enabler`)_ `}» else {«`  · ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
   3. L1015 _(in `scripts/content`)_ `favicon = »window.location.protocol + "//" + window.location.hostname + "/"« + "favicon.ico";`  · ASSIGN:binary-right, ASSIGN:binary-left
   4. L1000 _(in `scripts/enabler`)_ `// * liste»d form-associated elem«ents in a disabled fieldset`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L1018 _(in `scripts/ui`)_ `if ( num »== null« ) {`  · ASSIGN:identifier
   6. L1002 _(in `scripts/content`)_ `favicon = »window.location.protocol + "//" + window.location.hostname + "/" + favicon.slice(2)«;;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L1003 _(in `scripts/enabler`)_ `// * option elem»ents in a disabled o«ptgroup`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L1004 _(in `scripts/content`)_ `favicon = »window.location.protocol + "//" + window.location.hostname + "/" + favicon.slice(1)«;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L1005 _(in `scripts/content`)_ `} else if ( »favicon.match("^(http|https|" + window.location.hostname + ")")« == null ) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:fallback-return
  10. L1006 _(in `scripts/content`)_ `favicon = »window.location.protocol + "//" + window.location.hostname + "/" + favicon«;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier
  11. L721 (→L727) _(in `scripts/ui`)_ `»                    throw new Error("Trying to forget game when playedgames does not exist.");«`  · ELEMENT:object.setProperty
  12. L726 _(in `scripts/ui`)_ `lib.syncdata.set({ "playedgames": lib.»entries(playedgames) }, «function () {`  · ASSIGN:binary-right
  13. L39 (→L48) `»    Object.keys(data).forEach(function (key) {«`  · ELEMENT:object.setProperty
  14. L552 (→L556) `»  return true;«`  · ELEMENT:object.setProperty
  15. L157 `pe»rsistGamer«Status();`  · ELEMENT:object.setProperty
  16. L129 `async functi»on get(url,« cb) {`  · ELEMENT:object.setProperty
  17. L127 _(in `scripts/ui`)_ `prom»ise.contex«t = self.context;`  · ELEMENT:object.setProperty
  18. L174 _(in `scripts/content`)_ `»lib.syncdata.set({ playedgames: lib.entries(games) })«;`  · ELEMENT:object.setProperty
  19. L33 (→L36) `»            }«`  · ELEMENT:object.setProperty
  20. L32 `»cb(new Error("Th«e data being requested does not exist.\nData: " + JSON.stringify(keys)));`  · ELEMENT:object.setProperty
  21. L13 `»         return (packedLoca«lData.hasOwnProperty(key) &&`  · RETURN:json.stringify, ELEMENT:member.length
  22. L18 `»         var syncData = packedSyncData[key]«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:implicit.add
  23. L19 `»        var localRawData = («localData && localData.data) ? localData.data : undefined;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  24. L20 `»var localTs = (lo«calData && localData.ts) ? localData.ts : 0;`  · ASSIGN:identifier, ASSIGN:binary-left
  25. L21 `»var syncTs = (syncData && syncData.ts) ? syncData.ts« : 0;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-consequent, ASSIGN:identifier, ELEMENT:member-element
  26. L972 (→L975) _(in `scripts/enabler`)_ `»}«`  · ELEMENT:object.setProperty
  27. L1026 _(in `scripts/content`)_ `»logGame({ title: window.location.hostname, iconurl: faviconurl, url: window.location.protocol + "//" + window.location.hostname, publishericon: faviconurl })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ASSIGN:binary-right
  28. L118 _(in `scripts/lib/jquery`)_ `val »= node[ i ] || node.getAttribute && no«de.getAttribute( i );`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  29. L1042 (→L1043) _(in `scripts/ui`)_ `return j»Query.each( this, callback );«`  · ASSIGN:binary-left, ASSIGN:logical-left
  30. L10 (→L34) `»        chrome.storage.sync.get(keys, function (packedSyncData) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: playedgames, sender: scripts/content, receiver: background]
  31. L22 `if (»syncData && syncTs > localTs«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  32. L23 `response[key] = »syncData.data«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element
  33. L8 `var »response = {}«;`  · ELEMENT:object.setProperty
  34. L566 `response.playedgames = lib.fromEntries( »response.playedgames« );`  · ELEMENT:member-element-container
  35. L62 (→L66) `»arrayOfProperties.forEach(function( element ) {«`  · ELEMENT:member-element, RETURN:fallback-return
  36. L568 `game = »response.playedgames[key]«;`  · ELEMENT:member-element
  37. L73 `object[key] = »Input[key]«;`  · ELEMENT:member-element
  38. L72 `var »object = {}«;`  · ELEMENT:object.setProperty
  39. L70 `var »array = []«;`  · ELEMENT:object.setProperty
  40. L571 `»lib.syncdata.set({"playedgames": lib.entries( response.playedgames )})«;`  · ELEMENT:object.setProperty
  41. L45 (→L48) `»            wrappeddata[key] = {«`  · ELEMENT:object.setProperty
  42. L44 `var »wrappeddata = {}«;`  · ELEMENT:object.setProperty
  43. L86 `return »JSON.stringify(data).length«;`  · RETURN:json.stringify, ELEMENT:member.length
  44. L91 `while (»bytesize« > MAXSIZE) {`  · ASSIGN:identifier, ASSIGN:binary-left
  45. L92 `var »item = copy[copy.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  46. L93 `bytesize -= »getByteSize(item)« + 1;`  · ASSIGN:identifier, ASSIGN:binary-left
  47. L94 `copy.splice(»copy.length« - 1, 1);`  · ELEMENT:member.length, ASSIGN:binary-left

---
