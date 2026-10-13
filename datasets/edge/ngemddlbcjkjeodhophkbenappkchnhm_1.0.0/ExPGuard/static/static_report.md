# ExPAgent Static Verification — ngemddlbcjkjeodhophkbenappkchnhm v1.0.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.127, scope=0.166
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L155:C34 -> L155:C45
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L158:C12 -> L160:C14
- **Severity evidence**: ['https://twitter.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — STORAGE_POSOING

### 1. Who controls the source
The source is `e.data` inside a `window.addEventListener('message', …)` listener in the content script (`content.js` L151–163). A page running on `twitter.com` / `mobile.twitter.com` can call `window.postMessage({type:'tntConfigChange', changes:{…}}, '*')` to itself. The content script runs in the same page context, so it receives that message. Therefore the **source (`e.data.type`, `e.data.changes`) is genuinely attacker-controllable** by the page.

The harness warnings are satisfied by inspection: the anchor at L155 is `'tntConfigChange' === e.data.type` and the listener is confirmed by reading surrounding code.

### 2. Source-to-sink path (unbroken)
Confirmed propagation from the report and raw source:

```
L151 window.addEventListener('message', function(e) {
L154   e.source === window &&                      // bypassable guard
L155     'tntConfigChange' === e.data.type &&      // attacker-chosen field
L156     e.data.changes &&                          // attacker-supplied payload
L157     (chrome.storage.onChanged.removeListener(i),
L158       chrome.storage.local.set(e.data.changes, function () { …

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
