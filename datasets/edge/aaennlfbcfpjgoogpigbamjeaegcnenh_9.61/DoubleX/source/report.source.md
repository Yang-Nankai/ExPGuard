# DoubleX / ExPGuard aligned flow report

- Extension: `aaennlfbcfpjgoogpigbamjeaegcnenh.9.61`
- Status: `success`
- Duration: `622.952ms`
- Flows: `2`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L56) → `CHROME_LOCAL_STORAGE` (L166)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L150) → `WINDOW_POSTMESSAGE` (L158)
