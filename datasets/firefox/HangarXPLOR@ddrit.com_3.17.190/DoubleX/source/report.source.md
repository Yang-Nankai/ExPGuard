# DoubleX / ExPGuard aligned flow report

- Extension: `HangarXPLOR@ddrit.com`
- Status: `success`
- Duration: `418.251ms`
- Flows: `4`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L76) → `CHROME_SYNC_STORAGE` (L91)

## Flow 2 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L76) → `CHROME_LOCAL_STORAGE` (L125)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L82) → `WINDOW_POSTMESSAGE` (L83)

## Flow 4 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L116) → `WINDOW_POSTMESSAGE` (L117)
