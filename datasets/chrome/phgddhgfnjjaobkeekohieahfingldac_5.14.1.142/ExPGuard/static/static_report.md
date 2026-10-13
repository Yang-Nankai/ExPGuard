# ExPAgent Static Verification — phgddhgfnjjaobkeekohieahfingldac v5.14.1.142

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.95, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `content-script` [CS_1] @ L66:C25 -> L66:C33
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L88:C2 -> L88:C80
- **Bridge**: message `runtime.single.sender.message[content-script->background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (STORAGE_POSOING)

### 1. Who controls the source

The source is `e.detail` at `content-script.js:66` inside:

```js
document.addEventListener('fdWebExtension.multipleConnectionSupport', e => {
  var obj = JSON.parse(e.detail);
  var isSupported = obj.supported;
  chrome.runtime.sendMessage({message: "MultipleConnectionSupport", supported: isSupported});
});
```

The content script runs on `http://*/*`, `https://*/*`, and `file:///*` in the **ISOLATED** world but listens on the shared `document`. Any page script (the page's own main-world JS) can dispatch this same named `CustomEvent` on `document` and fully control `e.detail`. `fd-web-connector.js:341-344` shows the extension's own page-side code dispatching exactly this event, confirming the page→content-script CustomEvent bridge is real. There is no `event.source`/origin/sender authentication, and CustomEvent `detail` is attacker-forgeable (harness confirms this).

**Source is genuinely attacker-controllable.**

### 2. Source-to-sink path

1. Page dispatches `fdWebExtension.multipleConnectionSupport` with attacker JSON `detail`.
2. `content-script.js:66` → `JSON.parse(e.detail)`, `:67` → `obj.supported

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
