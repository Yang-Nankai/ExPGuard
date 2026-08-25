# Architecture

ExPGuard is a multi-pass static analyzer specialised for Chrome Extensions. It takes an extension in any of three forms — a `.crx` package, an unpacked directory, or a Chrome Web Store URL — and produces a taint report enumerating source→sink data flows.

## End-to-end flow

```
                ┌─────────────────────────────────────────┐
   user CLI ───►│  main.ts (commander) ── runSingleTask   │
                └────────────────────────┬────────────────┘
                                         │
                          ┌──────────────▼──────────────────┐
                          │     EPGModelBuilder.analyze     │
                          └──────────────┬──────────────────┘
                                         │
                                         ▼
   ┌──────────── Loader (CRX / DIR / WEB) ─────────────┐
   │  CrxExtractor / crxDownloader / copyDirectoryAsync│
   │  → unpacks into <out>/unpacked                    │
   └────────────────────────┬──────────────────────────┘
                            ▼
   ┌──────────────  ExtensionContext  ──────────────────┐
   │  - manifest.json (parsed)                          │
   │  - ScriptRegistry (every .js file)                 │
   │  - ScriptUsageTracker (CS_n / BG_1 frames,         │
   │    externally_connectable, exec ordering)          │
   └────────────────────────┬───────────────────────────┘
                            ▼
   ┌──────────  analyzeScriptsInOrder per script ──────────┐
   │                                                       │
   │  ScriptDependencyGraph ── topoSort ── pending queue   │
   │                                                       │
   │  for each script:                                     │
   │   1. parser.parseAST       (src/ast/jsParser.ts)      │
   │   2. astValidator + (opt) optimizeAST                 │
   │   3. scopeController.addPageScopeTree                 │
   │   4. modelController.addPageModels                    │
   │   5. modelBuilder.buildIntraProceduralModelsForAPage  │
   │       └─► cfgBuilder.getCFG (esgraph)                 │
   │   6. defuseAnalyzer.buildInterProceduralModelsPDG     │
   │       ├─ importAnalyzer       (link Defs across files)│
   │       ├─ featureModelAnalyzer (summarise helper fns)  │
   │       ├─ builtInAnalyzer      (bind globals / chrome.*)│
   │       ├─ functionDeclarationAnalyzer                  │
   │       ├─ reachingDefAnalyzer  (worklist on CFG)       │
   │       ├─ entryPointAnalyzer  (sweep unreached scopes) │
   │       └─ exportAnalyzer       (track re-exports)      │
   │   7. taintManager records sources, propagation edges, │
   │      sinks, sanitizers in a per-file TaintContext     │
   └────────────────────────┬──────────────────────────────┘
                            ▼
   ┌─────── TaintManager cross-context resolution ─────────┐
   │  - resolveStorageTaints (chrome.storage Set ↔ Get)    │
   │  - InterContextBridge (runtime/port message channels) │
   │  - privilege-delta gate (is a boundary crossed?)      │
   │  - generateGlobalReport → report.txt + summary.json   │
   └───────────────────────────────────────────────────────┘
```

## Layered responsibility

| Layer | Folder | Description |
|-------|--------|-------------|
| Loader | `src/loader/`, `src/extension/extensionLoader.ts` | Unpacks CRX, downloads from CWS, validates extension ID |
| Extension model | `src/extension/` | `ExtensionContext`, `ScriptRegistry`, `ScriptDependencyGraph`, `ScriptUsageTracker` (manifest → frames CS_n / BG_1 / UNKNOWN) |
| Parsing | `src/ast/` | `JSParser` (acorn / acorn-loose fallback), AST validator, pattern visitor, custom walker (`walkes`) |
| Transformation | `src/transformation/` | Optional optimization passes before analysis (escope, esmangle, dead code) |
| Scope | `src/scope/` | Scope tree with extension / page / function / block / for / switch / catch / with / class scopes |
| CFG | `src/cfg/` | `cfgBuilder` wraps esgraph; produces `CFGResult` with `FlowNode` linkage (normal / true / false / exception) |
| Model | `src/model/` | `Model` per scope (CFG + DU pairs + return def). `ModelCtrl` indexes them by ScopeTree |
| Def-Use | `src/def-use/` | Reaching definitions worklist, type / expression handlers, inter-procedural call analyzer, builtin registry |
| Taint | `src/taint/` | `TaintManager` (source/propagate/sink), `TaintContext` DAG, cross-context bridges, policy + severity classification |
| Built-in semantics | `src/def-use/builtins/builtinSemantics/{chrome,browser,js,library}/` | Per-API simulation (chrome.storage, document.getElementById, fetch, jQuery, axios, ...) |
| Utils | `src/utils/` | Filters, logger, file IO, cleanup, timers, worklist algorithm |

## Frames

Every script is tagged with a *frame*:

- `BG_1` — background service worker / background scripts / background.html scripts
- `CS_n` — n-th `content_scripts[]` entry
- `UNKNOWN` — script not referenced by manifest (e.g. helper lib pulled in via `import`)

Frames inherit through `import` / `importScripts` / `chrome.runtime.getURL` / `chrome.tabs.executeScript` / `chrome.scripting.executeScript`. The frame influences:

- **Filter policy** (`src/taint/policy.ts`): some WEB_EVENT sources from BG scripts are dropped as infeasible
- **Severity** (`src/taint/constraintSeverity.ts`): `content_scripts.matches` and `externally_connectable.matches/ids` produce LOW/MEDIUM/HIGH/CRITICAL ratings
- **Reporting** every issue carries `frame`, `frameConstraint`, full `frames` list

## How data flows through the analyzer

1. **`Def`** is the abstract value (`src/def-use/types/def.ts`). Variants: `ObjectDef`, `FunctionDef`, `LiteralDef`, `UnknownDef`, `BuiltInFunctionDef`, `PromiseDef`, `ImplicitDef`, `UndefinedDef`.
2. **Reaching definition analysis** runs a forward worklist over each CFG. For each FlowNode, `computeGenFromAST` walks the AST sub-tree and emits new `Def`s; `evaluatePureExpressions` short-circuits pure subtrees. The CFG is cyclic (loops carry back edges); termination comes from a per-node visit budget that doubles as the loop-unroll bound. See `docs/scope_def_use.md`.
   After the root pass, an **entry-point sweep** re-enters function scopes the main pass never reached (callbacks handed to unmodeled APIs), under its own time budget.
3. **Inter-procedural calls** are dispatched through `interAnalyzer.analyze(caller, callee, argDefs, thisDef, astNode)`:
   - Built-in functions (`BuiltInFunctionDef`) execute the semantic registered for their effect name (e.g. `"chrome.storage.local.set"`).
   - User functions get a new frame on the call stack; recursion / max-depth produce `UnknownDef` returns.
   - Side effects detected via a hash snapshot of reaching-defs before/after.
4. **Taint flow** is encoded entirely as a per-context DAG keyed by `taintId`:
   - `createTaintSource(def, SourceType, astNode, isPseudo, remark)` introduces a new id
   - `propagateTaint(from, to, astNode, PropagateType, remark)` adds an edge to every taintId currently on `from`
   - `checkSink(def, SinkType, astNode, remark, urlTaintControl)` materialises a `TaintSinkRecord`
   - `applySanitizer(def, name, astNode)` removes taint ids from a def and records a sanitizer entry
5. **Cross-context (message / storage)** is resolved lazily on report:
   - Pseudo taint receivers/senders sit on named channels (`runtime.single.sender.message`, `runtime.single.response.message`, `runtime.connect.sender.message`)
   - Storage sets/gets are matched on `(area, key)` and synthetic taints are minted in the receiver context with copied paths

## Output

For every run, the following files land in `--out`:

- `report.txt` — human-readable per-file taint report (`printTaintReportsCLI`)
- `summary.json` — flat list of flows (`getGlobalSummary`) plus run metadata, file stats, error info
- `analysis.log` — winston log file (level configurable in `src/config.ts`)
- `manifest.json` — copied from the unpacked extension (always retained)
- `unpacked/` — the extracted extension tree (retention policy in `config.artifactRetentionPolicy`)
