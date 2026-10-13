# ExPAgent Static Verification — lhmminnoafalclkgcbokfcngkocoffcp v6.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.225, scope=0.165
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'MEDIUM': 3}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L2:C34 -> L2:C49
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L50:C4 -> L62:C5
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://flow-dashboard-lac.vercel.app/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The chain is fully confirmed by direct source inspection.

**Decision ledger**

1. **Who controls the source?** The page on `https://flow-dashboard-lac.vercel.app/*` (or the other matched origins) can call `window.postMessage`. The content script guard is only `event.source !== window || !event.data.type` (content.js L2), which the page's *own* `window.postMessage` trivially satisfies — it is not an authentication boundary. The `type` field is also attacker-chosen.

2. **Exact source→sink path:**
   - content.js L1: `window.addEventListener("message", ...)` (page-controlled `event.data`).
   - content.js L34–38: `if (event.data.type === "SET_FULL_TOKEN_TO_EXTENSION")` → `chrome.runtime.sendMessage({ type: event.data.type, payload: event.data.payload })` — forwards the raw payload unchanged.
   - background.js L49–54: `if (message.type === "SET_FULL_TOKEN_TO_EXTENSION")` → `chrome.storage.local.set({ access_token: message?.payload?.accessToken, refresh_token: ..., public_key: ... })`.

   The action names match on both sides (`SET_FULL_TOKEN_TO_EXTENSION`), and `payload` is passed through verbatim — no broken bridge, no dead branch.

3. **Security-relevant argument:** The values wri

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L2:C34 -> L2:C49
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L50:C4 -> L62:C5
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://flow-dashboard-lac.vercel.app/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The chain is fully confirmed by direct source inspection.

**Decision ledger**

1. **Who cont...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L2:C34 -> L2:C49
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L50:C4 -> L62:C5
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://flow-dashboard-lac.vercel.app/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The chain is fully confirmed by direct source inspection.

**Decision ledger**

1. **Who cont...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
