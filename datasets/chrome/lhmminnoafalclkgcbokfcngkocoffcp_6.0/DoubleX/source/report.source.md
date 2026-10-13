# DoubleX / ExPGuard aligned flow report

- Extension: `lhmminnoafalclkgcbokfcngkocoffcp.6.0`
- Status: `success`
- Duration: `330.701ms`
- Flows: `3`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L2) → `CHROME_LOCAL_STORAGE` (L53)

## Flow 2 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L2) → `CHROME_LOCAL_STORAGE` (L138)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L10) → `WINDOW_POSTMESSAGE` (L14)
