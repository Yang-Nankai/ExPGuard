# ExPAgent Static Verification — aomcoolilopomacpljconemieflcmhmg v3.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 3  |  Verified: 3
- Coverage: node=1, scope=1
- Flow types: {'STORAGE_POSOING': 2, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 3}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L387:C12 -> L387:C19
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background` [BG_1] @ L263:C8 -> L263:C54
- **Bridge**: storage `STORAGE_FLOW[area: local, key: SETTINGS, sender: background, receiver: background]`
- **Severity evidence**: ['https://peanuts.pro/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have verified the complete chain against the raw source. Let me record the decision ledger.

**(a) Who controls the source.** `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => { switch (request.type) {...} })` at `background.js:384-394`. `externally_connectable.matches = ["https://peanuts.pro/*"]`, and there is **no sender check whatsoever** — no `sender.id` equality, no `sender.origin`/`sender.url` check, no allow-list. Any page loaded on `https://peanuts.pro/*` (i.e. an XSS / injected script on that origin, or the origin itself) can invoke this listener and fully controls `request.type` and `request.data`. Both fields are attacker-chosen.

**(b) The exact source→sink path (unbroken, confirmed in source).**
1. `request.type === "save-settings"` (attacker-chosen action name) → `setStorageData({ SETTINGS: request.data })` (L389) stores the attacker object verbatim under key `SETTINGS` (`chrome.storage.local.set`, L197-204).
2. On any tab update, `chrome.tabs.onUpdated` (L61) reads it back: `getStorageData(["SETTINGS"])` → `s = stored.SETTINGS` (L76).
3. `s.notification_cfg.{monetize,paidReferral,newReferral}` fields are read (L80, L105, L124) and the

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L387:C12 -> L387:C19
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L199:C4 -> L203:C5
- **Severity evidence**: ['https://peanuts.pro/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision ledger

**(a) Who controls the source?**
`background.js` L384–394 registers `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => …)`. The `request` object (specifically `request.type` and `request.data`) is supplied by the external message sender. Manifest `externally_connectable.matches = ["https://peanuts.pro/*"]`. No `sender.id`, `sender.url`, or `sender.origin` check exists anywhere in the listener (search for `sender.id|sender.url|sender.origin` → NO MATCHES). So the source is external page/message input, restricted to the `peanuts.pro` origin family but with *no* unforgeable IPC boundary.

**(b) Exact source-to-sink path.**
- L387: `switch (request.type)` — tainted member-element assigned to the switch discriminant.
- L388–389: `case "save-settings": setStorageData({ SETTINGS: request.data });`
- L197–204: `setStorageData` → `chrome.storage.local.set(data, …)` (sink L199).

The value written to storage is `request.data`, i.e. attacker-chosen content, not a literal or browser-derived value. The bridge is internal (function call, no message/storage hop needed) — report propagation steps 1–2 match the source exactly.

**(c) Which security-

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L387:C12 -> L387:C19
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L199:C4 -> L203:C5
- **Bridge**: storage `STORAGE_FLOW[area: local, key: SETTINGS, sender: background, receiver: background]`
- **Severity evidence**: ['https://peanuts.pro/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source (L384–389)?**
`chrome.runtime.onMessageExternal.addListener` is registered in the MV3 background service worker. `request` is an untrusted message object. The handler does `switch (request.type) { case "save-settings": … }` and both `request.type` and `request.data` are read straight from the sender. There is **no** `sender.id` check, **no** `sender.origin`/`sender.url` check, and no schema validation of `request.data`. `authenticatedExtensionAllowlist` is `null` — the only scope limiter is the manifest's `externally_connectable.matches: ["https://peanuts.pro/*"]`.

**(b) The exact source→sink path.**
`request.data` (L387/L389) → `setStorageData({ SETTINGS: request.data })` (L389) → `chrome.storage.local.set(data, …)` (L197–204). Confirmed in raw source:
- L387–389: `switch (request.type) { case "save-settings": setStorageData({ SETTINGS: request.data }); … }`
- L197–204: `const setStorageData = (data) => new Promise(… chrome.storage.local.set(data, …))`

The bridge is direct (no dead branch, no constant overwrite). The report's two propagation steps match the source exactly.

**(c) Which security-relevant argument is attacker-c

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
