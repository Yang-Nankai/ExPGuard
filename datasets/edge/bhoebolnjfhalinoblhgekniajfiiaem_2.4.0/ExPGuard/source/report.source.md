# Source-level Taint Flow — bhoebolnjfhalinoblhgekniajfiiaem 2.4.0

- Source type: CRX
- Files with issues: 7 / 7
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 22 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_VALUE (event(contextmenu))

- **Source**: `ELEMENT_VALUE` — `popup` L285:C0 -> L356:C2 (spans to L356)  `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `popup` L70:C2 -> L70:C101  `»chrome.windows.create({url:gURLdle + palabra, type:"popup", width:600, height:420, state:"normal"})«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `popup` L287:C4 -> L287:C30  `»fetch(request.URLtraeHTML)«.then(function(response) {`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (31 raw steps → 5 distinct lines):
   1. L285 (→L356) `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->popup]`
   2. L69 `palabra = »encodeURIComponent(palabra)«;`  · ASSIGN:identifier, RETURN:encodeURIComponent
   3. L70 `»chrome.windows.create({url:gURLdle + palabra, type:"popup", width:600, height:420, state:"normal"})«;`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty
   4. L353 `if (»gmanifest_version >= 3 && (request.palabra_a_buscar || request.URL_a_buscar || request.top_palabra_para_bocadillo || request.top_URL_para_bocadillo || request.top_oculta_bocadillo || request.diferido_bocadillo_no_carga_URL || request.diferido_cancelado || request.inyecta_js_frameid || request.crea_menu || request.elimina_menu)«) {`  · ASSIGN:logical-left, ASSIGN:logical-right
   5. L326 `»chrome.tabs.sendMessage(sender.tab.id, {palabra_para_bocadillo:request.top_palabra_para_bocadillo})«;`  · ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_VALUE (idcuadrobuscar)

- **Source**: `ELEMENT_VALUE` — `buscapalabra` L64:C12 -> L64:C30  `if (»input.value.length« > 0 && input.value.indexOf("#&#") == -1) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `buscapalabra` L66:C10 -> L66:C63  `»fetch("https://dle.rae.es/srv/keys?q=" + input.value)«.then(function(response) {`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (76 raw steps → 15 distinct lines):
   1. L64 `if (»input.value.length > 0 && input.value.indexOf("#&#") == -1«) {`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   2. L66 `fetch("https://dle.rae.es/srv/keys?q=" + »input.value«).then(function(response) {`  · ASSIGN:binary-right
   3. L79 `input.value = »input.value.substring(input.value.indexOf("#&#") + 3)«;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:identifier
   4. L29 `const »input = document.getElementById("idcuadrobuscar")«;`  · ELEMENT:object.setProperty
   5. L93 `if (»event.key === "Escape" && !es_firefox && !input.value«) {`  · ASSIGN:unary, ASSIGN:logical-right
   6. L109 `if (»!es_android && document.activeElement != input«) {`  · ASSIGN:binary-right, ASSIGN:logical-right
   7. L112 `if (»input.value.trim()«) {`  · ELEMENT:member-element, RETURN:fallback-return
   8. L113 `fcargapalabra(»input.value.trim()«);`  · ELEMENT:member-element, RETURN:fallback-return
   9. L75 _(in `content`)_ `if (»texto.trim() && isNaN(texto) && texto != "," && texto != "." && texto != ";" && texto != ":"«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:isNaN, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-left
  10. L76 _(in `content`)_ `var palabra = »texto.trim().toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  11. L84 _(in `content`)_ `»chrome.runtime.sendMessage({palabra_a_buscar:palabra})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  12. L71 `»      fAlimenta_DataList(my«Json, input.value);`  · ASSIGN:identifier, RETURN:encodeURIComponent
  13. L72 _(in `content`)_ `fmuestrabocadillo_URL(gURLdle + »palabra«);`  · ASSIGN:identifier, ASSIGN:binary-right
  14. L43 (→L58) _(in `content`)_ `chrome.runtime.sendMessage({URLtraeHTML:»url}, function(response) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L81 _(in `content`)_ `»chrome.runtime.sendMessage({top_palabra_para_bocadillo:palabra})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_VALUE (tesperatoque)

- **Source**: `ELEMENT_VALUE` — `configurar` L25:C4 -> L27:C6 (spans to L27)  `»chrome.storage.local.set({sDobleclic:check1.checked, sTesperatoque:vtespera.value, sTecla:document.formTeclas.tecla.valu …⟨tainted span: 529 chars⟩… :document.formResulContextual.resulContextual.value, sLabResTeclado:document.formLabResulTeclado.labresulTeclado.value, «`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (sTesperatoque) — `configurar` L25:C4 -> L27:C6 (spans to L27)  `»chrome.storage.local.set({sDobleclic:check1.checked, sTesperatoque:vtespera.value, sTecla:document.formTeclas.tecla.valu …⟨tainted span: 529 chars⟩… :document.formResulContextual.resulContextual.value, sLabResTeclado:document.formLabResulTeclado.labresulTeclado.value, «`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L25 (→L27) `»    chrome.storage.local.set({sDobleclic:check1.checked, sTesperatoque:vtespera.value, sTecla:document.formTeclas.tecla. …⟨tainted span: 533 chars⟩… :document.formResulContextual.resulContextual.value, sLabResTeclado:document.formLabResulTeclado.labresulTeclado.value, «`  · ELEMENT:object.setProperty

---
