# Samples Guide

The four paper examples are Manifest V3 extensions. Build with `npm run build`,
then analyze an unpacked sample:

```sh
node dist/main.js analyze --type DIR --input samples/data_leak --out output/data_leak --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --extension-version 1.0.0
```

Use `--extension-version` for extension metadata; `--version` reports the CLI
version. The sample ID is a placeholder, not a store identifier.

| Paper class | Sample | Main security path |
| --- | --- | --- |
| Privilege Execution | `privilege_execution/` | Page message → runtime message → privileged bookmark operation; also exercises storage propagation |
| Storage Poisoning | `storage_poisoning/` | Page custom event → shared storage → privileged consumers |
| Request Forgery | `request_forgery/` | Externally connectable input → privileged service-worker fetch/XHR/WebSocket/Axios request |
| Data Leak | `data_leak/` | Permission-gated cookies/history → external `sendResponse` → requesting webpage |

## Data leakage verification

`data_leak/` replaces the former `dom_xss/` paper example. It contains only
`manifest.json` and `background.js` as extension runtime inputs. The service
worker exposes two commands to any admitted `https://*.lab.example/*` webpage:
`READ_COOKIES` returns records from `https://private.example.test/`, and
`READ_HISTORY` returns recent browser history. A command name is not caller
authentication. No sender-origin authorization precedes either response.

```sh
node scripts/verify_data_leak.cjs
```

The script invokes the compiled ExPGuard CLI and saves unmodified static
analysis reports under `samples/data_leak/verification/`. On the local
analyzer used to prepare this release it emits 4 raw `DATA_LEAK` reports:
2 cookie reports and 2 history reports, covering 2 distinct source/sink pairs.
Raw duplicate observations are retained, not counted as four independent
vulnerabilities. Both kinds use
`CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`; the analyzer assigns HIGH
severity for the subdomain wildcard. The paper's exposure labels use a
separate scale.

The script additionally checks asynchronous callback replies with synthetic
Chrome API mocks in Node.js. It verifies that the listener returns `true` and
that a caller on `https://attacker.lab.example` receives the synthetic records.
This is a logic check, not a browser-level reproduction. Instructions for
an isolated browser demonstration are in the sample README.

## Analysis features exercised by the other paper samples

- `privilege_execution/`: content-to-background runtime messaging, shared
  storage resolution and a helper module containing a privileged operation.
- `storage_poisoning/`: window and element custom-event sources, sync storage
  writes and reads, key matching and inter-procedural privileged consumers.
- `request_forgery/`: external messages and ports, multiple network sink
  semantics, manifest-aware caller constraints and a sanitizer demonstration.

The compatibility examples `code_injection/`, `multi_channel/`,
`event_driven_attack/`, `advanced_stealth_exfiltration/` and
`obfuscated_code_injection/` continue to exercise engine features. They are
not additional paper vulnerability classes. Network exfiltration in a legacy
example must not be interpreted as an in-scope `DATA_LEAK` finding under the
current default rules. DOM/code execution fixtures remain useful engine
regressions even though these classes are excluded from the paper dataset.

## Regression coverage

`tests/integration/samples.test.ts` requires cookies and history to reach the
external response sink. Custom-rule tests suppress the cookie response while
preserving the history response. Sensitive-exfiltration tests require network
egress to stay outside the default Data Leak scope. Firefox namespace tests
check the same positive message-egress and negative network-egress semantics
for `browser.*` aliases. Run `npm test -- --silent` for the full suite.
