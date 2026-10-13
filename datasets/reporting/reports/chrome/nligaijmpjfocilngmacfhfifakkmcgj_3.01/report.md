# Security Vulnerability Report: High CSRF via Privileged Network Request in Ak Kamal e-Security Client Loader

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Ak Kamal e-Security Client Loader** (chrome, extension ID `nligaijmpjfocilngmacfhfifakkmcgj`, version `3.01`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: Ak Kamal e-Security Client Loader
- Platform: chrome
- Extension ID: `nligaijmpjfocilngmacfhfifakkmcgj`
- Dataset version: `3.01`
- Store version at review: `3.01`
- Users: 80000
- Analysis tools: CoCo

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in background.js at L24:C1 -> L24:C1 to the privileged sink `XML_HTTP_REQUEST_OPEN` (CoCo sink evidence) in background.js at L106:C1 -> L106:C1. The source scope is on pages matching `*://vm1/*, *://h1.dev.akkamal.kz/*, *://www.e-security.kz/*, https://ib.bcc.kz/*, *://starbanking.kz/*, *://m.bcc.kz/*, *://m10.bcc.kz/*, *://bcctrade.kz/*, *://*.bcc.kz/*, *://*.bank.corp.centercredit.kz/*, *://*.bcctest.kz/*, http://sdo.1cb.kz/*, https://sdossl.1cb.kz/*, http://dev.akkamal.kz/*, https://*.halykbank.kz/*, https://*.myhalyk.kz/*, https://myhalyk.kz/*, https://172.16.124.113/*, https://195.200.74.218/*, https://service.mysign.kz/*, *://service.docus.kz/*, *://eabr.org/*, *://*.eabr.org/*, *://essmain/*, *://essback/*, *://ess3/*, http://127.0.0.1/*, http://localhost/*, https://127.0.0.1/*, https://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-07e6d035e7e5669b`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in background.js at L24:C1 -> L24:C1
- Sink: `XML_HTTP_REQUEST_OPEN` (CoCo sink evidence) in background.js at L106:C1 -> L106:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/nligaijmpjfocilngmacfhfifakkmcgj_3.01/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/nligaijmpjfocilngmacfhfifakkmcgj_3.01/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.01` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/nligaijmpjfocilngmacfhfifakkmcgj_3.01/static/static_report.json`; dynamic report `extensions/nligaijmpjfocilngmacfhfifakkmcgj_3.01/dynamic/dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in background.js at L24:C1 -> L24:C1 to the privileged sink `XML_HTTP_REQUEST_SEND` (CoCo sink evidence) in background.js at L130:C1 -> L130:C1. The source scope is on pages matching `*://vm1/*, *://h1.dev.akkamal.kz/*, *://www.e-security.kz/*, https://ib.bcc.kz/*, *://starbanking.kz/*, *://m.bcc.kz/*, *://m10.bcc.kz/*, *://bcctrade.kz/*, *://*.bcc.kz/*, *://*.bank.corp.centercredit.kz/*, *://*.bcctest.kz/*, http://sdo.1cb.kz/*, https://sdossl.1cb.kz/*, http://dev.akkamal.kz/*, https://*.halykbank.kz/*, https://*.myhalyk.kz/*, https://myhalyk.kz/*, https://172.16.124.113/*, https://195.200.74.218/*, https://service.mysign.kz/*, *://service.docus.kz/*, *://eabr.org/*, *://*.eabr.org/*, *://essmain/*, *://essback/*, *://ess3/*, http://127.0.0.1/*, http://localhost/*, https://127.0.0.1/*, https://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d6cfd4b034e91644`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (CoCo source evidence) in background.js at L24:C1 -> L24:C1
- Sink: `XML_HTTP_REQUEST_SEND` (CoCo sink evidence) in background.js at L130:C1 -> L130:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/nligaijmpjfocilngmacfhfifakkmcgj_3.01/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/nligaijmpjfocilngmacfhfifakkmcgj_3.01/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.01` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/nligaijmpjfocilngmacfhfifakkmcgj_3.01/static/static_report.json`; dynamic report `extensions/nligaijmpjfocilngmacfhfifakkmcgj_3.01/dynamic/dynamic_report.json`.


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
