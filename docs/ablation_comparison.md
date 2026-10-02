# ExPGuard and ExPGuard-Ablation comparison

The repository baseline for this update is
`D:/Ph0jav7/ExtensionSecurity/ExPGuard-Ablation/ExPGuard`. The comparison was
performed against the working tree on 2026-10-02.

## Baseline files copied from Ablation

These files are byte-for-byte identical to the Ablation baseline:

- `src/taint/manager.ts`
- `src/taint/privilege.ts`
- `src/run.ts`
- `package.json`
- `package-lock.json`
- `scripts/build.js`
- all shared files under `src/` and `tests/`, except the explicit additions
  below

The package is named `expguard`, uses `node scripts/build.js` as its build
entry point, and the wrapper compiles TypeScript before copying runtime assets
even when TypeScript reports diagnostics. This keeps `dist/` complete while
still returning a failing build status for a real compiler failure.

## Intentional differences retained in this repository

1. `src/def-use/builtins/builtinSemantics/browser/indexedDb.ts` and its
   IndexedDB fixtures provide the current ExPGuard IndexedDB modelling that is
   absent from the Ablation checkout.
2. `src/taint/messageProtocol.ts`, `src/taint/sourceReport.ts`, browser
   `codeExecution.ts`, and JavaScript `date.ts` are supporting modules needed
   by the merged source tree.
3. The test tree includes current ExPGuard precision and cross-context
   regressions. The incompatible `tests/taint/privilegePageContext.test.ts`
   was removed because it targets APIs that do not exist in the Ablation
   baseline.
4. `samples/data_leak/` replaces the old `samples/dom_xss/` paper sample. It
   models permission-gated cookies/history returned through an externally
   connectable response and is verified by `scripts/verify_data_leak.cjs`.
5. `datasets/` packages the initial manually validated MV3 subset requested
   for the paper, with `chrome/`, `edge/`, and `firefox/` platform roots. Each
   selected extension directory contains `source/`, `ExPGuard/`, `CoCo/`, and
   `DoubleX/`; only tool scan outputs are packaged, with no manual audit
   reports.
6. Documentation and `.gitignore` were updated for the public repository.

## Policy clarification

The Ablation default rules include sensitive/system-data to network-sink
`DATA_LEAK` rules, with request-header and privilege-delta suppressions. The
paper's four-class dataset is curated separately according to its threat
model. The checked-in documentation now describes both layers explicitly.

## Validation record

The following commands pass on the merged tree:

```text
npm run build
npm run typecheck
npm test -- --silent
node scripts/verify_data_leak.cjs
python scripts/build_paper_dataset.py --verify
```

The test suite reports 23 suites and 180 tests passing. The data-leak sample
verification reports four raw `DATA_LEAK` observations, two distinct
source/sink pairs, and two synthetic asynchronous responses. Dataset
verification reports 410 file hashes and five MV3 records verified.
