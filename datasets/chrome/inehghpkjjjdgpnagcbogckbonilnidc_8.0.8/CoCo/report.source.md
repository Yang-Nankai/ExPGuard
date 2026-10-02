# CoCo taint report (ExPGuard-aligned)

- Status: `timeout`
- Findings: `1`
- Duration: `240.094s`
- Statement coverage: `n/a`
- Peak RSS: `366.059 MiB`

## Flows

### 1. DATA_LEAK

`STORAGE_ALL_ITEMS` → `FETCH_RESOURCE`

- Source: unknown:?
- Sink: unknown:?
- Evidence: CoCo legacy taint trace
