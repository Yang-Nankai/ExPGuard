# ExPAgent Static Verification — nbhfcmbdimdbbclfngkjfmgmjhnkjocl v4.1.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.954, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'MEDIUM': 1, 'UNKNOWN': 1}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 2 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / MEDIUM, confidence 0.30)

- **Source**: `ELEMENT_INNER_HTML` in `account` [CS_2] @ L1:C413 -> L1:C436
- **Sink**: `CHROME_LOCAL_STORAGE` in `account` [CS_2] @ L1:C53 -> L1:C87
- **Severity evidence**: ['https://account.alisave.app/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 4, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Four-part decision ledger

**(a) Who controls the source?**
The source is `ELEMENT_INNER_HTML` from `account.js` (content script, `CS_2`), specifically `document.getElementById("user")`'s `innerHTML` (and the `MutationObserver` path on `textContent`). This runs in an ISOLATED content-script world, but the DOM is shared with the page. A page script — or XSS on `https://account.alisave.app/*` — can freely set `#user.innerHTML` / insert text-node children. So the value is genuinely page/untrusted-controlled at runtime. The harness note confirms this: pages can mutate shared DOM values, and a content-script DOM read is not authentication.

**(b) Source-to-sink path**
Confirmed from the full minified line:

```
var e = function(e){ !0 !== e.loading && chrome.storage.local.set({user: e}).then(...) };
...
n = document.getElementById("user");
d = JSON.parse(n.innerHTML);   // source: page DOM
e(d);                          // direct call into the storage function
t.observe(n, {childList:!0});  // observer path: parse textContent -> e(d)
```

The report's propagation is correct: `#user` innerHTML → `JSON.parse` → `e(d)` → `chrome.storage.local.set({user: e})`. No cross-context hop is inv

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `DOCUMENT_LOCATION` in `contentButtons` [CS_3] @ L1:C29237 -> L1:C29238
- **Sink**: `CHROME_LOCAL_STORAGE` in `contentButtons` [CS_3] @ L1:C38316 -> L1:C38380
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 23, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (DOCUMENT_LOCATION → chrome.storage.local `logs`)

### Decision ledger

**(a) Who controls the source?**
`window.location.href` inside the content script is the page URL of the matched AliExpress/AliBaba page. The page controls the path/query/hash of that URL (within `*://*.aliexpress.*`), so it is web-content-controllable input. This is a valid `DOCUMENT_LOCATION` source.

**(b) Exact source-to-sink path?**
The report's source anchor points at the `v=function(e){return /^https:\/\/(?:[^\.]+\.)?aliexpress\./.test(e)}` helper, which is only a boolean gate. However, raw source inspection shows the **real data path**:

```
v(window.location.href) ? ... :
  K({ file:"buttonsBoot.jsx",
      message:"Cannot find AliExpress design.",
      url: window.location.href })          // real tainted argument
```

and `K` is:

```js
var K = function(e) {
  return chrome.storage.local.get("logs")
    .then(e => e.logs || [])
    .then(t => chrome.storage.local.set({
      logs: [].concat(J(t), [e]).slice(-250)
    }))
}
```

So the entire object containing `url: window.location.href` is stored under the `logs` key. The sink argument is not a constant and is not sanitize

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
