# ExPAgent Static Verification — ohbfenjhaimblkolliiajfmbdifmmlbf v2.4.1

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- Coverage: node=0.851, scope=0.911
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 2}  |  Severities: {'MEDIUM': 4}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (STORAGE_POSOING / MEDIUM, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L4:C51 -> L4:C62
- **Sink**: `CHROME_LOCAL_STORAGE` in `background/service-worker` [BG_1] @ L68:C37 -> L68:C85
- **Bridge**: message `runtime.single.sender.message[content->background/service-worker]`
- **Severity evidence**: ['*://discord.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L4:C51 -> L4:C62
- **Sink**: `FETCH_HEADERS` in `background/service-worker` [BG_1] @ L28:C10 -> L28:C86
- **Bridge**: message `runtime.single.sender.message[content->background/service-worker]`
- **Severity evidence**: ['*://discord.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: REQUEST_FORGERY (`attacker-input-network-send`)

### (a) Who controls the source?

The source is a `window.addEventListener("message", ...)` listener in `content.js` L3–L4, running in the ISOLATED content-script world on `*://discord.com/*`:

```js
window.addEventListener("message", e => {
  e.source === window &&
  "DISCORD_TOKEN_EXTRACTED_EXT" === e.data.type &&
  e.data.token &&
  sendToken(e.data.token)
});
```

The three gate conditions are all **attacker-satisfiable**, not trust anchors:
- `e.source === window` — a page's own `postMessage` has `source === window`.
- `e.data.type === "DISCORD_TOKEN_EXTRACTED_EXT"` — attacker-chosen message field.
- `e.data.token` — attacker-chosen truthy value.

So the page on `discord.com` (or XSS on that origin) fully controls the `token` value. This matches the harness: `CONTENT_SCRIPT` provenance → untrusted.

### (b) Source-to-sink path

The propagation report and raw source confirm an unbroken chain with **two** routes to the sink:

1. **Storage route:** `sendToken(token)` → `chrome.storage.local.set({discordToken: token})` (content.js L1) → background `chrome.storage.local.get(["discordToken"])` (service-worker L27

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
