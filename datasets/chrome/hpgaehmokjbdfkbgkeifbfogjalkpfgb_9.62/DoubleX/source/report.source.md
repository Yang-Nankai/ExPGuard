# DoubleX / ExPGuard aligned flow report

- Extension: `hpgaehmokjbdfkbgkeifbfogjalkpfgb.9.62`
- Status: `success`
- Duration: `589.084ms`
- Flows: `2`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L56) → `CHROME_LOCAL_STORAGE` (L166)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L150) → `WINDOW_POSTMESSAGE` (L158)
