# ExPAgent Static Verification — bbaogjaeflnjolejjcpceoapngapnbaj v7.1.5.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 4  |  Verified: 4
- Coverage: node=0.363, scope=0.456
- Flow types: {'REQUEST_FORGERY': 4}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 4 flow(s): 1 true-positive, 1 false-positive, 0 partial-available (PA), 2 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.ts-Cd05R5Gr` [BG_1] @ L1:C41971 -> L1:C41972
- **Sink**: `FETCH_RESOURCE` in `assets/index.ts-Cd05R5Gr` [BG_1] @ L1:C666 -> L1:C782
- **Severity evidence**: ['https://*.fireapps.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me lay out the decision ledger from the source report + the raw minified source I inspected.

**(a) Who controls the source** — `chrome.runtime.onMessageExternal.addListener((async(o,c,d)=>{const{type:l,action:u,settings:m,aliExpressUrl:g="",rawDomain:p,token:y}=o; …` at L1:C41971. The message object `o` is external input; the manifest gates it by `externally_connectable.matches` (fireapps.io, alireviews.io, shopify admin, etc.). So the *source* is genuinely attacker-influenceable (subject to the origin list / XSS on those origins). Up to here the finding is plausible.

**(b) The exact path** — The message fields are destructured and consumed **only** through imported helper functions:
- `d(l)` (sendResponse), `t(p)` (GET_AUTH_TOKEN), `a({rawDomain:p,token:y})` (SET_AUTH_TOKEN),
- `n(g,m)` + `i(m,…)` + `s(g,m)` (GET_REVIEW_ALIEXPRESS).

None of the flagged sink anchors is one of these calls; `t/a/n/i/s` live in `./helpers-CbLPSmmg.js`, not in `assets/index.ts-Cd05R5Gr`.

**(c) The flagged sink argument** — `FETCH_RESOURCE` at L1:C666–C782 is literally the *literal body* of function `X`:
```
const X=e=>{chrome.scripting.executeScript({target:{tabId:e},wor

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🟡 UNCERTAIN  (REQUEST_FORGERY / HIGH, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.ts-Cd05R5Gr` [BG_1] @ L1:C41971 -> L1:C41972
- **Sink**: `FETCH_BODY` in `assets/index.ts-Cd05R5Gr` [BG_1] @ L1:C54497 -> L1:C54623
- **Severity evidence**: ['https://*.fireapps.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — 🟡 UNCERTAIN  (REQUEST_FORGERY / HIGH, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.ts-Cd05R5Gr` [BG_1] @ L1:C41971 -> L1:C41972
- **Sink**: `FETCH_BODY` in `assets/index.ts-Cd05R5Gr` [BG_1] @ L1:C3156 -> L1:C3281
- **Severity evidence**: ['https://*.fireapps.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.ts-Cd05R5Gr` [BG_1] @ L1:C41971 -> L1:C41972
- **Sink**: `FETCH_BODY` in `assets/index.ts-Cd05R5Gr` [BG_1] @ L1:C4145 -> L1:C4270
- **Severity evidence**: ['https://*.fireapps.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #3 (REQUEST_FORGERY, `attacker-input-network-send`)

**Ledger**

**(a) Who controls the source.** The source is the message object `o` of `chrome.runtime.onMessageExternal.addListener((async(o,c,d)=>{const{type:l,action:u,settings:m,aliExpressUrl:g="",rawDomain:p,token:y}=o; …})` (confirmed verbatim at L1:C41930+). The sender parameter `c` is never used for any check in the handler — no `sender.id`, no `sender.origin`, no fixed-ID allowlist. Reachability is governed solely by the manifest's `externally_connectable.matches`, which is a set of **wildcard web origins** (`https://*.fireapps.io/*`, `*.alihunter.io/*`, `*.alireviews.io/*`, `*.alireviews.dev/*`, `*.onecommerce.io/*`, `admin.shopify.com/*`, `*.myshopify.com/admin/*`, `aliorders.io/*`, `*.kudosi.ai/*`, `*.kudosi.dev/*`). Per the trust rules, an origin restriction of this kind is *not* an unforgeable IPC boundary — it is reachable by any script running on one of those origins (XSS / subdomain takeover on the wildcard domains). The harness confirms `authenticatedExtensionAllowlist: null`.

**(b) The source→sink path.** The destructured attacker fields (`settings`, `aliExpressUrl`, `rawDomain`, `token`) 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
