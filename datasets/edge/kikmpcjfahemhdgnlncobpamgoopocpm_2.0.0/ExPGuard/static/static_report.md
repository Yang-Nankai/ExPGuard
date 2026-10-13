# ExPAgent Static Verification — kikmpcjfahemhdgnlncobpamgoopocpm v2.0.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.951, scope=1
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'LOW': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / LOW, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L1:C1136 -> L1:C1161
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L1:C2048 -> L1:C2443
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://www.tiktok.com/tiktokstudio/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (REQUEST_FORGERY)

### 1. Who controls the source?
**Page context on `https://www.tiktok.com/tiktokstudio/*`.** The content script (`content.js`, MV3 ISOLATED world) installs:

```js
window.addEventListener("message", function(e) {
  if (e.source === window && e.data) { ... }
})
```

`e.source === window` is attacker-satisfiable — a script running in the page can post a `window.postMessage` to itself. No origin check, no sender.id, no cryptographic auth. Per the harness: message fields / same-window checks are not authentication. **Source is genuinely attacker-controlled.**

### 2. Source-to-sink path
Confirmed unbroken:

1. `content.js` (L1 C1136+): if `e.data._tq_upload` and telemetry is not disabled, it forwards the *entire* page-controlled message:
   ```js
   _br.runtime.sendMessage({ type: "upload", payload: e.data })
   ```
2. Cross-boundary HOP `runtime.single.sender.message[content->background]` — confirmed by the propagation record.
3. `background.js` (L1 C2600+):
   ```js
   if ("upload" === e.type && e.payload) sendUpload(e.payload);
   ```
4. `sendUpload(e)` (L1 C2048+) uses the attacker-supplied fields directly in the fetch body:
   ```js
  

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
