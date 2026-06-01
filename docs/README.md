# ExPGuard Documentation

This directory hosts component-level reference docs for ExPGuard's static taint analysis engine targeting Chrome Extensions. Use these as the primary source when contributing to or debugging the analysis pipeline.

## Pipeline overview

```
CLI (main.ts)
  └─► run.ts ── runSingleTask
        └─► EPGModelBuilder.analyze
              ├─► Loader      (CRX / DIR / WEB → unpacked dir)
              │   └─► ExtensionContext
              │         ├─ manifest.json
              │         ├─ ScriptRegistry (all .js)
              │         └─ ScriptUsageTracker (frames CS_n / BG_1)
              │
              └─► analyzeScriptsInOrder
                    ├─► ScriptDependencyGraph → topo sort
                    ├─► JSParser (acorn → acorn script → acorn-loose)
                    ├─► astValidator / optimizer
                    ├─► ScopeTree   (per page / script)
                    ├─► ModelBuilder
                    │     └─► CFGBuilder ─ esgraph
                    ├─► DefUseAnalyzer
                    │     ├─ importAnalyzer
                    │     ├─ featureModelAnalyzer
                    │     ├─ builtInAnalyzer
                    │     ├─ functionDeclarationAnalyzer
                    │     ├─ reachingDefinitionAnalyzer  (intra/inter)
                    │     └─ exportAnalyzer
                    └─► TaintManager (sources / propagation / sinks)
                          ├─ TaintContext per file
                          ├─ InterContextBridge (message channels)
                          ├─ Storage Sets/Gets (cross-context)
                          └─ Report (printTaintReportsCLI)
```

## Files

| File | Topic |
|------|-------|
| `architecture.md` | High-level component map and runtime walkthrough |
| `extension_loader.md` | Loader / unpack / frame tagging / dependency graph |
| `extension_components.md` | Unified component model (popup / options / side_panel / devtools / overrides / offscreen / inline scripts), HTML extractor, runtime-discovered components |
| `ast_cfg.md` | Parser, AST validator, CFG builder, FlowNode model |
| `scope_def_use.md` | Scope tree, Def-Use analysis, builtin semantics, inter-procedural call analysis |
| `taint_engine.md` | TaintManager, sources/sinks/sanitizers, message/storage bridges, severity |
| `taint_policy_catalog.md` | Full catalog of supported sources, sinks, propagators, flow types |
| `output_format.md` | report.txt and summary.json structure |
| `samples_guide.md` | Walkthrough of every sample under `samples/` and what it exercises |

## Reading order

1. `architecture.md` — the 60-second tour
2. `extension_loader.md` + `ast_cfg.md` — front-end of the pipeline
3. `scope_def_use.md` — how values become `Def`s and how calls are simulated
4. `taint_engine.md` + `taint_policy_catalog.md` — what gets reported and why
5. `samples_guide.md` — concrete extensions exercising each detector

## Key entry points

- CLI: `src/main.ts:14` (`analyze` command)
- Orchestrator: `src/run.ts:51` (`runSingleTask`)
- Model builder: `src/epgmodelbuilder.ts:34` (`EPGModelBuilder.analyze`)
- Per-script analysis: `src/extension/extensionContext.ts:76` (`analyzeScriptsInOrder`)
- Taint manager singleton: `src/taint/index.ts:8` (`taintManager`)
- Source / sink / sanitizer registration: `src/def-use/builtins/builtinSemantics/`
