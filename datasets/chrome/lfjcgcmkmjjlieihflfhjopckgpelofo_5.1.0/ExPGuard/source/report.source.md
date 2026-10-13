# Source-level Taint Flow — lfjcgcmkmjjlieihflfhjopckgpelofo 5.1.0

- Source type: CRX
- Files with issues: 9 / 14
- Distinct taint flows: 30  (collapsed from 70 raw issue entries)
- Sinkless sources skipped: 29 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — JQUERY_ELEMENT_VAL (#commit-comment)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/github` L107:C14 -> L113:C9 (spans to L113)  `const »payload = {«`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/github` L114:C15 -> L124:C10 (spans to L124)  `return »$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/github` L114:C15 -> L124:C10 (spans to L124)  `return »$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (3 raw steps → 3 distinct lines):
   1. L107 (→L113) `»        const payload = {«`  · ELEMENT:object.setProperty
   2. L123 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   3. L114 (→L124) `»        return $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #2 — JQUERY_ELEMENT_VAL (#gist-desc)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/github` L157:C10 -> L159:C5 (spans to L159)  `const »payload = {«`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/github` L171:C11 -> L181:C8 (spans to L181)  `return »$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/github` L171:C11 -> L181:C8 (spans to L181)  `return »$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (3 raw steps → 3 distinct lines):
   1. L157 (→L159) `»    const payload = {«`  · ELEMENT:object.setProperty
   2. L180 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   3. L171 (→L187) `»    return $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #3 — JQUERY_ELEMENT_TEXT (#selected-repo-owner)

- **Source**: `JQUERY_ELEMENT_TEXT` — `src/scm/github` L353:C64 -> L353:C69  `const path = owner === this.user ? '/user/repos' : `/orgs/${»owner«}/repos`;`
- **Sink(s)**:
  - `JQUERY_SETTINGS_URL` — `src/scm/github` L356:C8 -> L366:C12 (spans to L366)  `»$.ajax({«`  (url-control=FULL)
  - `JQUERY_AJAX_URL` — `src/scm/github` L356:C8 -> L366:C12 (spans to L366)  `»$.ajax({«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (6 raw steps → 3 distinct lines):
   1. L353 `const path = owner === this.user ? '/user/repos' : »`/orgs/${owner}/repos`«;`  · ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:conditional-alternate
   2. L357 `url: »`${this.baseUrl}${path}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
   3. L356 (→L368) `»        $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #4 — JQUERY_ELEMENT_VAL (#new-repo-name)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/github` L348:C12 -> L348:C16  `name: »name«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/github` L356:C8 -> L366:C12 (spans to L366)  `»$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/github` L356:C8 -> L366:C12 (spans to L366)  `»$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (11 raw steps → 5 distinct lines):
   1. L348 `name: »name«,`  · ASSIGN:identifier
   2. L347 (→L352) `»    const payload = {«`  · ELEMENT:object.setProperty
   3. L354 `if (»!name || name === ''«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   4. L365 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   5. L356 (→L368) `»        $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #5 — JQUERY_ELEMENT_VAL (#new-repo-desc)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/github` L349:C19 -> L349:C23  `description: »desc«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/github` L356:C8 -> L366:C12 (spans to L366)  `»$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/github` L356:C8 -> L366:C12 (spans to L366)  `»$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (4 raw steps → 4 distinct lines):
   1. L349 `description: »desc«,`  · ASSIGN:identifier
   2. L347 (→L352) `»    const payload = {«`  · ELEMENT:object.setProperty
   3. L365 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   4. L356 (→L368) `»        $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #6 — JQUERY_ELEMENT_VAL (#selected-repo-type)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/github` L346:C22 -> L346:C52  `const isPrivate = »$('#selected-repo-type').val()« !== 'Public';`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/github` L356:C8 -> L366:C12 (spans to L366)  `»$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/github` L356:C8 -> L366:C12 (spans to L366)  `»$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (5 raw steps → 5 distinct lines):
   1. L346 `const isPrivate = »$('#selected-repo-type').val()« !== 'Public';`  · ASSIGN:binary-left
   2. L351 `private: »isPrivate«`  · ASSIGN:identifier
   3. L347 (→L352) `»    const payload = {«`  · ELEMENT:object.setProperty
   4. L365 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   5. L356 (→L368) `»        $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #7 — JQUERY_ELEMENT_VAL (#new-gist-name)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/github` L394:C21 -> L394:C25  `'description': »desc«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/github` L404:C8 -> L414:C12 (spans to L414)  `»$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/github` L404:C8 -> L414:C12 (spans to L414)  `»$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (4 raw steps → 4 distinct lines):
   1. L394 `'description': »desc«,`  · ASSIGN:identifier
   2. L393 (→L401) `»    const payload = {«`  · ELEMENT:object.setProperty
   3. L413 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   4. L404 (→L416) `»        $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #8 — JQUERY_ELEMENT_VAL (#new-gist-public)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/github` L392:C21 -> L392:C48  `const isPublic = »$('#new-gist-public').val()« !== 'secret';`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/github` L404:C8 -> L414:C12 (spans to L414)  `»$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/github` L404:C8 -> L414:C12 (spans to L414)  `»$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (5 raw steps → 5 distinct lines):
   1. L392 `const isPublic = »$('#new-gist-public').val()« !== 'secret';`  · ASSIGN:binary-left
   2. L395 `'public': »isPublic«,`  · ASSIGN:identifier
   3. L393 (→L401) `»    const payload = {«`  · ELEMENT:object.setProperty
   4. L413 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   5. L404 (→L416) `»        $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #9 — JQUERY_ELEMENT_VAL (#new-branch-name)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/github` L435:C9 -> L435:C15  `if (!»branch« || branch === '') return;`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/github` L460:C15 -> L470:C10 (spans to L470)  `return »$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/github` L460:C15 -> L470:C10 (spans to L470)  `return »$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (15 raw steps → 8 distinct lines):
   1. L435 `if (»!branch || branch === ''«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L457 `ref: »`refs/heads/${branch}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
   3. L456 (→L459) `»        const payload = {«`  · ELEMENT:object.setProperty
   4. L469 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   5. L460 (→L470) `»        return $.ajax({«`  · ELEMENT:object.setProperty
   6. L474 `[getId()]: »branch«`  · ASSIGN:identifier
   7. L473 (→L475) `»        Object.assign(context.bindBranch, {«`  · ELEMENT:object.setProperty
   8. L479 `return »branch«;`  · ASSIGN:identifier

---

## Flow #10 — JQUERY_ELEMENT_TEXT (#selected-repo-owner)

- **Source**: `JQUERY_ELEMENT_TEXT` — `src/scm/bitbucket` L215:C47 -> L215:C52  `url: `${this.baseUrl}/repositories/${»owner«}/${name}`,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_URL` — `src/scm/bitbucket` L214:C15 -> L224:C10 (spans to L224)  `return »$.ajax({«`  (url-control=PARTIAL)
  - `JQUERY_AJAX_URL` — `src/scm/bitbucket` L214:C15 -> L224:C10 (spans to L224)  `return »$.ajax({«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (3 raw steps → 2 distinct lines):
   1. L215 `url: »`${this.baseUrl}/repositories/${owner}/${name}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
   2. L214 (→L224) `»        return $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #11 — JQUERY_ELEMENT_VAL (#new-repo-name)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/bitbucket` L211:C9 -> L211:C13  `if (!»name« || name === '') return;`
- **Sink(s)**:
  - `JQUERY_SETTINGS_URL` — `src/scm/bitbucket` L214:C15 -> L224:C10 (spans to L224)  `return »$.ajax({«`  (url-control=PARTIAL)
  - `JQUERY_AJAX_URL` — `src/scm/bitbucket` L214:C15 -> L224:C10 (spans to L224)  `return »$.ajax({«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (10 raw steps → 3 distinct lines):
   1. L211 `if (»!name || name === ''«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L215 `url: »`${this.baseUrl}/repositories/${owner}/${name}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
   3. L214 (→L224) `»        return $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #12 — JQUERY_ELEMENT_VAL (#new-repo-desc)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/bitbucket` L208:C19 -> L208:C23  `description: »desc«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/bitbucket` L214:C15 -> L224:C10 (spans to L224)  `return »$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/bitbucket` L214:C15 -> L224:C10 (spans to L224)  `return »$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (4 raw steps → 4 distinct lines):
   1. L208 `description: »desc«,`  · ASSIGN:identifier
   2. L206 (→L210) `»    const payload = {«`  · ELEMENT:object.setProperty
   3. L223 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   4. L214 (→L224) `»        return $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #13 — JQUERY_ELEMENT_VAL (#selected-repo-type)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/bitbucket` L205:C22 -> L205:C52  `const isPrivate = »$('#selected-repo-type').val()« !== 'Public';`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/bitbucket` L214:C15 -> L224:C10 (spans to L224)  `return »$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/bitbucket` L214:C15 -> L224:C10 (spans to L224)  `return »$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (5 raw steps → 5 distinct lines):
   1. L205 `const isPrivate = »$('#selected-repo-type').val()« !== 'Public';`  · ASSIGN:binary-left
   2. L209 `is_private: »isPrivate«`  · ASSIGN:identifier
   3. L206 (→L210) `»    const payload = {«`  · ELEMENT:object.setProperty
   4. L223 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   5. L214 (→L224) `»        return $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #14 — JQUERY_ELEMENT_VAL (#new-repo-name)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/gitlab` L199:C12 -> L199:C16  `path: »name«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/gitlab` L208:C15 -> L216:C12 (spans to L216)  `return »$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/gitlab` L208:C15 -> L216:C12 (spans to L216)  `return »$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (11 raw steps → 5 distinct lines):
   1. L199 `path: »name«,`  · ASSIGN:identifier
   2. L198 (→L202) `»    const payload = {«`  · ELEMENT:object.setProperty
   3. L206 `if (»!name || name === ''«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   4. L215 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   5. L208 (→L218) `»        return $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #15 — JQUERY_ELEMENT_VAL (#new-repo-desc)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/gitlab` L200:C19 -> L200:C23  `description: »desc«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/gitlab` L208:C15 -> L216:C12 (spans to L216)  `return »$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/gitlab` L208:C15 -> L216:C12 (spans to L216)  `return »$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (4 raw steps → 4 distinct lines):
   1. L200 `description: »desc«,`  · ASSIGN:identifier
   2. L198 (→L202) `»    const payload = {«`  · ELEMENT:object.setProperty
   3. L215 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   4. L208 (→L218) `»        return $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #16 — JQUERY_ELEMENT_VAL (#new-branch-name)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/scm/gitlab` L253:C14 -> L253:C20  `branch: »branch«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `src/scm/gitlab` L259:C15 -> L267:C12 (spans to L267)  `return »$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `src/scm/gitlab` L259:C15 -> L267:C12 (spans to L267)  `return »$.ajax({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (14 raw steps → 8 distinct lines):
   1. L253 `branch: »branch«,`  · ASSIGN:identifier
   2. L252 (→L255) `»    const payload = {«`  · ELEMENT:object.setProperty
   3. L256 `if (»!branch || branch === ''«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   4. L266 `data: »JSON.stringify(payload)«`  · RETURN:json.stringify
   5. L259 (→L269) `»        return $.ajax({«`  · ELEMENT:object.setProperty
   6. L273 `[getId()]: »branch«`  · ASSIGN:identifier
   7. L272 (→L274) `»        Object.assign(context.bindBranch, {«`  · ELEMENT:object.setProperty
   8. L278 `return »branch«;`  · ASSIGN:identifier

---

## Flow #17 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `src/gas/script-api` L3:C16 -> L3:C42  `const API_URL = »"https://script.googleapis«.com/v1/projects";`
- **Sink(s)**:
  - `JQUERY_SETTINGS_URL` — `src/gas/script-api` L60:C10 -> L67:C14 (spans to L67)  `»$.ajax({«`  (url-control=PARTIAL)
  - `JQUERY_AJAX_URL` — `src/gas/script-api` L60:C10 -> L67:C14 (spans to L67)  `»$.ajax({«`  (url-control=PARTIAL)
  - `JQUERY_SETTINGS_URL` — `src/gas/script-api` L119:C8 -> L126:C12 (spans to L126)  `»$.ajax({«`  (url-control=PARTIAL)
  - `JQUERY_AJAX_URL` — `src/gas/script-api` L119:C8 -> L126:C12 (spans to L126)  `»$.ajax({«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (77 raw steps → 10 distinct lines):
   1. L3 _(in `src/util`)_ `const match = »window.location.href.match(/https:\/\/script\.google\.com(.*?)\/home\/projects\/([^/]*)\//)«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L4 _(in `src/gas-hub`)_ `let cu»rrentU«rl;`  · ASSIGN:identifier, ASSIGN:unary
   3. L5 `class Scr»iptApi {«`  · ASSIGN:identifier, ELEMENT:member-element
   4. L17 _(in `src/util`)_ `let »config = context.bindConfig[getId()]«;`  · ELEMENT:implicit.add
   5. L60 (→L69) `»          $.ajax({«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty
   6. L61 `url: »`${API_URL}/${getId()}/content?access_token=${context.gapiToken}`«,`  · ASSIGN:template-literal
   7. L85 (→L91) `»          $.getJSON(«`  · ELEMENT:implicit.add
   8. L86 `»`${API_URL}/${getId()}/content`«, {`  · ASSIGN:template-literal
   9. L119 (→L128) `»        $.ajax({«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty
  10. L120 `url: »`${API_URL}/${getId()}/content?access_token=${context.gapiToken}`«,`  · ASSIGN:template-literal

---

## Flow #18 — JQUERY_ELEMENT_TEXT (#selected-suffix)

- **Source**: `JQUERY_ELEMENT_TEXT` — `src/gas-hub` L271:C10 -> L275:C5 (spans to L275)  `const »config = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (bindConfig) — `src/gas-hub` L278:C6 -> L280:C8 (spans to L280)  `»chrome.storage.sync.set({«`
  - `CHROME_SYNC_STORAGE` (unknown) — `src/gas-hub` L317:C4 -> L331:C6 (spans to L331)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (27 raw steps → 7 distinct lines):
   1. L271 (→L275) `»    const config = {«`  · ELEMENT:object.setProperty
   2. L106 `»context.bindConfig = item.bindConfig || {}«;`  · ELEMENT:object.setProperty
   3. L278 (→L280) `»      chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   4. L314 `Object.assign(»context[bindName]«, {`  · ELEMENT:computed-member-unknown-alternative
   5. L318 `[bindName]: »context[bindName]«`  · ELEMENT:computed-member-unknown-alternative
   6. L317 (→L331) `»    chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   7. L78 (→L108) `»      chrome.storage.sync.get([«`  · ELEMENT:object.setProperty

---

## Flow #19 — JQUERY_ELEMENT_VAL (#ignore-pattern)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/gas-hub` L274:C21 -> L274:C53  `ignorePattern: »$('#ignore-pattern').val().split«(';').filter(p => p !== '')`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (bindConfig) — `src/gas-hub` L278:C6 -> L280:C8 (spans to L280)  `»chrome.storage.sync.set({«`
  - `CHROME_SYNC_STORAGE` (unknown) — `src/gas-hub` L317:C4 -> L331:C6 (spans to L331)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (39 raw steps → 8 distinct lines):
   1. L274 `ignorePattern: »$('#ignore-pattern').val().split(';').filter(p => p !== '')«`  · ELEMENT:member-element, RETURN:fallback-return
   2. L271 (→L275) `»    const config = {«`  · ELEMENT:object.setProperty
   3. L106 `»context.bindConfig = item.bindConfig || {}«;`  · ELEMENT:object.setProperty
   4. L278 (→L280) `»      chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   5. L314 `Object.assign(»context[bindName]«, {`  · ELEMENT:computed-member-unknown-alternative
   6. L318 `[bindName]: »context[bindName]«`  · ELEMENT:computed-member-unknown-alternative
   7. L317 (→L331) `»    chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   8. L78 (→L108) `»      chrome.storage.sync.get([«`  · ELEMENT:object.setProperty

---

## Flow #20 — JQUERY_ELEMENT_TEXT (From storage.sync.set('bindConfig') in src/gas-hub)  ·  20× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_TEXT` — `src/gas-hub` L271:C10 -> L275:C5 (spans to L275)  `const »config = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (bindConfig) — `src/gas-hub` L278:C6 -> L280:C8 (spans to L280)  `»chrome.storage.sync.set({«`
  - `CHROME_SYNC_STORAGE` (unknown) — `src/gas-hub` L317:C4 -> L331:C6 (spans to L331)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (48 raw steps → 8 distinct lines):
   1. L271 (→L275) `»    const config = {«`  · ELEMENT:object.setProperty
   2. L106 `»context.bindConfig = item.bindConfig || {}«;`  · ELEMENT:object.setProperty, ASSIGN:logical-left
   3. L278 (→L280) `»      chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   4. L314 `Object.assign(»context[bindName]«, {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
   5. L318 `[bindName]: »context[bindName]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
   6. L317 (→L331) `»    chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   7. L78 (→L108) `»      chrome.storage.sync.get([«`  · ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: sync, key: bindConfig, sender: src/gas-hub, receiver: src/gas-hub]
   8. L74 `»context = {}«;`  · ELEMENT:object.setProperty

---

## Flow #21 — JQUERY_ELEMENT_VAL (From storage.sync.set('bindConfig') in src/gas-hub)  ·  20× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `src/gas-hub` L274:C21 -> L274:C53  `ignorePattern: »$('#ignore-pattern').val().split«(';').filter(p => p !== '')`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (bindConfig) — `src/gas-hub` L278:C6 -> L280:C8 (spans to L280)  `»chrome.storage.sync.set({«`
  - `CHROME_SYNC_STORAGE` (unknown) — `src/gas-hub` L317:C4 -> L331:C6 (spans to L331)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (60 raw steps → 9 distinct lines):
   1. L274 `ignorePattern: »$('#ignore-pattern').val().split(';').filter(p => p !== '')«`  · ELEMENT:member-element, RETURN:fallback-return
   2. L271 (→L275) `»    const config = {«`  · ELEMENT:object.setProperty
   3. L106 `»context.bindConfig = item.bindConfig || {}«;`  · ELEMENT:object.setProperty, ASSIGN:logical-left
   4. L278 (→L280) `»      chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   5. L314 `Object.assign(»context[bindName]«, {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
   6. L318 `[bindName]: »context[bindName]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
   7. L317 (→L331) `»    chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   8. L78 (→L108) `»      chrome.storage.sync.get([«`  · ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: sync, key: bindConfig, sender: src/gas-hub, receiver: src/gas-hub]
   9. L74 `»context = {}«;`  · ELEMENT:object.setProperty

---

## Flow #22 — CHROME_IDENTITY_TOKEN (identity.authToken)

- **Source**: `CHROME_IDENTITY_TOKEN` — `background/background` L38:C22 -> L38:C27  `googleApiKey: »token«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (googleApiKey) — `background/background` L37:C6 -> L39:C8 (spans to L39)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (10 raw steps → 4 distinct lines):
   1. L38 `googleApiKey: »token«`  · ASSIGN:identifier
   2. L37 (→L39) `»      chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   3. L40 `console.log(»`token updated: ${token}`«);`  · ASSIGN:identifier, ASSIGN:template-literal
   4. L41 `callback(»token«);`  · ASSIGN:identifier

---

## Flow #23 — JQUERY_ELEMENT_VAL (#bitbucket-email)

- **Source**: `JQUERY_ELEMENT_VAL` — `options/options` L135:C4 -> L135:C12  `»username«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `options/options` L298:C2 -> L309:C6 (spans to L309)  `»$.ajax({«`
  - `JQUERY_AJAX_DATA` (https://bitbucket.org/site/oauth2/access_token) — `options/options` L298:C2 -> L309:C6 (spans to L309)  `»$.ajax({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (7 raw steps → 5 distinct lines):
   1. L135 `»username«,`  · ASSIGN:identifier
   2. L133 (→L139) `»  return {«`  · ELEMENT:object.setProperty
   3. L163 `if (»param.username« === '') {`  · ASSIGN:binary-left
   4. L306 `username: »username«,`  · ASSIGN:identifier
   5. L298 (→L334) `»  $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #24 — JQUERY_ELEMENT_VAL (#bitbucket-password)

- **Source**: `JQUERY_ELEMENT_VAL` — `options/options` L136:C4 -> L136:C12  `»password«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `options/options` L298:C2 -> L309:C6 (spans to L309)  `»$.ajax({«`
  - `JQUERY_AJAX_DATA` (https://bitbucket.org/site/oauth2/access_token) — `options/options` L298:C2 -> L309:C6 (spans to L309)  `»$.ajax({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (8 raw steps → 5 distinct lines):
   1. L136 `»password«,`  · ASSIGN:identifier
   2. L133 (→L139) `»  return {«`  · ELEMENT:object.setProperty
   3. L166 `if (»param.password === '' && param.token === ''«) {`  · ASSIGN:binary-left, ASSIGN:logical-left
   4. L307 `password: »password«`  · ASSIGN:identifier
   5. L298 (→L334) `»  $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #25 — JQUERY_ELEMENT_VAL (#gitlab-email)

- **Source**: `JQUERY_ELEMENT_VAL` — `options/options` L153:C4 -> L153:C12  `»username«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `options/options` L343:C2 -> L355:C6 (spans to L355)  `»$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `options/options` L343:C2 -> L355:C6 (spans to L355)  `»$.ajax({«`
  - `CHROME_SYNC_STORAGE` (user) — `options/options` L209:C8 -> L216:C10 (spans to L216)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (11 raw steps → 6 distinct lines):
   1. L153 `»username«,`  · ASSIGN:identifier
   2. L151 (→L159) `»  return {«`  · ELEMENT:object.setProperty
   3. L163 `if (»param.username« === '') {`  · ASSIGN:binary-left
   4. L352 `username: »username«,`  · ASSIGN:identifier
   5. L343 (→L383) `»  $.ajax({«`  · ELEMENT:object.setProperty
   6. L209 (→L216) `»        chrome.storage.sync.set({«`  · ELEMENT:object.setProperty

---

## Flow #26 — JQUERY_ELEMENT_VAL (#gitlab-password)

- **Source**: `JQUERY_ELEMENT_VAL` — `options/options` L154:C4 -> L154:C12  `»password«,`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `options/options` L343:C2 -> L355:C6 (spans to L355)  `»$.ajax({«`
  - `JQUERY_AJAX_DATA` ([UNKNOWN URL]) — `options/options` L343:C2 -> L355:C6 (spans to L355)  `»$.ajax({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (11 raw steps → 5 distinct lines):
   1. L154 `»password«,`  · ASSIGN:identifier
   2. L151 (→L159) `»  return {«`  · ELEMENT:object.setProperty
   3. L166 `if (»param.password === '' && param.token === ''«) {`  · ASSIGN:binary-left, ASSIGN:logical-left
   4. L353 `password: »password«`  · ASSIGN:identifier
   5. L343 (→L383) `»  $.ajax({«`  · ELEMENT:object.setProperty

---

## Flow #27 — JQUERY_ELEMENT_VAL (#gitlab-accesstoken)

- **Source**: `JQUERY_ELEMENT_VAL` — `options/options` L156:C4 -> L156:C9  `»token«,`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (token) — `options/options` L209:C8 -> L216:C10 (spans to L216)  `»chrome.storage.sync.set({«`
  - `CHROME_SYNC_STORAGE` (token) — `options/options` L395:C6 -> L405:C8 (spans to L405)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (16 raw steps → 9 distinct lines):
   1. L156 `»token«,`  · ASSIGN:identifier
   2. L151 (→L159) `»  return {«`  · ELEMENT:object.setProperty
   3. L166 `if (»param.password === '' && param.token === ''«) {`  · ASSIGN:binary-left, ASSIGN:logical-right
   4. L203 `if (»param.token« !== '') return loginGitLabToken(param);`  · ASSIGN:binary-left
   5. L391 `private_token: »personalToken«`  · ASSIGN:identifier
   6. L389 (→L414) `»  $.getJSON(«`  · ELEMENT:object.setProperty
   7. L209 (→L216) `»        chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   8. L400 `token: »personalToken«`  · ASSIGN:identifier
   9. L395 (→L405) `»      chrome.storage.sync.set({«`  · ELEMENT:object.setProperty

---

## Flow #28 — JQUERY_ELEMENT_VAL (#gitlab-url)

- **Source**: `JQUERY_ELEMENT_VAL` — `options/options` L150:C19 -> L150:C65  `const baseUrl = (»$('#gitlab-url').val() || 'https://gitlab.com'«) + '/api/v4';`
- **Sink(s)**:
  - `JQUERY_SETTINGS_URL` — `options/options` L343:C2 -> L355:C6 (spans to L355)  `»$.ajax({«`  (url-control=PARTIAL)
  - `JQUERY_AJAX_URL` — `options/options` L343:C2 -> L355:C6 (spans to L355)  `»$.ajax({«`  (url-control=PARTIAL)
  - `CHROME_SYNC_STORAGE` (baseUrl) — `options/options` L209:C8 -> L216:C10 (spans to L216)  `»chrome.storage.sync.set({«`
  - `CHROME_SYNC_STORAGE` (baseUrl) — `options/options` L363:C10 -> L373:C12 (spans to L373)  `»chrome.storage.sync.set({«`
  - `CHROME_SYNC_STORAGE` (baseUrl) — `options/options` L395:C6 -> L405:C8 (spans to L405)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (29 raw steps → 13 distinct lines):
   1. L150 `const baseUrl = (»$('#gitlab-url').val() || 'https://gitlab.com'«) + '/api/v4';`  · ASSIGN:logical-left, ASSIGN:binary-left
   2. L158 `»baseUrl«`  · ASSIGN:identifier
   3. L151 (→L159) `»  return {«`  · ELEMENT:object.setProperty
   4. L390 `»`${baseUrl}/user`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
   5. L342 `const domain = »baseUrl.replace('/api/v4', '')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L344 `url: »`${domain}/oauth/token`«,`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L343 (→L383) `»  $.ajax({«`  · ELEMENT:object.setProperty
   8. L209 (→L216) `»        chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   9. L358 `»`${baseUrl}/user`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  10. L370 `baseUrl: »baseUrl«`  · ASSIGN:identifier
  11. L363 (→L373) `»          chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
  12. L402 `baseUrl: »baseUrl«`  · ASSIGN:identifier
  13. L395 (→L405) `»      chrome.storage.sync.set({«`  · ELEMENT:object.setProperty

---

## Flow #29 — JQUERY_ELEMENT_VAL (From storage.sync.set('user') in options/options)

- **Source**: `JQUERY_ELEMENT_VAL` — `options/options` L153:C4 -> L153:C12  `»username«,`
- **Sink(s)**:
  - `JQUERY_ELEMENT_TEXT_SET` (#login-user) — `options/options` L77:C6 -> L77:C47  `»$('#login-user').text(`${user}${domain}`)«.attr('href', userLink);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (41 raw steps → 14 distinct lines):
   1. L153 `»username«,`  · ASSIGN:identifier
   2. L151 (→L159) `»  return {«`  · ELEMENT:object.setProperty
   3. L163 `if (»param.username« === '') {`  · ASSIGN:binary-left
   4. L352 `username: »username«,`  · ASSIGN:identifier
   5. L343 (→L383) `»  $.ajax({«`  · ELEMENT:object.setProperty
   6. L209 (→L216) `»        chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   7. L430 (→L434) `»    chrome.storage.sync.get(['scm', 'token', 'user', 'baseUrl', 'googleApiKey'], (item) => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: user, sender: options/options, receiver: options/options]
   8. L40 `userLink = »`https://bitbucket.org/${user}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
   9. L41 `tokenLink = »`https://bitbucket.org/account/user/${user}/api`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  10. L61 `userLink = »`https://github.com/${item.user}`«;`  · ASSIGN:template-literal
  11. L77 `$('#login-user').text(»`${user}${domain}`).attr('href', userLink«);`  · ASSIGN:identifier, ASSIGN:template-literal
  12. L56 `userLink = »`https://gitlab.com/${user}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  13. L51 `userLink = »`https://${match[1]}/${user}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  14. L71 `userLink = »`https://${match[1]}/${item.user}`«;`  · ASSIGN:template-literal

---

## Flow #30 — JQUERY_ELEMENT_VAL (From storage.sync.set('baseUrl') in options/options)  ·  3× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `options/options` L150:C19 -> L150:C65  `const baseUrl = (»$('#gitlab-url').val() || 'https://gitlab.com'«) + '/api/v4';`
- **Sink(s)**:
  - `JQUERY_ELEMENT_TEXT_SET` (#login-user) — `options/options` L77:C6 -> L77:C47  `»$('#login-user').text(`${user}${domain}`)«.attr('href', userLink);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (106 raw steps → 28 distinct lines):
   1. L150 `const baseUrl = (»$('#gitlab-url').val() || 'https://gitlab.com'«) + '/api/v4';`  · ASSIGN:logical-left, ASSIGN:binary-left
   2. L158 `»baseUrl«`  · ASSIGN:identifier
   3. L151 (→L159) `»  return {«`  · ELEMENT:object.setProperty
   4. L390 `»`${baseUrl}/user`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
   5. L342 `const domain = »baseUrl.replace('/api/v4', '')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L344 `url: »`${domain}/oauth/token`«,`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L343 (→L383) `»  $.ajax({«`  · ELEMENT:object.setProperty
   8. L209 (→L216) `»        chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
   9. L358 `»`${baseUrl}/user`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  10. L370 `baseUrl: »baseUrl«`  · ASSIGN:identifier
  11. L363 (→L373) `»          chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
  12. L402 `baseUrl: »baseUrl«`  · ASSIGN:identifier
  13. L395 (→L405) `»      chrome.storage.sync.set({«`  · ELEMENT:object.setProperty
  14. L430 (→L434) `»    chrome.storage.sync.get(['scm', 'token', 'user', 'baseUrl', 'googleApiKey'], (item) => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: baseUrl, sender: options/options, receiver: options/options]
  15. L43 `if (»item.baseUrl« !== 'https://gitlab.com/api/v4') {`  · ASSIGN:binary-left
  16. L44 `let match = »item.baseUrl.match(/:\/\/(.*)\/api\/v4/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  17. L45 `if (»!match || !match[1]«) {`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  18. L50 `domain = »`@${match[1].match(/\w+\.\w+(?=\/|$)/)}`«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:template-literal
  19. L63 `if (»item.baseUrl« !== 'https://api.github.com') {`  · ASSIGN:binary-left
  20. L51 `userLink = »`https://${match[1]}/${user}`«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  21. L64 `let match = »item.baseUrl.match(/:\/\/(.*)\/api\/v3/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  22. L77 `$('#login-user').text(»`${user}${domain}`).attr('href', userLink«);`  · ASSIGN:identifier, ASSIGN:template-literal
  23. L52 `tokenLink = »`https://${match[1]}/profile/personal_access_tokens`«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  24. L65 `if (»!match || !match[1]«) {`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  25. L78 `$('#token').attr('href', »tokenLink«);`  · ASSIGN:identifier
  26. L70 `domain = »`@${match[1].match(/\w+\.\w+(?=\/|$)/)}`«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:template-literal
  27. L71 `userLink = »`https://${match[1]}/${item.user}`«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  28. L72 `tokenLink = »`https://${match[1]}/settings/tokens`«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal

---
