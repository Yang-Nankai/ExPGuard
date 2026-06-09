---
name: analyze-extension
description: Run ExPGuard against a Chrome extension sample (DIR / CRX / WEB) and surface the resulting taint report. Use when the user says "analyze <sample>", "run ExPGuard on X", or wants to reproduce an analysis run from `samples/`.
disable-model-invocation: true
---

# analyze-extension

Wraps the standard ExPGuard analysis workflow so a single `/analyze-extension <target>` call produces a reproducible run.

## Arguments

The user passes a target identifier as `args`:

- A folder name under `samples/` (e.g. `privilege_execution`, `code_injection`)
- A path to a `.crx` file
- A Chrome Web Store URL
- An absolute or relative path to an unpacked extension directory

If `args` is empty, list the entries under `samples/` and ask which one to run.

## Workflow

1. **Verify build is current.** If `dist/main.js` is missing or older than any file in `src/`, run `npx tsc` first. If this is the very first build, also copy `src/transformation` into `dist/` (per the README note about `transformation` not being emitted).

2. **Resolve the target → command.** Map the input to one of:

   | Input shape | `--type` | `--input` | Notes |
   |---|---|---|---|
   | `samples/privilege_execution` (DIR) | `DIR` | `./samples/privilege_execution/` | Read `manifest.json` for the real extension id if present; otherwise pad with `a` × 32 |
   | `*.crx` | `CRX` | the path | Use a 32-char placeholder id if unknown |
   | `https://chromewebstore.google.com/...` | `WEB` | the URL | Extract id from URL path segment after `/detail/<name>/<id>` |

3. **Pick an output dir** under `output/<target-slug>/`. Create it if missing. Never write inside `samples/`.

4. **Run analysis:**

   ```bash
   node dist/main.js analyze \
     --type=<TYPE> \
     --input=<INPUT> \
     --out=<OUT_DIR> \
     --id=<EXT_ID> \
     --version=<VERSION_OR_1.0>
   ```

5. **Surface results.** After the run finishes:
   - List files produced under `<OUT_DIR>`.
   - If a taint/report JSON exists, read it and summarize: source → sink count per flow type, plus the top 3 highest-severity flows with file/line locations.
   - If `.dot` files are produced under `src/graph` output paths, mention the count and point to `dot -Tsvg <file>` for rendering.

## Examples from the README

The README contains canonical invocations — preserve those flag shapes:

```bash
# DIR sample
node dist/main.js analyze --type=DIR --input=./samples/privilege_execution/ \
  --out=./output/privilege_execution \
  --id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --version=1.0

# CRX sample
node dist/main.js analyze --type CRX --input ./samples/code_injection/example.crx \
  --out=./output/code_injection \
  --id=caofmekclcabakldafkjbfkkmcebndal --version=1.2

# CWS (online) sample
node dist/main.js analyze --type WEB \
  --input=https://chromewebstore.google.com/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone \
  --out=./output/cws_example \
  --id=mnjggcdmjocbbbhaepdhchncahnbgone --version=6.1.5
```

## Failure modes to watch for

- `Cannot find module 'transformation/...'` — first build did not copy `src/transformation` into `dist/`. Copy it, do not re-run `tsc -w`.
- Empty report — the script filter (`config.filterUnusedRuntimeScripts`) may be excluding entry points; mention `src/taint/policy.ts:shouldIncludeScriptInPolicy` as the place to check.
- WEB type hangs — likely network/proxy. The codebase uses `https-proxy-agent`; check `src/config.ts` for proxy config before retrying.
