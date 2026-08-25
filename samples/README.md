# ExPGuard samples

These intentionally vulnerable Manifest V3 extensions mirror the four
vulnerability classes evaluated in the ExPGuard paper. They are minimal test
fixtures, not extensions to install for everyday browsing.

| Directory | Paper category | Demonstrated flow |
| --- | --- | --- |
| `privilege_execution/` | Privilege Execution | page message -> extension message -> `chrome.tabs.create` |
| `storage_poisoning/` | Storage Poisoning | page message -> `chrome.storage.local.set`; a service worker later consumes the value |
| `dom_xss/` | DOM XSS | extension-page URL fragment -> `innerHTML` |
| `request_forgery/` | Request Forgery | external extension message -> privileged `fetch` |

After building ExPGuard, analyze any sample with:

```bash
node dist/main.js analyze \
  --type DIR \
  --input ./samples/privilege_execution \
  --out ./results/privilege_execution \
  --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
  --extension-version 1.0.0
```

Change the input and output directory to run another sample. The fixed ID is a
syntactically valid placeholder used only for unpacked-directory analysis.

The current machine-readable report identifiers retain two legacy names:
`PRIVILEGE_ESCALATION` corresponds to the paper's *Privilege Execution*, and
`STORAGE_POSOING` corresponds to *Storage Poisoning*.
