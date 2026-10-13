# ExPAgent Static Verification — pkiaikegaefpandhkggggniifmgdkpnd v2.0.5

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 1
- Coverage: node=0.362, scope=0.386
- Flow types: {'PRIVILEGE_ESCALATION': 4, 'STORAGE_POSOING': 1}  |  Severities: {'LOW': 5}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / LOW, confidence 0.60)

- **Source**: `ELEMENT_OUTER_HTML` in `lesson-page` [CS_1] @ L377:C20 -> L377:C77
- **Sink**: `CHROME_LOCAL_STORAGE` in `service-worker` [BG_1] @ L24:C4 -> L36:C6
- **Bridge**: message `runtime.single.sender.message[lesson-page->service-worker]`
- **Severity evidence**: ['*://estore.nism.ac.in/*/?sfwd-lessons=*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**1. Who controls the source?**
The source anchor resolves to `lesson-page.js` L377:
```js
console.log(`This is an input which is available: ${input.outerHTML}`);
```
`input.outerHTML` is page DOM content and is attacker-controllable on the matched `estore.nism.ac.in` pages. That part is genuine WEB_CONTENT/DOM input.

**2. Where does the tainted value actually flow?**
The only propagation from that value is the adjacent L378:
```js
logEvent({event: `This is an input which is available: ${input.outerHTML}`});
```
`logEvent` (lesson-page.js L69–86) sends:
```js
chrome.runtime.sendMessage({ message: LOG_EVENT, data: { ...createEventLog(data), activeLesson: ... } });
```
So the tainted string crosses into the service worker inside a **LOG_EVENT** message.

**3. What does the service worker do with LOG_EVENT?**
`service-worker.js` L715–718:
```js
if (request.message === LOG_EVENT) {
  logEvent(request.data);   // service-worker's own logEvent
  callback();
  return true;
}
```
The service-worker `logEvent` (L496–523) does only:
- `console.log({log: data})`
- `chrome.scripting.executeScript(...)` whose injected function does `w.postMessage(JSON.stringify(...), "*

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
