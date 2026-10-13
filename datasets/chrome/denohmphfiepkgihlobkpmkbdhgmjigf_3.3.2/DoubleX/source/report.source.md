# DoubleX / ExPGuard aligned flow report

- Extension: `denohmphfiepkgihlobkpmkbdhgmjigf.3.3.2`
- Status: `success`
- Duration: `383.583ms`
- Flows: `2`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L227) → `CHROME_SYNC_STORAGE` (L279)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L247) → `WINDOW_POSTMESSAGE` (L257)
