# ExPAgent Static Verification — pabnknalmhfecdheflmcaehlepmhjlaa v0.7.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.984, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `worker` [BG_1] @ L254:C6 -> L254:C13
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `worker` [BG_1] @ L82:C4 -> L89:C6
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener` in the MV3 service worker (`worker.js`). Because `externally_connectable` is missing, other extensions can reach this listener by default. The `request` object is therefore attacker/external-extension controlled at L254. This part is genuine.

### (b) Exact source-to-sink path
The reported sink is `chrome.windows.create({...})` inside the local `job()` helper:

```js
const job = async (jobs, tab) => {
  ...
  args.append('jobs', JSON.stringify(jobs));
  chrome.windows.create({
    url: '/data/add/index.html?' + args.toString(),
    ...
  });
};
```

The only call to `job()` in the entire worker is:

```js
else if (request.method === 'open-jobs') {
  job(request.jobs);
}
```

But the external listener gate is:

```js
chrome.runtime.onMessageExternal.addListener((request, sender, response) => {
  if (request.method === 'add-jobs' || request.method === 'store-links') {
    onMessage(request, sender, response);
  }
});
```

`request.method === 'open-jobs'` is **not** in the allowed set `['add-jobs', 'store-links']`, so an external message can never enter the `open-jobs` br

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
