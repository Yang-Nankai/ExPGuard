# Changelogs

## 8.58 - 2026-04-15
- Added unified-extension detection helper (`data-spt-unified-extension=1`) in content scripts to prevent overlapping UI when All-in-One is installed.
- Added early exits in header/search/BSR summary render paths so legacy Quick View widgets do not inject in unified mode.
- Added null-safe handling in BSR loading/update flow when summary creation is skipped by unified mode.
- Added unified-mode guards in inline Keepa graph and Keepa popup graph injection paths.
