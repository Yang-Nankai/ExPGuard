# ExPAgent Static Verification — lkijhlbancniebghpfjcfakajaejgppn v1.0.4

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 3
- Coverage: node=0.101, scope=0.201
- Flow types: {'REQUEST_FORGERY': 1, 'STORAGE_POSOING': 3, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 5}

**Assessment:** Verified 3 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (STORAGE_POSOING / MEDIUM, confidence 0.00)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background/chrome` [BG_1] @ L21:C4144 -> L21:C4151
- **Sink**: `CHROME_LOCAL_STORAGE` in `background/chrome` [BG_1] @ L21:C5380 -> L21:C5496
- **Severity evidence**: ['https://www.instagram.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background/chrome` [BG_1] @ L21:C3136 -> L21:C3531
- **Sink**: `CHROME_LOCAL_STORAGE` in `background/chrome` [BG_1] @ L21:C5380 -> L21:C5496
- **Bridge**: message `runtime.single.sender.message[content/index->background/chrome]`, storage `STORAGE_FLOW[area: local, key: reels, sender: background/chrome, receiver: background/chrome]`
- **Severity evidence**: ['https://www.instagram.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`UNTRUSTED_STORAGE`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 — STORAGE_POSOING (external message → `chrome.storage.local.set`)

### 1. Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => …)` in `background/chrome.js` (L21). `message` is an externally-sent message. The manifest declares `externally_connectable.matches: ["https://www.instagram.com/*"]`, so a page running in the `https://www.instagram.com` origin can invoke `chrome.runtime.sendMessage(EXT_ID, msg)`. There is no fixed `sender.id` extension-ID allowlist anywhere in the listener. The only origin check is `sender.origin === "https://www.threads.net"`, and that check gates **only** the threads branch — the storage-write branch is the *else* branch and has no unforgeable guard.

This is the classic "externally_connectable with a specific host is exploitable via XSS" case: an XSS (or any script executing in `instagram.com` origin) supplies arbitrary `message.data`.

### 2. Source → sink data path
From the minified source (verified with `read_minified_range`):

```
onMessageExternal.addListener((message, sender, sendResponse) => {
  let {type, data, api} = message;
  return sender.origin === 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background/chrome` [BG_1] @ L21:C3136 -> L21:C3531
- **Sink**: `FETCH_RESOURCE` in `content/index` [CS_1] @ L70:C3230 -> L70:C3300
- **Bridge**: storage `STORAGE_FLOW[area: local, key: reels_media, sender: background/chrome, receiver: content/index]`
- **Severity evidence**: ['https://www.instagram.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the full chain in the actual source. Here is my analysis.

## 1. Source controllability — CONFIRMED (with XSS prerequisite)

The real source is `chrome.runtime.onMessageExternal` in `background/chrome.js` L21 (C4144–4151), not the internal `onMessage` handler that the summary anchor initially pointed at:

```js
chrome.runtime.onMessageExternal.addListener((message,sender,sendResponse)=>{
  let{type,data,api}=message;
  return sender.origin==="https://www.threads.net"
    ? (threads branch…)
    : (async()=>{
        if(type==="stories"){…}
        else try{
          let jsonData=JSON.parse(data);
          switch(api){
            …
            case"/api/v1/feed/reels_media/?reel_ids=":
              let{reels,reels_media}=await chrome.storage.local.get(["reels","reels_media"]),
              newArr=(reels_media||[]).filter(i=>!jsonData.reels_media.find(j=>j.id===i.id));
              chrome.storage.local.set({reels:Object.assign({},reels,data.reels),
                reels_media:[...newArr,...jsonData.reels_media]});
              break;
          }
        }catch{}
        sendResponse()
      })(), !0)
});
```

- `externally_connectable.matches = ["https://www.ins

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
