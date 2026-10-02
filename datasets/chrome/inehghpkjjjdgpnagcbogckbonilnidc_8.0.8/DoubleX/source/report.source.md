# DoubleX / ExPGuard aligned flow report

- Extension: `inehghpkjjjdgpnagcbogckbonilnidc.8.0.8`
- Status: `success`
- Duration: `1145.96ms`
- Flows: `3`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L374) → `CHROME_SYNC_STORAGE` (L383)

## Flow 2 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L374) → `CHROME_SYNC_STORAGE` (L413)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L391) → `WINDOW_POSTMESSAGE` (L392)
