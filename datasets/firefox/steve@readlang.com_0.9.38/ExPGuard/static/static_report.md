# ExPAgent Static Verification — steve@readlang.com v0.9.38

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 2
- Coverage: node=0.972, scope=1
- Flow types: {'REQUEST_FORGERY': 2, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 3}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `src/contentScript` [CS_1] @ L20:C13 -> L20:C35
- **Sink**: `FETCH_RESOURCE` in `src/background` [BG_1] @ L159:C27 -> L170:C12
- **Bridge**: message `runtime.single.sender.message[src/contentScript->src/background]`
- **Severity evidence**: ['https://readlang.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — REQUEST_FORGERY (`attacker-input-network-send`)

### (a) Who controls the source
The page controls the source. `src/contentScript.js` L16–20 registers `window.addEventListener("message", ...)` and does `data = JSON.parse(event.data)`. The harness resolved anchor matches exactly. The only "guards" before forwarding are:

- `data?.type === "readlangMessage"` (L28)
- `data.to === "extension"` (L33)
- `data.message === "backgroundPageMessage"` (L37)
- `window.location.origin` is one of `config.localhostOrigin`, `https://readlang.com`, `https://test.readlang.com` (L45–51)

All of these are attacker-satisfiable on the matched origins: the page chooses `type/to/message`, and the origin check is not a sender-authentication boundary (a page on those origins, or XSS there, satisfies it). The content script then forwards `data.data` via `chrome.runtime.sendMessage({ message, data })` (L53).

### (b) Exact source-to-sink path
Unbroken:

1. Page `postMessage` → content-script `JSON.parse` (L20).
2. Content script → `chrome.runtime.sendMessage` (L53) — `HOP: runtime.single.sender.message[src/contentScript->src/background]`.
3. Background `chrome.runtime.onMessage.add

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `src/contentScript` [CS_1] @ L20:C13 -> L20:C35
- **Sink**: `FETCH_BODY` in `src/background` [BG_1] @ L159:C27 -> L170:C12
- **Bridge**: message `runtime.single.sender.message[src/contentScript->src/background]`
- **Severity evidence**: ['https://readlang.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me lay out the verification ledger.

## 1. Who controls the source

`src/contentScript.js` (resolved anchor at L16–L20):

```js
window.addEventListener("message", (event) => {
  let data;
  try { data = JSON.parse(event.data); } catch (...) { return; }
  ...
  if (data?.type !== readlangMessageType) return;         // attacker field
  if (data.to !== "extension") return;                    // attacker field
  if (data.message !== "backgroundPageMessage") throw ... // attacker field
  handler(data.data.message, data.data, event, data.requestId);
```

`handler` then does `chrome.runtime.sendMessage({ message, data }, ...)`.

The content script only runs on `https://readlang.com/*`, `https://test.readlang.com/*`, `http://localhost/*` (manifest), and the in-script `window.location.origin` check (L45–51) is satisfied by exactly those pages. Every message field (`type`, `to`, `message`, `data.data.message`, `data.data.data.url/method/data`) is chosen by the page. This is genuine page-controlled web content → content-script input, not extension-user input.

## 2. Exact source-to-sink path (unbroken)

Page `postMessage` →
- content script `JSON.parse(e

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
