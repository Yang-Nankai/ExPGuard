# ExPAgent Static Verification — jabjbhgjaidecageckilhonbggakppme v1.3.19.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.24, scope=0.233
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'SOURCE_REPORT_ONLY': 1}  |  Severities: {'CRITICAL': 1, 'UNKNOWN': 1}

**Assessment:** Verified 2 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 2 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L38:C31 -> L38:C38
- **Sink**: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` in `background` [BG_1] @ L937:C20 -> L937:C71
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1422, 'distinctLines': 96, 'crossContextHops': ['runtime.single.sender.message[content->background]'], 'sinkUrlControl': []}

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #1 — 🟢 FALSE POSITIVE  (SOURCE_REPORT_ONLY / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L38:C31 -> L38:C38
- **Sink**: `WINDOW_POSTMESSAGE` in `content` [CS_1] @ L75:C35 -> L75:C67
- **Bridge**: message `runtime.single.sender.message[background->content]`
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 656, 'distinctLines': 21, 'crossContextHops': ['runtime.single.sender.message[background->content]'], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1

### (a) Who controls the source?
The source is `window.addEventListener("message", ...)` in `content.js` (CS_1), which runs on `<all_urls>` with `allFrames: true`. Any page can forge a `postMessage` payload into this listener. The tainted field is the page-supplied `message` object (specifically `message.meta`, `message.id`, `message.routes[0].node`). **Source is genuinely attacker-controllable.**

### (b) Exact source-to-sink path
Confirmed from the report and raw source:
1. `L37` `let message = event?.data` — page payload.
2. `L38` `let meta = message?.meta` (reported tainted span).
3. `L40` gate on `meta?.format?.category === "gosuslugi.plugin"` (attacker-satisfiable — it is an attacker-chosen field).
4. `L42` gate on `message?.node === ""` (attacker-satisfiable).
5. `L44` `routeNode = meta.routes?.[0]?.node` (attacker value) → cached at `L49` `_cache[id] = routeNode`.
6. `L53` `chrome.runtime.sendMessage(message)` — content→background.
7. `L59` `chrome.runtime.onMessage` — background→content response (HOP `runtime.single.sender.message[background->content]`).
8. `L70` `message.node = cached` — the attacker-cached `routeNode` is put back into the resp

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---
