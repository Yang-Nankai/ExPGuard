# Security Vulnerability Report: Medium CSRF via Privileged Network Request and Extension Storage Poisoning in Discord Media Downloader – Discord Video & Image Download Tool

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **Discord Media Downloader – Discord Video & Image Download Tool** (edge, extension ID `ohbfenjhaimblkolliiajfmbdifmmlbf`, version `2.4.1`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning**.

## Affected Extension Details

- Name: Discord Media Downloader – Discord Video & Image Download Tool
- Platform: edge
- Extension ID: `ohbfenjhaimblkolliiajfmbdifmmlbf`
- Dataset version: `2.4.1`
- Store version at review: `2.4.1`
- Users: 136
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L4:C51 -> L4:C62 to the privileged sink `FETCH_HEADERS` ([Unknown URL]) in background/service-worker at L28:C10 -> L28:C86. The source scope is on pages matching `*://discord.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-1c549be7a3be8bf5`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L4:C51 -> L4:C62
- Sink: `FETCH_HEADERS` ([Unknown URL]) in background/service-worker at L28:C10 -> L28:C86
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ohbfenjhaimblkolliiajfmbdifmmlbf_2.4.1/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.1` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ohbfenjhaimblkolliiajfmbdifmmlbf_2.4.1/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L4:C51 -> L4:C62 to the privileged sink `FETCH_HEADERS` ([Unknown URL]) in background/service-worker at L31:C14 -> L31:C75. The source scope is on pages matching `*://discord.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-74eac140026e58a7`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L4:C51 -> L4:C62
- Sink: `FETCH_HEADERS` ([Unknown URL]) in background/service-worker at L31:C14 -> L31:C75
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.1` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L4:C51 -> L4:C62 to the privileged sink `CHROME_LOCAL_STORAGE` (discordToken) in background/service-worker at L68:C37 -> L68:C85. The source scope is on pages matching `*://discord.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-915b39c0fa55e2ff`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L4:C51 -> L4:C62
- Sink: `CHROME_LOCAL_STORAGE` (discordToken) in background/service-worker at L68:C37 -> L68:C85
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0; report `extensions/ohbfenjhaimblkolliiajfmbdifmmlbf_2.4.1/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.1` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/ohbfenjhaimblkolliiajfmbdifmmlbf_2.4.1/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `missing` (No reliable public email found)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
