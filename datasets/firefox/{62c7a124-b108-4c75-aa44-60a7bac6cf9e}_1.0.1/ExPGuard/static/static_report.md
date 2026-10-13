# ExPAgent Static Verification — {62c7a124-b108-4c75-aa44-60a7bac6cf9e} v1.0.1

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.985, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `content/index` [CS_1] @ L1:C1568 -> L1:C7970
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background` [BG_1] @ L1:C2516 -> L1:C2726
- **Bridge**: message `runtime.single.sender.message[netflixParty->background]`
- **Severity evidence**: ['https://www.netflix.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ### Verification of Flow #2 (WINDOW_CUSTOM_EVENT → CHROME_TABS_CREATE_OPTIONS)

**1. Source provenance and control**

The report's normalized source file says `content/index`, but the actual `PassToBackground` window-event listener is in `netflixParty.js` (confirmed by `search_code` and `read_code`):

```js
"https://netflixpartys.com"===this.origin &&
window.addEventListener("PassToBackground", function(e) {
  e.detail && "e175530852fd42fbb" === e.detail.extensionId &&
  chrome.runtime.sendMessage(e.detail)
}, false);
```

`netflixParty.js` is a content script injected only on `https://netflixpartys.com/*`. A page script on that origin fully controls the `CustomEvent.detail` object, so `action`, `store`, `store.homeAff`, and `store.sources` are all page-controlled. The `extensionId` check is a hardcoded, non-secret constant (`e175530852fd42fbb`) that the page trivially supplies; it is not authentication. The origin check restricts the surface to `https://netflixpartys.com`, which is a same-origin web-page bridge (not an unforgeable `sender.id` boundary) — it does not break the path.

**2. Source-to-sink data path**

The background listener (verified in `background.js`):

```js
chro

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
