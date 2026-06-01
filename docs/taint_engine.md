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

`getFlowType(source, sink)` maps a `(SourceCapability, SinkCapability)` pair to a `FlowType`:

| Source capability | Sink capability | FlowType |
|-------------------|-----------------|----------|
| ATTACKER_INPUT | PRIVILEGED_OPERATION | `PRIVILEGE_ESCALATION` |
| ATTACKER_INPUT | STORAGE_WRITE | `STORAGE_POSOING` |
| ATTACKER_INPUT | NETWORK_SEND | `REQUEST_FORGERY` |
| ATTACKER_INPUT | CODE_EXECUTION | `CODE_INJECTION` |
| ATTACKER_INPUT | MESSAGE_RESPONSE (filtered) | `PRIVILEGE_ESCALATION` |
| SENSITIVE_DATA | MESSAGE_RESPONSE | `DATA_LEAK` |
| SYSTEM_INFO | MESSAGE_RESPONSE | `DATA_LEAK` (navigator.* are excluded; raw fingerprint leaks are too noisy) |
| NETWORK_RESPONSE | CODE_EXECUTION | `CODE_INJECTION` |
| NETWORK_RESPONSE | PRIVILEGED_OPERATION | `PRIVILEGE_ESCALATION` |
| NETWORK_RESPONSE | STORAGE_WRITE | `STORAGE_POSOING` |
| WEB_CONTENT | CODE_EXECUTION | `CODE_INJECTION` |
| WEB_CONTENT | PRIVILEGED_OPERATION | `PRIVILEGE_ESCALATION` |
| STORAGE_DATA | MESSAGE_RESPONSE | `DATA_LEAK` |

`filterMessageTaint(source, sink)` suppresses obvious safe pairs (e.g. `WINDOW_MESSAGE_EVENT` → `WINDOW_POSTMESSAGE` is treated as expected bus traffic, not a privilege escalation).

Native messaging endpoints (`CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL`, `CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE`) are excluded entirely — `isNativeOutputSink` / `isNativeOutputSource` short-circuit `getFlowType`.

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
