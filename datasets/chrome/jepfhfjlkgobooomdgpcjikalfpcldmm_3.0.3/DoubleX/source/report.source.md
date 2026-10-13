# DoubleX / ExPGuard aligned flow report

- Extension: `jepfhfjlkgobooomdgpcjikalfpcldmm.3.0.3`
- Status: `success`
- Duration: `721.676ms`
- Flows: `2`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L28) → `CHROME_LOCAL_STORAGE` (L45)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L39) → `WINDOW_POSTMESSAGE` (L30)
