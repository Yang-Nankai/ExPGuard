# DoubleX / ExPGuard aligned flow report

- Extension: `bnofologaglcigfnbljobhnglbaicmci.1.0.1`
- Status: `success`
- Duration: `1043.321ms`
- Flows: `4`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L72) → `CHROME_LOCAL_STORAGE` (L95)

## Flow 2 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L72) → `CHROME_LOCAL_STORAGE` (L110)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L133) → `WINDOW_POSTMESSAGE` (L134)

## Flow 4 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L142) → `WINDOW_POSTMESSAGE` (L143)
