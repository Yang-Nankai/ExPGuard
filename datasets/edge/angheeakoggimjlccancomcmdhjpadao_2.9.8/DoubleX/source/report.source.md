# DoubleX / ExPGuard aligned flow report

- Extension: `angheeakoggimjlccancomcmdhjpadao.2.9.8`
- Status: `success`
- Duration: `260.577ms`
- Flows: `2`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L14) → `CHROME_LOCAL_STORAGE` (L16)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L15) → `WINDOW_POSTMESSAGE` (L15)
