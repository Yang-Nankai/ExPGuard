# ExPAgent Static Verification — jlalnhjkfiogoeonamcnngdndjbneina v5.0.22

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- Coverage: node=0.161, scope=0.271
- Flow types: {'STORAGE_POSOING': 3, 'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 4}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/background` [BG_1] @ L1:C59071 -> L1:C59072
- **Sink**: `CHROME_LOCAL_STORAGE` in `scripts/background` [BG_1] @ L1:C41768 -> L1:C41817
- **Severity evidence**: ['https://ai-toolbox.co/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the full path in the real minified source. Here's my verification.

## Decision ledger

**(a) Who controls the source — confirmed**
`chrome.runtime.onMessageExternal.addListener((e,t,r)=>{...})` in `scripts/background.js`. This listener is reachable by web pages matched in `externally_connectable.matches`, i.e. `https://ai-toolbox.co/*` and `https://www.ai-toolbox.co/*`. There is no `sender.id` allowlist (manifest `authenticatedExtensionAllowlist: null`), so the trust boundary is origin-based, not browser-authenticated extension-ID IPC.

**(b) Source-to-sink path — confirmed**
Real code:

```js
chrome.runtime.onMessageExternal.addListener((e,t,r)=>{
  try{
    return t.origin&&vt.has(t.origin)
      ? "TEAM_SESSION"===e?.type
        && "string"==typeof e.accessToken
        && "string"==typeof e.refreshToken
        ? (Ge(e.accessToken,e.refreshToken).then(()=>r({ok:!0})).catch(()=>r({ok:!1})), !0)
        : ...
```

and

```js
const Me="teamAccessToken",Ue="teamRefreshToken",ve="teamMemberMarker";
async function Ge(e,t){await chrome.storage.local.set({[Me]:e,[Ue]:t,[ve]:!0})}
```

So: external message `e.accessToken` / `e.refreshToken` → `Ge(e.accessToken, e.refres

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/background` [BG_1] @ L1:C59071 -> L1:C59072
- **Sink**: `FETCH_BODY` in `scripts/background` [BG_1] @ L1:C60055 -> L1:C60218
- **Bridge**: storage `STORAGE_FLOW[area: local, key: teamRefreshToken, sender: scripts/background, receiver: scripts/background]`
- **Severity evidence**: ['https://ai-toolbox.co/*']
- **Source report Flow ID**: `8`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I inspected the source-level report and confirmed the relevant minified code in `scripts/background.js`.

## Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal`. The listener is gated by:

```js
t.origin && vt.has(t.origin)
```

where:

```js
vt = new Set(["https://ai-toolbox.co","https://www.ai-toolbox.co","http://localhost:3001"])
```

`externally_connectable.matches` additionally restricts web senders to `https://ai-toolbox.co/*` and `https://www.ai-toolbox.co/*`. This is an exact web-origin allowlist, **not** a browser-authenticated fixed `sender.id` allowlist. Per the harness rules, exact `sender.origin` equality against a web origin is not an unforgeable trust boundary: XSS or control of `ai-toolbox.co` can send the message. So the source is attacker-controllable, subject to the XSS/compromise prerequisite on the allowlisted web origins.

**(b) Exact source-to-sink path**
Unbroken:

1. External page sends `{type:"TEAM_SESSION", accessToken:"...", refreshToken:"..."}`.
2. Listener branch:

```js
"TEAM_SESSION"===e?.type &&
"string"==typeof e.accessToken &&
"string"==typeof e.refreshToken
? (Ge(e.accessToken, e.refreshToken).then(.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
