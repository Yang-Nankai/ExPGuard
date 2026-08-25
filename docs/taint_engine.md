# Taint Engine

Files: `src/taint/`.

## Singleton

`src/taint/index.ts` exports `taintManager = new TaintManager()`. The engine is single-instance — `enterFile(script)` / `exitFile()` switch the active per-file `TaintContext` while the rest of the pipeline runs.

## Per-file TaintContext

`src/taint/context.ts:11`

```
TaintContext
  filename            : ScriptKey
  script              : ExtensionScript
  sources             : TaintSource[]
  paths               : TaintPathRecord[]      ← rebuilt from pathDag on demand
  sinks               : TaintSinkRecord[]
  sanitizers          : TaintSanitizerRecord[]
  defToTaintIds       : Map<defId, Set<taintId>>
  knownTaintIds       : Set<number>
  sourceKeyToTaintId  : Map<sourceKey, taintId>   ← dedup by (sourceType@range#remark)
  pathDag             : Map<taintId, Map<edgeKey, TaintPathRecord>>
```

`syncPathsFromDag()` collapses the DAG into the flat `paths[]` consumed by reports.

## Operations

### `createTaintSource(def, SourceType, astNode, isPseudo?, remark?)`

- Builds a stable source key (`<SourceType>@<rangeStart>:<rangeEnd>[#remark]`); reuses the existing `taintId` if seen before.
- Records the source under the current context if new.
- Marks `def` tainted and stores `taintId` in `defToTaintIds`.

### `propagateTaint(from, to, astNode, PropagateType, remark)`

- No-op if `from` is null / untainted or `from.uniqueId === to.uniqueId`.
- For every `taintId` currently on `from`, add `taintId` to `to`'s set and append an edge to `pathDag[taintId]` keyed by `<fromId>-><toId>@<range>`.

### `checkSink(def, SinkType, astNode, remark?, urlTaintControl?)`

- For every `taintId` on `def`, push a `TaintSinkRecord`.
- Optional `urlTaintControl ∈ {"FULL", "PARTIAL"}` flags whether the taint dictates the entire URL or just a fragment (inferred via `inferUrlTaintControl` in built-in helpers).

### `applySanitizer(def, sanitizerName, astNode)`

- For every `taintId` on `def`, remove the id, record a `TaintSanitizerRecord`, and clear the def's taint flag once empty.

### Storage modelling (`recordStorageSet` / `recordStorageGet`)

Storage is special because chrome.storage flows across files asynchronously.

- `chrome.storage.<area>.set({k:v})` calls `recordStorageSet(area, k, valueDef, astNode)` *and* `checkSink(value, CHROME_*_STORAGE, ...)` — covering Storage Poisoning at write time.
- `chrome.storage.<area>.get(k)` immediately creates a *pseudo* `PSEUDO_STORAGE` source on the returned def and records the `(area, key)` pair with the taintId.
- At report time, `resolveStorageTaints()` matches every Get against every prior Set with the same `(area, key)`:
  - Mints a synthetic taint id with the original `SourceType` (so a `DOCUMENT_URL` written into storage and read back stays `DOCUMENT_URL`).
  - Clones the sender's propagation DAG into the receiver context with a `STORAGE` edge bridging the two.
  - Merges the receiver's pseudo paths and sinks onto the synthetic id, so downstream sinks in the receiver are also reported.

This is how the bookmark-flow demo surfaces 2 issues in `background.js`: one for the direct message channel, one for the storage roundtrip.

### Pseudo-taint bridges (`InterContextBridge`)

Message channels create deferred sender/receiver pairs identified by a channel name plus optional `outer` (external extension id or origin).

| Channel name | Built-in pair |
|--------------|---------------|
| `runtime.single.sender.message` | `chrome.runtime.sendMessage` → `chrome.runtime.onMessage.addListener` |
| `runtime.single.response.message` | `chrome.runtime.onMessage.addListener` `sendResponse` → `chrome.runtime.sendMessage` callback |
| `runtime.connect.sender.message` | port `postMessage` → port `onMessage.addListener` |
| `runtime.connect.response.message` | reverse direction |

`addPseudoTaintSender(sender)` / `addPseudoTaintReceiver(receiver)` register endpoints. Bridges are eagerly resolved as soon as a matching pair is registered:

- If the receiver was registered with a `deferredMessage.invoke(msgDef)` callback (the typical handler shape), the manager temporarily switches active context to the receiver and runs `interAnalyzer.analyze(...)` with the sender's tainted `Def` as the `message` argument. This lets downstream propagation/sinks in the receiver be discovered with the real source.
- Otherwise the legacy path mints a synthetic id, clones the sender's DAG into the receiver, and adds a `MESSAGE` edge between contexts.

`PSEUDO_*` sources are stripped from final reports — only the resolved synthetic flows surface.

## Policy

`src/taint/policy.ts` answers two questions per flow:

### Should this script appear in the report?

`shouldIncludeScriptInPolicy(scriptKey)` — true unless `config.filterUnusedRuntimeScripts` is set and the script was never marked used (orphan helpers).

### Is the flow real?

`shouldFilterSourceByFrame(source, sourceFrame, sink, sinkFrame)`:

- Drops `WEB_EVENT_SOURCES` (`WINDOW_MESSAGE_EVENT`, `WINDOW_CUSTOM_EVENT`, `TARGET_CUSTOM_EVENT`) when the source frame is `BG` (background scripts can't receive web-page messages).
- Drops CS-to-CS flows into `WEB_STORAGE_SINKS` (web storage is co-origin with the page — not interesting taint from the same CS).

### What flow type?

`getFlowTypes(source, sink): FlowType[]` is the engine-facing API; `getFlowMatches(source, sink): RuleMatch[]` adds rule provenance. Both delegate to the **`TaintRuleEngine`** singleton in `src/taint/ruleEngine.ts`, which evaluates a user-extensible JSON rule set.

The bundled default rule file (`src/taint/rules/default-rules.json`) covers the following matrix. The last two rows are only safe to include because the **privilege-delta gate** (below) decides their exploitability separately:

| Source capability | Sink capability | FlowType |
|-------------------|-----------------|----------|
| ATTACKER_INPUT | PRIVILEGED_OPERATION | `PRIVILEGE_ESCALATION` |
| ATTACKER_INPUT | STORAGE_WRITE | `STORAGE_POSOING` |
| ATTACKER_INPUT | NETWORK_SEND | `REQUEST_FORGERY` |
| ATTACKER_INPUT | CODE_EXECUTION | `CODE_INJECTION` |
| ATTACKER_INPUT | MESSAGE_RESPONSE (filtered) | `PRIVILEGE_ESCALATION` |
| SENSITIVE_DATA | MESSAGE_RESPONSE | `DATA_LEAK` |
| SYSTEM_INFO | MESSAGE_RESPONSE | `DATA_LEAK` (navigator.*/screen.* suppressed) |
| NETWORK_RESPONSE | CODE_EXECUTION | `CODE_INJECTION` |
| NETWORK_RESPONSE | PRIVILEGED_OPERATION | `PRIVILEGE_ESCALATION` |
| NETWORK_RESPONSE | STORAGE_WRITE | `STORAGE_POSOING` |
| WEB_CONTENT | CODE_EXECUTION | `CODE_INJECTION` |
| WEB_CONTENT | PRIVILEGED_OPERATION | `PRIVILEGE_ESCALATION` |
| STORAGE_DATA | MESSAGE_RESPONSE | `DATA_LEAK` |
| WEB_CONTENT | NETWORK_SEND | `DATA_LEAK` (gated by privilege delta) |
| WEB_CONTENT | STORAGE_WRITE | `STORAGE_POSOING` (gated by privilege delta) |

Default suppress rules also reproduce the original carve-outs:

- Native messaging endpoints (`CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL`, `CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE`) are blanket-suppressed.
- `navigator.*` / `NAVIGAROR_*` / `SCREEN_INFO` are suppressed for `DATA_LEAK` only (other flow types still apply).
- "Safe message pairs" (e.g. `WINDOW_MESSAGE_EVENT` → `WINDOW_POSTMESSAGE`, `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `…_SENDRESPONSE`) are suppressed entirely.

#### Resolution model

The engine uses **all-match**: a single `(source, sink)` pair may produce multiple FlowTypes if multiple inclusive rules match (e.g. a user-added "cookies → fetch body = DATA_LEAK" rule coexists with the built-in `REQUEST_FORGERY` rule). Each match emits its own record in `summary.json` with `ruleId` and `ruleDescription` set so analysts can trace which rule fired.

#### Adding custom rules

Two layering knobs:

- `config.taintRulesPath` — set in `src/config.ts` to a default path
- `--taint-rules <path>` CLI flag — overrides for one run

User rules are *layered on top* of the defaults (additive). To replace the defaults wholesale, use `taintRuleEngine.setRuleSet({ version: 1, rules: [...] })` programmatically.

Minimal JSON example:

```json
{
  "version": 1,
  "rules": [
    {
      "id": "sensitive-data-network-send",
      "description": "Cookies / bookmarks / history exfiltrated via fetch / XHR / WebSocket",
      "flowType": "DATA_LEAK",
      "match": {
        "sourceCapability": "SENSITIVE_DATA",
        "sinkCapability": "NETWORK_SEND"
      }
    }
  ],
  "suppress": [
    {
      "id": "ignore-bookmarks-create-self",
      "description": "We invoke bookmarks.create from our own background as part of normal operation; suppress that one pair.",
      "flowType": "PRIVILEGE_ESCALATION",
      "match": {
        "sourceType": "CHROME_ONMESSAGEEXTERNAL_MESSAGE",
        "sinkType": "CHROME_BOOKMARK_CREATE_INFO"
      }
    }
  ]
}
```

Matcher fields (all AND'd, all optional except the don't-match-everything rule):

- `sourceCapability` / `sinkCapability` — one of the union types in `src/taint/types.ts` (single value or array)
- `sourceType` / `sinkType` — exact type name or a `*`-glob (e.g. `"NAVIGATOR_*"`, `"CHROME_BOOKMARK_*"`). Single value or array (any-of).

Suppress rules accept the same matcher shape plus an optional `flowType`: present → scoped suppress (only that flow type), absent → blanket suppress (drops every emission for the pair).

#### TS / JS escape hatch

For dynamic rule generation (computed values, shared constants, conditional rules), point `--taint-rules` at a `.ts` / `.js` file that exports a `TaintRuleSet`:

```ts
// my-rules.ts
import type { TaintRuleSet } from "expguard/taint/ruleTypes";
const HIGH_VALUE_SINKS = ["FETCH_RESOURCE", "FETCH_OPTIONS", "XML_HTTP_REQUEST_SEND"];
const rules: TaintRuleSet = {
  version: 1,
  rules: [{
    id: "sensitive-to-high-value-sinks",
    flowType: "DATA_LEAK",
    match: { sourceCapability: "SENSITIVE_DATA", sinkType: HIGH_VALUE_SINKS },
  }],
};
module.exports = rules;
```

The loader accepts `module.exports = rules`, `module.exports.default = rules`, or an inline `module.exports = { version: 1, rules: [...] }`.

Native messaging endpoints (`CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL`, `CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE`) are excluded entirely via blanket suppress rules in the default file.

## Privilege delta

`src/taint/privilege.ts` runs after the rule engine and the frame filter, and
answers a different question: **does this flow actually cross a privilege
boundary?**

A rule match proves a source→sink data flow exists. That is necessary but not
sufficient to call something a vulnerability — the sink has to grant the data's
origin some capability it did not already have. Two patterns dominated the
low-value findings on a 5,503-extension run (`STORAGE_POSOING` alone was 37% of
all reported flows):

1. **Page-equivalent sinks.** Page-controlled data (`WEB_CONTENT` /
   `ATTACKER_INPUT`) reaching a `NETWORK_SEND` or `DOM_WRITE` sink where *both*
   ends sit in a content-script frame. A content script's `fetch` carries the
   page's origin and a DOM write goes back into the page the data came from —
   the page could do either itself.
   `CODE_EXECUTION` is deliberately excluded: `eval` in a content script runs in
   the isolated world with `chrome.*` access. `STORAGE_WRITE` too: extension
   storage is outside the page's reach.
2. **Storage writes nothing reads back.** A `chrome.storage` key that is written
   but never read anywhere in the extension cannot poison a later decision.
   `TaintManager.hasStorageConsumer(area, key)` decides this from the recorded
   sets/gets, and is conservative: any wildcard read — `get(null)`, a get whose
   key could not be resolved statically, or a `storage.onChanged` listener —
   counts as a consumer for every key in that area.

Anything else crosses: every `chrome.*` privileged API, code execution, and any
hop out of the page's reach via messaging or extension storage.

Suppressed flows are **not discarded**. Each carries `privilegeCrossing` and
`privilegeReason`; the dropped set is available as
`taintManager.getPrivilegeSuppressedFlows()` and surfaces in `summary.json` as
`privilegeSuppressed` / `privilegeSuppressedCount`. Set
`config.privilegeDeltaFiltering = false` to report every rule match regardless
of exploitability (the fields are still populated, so consumers can triage).

This split is why the default rule set can carry `WEB_CONTENT → NETWORK_SEND`
and `WEB_CONTENT → STORAGE_WRITE` rules at all: the rule engine answers "is
there a flow", the gate answers "does it matter".

## Severity

`src/taint/constraintSeverity.ts` rates each flow:

- External-attack surface (sources / sinks involving `chrome.runtime.*External*`): evaluates `externally_connectable.matches` and `.ids`. Missing config or `"*"` in ids → `CRITICAL`; specific ids → `LOW`.
- Content-script web attack surface (`WINDOW_*` sources in a CS frame): evaluates `content_scripts[i].matches`:
  - `<all_urls>` → `CRITICAL`
  - `*://*/*` host wildcard → `CRITICAL`
  - `*.host` subdomain wildcard → `HIGH`
  - Specific host but wildcard path → `MEDIUM`
  - Specific host + path → `LOW`
  - `file://...` or loopback hosts are ignored (treated as not part of the public web attack surface)
- Anything else → `UNKNOWN` / `LOW`

Severity surfaces in `summary.json` as `severity`, `severityReason`, `severityEvidence`.

## Reporting

Two report shapes are produced:

### `generateGlobalReport(opts?)` → array of per-file reports

Each per-file report is rendered by `printTaintReportCLI` (`src/taint/report.ts`) into the human-readable `report.txt`. Truncation is governed by `config.taintReportOptions`:

- `level`: `"detailed"` (no truncation), `"partial"` (head + tail with omitted count), `"brief"` (1 head + 1 tail)
- `headCount` / `tailCount` / `maxFlowPerIssue`
- `includeCode` + `codeContextChars` — embed the source snippet with `>>>...<<<` markers around the relevant range

### `getGlobalSummary(opts?)` → flat flow list

`_collectFlowsLite` dedups by `(sourceType, sourceLoc, sinkType, sinkLoc, remark, urlControl)`. Each flow object contains:

```
flowType, sourceType, sinkType,
sourceFile, sourceFrame, sourceFrameConstraint, sourceFrames, sourceLoc,
sinkFile,   sinkFrame,   sinkFrameConstraint,   sinkFrames,   sinkLoc,
messagePassing (bool) + channel,
storagePassing (bool) + area,
constraintKind, severity, severityReason, severityEvidence,
sourceCode, sinkCode  (when includeCode is true)
```

Both APIs call `resolveStorageTaints()` first so storage-mediated flows are visible.

## Sanitizers

Default sanitizers come from the cryptographic primitives:

- `WebCrypto.hash` (`crypto.subtle.digest`)
- `WebCrypto.sign` (`crypto.subtle.sign`)
- `CryptoJS.HASH` (jQuery-CryptoJS hash family)

When applied, the *def* loses its taint flag for that source so any subsequent sink encountering the def is not reported as a flow. The sanitizer is still listed in the per-issue report so the analyst knows a flow was neutralised.

## Reset / cross-run state

`TaintManager.resetAll()` clears every context, bridge, resolved pair and resets the taint id generator. The `runSingleTask` runner does NOT call this — each new analyzer process gets a fresh manager by virtue of process boundaries.
