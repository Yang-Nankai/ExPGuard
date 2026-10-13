# DoubleX / ExPGuard aligned flow report

- Extension: `lmphiinjkobfnpifgpcggcpicomibhpp.0.7`
- Status: `success`
- Duration: `1676.119ms`
- Flows: `5`

## Flow 1 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L91) → `CHROME_LOCAL_STORAGE` (L95)

## Flow 2 — STORAGE_POSOING

`WINDOW_MESSAGE_EVENT` (L91) → `CHROME_LOCAL_STORAGE` (L109)

## Flow 3 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L137) → `WINDOW_POSTMESSAGE` (L138)

## Flow 4 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L158) → `WINDOW_POSTMESSAGE` (L159)

## Flow 5 — DATA_LEAK

`STORAGE_ALL_ITEMS` (L251) → `WINDOW_POSTMESSAGE` (L252)
