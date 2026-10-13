# ExPAgent Static Verification — iilnecjehheemiieeblkpkichceocomn v1.4.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 4
- Coverage: node=0.065, scope=0.073
- Flow types: {'REQUEST_FORGERY': 4}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 4 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 3 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L214:C14 -> L214:C21
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L88:C23 -> L96:C4
- **Severity evidence**: ['https://*.merlinks.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — Flow #1 (CHROME_ONMESSAGEEXTERNAL_MESSAGE → FETCH_RESOURCE)

### 1. Source control
The source is `chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => ...)` at `background.js:213`.

I inspected the listener body (`background.js:213-268`). There is **no sender guard**:

- No `sender.id` equality / fixed extension-ID allowlist.
- No `sender.origin` / `sender.url` check.
- No message-field allowlist beyond `request.kind === 1..5`, and `request.kind` is itself attacker-chosen.

The listener directly uses attacker-supplied fields: `request.asin`, `request.area`, `request.kw`, `request.page`, `request.cate`, `request.node`, `request.step`, `request.current`.

The manifest exposes this to:

```
https://*.merlinks.com/*
https://*.genmatrix.cn/*
https://*.gemx.ai/*
http://localhost:8001/*
http://*.merlinks.com/*
```

So any page on those origins — or any XSS/subdomain-takeover/HTTP-MITM within them — can send arbitrary messages. This is not an unforgeable sender.id boundary.

### 2. Source-to-sink path
The report propagation is corroborated by raw source:

- `L213` external message listener receives `request`.
- `L217`: `getListing(req

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L214:C14 -> L214:C21
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L63:C23 -> L71:C4
- **Severity evidence**: ['https://*.merlinks.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — Flow #1 (CHROME_ONMESSAGEEXTERNAL_MESSAGE → FETCH_RESOURCE)

### 1. So...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L214:C14 -> L214:C21
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L145:C20 -> L153:C4
- **Severity evidence**: ['https://*.merlinks.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — Flow #1 (CHROME_ONMESSAGEEXTERNAL_MESSAGE → FETCH_RESOURCE)

### 1. So...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L214:C14 -> L214:C21
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L180:C20 -> L188:C4
- **Severity evidence**: ['https://*.merlinks.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — Flow #1 (CHROME_ONMESSAGEEXTERNAL_MESSAGE → FETCH_RESOURCE)

### 1. So...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
