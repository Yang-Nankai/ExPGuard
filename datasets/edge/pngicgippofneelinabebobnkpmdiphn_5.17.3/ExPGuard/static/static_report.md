# ExPAgent Static Verification — pngicgippofneelinabebobnkpmdiphn v5.17.3

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 19  |  Verified: 4
- Coverage: node=0.238, scope=0.26
- Flow types: {'STORAGE_POSOING': 7, 'PRIVILEGE_ESCALATION': 2, 'REQUEST_FORGERY': 10}  |  Severities: {'CRITICAL': 19}

**Assessment:** Verified 4 flow(s): 3 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/main` [CS_1] @ L262:C7 -> L262:C15
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/main` [CS_1] @ L203:C2 -> L205:C4
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is a `TARGET_CUSTOM_EVENT`: `document.addEventListener('gwd_extension', function (e) { ... })` at `js/main.js:261`. This is a shared-DOM `CustomEvent` listener. In Chrome's ISOLATED world, a webpage on a matching URL can dispatch `new CustomEvent('gwd_extension', { detail: {...} })` on `document`, and the content-script listener will receive it. Every `e.detail.*` field (`evt_from`, `type`, `info`, `key`, `value`, etc.) is therefore **page/attacker-controlled**. The harness confirms this as a `PAGE_TO_CONTENT_SCRIPT` bridge.

**(b) Exact source-to-sink data path**
Confirmed from source:

- `js/main.js:261` — `document.addEventListener('gwd_extension', ...)`
- `js/main.js:262` — `if (!e.detail.evt_from) return` (attacker supplies truthy `evt_from`)
- `js/main.js:265` — `if (e.detail.evt_from.indexOf('bijiago') > -1) return` (attacker just avoids the substring `bijiago`)
- `js/main.js:266` — `switch (e.detail.type)`
- `js/main.js:361-363` — `case "setStoreRate": setStoreRate(e.detail.info)`
- `js/main.js:202-205` — `function setStoreRate(currency) { chrome.storage.local.set({ 'currency': currency }) }`

The tainted s

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_COOKIE` in `js/main` [CS_1] @ L233:C16 -> L233:C37
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/main` [CS_1] @ L246:C4 -> L248:C6
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: DOCUMENT_COOKIE → chrome.storage.local (STORAGE_POSOING)

### Decision ledger

**(a) Who controls the source — ATTACKER.**  
`js/main.js` is a content script running on `http://*/*` and `https://*/*` (with the listed exclusions). At L233 it reads `document.cookie`. A page can set its own first-party cookies via `document.cookie = 'plt_user_email=...'`, and the content script's isolated world shares the page's `document.cookie`. So the attacker controls the cookie values on any non-excluded origin.

**(b) Source-to-sink path — UNBROKEN.**  
The report's propagation is confirmed by raw source:

- L231: `function getCookie()` is defined.
- L454-456: `setTimeout(function () { getCookie() }, 100)` — it actually runs on every content-script load.
- L233: `var cookies = document.cookie.split(';');`
- L235/L236: cookie `plt_user_email` → `info['email'] = decodeURIComponent(cookies[i].split('=')[1]);`
- L238/L239: cookie `plt_user_nickname` → `info['name'] = ...` (DOM element text).
- L241/L242: cookie `plt_user_id` → `info['id'] = decodeURIComponent(...)`.
- L245-248: `if (info['email'] && info['name']) chrome.storage.local.set({ 'user_info': JSON.stringify(info) })`.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #15 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/main` [CS_1] @ L262:C7 -> L262:C15
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/background` [BG_1] @ L103:C6 -> L105:C8
- **Bridge**: storage `STORAGE_FLOW[area: local, key: browser_setinfo, sender: js/main, receiver: js/background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `8`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I inspected the raw source to confirm the bridge and the sink.

## Decision ledger

**(a) Who controls the source?**
The page controls it. `js/main.js` registers:

```js
document.addEventListener('gwd_extension', function (e) {
  if (!e.detail.evt_from) return
  if (e.detail.evt_from.indexOf('bijiago') > -1) return
  switch (e.detail.type) {
    ...
    case "setStorage":
      setStorages(e.detail.key, e.detail.value)
      break
```

A page can dispatch `CustomEvent('gwd_extension', { detail: { evt_from: 'x', type: 'setStorage', key: ..., value: ... }})`. The two guards (`evt_from` present, not containing `bijiago`) are attacker-satisfiable and are not authentication. The content script runs on `http://*/*` / `https://*/*` (minus exclusions), so an arbitrary attacker origin is in scope.

**(b) Source-to-sink path**
`e.detail.key` / `e.detail.value` → `setStorages(k, v)` → `d.browser_setinfo[k] = v` → `chrome.storage.local.set({'browser_setinfo': obj})` (js/main.js L208–218). The report additionally records the storage HOP: background reads `browser_setinfo` at L87 and re-writes it at L103–105, so the poisoned value persists and is re-materialized by the privileged background cont

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #16 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/main` [CS_1] @ L262:C7 -> L262:C15
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/background` [BG_1] @ L433:C14 -> L433:C44
- **Bridge**: storage `STORAGE_FLOW[area: local, key: currency, sender: js/main, receiver: js/background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `10`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #10 (STORAGE_POSOING)

### Four-part ledger

**(a) Who controls the source?**
The source is a page-dispatched `CustomEvent('gwd_extension', …)` handled by the content script in `js/main.js`:

```js
document.addEventListener('gwd_extension', function (e) {
  if (!e.detail.evt_from) return
  if (e.detail.evt_from.indexOf('bijiago') > -1) return
  switch (e.detail.type) { … }
```

A web page on a matched origin can dispatch this event on `document` and control `e.detail` (`type`, `info`, `key`, `value`, etc.). The `evt_from` guard is attacker-satisfiable. So the source is genuinely attacker-controllable. ✅

**(b) The exact source-to-sink path.**
The claimed bridge is a storage hop:

- Content script, `case "setStoreRate": setStoreRate(e.detail.info)` → `chrome.storage.local.set({ currency: currency })` (writes key **`currency`**).
- ExPGuard then connects this to background `js/background.js:429`:
  ```js
  chrome.storage.local.get(EmailCache, function(data) {
    if (data[EmailCache]) {
      chrome.storage.local.get("favorData", function(data2) {
        if (!data2.favorData) {
          chrome.storage.local.set(data)   // L433 sink
  ```
- The propagation st

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
