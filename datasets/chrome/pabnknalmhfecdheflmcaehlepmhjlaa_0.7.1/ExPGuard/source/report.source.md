# Source-level Taint Flow — pabnknalmhfecdheflmcaehlepmhjlaa 0.7.1

- Source type: CRX
- Files with issues: 2 / 6
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `worker` L254:C6 -> L254:C13  `if (»request«.method === 'add-jobs' || request.method === 'store-links') {`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `worker` L82:C4 -> L89:C6 (spans to L89)  `»chrome.windows.create({«`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `worker` L196:C4 -> L196:C19  `»response(links)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (274 raw steps → 45 distinct lines):
   1. L254 `if (»request.method === 'add-jobs' || request.method === 'store-links'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L255 `onMessage(»request«, sender, response);`  · ASSIGN:identifier
   3. L94 `if (»request.method« === 'popup_ready') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L131 `else if (»request.method« === 'search') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L132 `manager.search(»request.query«, response);`  · ASSIGN:identifier, ELEMENT:member-element
   6. L135 `else if (»request.method« === 'erase') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L136 `manager.erase(»request.query«, response);`  · ASSIGN:identifier, ELEMENT:member-element
   8. L139 `else if (»request.method === 'cancel' || request.method === 'resume' || request.method === 'pause'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   9. L140 `manager[»request.method](request.id«, () => manager.search({`  · ASSIGN:identifier, ELEMENT:member-element
  10. L145 `else if (»request.method« === 'add-jobs') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L146 `if (»request.jobs.length«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length
  12. L184 `else if (»request.method« === 'store-links') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L149 `if (»request.tabId«) {`  · ASSIGN:identifier, ELEMENT:member-element
  14. L150 `const tab = await new Promise(resolve => chrome.tabs.get(»request.tabId«, resolve));`  · ASSIGN:identifier, ELEMENT:member-element
  15. L155 `for (»const {link, referrer, base, links, keys, filename, threads} of request.jobs«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration, ELEMENT:destructure-property[link], ELEMENT:destructure-property[referrer], ELEMENT:destructure-property[base], ELEMENT:destructure-property[links], ELEMENT:destructure-property[keys], ELEMENT:destructure-property[filename], ELEMENT:destructure-property[threads]
  16. L157 `url: »link«,`  · ASSIGN:identifier
  17. L156 (→L160) `»          const job = {«`  · ELEMENT:object.setProperty
  18. L158 `»filename«,`  · ASSIGN:identifier
  19. L159 `referrer: »referrer || r«`  · ASSIGN:identifier, ASSIGN:logical-left
  20. L161 `if (»links«) {`  · ASSIGN:identifier
  21. L172 `»...(request.configs || {})«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, COPY:object-spread
  22. L173 `'max-number-of-threads': threads ? »Math.min(8, threads)« : 3`  · ASSIGN:identifier, RETURN:Math.min, ASSIGN:conditional-consequent
  23. L170 (→L174) `»          manager.download(job, undefined, {«`  · ELEMENT:object.setProperty
  24. L164 `job.urls = »links«;`  · ASSIGN:identifier
  25. L165 `if (»base«) {`  · ASSIGN:identifier
  26. L166 `job.urls = »job.urls.map(s => s.startsWith('http') ? s : base + s)«;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:binary-left
  27. L168 `job.keys = »keys«;`  · ASSIGN:identifier
  28. L185 `manager.schedule(»request.job«);`  · ASSIGN:identifier, ELEMENT:member-element
  29. L189 `else if (»request.method« === 'open-jobs') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  30. L190 `job(»request.jobs«);`  · ASSIGN:identifier, ELEMENT:member-element
  31. L80 `»args.append('jobs', JSON.stringify(jobs))«;`  · ASSIGN:identifier, RETURN:json.stringify, RETURN:URLSearchParams.append
  32. L83 `url: '/data/add/index.html?' + »args.toString()«,`  · ELEMENT:member-element-container, RETURN:URLSearchParams.toString, ASSIGN:binary-right
  33. L82 (→L89) `»    chrome.windows.create({«`  · ELEMENT:object.setProperty
  34. L192 `else if (»request.method« === 'extract-links') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L198 `else if (»request.method« === 'start') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  36. L194 (→L195) `const links = »(request.content.match(re) || []) .map(s => s.replace(/&amp;/g, '&'))«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ELEMENT:member-element-container
  37. L200 `id: »request.id«`  · ASSIGN:identifier, ELEMENT:member-element
  38. L199 (→L214) `»    manager.search({«`  · ELEMENT:object.setProperty
  39. L216 `else if (»request.method« === 'collect') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  40. L219 `tabId: »request.tabId«,`  · ASSIGN:identifier, ELEMENT:member-element
  41. L217 (→L232) `»    chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  42. L235 `else if (»request.method« === 'media-available') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  43. L141 `id: »request.id«`  · ASSIGN:identifier, ELEMENT:member-element
  44. L210 `id: »request.id«`  · ASSIGN:identifier, ELEMENT:member-element
  45. L209 (→L211) `»        manager.erase({«`  · ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_VALUE (keep.awake)

- **Source**: `ELEMENT_VALUE` — `data/options/index` L27:C2 -> L44:C4 (spans to L44)  `»chrome.storage.local.set({«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (keep.awake) — `data/options/index` L27:C2 -> L44:C4 (spans to L44)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L27 (→L44) `»  chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---
