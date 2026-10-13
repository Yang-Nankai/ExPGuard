# DoubleX / ExPGuard aligned flow report

- Extension: `{7de8b44c-076f-4727-a783-bd783e84f40f}`
- Status: `success`
- Duration: `20702.636ms`
- Flows: `3`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L325) → `CHROME_SYNC_STORAGE` (L2540)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L2438) → `WINDOW_POSTMESSAGE` (L2439)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L2519) → `WINDOW_POSTMESSAGE` (L2520)
