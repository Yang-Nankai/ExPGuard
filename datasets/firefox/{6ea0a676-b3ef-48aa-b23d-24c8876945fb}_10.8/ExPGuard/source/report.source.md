# Source-level Taint Flow — {6ea0a676-b3ef-48aa-b23d-24c8876945fb} 10.8

- Source type: XPI
- Files with issues: 4 / 5
- Distinct taint flows: 4  (collapsed from 6 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content_w2g.530d247b` L166:C27 -> L166:C50  `if (event.data && !»event.data._skipForward«) chrome.runtime.sendMessage(event.data);`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content_w2g.530d247b` L162:C4 -> L162:C32  `»window.postMessage(msg, "*")«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (17 raw steps → 4 distinct lines):
   1. L166 `if (»event.data && !event.data._skipForward«) chrome.runtime.sendMessage(event.data);`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   2. L160 (→L163) `»chrome.runtime.onMessage.addListener(function(msg) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[sw.98b6defa->content_w2g.530d247b]`
   3. L161 `»msg«._skipForward = true;`  · ASSIGN:identifier
   4. L162 `window.postMessage(»msg«, "*");`  · ASSIGN:identifier

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `sw.98b6defa` L190:C0 -> L278:C2 (spans to L278)  `»chrome.runtime.onMessage.addListener(function(msg, sender) {«`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `sw.98b6defa` L193:C30 -> L200:C14 (spans to L200)  `if (msg.openSite) »chrome.windows.create({«`
  - `CHROME_SESSION_STORAGE` (db) — `sw.98b6defa` L209:C16 -> L211:C18 (spans to L211)  `»chrome.storage.session.set({«`
  - `CHROME_SESSION_STORAGE` (db) — `sw.98b6defa` L329:C16 -> L331:C18 (spans to L331)  `»chrome.storage.session.set({«`
  - `CHROME_SESSION_STORAGE` (db) — `sw.98b6defa` L415:C8 -> L417:C10 (spans to L417)  `»chrome.storage.session.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (280 raw steps → 34 distinct lines):
   1. L190 (→L278) `»chrome.runtime.onMessage.addListener(function(msg, sender) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content_w2g.530d247b->sw.98b6defa]`
   2. L193 (→L218) `if (»msg.openSite) chrome.windows.create({«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   3. L199 `url: »msg.openSite.url«`  · ASSIGN:identifier, ELEMENT:member-element
   4. L207 `syncurl: »msg.openSite.url«`  · ASSIGN:identifier, ELEMENT:member-element
   5. L201 (→L208) `»                db[sender.tab.id] = {«`  · ELEMENT:object.setProperty
   6. L186 `»db = d.db || {}«;`  · ELEMENT:object.setProperty
   7. L209 (→L217) `»                chrome.storage.session.set({«`  · ELEMENT:object.setProperty
   8. L449 `for(»const k in db)if (Object.hasOwn(db, k«)) {`  · ITERATE:loop.iteration, ASSIGN:identifier
   9. L450 `if (»db[k].stab == id) return parseInt(k)«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:binary-left, RETURN:parseInt
  10. L236 `let »m = _getKeyByTab(sender.tab.id)«;`  · ELEMENT:implicit.add
  11. L219 `if (»db[sender.tab.id]«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  12. L237 `if (»m«) {`  · ASSIGN:identifier
  13. L220 `if (»db[sender.tab.id].type === "window"«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left
  14. L221 `if (»msg.closeSite«) _closeWindow(sender.tab.id);`  · ASSIGN:identifier, ELEMENT:member-element
  15. L228 `if (»msg.urlok«) {`  · ASSIGN:identifier, ELEMENT:member-element
  16. L412 (→L418) `if (»db[tab] && db[tab].type === "window") chrome.tabs.get(db[tab].stab).then(function(t) {«`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  17. L222 (→L226) `else if (»msg.focusSite) chrome.tabs.get(db[sender.tab.id].stab).then(function(tab) {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ELEMENT:member-element-container
  18. L229 `»msg.urlok.syncurl = db[sender.tab.id].syncurl«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:identifier
  19. L231 (→L233) `} else if (»db[sender.tab.id].vframe !== null) chrome.tabs.sendMessage(db[sender.tab.id].stab, msg, {«`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:object.setProperty
  20. L230 `»chrome.tabs.sendMessage(db[sender.tab.id].stab, msg)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:identifier
  21. L232 `frameId: »db[sender.tab.id].vframe«`  · ELEMENT:member-element-container
  22. L239 (→L247) `chrome.tabs.sendMessage(»m, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  23. L241 `url: »msg.newurl.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  24. L242 `title: »msg.newurl.title«,`  · ASSIGN:identifier, ELEMENT:member-element
  25. L281 `let »m = _getKeyByTab(detail.tabId)«;`  · ELEMENT:implicit.add
  26. L282 `if (»m«) switch(db[m].type){`  · ASSIGN:identifier
  27. L305 `if (detail.frameId !== »db[m].tframe«) traverse(detail.frameId);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  28. L297 `else if (id === »db[m].tframe«) resolve();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  29. L335 `else if (»detail.frameId === 0 && db[detail.tabId]«) _closeWindow(detail.tabId);`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-right
  30. L329 (→L331) `»                chrome.storage.session.set({«`  · ELEMENT:object.setProperty
  31. L339 `if (»db[id]«) _closeWindow(id);`  · ELEMENT:member-element-container
  32. L341 `let »m = _getKeyByTab(id)«;`  · ELEMENT:implicit.add
  33. L342 `if (»m«) {`  · ASSIGN:identifier
  34. L415 (→L417) `»        chrome.storage.session.set({«`  · ELEMENT:object.setProperty

---

## Flow #3 — WINDOW_MESSAGE_EVENT (From storage.session.set('db') in sw.98b6defa)  ·  3× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `sw.98b6defa` L190:C0 -> L278:C2 (spans to L278)  `»chrome.runtime.onMessage.addListener(function(msg, sender) {«`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (db) — `sw.98b6defa` L209:C16 -> L211:C18 (spans to L211)  `»chrome.storage.session.set({«`
  - `CHROME_SESSION_STORAGE` (db) — `sw.98b6defa` L329:C16 -> L331:C18 (spans to L331)  `»chrome.storage.session.set({«`
  - `CHROME_SESSION_STORAGE` (db) — `sw.98b6defa` L415:C8 -> L417:C10 (spans to L417)  `»chrome.storage.session.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (283 raw steps → 35 distinct lines):
   1. L190 (→L278) `»chrome.runtime.onMessage.addListener(function(msg, sender) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content_w2g.530d247b->sw.98b6defa]`
   2. L193 (→L218) `if (»msg.openSite) chrome.windows.create({«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   3. L199 `url: »msg.openSite.url«`  · ASSIGN:identifier, ELEMENT:member-element
   4. L207 `syncurl: »msg.openSite.url«`  · ASSIGN:identifier, ELEMENT:member-element
   5. L201 (→L208) `»                db[sender.tab.id] = {«`  · ELEMENT:object.setProperty
   6. L186 `»db = d.db || {}«;`  · ELEMENT:object.setProperty, ASSIGN:logical-left
   7. L209 (→L217) `»                chrome.storage.session.set({«`  · ELEMENT:object.setProperty
   8. L449 `for(»const k in db)if (Object.hasOwn(db, k«)) {`  · ITERATE:loop.iteration, ASSIGN:identifier
   9. L450 `if (»db[k].stab == id) return parseInt(k)«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:binary-left, RETURN:parseInt
  10. L236 `let »m = _getKeyByTab(sender.tab.id)«;`  · ELEMENT:implicit.add
  11. L219 `if (»db[sender.tab.id]«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  12. L237 `if (»m«) {`  · ASSIGN:identifier
  13. L220 `if (»db[sender.tab.id].type === "window"«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left
  14. L221 `if (»msg.closeSite«) _closeWindow(sender.tab.id);`  · ASSIGN:identifier, ELEMENT:member-element
  15. L228 `if (»msg.urlok«) {`  · ASSIGN:identifier, ELEMENT:member-element
  16. L412 (→L418) `if (»db[tab] && db[tab].type === "window") chrome.tabs.get(db[tab].stab).then(function(t) {«`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  17. L222 (→L226) `else if (»msg.focusSite) chrome.tabs.get(db[sender.tab.id].stab).then(function(tab) {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ELEMENT:member-element-container
  18. L229 `»msg.urlok.syncurl = db[sender.tab.id].syncurl«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:identifier
  19. L231 (→L233) `} else if (»db[sender.tab.id].vframe !== null) chrome.tabs.sendMessage(db[sender.tab.id].stab, msg, {«`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:object.setProperty
  20. L230 `»chrome.tabs.sendMessage(db[sender.tab.id].stab, msg)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:identifier
  21. L232 `frameId: »db[sender.tab.id].vframe«`  · ELEMENT:member-element-container
  22. L239 (→L247) `chrome.tabs.sendMessage(»m, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  23. L241 `url: »msg.newurl.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  24. L242 `title: »msg.newurl.title«,`  · ASSIGN:identifier, ELEMENT:member-element
  25. L281 `let »m = _getKeyByTab(detail.tabId)«;`  · ELEMENT:implicit.add
  26. L282 `if (»m«) switch(db[m].type){`  · ASSIGN:identifier
  27. L305 `if (detail.frameId !== »db[m].tframe«) traverse(detail.frameId);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  28. L297 `else if (id === »db[m].tframe«) resolve();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  29. L335 `else if (»detail.frameId === 0 && db[detail.tabId]«) _closeWindow(detail.tabId);`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-right
  30. L329 (→L331) `»                chrome.storage.session.set({«`  · ELEMENT:object.setProperty
  31. L339 `if (»db[id]«) _closeWindow(id);`  · ELEMENT:member-element-container
  32. L341 `let »m = _getKeyByTab(id)«;`  · ELEMENT:implicit.add
  33. L342 `if (»m«) {`  · ASSIGN:identifier
  34. L415 (→L417) `»        chrome.storage.session.set({«`  · ELEMENT:object.setProperty
  35. L183 (→L185) `»    chrome.storage.session.get([«`  · STORAGE:STORAGE_FLOW[area: session, key: db, sender: sw.98b6defa, receiver: sw.98b6defa]

---

## Flow #4 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `popup.332ea9da` L208:C8 -> L208:C36  `if (»window.location.href.indexOf«("?popout=true") !== -1) document.querySelector("body").classList.add("w2g-popout");`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `popup.332ea9da` L2371:C12 -> L2376:C14 (spans to L2376)  `»chrome.windows.create({«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (11 raw steps → 3 distinct lines):
   1. L208 `if (»window.location.href.indexOf("?popout=true")« !== -1) document.querySelector("body").classList.add("w2g-popout");`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   2. L2372 `url: »href« + "?popout=true",`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L2371 (→L2376) `»            chrome.windows.create({«`  · ELEMENT:object.setProperty

---
