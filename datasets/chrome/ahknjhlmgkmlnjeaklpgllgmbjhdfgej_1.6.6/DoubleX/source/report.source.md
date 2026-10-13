# DoubleX / ExPGuard aligned flow report

- Extension: `ahknjhlmgkmlnjeaklpgllgmbjhdfgej.1.6.6`
- Status: `success`
- Duration: `429.004ms`
- Flows: `2`

## Flow 1 — PRIVILEGE_ESCALATION

`WINDOW_MESSAGE_EVENT` (L227) → `CHROME_TABS_EXECUTE` (L246)

## Flow 2 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L301) → `WINDOW_POSTMESSAGE` (L308)
