# Security Vulnerability Report: Critical Extension Storage Poisoning and Unauthorized Tab/Window Control in Watch2Gether

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **6 Flow(s)** in **Watch2Gether** (chrome, extension ID `cimpffimgeipdhnhjohpbehjkcdpjolg`, version `10.6`).
The recorded issue type(s): **Extension Storage Poisoning; Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: Watch2Gether
- Platform: chrome
- Extension ID: `cimpffimgeipdhnhjohpbehjkcdpjolg`
- Dataset version: `10.6`
- Store version at review: `10.6`
- Users: 900000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (From storage.session.set('db') in sw.ef4d71da) in content_w2g.530d247b at L190:C0 -> L278:C2 to the privileged sink `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L209:C16 -> L211:C18. The source scope is on pages matching `https://stage.watch2gether.com/rooms/*, https://w2g.tv/*, https://rooms.w2g.tv/*, https://stage-rooms.w2g.tv/*, https://stage.w2g.tv/*, https://staging.w2g.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0245104fea1a4d83`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (From storage.session.set('db') in sw.ef4d71da) in content_w2g.530d247b at L190:C0 -> L278:C2
- Sink: `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L209:C16 -> L211:C18
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/cimpffimgeipdhnhjohpbehjkcdpjolg_10.6/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_sink_evidence`; evidence stage `SINK_REACHED`); runtime reproduction recorded; report `extensions/cimpffimgeipdhnhjohpbehjkcdpjolg_10.6/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.6` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/cimpffimgeipdhnhjohpbehjkcdpjolg_10.6/static/static_report.json`; dynamic report `extensions/cimpffimgeipdhnhjohpbehjkcdpjolg_10.6/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content_w2g.530d247b at L166:C27 -> L166:C50 to the privileged sink `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L329:C16 -> L331:C18. The source scope is on pages matching `https://stage.watch2gether.com/rooms/*, https://w2g.tv/*, https://rooms.w2g.tv/*, https://stage-rooms.w2g.tv/*, https://stage.w2g.tv/*, https://staging.w2g.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0e190409db82ce80`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content_w2g.530d247b at L166:C27 -> L166:C50
- Sink: `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L329:C16 -> L331:C18
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/cimpffimgeipdhnhjohpbehjkcdpjolg_10.6/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/cimpffimgeipdhnhjohpbehjkcdpjolg_10.6/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.6` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/cimpffimgeipdhnhjohpbehjkcdpjolg_10.6/static/static_report.json`; dynamic report `extensions/cimpffimgeipdhnhjohpbehjkcdpjolg_10.6/dynamic/dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (From storage.session.set('db') in sw.ef4d71da) in content_w2g.530d247b at L190:C0 -> L278:C2 to the privileged sink `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L329:C16 -> L331:C18. The source scope is on pages matching `https://stage.watch2gether.com/rooms/*, https://w2g.tv/*, https://rooms.w2g.tv/*, https://stage-rooms.w2g.tv/*, https://stage.w2g.tv/*, https://staging.w2g.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-5ffdfaf5e0fbe612`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (From storage.session.set('db') in sw.ef4d71da) in content_w2g.530d247b at L190:C0 -> L278:C2
- Sink: `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L329:C16 -> L331:C18
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.6` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content_w2g.530d247b at L166:C27 -> L166:C50 to the privileged sink `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L415:C8 -> L417:C10. The source scope is on pages matching `https://stage.watch2gether.com/rooms/*, https://w2g.tv/*, https://rooms.w2g.tv/*, https://stage-rooms.w2g.tv/*, https://stage.w2g.tv/*, https://staging.w2g.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c47b26d559ea62c8`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content_w2g.530d247b at L166:C27 -> L166:C50
- Sink: `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L415:C8 -> L417:C10
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.6` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.

### Finding 5: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (From storage.session.set('db') in sw.ef4d71da) in content_w2g.530d247b at L190:C0 -> L278:C2 to the privileged sink `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L415:C8 -> L417:C10. The source scope is on pages matching `https://stage.watch2gether.com/rooms/*, https://w2g.tv/*, https://rooms.w2g.tv/*, https://stage-rooms.w2g.tv/*, https://stage.w2g.tv/*, https://staging.w2g.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c5fb66cee7a51d0a`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (From storage.session.set('db') in sw.ef4d71da) in content_w2g.530d247b at L190:C0 -> L278:C2
- Sink: `CHROME_SESSION_STORAGE` (db) in sw.ef4d71da at L415:C8 -> L417:C10
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.6` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.

### Finding 6: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content_w2g.530d247b at L166:C27 -> L166:C50 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in sw.ef4d71da at L193:C30 -> L200:C14. The source scope is on pages matching `https://stage.watch2gether.com/rooms/*, https://w2g.tv/*, https://rooms.w2g.tv/*, https://stage-rooms.w2g.tv/*, https://stage.w2g.tv/*, https://staging.w2g.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f8cf4a33e9d68d73`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content_w2g.530d247b at L166:C27 -> L166:C50
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in sw.ef4d71da at L193:C30 -> L200:C14
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `10.6` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\cimpffimgeipdhnhjohpbehjkcdpjolg_10.6\dynamic\dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
