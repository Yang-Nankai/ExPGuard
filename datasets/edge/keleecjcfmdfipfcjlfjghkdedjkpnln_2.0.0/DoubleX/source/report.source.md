# DoubleX / ExPGuard aligned flow report

- Extension: `keleecjcfmdfipfcjlfjghkdedjkpnln.2.0.0`
- Status: `success`
- Duration: `735.222ms`
- Flows: `3`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L313) → `CHROME_LOCAL_STORAGE` (L389)

## Flow 2 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L313) → `CHROME_LOCAL_STORAGE` (L336)

## Flow 3 — PRIVILEGE_ESCALATION

`WINDOW_MESSAGE_EVENT` (L313) → `CHROME_TABS_EXECUTE` (L196)
