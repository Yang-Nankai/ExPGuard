# ExPAgent Static Verification — gelkmljpoacdjkjkcfekkmgkpnmeomlk v2.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 17  |  Verified: 2
- Coverage: node=0.975, scope=1
- Flow types: {'STORAGE_POSOING': 1, 'REQUEST_FORGERY': 16}  |  Severities: {'MEDIUM': 17}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L437:C49 -> L437:C56
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L445:C50 -> L445:C162
- **Severity evidence**: ['https://scratch.mit.edu/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Summary

**Flow under review:** `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_RESOURCE`/`FETCH_BODY` in `background.js` (REQUEST_FORGERY).

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener` at `background.js:434`. The listener receives the full `request` object from any origin permitted by the manifest's `externally_connectable.matches`, which is `https://scratch.mit.edu/*`. There is **no `sender.id` allowlist and no `sender.origin`/`sender.url` check** anywhere (confirmed by search: only the two `onMessageExternal` registrations exist, neither validates `sender`). The `request.meta` branching values are attacker-chosen message fields, not a trust anchor.

Because `externally_connectable` is pinned to `scratch.mit.edu`, the practical trigger requires executing script on that origin (e.g., an XSS there or the page/CS bridge), but that restriction narrows scope rather than eliminating the flow.

### (b) Source-to-sink path
The report propagation is unbroken:
- L437 `request` (external message object) →
- L438/443/447/… branch on `request.meta` →
- L440, L445, L448, L459, L462, L467, L474, L481, L486, L488, L490, L495, L500, L30

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L437:C49 -> L437:C56
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L462:C20 -> L462:C217
- **Severity evidence**: ['https://scratch.mit.edu/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {...})` at background.js L434. The listener accepts messages from any page in `externally_connectable.matches: ["https://scratch.mit.edu/*"]`. There is **no sender guard** — no `sender.id` allowlist, no `sender.origin`/`sender.url` check, and the dispatch is driven entirely by the attacker-chosen `request.meta` field. So every `request.*` field is controlled by whatever code runs on a scratch.mit.edu origin (XSS on that origin, a compromised page, or a malicious page hosted there).

**(b) Source→sink path.**
Unbroken, and confirmed in raw source. `request` → `request.meta == 'projectSavedJSON'` branch (L460) → `fetch(...)` at L462:

```js
fetch(`${apiUrl}/projectSavedJSON/${request.blId}/${request.version}`, {
    method: 'POST', body: request.json,
    headers: { 'Content-Type': 'application/json', authorization: currentBlToken, uname }
});
```

No sanitizer, validation, or allow-list touches `request.blId`, `request.version`, or `request.json`. The propagation report shows direct member-element/object-setProperty flow into the fetch URL a

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
