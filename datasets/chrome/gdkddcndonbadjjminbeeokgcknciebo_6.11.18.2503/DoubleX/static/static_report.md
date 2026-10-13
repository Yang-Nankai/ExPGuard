# ExPAgent Static Verification — gdkddcndonbadjjminbeeokgcknciebo v6.11.18.2503

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L2
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L220
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 — STORAGE_POSOING (WINDOW_MESSAGE_EVENT → `chrome.storage.local.set`)

### (a) Who controls the source
Real source is `content_script.js:1` (`window.addEventListener("message", ...)`), which runs on `*://*/guest/mdps_status.php` and `*://*/onboard/mdps_status.php`. A page on any matching host can post a self-origin `window` message; the only guard is `event.source != window` (L3), which the page's own `postMessage` satisfies. The `type`/`request.otp`/`request.version` fields are page-chosen. So the *source* is genuinely attacker-controllable — but that is not enough here.

### (b) Exact source-to-sink path
- Content script L19: `chrome.runtime.sendMessage(null, event.data.request, ...)` forwards `{otp, version, host}` (host is overwritten with `window.location.origin` at L17).
- `background.js:249` `onMessage` → `new ClientEnrollment(message, sendResponse)` → `do_enroll()` (L234) → `generateDeviceId()` (L201).
- `generateDeviceId` does `chrome.storage.local.get('OnboardUDID', ...)`; if absent, it calls `forge.random.getBytes(16, function(err, bytes) {...})` and stores `forge.util.bytesToHex(bytes)` (L213–214).

### (c) Which security-relevant API argument 

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
