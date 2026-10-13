# Security Vulnerability Report: Critical CSRF via Privileged Network Request in 1688&TB&JD&PDD佣金助手(原1688分销客)

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **1688&TB&JD&PDD佣金助手(原1688分销客)** (edge, extension ID `dbheghlcaaodggdeknimglkomnebkfcl`, version `5.3.12`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: 1688&TB&JD&PDD佣金助手(原1688分销客)
- Platform: edge
- Extension ID: `dbheghlcaaodggdeknimglkomnebkfcl`
- Dataset version: `5.3.12`
- Store version at review: `5.3.12`
- Users: 100
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in scripts/content at L16:C8 -> L16:C23 to the privileged sink `FETCH_BODY` ([Unknown URL]) in background at L58:C26 -> L58:C51. The source scope is on pages matching `http://*/*, https://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-4fc85a26b343afea`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in scripts/content at L16:C8 -> L16:C23
- Sink: `FETCH_BODY` ([Unknown URL]) in background at L58:C26 -> L58:C51
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.3.12` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in scripts/content at L16:C8 -> L16:C23 to the privileged sink `FETCH_BODY` ([Unknown URL]) in background at L119:C26 -> L119:C51. The source scope is on pages matching `http://*/*, https://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-99954b955d4c6b33`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in scripts/content at L16:C8 -> L16:C23
- Sink: `FETCH_BODY` ([Unknown URL]) in background at L119:C26 -> L119:C51
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.3.12` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 3: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in scripts/content at L16:C8 -> L16:C23 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background at L258:C20 -> L258:C169. The source scope is on pages matching `http://*/*, https://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-bf5be5ec08541251`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in scripts/content at L16:C8 -> L16:C23
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L258:C20 -> L258:C169
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/dbheghlcaaodggdeknimglkomnebkfcl_5.3.12/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.3.12` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/dbheghlcaaodggdeknimglkomnebkfcl_5.3.12/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
