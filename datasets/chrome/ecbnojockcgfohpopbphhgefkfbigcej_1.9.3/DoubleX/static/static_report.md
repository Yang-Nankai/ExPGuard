# ExPAgent Static Verification — ecbnojockcgfohpopbphhgefkfbigcej v1.9.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `background.js` [BG_1] @ L471
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L473

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've located the actual code. The reported file name (`background.js`) is a misnomer; the real file is `bg.js`, and the flow resolves to the `getAutoplayOrigins` branch of the external-message listener.

**Four-part ledger:**

**(a) Who controls the source?** The source is `chrome.storage.local.get('mk1-autoplay-origins', ...)` at `bg.js:449`. This key is *only ever written* by `setOptions` (`bg.js:703–760`), specifically the `addAutoplayOrigin` branch (`bg.js:729–748`), which is itself reached from the same `onMessageExternal` listener via `{action:'setOptions'}`. The value is a list of HTTPS origins that the *external page itself* adds/removes. There is no default initialization or server seeding of this key (search shows only the read at 449 and the add/remove writes at 715–745). So the "sensitive" data is not browser/user-private data — it is caller-owned configuration.

**(b) Source-to-sink path:** The path is real and unbroken:
- `bg.js:448` `msg.action == 'getAutoplayOrigins'`
- `bg.js:449` `chrome.storage.local.get('mk1-autoplay-origins', cb)`
- `bg.js:451` `sendResponse({autoplayOrigins: response['mk1-autoplay-origins']})`

The ExPGuard sink label `WINDOW_POSTMESSAGE` is i

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `background.js` [BG_1] @ L485
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L487

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've located the actual code. The reported file name (`background.js`) is a misnomer; the rea...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
