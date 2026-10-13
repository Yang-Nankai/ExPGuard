# ExPAgent Static Verification — hfonloodfjgngkhglcdnkjdlllfjdbck v1.0.1

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.979, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/in` [CS_1] @ L1:C501 -> L1:C2866
- **Sink**: `CHROME_DOWNLOADS_OPTIONS` in `js/bg` [BG_1] @ L1:C102400 -> L1:C102489
- **Bridge**: message `runtime.single.sender.message[js/fb-v->js/bg]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `6`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've traced the full chain in raw source and confirmed it end-to-end.

## Decision ledger

**(a) Who controls the source?**
The page itself. In `js/fb-v.js` (Facebook-video content script, ISOLATED world) there is:

```js
window.addEventListener("message", (i => {
  var l = "";
  if (i.data && i.data.includes("https")) {
    try { l = document.querySelector(...).alt } catch(i){ l="none" }
    chrome.runtime.sendMessage({ downloadv1: i.data, idx: l, url: location.href }, (i=>{}))
  }
}), false)
```

Any JS running in the page can call `window.postMessage(...)`. The only conditions are:
- the page URL contains the substring `"facebook"` (the top of the script does `if(!window.location.href.includes("facebook"))return;`), and
- the posted message is a string containing the substring `"https"`.

Both are attacker-satisfiable and bypassable (e.g. `https://facebook.attacker.com/` or `https://notfacebook.com` — substring match; and any `https://...` payload).

**(b) Source-to-sink path (unbroken):**
page `window.postMessage` → `js/fb-v.js` `window.addEventListener("message")` → `chrome.runtime.sendMessage({downloadv1: i.data, ...})` → background `js/bg.js` `chrome.runtime.onMessage.addLis

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
