# DoubleX / ExPGuard aligned flow report

- Extension: `tikquick@extension`
- Status: `success`
- Duration: `2425.215ms`
- Flows: `3`

## Flow 1 — REQUEST_FORGERY

`WINDOW_MESSAGE_EVENT` (L49) → `FETCH_RESOURCE` (L137)

## Flow 2 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L49) → `CHROME_LOCAL_STORAGE` (L114)

## Flow 3 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L49) → `CHROME_LOCAL_STORAGE` (L124)
