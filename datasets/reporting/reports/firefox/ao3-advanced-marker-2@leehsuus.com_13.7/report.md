# Security Vulnerability Report: High Extension Storage Poisoning in AO3 Advanced Marker

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **AO3 Advanced Marker** (firefox, extension ID `ao3-advanced-marker-2@leehsuus.com`, version `13.7`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `14.2`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: AO3 Advanced Marker
- Platform: firefox
- Extension ID: `ao3-advanced-marker-2@leehsuus.com`
- Dataset version: `13.7`
- Store version at review: `14.2`
- Users: 893
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_TEXT_CONTENT` (From storage.local.set('ao3_hl_null') in content) in content at L2289:C59 -> L2289:C89 to the privileged sink `CHROME_LOCAL_STORAGE` (ao3_hl_null) in content at L2532:C16 -> L2532:C70. The source scope is on pages matching `*://*.archiveofourown.org/tags/*, *://*.archiveofourown.org/users/*, *://*.archiveofourown.org/series/*, *://*.archiveofourown.org/bookmarks*, *://*.archiveofourown.org/works*, *://*.archiveofourown.org/collections/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-20c706efed9416a6`
- Severity recorded by the analysis: **HIGH**
- Source: `ELEMENT_TEXT_CONTENT` (From storage.local.set('ao3_hl_null') in content) in content at L2289:C59 -> L2289:C89
- Sink: `CHROME_LOCAL_STORAGE` (ao3_hl_null) in content at L2532:C16 -> L2532:C70
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
r = authorElement ? authorElement.textContent.trim() : 'Unknown Author
```

**Sink code anchor (excerpt):**

```javascript
 {
                storage.local.set({ [storageKey]: workData }, resolve);
            });

```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `ELEMENT_TEXT_CONTENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 3

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ao3-advanced-marker-2@leehsuus.com_13.7/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/ao3-advanced-marker-2@leehsuus.com_13.7/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — 用户人工验证确认该 Flow 可达并产生对应特权效果。 F002 未被用户单独点名；由于与 F001/F003 同属 ELEMENT_TEXT_CONTENT -> chrome.storage.local 路径，按同一人工结论记为 TP，以确保该扩展所有唯一 Flow 均可判定。.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `13.7` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/ao3-advanced-marker-2@leehsuus.com_13.7/static/static_report.json`; dynamic report `extensions/ao3-advanced-marker-2@leehsuus.com_13.7/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_TEXT_CONTENT` (a[rel="author"]) in content at L2289:C59 -> L2289:C89 to the privileged sink `CHROME_LOCAL_STORAGE` (ao3_hl_null) in content at L2490:C12 -> L2490:C66. The source scope is on pages matching `*://*.archiveofourown.org/tags/*, *://*.archiveofourown.org/users/*, *://*.archiveofourown.org/series/*, *://*.archiveofourown.org/bookmarks*, *://*.archiveofourown.org/works*, *://*.archiveofourown.org/collections/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-62dcfb1f65a20669`
- Severity recorded by the analysis: **HIGH**
- Source: `ELEMENT_TEXT_CONTENT` (a[rel="author"]) in content at L2289:C59 -> L2289:C89
- Sink: `CHROME_LOCAL_STORAGE` (ao3_hl_null) in content at L2490:C12 -> L2490:C66
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
r = authorElement ? authorElement.textContent.trim() : 'Unknown Author
```

**Sink code anchor (excerpt):**

```javascript
e => {
            storage.local.set({ [storageKey]: workData }, resolve);
        });

  
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `ELEMENT_TEXT_CONTENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 3

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `13.7` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 3: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_TEXT_CONTENT` (From storage.local.set('ao3_hl_null') in content) in content at L2289:C59 -> L2289:C89 to the privileged sink `CHROME_LOCAL_STORAGE` (ao3_hl_null) in content at L2451:C16 -> L2451:C70. The source scope is on pages matching `*://*.archiveofourown.org/tags/*, *://*.archiveofourown.org/users/*, *://*.archiveofourown.org/series/*, *://*.archiveofourown.org/bookmarks*, *://*.archiveofourown.org/works*, *://*.archiveofourown.org/collections/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-7c5c1fde4a68c78e`
- Severity recorded by the analysis: **HIGH**
- Source: `ELEMENT_TEXT_CONTENT` (From storage.local.set('ao3_hl_null') in content) in content at L2289:C59 -> L2289:C89
- Sink: `CHROME_LOCAL_STORAGE` (ao3_hl_null) in content at L2451:C16 -> L2451:C70
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
r = authorElement ? authorElement.textContent.trim() : 'Unknown Author
```

**Sink code anchor (excerpt):**

```javascript
 {
                storage.local.set({ [storageKey]: workData }, resolve);
            });

```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `ELEMENT_TEXT_CONTENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 3

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `13.7` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
