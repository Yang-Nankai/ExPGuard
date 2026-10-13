# ExPAgent Static Verification — bckjehjkancjdhpaiakanfinhlapmnnl v2.1.2

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L27
- **Sink**: `CHROME_SYNC_STORAGE` in `background.js` [BG_1] @ L901
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the normalized flow

### 1. Report vs. actual extension source (file/loc mismatch)

The normalized report points at:
- source `content_scripts.js` L27 — **file does not exist** in the unpacked extension.
- sink `background.js` L901 — `scripts/background.js` is only 49 lines; there is no L901.

The actual extension has:
- content script: `scripts/kpsb-web-auth-bridge.js` (the only content script in the manifest, matches `https://app.kiddoware.com/kw_backend_new/public/kpsb-extension-auth*` and `https://*.app.kiddoware.com/...`).
- background/service worker: `scripts/service_worker.js` (the MV3 `background.serviceWorker`).

The `doublex-edg` channel is ExPGuard's engine label, not a literal message action. So the report's anchors are mislabeled, but the *substance* of the flow is real and I verified it in the actual files.

### 2. The real source-to-sink path

**Source** (`scripts/kpsb-web-auth-bridge.js` L26–45): the page on the kiddoware auth page posts a `message`. The content script checks:
- `event.source === window` (attacker-satisfiable),
- `allowedOrigin(event.origin)` (must be `app.kiddoware.com` or `*.app.kiddoware.com`),
- `d.type === 'KPSB_EXTENSION_GOO

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
