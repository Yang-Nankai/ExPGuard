# Samples guide

The `samples/` directory contains four intentionally vulnerable Manifest V3
extensions, one for each vulnerability class evaluated in the ExPGuard paper.
Each directory is self-contained and can be analyzed as an unpacked extension.

## Run a sample

Build ExPGuard once, then replace `<sample>` with one of the directory names in
the table below:

```bash
npm run build
node dist/main.js analyze \
  --type DIR \
  --input ./samples/<sample> \
  --out ./results/<sample> \
  --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
  --extension-version 1.0.0
```

The placeholder ID is valid for `DIR` analysis and does not identify a real
extension.

## Expected flows

| Sample | Untrusted source | Security-sensitive sink | Paper category | Report identifier |
| --- | --- | --- | --- | --- |
| `privilege_execution/` | `window` message received by a content script | `chrome.tabs.create` in the service worker | Privilege Execution | `PRIVILEGE_ESCALATION` |
| `storage_poisoning/` | `window` message received by a content script | `chrome.storage.local.set` | Storage Poisoning | `STORAGE_POSOING` |
| `dom_xss/` | extension page `document.URL` | `element.innerHTML` | DOM XSS | `DOM_XSS` |
| `request_forgery/` | `chrome.runtime.onMessageExternal` payload | privileged `fetch` URL | Request Forgery | `REQUEST_FORGERY` |

`PRIVILEGE_ESCALATION` and `STORAGE_POSOING` are legacy machine-readable names.
The README and paper use the canonical taxonomy names.

## Privilege Execution

`privilege_execution/content.js` receives a page-controlled `message` event and
relays its URL through `chrome.runtime.sendMessage`. The service worker trusts
the request and passes the URL to `chrome.tabs.create`. The example captures an
indirect web-page-to-background privilege crossing through an internal extension
message.

## Storage Poisoning

`storage_poisoning/content.js` writes a page-controlled startup URL to
`chrome.storage.local`. The service worker reads the same key on a later startup
event and uses it to open a tab. The delayed read illustrates why extension
storage is an implicit cross-context channel even though the poisoning finding
is raised at the storage write.

## DOM XSS

`dom_xss/popup.js` extracts attacker-controlled markup from the extension-page
URL fragment and assigns it to `innerHTML`. This is a compact example of unsafe
HTML rendering in a privileged extension page.

## Request Forgery

`request_forgery/background.js` exposes an external message handler. A permitted
web origin supplies the destination URL, method, and body of a request issued by
the service worker, whose broad host permissions can bypass the page's
same-origin restrictions.

## Safety

The examples contain real vulnerable patterns and broad demonstration
permissions. Keep them in a disposable browser profile if you inspect them at
runtime. They are intended primarily for static-analysis regression tests.
