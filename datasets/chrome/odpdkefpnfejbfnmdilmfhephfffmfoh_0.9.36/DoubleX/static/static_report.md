# ExPAgent Static Verification — odpdkefpnfejbfnmdilmfhephfffmfoh v0.9.36

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L53
- **Sink**: `FETCH_RESOURCE` in `background.js` [BG_1] @ L166
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: Readlang Web Reader — `serverRequest` page→background fetch

### (a) Who controls the source

**Attacker-controllable, with an XSS/content-injection prerequisite on a listed origin.**

- `src/contentScript.js` registers `window.addEventListener("message", ...)` (line 16) only when `window.location.origin` is one of:
  - `config.localhostOrigin`
  - `https://readlang.com`
  - `https://test.readlang.com`
- A page script running on any of those origins can `window.postMessage` arbitrary JSON. The content script then parses it and checks only attacker-satisfiable fields:
  - `data.type === "readlangMessage"`
  - `data.to === "extension"`
  - `data.message === "backgroundPageMessage"`
- It does **not** validate `event.source`, `event.origin`, or the request payload.

So this is real page-to-content-script web taint. The only limitation is that the attacker needs script execution on `readlang.com` / `test.readlang.com` / configured localhost (e.g., XSS, subdomain takeover, or dev environment). That is a precondition, not a broken data path.

### (b) Exact source-to-sink path

1. **Source** — `src/contentScript.js:16`  
   `window.addEventListener("message", (event) 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
