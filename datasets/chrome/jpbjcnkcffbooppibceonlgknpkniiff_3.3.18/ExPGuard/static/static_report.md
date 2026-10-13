# ExPAgent Static Verification — jpbjcnkcffbooppibceonlgknpkniiff v3.3.18

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.708, scope=0.804
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_URL` in `isolated` [CS_1] @ L1:C26919 -> L1:C26935
- **Sink**: `CHROME_SESSION_STORAGE` in `isolated` [CS_1] @ L1:C70792 -> L1:C70821
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've inspected the raw source to verify the actual data flow, since the report's propagation span is a single collapsed 43,850-char region and I needed to confirm what actually lands in `chrome.storage.session.set`.

## Decision ledger

**(a) Who controls the source?**
The source is `document.URL` in `isolated.js`, a content script running at `document_start` on `https://*/*`, `http://*/*`, `file://*/*` (minus a few excluded hosts). The page that the content script is injected into controls its own URL and `document.title`. So the value is web-content controlled and attacker-satisfiable simply by hosting a page at a chosen URL.

**(b) Source-to-sink path**
The report anchors the source at the site-detection ternary (`(document.URL||"").startsWith("www.amazon")?Ee=!0:...`, L1:C26919), but my inspection of the actual sink region shows the stored object is built in `sendUpdate` with a **direct raw read** of the same sources:

```js
const s = {
  tabInfo: {...e},
  title: document.title,
  displayTitle: k(navigator.mediaSession?.metadata?.title || document.title, i),
  domain: location.hostname,
  displayDomain: ...,
  url: document.URL,          // ← raw attacker-controlled URL
  medi

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
