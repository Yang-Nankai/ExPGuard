# ExPAgent Static Verification — clcgadagmheefcopmehicmjhimgbifph v1.9.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- Coverage: node=0.928, scope=1
- Flow types: {'REQUEST_FORGERY': 3, 'STORAGE_POSOING': 1}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 2 flow(s): 1 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/relay` [CS_2] @ L358:C20 -> L358:C35
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L102:C4 -> L111:C6
- **Bridge**: message `runtime.connect.sender.message[content/relay->background]`
- **Severity evidence**: ['*://*.lootspectrum.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 (WINDOW_MESSAGE_EVENT → FETCH_BODY debug-log)

### Decision ledger

**(a) Who controls the source?**
The content script `content/relay.js` runs on `*://*.lootspectrum.com/*` (ISOLATED world) and registers a single `window.addEventListener("message", ...)` handler (L351). A page on any `*.lootspectrum.com` subdomain can postMessage to it; `event.source !== window` (L353) is self-origin, attacker-satisfiable. So the **source is genuinely attacker-controllable**.

**(b) Exact source-to-sink path**
The relay handler (L351–722) only dispatches on a fixed set of `event.data.type` values, and for each branch constructs a **new** message with a hard-coded `type` field:
- `relay/ping` → `checkPermissions`
- `relay/requestPermission` → `requestPermission`
- `relay/checkSteamLogon` → `checkSteamLogon`
- `relay/startAgeDetection` → `startAgeDetection`
- `relay/stopAgeDetection` → `stopAgeDetection`
- `relay/ageDetectionStatusResponse` → `ageDetectionStatusResponse`
- `relay/startDataQuery` → `startDataQuery`
- `relay/stopDataQuery` → `stopDataQuery`
- `relay/dataQueryStatusResponse` → `dataQueryStatusResponse`
- `relay/fetchLatestEventsPage` → `fetchLatestEventsPage`

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/relay` [CS_2] @ L358:C20 -> L358:C35
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L77:C29 -> L96:C8
- **Bridge**: message `runtime.connect.sender.message[content/relay->background]`
- **Severity evidence**: ['*://*.lootspectrum.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to render a verdict. Let me consolidate the analysis.

## Verification of Flow #4 — REQUEST_FORGERY (WINDOW_MESSAGE_EVENT → network send)

### (a) Who controls the source — CONFIRMED
`content/relay.js` runs on `*://*.lootspectrum.com/*` (wildcard subdomains) and registers `window.addEventListener("message", ...)` at L351. The only inbound guard is `event.source === window` (L353), which a page's own `window.postMessage` trivially satisfies. There is no origin allowlist, no fixed `sender.id`, and no field validation. A page on any lootspectrum subdomain fully controls `event.data.type` and `event.data.profileUrl`.

### (b) Exact source-to-sink path — CONFIRMED (with sink-loc correction)
The report's *normalized* sink loc (background L77–L96) is **mislabeled**: that range is `sendToRelayPorts()` → `port.postMessage(message)`, a runtime-port relay, not a fetch, and the tainted `profileUrl` does not flow into it.

The **real** privileged network sink is reachable from the same source:

1. Page `window.postMessage({ type: "relay/fetchLatestEventsPage", profileUrl: attackerUrl })`
2. `content/relay.js` L691–698 → `sendPortMessage({ type: "fetchLatestEventsPage", pr

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
