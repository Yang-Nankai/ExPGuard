# ExPAgent Static Verification — digojkgonhgmnohbapdfjllpnmjmdhpg v1.8.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.962, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content-script` [CS_1] @ L61:C9 -> L61:C19
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background-script` [BG_1] @ L72:C4 -> L72:C42
- **Bridge**: message `runtime.connect.sender.message[content-script->background-script]`
- **Severity evidence**: ['https://*.proctorexam.com/check_requirements/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 62, 'distinctLines': 11, 'crossContextHops': ['runtime.connect.sender.message[content-script->background-script]'], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — WINDOW_MESSAGE_EVENT → chrome.tabs.create({url: payload.url})

### (a) Who controls the source
Untrusted **web page content**. The content script registers `window.addEventListener('message', messageHandler)` at `content-script.js:17`. It runs on `https://*.proctorexam.com/check_requirements/*` and `https://*.proctorexam.com/student_sessions/*` with `allFrames: true`. Any script executing in the page context on one of those origins (the exam page, a wildcard-matched subdomain, or XSS in that origin) can postMessage into the isolated-world content script. The source is genuinely attacker-controllable at runtime.

### (b) Exact source-to-sink path (unbroken)
1. `content-script.js:17` — `window.addEventListener('message', onMessageHandler(p))`.
2. `content-script.js:55-71` — `onMessage` reads `method = event.data[prefix]` and `payload = event.data.payload`.
3. `content-script.js:90-91` — for `method === 'openTab'`: `port.postMessage({method: 'openTab', payload: payload})`. This forwards the **entire attacker-controlled `payload` object** (including `url`).
4. `background-script.js:4,14-15` — `port.onMessage` dispatches `message.method == 'openTab'` to `ope

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---
