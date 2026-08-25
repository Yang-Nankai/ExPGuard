# AST, CFG, FlowNode

Files: `src/ast/`, `src/cfg/`, `src/flownode/`.

## Parsing strategy

`src/ast/jsParser.ts` exposes a single `parser.parseAST(code, options?)`. Strategy is a 3-step fallback:

1. `acorn.parse(code, { sourceType: "module", ecmaVersion: "latest", ranges: true, locations: true })`
2. If that fails and sourceType was `module`, retry with `sourceType: "script"`.
3. Final fallback: `acorn-loose.parse(...)` — tolerant parser used for obfuscated / partially-broken code shipped by real extensions.

All AST nodes always carry `range: [start, end]` and `loc: {start, end}`, used downstream for scope lookup and report locations.

## AST validation

`src/ast/astValidator.ts` (`astValidator.validate`) ensures the root is a Program and that ranges / locations are present unless explicitly disabled. CFG construction calls it with `{ range: false, loc: false }` because esgraph already operates on a structurally validated tree.

## Optimisation passes

`src/transformation/transformer.ts` exposes `optimizeAST(ast)` and `astToString(ast)`. When `config.optimizationEnabled = true` (default), each script is rewritten through:

- escope-based scope analysis
- esmangle dead-code / pure-call elimination passes
- escodegen / astring re-serialisation

When `config.enableOptimizationRewrite = true`, the optimized source is also persisted next to the original as `<file>.prep.js` for debugging.

## Walkers

`src/ast/walkes.ts` provides two interfaces used throughout the engine:

| Function | Use |
|----------|-----|
| `walkes(node, handlers)` | Recursive visitor with a `default` fallback. Handlers receive `(node, recurse)`. Used by both CFG construction and the GEN computation in def-use. |
| `traverseSimple(ast, visitors)` | Lightweight one-shot traversal (no recurse function). Used in dependency analysis and miscellaneous AST scans. |

`src/ast/patternVisitor.ts` extracts identifier names out of binding patterns (`{a, b: [c]} = ...`, `[x, ...rest] = ...`). It is reused by scope creation and pattern-aware Def assignment.

## CFG construction (esgraph)

`src/cfg/esgraph.ts` implements a custom-tailored esgraph variant. The entry point is `ControlFlowGraph(astNode)` (called via `cfgBuilder.getCFG` in `src/cfg/cfgBuilder.ts`).

Key concepts:

- **`FlowNode`** (`src/flownode/flownode.ts`): wraps an AST node, exposes `prev`/`next` arrays, plus typed connectors (`normal`, `exception`, `true`, `false`).
- Each AST node has a hidden `.cfg` back-reference pointing to its FlowNode.
- Statement/expression handlers cover all standard ES constructs:
  - `for`/`for-in`/`for-of`/`while`/`do-while` with `continue`/`break` targets
  - `if` / `switch` / `try`/`catch`/`finally` (exception edges + finally stacks)
  - logical (`&&`/`||`), conditional (`?:`), sequence expressions
  - `await` (treated as a normal flow point — feasibility tracked via type)
- Nodes inside isolation-scoped constructs (function declarations / class methods) are *not* recursed into by the top-level CFG; each function gets its own CFG built later by `modelBuilder.buildIntraProceduralModelsForAPage`.

### `CFGResult`

`src/cfg/cfgResult.ts` exposes:

```ts
{
  entryNode: FlowNode,
  exitNode: FlowNode,
  allNodes: FlowNode[],
  size: number
}
```

Plus mutation guards (`addNode`, `containsNode`, `getNodeIndex`).

### `cfgValidator`

`src/cfg/cfgValidator.ts` checks that the result has entry/exit nodes and a non-empty `allNodes`. `modelBuilder.buildCFGForScope` nullifies the graph if the validator rejects it (logged as a warning, not an exception).

### Line / column tagging

`cfgBuilder.getCFG` walks `cfg.allNodes`, copies `astNode.loc.start.line/column` onto each `FlowNode`, and positions the exit node just past the maximum line/column. These coordinates feed the location strings shown in `report.txt`.

## FlowNode types

| Type | Used for |
|------|----------|
| `entry` | Synthetic entry of each CFG (one per `Model`) |
| `exit` | Synthetic exit; collects all return / throw edges |
| `normal` | Every regular AST statement / expression |
| `builtin` | Owner node of all built-in `Def`s (rooted in `BuiltInRegistry.rootNode`) |
| `branch` | Deprecated; retained as alias |

Connection types: `normal`, `true`, `false`, `exception`. A FlowNode keeps both a typed table (`typeTable[type]`) and the union arrays (`prev` / `next`).

## Mapping FlowNode → Scope

After CFG construction, `ModelBuilder.setScopeOfGraphNodes` (`src/model/modelBuilder.ts:22`) attaches the owning `Scope` and `ScopeTree` to every FlowNode using AST range lookup (`scopeTree.getNodeScopeByRangeOptimized`). This makes per-node Def reads/writes scope-aware.
