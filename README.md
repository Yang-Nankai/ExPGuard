# ExPGuard

ExPGuard (**Ex**tension **P**rivilege **Guard**) is a static analyzer for
security-relevant, cross-context data flows in modern browser extensions. It
reconstructs extension entry points and script dependencies, models JavaScript
and WebExtension APIs, and follows untrusted values across messages and shared
storage until they reach privileged operations.

This repository contains the research prototype accompanying the paper
*ExPGuard: Detecting Privilege Escalation Vulnerabilities in Browser
Extensions*. It supports Manifest V3 Chrome and Edge extensions and Firefox
WebExtensions; the `browser.*` namespace is modeled as an alias of `chrome.*`.

## Vulnerability classes

| Paper category | Example security-sensitive sink | Report identifier |
| --- | --- | --- |
| Privilege Execution | `chrome.tabs.create`, `chrome.cookies.set`, `chrome.downloads.download` | `PRIVILEGE_ESCALATION` |
| Storage Poisoning | `chrome.storage.local.set`, `chrome.storage.sync.set` | `STORAGE_POSOING` |
| Request Forgery | `fetch`, `XMLHttpRequest`, `WebSocket`, Axios | `REQUEST_FORGERY` |
| DOM XSS | `innerHTML`, `document.write`, unsafe framework HTML rendering | `DOM_XSS` |

The two historical report identifiers are retained for compatibility with
existing result-processing pipelines.

## Analysis pipeline

1. **Extension reconstruction** discovers manifest-defined background workers,
   content scripts, extension pages, modules, imports, and runtime script
   references.
2. **Semantic data-flow analysis** builds scopes, control-flow graphs, reaching
   definitions, and inter-procedural flows while applying models for JavaScript,
   DOM, networking, and WebExtension APIs.
3. **Cross-context taint resolution** correlates runtime messages, ports, DOM
   events, and storage reads/writes, then classifies complete source-to-sink
   paths with the taint policy.

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Quick start

```bash
git clone https://github.com/Yang-Nankai/ExPGuard.git
cd ExPGuard
npm ci
npm run build
```

Analyze the bundled Privilege Execution sample:

```bash
node dist/main.js analyze \
  --type DIR \
  --input ./samples/privilege_execution \
  --out ./results/privilege_execution \
  --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
  --extension-version 1.0.0 \
  --html
```

Use `npm run build`, not a bare `tsc`: the build also copies the default taint
rules and transformation libraries required at runtime.

## Command-line interface

```text
node dist/main.js analyze --type <CRX|DIR|WEB|XPI> --input <path-or-url> [options]
```

| Option | Description |
| --- | --- |
| `--type <type>` | Required input type: packaged Chrome extension (`CRX`), unpacked directory (`DIR`), Chrome Web Store URL (`WEB`), or Firefox add-on (`XPI`). |
| `--input <value>` | Required local path or store URL. |
| `--out <directory>` | Output directory; defaults to `./results`. |
| `--id <extension-id>` | Extension ID. Required when it cannot be derived from the input; Chrome IDs must match `[a-p]{32}`. |
| `--extension-version <version>` | Optional extension version recorded in generated reports. |
| `--taint-rules <file>` | Optional JSON, JavaScript, or TypeScript rules layered over the defaults. |
| `--html` | Also generate a self-contained HTML report. |

Examples for other input formats:

```bash
# Packaged Chrome extension
node dist/main.js analyze --type CRX --input ./extension.crx --out ./results/crx

# Chrome Web Store listing
node dist/main.js analyze --type WEB \
  --input https://chromewebstore.google.com/detail/example/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
  --out ./results/web

# Firefox add-on; the Gecko ID is derived from its manifest when available
node dist/main.js analyze --type XPI --input ./addon.xpi --out ./results/firefox
```

By default, the output directory retains `summary.json`, `report.flows.json`,
`report.source.md`, `analysis.log`, and a copy of the analyzed manifest. The
`--html` flag adds `report.html`; unpacked source is removed by the default
retention policy. See
[`docs/output_format.md`](docs/output_format.md) for the schema and retention
behavior.

## Paper-aligned samples

The [`samples/`](samples/) directory contains exactly four intentionally
vulnerable MV3 extensions:

| Sample | Core source-to-sink path |
| --- | --- |
| [`privilege_execution`](samples/privilege_execution/) | page `message` -> runtime message -> `chrome.tabs.create` |
| [`storage_poisoning`](samples/storage_poisoning/) | page `message` -> `chrome.storage.local.set` -> later privileged use |
| [`dom_xss`](samples/dom_xss/) | extension-page URL -> `innerHTML` |
| [`request_forgery`](samples/request_forgery/) | external runtime message -> privileged `fetch` |

These samples are regression fixtures and are deliberately unsafe. Do not load
them into a normal browsing profile. Detailed expected flows and commands are
in [`docs/samples_guide.md`](docs/samples_guide.md).

## Repository layout

```text
ExPGuard/
├── src/                    analyzer implementation
│   ├── extension/          manifest, component, and dependency modeling
│   ├── cfg/ and scope/     control-flow and lexical-scope analysis
│   ├── def-use/            semantic and inter-procedural data-flow analysis
│   └── taint/              cross-context resolution, rules, and reporting
├── samples/                four paper-aligned vulnerable extensions
├── tests/                  unit, integration, and regression tests
├── docs/                   architecture and output-format documentation
└── scripts/                build-time asset copying
```

## Development

```bash
npm run typecheck
npm test
npm run build
```

The analyzer is a static approximation: dynamic code construction, runtime-only
dependencies, and highly obfuscated control flow can reduce precision. Findings
identify security-relevant flows and still require contextual validation; they
are not proof that an extension is malicious.

Use ExPGuard only on extensions you are authorized to analyze. Follow
coordinated disclosure practices when a finding affects third-party software.

## Documentation

- [Architecture](docs/architecture.md)
- [Extension loading and component discovery](docs/extension_loader.md)
- [AST and control-flow analysis](docs/ast_cfg.md)
- [Scope and def-use analysis](docs/scope_def_use.md)
- [Taint engine](docs/taint_engine.md)
- [Taint policy catalog](docs/taint_policy_catalog.md)
- [Output format](docs/output_format.md)
- [Samples guide](docs/samples_guide.md)
