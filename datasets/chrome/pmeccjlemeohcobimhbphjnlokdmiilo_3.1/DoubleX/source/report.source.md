# DoubleX / ExPGuard aligned flow report

- Extension: `pmeccjlemeohcobimhbphjnlokdmiilo.3.1`
- Status: `success`
- Duration: `3744.036ms`
- Flows: `3`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L208) → `CHROME_LOCAL_STORAGE` (L300)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L228) → `WINDOW_POSTMESSAGE` (L239)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L248) → `WINDOW_POSTMESSAGE` (L257)
