# ExPAgent Static Verification — ljojmlmdapmnibgflmmminacbjebjpno v6.0.20

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.974, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `extension` [CS_2] @ L1:C47458 -> L1:C47472
- **Sink**: `CHROME_LOCAL_STORAGE` in `extension` [CS_2] @ L1:C69449 -> L1:C69558
- **Severity evidence**: ['*://meet.google.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (DOCUMENT_TITLE → chrome.storage.local)

### (a) Who controls the source?
`document.title` on `meet.google.com` / `meetenhancementsuite.com` is page-controlled DOM. The content script (`extension.js`, CS_2, ISOLATED world) reads it. Under ExPGuard's model this is `WEB_CONTENT`/`DOCUMENT_TITLE` taint, and on Meet the page title reflects the meeting name, which a meeting organizer/participant can choose. Attacker-controllable: yes.

### (b) Exact source-to-sink path
The report pins the source at `L1:C47458` (`"Meet"!==document.title && "Google Meet"!==document.title`), which is a boolean gate. That specific occurrence is only a readiness check. However, inspecting the actual code around the sink confirms the real **data** flow is in the same sink function, and it is the same tainted source:

```js
document.documentElement.addEventListener("mes-transcription", async e => {
  const t = window.crypto?.randomUUID() ?? `${Date.now()}`,
        n = new URL(location.href).pathname.split("/"),
        o = n[n.length-1] ?? t,
        r = document.querySelector('[jsname="NeC6gb"]')?.textContent
            || document.title.replace("Google Meet: ","").replace("Meet: 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
