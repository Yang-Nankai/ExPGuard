# ExPAgent Static Verification — gcoekeoenehjmndhkdnoomdjeaclkhbe v0.0.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.912, scope=1
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (REQUEST_FORGERY / MEDIUM, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `scripts/classroom/content` [CS_1] @ L31:C17 -> L31:C29
- **Sink**: `FETCH_BODY` in `scripts/service-worker` [BG_1] @ L91:C9 -> L91:C96
- **Bridge**: message `runtime.single.sender.message[scripts/classroom/content->scripts/service-worker]`
- **Severity evidence**: ['https://classroom.google.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification reasoning

**Decision ledger**

(a) Who controls the source: a `window` message event in the content script (`scripts/classroom/content.js`). The listener is registered in `openNearpodModal()` and only checks attacker-supplied message fields:
```js
if (ev.data && ev.data.type === 'nearpodMessage' && ev.data.action_type === actionTypes.MY_LIBRARY_EXTENSION_LESSON_LAUNCHED_SUCCESS) {
```
There is **no `ev.origin`/`ev.source` check**, and the gate values are constants an attacker can learn (`'nearpodMessage'`, `'MY_LIBRARY/EXTENSION_LESSON_LAUNCHED_SUCCESS'`). The harness confirms this is a PAGE_TO_CONTENT_SCRIPT bridge where message fields are not authentication. The page (`https://classroom.google.com/*`) can forge the message (XSS prerequisite; also the embedded `nearpod.com` iframe is another unauthenticated sender). Source is untrusted/attacker-controllable.

(b) Source-to-sink path (from primary evidence + confirmed raw source):
- `scripts/classroom/content.js` L31–38: forged `ev.data.payload.assignmentTitle` / `ev.data.payload.assignmentMaterial` are sent via `chrome.runtime.sendMessage({ type: messageTypes.CREATE_ASSIGNMENT, payload: {...} })`.
- `scripts/servi

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
