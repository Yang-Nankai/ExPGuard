# DoubleX / ExPGuard aligned flow report

- Extension: `eljapbgkmlngdpckoiiibecpemleclhh.8.0.4`
- Status: `success`
- Duration: `16490.367ms`
- Flows: `4`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L48) → `CHROME_SYNC_STORAGE` (L87)

## Flow 2 — REQUEST_FORGERY

`WINDOW_MESSAGE_EVENT` (L48) → `FETCH_RESOURCE` (L65)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L57) → `WINDOW_POSTMESSAGE` (L68)

## Flow 4 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L75) → `WINDOW_POSTMESSAGE` (L77)
