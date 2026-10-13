# ExPAgent Static Verification — hnlpidgbnmikgkmccephgaljihheckii v1.1.92

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.223, scope=0.184
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/background-script.ts-Bo6ccuRN` [BG_1] @ L3:C6237 -> L3:C6238
- **Sink**: `FETCH_BODY` in `assets/background-script.ts-Bo6ccuRN` [BG_1] @ L3:C18423 -> L3:C18611
- **Severity evidence**: ['*://*.next.medicuja.de/*']
- **Source report Flow ID**: `8`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to render a verdict. Let me summarize my analysis.

## Four-part decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((e={},t)=>{ ... we(e) })` in the background service worker (`assets/background-script.ts-Bo6ccuRN.js`, L3 ~C6237). The message object `e` is fully attacker-controlled from any page/origin permitted by `externally_connectable` (`*://next.amboss.com/*`, `*://*.next.medicuja.de/*`). There is **no `sender.id` allowlist** — only `sender.url` regex checks (`/.next.medicuja.de/.test(t.url) || /next.amboss.com/.test(t.url)`), which are web-origin checks that are exploitable via XSS on those domains (or a subdomain under the wildcard `*.next.medicuja.de`). Source is genuinely attacker-reachable with that XSS/subdomain prerequisite.

**(b) Exact source-to-sink path**
The handler calls `we(e)`, which I read directly:
- builds `w` from `e.createdAt, e.eid, e.hasAccess, e.locale, e.profession, e.speciality, e.stage, e.studyObjective, e.currentPath`;
- `d.set({linkedNextUsers:[w,...]})` (storage write);
- then `.then(() => l("lifeCycleContext", { event: L, properties: { linked_users: b.map(r => ({...attacker fields

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
