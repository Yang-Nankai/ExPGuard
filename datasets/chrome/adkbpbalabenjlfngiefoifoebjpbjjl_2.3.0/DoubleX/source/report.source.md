# DoubleX / ExPGuard aligned flow report

- Extension: `adkbpbalabenjlfngiefoifoebjpbjjl.2.3.0`
- Status: `success`
- Duration: `610.259ms`
- Flows: `2`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L758) → `CHROME_SYNC_STORAGE` (L809)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L778) → `WINDOW_POSTMESSAGE` (L787)
