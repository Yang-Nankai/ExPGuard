# ExPAgent Static Verification — ilngnjopnchkedjkdjlalnlbfpkhmbie v4.4.14

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 8  |  Verified: 8
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 8}  |  Severities: {'UNKNOWN': 8}

**Assessment:** Verified 8 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 7 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L246
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L290

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've read the minified `background.js` and confirmed the actual code path. The reported line numbers (L246/L290) come from a beautified/deobfuscated view; the raw file is a single minified line, but the relevant code is unambiguous.

## Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener((async(t,e,a)=>{ ... }))` in `background.js`. `t` is the message object supplied by an external web page that is permitted by the manifest's `externally_connectable.matches`:
```
"externally_connectable": {
  "matches": ["*://*.custom-cursor.com/*", "*://*.custom-cursor-trails.com/*"]
}
```
So the source is web content (EXTERNAL_MESSAGE), reachable from those domains — and, per the XSS model, exploitable if any of those origins/subdomains has XSS. The handler performs **no `sender.id`/`sender.origin` check** and no action allow-list.

**(b) Source→sink path**
Inside the handler, the `"setConfig"` branch does:
```js
case "setConfig":
  await (s = t.data,
         new Promise(((t,e) => {
           try {
             chrome.storage.local.set(s, function(){ t({status:!0, data:s}) });
           } catch(t){ e(t); }
         })))
```
This matches

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L246
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L341

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've read the minified `background.js` and confirmed the actual code path. The reported line ...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L246
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L373

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've read the minified `background.js` and confirmed the actual code path. The reported line ...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L246
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L391

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've read the minified `background.js` and confirmed the actual code path. The reported line ...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L246
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L479

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've read the minified `background.js` and confirmed the actual code path. The reported line ...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L246
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L504

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've read the minified `background.js` and confirmed the actual code path. The reported line ...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L246
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L531

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've read the minified `background.js` and confirmed the actual code path. The reported line ...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #7 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L246
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L554

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've read the minified `background.js` and confirmed the actual code path. The reported line ...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
