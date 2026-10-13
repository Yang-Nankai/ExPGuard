# ExPAgent Static Verification — lmphiinjkobfnpifgpcggcpicomibhpp v0.7

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.982, scope=1
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'HIGH': 3}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content.min` [CS_1] @ L1:C3552 -> L1:C3563
- **Sink**: `CHROME_LOCAL_STORAGE` in `content.min` [CS_1] @ L1:C3674 -> L1:C3717
- **Severity evidence**: ['https://*.youtube.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me summarize the verification.

## Decision ledger

**(a) Who controls the source?**
Any script running on a page matching `https://*.youtube.com/*` (including `www.youtube.com`) can call `window.postMessage`. The content script gates the message with `e.data.exId === c`, where `c` is a module-scope random token (`const c = Object(r.a)("20")` — 20 random alphanumerics). Crucially, this token is **leaked to the page**: when the extension is enabled, the content script does `e.setAttribute("exId", c)` on the injected DOM node `#cc-ysh-container` (`document.body.appendChild(e)`). A page script can trivially read `document.getElementById('cc-ysh-container').getAttribute('exId')`. The `direction === "send-cc-contribute"` check is a plain attacker-supplied message field. There is no `sender.id`/origin authentication. So the source is genuinely attacker-controllable.

**(b) Exact source-to-sink path**
`window.addEventListener("message", ...)` → `e.data.exId === c` → `"send-cc-contribute" === e.data.direction` → `const t = e.data.message` → `chrome.storage.local.set({cc_contribute: t})`. Direct, unbroken, no cross-context hop. The listener is registere

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content.min` [CS_1] @ L1:C3552 -> L1:C3563
- **Sink**: `CHROME_LOCAL_STORAGE` in `content.min` [CS_1] @ L1:C3998 -> L1:C4051
- **Severity evidence**: ['https://*.youtube.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me summarize the verification.

## Decision ledger

**(...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content.min` [CS_1] @ L1:C3552 -> L1:C3563
- **Sink**: `CHROME_LOCAL_STORAGE` in `content.min` [CS_1] @ L1:C4122 -> L1:C4163
- **Severity evidence**: ['https://*.youtube.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me summarize the verification.

## Decision ledger

**(...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
