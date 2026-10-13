# ExPAgent Static Verification — ao3-advanced-marker-2@leehsuus.com v13.7

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=0.959, scope=1
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'HIGH': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `content` [CS_1] @ L2289:C59 -> L2289:C89
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L2532:C16 -> L2532:C70
- **Bridge**: storage `STORAGE_FLOW[area: local, key: ao3_hl_null, sender: content, receiver: content]`
- **Severity evidence**: ['*://*.archiveofourown.org/tags/*']
- **Source report Flow ID**: `18`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

### (a) Who controls the source
`authorElement = document.querySelector('a[rel="author"]')`, then the tainted span is `authorElement.textContent.trim()`.

This is shared page DOM read from an ISOLATED-world content script. The AO3 page (or script running in the page world, e.g. after an XSS on `archiveofourown.org`) can mutate that element’s text before the content script reads it. The source is therefore genuine WEB_CONTENT/DOM taint, not extension-user input. The harness explicitly notes that page scripts can mutate shared DOM values; there is no browser-authenticated IPC boundary here.

### (b) Source-to-sink path
The report propagation is corroborated by the raw source:

- `content.js:2289` — `workAuthor = authorElement.textContent.trim()` (tainted)
- `content.js:2325` — passed as `{ workTitle, workAuthor }` to `saveHighlightToStorage(...)`
- `content.js:2479-2480` — `if (metadata.workAuthor) workData.workAuthor = metadata.workAuthor;`
- `content.js:2489-2490` — `storage.local.set({ [storageKey]: workData }, resolve);` where `storageKey = \`ao3_hl_${workId}\``

The later `removeHighlightFromStorage` set at `content.js:2532` is a downstream storage read/mod

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
