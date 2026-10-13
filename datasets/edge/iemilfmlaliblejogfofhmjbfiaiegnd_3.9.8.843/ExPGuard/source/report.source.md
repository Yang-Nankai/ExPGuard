# Source-level Taint Flow — iemilfmlaliblejogfofhmjbfiaiegnd 3.9.8.843

- Source type: CRX
- Files with issues: 5 / 8
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/content/main` L29:C18 -> L29:C25  `var matches = »repoUrl«.match(repoExp);`
- **Sink(s)**:
  - `XML_HTTP_REQUEST_OPEN` — `js/content/main` L125:C5 -> L125:C35  `»xmlhttp.open("GET", url, true)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1059 raw steps → 32 distinct lines):
   1. L29 `var matches = »repoUrl.match(repoExp)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   2. L30 `if(»matches && matches.length > 0«){`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L32 `»"https://github.com/" + matches[1] + "/" + matches[2] + "/tree/" + matches[5]« :`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:conditional-consequent
   4. L33 `»"https://github.com/" + matches[1] + "/" + matches[2]«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left
   5. L35 `var strType = »matches[4]«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L36 `if ( »!strType && (repoUrl.length - rootUrl.length > 1)« ) { // means no type and url different with root`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
   7. L41 `author: »matches[1]«,`  · ASSIGN:identifier, ELEMENT:member-element
   8. L40 (→L48) `»        return {«`  · ELEMENT:object.setProperty
   9. L42 `project: »matches[2]«,`  · ASSIGN:identifier, ELEMENT:member-element
  10. L43 `branch: »matches[5]«,`  · ASSIGN:identifier, ELEMENT:member-element
  11. L44 `type: »matches[4]«,`  · ASSIGN:identifier, ELEMENT:member-element
  12. L45 `path: »matches[7] || ''«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  13. L46 `inputUrl: »repoUrl«,`  · ASSIGN:identifier
  14. L47 `rootUrl: »rootUrl«`  · ASSIGN:identifier
  15. L367 `var »resolvedUrl = resolveUrl(window.location.href)«;`  · ELEMENT:implicit.add
  16. L295 `var »infoUrl = getInfoUrl(resolvedUrl.author, resolvedUrl.project, resolvedUrl.path, resolvedUrl.branch)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  17. L63 `+ »author + "/" + project« + "/contents/"`  · ASSIGN:identifier, ASSIGN:binary-right
  18. L62 (→L64) `»	return "https://api.github.com/repos/"«`  · ASSIGN:binary-left
  19. L64 `+ »path + (branch ? ("?ref=" + branch) : ""«);`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:conditional-consequent
  20. L296 `return callAjax(»infoUrl«, currentKey).then(function(xmlResponse){`  · ASSIGN:identifier
  21. L125 `xmlhttp.open("GET", »url«, true);`  · ASSIGN:identifier
  22. L350 `»return zipContents([resolvedUrl.project].concat(resolvedUrl.path.split('/')).join('-'), fileContents);«`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:object.setProperty, COPY:array.concat, RETURN:array.join
  23. L651 `var »resolvedUrl = resolveUrl(window.location.href)«;`  · ELEMENT:implicit.add
  24. L652 `var »baseRepo = [resolvedUrl.author, resolvedUrl.project].join("/")«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:object.setProperty, RETURN:array.join
  25. L654 `var downloadBtn = fileNavigation ? fileNavigation.querySelector(»"div[data-target='get-repo.modal'] a[href^='/" + baseRepo« + "/']") : null;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  26. L655 `var »pathText = resolvedUrl.path.split('/').pop()«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  27. L656 `var »urlType = resolvedUrl.type«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  28. L676 `»return !!document.querySelector("head meta[value=repo_source]") && resolveUrl(window.location.href) !== false;«`  · ELEMENT:implicit.add, ASSIGN:binary-left, ASSIGN:logical-right
  29. L852 `var »resolvedUrl = resolveUrl(window.location.href)«;`  · ELEMENT:implicit.add
  30. L853 `var »baseRepo = [resolvedUrl.author, resolvedUrl.project].join("/")«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:object.setProperty, RETURN:array.join
  31. L855 `var downloadBtn = fileNavigation ? fileNavigation.querySelector(»"div[data-target='get-repo.modal'] a[href^='/" + baseRepo« + "/']") : null;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  32. L856 `var »urlType = resolvedUrl.type«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container

---

## Flow #2 — ELEMENT_TEXT_CONTENT (p.token-cache)

- **Source**: `ELEMENT_TEXT_CONTENT` — `js/background` L3:C0 -> L81:C2 (spans to L81)  `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (gitzip-github-token) — `js/background` L14:C3 -> L16:C5 (spans to L16)  `»chrome.storage.sync.set( {"gitzip-github-token": request.value}, function(res){«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 2 distinct lines):
   1. L3 (→L81) `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content/autosave->js/background]`
   2. L14 (→L16) `»			chrome.storage.sync.set( {"gitzip-github-token": request.value}, function(res){«`  · ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_VALUE (tokenInput)

- **Source**: `ELEMENT_VALUE` — `js/background` L3:C0 -> L81:C2 (spans to L81)  `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (gitzip-github-token) — `js/background` L14:C3 -> L16:C5 (spans to L16)  `»chrome.storage.sync.set( {"gitzip-github-token": request.value}, function(res){«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 2 distinct lines):
   1. L3 (→L81) `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/popup->js/background]`
   2. L14 (→L16) `»			chrome.storage.sync.set( {"gitzip-github-token": request.value}, function(res){«`  · ELEMENT:object.setProperty

---
