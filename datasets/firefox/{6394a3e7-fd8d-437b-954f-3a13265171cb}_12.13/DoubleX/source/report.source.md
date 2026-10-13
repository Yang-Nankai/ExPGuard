# DoubleX / ExPGuard aligned flow report

- Extension: `{6394a3e7-fd8d-437b-954f-3a13265171cb}`
- Status: `success`
- Duration: `20243.046ms`
- Flows: `3`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L325) → `CHROME_SYNC_STORAGE` (L2540)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L2438) → `WINDOW_POSTMESSAGE` (L2439)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L2519) → `WINDOW_POSTMESSAGE` (L2520)
