# Source-level Taint Flow — illemhbijpiebjfilfmgebahaakajkpe 7.4.3.70

- Source type: CRX
- Files with issues: 1 / 2
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `background` L369:C14 -> L369:C15  `switch (»a«.channel) {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background` L324:C6 -> L324:C22  `»a.postMessage(e)«;`
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background` L327:C8 -> L327:C24  `»a.postMessage(e)«;`
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background` L361:C22 -> L361:C38  `a.name === e && »a.postMessage(t)«;`
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background` L344:C23 -> L344:C39  `r !== t && »r.postMessage(e)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (30 raw steps → 12 distinct lines):
   1. L369 `switch (»a.channel«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L372 `w(»a«, t);`  · ASSIGN:identifier
   3. L323 `if (»e.type === "REQ_FULL_STATE" && a.sender?.origin?.includes("web.whatsapp.com")«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   4. L324 `a.postMessage(»e«);`  · ASSIGN:identifier
   5. L327 `a.postMessage(»e«);`  · ASSIGN:identifier
   6. L376 `O(»a«, t);`  · ASSIGN:identifier
   7. L334 `const { »model: a, sender: o } = e«;`  · ASSIGN:identifier, ELEMENT:destructure-property[model], ELEMENT:destructure-property[sender]
   8. L335 `switch (»a«) {`  · ASSIGN:identifier
   9. L338 `g("WPP", »e«);`  · ASSIGN:identifier
  10. L361 `a.name === »e && a.postMessage(t«);`  · ASSIGN:identifier, ASSIGN:binary-right
  11. L344 `r !== t && r.postMessage(»e«);`  · ASSIGN:identifier
  12. L352 `o && g(»o, e«);`  · ASSIGN:identifier

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L305:C12 -> L305:C13  `switch (»e«.action) {`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L299:C6 -> L301:C8 (spans to L301)  `»chrome.tabs.create({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (21 raw steps → 8 distinct lines):
   1. L305 `switch (»e.action«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L311 `f(»e.bearer«);`  · ASSIGN:identifier, ELEMENT:member-element
   3. L314 `f(»e.bearer_token), e.close_painel && t.tab && t.tab.id« && setTimeout(() => {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   4. L300 `url: »`https://web.whatsapp.com/?bearer_token=${e}`«`  · ASSIGN:identifier, ASSIGN:template-literal
   5. L299 (→L301) `»      chrome.tabs.create({«`  · ELEMENT:object.setProperty
   6. L293 `const a = t[0], o = a.id, r = »`https://web.whatsapp.com/?bearer_token=${e}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L296 `url: »r«`  · ASSIGN:identifier
   8. L294 (→L297) `»      chrome.windows.update(a.windowId, { focused: !0 }), chrome.tabs.update(o, {«`  · ELEMENT:object.setProperty

---

## Flow #3 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `background` L228:C20 -> L228:C34  `agendamentos: »e.agendamentos« || [],`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (agendamentos) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (agendamentosNaoDisparados) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (sendAfterWhatsAppOpens) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (notifications) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (userTabs) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (contatos) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (notes) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (agendaMsg) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (perfil) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (categoria) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (initSystem) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (backupAutomatico) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (crm) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (fluxo) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (fluxoFiles) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (relatorio) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (encomendas) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (autoatendimento) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (FollowUp) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (webhook) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (IA) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (status) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (pinChat) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (atendimento) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (whatsApi) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (replacementStorage) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (initDate) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (modalLead) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (agrupamentos) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (groupments) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (guardaMsg) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (medias) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (respostasRapidas) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (respostasRapidasAcao) — `background` L227:C4 -> L266:C6 (spans to L266)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (204 raw steps → 35 distinct lines):
   1. L228 `agendamentos: »e.agendamentos || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
   2. L227 (→L266) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   3. L229 `agendamentosNaoDisparados: »e.agendamentosNaoDisparados || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
   4. L230 `sendAfterWhatsAppOpens: »e.sendAfterWhatsAppOpens || !1«,`  · ELEMENT:member-element, ASSIGN:logical-left
   5. L231 `notifications: »e.notifications || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
   6. L232 `userTabs: »e.userTabs || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
   7. L233 `contatos: »e.contatos || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
   8. L234 `notes: »e.notes || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
   9. L235 `agendaMsg: »e.agendaMsg || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  10. L236 `perfil: »e.perfil || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  11. L237 `categoria: »e.categoria || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  12. L238 `initSystem: »e.initSystem || !1«,`  · ELEMENT:member-element, ASSIGN:logical-left
  13. L239 `backupAutomatico: »e.backupAutomatico || I«,`  · ELEMENT:member-element, ASSIGN:logical-left
  14. L240 `crm: »e.crm || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  15. L241 `fluxo: »e.fluxo || { workflows: [], currentWorkflow: null }«,`  · ELEMENT:member-element, ASSIGN:logical-left
  16. L242 `fluxoFiles: »e.fluxoFiles || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  17. L243 `relatorio: »e.relatorio || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  18. L244 `encomendas: »e.encomendas || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  19. L245 `autoatendimento: »e.autoatendimento || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  20. L246 `FollowUp: »e.FollowUp || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  21. L247 `webhook: »e.webhook || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  22. L248 `IA: »e.IA || { activeIA: "Gemini", keyGemini: "", keyGPT: "", keyGroq: "", instance: null }«,`  · ELEMENT:member-element, ASSIGN:logical-left
  23. L249 `status: »e.status || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  24. L250 `pinChat: »e.pinChat || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  25. L251 `atendimento: »e.atendimento || void 0«,`  · ELEMENT:member-element, ASSIGN:logical-left
  26. L252 `whatsApi: »e.whatsApi || { active: !1, token: "", userID: "" }«,`  · ELEMENT:member-element, ASSIGN:logical-left
  27. L253 `replacementStorage: »e.replacementStorage || { items: [], isEnabled: !0 }«,`  · ELEMENT:member-element, ASSIGN:logical-left
  28. L254 `initDate: »e.initDate || !1«,`  · ELEMENT:member-element, ASSIGN:logical-left
  29. L256 `modalLead: »e.modalLead || {}«,`  · ELEMENT:member-element, ASSIGN:logical-left
  30. L258 `agrupamentos: »e.agrupamentos || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  31. L259 `groupments: »e.groupments || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  32. L261 `guardaMsg: »e.guardaMsg || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  33. L262 `medias: »e.medias || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  34. L264 `respostasRapidas: »e.respostasRapidas || []«,`  · ELEMENT:member-element, ASSIGN:logical-left
  35. L265 `respostasRapidasAcao: »e.respostasRapidasAcao || []«`  · ELEMENT:member-element, ASSIGN:logical-left

---
