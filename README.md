# ExPGuard: Extension Privilege Guard


ExPGuard is a comprehensive static analysis framework built for **Chrome, Edge, and Firefox** extensions to detect privacy leaks and security vulnerabilities. By building precise execution models and analyzing data flows, ExPGuard tracks sensitive information propagation across extension scripts and pages. Firefox add-ons (`.xpi`) are supported with the same detection engine: the `browser.*` WebExtension namespace is modeled as an alias of `chrome.*`, so source/sink coverage is identical across both browsers.

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
npm run build
# = tsc + scripts/copy-assets.js (copies runtime assets that tsc does not emit:
#   the default taint rules and the src/transformation JS libraries) into dist/
```

> Use `npm run build` rather than a bare `tsc`. `tsc` only emits the compiled
> `.js`; the analyzer also needs `src/taint/rules/default-rules.json` and the
> `src/transformation/**` JS libraries copied into `dist/`. `npm run build`
> does this automatically; running `tsc` alone leaves the default rule set
> missing and every analysis silently reports zero findings.


## Usage

ExPGuard provides a command-line interface based on commander.

To run the analyzer, you can use node on the compiled script, or ts-node on the source file directly.

**Basic Syntax**:

```bash
node dist/main.js analyze --type <CRX|DIR|WEB|XPI> --input <path> [options]
```

**Options**:

- --type \<type\>: (Required) The format of the input extension. Valid options are CRX (packaged Chrome extension), DIR (unpacked extension directory), WEB (Chrome Web Store online extension), and XPI (packaged Firefox add-on).
- --input \<path\>: (Required) Path to the target extension (.crx / .xpi file, local directory path, or URL).
- --out \<dir\>: Directory where the analysis results will be saved. (Default: results)
- --id \<extensionId\>: Explicitly pass the extension ID. Accepts a Chrome ID (`[a-p]{32}`) or a Firefox ID (GUID / email style). Optional for XPI; if omitted, the gecko ID is auto-derived from the manifest's `browser_specific_settings.gecko.id` / `applications.gecko.id`.
- --extension-version \<version\>: Optional extension version metadata to include in `summary.json` and generated reports. This is separate from the CLI's own `--version` flag.

**Examples:**

1. Analyze an unpacked extension directory:

```bash
node dist/main.js analyze --type=DIR --input=./samples/privilege_execution/ --out=./output/privilege_execution --id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --extension-version=1.0
```

2. Analyze a packaged CRX file:
```bash
node dist/main.js analyze --type CRX --input ./samples/code_injection/example.crx --out=./output/code_injection --id=caofmekclcabakldafkjbfkkmcebndal
```

3. Analyze CWS online extension:
```bash
node dist/main.js analyze --type WEB --input=https://chromewebstore.google.com/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone --out=./output/cws_example --id=mnjggcdmjocbbbhaepdhchncahnbgone
```

4. Analyze a packaged Firefox add-on (`.xpi`). The `--id` is optional; it is
   auto-derived from the manifest's gecko settings:
```bash
node dist/main.js analyze --type XPI --input ./path/to/addon.xpi --out=./output/firefox_addon
```

## Documentation

In-depth component-level docs live under [`docs/`](./docs):

- [`docs/architecture.md`](./docs/architecture.md) - high-level pipeline tour
- [`docs/extension_loader.md`](./docs/extension_loader.md) - loader, unpacking, frame tagging, dependency graph
- [`docs/ast_cfg.md`](./docs/ast_cfg.md) - parser strategy, CFG construction, FlowNode model
- [`docs/scope_def_use.md`](./docs/scope_def_use.md) - scope tree, def-use, inter-procedural call analyzer, builtin semantics
- [`docs/taint_engine.md`](./docs/taint_engine.md) - TaintManager, cross-context bridges, policy, severity
- [`docs/taint_policy_catalog.md`](./docs/taint_policy_catalog.md) - full catalog of supported sources / sinks / sanitizers
- [`docs/output_format.md`](./docs/output_format.md) - `report.txt` and `summary.json` reference
- [`docs/samples_guide.md`](./docs/samples_guide.md) - what each sample under `samples/` exercises plus verified baseline flow counts

## Paper vulnerability classes and samples

| Paper class | Report identifier | Sample |
| --- | --- | --- |
| Privilege Execution | `PRIVILEGE_ESCALATION` | `samples/privilege_execution/` |
| Storage Poisoning | `STORAGE_POSOING` | `samples/storage_poisoning/` |
| Request Forgery | `REQUEST_FORGERY` | `samples/request_forgery/` |
| Data Leak | `DATA_LEAK` | `samples/data_leak/` |

The historical `STORAGE_POSOING` spelling is retained for compatibility.
Data Leak requires sensitive browser or extension data to reach an
attacker-observable output. The data leakage sample returns permission-gated
cookies and history through an externally connectable response. The Ablation
baseline also reports sensitive or system data sent through outbound network
requests (`fetch`, XHR, Axios, and WebSocket), subject to its header and
privilege-delta filters. The paper's curated four-class ground truth selects
flows according to its threat model; DOM XSS remains an engine regression
class and is not part of that paper taxonomy.

```sh
npm run build
node scripts/verify_data_leak.cjs
```

The sample verifier invokes ExPGuard, saves its original report, and checks
asynchronous responses with synthetic API mocks. These mocks do not constitute
a browser exploit reproduction. See [the sample README](samples/data_leak/README.md)
and [the samples guide](docs/samples_guide.md).

## Manually validated dataset

[datasets/](datasets/README.md) contains the initial requested subset of the
paper's reference dataset: five confirmed MV3 Chrome extension instances,
their source, available DoubleX/CoCo/ExPGuard report folders, selection
decisions and SHA-256 hashes.
Missing upstream reports are explicitly marked; absence is not a negative
scan result. This subset is not the complete 337-extension reference set.

```sh
python scripts/build_paper_dataset.py --verify
```
