# ExPAgent Static Verification — egmjalgmmolinfenecmfaeognbjbiipi v3.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.607, scope=0.68
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.ts-S8W15SDc` [BG_1] @ L15:C91733 -> L15:C91734
- **Sink**: `CHROME_SYNC_STORAGE` in `assets/index.ts-S8W15SDc` [BG_1] @ L15:C92220 -> L15:C92494
- **Severity evidence**: ['https://appbox.space/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The raw minified source confirms the full flow. Let me lay out the decision ledger:

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((e, s, r) => ...)` — the first argument `e` is the message object supplied by any page allowed by `externally_connectable` (`https://appbox.space/*`). The message payload (`e.source`, `e.action`, `e.data`) is entirely sender-chosen. There is **no `sender.id` check**, so no browser-forged trust anchor.

**(b) Source-to-sink path (verified in raw source):**
```
e (external message)
  → if (s.url && s.url.includes("appbox.space"))      // bypassable substring + externally_connectable scope
    → if (e.source === "supabase-auth-adapter")        // attacker-chosen message field
      → switch(e.action)
        → case "setItem":
            const { key: i, value: a } = e.data;
            return chrome.storage.sync.set({ [i]: a }, ...)
```
Both the key (`i`) and value (`a`) are destructured directly from `e.data` and reach the sink unchanged.

**(c) Which security-relevant argument is attacker-controlled?**
The entire object written to `chrome.storage.sync.set` — computed property `[i]` and value `a` — is attacker-controlled. 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
