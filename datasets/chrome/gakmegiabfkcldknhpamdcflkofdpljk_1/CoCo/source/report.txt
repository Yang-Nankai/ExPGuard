# CoCo taint report (ExPGuard-aligned)

- Status: `success`
- Findings: `25`
- Duration: `4.517s`
- Statement coverage: `39.18%`
- Peak RSS: `216.074 MiB`

## Flows

### 1. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:593
- Sink: crx_headers/bg_header.js:593
- Evidence: CoCo legacy taint trace

### 2. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:599
- Sink: crx_headers/bg_header.js:599
- Evidence: CoCo legacy taint trace

### 3. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:600
- Sink: crx_headers/bg_header.js:600
- Evidence: CoCo legacy taint trace

### 4. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:616
- Sink: crx_headers/bg_header.js:616
- Evidence: CoCo legacy taint trace

### 5. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:592
- Sink: crx_headers/bg_header.js:592
- Evidence: CoCo legacy taint trace

### 6. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:617
- Sink: crx_headers/bg_header.js:617
- Evidence: CoCo legacy taint trace

### 7. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:618
- Sink: crx_headers/bg_header.js:618
- Evidence: CoCo legacy taint trace

### 8. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:597
- Sink: crx_headers/bg_header.js:597
- Evidence: CoCo legacy taint trace

### 9. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:596
- Sink: crx_headers/bg_header.js:596
- Evidence: CoCo legacy taint trace

### 10. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:595
- Sink: crx_headers/bg_header.js:595
- Evidence: CoCo legacy taint trace

### 11. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:598
- Sink: crx_headers/bg_header.js:598
- Evidence: CoCo legacy taint trace

### 12. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:594
- Sink: crx_headers/bg_header.js:594
- Evidence: CoCo legacy taint trace

### 13. DATA_LEAK

`CHROME_BOOKMARK_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:615
- Sink: crx_headers/bg_header.js:615
- Evidence: CoCo legacy taint trace

### 14. UNKNOWN

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `BookmarkSearchQuery_sink`

- Source: js/background.js:114
- Sink: js/background.js:114
- Evidence: CoCo legacy taint trace

### 15. DATA_LEAK

`CHROME_HISTORY_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:527
- Sink: crx_headers/bg_header.js:527
- Evidence: CoCo legacy taint trace

### 16. DATA_LEAK

`CHROME_HISTORY_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:526
- Sink: crx_headers/bg_header.js:526
- Evidence: CoCo legacy taint trace

### 17. DATA_LEAK

`CHROME_HISTORY_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:524
- Sink: crx_headers/bg_header.js:524
- Evidence: CoCo legacy taint trace

### 18. DATA_LEAK

`CHROME_HISTORY_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:530
- Sink: crx_headers/bg_header.js:530
- Evidence: CoCo legacy taint trace

### 19. DATA_LEAK

`CHROME_HISTORY_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:523
- Sink: crx_headers/bg_header.js:523
- Evidence: CoCo legacy taint trace

### 20. DATA_LEAK

`CHROME_HISTORY_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:528
- Sink: crx_headers/bg_header.js:528
- Evidence: CoCo legacy taint trace

### 21. DATA_LEAK

`CHROME_HISTORY_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:522
- Sink: crx_headers/bg_header.js:522
- Evidence: CoCo legacy taint trace

### 22. DATA_LEAK

`CHROME_HISTORY_INFO` → `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`

- Source: crx_headers/bg_header.js:525
- Sink: crx_headers/bg_header.js:525
- Evidence: CoCo legacy taint trace

### 23. PRIVILEGE_ESCALATION

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_TABS_CREATE_OPTIONS`

- Source: js/background.js:125
- Sink: js/background.js:125
- Evidence: CoCo legacy taint trace

### 24. PRIVILEGE_ESCALATION

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_WINDOWS_CREATE_OPTIONS`

- Source: js/background.js:125
- Sink: js/background.js:125
- Evidence: CoCo legacy taint trace

### 25. UNKNOWN

`CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `WEB_LOCAL_STORAGE_SET_VALUE`

- Source: js/background.js:142
- Sink: js/background.js:143
- Evidence: CoCo legacy taint trace
