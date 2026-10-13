# ExPAgent Static Verification — scamblocker_extensiondevelopers@pcmatic.com v1.20

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.987, scope=1
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `override` [CS_1] @ L18:C5 -> L18:C17
- **Sink**: `FETCH_RESOURCE` in `service-worker` [BG_1] @ L20:C31 -> L26:C11
- **Bridge**: message `runtime.single.sender.message[override->service-worker]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification: REQUEST_FORGERY (content script → background `fetch`)

### 1. Source control (attacker-controllable?)

**Yes.** `override.js` is a content script registered on `http://*/*` and `https://*/*` (manifest `content_scripts.matches`). It registers:

```js
document.addEventListener("contentEvent", async function(event) {
  ...
  if (event.detail.type == 'serviceworker') {      // L18, harness snippet
    const result = await brow.runtime.sendMessage(event.detail);  // L20
```

The source is a **DOM `CustomEvent` ("contentEvent")** whose `event.detail` is fully supplied by the page. There is no `event.source`/origin check, no token, and no fixed sender. Any script running on a matched page can dispatch:

```js
document.dispatchEvent(new CustomEvent('contentEvent', {detail: {...}}));
```

The harness explicitly confirms this bridge class: *"A page can forge window.postMessage/CustomEvent fields… event.source === window, same-page origin checks, and message action/type fields are not authentication."*

### 2. Source-to-sink path (unbroken?)

**Yes, fully connected:**

1. Page dispatches `contentEvent` with `detail.type === 'serviceworker'` (L18 guard is attacker-satisfi

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
