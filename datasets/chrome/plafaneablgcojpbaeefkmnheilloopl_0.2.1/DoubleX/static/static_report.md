# ExPAgent Static Verification — plafaneablgcojpbaeefkmnheilloopl v0.2.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_FONTSETTINGS_FONTLIST` in `background.js` [BG_1] @ L15
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L43

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the actual source. Let me record the analysis.

## Flow verification: `chrome.fontSettings.getFontList` → external message response (DATA_LEAK)

### (a) Source — who controls it
The source is **not attacker input**; it is extension-privileged system data. `chrome.fontSettings.getFontList` (line 13, initialized at service-worker load) retrieves the user's installed font list (`fontId`, `displayName`). This requires the `fontSettings` permission and is data a normal webpage cannot obtain directly. The report's `L15` label is line-drift — line 15 is only the `log(...)` call; the real source is the callback at L13–14 (`extensionFonts = array`).

### (b) Source → sink path (unbroken)
```
chrome.fontSettings.getFontList  (L13)
  -> extensionFonts              (L14)
  -> fontsToSend = extensionFonts.map({fontId, displayName})  (L34-37)
  -> sendResponse({ result: fontsToSend })                     (L39)
```
`messageListener` is registered at **L120 on `chrome.runtime.onMessageExternal`**, so `sendResponse` returns the font list to an *external web page* (wordmark.it family), crossing the extension→web boundary. The report's sink loc `L43` is also line-drift; the actual sink 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_FONTSETTINGS_FONTLIST` in `background.js` [BG_1] @ L64
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L43

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the actual source. Let me record the analysis.

## Flow verification: `chrome.f...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
