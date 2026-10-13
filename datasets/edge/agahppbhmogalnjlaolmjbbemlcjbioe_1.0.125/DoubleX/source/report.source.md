# DoubleX / ExPGuard aligned flow report

- Extension: `agahppbhmogalnjlaolmjbbemlcjbioe.1.0.125`
- Status: `success`
- Duration: `693.057ms`
- Flows: `4`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L110) → `CHROME_SYNC_STORAGE` (L129)

## Flow 2 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L110) → `CHROME_LOCAL_STORAGE` (L166)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L119) → `WINDOW_POSTMESSAGE` (L120)

## Flow 4 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L156) → `WINDOW_POSTMESSAGE` (L157)
