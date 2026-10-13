# Source-level Taint Flow — hkbdddpiemdeibjoknnofflfgbgnebcm 3.7.3

- Source type: CRX
- Files with issues: 1 / 3
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `serviceWorker` L1:C1496 -> L1:C1497  `…rage.local.set({hasVersionUpdate:!0}))});chrome.runtime.onMessageExternal.addListener((t,s,o)=>{const{type:e,content:n}=»t«;switch(e){case"getFontList":return chrome.fontSettings.getFontList().then(o),!0;case"getUserSettings":return chrome.sto…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) — `serviceWorker` L1:C1667 -> L1:C1693  `…tings.getFontList().then(o),!0;case"getUserSettings":return chrome.storage.sync.get().then(o),!0;case"syncUserSettings":»chrome.storage.sync.set(n)«;break;case"getHasVersionUpdate":chrome.storage.local.get("hasVersionUpdate").then(o);break;case"setHasVersionUpdate":ch…`
  - `CHROME_LOCAL_STORAGE` (hasVersionUpdate) — `serviceWorker` L1:C1811 -> L1:C1857  `…n);break;case"getHasVersionUpdate":chrome.storage.local.get("hasVersionUpdate").then(o);break;case"setHasVersionUpdate":»chrome.storage.local.set({hasVersionUpdate:n})«;break}});`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (11 raw steps → 1 distinct lines):
   1. L1 `…ner((t,s,o)=>{const{»type:e,content:n}=t;switch(e){case"getFontList":return chrome.fontSettings.getFontList().then(o),!0;case"getUserSettings …⟨tainted span: 379 chars⟩… age.local.get("hasVersionUpdate").then(o);break;case"setHasVersionUpdate":chrome.storage.local.set({hasVersionUpdate:n})«;break}});`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[content], ELEMENT:object.setProperty

---

## Flow #2 — CHROME_FONTSETTINGS_FONTLIST

- **Source**: `CHROME_FONTSETTINGS_FONTLIST` — `serviceWorker` L1:C1526 -> L1:C1578  `…te:!0}))});chrome.runtime.onMessageExternal.addListener((t,s,o)=>{const{type:e,content:n}=t;switch(e){case"getFontList":»return chrome.fontSettings.getFontList().then(o),!0;«case"getUserSettings":return chrome.storage.sync.get().then(o),!0;case"syncUserSettings":chrome.storage.sync.set(n);brea…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `serviceWorker` L1:C1533 -> L1:C1574  `…)});chrome.runtime.onMessageExternal.addListener((t,s,o)=>{const{type:e,content:n}=t;switch(e){case"getFontList":return »chrome.fontSettings.getFontList().then(o)«,!0;case"getUserSettings":return chrome.storage.sync.get().then(o),!0;case"syncUserSettings":chrome.storage.sync.set(n);…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L1 `…te:!0}))});chrome.runtime.onMessageExternal.addListener((t,s,o)=>{const{type:e,content:n}=t;switch(e){case"getFontList":»return chrome.fontSettings.getFontList().then(o),!0;«case"getUserSettings":return chrome.storage.sync.get().then(o),!0;case"syncUserSettings":chrome.storage.sync.set(n);brea…`  · ELEMENT:object.setProperty

---
