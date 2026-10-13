# ExPAgent Static Verification — 21681cbf10b2a519660257e880195e4dcb1b9dd@skrapp.io v2.6.1

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.999, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `DOCUMENT_COOKIE` in `keyContentScript.bundle` [CS_1] @ L1:C1705169 -> L1:C1705170
- **Sink**: `CHROME_LOCAL_STORAGE` in `keyContentScript.bundle` [CS_1] @ L1:C1706210 -> L1:C1706243
- **Severity evidence**: ['*://*.skrapp.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Summary

### (a) Source control — ATTACKER-CONTROLLABLE ✅
The content script is injected on `*://*.skrapp.io/*`. The source is `document.cookie`, read by the helper `U()`:

```js
const U = () => "undefined" == typeof document ? null : (A => {
  try {
    if (!A) return null;
    const M = A.split(";");
    for (const A of M) {
      const M = A.trim(), N = M.indexOf("=");
      if (-1 === N) continue;
      if ("ph_phc_AWAqsmqqtv6DKmiDD9iWkZyqFAqCTAYivVqwYarjmury_posthog" !== M.slice(0, N)) continue;
      const d = M.slice(N + 1);
      if (!d) return null;
      const V = decodeURIComponent(d), z = JSON.parse(V);
      return e(z) ? z.distinct_id : null;
    }
    return null;
  } catch { return null; }
})(document.cookie)
```

`document.cookie` is a page-controlled DOM value on the matched origin. A page on any `*.skrapp.io` host can set the exact cookie name `ph_phc_AWAqsmqqtv6DKmiDD9iWkZyqFAqCTAYivVqwYarjmury_posthog` with a URL-encoded JSON body containing a chosen `distinct_id`. The only validation (`e(z)`) checks that `z.distinct_id` is a non-empty string — trivially satisfiable by the attacker.

### (b) Source→sink path — UNBROKEN ✅
Confirmed from the minif

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
