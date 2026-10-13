# Security Vulnerability Report: High CSRF via Privileged Network Request in 1688/淘宝/进货返利助手

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **1688/淘宝/进货返利助手** (edge, extension ID `jolbglpclnpdolcmbgdipkdimneiplof`, version `1.0.3`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: 1688/淘宝/进货返利助手
- Platform: edge
- Extension ID: `jolbglpclnpdolcmbgdipkdimneiplof`
- Dataset version: `1.0.3`
- Store version at review: `1.0.3`
- Users: 96
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content at L13:C8 -> L13:C23 to the privileged sink `FETCH_BODY` ([Unknown URL]) in js/background at L51:C26 -> L51:C51. The source scope is on pages matching `https://*.1688.com/*, https://*.taobao.com/*, https://*.tmall.com/*, https://*.tmall.hk/*, https://*.jd.com/*, https://*.jd.hk/*, https://*.yangkeduo.com/*, https://*.vipglobal.hk/*, https://*.vip.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-2220536826a96e50`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content at L13:C8 -> L13:C23
- Sink: `FETCH_BODY` ([Unknown URL]) in js/background at L51:C26 -> L51:C51
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/jolbglpclnpdolcmbgdipkdimneiplof_1.0.3/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.3` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/jolbglpclnpdolcmbgdipkdimneiplof_1.0.3/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.


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
