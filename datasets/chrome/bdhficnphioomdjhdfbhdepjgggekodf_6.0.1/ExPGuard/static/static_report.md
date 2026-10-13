# ExPAgent Static Verification — bdhficnphioomdjhdfbhdepjgggekodf v6.0.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.401, scope=0.327
- Flow types: {'REQUEST_FORGERY': 1, 'STORAGE_POSOING': 2}  |  Severities: {'MEDIUM': 3}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 3 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `theme_sharing_content` [CS_2] @ L23:C15 -> L23:C23
- **Sink**: `CHROME_LOCAL_STORAGE` in `background-scripts/index` [BG_1] @ L2062:C10 -> L2062:C62
- **Bridge**: message `runtime.single.sender.message[theme_sharing_content->background-scripts/index]`
- **Severity evidence**: ['*://theme.smpp.be/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision Ledger

**(a) Who controls the source?**
The source is a page-dispatched `CustomEvent("smppPageScriptMessage")`. The content script `theme_sharing_content.js` (L22–23) does `const data = e.detail;` with no origin/source validation. Harness classifies this as `PAGE_TO_CONTENT_SCRIPT` and confirms "A page can forge window.postMessage/CustomEvent fields… not authentication." So the `detail.themeId` value is page-controlled. The only limiting factor is the content-script host match `*://theme.smpp.be/*`, which narrows the surface to that origin (XSS/compromise prerequisite) but does not break controllability.

**(b) Exact source→sink path (unbroken):**
- L23 `e.detail` → L56 `browser.runtime.sendMessage({ action: "installTheme", shareId: e.detail.themeId })` (content script, CS_2).
- Background `onMessage.addListener` L2333 → `handleMessage` L2398 `if (message.action === "installTheme") await installTheme(message.shareId);`
- `installTheme(shareId)` L1992 → L2005 `updateThemeShareCache(id, shareId)` → L2061 `data[themeId] = shareId;` → **L2062 `await browser.storage.local.set({ themeShareCache: data })`**.
- Corroborating propagation lines (L1947, L1954, L1993) match the re

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `theme_sharing_content` [CS_2] @ L2333:C2 -> L2338:C3
- **Sink**: `CHROME_LOCAL_STORAGE` in `background-scripts/index` [BG_1] @ L2062:C10 -> L2062:C62
- **Bridge**: message `runtime.single.sender.message[theme_sharing_content->background-scripts/index]`, storage `STORAGE_FLOW[area: local, key: themeShareCache, sender: background-scripts/index, receiver: background-scripts/index]`
- **Severity evidence**: ['*://theme.smpp.be/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #2 (STORAGE_POSOING, storage poisoning of `themeShareCache`)

**Four-part ledger**

**(a) Who controls the source** — The source is a page-dispatched DOM event on `theme.smpp.be`. `theme_sharing_content.js` L22 installs `document.addEventListener("smppPageScriptMessage", …)` and reads `e.detail.themeId` (L32/L45/L56). The content script matches `*://theme.smpp.be/*` (ISOLATED world, non-`all_urls`), so any script executing on that origin — the site's own code, an XSS, or an injected/compromised page — fully controls `detail.themeId`. No `event.origin`, `event.source`, or hash/type guard is present in the listener.

**(b) The source→sink path** — Confirmed unbroken:
- Page: `CustomEvent("smppPageScriptMessage", {detail:{action:"install", themeId:<ATTACKER>}})`.
- CS: `e.detail.themeId` → `browser.runtime.sendMessage({action:"installTheme", shareId: e.detail.themeId})` (L54–57). HOP `runtime.single.sender.message[theme_sharing_content -> background-scripts/index]`.
- BG: `browser.runtime.onMessage.addListener` (L2333) → `handleMessage` → `message.action === "installTheme"` → `installTheme(message.shareId)` (L2398–2399).
- `installTheme` (L1992) → `fetch("https:

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `theme_sharing_content` [CS_2] @ L23:C15 -> L23:C23
- **Sink**: `FETCH_RESOURCE` in `background-scripts/index` [BG_1] @ L1993:C23 -> L1998:C6
- **Bridge**: message `runtime.single.sender.message[theme_sharing_content->background-scripts/index]`
- **Severity evidence**: ['*://theme.smpp.be/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Ledger

**(a) Who controls the source.** `theme_sharing_content.js` L22‑23 registers `document.addEventListener("smppPageScriptMessage", e => { const data = e.detail; … })`. A `CustomEvent` on `document` is dispatched by page‑world JavaScript, and `e.detail` / `e.detail.themeId` is fully attacker‑chosen (the harness confirms `PAGE_TO_CONTENT_SCRIPT`; `event.source === window`, the event name and any action/type field are satisfiable by the page). The source is reachable from any script executing on `*://theme.smpp.be/*` (the only `matches` for this content script), i.e. the site itself, an XSS there, or a compromised/injected script — the "path is wildcarded" MEDIUM severity is consistent with this.

**(b) The exact path.** Confirmed end‑to‑end and it connects:
- CS L25‑57: `case "install"` → `browser.runtime.sendMessage({ action: "getSharedTheme"|"installTheme", shareId: e.detail.themeId })` — the attacker value is forwarded verbatim.
- BG L2333 `browser.runtime.onMessage.addListener` → L2339 `handleMessage` → L2398 `if (message.action === "installTheme") await installTheme(message.shareId)` — action names match exactly, listener is live, and the branch is reachable (the `getRe

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
