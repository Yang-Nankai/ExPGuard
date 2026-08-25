# Extension Loader & Modeling

Files: `src/extension/`, `src/loader/`.

## Entry point

`loadExtensionAsync(source, inputPath, outputDir, extensionId)` in `src/extension/extensionLoader.ts:20` dispatches by `ExtensionSourceType`:

| Source | Flow |
|--------|------|
| `CRX` | `CrxExtractor.extract` decodes the `Cr24` header (v2 or v3), validates the public-key derived ID matches `--id`, dumps the embedded ZIP to `<out>/unpacked` |
| `DIR` | Validates `manifest.json` exists, `copyDirectoryAsync` mirrors the tree into `<out>/unpacked` |
| `WEB` | `downloadCrxFromCWS` calls the Chrome Web Store to fetch the latest CRX (`config.targetChromeVersion`, optional `config.proxies`), then `loadFromCrx` |

The result is always a populated `<out>/unpacked` directory plus a new `ExtensionContext` instance.

## ExtensionContext

`src/extension/extensionContext.ts:26`

```
ExtensionContext
  ├─ id                : extension ID (32-char a-p)
  ├─ baseDir           : <out>/unpacked
  ├─ manifest          : parsed manifest.json
  ├─ scripts           : ScriptRegistry (Map<key, ExtensionScript>)
  └─ orderedScripts    : analysis order produced by analyzeScriptsInOrder
```

`loadScripts` walks the unpacked tree with `collectJsFiles` (skipping `node_modules` and other patterns from `config.analysisIgnorePatterns`) and creates an `ExtensionScript` for each `.js` / `.ts`.

### Script keys

`ScriptKey` = path relative to `baseDir` with extension stripped. Examples:

```
background           ← background.js
content              ← content.js
lib/utils            ← lib/utils.js
popup/index          ← popup/index.js
```

This key is used everywhere: `ScriptRegistry`, `ScriptDependencyGraph`, `TaintContext.filename`, frame tags, report filenames.

### `analyzeScriptsInOrder`

1. `ScriptDependencyGraph` resolves every `import` / `importScripts` source to a `ScriptKey`. The graph is `key → Set<keyDependency>` (`src/extension/scriptDependenctGraph.ts`).
2. `topoSort` gives a deterministic ordering (cycles produce warnings).
3. `scriptUsageTracker.getInitialAnalysisOrder()` returns the manifest-declared roots (background → content → externally connectable). These are enqueued first.
4. For every script visited, after analysis runs we re-pull `scriptUsageTracker.getFramedScriptKeys()` to catch new scripts discovered via `chrome.runtime.getURL("...")`, `chrome.scripting.executeScript({ files: [...] })`, `chrome.tabs.executeScript({ file: ... })`, `<script src=...>` in background HTML, etc.
5. For each script:
   - parse with `JSParser`
   - build `ScopeTree` via `scopeController.addPageScopeTree`
   - create per-page models via `modelController.addPageModels`
   - build intra-procedural CFGs via `modelBuilder.buildIntraProceduralModelsForAPage`
   - enter taint context, run `defuseAnalyzer.buildInterProceduralModelsPDG`, exit
6. File analysis time is tracked through `fileTimerManager`; a per-file timeout aborts long files (sized buckets in `config.fileSizeTimeoutMs`).

## ScriptRegistry

`src/extension/extensionRegistry.ts` — thin Map wrapper keyed by `ScriptKey`. Lookups happen with `.get(key)`, iteration with `.values()` / `.entries()`.

## ScriptUsageTracker

`src/extension/scriptUsageTracker.ts` is the central authority for **frame propagation** and **runtime usage filtering**.

### Frame seeds (from manifest)

| Manifest field | Frame id | Family |
|----------------|----------|--------|
| `content_scripts[i].js[]` | `CS_${i+1}` | `CS` |
| `background.scripts[]` | `BG_1` | `BG` |
| `background.service_worker` | `BG_1` | `BG` |
| `background.page` / `background.background_page` (parses `<script src=…>`) | `BG_1` | `BG` |

Each frame carries a `FrameConstraint` derived from `content_scripts[i]` (`matches`, `include_globs`, `exclude_matches`, `exclude_globs`).

`externally_connectable` is read into `getExternallyConnectableConfig()` and surfaced through the severity analyzer.

### Propagation

- `markReferencedScript` / `markReferencedScriptByKey` / `markReferencedScriptByPathOrUrlByKey` are called from builtin semantics whenever a known script reference is observed (`chrome.scripting.executeScript files`, `chrome.tabs.executeScript file`, `chrome.runtime.getURL(...)`).
- The destination script inherits *all* frame tags of the originator (`propagateFrameByReference`).
- The script is added to that frame's ordered list, enabling deterministic intra-frame execution order analysis.

### Filtering

When `config.filterUnusedRuntimeScripts` is `true` (default), scripts never marked used at runtime are skipped by `shouldIncludeScriptInPolicy` during reporting. This eliminates dead helpers from results without skipping them during analysis (they may still be needed as call targets).

## CRX extractor specifics

`src/loader/crxExtractor.ts`

- Supports CRX2 (public key + signature) and CRX3 (protobuf header with RSA / ECDSA keys + crx_id)
- Computes the canonical extension ID via the Chrome 'sha256 of public key, first 32 hex chars, mapped a–p' algorithm (`computeExtensionId`)
- Throws via `Errors.LoaderError` on bad magic, unsupported version, or missing `manifest.json`

## CRX downloader

`src/loader/crxDownloader.ts` — constructs the standard `clients2.google.com/service/update2/crx` URL with `targetChromeVersion` and the extension ID, follows redirects, supports `config.proxies`. Returns the path of the downloaded `.crx`.

## ExtensionScript

`src/extension/extensionScript.ts`

- `getAST()` is lazy: read source → `parser.parseAST` → optional `optimizeAST` → `astValidator.validate` → cache.
- `resolveRelativeScriptKey(source)` resolves `import` / `importScripts` targets. Relative (`./`, `../`) paths are based on the script's own directory; bare paths resolve from `baseDir`.
- `getDependencies()` runs a one-shot `DependencyAnalyzer` (`src/utils/denpendency.ts`) that walks `ImportDeclaration` and `CallExpression` (looking for `importScripts(...)` literals).
- `analysisDurationMs` populated by `fileTimerManager` is surfaced through `toJSON()`.
