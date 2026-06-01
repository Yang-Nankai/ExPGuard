---
name: add-taint-policy
description: Add a new taint source, sink, or sanitizer to ExPGuard's taint engine. Use when the user asks to "add a source/sink", "support Chrome API X for taint analysis", or extend taint coverage. Covers naming conventions, the constants/classification/policy files that must stay in sync, and the test fixture pattern under `samples/`.
---

# add-taint-policy

ExPGuard's taint engine is data-driven: sources and sinks are enumerated as string-literal unions and grouped into capability classes. Adding a new one is a 3- or 4-file edit. This skill walks through the exact files and the order to touch them.

## Files involved

| File | Purpose |
|---|---|
| `src/taint/types.ts` | The `SourceType` / `SinkType` string-literal unions and capability enums |
| `src/constants/taint.ts` | Capability groupings (`ATTACKER_SOURCES`, `CODE_SINKS`, …) — every `SourceType` / `SinkType` must appear in exactly one group |
| `src/taint/policy.ts` | `classifySource` / `classifySink` dispatch on those groupings; frame-family filters live here too |
| `src/taint/manager.ts` | Matches AST patterns → emits the typed source/sink at a `FlowNode` |
| `samples/<your-fixture>/` | A minimal extension that exercises the new flow end-to-end |

## Procedure

### 1. Pick the canonical name

Names are `SCREAMING_SNAKE_CASE` and namespaced by API surface:

- Chrome APIs: `CHROME_<NAMESPACE>_<MEMBER>` (e.g. `CHROME_COOKIES_INFO`, `CHROME_TABS_CAPUTURE_VISIBLE_TAB`)
- Web APIs on `navigator`: `NAVIGATOR_<MEMBER>` (e.g. `NAVIGATOR_GEOLOCATION`)
- DOM globals: `DOCUMENT_<MEMBER>`, `SCREEN_<MEMBER>`, `ELEMENT_<KIND>`
- Library shims: `<LIB>_<MEMBER>` (e.g. `JQUERY_ELEMENT_VAL`)

Match neighbour entries — don't invent a new prefix unless the API has no analogue.

### 2. Edit `src/taint/types.ts`

Add the literal to the appropriate union (`SourceType` or `SinkType`). Keep grouped comments aligned with the existing block layout.

### 3. Edit `src/constants/taint.ts`

Add the literal to one capability bucket. Every name must appear in exactly one bucket — `classifySource` / `classifySink` fall through to `UNKNOWN_SOURCE` / `UNKNOWN_SINK` otherwise.

| Capability bucket (sources) | Use for |
|---|---|
| `ATTACKER_SOURCES` | data the attacker influences (message events, postMessage, URL hash) |
| `SENSITIVE_SOURCES` | privacy-relevant user data (cookies, history, bookmarks, identity tokens) |
| `SYSTEM_SOURCES` | host/system fingerprint (CPU, memory, display, fonts) |
| `NETWORK_SOURCES` | response data from fetch/XHR |
| `DOCUMENT_SOURCES` | page DOM/text/markup |
| `STORAGE_SOURCES` | `chrome.storage`, `localStorage`, IndexedDB reads |

| Capability bucket (sinks) | Use for |
|---|---|
| `CODE_SINKS` | `eval`, `Function`, dynamic script injection |
| `NETWORK_SINKS` | outbound fetch/XHR/sendBeacon |
| `MESSAGE_SINKS` | `chrome.runtime.sendMessage`, `postMessage` egress |
| `DOM_SINKS` | `innerHTML`, `document.write` |
| `STORAGE_SINKS` / `WEB_STORAGE_SINKS` | persistent writes |
| `PRIVILEGED_SINKS` | `chrome.tabs.executeScript`, `chrome.scripting.*` |

### 4. (Maybe) edit `src/taint/policy.ts`

You only touch this file if the new source/sink needs cross-frame filtering that isn't already implied by its capability — e.g. it should be suppressed when the source frame is `BG` but the sink is in `CS`. Mirror `shouldFilterSourceByFrame` for the new case rather than adding a parallel function.

### 5. Edit `src/taint/manager.ts`

Add the AST-pattern → typed-source/sink binding. This is where `esquery` selectors or hand-written `acorn-walk` visitors map matched calls to the literal you added in step 2. Use existing entries as templates — pattern shapes are non-obvious, so copy the closest one.

### 6. Add a fixture under `samples/`

A new source or sink without a sample is silently dead code. Create `samples/<descriptive-name>/` with a minimal `manifest.json` + script that triggers the new flow exactly once. Pattern after `samples/privilege_execution/` (background + content + utils + manifest).

### 7. Verify

```bash
npx tsc                     # types compile, every literal classified
npm test                    # jest --runInBand
node dist/main.js analyze --type=DIR --input=./samples/<your-fixture>/ \
  --out=./output/<your-fixture> --id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --version=1.0
```

The new flow should appear in the resulting report under the capability bucket you assigned. If it doesn't, the AST pattern in step 5 is the most likely culprit — capability/type wiring failures show up at `tsc` time.

## Anti-patterns

- **Don't** add a literal without putting it in a capability bucket. `classifySource` will return `UNKNOWN_SOURCE` and the flow will be filtered out downstream.
- **Don't** add a sink that's really a sanitizer (e.g. `encodeURIComponent`). Sanitizers live in a separate constraint mechanism — ask before extending.
- **Don't** modify samples to make a flow appear; the sample exists to *exercise* policy, not to prove it.
