# DoubleX / ExPGuard aligned flow report

- Extension: `nhcdofaefcpfaoefffopanopapnekhca.1.0.8`
- Status: `success`
- Duration: `672.775ms`
- Flows: `2`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L88) → `CHROME_SYNC_STORAGE` (L137)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L106) → `WINDOW_POSTMESSAGE` (L115)
