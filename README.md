# ExPGuard: Extension Privilege Guard


ExPGuard is a comprehensive static analysis framework built for Chrome Extensions to detect privacy leaks and security vulnerabilities. By building precise execution models and analyzing data flows, ExPGuard tracks sensitive information propagation across extension scripts and pages.

## Features

Based on its extensive static analysis engine, ExPGuard provides:
- **Extension Modeling** (`src/model` / `src/extension`): Automatically builds models of background scripts, content scripts, and extension pages.
- **Control Flow & Data Flow** (`src/cfg` / `src/def-use`): High-precision intra-procedural and inter-procedural Control Flow Graph (CFG) generation and reaching definition / def-use analysis.
- **Scope & Scope Tree Analysis** (`src/scope`): Context-aware analysis of JavaScript scopes (e.g., closures, ES6 block scopes, `let`/`const`).
- **Taint Analysis Engine** (`src/taint`): Tracks sensitive data from various extension sources to critical sinks using established taint policies constraints.
- **Graph Visualization** (`src/graph`): Generates `.dot` files for intermediate representations (AST, CFG).

## Prerequisites

- **Node.js**: (Recommended `v18.x` or higher)
- **TypeScript**: Project relies on `npm` and `tsc` for compilation.
- **Python** (Optional): If needed for external heuristic scripts mentioned in `requirements.txt`.

## Installation & Build

1. **Clone the repository:**

```bash
   git clone https://github.com/Yang-Nankai/ExPGuard.git
   cd ExPGuard
```

2. **Install project dependencies:**

```bash
npm install
```

3. **Build the project:**

```bash
npx tsc
# or simply `tsc` if TypeScript is globally installed
```

**Note: ** Note that if this is your first time compiling, please copy the entire src/transformation folder to the dist/ folder and add the relevant JS library code to prevent runtime failure.


## Usage

ExPGuard provides a command-line interface based on commander.

To run the analyzer, you can use node on the compiled script, or ts-node on the source file directly.

**Basic Syntax**:

```bash
node dist/main.js analyze --type <CRX|DIR|WEB> --input <path> [options]
```

**Options**:

- --type \<type\>: (Required) The format of the input extension. Valid options are CRX (packaged extension), DIR (unpacked extension directory), and WEB (Chrome Web Store online extension).
- --input \<path\>: (Required) Path to the target extension (.crx file, local directory path, or URL).
- --out \<dir\>: Directory where the analysis results will be saved. (Default: results)
- --id \<extensionId\>: Limit analysis or explicitly pass the custom extension ID.
- --version \<version\>: Specify the extension version.

**Examples:**

1. Analyze an unpacked extension directory:

```bash
node dist/main.js analyze --type=DIR --input=./samples/privilege_execution/ --out=./output/privilege_execution --id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --version=1.0
```

2. Analyze a packaged CRX file:
```bash
node dist/main.js analyze --type CRX --input ./samples/code_injection/example.crx --out=./output/code_injection --id=caofmekclcabakldafkjbfkkmcebndal --version=1.2
```

3. Analyze CWS online extension:
```bash
node dist/main.js analyze --type WEB --input=https://chromewebstore.google.com/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone --out=./output/cws_example --id=mnjggcdmjocbbbhaepdhchncahnbgone --version=6.1.5
```

## Documentation

In-depth component-level docs live under [`docs/`](./docs):

- [`docs/architecture.md`](./docs/architecture.md) — high-level pipeline tour
- [`docs/extension_loader.md`](./docs/extension_loader.md) — loader, unpacking, frame tagging, dependency graph
- [`docs/ast_cfg.md`](./docs/ast_cfg.md) — parser strategy, CFG construction, FlowNode model
- [`docs/scope_def_use.md`](./docs/scope_def_use.md) — scope tree, def-use, inter-procedural call analyzer, builtin semantics
- [`docs/taint_engine.md`](./docs/taint_engine.md) — TaintManager, cross-context bridges, policy, severity
- [`docs/taint_policy_catalog.md`](./docs/taint_policy_catalog.md) — full catalog of supported sources / sinks / sanitizers
- [`docs/output_format.md`](./docs/output_format.md) — `report.txt` and `summary.json` reference
- [`docs/samples_guide.md`](./docs/samples_guide.md) — what each sample under `samples/` exercises plus verified baseline flow counts

## Test samples

| Sample | Detector class | Run with `--input` |
|--------|----------------|---------------------|
| `samples/privilege_execution/` | PRIVILEGE_ESCALATION + STORAGE_POSOING via `chrome.runtime.sendMessage` + `chrome.storage.local` | `./samples/privilege_execution/` |
| `samples/code_injection/` (CRX) | CODE_INJECTION via `setTimeout(string)` | (use `--type=CRX --input=./samples/code_injection/example.crx --id=caofmekclcabakldafkjbfkkmcebndal`) |
| `samples/data_leak/` | DATA_LEAK + REQUEST_FORGERY via `chrome.cookies` / `chrome.history` → `fetch` / `onMessageExternal` | `./samples/data_leak/` |
| `samples/storage_poisoning/` | STORAGE_POSOING + PRIVILEGE_ESCALATION via `WINDOW_CUSTOM_EVENT` → `chrome.storage.sync` → `chrome.tabs.*` | `./samples/storage_poisoning/` |
| `samples/request_forgery/` | REQUEST_FORGERY via `onMessageExternal` → `fetch` / XHR / WebSocket / axios; sanitiser demo via `crypto.subtle.digest` | `./samples/request_forgery/` |
| `samples/dom_xss/` | CODE_INJECTION via `location.hash` / `postMessage` / `element.value` / custom events | `./samples/dom_xss/` |
| `samples/multi_channel/` | DATA_LEAK + PRIVILEGE_ESCALATION + REQUEST_FORGERY via `runtime.connect` / `onConnectExternal` / `pageCapture`; demonstrates `chrome.runtime.getURL` frame propagation to `helper.js` | `./samples/multi_channel/` |

Each new sample is exercised by the same CLI invocation as the existing examples; just swap `--input` and adjust `--out`. See [`docs/samples_guide.md`](./docs/samples_guide.md) for the expected flow set per sample.
