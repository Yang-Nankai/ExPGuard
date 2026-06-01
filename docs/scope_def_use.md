# Scope, Def-Use, and Inter-procedural analysis

Files: `src/scope/`, `src/def-use/`, `src/model/`.

## Scope hierarchy

`src/scope/scope.ts` defines a unified `Scope` base. Concrete subclasses:

| Class | Type tag | Created from |
|-------|----------|--------------|
| `ExtensionScope` | `extension` | Synthetic root over all pages of an extension |
| `PageScope` | `page` | The `Program` node of each script |
| `FunctionScope` | `function` | `FunctionDeclaration`, `FunctionExpression`, `ArrowFunctionExpression` |
| `BlockScope` | `block` | Any `{ ... }` introducing `let` / `const` binding |
| `ForScope` | `for` | `for(let ...)`, `for ... of/in` headers |
| `SwitchScope` | `switch` | `SwitchStatement` |
| `CatchScope` | `catch` | `try { ... } catch (e) { ... }` |
| `WithScope` | `with` | Legacy `with (...)` blocks |
| `ClassScope` | `class` | `ClassDeclaration` / `ClassExpression` |

Each scope tracks:

- `range`, `parent`, `children`
- `_vars` (declared variables), `_params`, `_paramNames`, `_namedFunctionVars`, `_builtInObjectVars`
- `_reachIns`, `_lastReachIns` — the per-variable reaching definition state (`Map<name, Def>`)

`Scope.NAME_*` constants prefix synthetic names (`$PAGE0`, `$ANONF1`, `$BLOCK2`, ...).

`Scope.isCFGEligibleScope(scope)` returns true for any scope that owns its own CFG (page / function). The model builder creates one `Model` per such scope.

## ScopeTree

`src/scope/scopeTree.ts` is the per-script scope container. Built by `scopeController.addPageScopeTree(ast, script)`:

- walks the AST and pushes/pops scopes onto an internal stack
- registers scopes by name and by AST range
- maintains a sorted-by-start array for binary-search range lookups (`getNodeScopeByRangeOptimized`)

`ScopeTree.root` is the `PageScope`; `ScopeTree.getCFGEligibleScopes()` iterates page + functions in declaration order.

## Model & ModelCtrl

`src/model/model.ts`:

```ts
class Model {
  relatedScopes: Scope[]          // scopes whose AST contributes to this CFG
  mainlyRelatedScope: Scope       // the owning scope (page or function)
  graph: CFGResult                // attached by modelBuilder.buildCFGForScope
  dupairs: Map<Var, Set<DUPair>>  // def-use pairs computed during reaching-def
  returnDef: Def | null           // last return value seen for user functions
  hasTaintAnalyzed: boolean
  featureSemantic?: FeatureModelSemantic  // memoised summary for helper fns
}
```

`src/model/modelCtrl.ts` indexes `PageModels` per `ScopeTree`. `PageModels` (`src/model/pageModels.ts`) groups models into intra-procedural, inter-procedural, and intra-page subsets. Inter-procedural and intra-page models are currently optional — the engine relies on intra-procedural models plus call simulation.

## Def-Use core

### `Def` taxonomy

`src/def-use/types/def.ts` defines the abstract `Def` base and subclasses:

- `ObjectDef` — supports `props: Map<key, Def>`, `values`, `proto`, `setProperty`, `lookupProperty`. Used for objects, arrays, message payloads.
- `FunctionDef` — wraps a user `FunctionDeclaration` / `FunctionExpression` AST node
- `BuiltInFunctionDef` — wraps a registered semantic (`semanticExec`)
- `LiteralDef` — `string`, `number`, `boolean`, `null`
- `UndefinedDef` / `UnknownDef`
- `PromiseDef` — `resolve(def)` / `then` semantics
- `ImplicitDef` — union of multiple Defs (set semantics — propagation hits every member)
- `PseudoDef` — base for special wrappers

Each Def carries `uniqueId`, `version` (monotonic), `_tainted` flag, and a `_fromNode` FlowNode.

### Factories

`src/def-use/factories/`:

- `defFactory.createObjectDef / createFunctionDef / createUnknownDef / createLiteralDef / createUndefinedDef / createImplicitDef / createBuiltInFunctionDef / createPromiseDef`
- `varFactory`, `useFactory`, `varUseFactory`, `varDefFactory`, `varUseDefFactory`, `pairFactory`, `duPairFactory`, `rangeFactory`

Use these in new semantics — they wire up uniqueIds and scope back-references.

### Reaching-definition analyzer

`src/def-use/analyzers/reachingDefinitionAnalyzer.ts`

```
for each FlowNode in worklist(model.graph, forward):
   computeGenFromAST(node)            // src/def-use/handlers/generateHandler.ts
   evaluatePureExpressions(node)      // src/def-use/handlers/pureExpressionHandler.ts
   feasible = getFeasibleSuccessors(node)
   if feasible: enqueue all
```

`computeGenFromAST` is a `walkes` visitor that handles:

- `AssignmentExpression` (delegates RHS to `expressionTypeHandler`, LHS to `patternAwareTypeHandler`)
- `VariableDeclaration` / `VariableDeclarator`
- `ClassDeclaration`
- `ForInStatement` / `ForOfStatement` (binds iterator to LHS)
- `ExportNamedDeclaration` / `ExportDefaultDeclaration` / `ExportAllDeclaration`
- `BinaryExpression` / `LogicalExpression` / `UnaryExpression` / `ConditionalExpression` / `SequenceExpression`
- `ReturnStatement`

### Handlers

`src/def-use/handlers/`:

| Handler | Purpose |
|---------|---------|
| `expressionTypeHandler.ts` (559 lines) | Recursive expression evaluator. Resolves identifiers via scope, member access, call expressions, new expressions, template literals, etc. Returns a `Def`. |
| `patternAwareTypeHandler.ts` | Binds a `Def` into an LHS pattern (`{a}` / `[a,b]` / rest / defaults). Marks taint propagation per binding. |
| `classTypeHandler.ts` | Builds `ObjectDef` representations of classes (statics / proto / constructor). |
| `generateHandler.ts` | The GEN-set producer described above. |
| `pureExpressionHandler.ts` | Fast-path evaluator for pure subtrees to avoid re-visiting unchanged sub-AST. |

### Inter-procedural analyzer

`src/def-use/analyzers/interProceduralAnalyzer.ts` — `interAnalyzer.analyze(caller, callee, argDefs, thisDef, astNode)`.

Dispatch order:

1. If `Def.isImplicitDef(callee)` — analyse every member, combine results into a fresh `ImplicitDef`.
2. If `Def.isBuiltInFunctionDef(callee)` — invoke the registered semantic (`callee.returnDef(args, caller, astNode, thisDef)`).
3. If `Def.isFunctionDef(callee)`:
   - Reject if call stack already at `MAX_DEPTH` → returns `UnknownDef`.
   - Reject if frame is reentrant (recursion) → returns `UnknownDef`.
   - Push a `FunctionCallItem` frame, call `analyzeUserDefinedFunction`, pop.
4. Otherwise — `UnknownDef` (with fallback `RETURN` propagation if `callee.isTainted`).

`analyzeUserDefinedFunction`:

- Looks up the callee's `Model` via `modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels`.
- If the model has a `featureSemantic` (precomputed summary), execute it directly.
- Otherwise, bind formal params to actual `argDefs` (`bindFunctionParameters` → `patternAwareTypeHandler`), snapshot outer-scope reaching defs, run `reachingDefAnalyzer.doAnalysis`, compare snapshots to mark side-effect frames.

A `FunctionCallStack` and `FunctionCallCache` (`src/def-use/utils/`) bound recursion and (optionally) cache pure-call results.

### Feature analyzer

`src/def-use/analyzers/featureAnalyzer.ts` precomputes lightweight summaries for helper functions selected through `src/def-use/features/selector.ts` (matches AST patterns like "function returning JSON.stringify(arg)"). Summaries are attached to the function's `Model.featureSemantic` and replace full inter-procedural analysis for performance.

### Import / Export

- `importAnalyzer.ts` connects ES module imports to the exporter's `Def`s by walking the dependency graph.
- `exportAnalyzer.ts` records what each script exposes via `export` / `module.exports` so other scripts' imports can resolve.

## Builtin registry

`src/def-use/builtins/builtinRegistry.ts` boots once per analysis run and creates `Def`s for every JS / web / chrome / library object. Definitions come from `src/def-use/builtins/builtins.ts` (a declarative schema with `constructor`, `object`, `function`, `attribute` entries) plus per-API semantics under `src/def-use/builtins/builtinSemantics/`.

Each semantic is registered with `BuiltInSemantics.register("effect.name", (args, callNode, astNode, thisDef) => Def | undefined)`. The effect name matches the schema's `effect` field — so `Array.prototype.map` resolves to the `Array.prototype.map` handler when called.

Folder layout under `builtinSemantics/`:

```
js/         ← Array, Object, String, JSON, Map, Set, Function, Promise, TextEncoder, Uint8Array
browser/    ← document, navigator, fetch / XHR / WebSocket, localStorage/sessionStorage,
              addEventListener / postMessage, setTimeout / setInterval, URL,
              Blob, FormData, crypto.subtle
chrome/     ← every chrome.* namespace (action, alarms, bookmarks, browsingData,
              contentSettings, cookies, declarativeContent, downloads, fontSettings,
              gcm, history, identity, management, notifications, pageCapture, proxy,
              readingList, runtime, scripting, storage, system, tabs, topSites, windows)
library/    ← jQuery, Axios, Lodash, CryptoJS, base64
```

`createChromeBuiltinSemantics` (`chrome/utils.ts`) standardises the "callback-or-promise" Chrome API pattern: register sinkArgs (positions whose argument is a sink), a callback index, an optional source type for the return value / first callback argument.

`createChromeEventListenerSemantics` standardises event listeners with N callback parameters and selected indexes that get tainted.

## Files / functions you'll touch when extending analysis

- New chrome API: add a schema entry in `src/def-use/builtins/builtins.ts`, then a semantic in `src/def-use/builtins/builtinSemantics/chrome/<api>.ts`.
- New source / sink type: add to `src/taint/types.ts`, classify in `src/constants/taint.ts`, plug into policy in `src/taint/policy.ts`.
- New JS built-in: add to `src/constants/builtIn.ts` so the scope sees it as a built-in, then schema in `builtins.ts` plus a handler.
- New propagation kind: extend `PropagateType` in `src/taint/types.ts`, then use it in `propagateTaint(...)` calls so the report shows the right tag.
