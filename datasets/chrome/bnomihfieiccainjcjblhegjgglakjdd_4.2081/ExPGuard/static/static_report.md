# ExPAgent Static Verification — bnomihfieiccainjcjblhegjgglakjdd v4.2081

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 4  |  Verified: 4
- Coverage: node=0.967, scope=0.997
- Flow types: {'STORAGE_POSOING': 3, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 4}

**Assessment:** Verified 4 flow(s): 4 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 4 flagged triggerable for dynamic testing.

---

## Flow #3 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `js&css/extension/init` [CS_1] @ L167:C24 -> L167:C31
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `background` [BG_1] @ L354:C5 -> L354:C32
- **Bridge**: message `runtime.single.sender.message[js&css/extension/init->background]`
- **Severity evidence**: ['https://www.youtube.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Deterministic harness first
- Source anchor resolves to `js&css/extension/init.js` L167 `message = JSON.parse(message);`, with the real taint origin at L162 `var message = provider.textContent;` (element `#it-messages-from-youtube`). Harness reachability = `PAGE_TO_CONTENT_SCRIPT` (page can mutate shared DOM values / forge CustomEvent fields — not authentication).
- Sink anchor resolves to `background.js` L354 `chrome.windows.create(data);`; classification `SECURITY_RELEVANT`.
- Content-script surface is `https://www.youtube.com/*`, `allFrames:true`, `runAt:document_start`; no `externally_connectable`; no authenticated extension allowlist; `configuredEndpointGate: null`.

## Four-part decision ledger
**(a) Who controls the source.** `#it-messages-from-youtube` is created by the extension's *main-world* web-accessible script (`js&css/web-accessible/core.js` L139-149), so it lives in the **page DOM**. `init.js` L158-162 (`document.addEventListener('it-message-from-youtube', …)` → `provider.textContent`) reads it from the isolated content-script world. Because the element and the `it-message-from-youtube` event are on the shared page document, any script executing on the YouTube or

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `js&css/extension/init` [CS_1] @ L167:C24 -> L167:C31
- **Sink**: `CHROME_LOCAL_STORAGE` in `js&css/extension/init` [CS_1] @ L276:C4 -> L276:C62
- **Severity evidence**: ['https://www.youtube.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision ledger

**(a) Who controls the source?**
`js&css/extension/init.js` L158–162 (content script, `world: ISOLATED`, matches `https://www.youtube.com/*`, `allFrames: true`, `runAt: document_start`):

```js
document.addEventListener('it-message-from-youtube', function () {
    var provider = document.querySelector('#it-messages-from-youtube');
    if (provider) { var message = provider.textContent; ... }
```

The element `#it-messages-from-youtube` is created by the page-world script `js&css/web-accessible/core.js:139–149` (`document.documentElement.appendChild(this.element)`) — i.e. a normal **DOM node inside the youtube.com page**. Any script executing in that page (YouTube’s own code, third-party/malicious scripts, or an attacker via XSS) can set `textContent` on that node and dispatch the `it-message-from-youtube` `CustomEvent`. The content script performs **no origin/authenticity check** — a same-document `CustomEvent` has no unforgeable sender identity. Provenance per the record is `CONTENT_SCRIPT` (web taint), and the harness reachability is `PAGE_TO_CONTENT_SCRIPT` (“a page can forge … CustomEvent fields and mutate shared DOM values”). Source is attacker-controllable

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `js&css/extension/init` [CS_1] @ L167:C24 -> L167:C31
- **Sink**: `CHROME_LOCAL_STORAGE` in `js&css/extension/init` [CS_1] @ L271:C3 -> L273:C5
- **Severity evidence**: ['https://www.youtube.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1 (`web-content-storage-write`, STORAGE_POSOING)

**(a) Who controls the source.** `js&css/extension/init.js` L158-167:
```js
document.addEventListener('it-message-from-youtube', function () {
    var provider = document.querySelector('#it-messages-from-youtube');
    if (provider) {
        var message = provider.textContent;      // L162 ← actual source
        document.dispatchEvent(new CustomEvent('it-message-from-youtube--readed'));
        try { message = JSON.parse(message); }   // L167 (reported anchor)
```
The element `#it-messages-from-youtube` is created by the **page-world** web-accessible script (`js&css/web-accessible/core.js` L139-149) and populated by that same page-context script (L160/L603) which then dispatches the `it-message-from-youtube` DOM event. Because this element and event live in the shared page DOM, **any script executing in the youtube.com main world** — YouTube's own code, an injected/XSS payload, or a cooperating page script — can set `el.textContent` to arbitrary JSON and dispatch the event. There is no nonce, origin check, or sender authentication anywhere in the listener. Source = webpage DOM (attacker-controllable), match

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `js&css/extension/init` [CS_1] @ L167:C24 -> L167:C31
- **Sink**: `CHROME_LOCAL_STORAGE` in `js&css/extension/init` [CS_1] @ L700:C2 -> L702:C4
- **Severity evidence**: ['https://www.youtube.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the report plus targeted source inspection. Let me finalize the ledger.

## Verification

**(a) Who controls the source — attacker-controllable?**
The source value is read at `init.js:162` `var message = provider.textContent;` where `provider = document.querySelector('#it-messages-from-youtube')`. That element is created in the **page (MAIN) world** by the web-accessible script (`js&css/web-accessible/core.js:142` `this.element.id = 'it-messages-from-youtube'`), and the trigger is `document.addEventListener('it-message-from-youtube', …)` (`init.js:158`). The element lives in the shared DOM and the event is dispatched on the page `document`, so any script running on the matched page can:
- set `#it-messages-from-youtube.textContent` to arbitrary JSON, and
- dispatch `new CustomEvent('it-message-from-youtube')`.

Harness confirms `sourceReachability.kind = PAGE_TO_CONTENT_SCRIPT` with the browser fact that "a page can … mutate shared DOM values" and that action/type fields are not authentication. Provenance = CONTENT_SCRIPT, matches `https://www.youtube.com/*` (wildcard). ✅ attacker-controllable (requires script execution on a youtube.com page — page/XSS).

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
