# ExPGuard Batch Analysis Module

This directory contains the batch analysis module for analyzing multiple browser extensions concurrently.

## Quick Start

```bash
# Build the project first
npm run build

# Analyze Chrome extensions from a directory
node dist/main.js batch \
  -i ./extensions \
  -m directory \
  -p chrome \
  -o ./results/batch

# Analyze Firefox add-ons from a JSONL file
node dist/main.js batch \
  -i ./extensions.jsonl \
  -m jsonl \
  -p firefox \
  -o ./results/batch
```

## Module Structure

```
src/batch/
├── types.ts           # TypeScript type definitions
├── job-resolver.ts    # Job discovery from directory/JSONL
├── worker.ts          # Isolated Node subprocess execution
├── runner.ts          # Main orchestration with worker pool
├── statistics.ts      # Statistics generation from results
├── html-report.ts     # HTML report generator
└── index.ts           # Module exports
```

## Key Features

- **Process Isolation**: Each extension runs in its own Node subprocess
- **Concurrent Execution**: Worker pool with configurable concurrency
- **Multiple Input Modes**: Directory scanning or JSONL manifest
- **Platform Support**: Chrome (CRX) and Firefox (XPI)
- **Rich Reports**: JSON statistics + HTML visualization
- **Error Handling**: Graceful failure with detailed error tracking
- **Timeout Control**: Per-extension timeout to prevent hangs

## Usage Examples

See `docs/batch-analysis.md` for comprehensive documentation and examples.

## Output Files

- `batch-summary.json` - Complete analysis results
- `batch-statistics.json` - Aggregated statistics
- `batch-report.html` - Interactive HTML report
- `<index>_<extension-id>/` - Individual extension outputs
